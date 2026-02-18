import { useState, useEffect, useCallback, useRef } from 'react';

interface CursorParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
}

const QuantumCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<CursorParticle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const frameCount = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);

    frameCount.current++;
    if (frameCount.current % 2 === 0) {
      particlesRef.current.push({
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 10,
        y: e.clientY + (Math.random() - 0.5) * 10,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? 'hsl(180, 100%, 50%)' : 'hsl(330, 100%, 50%)',
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
      });
      if (particlesRef.current.length > 30) {
        particlesRef.current = particlesRef.current.slice(-30);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.classList.contains('interactive')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver, true);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver, true);
    };
  }, [handleMouseMove]);

  // Canvas-based particle rendering for performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.025,
          size: p.size * 0.97,
        }))
        .filter(p => p.life > 0);

      particlesRef.current.forEach(p => {
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Only show on non-touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border transition-all duration-150 ease-out"
        style={{
          left: mousePos.x - (isHovering ? 20 : 15),
          top: mousePos.y - (isHovering ? 20 : 15),
          width: isHovering ? 40 : 30,
          height: isHovering ? 40 : 30,
          borderColor: isHovering ? 'hsl(330, 100%, 50%)' : 'hsl(180, 100%, 50%)',
          boxShadow: isHovering
            ? '0 0 15px hsl(330 100% 50% / 0.5), inset 0 0 15px hsl(330 100% 50% / 0.1)'
            : '0 0 10px hsl(180 100% 50% / 0.4), inset 0 0 10px hsl(180 100% 50% / 0.1)',
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: mousePos.x - 3,
          top: mousePos.y - 3,
          width: 6,
          height: 6,
          backgroundColor: isHovering ? 'hsl(330, 100%, 50%)' : 'hsl(180, 100%, 50%)',
          boxShadow: `0 0 8px ${isHovering ? 'hsl(330, 100%, 50%)' : 'hsl(180, 100%, 50%)'}`,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default QuantumCursor;
