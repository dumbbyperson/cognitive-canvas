import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  layer: number;
}

interface NeuralNode {
  x: number;
  y: number;
  active: boolean;
  layer: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<NeuralNode[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-init matrix drops on resize
      const cols = Math.floor(canvas.width / 14);
      dropsRef.current = Array(cols).fill(0).map(() => Math.random() * -100);
      // Re-position neural nodes
      nodesRef.current = [
        { x: canvas.width * 0.15, y: canvas.height * 0.15, active: false, layer: 0.8 },
        { x: canvas.width * 0.85, y: canvas.height * 0.3, active: false, layer: 0.6 },
        { x: canvas.width * 0.5, y: canvas.height * 0.45, active: false, layer: 1 },
        { x: canvas.width * 0.25, y: canvas.height * 0.65, active: false, layer: 0.7 },
        { x: canvas.width * 0.75, y: canvas.height * 0.8, active: false, layer: 0.5 },
        { x: canvas.width * 0.4, y: canvas.height * 1.0, active: false, layer: 0.9 },
        { x: canvas.width * 0.6, y: canvas.height * 1.2, active: false, layer: 0.6 },
      ];
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles with depth layers
    const colors = ['#00ffff', '#ff006e', '#b967ff'];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50;

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        layer: Math.random(),
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewCenter = scrollY + window.innerHeight / 2;
      nodesRef.current.forEach(node => {
        node.active = Math.abs(node.y - viewCenter) < window.innerHeight * 0.5;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Matrix rain chars
    const chars = '01アイウエオカキクケコ';
    const fontSize = 14;
    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // === Matrix rain (subtle, every 3rd frame) ===
      if (frameCount % 3 === 0) {
        ctx.font = `${fontSize}px monospace`;
        const drops = dropsRef.current;
        for (let i = 0; i < drops.length; i++) {
          if (drops[i] < 0) {
            drops[i] += 0.5;
            continue;
          }
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = i % 3 === 0 ? 'rgba(0,255,255,0.08)' : 'rgba(255,0,110,0.05)';
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
            drops[i] = Math.random() * -20;
          }
          drops[i] += 0.3;
        }
      }

      // === Particles with gravitational cursor ===
      ctx.shadowBlur = 0;
      particlesRef.current.forEach(p => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const depthSize = p.size * (0.5 + p.layer * 0.5);
        const depthAlpha = p.alpha * (0.3 + p.layer * 0.7);

        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, depthSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Particle connections
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // === Neural network ===
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i], n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < canvas.width * 0.6) {
            const opacity = (n1.active || n2.active) ? 0.25 : 0.06;
            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, `rgba(0,255,255,${opacity})`);
            grad.addColorStop(1, `rgba(255,0,110,${opacity})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (n1.active && n2.active) ? 1.5 : 0.5;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Data packets
            if (n1.active && n2.active) {
              const t = ((Date.now()) % 3000) / 3000;
              const px = n1.x + (n2.x - n1.x) * t;
              const py = n1.y + (n2.y - n1.y) * t;
              ctx.fillStyle = '#00ffff';
              ctx.shadowBlur = 12;
              ctx.shadowColor = '#00ffff';
              ctx.globalAlpha = 0.6;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalAlpha = 1;
              ctx.shadowBlur = 0;
            }
          }
        }

        // Draw nodes
        const node = nodes[i];
        const nSize = node.active ? 5 : 3;
        const nColor = node.active ? '#ff006e' : '#00ffff';
        ctx.fillStyle = nColor;
        ctx.shadowBlur = node.active ? 15 : 8;
        ctx.shadowColor = nColor;
        ctx.globalAlpha = 0.4 + node.layer * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nSize * node.layer, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
