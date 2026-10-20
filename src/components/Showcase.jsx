import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import recentWorksGif from '../assets/recent-works.gif';

export default function Showcase() {
  const pinTrackRef = useRef(null);
  const scrollProgress = useMotionValue(0);

  // 1. Trigger & Pinning + Direct 1:1 Scroll Distance Tracking:
  // Tracks the pinned container independently of sticky child bounding box quirks.
  // Start: when section hits top of viewport (scrollY = startY)
  // End: when pin completes and unpins (scrollY = endY)
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

  // 2. The Reveal (Direct 1:1 Scroll Distance Playback):
  // Expands from initial cropped boundary (0%) to final uncropped size (100%)
  const clipPath = useTransform(scrollProgress, (p) => {
    const insetY = (1 - p) * 20;
    const insetX = (1 - p) * 15;
    const round = (1 - p) * 14;
    return `inset(${insetY.toFixed(2)}% ${insetX.toFixed(2)}% round ${round.toFixed(1)}px)`;
  });

  // Box scale smoothly goes from 0.88 to 1.0
  const boxScale = useTransform(scrollProgress, (p) => {
    return (0.88 + p * 0.12).toFixed(4);
  });

  // Counter-parallax on image so content feels anchored while bounding box opens
  const imageScale = useTransform(scrollProgress, (p) => {
    return (1.15 - p * 0.15).toFixed(4);
  });

  // Caption smoothly fades in as the uncropped bounding box completes
  const captionOpacity = useTransform(scrollProgress, (p) => {
    if (p <= 0.25) return 0;
    if (p >= 0.85) return 1;
    return ((p - 0.25) / (0.85 - 0.25)).toFixed(3);
  });

  return (
    <section className="w-full bg-black">
      {/* 
        Interaction Workflow:
        1. Pinning Track (h-[200vh]):
           When user scrolls down, section locks (pins) in place vertically at top: 0.
           The background page stops scrolling during this track.
        2. Scroll-Driven Reveal:
           Scrolling distance directly drives clipPath from cropped to uncropped (0% -> 100%).
        3. Unpinning:
           Once 100% reached, pin naturally releases and scrolling resumes down the rest of the page.
      */}
      <div ref={pinTrackRef} className="relative w-full h-[200vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden px-[1.6667vw] z-10 select-none">
          <div className="w-full max-w-[1416px] mx-auto flex flex-col">
            {/* The Bounding Box that reveals from cropped to uncropped */}
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

            {/* Subtitle / Caption row under GIF inside pinned container */}
            <motion.div 
              style={{ opacity: captionOpacity }}
              className="w-full flex justify-between items-center mt-[0.5556vw] pt-[0.2778vw]"
            >
              <p className="text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em]">
                Recent work of branding, web design &amp; development by NORQUE STUDIOS™
              </p>
              <p className="text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em]">
                ©2026
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Brand Statement / Manifesto follows after unpinning */}
      <div className="w-full px-[1.6667vw]">
        <div className="pt-[4.1667vw] pb-[9.0278vw]">
          <div className="max-w-[73.3333vw] space-y-[1.5278vw]">
            <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
              NORQUE STUDIOS™ — A creative studio for brands that want to build something real. Based between ideas, design and digital, we work across branding, creative direction, UI/UX and web development.
            </p>
            <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
              We collaborate with ambitious brands, businesses and creative partners to shape identities, digital experiences and visual systems that feel considered, distinctive and built to last. From the first idea to the final detail, we bring strategy, design and development together under one roof.
            </p>
            <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
              Feel free to explore our{" "}
              <a href="#works" className="underline hover:opacity-70 transition-opacity">
                Works
              </a>
              , check our{" "}
              <a 
                href="https://www.behance.net" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:opacity-70 transition-opacity"
              >
                Behance
              </a>{" "}
              or read our{" "}
              <a href="#philosophy" className="underline hover:opacity-70 transition-opacity">
                Philosophy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
