import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Clock, Lightbulb, Wrench, DollarSign } from 'lucide-react';

const constraintTypes = [
  { id: 'time', label: 'Time', icon: Clock },
  { id: 'knowledge', label: 'Knowledge Gap', icon: Lightbulb },
  { id: 'tool', label: 'Tool Limitation', icon: Wrench },
  { id: 'budget', label: 'Budget', icon: DollarSign },
];

const ConstraintsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="constraints" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Working Under Constraints</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Real engineering happens within limits, not despite them
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {constraintTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="empty-state group hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <div className="p-3 rounded-lg bg-muted mb-4 group-hover:bg-primary/10 transition-colors">
                  <type.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-mono font-bold text-lg mb-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  {type.label} Constraint
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
                  [Add constraint example from a real project]
                </p>
                <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4" />
                  <span className="text-xs">Click to add</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Add examples as projects develop
        </motion.p>
      </div>
    </section>
  );
};

export default ConstraintsSection;
