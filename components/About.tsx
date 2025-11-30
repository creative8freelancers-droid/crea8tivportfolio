import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, MessageSquare } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#08080c] relative overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-creativeBlue/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neonTeal/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-xs md:text-sm font-mono text-creativeBlue mb-2 uppercase tracking-widest">05. About</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Founder &amp; CEO</h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Decorative Film Strip Background */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 opacity-[0.03] pointer-events-none border-l border-white/10 flex flex-col">
                 {[...Array(10)].map((_, i) => (
                     <div key={i} className="flex-1 border-b border-white/10 relative">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 md:w-12 h-6 md:h-8 bg-white/20 rounded-sm" />
                     </div>
                 ))}
            </div>

            {/* Profile Image Area */}
            <div className="w-40 h-40 md:w-64 md:h-64 shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-creativeBlue to-neonTeal rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                 <img 
                   src="https://drive.google.com/thumbnail?id=1qPbCGHfvtbhXa7UtYvtAYmk7rbsgI_63" 
                   alt="Jothibasu Ramalakshmanan" 
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-white/20 px-4 py-1 rounded-full text-[10px] md:text-xs font-mono text-white whitespace-nowrap">
                Jothibasu Ramalakshmanan
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 text-center md:text-left z-10">
              <div className="text-sm md:text-base text-gray-400 leading-relaxed space-y-4 mb-8 max-w-2xl text-left">
                <p>
                  Meet the Founder & CEO, Jothibasu, a 22-year-old creator and entrepreneur.
                </p>
                <p>
                  <span className="text-creativeBlue font-bold">Crea8tiv</span> is a creative social media startup, founded in 2023 and based in Madurai, India. Worked with 30+ clients across India and abroad, and continuously working towards scaling up.
                </p>
                <p>
                  We specialize in social media content, video editing, design, and digital marketing support.
                </p>
              </div>

              {/* Social Action Grid */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
                <a 
                  href="https://www.instagram.com/joetheamateur?igsh=MXh5cnUyNGc2cWtjaA==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg text-white font-bold text-xs hover:scale-105 transition-transform shadow-lg"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                 <a 
                  href="https://www.linkedin.com/in/jothibasu-ramalakshmanan?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-[#0077B5] rounded-lg text-white font-bold text-xs hover:scale-105 transition-transform shadow-lg"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a 
                  href="https://discord.gg/p5wdTfJ5"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-[#5865F2] rounded-lg text-white font-bold text-xs hover:scale-105 transition-transform shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  Discord
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;