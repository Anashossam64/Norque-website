import React from 'react';
import MainLogo from './MainLogo';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-black">
      {/* Universal margin: 24px (1.6667vw) */}
      <div className="w-full px-[1.6667vw]">
        {/* Top border line */}
        <div className="border-t border-[#363636] pt-[1.6667vw]">
          {/* Callout */}
          <div className="max-w-[23.9583vw]">
            <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
              Got a project on mind?<br />
              Let’s make it alive!<br />
              <a 
                href="mailto:hello@norquestudios.com" 
                className="hover:opacity-70 transition-opacity"
              >
                hello@norquestudios.com
              </a>
            </p>
          </div>
        </div>

        {/* Generous spacing to bottom logo */}
        <div className="pt-[31.9444vw]">
          {/* Giant Logo */}
          <div className="w-full mb-[0.6944vw]">
            <MainLogo className="w-full h-auto text-white" />
          </div>

          {/* Bottom Nav bar and Copyright */}
          <div className="pt-[0.6944vw] pb-[1.6667vw] flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4">
            {/* Nav links */}
            <div className="flex flex-wrap items-center gap-x-[0.9722vw] text-[0.6944vw] font-semibold tracking-normal text-white">
              <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
              <a href="#works" className="hover:opacity-60 transition-opacity">Works</a>
              <a href="#services" className="hover:opacity-60 transition-opacity">services</a>
              <a href="#contact" className="hover:opacity-60 transition-opacity">contact</a>
              <a 
                href="https://www.behance.net" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-60 transition-opacity"
              >
                Behance
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-60 transition-opacity"
              >
                Linked in
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a href="#terms" className="text-[#797979] hover:text-white transition-colors">
                • terms &amp; conditions
              </a>
              <a href="#privacy" className="text-[#797979] hover:text-white transition-colors">
                • privacy &amp; policy
              </a>
            </div>

            {/* Copyright */}
            <div className="text-right">
              <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-white">
                © 2026 norquestudios. all rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
