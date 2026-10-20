import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompactLogo from './CompactLogo';

export default function Navbar({ isIntroStarted = false, activePage = 'home', onNavigate }) {
  const [egyptTime, setEgyptTime] = useState('');

  const handleLinkClick = (page, sectionId) => (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        const hour = parts.find(p => p.type === 'hour')?.value || '12';
        const minute = parts.find(p => p.type === 'minute')?.value || '00';
        const second = parts.find(p => p.type === 'second')?.value || '00';
        const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase() || 'PM';
        
        setEgyptTime(`Egypt, ${hour}:${minute}:${second} ${dayPeriod} GMT`);
      } catch (e) {
        setEgyptTime('Egypt, 03:48:10 PM GMT');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      className="w-full z-20 pt-[0.8333vw] px-[1.6667vw]"
      initial={isIntroStarted ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
      animate={isIntroStarted ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0, 0.8, 0.2, 1] }}
    >
      <div className="w-full grid grid-cols-4 items-center">
        {/* Column 1: Compact Logo */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={handleLinkClick('home')}
            className="inline-flex items-center cursor-pointer" 
            aria-label="Norque Studios Home"
          >
            <CompactLogo className="w-[5.0764vw] h-[0.5417vw] text-white" />
          </a>
        </div>

        {/* Column 2: Nav Buttons */}
        <nav className="flex items-center space-x-[0.6944vw]" aria-label="Main Navigation">
          <a 
            href="#about" 
            onClick={handleLinkClick('about')}
            className={`text-[0.5556vw] font-semibold tracking-normal transition-opacity cursor-pointer ${
              activePage === 'about' ? 'text-white underline underline-offset-4 decoration-white/40' : 'text-white/80 hover:text-white'
            }`}
          >
            About
          </a>
          <a 
            href="#works" 
            onClick={handleLinkClick('home', 'works')}
            className={`text-[0.5556vw] font-semibold tracking-normal transition-opacity cursor-pointer ${
              activePage === 'home' ? 'text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            Works
          </a>
          <a 
            href="#services" 
            onClick={handleLinkClick('home', 'services')}
            className="text-[0.5556vw] font-semibold text-white/80 hover:text-white tracking-normal transition-opacity cursor-pointer"
          >
            services
          </a>
        </nav>

        {/* Column 3: Spacer */}
        <div></div>

        {/* Column 4: Egypt Time */}
        <div className="text-right">
          <span className="text-[0.5556vw] font-semibold tracking-[-0.03em] text-white tabular-nums select-none">
            {egyptTime || 'Egypt, 03:48:10 PM GMT'}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
