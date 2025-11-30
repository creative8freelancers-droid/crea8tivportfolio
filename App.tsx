import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import Clients from './components/Clients';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isReelViewerOpen, setIsReelViewerOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Small delay to allow state update before scrolling
    setTimeout(() => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-darkBg text-white selection:bg-creativeBlue selection:text-white">
      {/* Global Film Grain Overlay */}
      <div className="film-grain" />
      {/* White Grid Pattern Overlay */}
      <div className="bg-grid-pattern" />

      {!isReelViewerOpen && <Navbar />}
      
      <main className="relative z-10">
        <Hero />
        <Services onCategorySelect={handleCategorySelect} />
        <Portfolio 
          selectedCategory={selectedCategory} 
          onClearFilter={() => setSelectedCategory(null)} 
        />
        <Reviews onViewerStateChange={setIsReelViewerOpen} />
        <About />
        <Contact />
        <Pricing />
        <Clients />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;