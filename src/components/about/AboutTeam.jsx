import React from 'react';

const TEAM = [
  {
    name: 'Alaa Kabil',
    role: 'Graphic Designer',
    image: '/images/about/team-alaa-kabil.png',
  },
  {
    name: 'Okaby',
    role: 'Art Director / Photographer',
    image: '/images/about/team-okaby.jpg',
  },
  {
    name: 'Anas El Sharief',
    role: 'Product Owner & Client Management',
    image: '/images/about/team-anas-el-sharief.png',
  },
  {
    name: 'Marwan Yasser',
    role: 'Video Editor',
    image: '/images/about/team-marwan-yasser.png',
  },
];

export default function AboutTeam() {
  return (
    <section className="w-full py-[4.1667vw] px-[0.8333vw] sm:px-[0.8333vw]">
      <div className="w-full max-w-[1416px] mx-auto">
        {/* Section Heading */}
        <h2 className="text-[32px] sm:text-[3.1944vw] font-semibold text-white tracking-[-0.03em] leading-none mb-[3.4722vw] uppercase">
          PPL BEHIND NRQ™
        </h2>

        {/* Founders Grid - 2 Equal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-[0.8333vw] mb-[4.1667vw]">
          {/* Founder 1: Mostafa Yasser */}
          <div className="relative w-full aspect-[702/628] rounded-[4px] overflow-hidden group">
            <img 
              src="/images/about/founder-mostafa-yasser.png" 
              alt="Mostafa Yasser - Co-Founder" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* Bottom Overlay Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
            
            {/* Founder Info */}
            <div className="absolute bottom-[1.4653vw] left-[1.4653vw] z-10">
              <h3 className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-tight">
                Mostafa Yasser
              </h3>
              <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/90 tracking-[-0.03em] mt-[0.2778vw]">
                Co-Founder / Brand Designer / UI/UX Designer
              </p>
            </div>
          </div>

          {/* Founder 2: Hossam Hassan */}
          <div className="relative w-full aspect-[702/628] rounded-[4px] overflow-hidden group">
            <img 
              src="/images/about/founder-hossam-hassan.png" 
              alt="Hossam Hassan - Co-Founder" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* Bottom Overlay Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

            {/* Founder Info */}
            <div className="absolute bottom-[1.4653vw] left-[1.4653vw] z-10">
              <h3 className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-tight">
                Hossam Hassan
              </h3>
              <p className="text-[11px] sm:text-[0.6944vw] font-semibold text-white/90 tracking-[-0.03em] mt-[0.2778vw]">
                Co-Founder / Full-Stack Developer
              </p>
            </div>
          </div>
        </div>

        {/* Network Manifesto Statement */}
        <div className="max-w-[1056px] mb-[4.1667vw]">
          <p className="text-[18px] sm:text-[1.5278vw] font-bold text-white tracking-[-0.03em] leading-[1.2]">
            Behind NORQUE is a growing network of designers, developers, creatives and specialists who bring their own way of thinking to the table. Different backgrounds, different disciplines, one shared obsession with making things that feel right.
          </p>
        </div>

        {/* 4-Column Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[0.8333vw]">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col group">
              <div className="w-full aspect-[345/266.6] rounded-[4px] overflow-hidden mb-[0.6944vw] bg-[#121214]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] sm:text-[0.6944vw] font-semibold text-white tracking-[-0.03em] leading-tight">
                  {member.name}
                </span>
                <span className="text-[11px] sm:text-[0.6944vw] font-semibold text-[#747474] tracking-[-0.03em] mt-[0.1389vw]">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
