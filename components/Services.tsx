import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Film, Palette, Camera, MousePointerClick, Music } from 'lucide-react';
import { Service } from '../types';

// Fix for TypeScript errors with framer-motion types
const MotionDiv = motion.div as any;

const services: Service[] = [
  {
    title: "Short Form",
    icon: <Zap className="w-5 h-5" />,
    description: "Personal Branding, Talking Heads, Retention Reels & Motion Graphics.",
    tags: ["Reels", "TikTok", "Branding"],
    filterCategory: "Short Form"
  },
  {
    title: "Long Form",
    icon: <Film className="w-5 h-5" />,
    description: "Podcasts, Interviews, Vlogs, and Documentaries.",
    tags: ["Podcasts", "Docs", "Vlogs"],
    filterCategory: "Long Form"
  },
  {
    title: "Graphic Design",
    icon: <Palette className="w-5 h-5" />,
    description: "Posters, Thumbnails, and Print Designs.",
    tags: ["Thumbnails", "Posters", "Print"],
    filterCategory: "Graphic Design"
  },
  {
    title: "Creative Services",
    icon: <Camera className="w-5 h-5" />,
    description: "Digital Marketing, Photography, Videography & Creation.",
    tags: ["Marketing", "Photo", "Video"],
    filterCategory: "Creative Services"
  }
];

interface ServicesProps {
  onCategorySelect: (category: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onCategorySelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Map vertical scroll progress to horizontal playhead movement (0% to 100%)
  const playheadX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="services" className="py-16 md:py-24 bg-[#08080c] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h2 className="text-xs md:text-sm font-mono text-creativeBlue mb-2 uppercase tracking-widest">02. Work Category</h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white">Select Your Track</h3>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[10px] md:text-xs font-mono">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-creativeBlue rounded-full animate-pulse" />
            TIMELINE ACTIVE
          </div>
        </div>

        {/* Timeline Editor Interface */}
        <div className="relative bg-[#111116] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
            
            {/* Time Ruler (Top) */}
            <div className="h-6 md:h-8 bg-[#1a1a20] border-b border-white/5 flex items-end justify-between px-4 md:px-16 text-[8px] md:text-[10px] font-mono text-gray-500 select-none overflow-hidden">
                 {[...Array(11)].map((_, i) => (
                    <div key={i} className="relative h-1.5 md:h-2 w-[1px] bg-gray-700">
                        <span className="absolute -top-4 -left-3 hidden md:block">00:0{i}</span>
                    </div>
                 ))}
            </div>

            {/* Playhead (Controlled by Scroll) */}
            <MotionDiv 
                style={{ left: playheadX }}
                className="absolute top-6 md:top-8 bottom-0 w-[2px] bg-creativeBlue z-50 pointer-events-none shadow-[0_0_15px_rgba(50,138,202,0.6)]"
            >
               {/* Playhead Cap */}
               <div className="absolute -top-2 -left-[6px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-creativeBlue" />
            </MotionDiv>

            {/* Tracks Container */}
            <div className="relative">
                {/* Background Grid Lines (Vertical Time Markers) */}
                <div className="absolute inset-0 flex justify-between px-4 md:px-16 pointer-events-none opacity-10">
                     {[...Array(11)].map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-white" />
                     ))}
                </div>

                {/* Video Tracks */}
                {services.map((service, index) => (
                    <div 
                      key={index} 
                      className="flex border-b border-white/5 last:border-0 h-28 md:h-40 group hover:bg-white/5 transition-colors"
                      onClick={() => {
                          if (service.filterCategory === "Short Form") {
                              const element = document.getElementById('client-reels');
                              if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                              }
                          } else if (service.filterCategory === "Creative Services") {
                              const element = document.getElementById('footer');
                              if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                              }
                          } else {
                              onCategorySelect(service.filterCategory);
                          }
                      }}
                    >
                        
                        {/* Track Header (Left Sidebar) */}
                        <div className="w-14 md:w-32 bg-[#15151a] border-r border-white/10 flex flex-col items-center justify-center p-2 relative z-10 shrink-0 cursor-pointer group-hover:bg-[#1f1f26] transition-colors">
                            <span className="absolute top-1 left-1 md:top-2 md:left-2 text-[8px] md:text-[9px] font-mono text-gray-600">V{index + 1}</span>
                            <div className="text-creativeBlue/80 group-hover:text-neonTeal transition-colors mb-1 scale-90 md:scale-100">
                                {service.icon}
                            </div>
                            <div className="hidden md:flex gap-2 text-[9px] text-gray-600 mt-2">
                                <span className="bg-black/30 px-1 rounded hover:text-green-500">M</span>
                                <span className="bg-black/30 px-1 rounded hover:text-red-500">S</span>
                            </div>
                        </div>

                        {/* Track Lane / Timeline Clip */}
                        <div className="flex-1 relative p-2 md:p-4 flex items-center cursor-pointer overflow-hidden">
                            
                            {/* The Clip Box */}
                            <MotionDiv 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="relative h-full bg-[#25252e] rounded-sm border-l-4 overflow-hidden shadow-lg group/clip hover:brightness-125 transition-all w-full"
                                style={{ 
                                    borderLeftColor: index % 2 === 0 ? '#328ACA' : '#36E0CE',
                                    marginLeft: `${index * 3}%`, // Reduced margin scale for mobile
                                    width: `${98 - (index * 3)}%` 
                                }}
                            >
                                {/* Clip Header Bar */}
                                <div className="absolute top-0 w-full h-1 md:h-1.5 opacity-50" style={{ backgroundColor: index % 2 === 0 ? '#328ACA' : '#36E0CE' }} />
                                
                                <div className="p-3 md:p-4 flex flex-col justify-between h-full relative z-10">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white font-bold text-base md:text-xl truncate pr-2 md:pr-4 group-hover:text-creativeBlue transition-colors">{service.title}</h4>
                                        <div className="bg-black/40 px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-mono text-gray-400 border border-white/5 shrink-0">
                                            .mp4
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-400 text-[10px] md:text-sm line-clamp-2 w-[95%] leading-tight">
                                        {service.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex gap-1 md:gap-2 flex-wrap">
                                            {service.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[8px] md:text-[9px] uppercase font-mono text-gray-300">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-creativeBlue opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                          <MousePointerClick className="w-3 h-3" />
                                          <span className="font-mono uppercase tracking-wide hidden md:inline">
                                              {service.filterCategory === "Short Form" ? "View Client Reels" : "View Library"}
                                          </span>
                                          <span className="font-mono uppercase tracking-wide md:hidden">View</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Subtle Stripe Pattern Overlay */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)'}} />

                            </MotionDiv>
                        </div>
                    </div>
                ))}

                {/* Decorative Audio Track (Bottom) */}
                <div className="flex border-t border-white/5 h-16 md:h-24 opacity-60">
                     <div className="w-14 md:w-32 bg-[#15151a] border-r border-white/10 flex flex-col items-center justify-center p-2 relative shrink-0">
                         <span className="absolute top-1 left-1 md:top-2 md:left-2 text-[8px] md:text-[9px] font-mono text-gray-600">A1</span>
                         <Music className="w-4 h-4 text-green-500 mb-1" />
                     </div>
                     <div className="flex-1 bg-[#0f120f] relative flex items-center px-2 md:px-4">
                          <div className="w-full h-8 md:h-12 bg-[#1a2e1a] border border-green-900/50 rounded-sm relative overflow-hidden flex items-center">
                              {/* Audio Waveform */}
                              <div className="flex items-center justify-center w-full gap-[1px] md:gap-[2px] h-full px-2">
                                 {[...Array(60)].map((_, i) => (
                                     <div key={i} className="flex-1 bg-green-500/40 rounded-full" style={{ height: `${Math.random() * 80 + 10}%` }} />
                                 ))}
                              </div>
                              <span className="absolute left-2 top-0.5 md:top-1 text-[8px] md:text-[9px] font-mono text-green-400 shadow-black drop-shadow-md truncate w-32">Background_Music.wav</span>
                          </div>
                     </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;