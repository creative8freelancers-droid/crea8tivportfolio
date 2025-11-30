import React from 'react';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <img 
              src="https://drive.google.com/thumbnail?id=1MPR4QabExrH9-5f-5M3AItBpPvayQlY2"
              alt="Crea8tiv Full Logo" 
              className="h-20 md:h-24 object-contain mb-4" 
            />
            <p className="text-gray-500 font-mono text-sm max-w-xs pl-1">Turning clips into cinema, one frame at a time.</p>
          </div>
          
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="https://www.instagram.com/crea_8_tiv/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonPurple transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/company/crea8tiv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-creativeBlue transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://w.app/crea8tiv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors"><MessageCircle className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Interactive Timeline Footer */}
        <div className="relative w-full h-12 border-t border-b border-white/10 group cursor-crosshair flex items-center">
            {/* Timecodes */}
            <div className="absolute top-1 left-0 text-[8px] font-mono text-gray-700">00:00:00</div>
            <div className="absolute top-1 right-0 text-[8px] font-mono text-gray-700">00:02:35</div>
            
            {/* Ticks */}
            <div className="w-full flex justify-between px-2">
               {[...Array(20)].map((_, i) => (
                 <div key={i} className={`w-[1px] bg-white/10 ${i % 5 === 0 ? 'h-4' : 'h-2'}`} />
               ))}
            </div>

            {/* Moving Playhead */}
            <div className="absolute top-0 h-full w-[1px] bg-neonTeal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-1/2 transform -translate-x-1/2 group-hover:translate-x-0 group-hover:left-[var(--mouse-x,50%)]">
                <div className="absolute -top-2 -left-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-neonTeal" />
            </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-600 font-mono">
           © {new Date().getFullYear()} Crea8tiv. All Rights Reserved.
        </div>
      </div>

      {/* Mouse Position Logic */}
      <script dangerouslySetInnerHTML={{__html: `
        document.querySelector('footer').addEventListener('mousemove', (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          e.currentTarget.style.setProperty('--mouse-x', x + 'px');
        });
      `}} />
    </footer>
  );
};

export default Footer;
