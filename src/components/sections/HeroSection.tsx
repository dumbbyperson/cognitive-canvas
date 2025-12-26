import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const interests = [
  'Cybersecurity',
  'Artificial Intelligence',
  'Quantum Computing',
  'Astrophysics',
  'Cloud Computing',
  'Data Science',
];

const HeroSection = () => {
  const [currentInterest, setCurrentInterest] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Typing effect
  useEffect(() => {
    const targetText = interests[currentInterest];
    
    if (isTyping) {
      if (displayText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setCurrentInterest((prev) => (prev + 1) % interests.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentInterest]);

  // Clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToThink = () => {
    const element = document.getElementById('think');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines"
    >
      {/* VHS timestamp */}
      <div className="absolute top-20 right-4 md:right-8 font-mono text-xs text-destructive flex items-center gap-2 z-20">
        <span className="animate-pulse">●</span>
        <span>REC</span>
        <span className="text-muted-foreground">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </span>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Glitch title */}
          <h1
            className="glitch text-5xl md:text-7xl lg:text-8xl font-mono font-bold mb-6 leading-tight"
            data-text="[Your Name]"
          >
            [Your Name]
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
            [Your Tagline]
          </p>

          {/* Typing interests */}
          <div className="h-12 mb-12 flex items-center justify-center">
            <span className="text-lg md:text-xl text-muted-foreground">
              Exploring{' '}
            </span>
            <span className="text-lg md:text-xl text-primary font-mono ml-2 typing-cursor">
              {displayText}
            </span>
          </div>

          {/* CTA arrows */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={scrollToThink}
          >
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6 text-primary animate-pulse-glow" />
          </motion.div>
        </motion.div>
      </div>

      {/* Quantum wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <motion.path
            d="M0,60 Q150,0 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            initial={{ d: "M0,60 Q150,0 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" }}
            animate={{
              d: [
                "M0,60 Q150,0 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z",
                "M0,60 Q150,120 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z",
                "M0,60 Q150,0 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z",
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(180 100% 50% / 0.1)" />
              <stop offset="50%" stopColor="hsl(330 100% 50% / 0.1)" />
              <stop offset="100%" stopColor="hsl(270 100% 70% / 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
