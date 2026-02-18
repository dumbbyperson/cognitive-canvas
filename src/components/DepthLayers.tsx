import { useEffect, useState } from 'react';

const DepthLayers = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Deepest — slow drift + slow scroll parallax */}
      <div
        className="absolute inset-0 will-change-transform animate-[drift-slow_40s_ease-in-out_infinite_alternate]"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`,
          background: 'radial-gradient(circle at 20% 80%, hsl(270 60% 15% / 0.6) 0%, transparent 50%)',
        }}
      />
      {/* Layer 2: Mid — medium drift + medium scroll parallax */}
      <div
        className="absolute inset-0 will-change-transform animate-[drift-mid_25s_ease-in-out_infinite_alternate]"
        style={{
          transform: `translateY(${scrollY * 0.06}px)`,
          background: 'radial-gradient(circle at 80% 20%, hsl(210 60% 15% / 0.5) 0%, transparent 50%)',
        }}
      />
      {/* Layer 3: Closest — fast drift + fast scroll parallax */}
      <div
        className="absolute inset-0 will-change-transform animate-[drift-fast_15s_ease-in-out_infinite_alternate]"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          background: 'radial-gradient(circle at 50% 50%, hsl(280 50% 12% / 0.3) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default DepthLayers;
