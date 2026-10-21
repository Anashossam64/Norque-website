import React, { useEffect } from 'react';
import Navbar from './Navbar';
import AboutHero from './about/AboutHero';
import AboutTeam from './about/AboutTeam';
import AboutNews from './about/AboutNews';
import Footer from './Footer';

/* ========================================================================= */
/* ABOUT PAGE VIEW COMPONENT                                                 */
/* Secondary page converted 1:1 from 'Norque Studios Page 2.fig'             */
/* ========================================================================= */
export default function AboutPage({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-beausite selection:bg-white selection:text-black overflow-x-clip">
      {/* 1. Header Navigation */}
      <Navbar 
        isIntroStarted={true} 
        activePage="about" 
        onNavigate={onNavigate} 
      />

      {/* 2. Main Content Sections */}
      <main className="w-full">
        {/* Section A: Manifesto & Working Countries */}
        <AboutHero />

        {/* Section B: Founders & Team Grid ("PPL BEHIND NRQ™") */}
        <AboutTeam />

        {/* Section C: Latest Updates ("What happened lately" carousel) */}
        <AboutNews />
      </main>

      {/* 3. Universal Shared Footer */}
      <Footer />
    </div>
  );
}
