"use client";

import React from "react";
import Image from "next/image";

// Import local assets
import HeaderBg from "@/assets/about.png";

const CareersPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 overflow-hidden bg-[#0D0D0D]">
      {/* Background Image */}
      <Image
        src={HeaderBg}
        alt="Join Our Team"
        fill
        className="object-cover object-center opacity-65"
        priority
      />
      {/* Dark Gradients Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0D0D0D]" />
      <div className="absolute inset-0 bg-black/45" />

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8 my-12">
        {/* Title */}
        <h1 className="text-white font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal tracking-wide leading-tight">
          Join Our Team
        </h1>
        
        {/* Paragraph Text */}
        <p className="text-white/80 font-outfit text-[14px] sm:text-[16px] md:text-[18px] leading-[1.8] max-w-3xl font-light text-center px-2">
          Thank you for your interest in a career at Pariah. We are always looking for passionate individuals who
          share our commitment to the arts and exceptional hospitality. As part of our team, you'll have the
          opportunity to work in a creative, collaborative environment that values innovation, growth, and
          meaningful guest experiences. We believe in nurturing talent and providing opportunities for both
          personal and professional development. We look forward to learning more about you.
        </p>

        {/* Email Us Button */}
        <a
          href="mailto:careers@pariah.com"
          className="mt-4 px-10 py-3.5 bg-primary text-black hover:bg-primary/95 font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shadow-lg inline-block text-center cursor-pointer border-none"
        >
          Email Us
        </a>
      </div>
    </div>
  );
};

export default CareersPage;
