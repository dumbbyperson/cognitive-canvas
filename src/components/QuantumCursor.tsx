import { useState, useEffect, useCallback, useRef } from 'react';

const QuantumCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<{ id: number; x: number; y: number; size: number; color: string; vx: number; vy: number; life: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const frameCount = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);

    frameCount.current++;
    if (frameCount.current % 3 === 0) {
      particlesRef.current.push({
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        size: Math.random() * 2.5 + 0.5,
        color: Math.random() > 0.5 ? 'hsl(180, 100%, 50%)' : 'hsl(330, 100%, 50%)',
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 1,
      });
      if (particlesRef.current.length > 25) {
        particlesRef.current = particlesRef.current.slice(-25);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Canvas particle trail
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
          life: p.life - 0.03,
          size: p.size * 0.97,
        }))
        .filter(p => p.life > 0);

      particlesRef.current.forEach(p => {
        ctx.globalAlpha = p.life * 0.5;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
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

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />
      {/* Simple dot cursor */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          width: 8,
          height: 8,
          backgroundColor: 'hsl(180, 100%, 50%)',
          boxShadow: '0 0 12px hsl(180 100% 50% / 0.6), 0 0 24px hsl(180 100% 50% / 0.3)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default QuantumCursor;
