import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, School, Plus, MapPin, Calendar, BookOpen } from 'lucide-react';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-header">Education</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            Academic foundation and future plans
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* High School */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="empty-state group hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col min-h-[280px] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <School className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono text-lg text-foreground">High School</h3>
                  <p className="text-sm text-muted-foreground">Current</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">School Name</p>
                    <p className="text-foreground">Garodia International Centre for Learning</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground">Mumbai, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Graduation</p>
                    <p className="text-foreground">2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Relevant Coursework</p>
                    <p className="text-foreground">Mathematics, Physics, Computer Science</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* University */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="empty-state group hover:border-secondary/50 transition-colors cursor-pointer"
          >
            <div className="flex flex-col min-h-[280px] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-mono text-lg text-foreground">University</h3>
                  <p className="text-sm text-muted-foreground">Starting 2026</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Institution</p>
                    <p className="text-foreground">TBD</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Program</p>
                    <p className="text-foreground"></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <School className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Focus Areas</p>
                    <p className="text-foreground">Computer Science, Mathematics, Physics</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
