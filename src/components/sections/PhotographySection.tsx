import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Upload } from 'lucide-react';

interface Photo {
  id: number;
  image: string;
  caption: string;
  date: string;
  location: string;
}

const allPhotos: Photo[] = [
  { id: 1,  image: '/photos/placeholder1.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 2,  image: '/photos/placeholder2.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 3,  image: '/photos/placeholder3.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 4,  image: '/photos/placeholder4.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 5,  image: '/photos/placeholder5.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 6,  image: '/photos/placeholder6.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 7,  image: '/photos/placeholder7.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 8,  image: '/photos/placeholder8.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 9,  image: '/photos/placeholder9.jpg',  location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 10, image: '/photos/placeholder10.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 11, image: '/photos/placeholder11.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 12, image: '/photos/placeholder12.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 13, image: '/photos/placeholder13.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 14, image: '/photos/placeholder14.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 15, image: '/photos/placeholder15.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
  { id: 16, image: '/photos/placeholder16.jpg', location: '[Add location]', caption: '[Add caption]', date: '[Date]' },
];

const VISIBLE_COUNT = 9;

const getRandomPhotos = (): Photo[] => {
  const shuffled = [...allPhotos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, VISIBLE_COUNT);
};

const PhotographySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>(() => getRandomPhotos());
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);
  const [fadeKey, setFadeKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPhotos(getRandomPhotos());
      setFadeKey(k => k + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const gridPhotos = [...uploadedPhotos, ...displayedPhotos].slice(0, VISIBLE_COUNT);
  const selectedIndex = selectedPhoto ? gridPhotos.findIndex(p => p.id === selectedPhoto.id) : -1;

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const id = 1000 + uploadedPhotos.length;
    const photo: Photo = {
      id,
      image: URL.createObjectURL(file),
      caption: file.name.replace(/\.[^/.]+$/, ''),
      location: 'Uploaded',
      date: new Date().toLocaleDateString(),
    };
    setUploadedPhotos(prev => [...prev, photo]);
    e.target.value = '';
  };

  const goNext = () => {
    const next = gridPhotos[(selectedIndex + 1) % gridPhotos.length];
    setSelectedPhoto(next);
  };

  const goPrev = () => {
    const prev = gridPhotos[(selectedIndex - 1 + gridPhotos.length) % gridPhotos.length];
    setSelectedPhoto(prev);
  };

  // Heights for masonry effect
  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60'];

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
          <p className="text-xs text-muted-foreground mt-2">
            Showing {gridPhotos.length} photos {uploadedPhotos.length > 0 ? `(${uploadedPhotos.length} yours)` : '(from gallery)'} · Rotates every 10s
          </p>
          {uploadedPhotos.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Your uploads appear first. Refresh to reset.
            </p>
          )}
          <div className="mt-4 flex justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAddPhoto}
              className="hidden"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-primary/50 text-primary hover:bg-primary/10 transition-colors text-sm"
            >
              <Upload className="w-4 h-4" />
              Add photo
            </button>
          </div>
        </motion.div>

        {/* Photo grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={fadeKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="masonry-grid max-w-6xl mx-auto"
          >
            {gridPhotos.map((photo, index) => {
              const height = heights[index % heights.length];
              const isUploaded = photo.id >= 1000;
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="masonry-item"
                >
                  <div
                    onClick={() => setSelectedPhoto(photo)}
                    className={`${height} rounded-xl border-2 border-dashed border-muted hover:border-primary/50 transition-colors cursor-pointer group flex flex-col items-center justify-center gap-3 bg-card/50 relative overflow-hidden`}
                  >
                    {isUploaded && photo.image.startsWith('blob:') ? (
                      <img
                        src={photo.image}
                        alt={photo.caption}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                          <MapPin className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm text-muted-foreground">View</span>
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/80 text-xs text-muted-foreground flex items-center justify-center gap-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {photo.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {photo.date}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

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

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-muted text-foreground hover:bg-muted/80"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-muted text-foreground hover:bg-muted/80"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                <div className="aspect-video bg-card rounded-xl flex items-center justify-center overflow-hidden">
                  {selectedPhoto.image.startsWith('blob:') || selectedPhoto.image.startsWith('http') ? (
                    <img
                      src={selectedPhoto.image}
                      alt={selectedPhoto.caption}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <p className="text-muted-foreground">Photo will display here</p>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-medium">{selectedPhoto.caption}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedPhoto.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedPhoto.date}
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
