import React from 'react';
import InteractiveInfiniteCarousel from './InteractiveInfiniteCarousel';
import newsLithuania from '../assets/news-lithuania.png';
import newsSaudi from '../assets/news-saudi.png';
import newsIdentity from '../assets/news-identity.png';
import projectAxis from '../assets/project-axis.png';

const newsItems = [
  {
    id: 1,
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: newsLithuania,
  },
  {
    id: 2,
    title: 'Catch us in Saudi Arabia',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: newsSaudi,
  },
  {
    id: 3,
    title: 'Developing a Lithuanian architecture studio’s visual Identity',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: newsIdentity,
  },
  {
    id: 4,
    title: 'Next chapter of an architecture studio in Lithuania',
    description: 'Over past month, we have been working on a Lithuanian architecture studio owned by the great architect Justas Juzenas. We are currently building the hierarchy, layouts and the mood of the studio’s website.',
    image: projectAxis,
  },
];

export default function NewsSection() {
  return (
    <section className="w-full bg-black py-[2.7778vw]">
      {/* Universal margin: 24px (1.6667vw) */}
      <div className="w-full px-[1.6667vw]">
        {/* Header row */}
        <div className="flex justify-between items-end mb-[1.6667vw]">
          <h2 className="text-[3.1944vw] font-semibold tracking-[-0.03em] leading-none text-white select-none">
            What’s happening now
          </h2>
          <span className="text-[0.6944vw] font-semibold tracking-[-0.03em] text-[#747474] pb-[0.2778vw] select-none">
            Below you will find latest news
          </span>
        </div>

        {/* Interactive Click & Drag Infinite Loop Carousel */}
        <InteractiveInfiniteCarousel
          items={newsItems}
          gapClass="gap-[0.8333vw]"
          paddingRightClass="pr-[0.8333vw]"
          speed={-0.75}
          renderItem={(item, idx, hasDraggedRef) => (
            <article 
              className="w-[280px] sm:w-[23.9583vw] shrink-0 group cursor-pointer"
              onClick={(e) => {
                if (hasDraggedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              {/* Image */}
              <div className="w-full overflow-hidden rounded-[0.1389vw] bg-[#121212] pointer-events-none">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  draggable={false}
                  className="w-full aspect-square object-cover rounded-[0.1389vw] transition-transform duration-500 ease-out group-hover:scale-[1.02] select-none"
                  loading="lazy"
                />
              </div>

              {/* Text metadata */}
              <div className="pt-[0.6944vw] space-y-[0.4167vw] pointer-events-none select-none">
                <h3 className="text-[12px] sm:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-[1.2]">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-[0.6944vw] font-semibold tracking-[-0.03em] text-white leading-[1.2]">
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
