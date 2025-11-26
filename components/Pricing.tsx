import React from 'react';
import { motion } from 'framer-motion';
import { Check, ExternalLink, Tv } from 'lucide-react';
import { PricingTier } from '../types';

// Fix for TypeScript errors with framer-motion types
const MotionDiv = motion.div as any;

const pricingTiers: PricingTier[] = [
  {
    name: "Short Form",
    price: "₹750 - ₹3,000",
    bestFor: "Reels & TikTok",
    features: [
      "Personal Branding",
      "Talking Heads",
      "Retention Reels",
      "Event Highlights",
      "Motion Graphics"
    ],
    sampleUrls: [
      { label: "Style 1", url: "https://drive.google.com/file/d/1A64F0T0nEpPf9V9GZA-8T-TPDoJycVZC/view" },
      { label: "Style 2", url: "https://drive.google.com/file/d/1pBGPrZVN4mFmA_fIreumMvHri5e_wjTx/view?usp=drive_link" },
      { label: "Style 3", url: "https://drive.google.com/file/d/1XavSXaCp_gG6UZ1IshA3yiDGrQh9AIr6/view?usp=drive_link" }
    ]
  },
  {
    name: "Podcast",
    price: "₹400 - ₹1000",
    bestFor: "Per Minute Output",
    features: [
      "Multicamera",
      "Audio syncing",
      "Engaging Highlights"
    ],
    sampleUrls: [
      { label: "YouTube Sample", url: "https://www.youtube.com/watch?v=HSF8LtvMsdM" }
    ]
  },
  {
    name: "Interviews",
    price: "₹5000 / hr",
    bestFor: "Buissness / Education",
    features: [
      "Multi cam sync",
      "Audio mastering",
      "Additional cost for extra minutes"
    ],
    sampleUrls: [
      { label: "YouTube Sample", url: "https://www.youtube.com/watch?v=0a_lfPUWM1E" }
    ]
  },
  {
    name: "Documentary / Vlogs",
    price: "₹1500 / 10 mins",
    bestFor: "Narrative Content",
    features: [
      "Cinematic Flow",
      "Vlogs and Commercials",
      "Narrative flow"
    ],
    sampleUrls: [
      { label: "YouTube Sample", url: "https://www.youtube.com/watch?v=HRaB4tE0c2g" }
    ]
  },
  {
    name: "Thumbnail",
    price: "₹750 - ₹2,500",
    bestFor: "YouTube",
    features: [
      "Movie Trailer",
      "Documentary style",
      "Vlog Style",
      "AI Implemented"
    ],
    sampleUrls: [
      { label: "Sample", url: "https://drive.google.com/file/d/1DI3iesqkY0jkk1Wayq71YNrgVtZSRVwO/view?usp=drive_link" }
    ]
  },
  {
    name: "Graphic Design",
    price: "Starts from ₹500",
    bestFor: "Branding / Social media",
    features: [
      "Posters (Print/Social)",
      "Corporate Marketing Assets",
      "Promotional Posters",
      "Brochures & Pamphlets"
    ],
    sampleUrls: [
      { label: "View Portfolio", url: "https://drive.google.com/drive/folders/19GCKxGmesho4TfaG0K2_WZuZ6BgpaOUQ" }
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#050509] relative overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-creativeBlue/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-xs md:text-sm font-mono text-creativeBlue mb-2 uppercase tracking-widest">07. Rate Card</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Production Budget</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
          {pricingTiers.map((tier, index) => (
            <MotionDiv
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Left Sprockets */}
              <div className="absolute top-0 left-0 h-full w-5 flex flex-col justify-around items-center pointer-events-none z-0">
                {[...Array(8)].map((_, i) => <div key={i} className="w-2.5 h-5 bg-[#0a0a0f] rounded-sm" />)}
              </div>
              
              {/* Right Sprockets */}
              <div className="absolute top-0 right-0 h-full w-5 flex flex-col justify-around items-center pointer-events-none z-0">
                {[...Array(8)].map((_, i) => <div key={i} className="w-2.5 h-5 bg-[#0a0a0f] rounded-sm" />)}
              </div>
              
              <div className="relative bg-[#111116] border border-white/10 rounded-3xl overflow-hidden group hover:border-creativeBlue/50 transition-colors duration-300 mx-5 z-10 h-full flex flex-col">
                {/* Card Header */}
                <div className="p-6 border-b border-dashed border-white/10 bg-white/5 relative">
                   <h4 className="text-xl font-bold text-white mb-1 group-hover:text-creativeBlue transition-colors">{tier.name}</h4>
                   <div className="text-xs font-mono text-gray-400 mb-4">{tier.bestFor}</div>
                   <div className="text-2xl md:text-3xl font-black text-white">{tier.price}</div>
                </div>

                {/* Features Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-creativeBlue shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Samples Section */}
                  {tier.sampleUrls && tier.sampleUrls.length > 0 && (
                      <div className="border-t border-white/5 pt-4 mt-auto">
                          <span className="text-[10px] font-mono uppercase text-gray-500 mb-2 block">Reference Samples:</span>
                          <div className="flex flex-wrap gap-2">
                              {tier.sampleUrls.map((sample, i) => (
                                  <a 
                                      key={i} 
                                      href={sample.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-xs bg-black/40 border border-white/10 px-2 py-1 rounded hover:bg-white/10 hover:text-white transition-colors text-creativeBlue"
                                  >
                                      <ExternalLink className="w-3 h-3" />
                                      {sample.label}
                                  </a>
                              ))}
                          </div>
                      </div>
                  )}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Other Services Footer Note */}
        <div className="mt-16 md:mt-20 p-6 bg-[#15151a] border border-white/10 rounded-lg text-center animate-fade-in-up">
            <h5 className="text-white font-bold mb-2 flex items-center justify-center gap-2">
                <Tv className="w-4 h-4 text-creativeBlue" /> Additional Creative Services
            </h5>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Contact us for a custom quote.We also offer Digital Marketing, Photography, Videography, Content Writing & Content Creation collaborated with <span className="text-white font-bold">digikey_digitalmarketing</span> Contact us for a custom quote.
            </p>
        </div>

      </div>
    </section>
  );
};

export default Pricing;