import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, ArrowLeft, Filter, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data';

interface PortfolioProps {
  selectedCategory: string | null;
  onClearFilter: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ selectedCategory, onClearFilter }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Reset slide index when category changes
  useEffect(() => {
    setMobileSlideIndex(0);
  }, [selectedCategory]);

  // HISTORY MANAGEMENT FOR MODAL
  useEffect(() => {
    const handlePopState = () => {
      setSelectedProject(null);
    };

    if (selectedProject) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedProject]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
  }, [selectedProject]);

  const handleOpenModal = (project: Project) => {
    // Only redirect to external links when viewing a specific category, not from the main film roll.
    if (project.externalLink && selectedCategory) {
      window.open(project.externalLink, '_blank');
      return;
    }
    // For long form content in film roll, just show the image in modal
    if (project.category === "Long Form" && !selectedCategory && project.externalLink) {
        setSelectedProject(project);
        setIsPlaying(false);
        window.history.pushState({ modal: 'portfolio' }, '', window.location.href);
        return;
    }
    setSelectedProject(project);
    setIsPlaying(false);
    window.history.pushState({ modal: 'portfolio' }, '', window.location.href);
  };

  const handleCloseModal = () => {
    window.history.back();
  };
  
  // Filter projects for category view
  const filteredProjects = selectedCategory 
    ? projects.filter(p => p.category === selectedCategory)
    : projects;

  // Filter projects for the film roll view
  const longFormProjects = projects.filter(p => p.category === 'Long Form');

  // Logic for Modal Navigation
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(false);
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(false);
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };
  
  // Keyboard Navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, filteredProjects]); // Re-bind if filtered projects change
  
  // If no category selected, we duplicate list for the infinite scroll effect
  const displayProjects = selectedCategory 
    ? filteredProjects 
    : [...longFormProjects, ...longFormProjects];

  const isVideoContent = (project: Project) => !!project.videoUrl || !!project.externalLink;

  const getHighResThumbnail = (project: Project | null): string => {
    if (!project) return '';
    if (project.thumbnail.includes('drive.google.com')) {
      return `${project.thumbnail}&sz=w1920`;
    }
    return project.thumbnail;
  };
  
  const handleMobileNext = () => {
    setDirection(1);
    setMobileSlideIndex(prev => (prev + 1) % filteredProjects.length);
  };

  const handleMobilePrev = () => {
    setDirection(-1);
    setMobileSlideIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-[#020205] border-t border-white/5 relative overflow-hidden min-h-[60vh] md:min-h-[80vh]">
      
      {/* Section Header */}
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xs md:text-sm font-mono text-creativeBlue uppercase tracking-widest">03. Our Recent Works</h2>
                {selectedCategory && (
                    <span className="text-[10px] md:text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                        <Filter className="w-3 h-3" /> FILTERED
                    </span>
                )}
            </div>
            
            <div className="flex items-center gap-4">
                {selectedCategory && (
                    <button 
                        onClick={onClearFilter}
                        className="group flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 hover:border-creativeBlue hover:bg-creativeBlue/10 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-creativeBlue" />
                    </button>
                )}
                <h3 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-3">
                {selectedCategory ? (
                    <span className="text-creativeBlue">{selectedCategory} Library</span>
                ) : (
                    <>
                        <Film className="w-6 h-6 md:w-8 md:h-8 animate-spin-slow text-creativeBlue" /> The Film Roll
                    </>
                )}
                </h3>
            </div>
          </div>

          <div className="text-right hidden md:block">
            <div className="text-xs font-mono text-creativeBlue animate-pulse mb-1">● REC</div>
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
              {selectedCategory ? `${filteredProjects.length} CLIPS FOUND` : "Hover to Pause / Click to View"}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT DISPLAY */}
      {selectedCategory ? (
        (isMobile && filteredProjects.length > 0) ? (
          /* MOBILE SLIDER VIEW */
          <div className="container mx-auto px-4 relative h-[45vh] flex items-center justify-center animate-fade-in">
              <button onClick={handleMobilePrev} className="absolute left-0 z-20 p-2 bg-black/30 rounded-full backdrop-blur-sm">
                  <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="relative w-full h-full max-w-[70vw] overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={mobileSlideIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute w-full h-full"
                    onClick={() => handleOpenModal(filteredProjects[mobileSlideIndex])}
                  >
                     <div className="relative group cursor-pointer overflow-hidden rounded-md shadow-lg h-full">
                        <img
                            src={filteredProjects[mobileSlideIndex].thumbnail}
                            alt={filteredProjects[mobileSlideIndex].title}
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                        {isVideoContent(filteredProjects[mobileSlideIndex]) && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                    {filteredProjects[mobileSlideIndex].externalLink ? (
                                        <ExternalLink className="w-4 h-4 text-white" />
                                    ) : (
                                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button onClick={handleMobileNext} className="absolute right-0 z-20 p-2 bg-black/30 rounded-full backdrop-blur-sm">
                  <ChevronRight className="w-6 h-6 text-white" />
              </button>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="container mx-auto px-4 md:px-6 animate-fade-in-up">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProjects.map((project) => (
                      <div
                          key={project.id}
                          onClick={() => handleOpenModal(project)}
                          className="relative group cursor-pointer overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-creativeBlue/20"
                      >
                          <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-full h-auto object-cover"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                          {isVideoContent(project) && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                      {project.externalLink ? (
                                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                      ) : (
                                          <Play className="w-4 h-4 md:w-5 md:h-5 fill-white text-white ml-0.5" />
                                      )}
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
              {filteredProjects.length === 0 && (
                  <div className="text-center py-20 text-gray-500 font-mono">
                      No projects found in this category.
                  </div>
              )}
          </div>
        )
      ) : (
        /* INFINITE SCROLL VIEW (Default) */
        <div className="relative w-full bg-black border-y-4 md:border-y-8 border-[#1a1a1a] py-6 md:py-8 group/strip">
            
            {/* Top Sprocket Holes */}
            <div className="absolute top-[-6px] md:top-[-8px] left-0 w-full h-1.5 md:h-2 z-20 flex justify-between overflow-hidden">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_12px,#020205_12px,#020205_24px)] opacity-50" />
            </div>

            {/* The Rolling Animation Track */}
            <div className="flex w-max animate-scroll group-hover/strip:pause">
            {displayProjects.map((project, index) => (
                <div 
                key={`${project.id}-${index}`}
                className="relative w-[280px] md:w-[450px] aspect-video flex-shrink-0 mx-2 md:mx-4 bg-[#111] border-y-[8px] md:border-y-[12px] border-black cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 hover:border-creativeBlue/50"
                onClick={() => handleOpenModal(project)}
                >
                
                {/* Image */}
                <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 filter sepia-[50%] group-hover:sepia-0"
                />

                {/* Film Sprockets (Per Frame Decoration) */}
                <div className="absolute -top-2 md:-top-3 left-0 w-full h-2 flex justify-between px-2">
                    {[...Array(8)].map((_, i) => <div key={i} className="w-3 md:w-4 h-1 md:h-1.5 bg-white/10 rounded-sm" />)}
                </div>
                <div className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-2 flex justify-between px-2">
                    {[...Array(8)].map((_, i) => <div key={i} className="w-3 md:w-4 h-1 md:h-1.5 bg-white/10 rounded-sm" />)}
                </div>

                {/* Vertical Divider (Film Frame Gap) */}
                <div className="absolute -right-[9px] md:-right-[17px] top-[-8px] md:top-[-12px] bottom-[-8px] md:bottom-[-12px] w-[1px] md:w-[2px] bg-[#222]" />
                </div>
            ))}
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="absolute bottom-[-6px] md:bottom-[-8px] left-0 w-full h-1.5 md:h-2 z-20 flex justify-between overflow-hidden">
            <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_12px,#020205_12px,#020205_24px)] opacity-50" />
            </div>
            
            {/* Vignette Overlay for Depth */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none" />

        </div>
      )}

      {/* Modal / Lightbox (Media Viewer) - Only for Internal Projects */}
      <AnimatePresence>
        {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                onClick={handleCloseModal}
            />
            
            {/* Navigation Arrows (Floating on edges) - Responsive */}
            {filteredProjects.length > 1 && (
                <>
                    <button 
                        onClick={handlePrev}
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-white/5 hover:bg-creativeBlue rounded-full text-white transition-all border border-white/10 backdrop-blur hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-white/5 hover:bg-creativeBlue rounded-full text-white transition-all border border-white/10 backdrop-blur hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </>
            )}

            {/* Close Button (Top Right) */}
            <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-red-500 transition-all text-sm font-mono group"
                aria-label="Close media viewer"
            >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Close</span>
            </button>


            {/* Media Content */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-10 w-full h-full flex justify-center items-center"
            >
                <div className="relative shadow-2xl shadow-creativeBlue/10 w-full flex justify-center">
                
                {isPlaying && selectedProject.videoUrl ? (
                    // VIDEO PLAYER
                    <video 
                    src={selectedProject.videoUrl} 
                    controls 
                    autoPlay 
                    className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
                    />
                ) : (
                    // THUMBNAIL + PLAY BUTTON (OR STATIC IMAGE)
                    <div 
                    className="relative group"
                    onClick={() => selectedProject.videoUrl && setIsPlaying(true)}
                    >
                        <img 
                            src={getHighResThumbnail(selectedProject)} 
                            alt={selectedProject.title} 
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
                        />
                        
                        {/* Play Overlay - ONLY for video content */}
                        {(selectedProject.videoUrl || (selectedProject.category === "Long Form" && !selectedProject.videoUrl)) && !isPlaying && (
                            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300 ${selectedProject.videoUrl ? 'cursor-pointer' : ''}`}>
                                {selectedProject.videoUrl && (
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 md:w-8 md:h-8 fill-white text-white ml-1" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                
                </div>
            </motion.div>

            </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;