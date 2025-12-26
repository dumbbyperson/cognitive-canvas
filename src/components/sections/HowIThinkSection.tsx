import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus } from 'lucide-react';

interface ThinkingPattern {
  id: string;
  title: string;
  content: string;
}

const emptyPatterns: ThinkingPattern[] = [
  { id: '1', title: '', content: '' },
  { id: '2', title: '', content: '' },
  { id: '3', title: '', content: '' },
  { id: '4', title: '', content: '' },
  { id: '5', title: '', content: '' },
  { id: '6', title: '', content: '' },
];

const HowIThinkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="think" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">How I Think</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Cognitive patterns that shape how I approach problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {emptyPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="empty-state group hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center min-h-[150px]">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                <p className="empty-state-text text-sm">
                  [Add thinking pattern]
                </p>
                <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                  Bold statement + 2-3 sentences explaining it with examples
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIThinkSection;
