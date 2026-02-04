import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Plus } from 'lucide-react';

const AboutMeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">About Me</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            The story behind the code
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="empty-state group hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
              <div className="p-4 rounded-full bg-muted mb-6 group-hover:bg-primary/10 transition-colors">
                <User className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-mono text-foreground mb-4">[Your Story]</h3>
              <div className="text-center space-y-4 max-w-xl">
                <p className="text-muted-foreground">
                  Brief introduction about your journey into engineering and technology.
                </p>
                <p className="text-muted-foreground">
                  Share what got you started, what you're passionate about, and where you're headed.
                </p>
                <p className="text-sm text-muted-foreground/70 mt-6">
                  3-4 paragraphs, conversational tone
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-primary">
                <Plus className="w-4 h-4" />
                <span>Add your story</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection;
