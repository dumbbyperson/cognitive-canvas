import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Camera, X, Calendar } from 'lucide-react';

interface Photo {
  id: number;
  image: string;
  location: string;
  caption: string;
}

const allPhotos: Photo[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: '',
  location: '[Add location]',
  caption: '[Add caption]',
}));

const VISIBLE_COUNT = 9;

const PhotographySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [rotationKey, setRotationKey] = useState(0);

  const getRandomPhotos = useCallback(() => {
    const shuffled = [...allPhotos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, VISIBLE_COUNT);
  }, []);

  const rotate = useCallback(() => {
    setDisplayedPhotos(getRandomPhotos());
    setRotationKey(k => k + 1);
  }, [getRandomPhotos]);

  useEffect(() => {
    setDisplayedPhotos(getRandomPhotos());
    const interval = setInterval(rotate, 10000);
    return () => clearInterval(interval);
  }, [getRandomPhotos, rotate]);

  return (
    <section id="photography" className="py-24 md:py-32 bg-gradient-radial" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-header">Through My Lens</h2>
          <p className="section-subheader max-w-2xl mx-auto">
            When I'm not writing code or contemplating quantum mechanics, I'm usually behind a camera. Here's proof I occasionally go outside.
          </p>
        </motion.div>

        {/* Navigation arrows + grid */}
        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={rotate}
            className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors hidden lg:flex items-center justify-center z-10"
            aria-label="Previous photos"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={rotate}
            className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors hidden lg:flex items-center justify-center z-10"
            aria-label="Next photos"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {displayedPhotos.map((photo) => (
                <motion.div
                  key={`${photo.id}-${rotationKey}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: Math.random() * 0.2 }}
                  className="aspect-square rounded-xl overflow-hidden relative cursor-pointer group border border-border hover:border-primary/50 transition-colors"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {photo.image ? (
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-card flex flex-col items-center justify-center gap-3">
                      <Camera className="w-8 h-8 text-muted-foreground/50" />
                      <span className="text-xs text-muted-foreground/50">Photo {photo.id}</span>
                    </div>
                  )}

                  {/* Location overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                      <MapPin className="w-3.5 h-3.5" />
                      {photo.location}
                    </span>
                    {photo.caption && (
                      <p className="text-xs text-muted-foreground mt-1">{photo.caption}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <span className="text-sm text-muted-foreground">
            Showing {VISIBLE_COUNT} of {allPhotos.length} photos
          </span>
          <span className="text-xs text-muted-foreground/50">• auto-rotating every 10s</span>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-lg bg-muted text-foreground hover:bg-muted/80"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                <div className="aspect-video bg-card rounded-xl flex items-center justify-center overflow-hidden">
                  {selectedPhoto.image ? (
                    <img src={selectedPhoto.image} alt={selectedPhoto.caption} className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Camera className="w-12 h-12" />
                      <p>Upload photo to view</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-medium">{selectedPhoto.caption}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      {selectedPhoto.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotographySection;
