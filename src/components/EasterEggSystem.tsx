import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Terminal, Atom } from 'lucide-react';

interface EasterEgg {
  id: string;
  name: string;
  description: string;
}

const easterEggs: EasterEgg[] = [
  { id: 'konami', name: 'Konami Code', description: '↑↑↓↓←→←→BA' },
  { id: 'name-click', name: 'Persistence', description: 'Click logo 5 times' },
  { id: 'quantum', name: 'Quantum', description: 'Type QUANTUM' },
];

const EasterEggSystem = () => {
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<EasterEgg | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [quantumProgress, setQuantumProgress] = useState('');
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showQuantumEffect, setShowQuantumEffect] = useState(false);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const unlockEasterEgg = useCallback((egg: EasterEgg) => {
    if (!foundEggs.includes(egg.id)) {
      setFoundEggs((prev) => [...prev, egg.id]);
      setShowNotification(egg);
      localStorage.setItem('easterEggs', JSON.stringify([...foundEggs, egg.id]));
      setTimeout(() => setShowNotification(null), 3000);
    }
  }, [foundEggs]);

  // Console messages
  useEffect(() => {
    console.log('%c👋 Oh hey, a fellow developer!', 'font-size: 20px; color: #00ffff;');
    console.log('%cSince you\'re here, here\'s a hint:', 'color: #ff006e;');
    console.log('%cTry the Konami code (↑↑↓↓←→←→BA)', 'color: #b967ff;');
    console.log('%cOr just email me. I like curious people.', 'color: #ffffff;');
    console.log('%cBuilt with: React, TypeScript, Tailwind, Framer Motion', 'color: #666;');
    console.log('%cBugs found: Please report them. I\'ll fix them. Probably.', 'color: #666;');
  }, []);

  // Load saved eggs
  useEffect(() => {
    const saved = localStorage.getItem('easterEggs');
    if (saved) {
      setFoundEggs(JSON.parse(saved));
    }
  }, []);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === konamiCode.length) {
          unlockEasterEgg(easterEggs[0]);
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, unlockEasterEgg]);

  // QUANTUM detection
  useEffect(() => {
    const target = 'QUANTUM';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      const newProgress = quantumProgress + e.key.toUpperCase();
      
      if (target.startsWith(newProgress)) {
        setQuantumProgress(newProgress);
        
        if (newProgress === target) {
          unlockEasterEgg(easterEggs[2]);
          setQuantumProgress('');
          setShowQuantumEffect(true);
          setTimeout(() => setShowQuantumEffect(false), 2000);
        }
      } else {
        setQuantumProgress('');
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [quantumProgress, unlockEasterEgg]);

  // Logo click detection
  useEffect(() => {
    const logo = document.querySelector('a[href="#hero"]');
    if (!logo) return;

    const handleClick = () => {
      const newCount = logoClickCount + 1;
      setLogoClickCount(newCount);
      
      if (newCount >= 5) {
        unlockEasterEgg(easterEggs[1]);
        setLogoClickCount(0);
      }
      
      // Reset after 2 seconds of no clicks
      setTimeout(() => setLogoClickCount(0), 2000);
    };

    logo.addEventListener('click', handleClick);
    return () => logo.removeEventListener('click', handleClick);
  }, [logoClickCount, unlockEasterEgg]);

  // Debug panel trigger (hover bottom right)
  useEffect(() => {
    let hoverTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 50;
      const isBottomRight = 
        e.clientX > window.innerWidth - threshold && 
        e.clientY > window.innerHeight - threshold;
      
      if (isBottomRight) {
        hoverTimeout = setTimeout(() => setShowDebugPanel(true), 3000);
      } else {
        clearTimeout(hoverTimeout);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hoverTimeout);
    };
  }, []);

  return (
    <>
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 z-50 bg-card border border-primary rounded-lg p-4 shadow-lg"
            style={{ boxShadow: '0 0 30px hsl(180 100% 50% / 0.3)' }}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-warning" />
              <div>
                <p className="font-mono font-bold text-primary">🏆 Easter Egg Found!</p>
                <p className="text-sm text-muted-foreground">{showNotification.name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quantum effect */}
      <AnimatePresence>
        {showQuantumEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: 0 
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Atom className="w-8 h-8 text-tertiary" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug panel */}
      <AnimatePresence>
        {showDebugPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg p-4 w-64"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">Debug Panel</span>
              <button
                onClick={() => setShowDebugPanel(false)}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2 text-xs">
              <p className="text-muted-foreground">
                Easter eggs found: <span className="text-primary">{foundEggs.length}/{easterEggs.length}</span>
              </p>
              
              <div className="space-y-1">
                {easterEggs.map((egg) => (
                  <div
                    key={egg.id}
                    className={`flex items-center gap-2 ${
                      foundEggs.includes(egg.id) ? 'text-success' : 'text-muted-foreground'
                    }`}
                  >
                    <span>{foundEggs.includes(egg.id) ? '✓' : '○'}</span>
                    <span>{egg.name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem('easterEggs');
                  setFoundEggs([]);
                }}
                className="mt-2 text-destructive hover:underline"
              >
                Reset progress
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggSystem;
