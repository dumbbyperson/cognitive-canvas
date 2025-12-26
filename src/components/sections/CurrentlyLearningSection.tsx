import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, BookOpen, Link2, Calendar } from 'lucide-react';

const CurrentlyLearningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section id="learning" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-header">Currently Learning</h2>
          <p className="section-subheader max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Updated: {currentDate}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Active learning questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h3 className="font-mono text-lg text-primary mb-4">Active Questions</h3>
            
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="empty-state group hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4 text-left">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h4 className="font-mono font-bold text-muted-foreground">
                      Active Question: [Add specific question you're exploring]
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground">Currently exploring:</span> [What you're studying]
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground">Resources:</span> [Books, papers, courses]
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground">Status:</span> [Where you are in the process]
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Started: [Date]
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4" />
                      <span className="text-xs">Add learning question</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Next up pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-mono text-lg text-secondary mb-4">Next Up (Pipeline)</h3>
            
            <div className="card-punk rounded-lg p-6">
              <ul className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                    <span className="w-2 h-2 rounded-full bg-muted group-hover:bg-secondary transition-colors" />
                    <span>[Topic to learn next]</span>
                    <Plus className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearningSection;
