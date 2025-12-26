import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Gamepad2, Music, Camera, Brain, Clock, Plus, Upload } from 'lucide-react';

const currentlyItems = [
  {
    id: 'reading',
    icon: BookOpen,
    label: 'Currently Reading',
    placeholder: '[Book title]',
    color: 'text-primary',
  },
  {
    id: 'playing',
    icon: Gamepad2,
    label: 'Currently Playing',
    placeholder: '[Game name]',
    color: 'text-secondary',
  },
  {
    id: 'listening',
    icon: Music,
    label: 'Currently Listening To',
    placeholder: '[Artist / Album / Playlist]',
    color: 'text-tertiary',
  },
  {
    id: 'photo',
    icon: Camera,
    label: "Last Photo I'm Proud Of",
    placeholder: 'Upload photo',
    color: 'text-success',
  },
  {
    id: 'crisis',
    icon: Brain,
    label: 'Current Existential Crisis',
    placeholder: '[Your thought about quantum mechanics or the universe]',
    color: 'text-warning',
  },
];

const CurrentlySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="currently" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Currently</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            What's happening in my world right now
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentlyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-punk rounded-xl p-6 group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <h3 className="font-mono font-bold text-sm">{item.label}</h3>
              </div>

              {item.id === 'photo' ? (
                <div className="aspect-video rounded-lg border-2 border-dashed border-muted flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs text-muted-foreground">{item.placeholder}</span>
                </div>
              ) : (
                <div className="min-h-[80px] flex items-center">
                  <p className="text-muted-foreground italic">
                    {item.placeholder}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-4">
                <Plus className="w-4 h-4" />
                <span className="text-xs">Add content</span>
              </div>
            </motion.div>
          ))}

          {/* Last updated card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card-punk rounded-xl p-6 flex flex-col items-center justify-center"
          >
            <Clock className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-mono text-lg text-primary">{lastUpdated}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlySection;
