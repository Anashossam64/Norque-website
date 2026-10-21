import React from 'react';

/* ========================================================================= */
/* ABOUT HERO SECTION                                                        */
/* Manifesto statement and international presence directory                  */
/* ========================================================================= */
const COUNTRIES = [
  'Egypt',
  'United States',
  'Lithuania',
  'United Arab Emirates',
  'Saudi Arabia',
  'Jordan'
];

export default function AboutHero() {
  return (
    <section className="w-full pt-[4.1667vw] pb-[6.25vw] px-[0.8333vw] sm:px-[0.8333vw]">
      <div className="w-full max-w-[1416px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-x-[0.8333vw]">
        {/* ─── Column 1 & 2: Manifesto & Aesthetics Media ─── */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="max-w-[702px] w-full">
            <span className="block text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] uppercase mb-[1.3889vw]">
              [ ABOUT ]
            </span>
            <p className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-[1.2] selection:bg-white selection:text-black">
              — An independent creative studio built around design, digital experiences and the ideas that connect them. We work with brands, businesses and people who care about how things look, feel and exist in the real world. From brand identities and creative direction to UI/UX, web design and development, we bring different disciplines together to create work that is clear, intentional and built with purpose. No fixed formulas, no unnecessary layers — just the right thinking, design and execution for each project.
            </p>
          </div>

          <div className="mt-8 sm:mt-[9.9306vw]">
            <img 
              src="/images/about/about-intro-image.png" 
              alt="Norque visual aesthetics" 
              className="w-[180px] h-[242px] sm:w-[15.0069vw] sm:h-[20.2083vw] object-cover rounded-[4px] grayscale hover:grayscale-0 transition-all duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* ─── Column 3: Grid Alignment Spacer ─── */}
        <div className="hidden lg:block"></div>

        {/* ─── Column 4: Countries Directory ─── */}
        <div className="lg:col-span-1">
          <span className="block text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] uppercase mb-[1.5278vw]">
            [ COUNTRIES WE WORKED IN ]
          </span>
          <ul className="space-y-[0.4167vw]">
            {COUNTRIES.map((country) => (
              <li 
                key={country}
                className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] select-none"
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
