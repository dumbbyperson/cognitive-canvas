import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, AlertTriangle, Calendar } from 'lucide-react';

const FailureArchiveSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const emptyFailures = [1, 2, 3];

  return (
    <section id="failures" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Failure Archive</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Failed attempts that taught me more than successes
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {emptyFailures.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="empty-state group hover:border-destructive/50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 text-left">
                <div className="p-3 rounded-lg bg-destructive/10 self-start">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono font-bold text-lg text-muted-foreground">
                      FAILED: [Project Name]
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>[Date]</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p><span className="text-foreground font-medium">Expected:</span> <span className="text-muted-foreground">[What I thought would happen]</span></p>
                    <p><span className="text-foreground font-medium">What broke:</span> <span className="text-muted-foreground">[What actually happened]</span></p>
                    <p><span className="text-foreground font-medium">Why it broke:</span> <span className="text-muted-foreground">[Root cause analysis]</span></p>
                    <p><span className="text-foreground font-medium">What changed after:</span> <span className="text-muted-foreground">[How this changed my approach]</span></p>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                    <Plus className="w-4 h-4" />
                    <span className="text-xs">Click to document failure</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-8 italic"
        >
          Failures will be documented here as I learn from them
        </motion.p>
      </div>
    </section>
  );
};

export default FailureArchiveSection;
