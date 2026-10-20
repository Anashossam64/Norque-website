import React, { useEffect } from 'react';
import Hero from './Hero';
import Showcase from './Showcase';
import SelectedWorks from './SelectedWorks';
import Philosophy from './Philosophy';
import NewsSection from './NewsSection';
import Footer from './Footer';

export default function HomePage({ onNavigate, hasIntroPlayed = false, onIntroComplete }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <Hero 
        onNavigate={onNavigate} 
        hasIntroPlayed={hasIntroPlayed} 
        onIntroComplete={onIntroComplete} 
      />
      <Showcase />
      <SelectedWorks />
      <Philosophy />
      <NewsSection />
      <Footer />
    </div>
  );
}