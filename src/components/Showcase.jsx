import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import recentWorksGif from '../assets/recent-works.gif';

/* ========================================================================= */
/* SHOWCASE SECTION COMPONENT                                                */
/* Pinned 200vh track with scroll-distance driven reveal of recent works     */
/* ========================================================================= */
export default function Showcase() {
  const pinTrackRef = useRef(null);
  const scrollProgress = useMotionValue(0);

  /* ─── 1. Scroll-Distance Tracking ─── */
  useEffect(() => {
    const handleScroll = () => {
      const el = pinTrackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = el.offsetHeight;
      const vh = window.innerHeight;

      const startY = top;
      const endY = top + height - vh;

      if (endY <= startY) return;

      const p = Math.max(0, Math.min(1, (window.scrollY - startY) / (endY - startY)));
      scrollProgress.set(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollProgress]);

  /* ─── 2. Motion Value Interpolations ─── */
  // Clip path expands smoothly from cropped boundary (0%) to uncropped size (100%)
  const clipPath = useTransform(scrollProgress, (p) => {
    const insetY = (1 - p) * 20;
    const insetX = (1 - p) * 15;
    const round = (1 - p) * 14;
    return `inset(${insetY.toFixed(2)}% ${insetX.toFixed(2)}% round ${round.toFixed(1)}px)`;
  });

  // Box scale smoothly scales from 0.88 to 1.0
  const boxScale = useTransform(scrollProgress, (p) => {
    return (0.88 + p * 0.12).toFixed(4);
  });

  // Counter-parallax on image anchors visual weight as frame expands
  const imageScale = useTransform(scrollProgress, (p) => {
    return (1.15 - p * 0.15).toFixed(4);
  });

  // Caption smoothly fades in during the last 15% of the scroll track
  const captionOpacity = useTransform(scrollProgress, (p) => {
    if (p <= 0.25) return 0;
    if (p >= 0.85) return 1;
    return ((p - 0.25) / (0.85 - 0.25)).toFixed(3);
  });

  /* ─── Render ─── */
  return (
    <section className="w-full bg-black">
      {/* 200vh Pinning Track */}
      <div ref={pinTrackRef} className="relative w-full h-[200vh]">
        {/* Sticky Fullscreen Viewport Window */}
        <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden px-[1.6667vw] z-10 select-none">
          <div className="w-full max-w-[1416px] mx-auto flex flex-col">
            {/* Reveal Bounding Box */}
            <motion.div 
              style={{ clipPath, scale: boxScale }}
              className="w-full aspect-[1416/645.5] overflow-hidden rounded-[0.1389vw] bg-[#121212] will-change-transform shadow-2xl"
            >
              <motion.img 
                style={{ scale: imageScale }}
                src={recentWorksGif} 
                alt="Recent work of branding, web design & development by NORQUE STUDIOS™" 
                className="w-full h-full object-cover rounded-[0.1389vw] block will-change-transform"
                loading="eager"
              />
            </motion.div>

            {/* Subtitle & Caption Row */}
            <motion.div 
              style={{ opacity: captionOpacity }}
              className="w-full flex justify-between items-center mt-[0.5556vw] pt-[0.2778vw]"
            >
              <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] uppercase">
                (SHOWCASE)
              </span>
              <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-white">
                RECENT WORKS (2024 - 2026)
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brand Statement / Mission Manifesto Under Showcase */}
      <div className="w-full px-[1.6667vw] pt-[5.5556vw] pb-[2.7778vw]">
        <div className="max-w-[80vw]">
          <h2 className="text-[3.1944vw] font-semibold tracking-[-0.03em] leading-[1.08] text-white">
            NORQUE STUDIOS™ is a branding, web design &amp; development studio based in Egypt, operating globally. We craft elevated visual systems, digital experiences, and bespoke products for forward-thinking brands.
          </h2>
        </div>
      </div>
    </section>
  );
}
