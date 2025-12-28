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

const rawReels: Array<{ type: 'gdrive'; filename: string; id: string }> = [
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

const reviews: Review[] = rawReels.map((reel, index) => {
  const displayName = reel.filename
    .replace(/\.mp4$/i, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return {
    id: index + 1,
    name: displayName,
    type: 'gdrive',
    videoThumb: `https://drive.google.com/thumbnail?id=${reel.id}&sz=w600`,
    videoUrl: `https://drive.google.com/file/d/${reel.id}/preview`,
    directUrl: `https://drive.google.com/uc?export=download&id=${reel.id}`,
  };
});

const ReelViewer: React.FC<{ reviews: Review[]; startIndex: number; onClose: () => void }> = ({ reviews, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const changeReel = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(prev => (newDirection === 1 ? (prev + 1) % reviews.length : (prev - 1 + reviews.length) % reviews.length));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); changeReel(1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); changeReel(-1); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reviews.length]);

  useEffect(() => setIsIframeLoaded(false), [currentIndex]);

  const currentReview = reviews[currentIndex];

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.9 }),
    center: { y: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (dir: number) => ({ y: dir < 0 ? '100%' : '-100%', opacity: 0, scale: 0.9, zIndex: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-md max-h-[90vh] aspect-[9/16]" onClick={e => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full bg-black rounded-2xl overflow-hidden border border-white/10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <img
              src={currentReview.videoThumb}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ opacity: isIframeLoaded ? 0 : 1 }}
            />

            <iframe
              key={currentReview.id}
              src={currentReview.videoUrl}
              onLoad={() => setIsIframeLoaded(true)}
              className="absolute inset-0 w-full h-full border-0 bg-transparent"
              style={{ opacity: isIframeLoaded ? 1 : 0 }}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title={currentReview.name}
            />

            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-20 p-6 pointer-events-none">
              <p className="font-bold text-white text-lg">{currentReview.name}</p>
              {currentReview.role && <p className="text-sm text-gray-300">{currentReview.role}</p>}
            </div>

          </motion.div>
        </AnimatePresence>

        <button onClick={() => changeReel(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 rounded-full">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button onClick={() => changeReel(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 rounded-full">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

      </div>

      <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="mt-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-sm font-mono">
        <X className="w-4 h-4" />
        <span>Close</span>
      </button>

    </motion.div>
  );
};

const Reviews: React.FC<{ onViewerStateChange?: (isOpen: boolean) => void }> = ({ onViewerStateChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerState, setViewerState] = useState({ open: false, index: 0 });
  const viewerOpenRef = useRef(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });

  useEffect(() => {
    const handlePopState = () => {
      if (viewerOpenRef.current) {
        setViewerState({ open: false, index: 0 });
        viewerOpenRef.current = false;
      }
    };
    if (viewerState.open) window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [viewerState.open]);

  useEffect(() => {
    document.body.style.overflow = viewerState.open ? 'hidden' : 'auto';
    onViewerStateChange(viewerState.open);
  }, [viewerState.open]);

  const openViewer = (index: number) => {
    setViewerState({ open: true, index });
    viewerOpenRef.current = true;
    window.history.pushState({ modal: 'reviews' }, '', window.location.href);
  };

  const closeViewer = () => window.history.back();

  const handleNext = () => setActiveIndex(prev => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex(prev => (prev - 1 + reviews.length) % reviews.length);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) openViewer(index);
    else setActiveIndex(index);
  };

  const getCardStyle = (index: number) => {
    const total = reviews.length;
    let distance = index - activeIndex;
    if (distance > total / 2) distance -= total;
    if (distance < -total / 2) distance += total;

    const isActive = distance === 0;
    const isVisible = Math.abs(distance) <= 2;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const spacing = isMobile ? 60 : 280;

    const xOffset = distance * spacing;
    const scale = isActive ? 1.1 : Math.max(0.8 - Math.abs(distance) * 0.1, 0.5);
    const opacity = isActive ? 1 : Math.max(0.6 - Math.abs(distance) * 0.2, 0);
    const rotateY = distance * -15;
    const zIndex = isActive ? 50 : 10 - Math.abs(distance);

    return { isActive, isVisible, style: { x: xOffset, scale, opacity, rotateY, zIndex } };
  };

  return (
    <section ref={containerRef} id="client-reels" className="py-16 md:py-32 bg-[#08080c] border-t border-white/5 relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] w-full flex justify-center items-center">
        <button onClick={handlePrev} className="absolute left-2 md:left-20 z-50 p-4 rounded-full bg-white/5 text-white">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={handleNext} className="absolute right-2 md:right-20 z-50 p-4 rounded-full bg-white/5 text-white">
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="relative flex items-center justify-center w-full h-full">
          {reviews.map((review, index) => {
            const { isActive, isVisible, style } = getCardStyle(index);
            const shouldPlay = isActive && isInView;

            return (
              <MotionDiv
                key={review.id}
                className="absolute w-[340px] aspect-[9/16] rounded-2xl bg-black border border-white/10 overflow-hidden cursor-pointer"
                animate={{ ...style }}
                style={{ display: isVisible ? 'block' : 'none' }}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative w-full h-full">
                  {shouldPlay && (
                    <video
                      key={`${review.id}-${activeIndex}`}
                      src={review.directUrl || undefined}
                      poster={review.videoThumb}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                  {!shouldPlay && <img src={review.videoThumb} className="w-full h-full object-cover" alt={review.name} />}
                </div>

                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    {review.role && <p className="text-xs text-gray-300">{review.role}</p>}
                  </div>
                )}
              </MotionDiv>
            );
          })}
        </div>

        <AnimatePresence>
          {viewerState.open && (
            <ReelViewer reviews={reviews} startIndex={viewerState.index} onClose={closeViewer} />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Reviews;
