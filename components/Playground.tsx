import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Volume2, VolumeX } from 'lucide-react';

const Playground: React.FC = () => {
  const [graded, setGraded] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-darkBg border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-xs md:text-sm font-mono text-neonTeal mb-2 uppercase tracking-widest">05. Interactive Playground</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Try The Edit</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Color Grading Demo */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between mb-2">
               <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">Color Grading</h4>
               <button 
                 onClick={() => setGraded(!graded)}
                 className="flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-white transition-colors"
               >
                 {graded ? <ToggleRight className="w-8 h-8 text-neonTeal" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 <span className={graded ? "text-neonTeal" : ""}>{graded ? "CINEMATIC" : "LOG/RAW"}</span>
               </button>
             </div>
             
             <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl group">
               {/* Image */}
               <img 
                 src="https://drive.google.com/thumbnail?id=1XcgoptivG_AIaKLeNbD0-aFWfViCO_7T&sz=w1280" 
                 alt="Grading Demo" 
                 className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                   graded 
                    ? 'contrast-125 saturate-150 brightness-100 filter sepia-[.2] hue-rotate-[-10deg]' 
                    : 'contrast-75 saturate-0 brightness-110 blur-[1px]'
                 }`}
               />
               
               {/* Overlay UI */}
               <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] md:text-xs font-mono text-white/70 border border-white/10">
                 {graded ? "LUT: TEAL_ORANGE_04.cube" : "SOURCE: S-LOG3"}
               </div>

               {/* Split Line (Optional visualization) */}
               <div className={`absolute inset-y-0 bg-white/20 w-[1px] transition-all duration-700 ${graded ? 'left-full' : 'left-0'}`} />
             </div>
             <p className="text-xs md:text-sm text-gray-500">Toggle to see how we transform flat footage into vibrant stories.</p>
          </div>

          {/* Sound Design Demo */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between mb-2">
               <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">Sound Design</h4>
               <button 
                 onClick={() => setSoundOn(!soundOn)}
                 className="flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-white transition-colors"
               >
                 {soundOn ? <ToggleRight className="w-8 h-8 text-neonPurple" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
                 <span className={soundOn ? "text-neonPurple" : ""}>{soundOn ? "MIXED + SFX" : "CAMERA MIC"}</span>
               </button>
             </div>
             
             <div className="relative w-full aspect-video bg-[#111116] rounded-lg overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                {/* Simulated Waveform Visualizer */}
                <div className="flex items-center justify-center gap-1 h-32 w-full px-4 md:px-12">
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1.5 md:w-2 rounded-full transition-all duration-300 ease-in-out ${
                        soundOn ? 'bg-neonPurple shadow-[0_0_10px_#9B5FFF]' : 'bg-gray-700'
                      }`}
                      style={{
                        height: soundOn ? `${Math.random() * 100 + 20}%` : '4px',
                        animation: soundOn ? `pulse-fast ${Math.random() * 0.5 + 0.5}s infinite` : 'none'
                      }}
                    />
                  ))}
                </div>

                {/* Status Icon */}
                <div className="absolute top-4 right-4">
                   {soundOn ? <Volume2 className="text-neonPurple w-6 h-6" /> : <VolumeX className="text-gray-600 w-6 h-6" />}
                </div>

                 <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] md:text-xs font-mono text-white/70 border border-white/10">
                 {soundOn ? "FX: Whoosh, Impact, Ambience" : "Audio: Stereo 1 (Noisy)"}
               </div>
             </div>
             <p className="text-xs md:text-sm text-gray-500">We clean audio, add foley, and mix music to drive emotion.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Playground;