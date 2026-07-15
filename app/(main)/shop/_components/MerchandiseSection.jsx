"use client";

import React from "react";
import Image from "next/image";

// Import all required assets
import AboutImg from "@/assets/about.png";
import AboutNeonImg from "@/assets/aboutneon.png";
import BannerImg from "@/assets/banner.png";
import E1 from "@/assets/e1.png";
import E2 from "@/assets/e2.png";
import E3 from "@/assets/e3.png";
import E4 from "@/assets/e4.png";
import E5 from "@/assets/e5.png";
import V1 from "@/assets/v1.png";
import V2 from "@/assets/v2.png";
import V3 from "@/assets/v3.png";
import V4 from "@/assets/v4.png";

// A single scroll column component for vertical marquee
const MarqueeColumn = ({ images, speed = "medium", direction = "up", className = "" }) => {
  const speedClass = 
    speed === "fast" 
      ? "duration-[20s]" 
      : speed === "medium" 
      ? "duration-[30s]" 
      : "duration-[40s]";
  
  const directionClass = 
    direction === "up" 
      ? "animate-marquee-up" 
      : "animate-marquee-down";

  // Duplicate images list to ensure a seamless infinite scroll loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className={`relative flex flex-col overflow-hidden h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[20px] bg-transparent ${className}`}>
      <div className={`flex flex-col gap-3 sm:gap-4 shrink-0 ${directionClass} ${speedClass} hover:[animation-play-state:paused] cursor-pointer`}>
        {duplicatedImages.map((img, idx) => (
          <div 
            key={`${idx}`} 
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-white/5 group shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-primary/20"
          >
            <Image
              src={img}
              alt="Pariah Experience Showcase"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-w-640px) 33vw, (max-w-1024px) 16vw, 150px"
            />
            {/* Soft inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

const MerchandiseSection = () => {
  // Image pools for different columns to keep visual variety
  const col1Images = [E3, V1, V2];
  const col2Images = [V1, E3, V3];
  const col3Images = [AboutImg, E5, V4];
  const col4Images = [AboutNeonImg, E5, E1];
  const col5Images = [AboutImg, E5, V2];
  const col6Images = [AboutNeonImg, E5, V3];
  const col7Images = [E3, E5, V1];
  const col8Images = [E4, E1, E2];
  const col9Images = [V1, E3, V4];
  const col10Images = [E2, E4, E5];

  // Mobile image pools (3 columns)
  const mobileCol1 = [E3, V1, AboutImg, E5];
  const mobileCol2 = [V2, AboutNeonImg, E1, E4];
  const mobileCol3 = [E2, V3, V4, E5];

  // Tablet image pools (6 columns)
  const tabletCol1 = [E3, V1, V2];
  const tabletCol2 = [V1, E3, V3];
  const tabletCol3 = [AboutImg, E5, V4];
  const tabletCol4 = [AboutNeonImg, E5, E1];
  const tabletCol5 = [E3, E5, V1];
  const tabletCol6 = [E4, E1, E2];

  return (
    <section className="relative w-full bg-[#050505] py-16 md:py-24 lg:py-32 section-padding-x overflow-hidden flex flex-col items-center justify-between min-h-[90vh]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Gallery Canopy Area */}
      <div className="w-full max-w-[1700px] mx-auto z-10 relative">
        
        {/* MOBILE GRID LAYOUT (3 Columns) - As shown in Screenshot 2 */}
        <div className="grid grid-cols-3 gap-3 md:hidden w-full max-w-[500px] mx-auto select-none">
          <MarqueeColumn images={mobileCol1} speed="medium" direction="up" className="translate-y-4" />
          <MarqueeColumn images={mobileCol2} speed="slow" direction="down" className="-translate-y-4" />
          <MarqueeColumn images={mobileCol3} speed="fast" direction="up" className="translate-y-4" />
        </div>

        {/* TABLET GRID LAYOUT (6 Columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-6 gap-4 w-full select-none">
          <MarqueeColumn images={tabletCol1} speed="medium" direction="up" className="translate-y-8" />
          <MarqueeColumn images={tabletCol2} speed="slow" direction="down" className="translate-y-0" />
          <MarqueeColumn images={tabletCol3} speed="fast" direction="up" className="-translate-y-8" />
          <MarqueeColumn images={tabletCol4} speed="fast" direction="down" className="-translate-y-8" />
          <MarqueeColumn images={tabletCol5} speed="medium" direction="up" className="translate-y-0" />
          <MarqueeColumn images={tabletCol6} speed="slow" direction="down" className="translate-y-8" />
        </div>

        {/* DESKTOP GRID LAYOUT (10 Columns) - Staggered Canopy Arch as shown in Screenshot 1 */}
        <div className="hidden lg:grid grid-cols-10 gap-4 w-full select-none">
          <MarqueeColumn images={col1Images} speed="slow" direction="up" className="translate-y-[100px]" />
          <MarqueeColumn images={col2Images} speed="medium" direction="down" className="translate-y-[50px]" />
          <MarqueeColumn images={col3Images} speed="slow" direction="up" className="translate-y-[10px]" />
          <MarqueeColumn images={col4Images} speed="fast" direction="down" className="translate-y-[-20px]" />
          <MarqueeColumn images={col5Images} speed="medium" direction="up" className="translate-y-[-30px]" />
          <MarqueeColumn images={col6Images} speed="medium" direction="down" className="translate-y-[-30px]" />
          <MarqueeColumn images={col7Images} speed="fast" direction="up" className="translate-y-[-20px]" />
          <MarqueeColumn images={col8Images} speed="slow" direction="down" className="translate-y-[10px]" />
          <MarqueeColumn images={col9Images} speed="medium" direction="up" className="translate-y-[50px]" />
          <MarqueeColumn images={col10Images} speed="slow" direction="down" className="translate-y-[100px]" />
        </div>

      </div>

      {/* Typography Content Area */}
      <div className="w-full max-w-4xl mx-auto text-center mt-16 md:mt-24 lg:mt-32 px-4 z-20 flex flex-col gap-6 md:gap-8 items-center">
        <h2 className="text-white font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal leading-tight tracking-wide drop-shadow-md select-none">
          Pariah Merchandise
        </h2>
        
        <p className="text-secondary-gray font-outfit text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-medium tracking-wide">
          Take a piece of the Pariah experience home with you. Our exclusive merchandise reflects our creative identity and is available only at our physical location. Explore our collection during your next visit.
        </p>

        {/* Micro-interaction decoration */}
        <div className="flex items-center gap-2 mt-4 select-none opacity-40 hover:opacity-100 transition-opacity duration-300">
          <span className="w-8 h-[1px] bg-primary/50" />
          <svg className="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <span className="w-8 h-[1px] bg-primary/50" />
        </div>
      </div>

      {/* Custom Keyframe Animations Block */}
      <style jsx global>{`
        @keyframes marquee-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        @keyframes marquee-down {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-marquee-up {
          animation: marquee-up linear infinite;
          animation-duration: inherit;
        }
        .animate-marquee-down {
          animation: marquee-down linear infinite;
          animation-duration: inherit;
        }
      `}</style>
    </section>
  );
};

export default MerchandiseSection;
