import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompactLogo from './CompactLogo';

/* ========================================================================= */
/* NAVBAR COMPONENT                                                          */
/* 4-column responsive header with live Cairo GMT ticking clock              */
/* ========================================================================= */
export default function Navbar({ 
  isIntroStarted = false, 
  activePage = 'home', 
  onNavigate,
  isPinned = false,
  isVisible = true 
}) {
  /* ─── State: Cairo/Egypt Live GMT Clock ─── */
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

  /* ─── Render ─── */
  return (
    <motion.header 
      className={`${
        isPinned 
          ? 'fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-md' 
          : 'w-full z-20'
      } h-[2.5vw] px-[1.6667vw] flex items-center transition-colors duration-300`}
      style={{ pointerEvents: isPinned && !isVisible ? 'none' : 'auto' }}
      initial={
        isPinned 
          ? { y: '-100%', opacity: 0 } 
          : (isIntroStarted ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 })
      }
      animate={
        isPinned 
          ? (isVisible ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 }) 
          : (isIntroStarted ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 })
      }
      transition={{ 
        duration: isPinned ? 0.45 : 0.8, 
        ease: isPinned ? [0.16, 1, 0.3, 1] : [0, 0.8, 0.2, 1] 
      }}
    >
      <div className="w-full grid grid-cols-4 items-center">
        {/* Column 1: Compact Vector Logo */}
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

        {/* Column 2: Navigation Links */}
        <nav className="flex items-center space-x-[0.6944vw]" aria-label="Main Navigation">
          <a 
            href="#about" 
            onClick={handleLinkClick('about')}
            className={`text-[0.5556vw] font-semibold tracking-normal transition-opacity cursor-pointer ${
              activePage === 'about' ? 'text-white underline underline-offset-4 decoration-white/40' : 'text-white/80 hover:text-white'
            }`}
          >
            ABOUT
          </a>
          <a 
            href="#works" 
            onClick={handleLinkClick('home', 'works')}
            className={`text-[0.5556vw] font-semibold tracking-normal transition-opacity cursor-pointer ${
              activePage === 'home' ? 'text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            WORKS
          </a>
          <a 
            href="#services" 
            onClick={handleLinkClick('home', 'services')}
            className="text-[0.5556vw] font-semibold text-white/80 hover:text-white tracking-normal transition-opacity cursor-pointer"
          >
            SERVICES
          </a>
        </nav>

        {/* Column 3: Grid Balance Spacer */}
        <div></div>

        {/* Column 4: Egypt Live GMT Time */}
        <div className="text-right">
          <span className="uppercase text-[0.5556vw] font-semibold tracking-[-0.03em] text-white tabular-nums select-none">
            {egyptTime || 'EGYPT, 03:48:10 PM GMT'}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
