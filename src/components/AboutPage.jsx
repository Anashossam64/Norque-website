import React, { useEffect } from 'react';
import Navbar from './Navbar';
import AboutHero from './about/AboutHero';
import AboutTeam from './about/AboutTeam';
import AboutNews from './about/AboutNews';
import Footer from './Footer';

export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* Navigation Bar */}
      <Navbar 
        isIntroStarted={true} 
        activePage="about" 
        onNavigate={onNavigate} 
      />

      {/* Main Content Sections */}
      <main className="w-full">
        <AboutHero />
        <AboutTeam />
        <AboutNews />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
