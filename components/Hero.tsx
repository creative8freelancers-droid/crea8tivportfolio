import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Play, Scissors, Video, Flashlight, Palette } from 'lucide-react';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  
  const fullText = "CREA8TIV";

  useEffect(() => {
    setMounted(true);

    // Reduced delay since timeline animation is gone
    const startDelay = setTimeout(() => {
      setStartTyping(true);
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (startTyping) {
      if (typedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 150); // Slightly slower typing speed for impact
        return () => clearTimeout(timeout);
      }
    }
  }, [startTyping, typedText]);

  // Split logic for styling
  // "CREA" (4 chars) - White
  // "8TIV" (4 chars) - Creative Blue Gradient
  const firstPart = typedText.slice(0, 4);
  const secondPart = typedText.slice(4);

  // Floating animation variants for icons
  const float = (delay: number): Variants => ({
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        delay: delay,
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-16 md:pt-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-[#0a0a12] to-darkBg z-0" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#328ACA_0%,_transparent_50%)] z-0 blur-3xl" />

      {/* Decorative Animated Icons (Showcase) */}
      <div className="relative z-10 w-full max-w-5xl px-4 mb-8 md:mb-12 flex justify-center items-center gap-3 md:gap-24 opacity-80 pointer-events-none">
        
        {/* Scissors - Editing */}
        <motion.div
           variants={float(0)}
           animate="animate"
           className="text-creativeBlue/80"
        >
            <Scissors className="w-6 h-6 md:w-20 md:h-20 stroke-[1.5] drop-shadow-[0_0_15px_rgba(50,138,202,0.3)]" />
        </motion.div>

        {/* Video Camera - Videography */}
        <motion.div
           variants={float(1.5)}
           animate="animate"
           className="text-white/90"
        >
            <Video className="w-10 h-10 md:w-24 md:h-24 stroke-[1] drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
        </motion.div>

        {/* Flashlight - Lighting/Focus */}
        <motion.div
           variants={float(3)}
           animate="animate"
           className="text-neonTeal/80"
        >
            <Flashlight className="w-6 h-6 md:w-20 md:h-20 stroke-[1.5] drop-shadow-[0_0_15px_rgba(54,224,206,0.3)]" />
        </motion.div>

         {/* Palette - Graphics/Color */}
        <motion.div
           variants={float(4.5)}
           animate="animate"
           className="text-neonPurple/80"
        >
            <Palette className="w-8 h-8 md:w-22 md:h-22 stroke-[1.5] drop-shadow-[0_0_15px_rgba(155,95,255,0.3)]" />
        </motion.div>

      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 min-h-[300px] flex flex-col items-center">
        
        {/* Typewriter Title */}
        <div className="text-5xl md:text-8xl font-black tracking-tighter mb-4 md:mb-6 min-h-[1.1em] flex items-center justify-center flex-wrap">
           <span className="text-white">{firstPart}</span>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-creativeBlue to-neonTeal">{secondPart}</span>
           
           {/* Blinking Cursor */}
           <motion.span 
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.8, 
                ease: "linear",
                times: [0, 0.5, 0.5, 1]
              }}
              // Fixed height to match text-5xl (12 = 48px) and text-8xl (24 = 96px) exactly
              className="inline-block w-2 md:w-4 h-12 md:h-24 bg-creativeBlue ml-1 align-middle shadow-[0_0_10px_#328ACA]"
           />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-base md:text-xl text-gray-400 font-mono mb-8 md:mb-10 px-4"
        >
          We don’t just edit videos. <br className="md:hidden" /><span className="text-white font-bold">We edit how they feel.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center w-full px-8 md:px-0"
        >
          <button 
            onClick={() => handleScrollTo('client-reels')}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold tracking-wide uppercase text-sm hover:bg-gray-200 transition-all w-full md:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current text-creativeBlue" /> Watch Reel
            </span>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-creativeBlue opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-neonTeal opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button 
            onClick={() => handleScrollTo('contact')}
            className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white font-bold tracking-wide uppercase text-sm hover:bg-white/5 hover:border-creativeBlue transition-all flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <Scissors className="w-4 h-4" /> Start Project
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-creativeBlue to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;