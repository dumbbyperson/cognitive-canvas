import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Github, Linkedin, Instagram, Send } from 'lucide-react';

const socialLinks = [
  { id: 'email', icon: Mail, label: 'Email', placeholder: '[Your email]', href: '#' },
  { id: 'github', icon: Github, label: 'GitHub', placeholder: '[Username]', href: '#' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', placeholder: '[Profile]', href: '#' },
  { id: 'instagram', icon: Instagram, label: 'Instagram', placeholder: '[Username]', href: '#' },
];

const StickyContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-mono font-bold shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Let's Talk</span>
      </motion.button>

      {/* Contact Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md"
            >
              <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-mono text-lg text-foreground">Let's Connect</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Want to talk quantum, space, code, or collaborate on a project?
                  </p>

                  {/* Social Links */}
                  <div className="space-y-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.href}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      >
                        <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="flex-1">
                          <p className="text-sm font-mono text-foreground">{link.label}</p>
                          <p className="text-xs text-muted-foreground">{link.placeholder}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Quick Message */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Or send a quick message:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Your message..."
                        className="flex-1 px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      Configure email backend to enable messaging
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyContactButton;
