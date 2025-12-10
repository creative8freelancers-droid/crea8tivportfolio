import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface Review {
  id: number;
  name: string;
  role?: string;
  videoThumb: string;
  videoUrl: string;
  directUrl?: string | null;
  type?: 'gdrive' | 'youtube';
}

const MotionDiv = motion.div as any;

/* ---------------------------------------
   RAW videos (Google Drive + YouTube)
---------------------------------------- */
const rawReels = [
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

  // YouTube Shorts
  { type: 'youtube', filename: 'Reel YT 1.mp4', id: 'kKkfUabtC0k' },
  { type: 'youtube', filename: 'Reel YT 2.mp4', id: 'e6umK6VXrjs' },
  { type: 'youtube', filename: 'Reel YT 3.mp4', id: 'dPYBTUzM0xs' },
];

/* ---------------------------------------
   Convert into unified Review objects
---------------------------------------- */
const reviews: Review[] = rawReels.map((reel, index) => {
  const name = reel.filename.replace(/\.mp4$/i, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  if (reel.type === 'youtube') {
    return {
      id: index + 1,
      name,
      type: 'youtube',
      videoThumb: `https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`,
      videoUrl: `https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=1&loop=1&playsinline=1&controls=1`,
      directUrl: null,
    };
  }

  return {
    id: index + 1,
    name,
    type: 'gdrive',
    videoThumb: `https://drive.google.com/thumbnail?id=${reel.id}&sz=w600`,
    videoUrl: `https://drive.google.com/file/d/${reel.id}/preview`,
    directUrl: `https://drive.google.com/uc?export=download&id=${reel.id}`,
  };
});
/* ---------------------------------------
   Fullscreen Reel Viewer
---------------------------------------- */
const ReelViewer: React.FC<{ reviews: Review[]; startIndex: number; onClose: () => void }> =
({ reviews, startIndex, onClose }) => {

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex(i => (i + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex(i => (i - 1 + reviews.length) % reviews.length);
  };

  const video = reviews[currentIndex];

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>

      <div className="relative w-full max-w-[420px] aspect-[9/16]" onClick={e => e.stopPropagation()}>
        <AnimatePresence initial={false}>
          <motion.div key={currentIndex}
            initial={{ y: direction > 0 ? 200 : -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction > 0 ? -200 : 200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 shadow-xl"
          >
            {/* FIX: 9:16 perfect crop for Google Drive */}
            {video.type === 'gdrive' ? (
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  src={video.videoUrl}
                  className="w-[200%] h-[200%] scale-[1.25] translate-x-[-25%] translate-y-[-10%]"
                  allow="autoplay; encrypted-media; fullscreen"
                />
              </div>
            ) : (
              <iframe
                src={video.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
              />
            )}

            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-bold">{video.name}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAV BUTTONS */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
          <ChevronLeft className="text-white" />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
          <ChevronRight className="text-white" />
        </button>
      </div>

      <button onClick={onClose} className="absolute bottom-10 px-4 py-2 bg-black/50 text-white border border-white/20 rounded-lg">
        <X className="inline mr-2" /> Close
      </button>
    </motion.div>
  );
};
/* ---------------------------------------
   MAIN CAROUSEL COMPONENT
---------------------------------------- */
const Reviews: React.FC = () => {

  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const openViewer = (i: number) => setViewer({ open: true, index: i });

  const getStyle = (i: number) => {
    const diff = i - active;
    const wrap = ((diff + reviews.length + reviews.length / 2) % reviews.length) - reviews.length / 2;

    return {
      x: wrap * 260,
      scale: wrap === 0 ? 1.1 : 0.8,
      opacity: wrap === 0 ? 1 : 0.5,
      zIndex: wrap === 0 ? 50 : 0,
    };
  };

  return (
    <section ref={ref} className="py-20 bg-[#0a0a0c] overflow-hidden relative">
      <h2 className="text-center text-white text-xl mb-10">Client Reels</h2>

      <div className="relative h-[500px] flex justify-center items-center">
        {reviews.map((v, i) => {
          const activeCard = i === active;
          const play = activeCard && isInView;

          return (
            <MotionDiv key={v.id}
              animate={getStyle(i)}
              className="absolute w-[260px] aspect-[9/16] rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer"
              onClick={() => (activeCard ? openViewer(i) : setActive(i))}
            >
              {play ? (
                v.type === 'youtube' ? (
                  <iframe
                    src={v.videoUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <div className="absolute inset-0 overflow-hidden">
                    {/* FIX: Google Drive behaves like YouTube Shorts */}
                    <iframe
                      src={v.videoUrl}
                      className="w-[200%] h-[200%] scale-[1.25] translate-x-[-25%] translate-y-[-25%]"
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )
              ) : (
                <img src={v.videoThumb} className="w-full h-full object-cover" />
              )}

              {activeCard && (
                <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white">{v.name}</p>
                </div>
              )}
            </MotionDiv>
          );
        })}
      </div>

      {viewer.open && (
        <ReelViewer
          reviews={reviews}
          startIndex={viewer.index}
          onClose={() => setViewer({ open: false, index: 0 })}
        />
      )}
    </section>
  );
};

export default Reviews;
