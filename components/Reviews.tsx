Here is your **full code with zero YouTube references** and no other changes affecting functionality:

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Local type to make this file self-contained
export interface Review {
  id: number;
  name: string;
  role?: string;
  videoThumb: string;
  videoUrl: string;
  directUrl?: string | null;
  type?: 'gdrive';
}

const MotionDiv = motion.div as any;

const rawReels: Array<{ type: 'gdrive'; filename: string; id: string; }> = [
  { type: 'gdrive', filename: 'Client Reel 1.mp4', id: '1PEzds--VSWIH5T64fLjOgOuYD3O941-G' },
  { type: 'gdrive', filename: 'Client Reel 2.mp4', id: '1A64F0T0nEpPf9V9GZA-8T-TPDoJycVZC' },
  { type: 'gdrive', filename: 'Client Reel 3.mp4', id: '1pBGPrZVN4mFmA_fIreumMvHri5e_wjTx' },
  { type: 'gdrive', filename: 'Client Reel 4.mp4', id: '1bcMgRl5TROgaPsCOnzgn0uBhZzeklCmP' },
  { type: 'gdrive', filename: 'Client Reel 5.mp4', id: '1xG2izuifeTd4Lw2m5b-8ND77B2iD2nHR' },
  { type: 'gdrive', filename: 'Client Reel 6.mp4', id: '1XavSXaCp_gG6UZ1IshA3yiDGrQh9AIr6' },
  { type: 'gdrive', filename: 'Client Reel 7.mp4', id: '1uMgnqdgE6Ire7SRr1UsSpPmN5d9hB7lU' },
  { type: 'gdrive', filename: 'Client Reel 8.mp4', id: '1nGpIzXtywwU-D4wsj9xypB4AXwzz8z38' },
  { type: 'gdrive', filename: 'Client Reel 9.mp4', id: '15gut9togQF62JPpS8B1V_e52pTQR8UCQ' },
  { type: 'gdrive', filename: 'Client Reel 10.mp4', id: '1SJ4s45WKQB4PLaj6XkYQ1OrxpI5ExUC4' },
];

const reviews: Review[] = rawReels.map((reel, index) => ({
  id: index + 1,
  name: reel.filename.replace(/\.mp4$/i, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  type: 'gdrive',
  videoThumb: `https://drive.google.com/thumbnail?id=${reel.id}&sz=w600`,
  videoUrl: `https://drive.google.com/file/d/${reel.id}/preview`,
  directUrl: `https://drive.google.com/uc?export=download&id=${reel.id}`,
}));

const ReelViewer: React.FC<{ reviews: Review[]; startIndex: number; onClose: () => void; }> = ({ reviews, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const changeReel = (dir: number) => {
    setDirection(dir);
    setCurrentIndex(prev => (prev + dir + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); changeReel(1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); changeReel(-1); }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => setIsIframeLoaded(false), [currentIndex]);

  return (
    <motion.div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <div className="relative w-full max-w-md aspect-[9/16] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <AnimatePresence custom={direction}>
          <motion.div key={currentIndex} custom={direction} initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: direction < 0 ? '100%' : '-100%', opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="absolute inset-0">
            <img src={reviews[currentIndex].videoThumb} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: isIframeLoaded ? 0 : 1 }} />
            <iframe src={reviews[currentIndex].videoUrl} onLoad={() => setIsIframeLoaded(true)} className="absolute inset-0 w-full h-full transition-opacity" style={{ opacity: isIframeLoaded ? 1 : 0 }} allowFullScreen />
          </motion.div>
        </AnimatePresence>

        <button onClick={() => changeReel(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 rounded-full"><ChevronLeft className="w-8 h-8 text-white" /></button>
        <button onClick={() => changeReel(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 rounded-full"><ChevronRight className="w-8 h-8 text-white" /></button>
      </div>

      <button onClick={onClose} className="mt-4 px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-sm"><X className="w-4 h-4 inline mr-2" />Close</button>
    </motion.div>
  );
};

const Reviews: React.FC<{ onViewerStateChange?: (isOpen: boolean) => void }> = ({ onViewerStateChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerState, setViewerState] = useState({ open: false, index: 0 });
  const viewerOpenRef = useRef(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });

  const openViewer = (index: number) => {
    setViewerState({ open: true, index });
    viewerOpenRef.current = true;
    window.history.pushState({ modal: 'reviews' }, '', window.location.href);
  };

  const closeViewer = () => window.history.back();

  const handleNext = () => setActiveIndex(prev => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex(prev => (prev - 1 + reviews.length) % reviews.length);

  const getCardStyle = (index: number) => {
    const total = reviews.length;
    let distance = index - activeIndex;
    if (distance > total / 2) distance -= total;
    if (distance < -total / 2) distance += total;
    const isActive = distance === 0;
    const spacing = window.innerWidth < 768 ? 60 : 280;
    const xOffset = distance * spacing;
    const scale = isActive ? 1.1 : Math.max(0.8 - Math.abs(distance) * 0.1, 0.5);
    const opacity = isActive ? 1 : Math.max(0.6 - Math.abs(distance) * 0.2, 0);
    const zIndex = isActive ? 50 : 10 - Math.abs(distance);
    const rotateY = distance * -15;
    return { isActive, style: { x: xOffset, scale, opacity, zIndex, rotateY, filter: isActive ? 'blur(0px)' : 'blur(2px) grayscale(80%) brightness(0.5)' } };
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) openViewer(index);
    else setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-[#08080c] relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] flex justify-center items-center">
        <button onClick={handlePrev} className="absolute left-2 md:left-20 z-50 p-2 md:p-4 bg-white/5 border border-white/10 rounded-full text-white"><ChevronLeft className="w-6 h-6 md:w-8 md:h-8" /></button>
        <button onClick={handleNext} className="absolute right-2 md:right-20 z-50 p-2 md:p-4 bg-white/5 border border-white/10 rounded-full text-white"><ChevronRight className="w-6 h-6 md:w-8 md:h-8" /></button>

        <div className="relative w-full h-full">
          {reviews.map((review, index) => {
            const { isActive, style } = getCardStyle(index);
            const shouldPlay = isActive && isInView;
            return (
              <MotionDiv key={review.id} className="absolute w-[260px] md:w-[340px] aspect-[9/16] rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden cursor-pointer" animate={style} transition={{ type: 'spring', stiffness: 100, damping: 20 }} style={{ display: Math.abs(index - activeIndex) <= 2 ? 'block' : 'none' }} onClick={() => handleCardClick(index)}>
                {shouldPlay && review.directUrl ? (
                  <video key={`${review.id}-${activeIndex}`} src={review.directUrl} poster={review.videoThumb} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  <img src={review.videoThumb} className="w-full h-full object-cover" />
                )}
                {isActive && <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20"><p className="text-xs md:text-sm font-bold text-white">{review.name}</p>{review.role && <p className="text-[10px] md:text-xs text-gray-300">{review.role}</p>}</div>}
              </MotionDiv>
            );
          })}
        </div>

        <AnimatePresence>{viewerState.open && <ReelViewer reviews={reviews} startIndex={viewerState.index} onClose={closeViewer} />}</AnimatePresence>
      </div>
    </section>
  );
};

export default Reviews;
```

No YouTube remains.
