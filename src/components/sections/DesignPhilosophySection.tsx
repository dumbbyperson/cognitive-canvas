import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus } from 'lucide-react';

const examplePrinciples = [
  "I prototype before optimizing",
  "I test assumptions early",
  "I prefer simple models that explain behavior",
  "I learn in public",
  "I value constraints",
  "I document for my future self",
  "I ship incomplete work",
  "I fail informatively",
];

const DesignPhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Design Philosophy</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Principles I actually follow, not aspirational fluff
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {examplePrinciples.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card-punk rounded-lg p-6 group cursor-pointer"
            >
              <h3 className="font-mono font-bold text-sm mb-3 text-primary group-hover:neon-cyan transition-all">
                "{principle}"
              </h3>
              <p className="text-xs text-muted-foreground">
                [Add 2-3 sentence explanation with concrete examples]
              </p>
              <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                <Plus className="w-3 h-3" />
                <span className="text-xs">Add explanation</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 mx-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-muted hover:border-primary text-muted-foreground hover:text-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add principle
        </motion.button>
      </div>
    </section>
  );
};

export default DesignPhilosophySection;
