import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

// IMPORTANT: Replace this placeholder with the actual URL you copied after deploying your Google Apps Script.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVa0CPxue5kqnO-6pJUMCIFGzGT2t9oNEq3ZBB3jjzSqg97nr4RS7mtzfxWM_hXOpVoQ/exec"; 

const Contact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    
    // FIX: Removed obsolete check for placeholder URL as it's already been replaced.
    // This was causing a TypeScript error because the condition would always be false.
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // This is necessary for Google Scripts to avoid CORS errors
        body: new FormData(form),
      });

      // Give a small delay to simulate the network request and feel more responsive
      await new Promise(resolve => setTimeout(resolve, 800));

      setIsOpen(false); 
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
        // Reset the form after success message
        setTimeout(() => {
            setSubmitted(false);
            setIsOpen(true);
        }, 4000); 
      }, 600);

    } catch (error) {
      console.error("Error submitting form", error);
      setLoading(false);
      alert("Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#050509] relative overflow-hidden">
      <div className="absolute -right-20 top-20 w-64 md:w-96 h-64 md:h-96 bg-creativeBlue/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xs md:text-sm font-mono text-creativeBlue mb-2 uppercase tracking-widest">06. Production</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Start A Project</h3>
        </div>

        <div className="relative bg-[#1a1a20] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="relative z-20 h-12 md:h-16 bg-white/10 border-b-4 border-black flex overflow-hidden origin-bottom-left transition-transform duration-500"
               style={{ transform: isOpen ? 'rotate(-5deg) translateY(-10px)' : 'rotate(0deg)' }}>
             <div className="flex-1 h-full bg-[repeating-linear-gradient(135deg,transparent,transparent_20px,#ffffff_20px,#ffffff_40px)] opacity-80" />
             <div className="absolute bottom-0 left-0 w-3 md:w-4 h-3 md:h-4 bg-white rounded-full border-2 border-black z-30 translate-y-2 -translate-x-2" />
          </div>

          <div className="p-6 md:p-12 relative">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Director Name</label>
                    <input 
                      required name="directorName" type="text" placeholder="John Doe" 
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:border-creativeBlue focus:outline-none transition-colors font-mono text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Contact Email</label>
                    <input 
                      required name="email" type="email" placeholder="john@studio.com" 
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:border-neonTeal focus:outline-none transition-colors font-mono text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Project Type</label>
                    <select 
                      name="projectType"
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:border-creativeBlue focus:outline-none transition-colors font-mono appearance-none text-sm"
                    >
                      <option value="Short Form">Short Form</option>
                      <option value="Podcast">Podcast</option>
                      <option value="Interviews">Interviews</option>
                      <option value="Documentary / Vlogs">Documentary / Vlogs</option>
                      <option value="Thumbnail">Thumbnail</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Mobile Number</label>
                    <input 
                      required name="mobileNumber" type="tel" placeholder="+91 98765 43210" 
                      className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:border-neonTeal focus:outline-none transition-colors font-mono text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-2">Describe the vibe (Script/Notes)</label>
                  <textarea 
                    name="notes" rows={4} placeholder="Dark, moody, fast cuts... or link to raw footage" 
                    className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:border-neonTeal focus:outline-none transition-colors font-mono text-sm" 
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full py-3 md:py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {loading ? (
                    <span className="animate-pulse">Rolling...</span>
                  ) : (
                    <>
                      <span className="group-hover:scale-110 transition-transform">🎬</span> Roll Camera
                    </>
                  )}
                </button>
                
                <p className="text-[10px] text-gray-600 text-center pt-2">
                  * Submissions are securely logged to our production sheet.
                </p>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-creativeBlue/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-creativeBlue" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">That's a wrap!</h3>
                <p className="text-gray-400">We've got your script. We'll be in the cutting room shortly.</p>
                <button onClick={() => {setSubmitted(false); setIsOpen(true)}} className="mt-8 text-sm text-creativeBlue hover:underline">Send another script</button>
              </div>
            )}

            <div className="absolute bottom-2 right-4 md:bottom-4 md:right-6 text-white/10 font-mono text-2xl md:text-4xl font-black pointer-events-none">
              SCENE 01 / TAKE 01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
