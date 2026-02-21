import { motion } from 'framer-motion';
import { ArrowUp, Github, Code2 } from 'lucide-react';

const techStack = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'D3.js'];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main footer text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground mb-2">
              Built with React, fueled by coffee and existential dread.
            </p>
            <p className="text-muted-foreground mb-4">
              Photographed by me. Coded by me. Overthought by me.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} [Murtuza Moosa] | Currently debugging life.
            </p>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <a
              href="https://github.com/dumbbyperson/cognitive-canvas"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          </motion.div>

          {/* Back to top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>

          {/* Last updated */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
