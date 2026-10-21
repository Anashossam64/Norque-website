import React from 'react';

/* ========================================================================= */
/* PHILOSOPHY SECTION COMPONENT                                              */
/* Typographic intention manifesto reflecting studio design core beliefs     */
/* ========================================================================= */
export default function Philosophy() {
  return (
    <section className="w-full bg-black py-[5.4167vw]">
      {/* Universal Container Margin: 12px (0.8333vw) */}
      <div className="w-full px-[0.8333vw]">
        <div className="max-w-[48.75vw] space-y-[1.5278vw]">
          <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
            We believe good work begins with intention.
          </p>
          <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
            Not every problem needs more complexity, and not every idea needs more to become meaningful. Sometimes, the most valuable decision is knowing what to keep, what to change, and what to leave behind.
          </p>
          <p className="text-[1.5278vw] font-bold tracking-[-0.03em] leading-[1.18] text-white">
            Our approach is rooted in clarity, thoughtful execution, and an appreciation for the details that make the whole.
          </p>
        </div>
      </div>
    </section>
  );
}
