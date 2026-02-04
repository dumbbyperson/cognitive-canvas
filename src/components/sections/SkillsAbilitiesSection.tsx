import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wrench, BookOpen, Sparkles, Palette, Plus } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'proficient',
    title: 'Proficient',
    description: 'Can build with',
    icon: Wrench,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'learning',
    title: 'Learning',
    description: 'Actively studying',
    icon: BookOpen,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: 'exploring',
    title: 'Exploring',
    description: 'Curious about',
    icon: Sparkles,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: 'creative',
    title: 'Creative Skills',
    description: 'Photography, design, etc.',
    icon: Palette,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
];

const SkillsAbilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Skills & Abilities</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Categorized by proficiency level—honesty over exaggeration
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="empty-state group hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="font-mono text-lg text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="min-h-[100px] flex flex-col items-center justify-center border border-dashed border-border rounded-lg p-4">
                  <p className="text-muted-foreground text-sm text-center mb-3">
                    [Add skills]
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <Plus className="w-3 h-3" />
                    <span>Add skills to this category</span>
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
          className="text-center text-sm text-muted-foreground mt-8 italic"
        >
          Be honest—it's more impressive than claiming expertise in everything
        </motion.p>
      </div>
    </section>
  );
};

export default SkillsAbilitiesSection;
