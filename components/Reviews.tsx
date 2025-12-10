import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Local type to make this file self-contained
export interface Review {
  id: number;
  name: string;
  role?: string;
  videoThumb: string;   // poster / thumbnail
  videoUrl:string;     // iframe src (youtube or gdrive preview)
  directUrl?: string | null; // direct file URL for <video> tag (gdrive uc download), null for youtube
  type?: 'gdrive' | 'youtube';
}

// Fix for framer-motion TypeScript mismatch
const MotionDiv = motion.div as any;

/* -----------------------
   Raw reels (GDrive + YouTube)
   - Keep `type` to decide rendering
   ----------------------- */
const rawReels: Array<{ type: 'gdrive' | 'youtube'; filename: string; id: string; }> = [
  // Google Drive videos (kept as GDrive if you want <video> playback via directUrl)
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

  // YouTube Shorts (autoplay-safe embed URL: muted autoplay, playsinline, controls visible)
  { type: 'youtube', filename: 'Reel YT 1.mp4', id: 'kKkfUabtC0k' },
  { type: 'youtube', filename: 'Reel YT 2.mp4', id: 'e6umK6VXrjs' },
  { type: 'youtube', filename: 'Reel YT 3.mp4', id: 'dPYBTUzM0xs' },
];

/* -----------------------
   Map rawReels -> reviews array used by component
   - YouTube: iframe embed URL uses autoplay=1&mute=1&loop=1&playsinline=1&controls=1
   - GDrive: keep preview & direct download link (directUrl) for <video> tag
   ----------------------- */
const reviews: Review[] = rawReels.map((reel, index) => {
  const displayName = reel.filename
    .replace(/\.mp4$/i, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  if (reel.type === 'youtube') {
    return {
      id: index + 1,
      name: displayName,
      type: 'youtube',
      videoThumb: `https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`,
      // Autoplay-safe embed with muted autoplay (A1) and visible controls (B2)
      videoUrl: `https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=1&loop=1&playsinline=1&controls=1`,
      directUrl: null,
    };
  }

  // Google Drive item
  return {
    id: index + 1,
    name: displayName,
    type: 'gdrive',
    videoThumb: `https://drive.google.com/thumbnail?id=${reel.id}&sz=w600`,
    // iframe preview works for Drive inside many contexts (but Drive embedding has caveats depending on host)
    videoUrl: `https://drive.google.com/file/d/${reel.id}/preview`,
    // directUrl can be used in <video src=...> for in-browser playback — may require the file to be publicly accessible
    directUrl: `https://drive.google.com/uc?export=download&id=${reel.id}`,
  };
});

/* -----------------------
   ReelViewer - full-screen modal viewer
   - Uses iframe for both YouTube and Drive (videoUrl field)
   - Keyboard nav + swipe-safe
   ----------------------- */
const ReelViewer: React.FC<{ reviews: Review[]; startIndex: number; onClose: () => void; }> = ({ reviews, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const changeReel = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex(prev => (prev + 1) % reviews.length);
    } else {
      setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault(); changeReel(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); changeReel(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reviews.length]);
  
  // Reset iframe load state when video changes to show thumbnail again
  useEffect(() => {
    setIsIframeLoaded(false);
  }, [currentIndex]);

  const currentReview = reviews[currentIndex];

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.9 }),
    center: { zIndex: 1, y: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ zIndex: 0, y: dir < 0 ? '100%' : '-100%', opacity: 0, scale: 0.9 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg p-4"
      onClick={onClose}
    >
      {/* This container defines the size and aspect ratio for the player and serves as a positioning context for the buttons. */}
      <div className="relative w-full max-w-md max-h-[90vh] aspect-[9/16]" onClick={e => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ y: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.18 }, scale: { duration: 0.18 } }}
            className="absolute inset-0 w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Thumbnail as a separate layer */}
            <img
              src={currentReview.videoThumb}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
              style={{ opacity: isIframeLoaded ? 0 : 1 }}
            />
            
            {/* iframe for both youtube & gdrive preview */}
            <iframe
              key={currentReview.id}
              src={currentReview.videoUrl}
              onLoad={() => setIsIframeLoaded(true)}
              className="absolute inset-0 w-full h-full z-10 border-0 bg-transparent transition-opacity duration-500"
              style={{ opacity: isIframeLoaded ? 1 : 0 }}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title={currentReview.name}
            />

            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 p-6 flex flex-col justify-end pointer-events-none">
              <div>
                <p className="font-bold text-white text-lg">{currentReview.name}</p>
                {currentReview.role && <p className="text-sm text-gray-300">{currentReview.role}</p>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* The buttons are now positioned relative to the new aspect-ratio container. */}
        <button onClick={() => changeReel(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Previous reel">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button onClick={() => changeReel(1)} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Next reel">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="mt-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-red-500 transition-all text-sm font-mono group"
        aria-label="Close viewer"
      >
        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        <span>Close</span>
      </button>
    </motion.div>
  );
};

/* -----------------------
   Main Reviews component
   - carousel of cards
   - active card autoplays when in view
   - youtube cards autoplay via iframe (muted), gdrive uses <video>
   ----------------------- */
interface ReviewsProps {
  onViewerStateChange?: (isOpen: boolean) => void; // optional prop
}

const Reviews: React.FC<ReviewsProps> = ({ onViewerStateChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerState, setViewerState] = useState({ open: false, index: 0 });
  const viewerOpenRef = useRef(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });

  // history / popstate handling for modal
  useEffect(() => {
    const handlePopState = () => {
      if (viewerOpenRef.current) {
        setViewerState({ open: false, index: 0 });
        viewerOpenRef.current = false;
      }
    };

    if (viewerState.open) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [viewerState.open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && viewerState.open) {
        closeViewer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerState.open]);

  useEffect(() => {
    document.body.style.overflow = viewerState.open ? 'hidden' : 'auto';
    onViewerStateChange(viewerState.open);
  }, [viewerState.open, onViewerStateChange]);

  const openViewer = (index: number) => {
    setViewerState({ open: true, index });
    viewerOpenRef.current = true;
    // push history state so Escape/back closes modal
    window.history.pushState({ modal: 'reviews' }, '', window.location.href);
  };

  const closeViewer = () => {
    // use history back so popstate handler catches it
    window.history.back();
  };

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // calculate card styles for 3D carousel feel
  const getCardStyle = (index: number) => {
    const total = reviews.length;
    let distance = (index - activeIndex);
    if (distance > total / 2) distance -= total;
    if (distance < -total / 2) distance += total;
    const isActive = distance === 0;
    const isVisible = Math.abs(distance) <= 2;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const spacing = isMobile ? 60 : 280;
    const xOffset = distance * spacing;
    const scale = isActive ? 1.1 : Math.max(0.8 - (Math.abs(distance) * 0.1), 0.5);
    const opacity = isActive ? 1 : Math.max(0.6 - (Math.abs(distance) * 0.2), 0);
    const zIndex = isActive ? 50 : 10 - Math.abs(distance);
    const rotateY = distance * -15;
    return {
      isActive,
      isVisible,
      style: { x: xOffset, scale, opacity, zIndex, rotateY, filter: isActive ? 'blur(0px)' : 'blur(2px) grayscale(80%) brightness(0.5)' }
    };
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      openViewer(index);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={containerRef} id="client-reels" className="py-16 md:py-32 bg-[#08080c] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-transparent to-darkBg z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[500px] bg-creativeBlue/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 mb-8 md:mb-16 text-center relative z-20">
        <h2 className="text-xs md:text-sm font-mono text-creativeBlue mb-2 uppercase tracking-widest">04. Client Reels</h2>
      </div>

      <div className="relative h-[500px] md:h-[600px] w-full flex justify-center items-center perspective-1000 overflow-hidden">
        <button onClick={handlePrev} className="absolute left-2 md:left-20 z-50 p-2 md:p-4 rounded-full bg-white/5 hover:bg-creativeBlue/20 border border-white/10 hover:border-creativeBlue/50 transition-all text-white backdrop-blur-sm group">
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        </button>

        <button onClick={handleNext} className="absolute right-2 md:right-20 z-50 p-2 md:p-4 rounded-full bg-white/5 hover:bg-creativeBlue/20 border border-white/10 hover:border-creativeBlue/50 transition-all text-white backdrop-blur-sm group">
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        </button>

        <div className="relative flex items-center justify-center w-full h-full preserve-3d">
          {reviews.map((review, index) => {
            const { isActive, isVisible, style } = getCardStyle(index);
            const shouldPlay = isActive && isInView;

            return (
              <MotionDiv
                key={review.id}
                className="absolute w-[260px] md:w-[340px] aspect-[9/16] rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden cursor-pointer origin-center"
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ display: isVisible ? 'block' : 'none' }}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative w-full h-full bg-black group">
                  {shouldPlay ? (
                    // PLAYBACK: YouTube via iframe (muted autoplay) OR GDrive via <video>
                    review.type === 'youtube' ? (
                      <iframe
                        key={`yt-${review.id}-${activeIndex}`}
                        src={review.videoUrl}
                        className="absolute inset-0 w-full h-full z-10 border-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={review.name}
                      />
                    ) : (
                      <div className="w-full h-full relative">
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
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
                      </div>
                    )
                  ) : (
                    <>
                      {/* Thumbnail for both youtube & gdrive when not autoplaying in card */}
                      <img
                        src={review.videoThumb}
                        alt={review.name}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
                    </>
                  )}

                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 transition-all duration-300">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div>
                          <p className="text-xs md:text-sm font-bold text-white drop-shadow-md">{review.name}</p>
                          {review.role && <p className="text-[10px] md:text-xs text-gray-300 drop-shadow-md">{review.role}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-4 left-0 w-full h-4 bg-gradient-to-b from-white/10 to-transparent opacity-20 transform scale-y-[-1] blur-sm pointer-events-none" />
              </MotionDiv>
            );
          })}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-black/50 blur-3xl z-0 pointer-events-none" />
      </div>

      <AnimatePresence>
        {viewerState.open && (
          <ReelViewer
            reviews={reviews}
            startIndex={viewerState.index}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;
