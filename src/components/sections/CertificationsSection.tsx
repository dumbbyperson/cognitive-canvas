import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Trophy, Medal, Star, Plus, ExternalLink } from 'lucide-react';

interface CertCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
}

const certCategories: CertCategory[] = [
  { id: 'professional', title: 'Professional Certifications', icon: Award, color: 'text-primary' },
  { id: 'academic', title: 'Academic Awards', icon: Medal, color: 'text-secondary' },
  { id: 'competitions', title: 'Competition Results', icon: Trophy, color: 'text-accent' },
  { id: 'recognition', title: 'Project Recognition', icon: Star, color: 'text-purple-400' },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Certifications & Achievements</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Verifiable credentials and recognition
          </p>
        </motion.div>

        {/* Categories */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {certCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
              >
                <cat.icon className={`w-4 h-4 ${cat.color}`} />
                <span className="text-sm text-muted-foreground">{cat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="empty-state group hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <Award className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Certificate Name</p>
                      <p className="text-foreground font-mono">[Add certificate]</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Issuing Organization</p>
                      <p className="text-foreground">[Organization]</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Date Earned</p>
                        <p className="text-foreground">[Date]</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">What it proves</p>
                      <p className="text-sm text-muted-foreground">[Brief description]</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <Plus className="w-3 h-3" />
                    <span>Add certification</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors opacity-50">
                    <ExternalLink className="w-3 h-3" />
                    <span>Verify on LinkedIn</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Add your certifications, awards, and achievements as you earn them.
          Include verification links where possible.
        </motion.p>
      </div>
    </section>
  );
};

export default CertificationsSection;
