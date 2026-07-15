"use client";

import React from "react";
import Image from "next/image";

// Import all required assets
import E1 from "@/assets/e1.png";
import E3 from "@/assets/e3.png";
import E4 from "@/assets/e4.png";
import V1 from "@/assets/v1.png";
import V2 from "@/assets/v2.png";

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
    <div className={`relative flex flex-col overflow-hidden h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-[24px] bg-transparent ${className}`}>
      <div className={`flex flex-col gap-4 shrink-0 ${directionClass} ${speedClass} hover:[animation-play-state:paused] cursor-pointer`}>
        {duplicatedImages.map((img, idx) => (
          <div 
            key={`${idx}`} 
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-white/5 group shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-primary/20"
          >
            <Image
              src={img}
              alt="Pariah Lifestyle Collage"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-w-768px) 33vw, 300px"
            />
            {/* Soft inner glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

const BottomGallery = () => {
  // Define image lists matching the exact cards and positions in the screenshot
  const col1Images = [V1, E3, V2]; // Left Column: Wood lamp, Dining workshop, another lifestyle
  const col2Images = [E3, E3, E4]; // Center Column: Dining table, Dining table, balloons scene
  const col3Images = [E1, E1, E1]; // Right Column: Paint brushes, brushes, brushes

  return (
    <section className="relative w-full bg-[#050505] py-16  section-padding-x overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 3-Column Marquee Grid - Exactly as in the Screenshot */}
      <div className="w-full max-w-[800px] mx-auto z-10 relative select-none">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full">
          {/* Column 1: Scrolls Up, contains wood lamp, dining workshop */}
          <MarqueeColumn images={col1Images} speed="medium" direction="up" className="translate-y-4" />
          
          {/* Column 2: Scrolls Down, contains dining workshop, balloons */}
          <MarqueeColumn images={col2Images} speed="slow" direction="down" className="-translate-y-4" />
          
          {/* Column 3: Scrolls Up, contains paint brushes */}
          <MarqueeColumn images={col3Images} speed="fast" direction="up" className="translate-y-4" />
        </div>
      </div>
    </section>
  );
};

export default BottomGallery;
