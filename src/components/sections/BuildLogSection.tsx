import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, Calendar } from 'lucide-react';

const BuildLogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const emptyEntries = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  return (
    <section id="build-log" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Build Log</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Raw, time-stamped work notes. How the sausage gets made.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Terminal header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="terminal rounded-t-lg"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="ml-4 text-sm text-muted-foreground font-mono">build_log.sh</span>
            </div>
          </motion.div>

          {/* Log entries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="terminal rounded-b-lg p-6 font-mono text-sm space-y-6"
          >
            <div className="text-success">
              {'>'} Initializing build log...
            </div>

            {emptyEntries.map((entry, index) => (
              <div key={entry.id} className="border border-dashed border-muted rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>[Week of MM/DD/YYYY]</span>
                </div>
                
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="text-primary">Worked on:</span> [Add what you worked on]</p>
                  <p><span className="text-secondary">Blocked by:</span> [Add blockers]</p>
                  <p><span className="text-tertiary">Next question:</span> [Add next question]</p>
                  <p><span className="text-foreground">Progress:</span> [Add progress update]</p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4" />
                  <span className="text-xs">Click to add entry</span>
                </div>
              </div>
            ))}

            <div className="text-muted-foreground animate-pulse">
              {'>'} Waiting for new entries<span className="typing-cursor"></span>
            </div>
          </motion.div>

          {/* Add entry button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 w-full py-3 rounded-lg border-2 border-dashed border-muted hover:border-primary text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add new log entry
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default BuildLogSection;
