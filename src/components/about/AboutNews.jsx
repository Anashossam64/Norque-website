import React from 'react';
import InteractiveInfiniteCarousel from '../InteractiveInfiniteCarousel';

/* ========================================================================= */
/* ABOUT NEWS SECTION                                                        */
/* "What happened lately" interactive infinite news carousel                 */
/* ========================================================================= */
const base = import.meta.env.BASE_URL || './';

const NEWS_ITEMS = [
  {
    image: `${base}images/about/news-lithuania-chapter-1.png`,
    aspect: 'aspect-[345/438.2]',
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
  {
    image: `${base}images/about/news-lithuania-chapter-2.png`,
    aspect: 'aspect-[345/540]',
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
  {
    image: `${base}images/about/news-saudi-arabia.png`,
    aspect: 'aspect-[345/423.9]',
    title: 'Catch us in Saudi Arabia',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
  {
    image: `${base}images/about/news-lithuania-identity.png`,
    aspect: 'aspect-[345/540]',
    title: 'Developing a Lithuanian architecture studio’s visual Identity',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
  },
];

export default function AboutNews() {
  return (
    <section className="w-full pt-[4.1667vw] pb-[6.9444vw] px-[0.8333vw] motion-blur-target">
      <div className="w-full">
        {/* ─── 1. Header with Title & Subtitle ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-[3.4722vw] gap-4">
          <h2 className="text-[32px] sm:text-[3.1944vw] font-semibold text-white tracking-[-0.03em] leading-none select-none">
            What happened lately
          </h2>
          <span className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/70 tracking-[-0.03em] select-none">
            Below you will find latest news
          </span>
        </div>

        {/* ─── 2. Interactive Infinite Loop Carousel ─── */}
        <InteractiveInfiniteCarousel
          items={NEWS_ITEMS}
          gapClass="gap-[0.8333vw]"
          paddingRightClass="pr-[0.8333vw]"
          speed={-0.75}
          renderItem={(item, idx, hasDraggedRef) => (
            <article 
              className="w-[280px] sm:w-[23.9583vw] shrink-0 flex flex-col group cursor-pointer"
              onClick={(e) => {
                if (hasDraggedRef?.current || window.__norqueCarouselDragged) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
              }}
            >
              {/* Media Card */}
              <div className={`w-full ${item.aspect} rounded-[4px] overflow-hidden mb-[0.6944vw] bg-[#121214] pointer-events-none`}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] select-none"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col space-y-[0.3472vw] pointer-events-none select-none">
                <h3 className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-snug group-hover:opacity-80 transition-opacity">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] leading-normal line-clamp-3">
                  {item.description}
                </p>
              </div>
            </article>
          )}
        />
      </div>
    </section>
  );
}
