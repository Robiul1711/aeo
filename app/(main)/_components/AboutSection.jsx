"use client";

import React, { useRef } from "react";
import Image from "next/image";
import AboutBg from "@/assets/about.png";
import AboutNeonBg from "@/assets/aboutneon.png";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollWord = ({ children, progress, index, total, className }) => {
  const start = index / total;
  const end = Math.min(1, (index + 1.5) / total);
  
  // Transition color from secondary-gray to white
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(237, 232, 223, 0.60)", "rgba(255, 255, 255, 1)"]
  );

  return (
    <motion.span style={{ color }} className={className}>
      {children}
    </motion.span>
  );
};

const ScrollIcon = ({ progress, index, total, className }) => {
  const start = index / total;
  const end = Math.min(1, (index + 1.5) / total);
  
  // Transition SVG fill from secondary-gray to white
  const fill = useTransform(
    progress,
    [start, end],
    ["rgba(237, 232, 223, 0.60)", "rgba(255, 255, 255, 1)"]
  );

  return (
    <motion.svg
      style={{ fill }}
      className={className}
      viewBox="0 0 24 24"
    >
      <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
    </motion.svg>
  );
};

const AboutSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.65"]
  });

  const line1Words = "Pariah Is A Creative Hospitality Concept That Elevates".split(" ");
  const line2Words = "Through Immersive Pop-Up Experiences".split(" ");
  const line3Words = "Designed For The Perfect Night Out.".split(" ");

  const totalElements = line1Words.length + 1 + line2Words.length + 1 + line3Words.length;

  return (
    <section id="about" className="w-full bg-[#050505] py-20 md:py-28 section-padding-x flex flex-col gap-10 md:gap-20">
      {/* Top Grid: Image & Main About Text */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with Neon Hover Effect */}
        <div className="relative w-full aspect-4/5 max-w-[480px] mx-auto rounded-[16px] overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5">
          {/* Default Image */}
          <Image
            src={AboutBg}
            alt="About Pariah"
            fill
            sizes="(max-w-768px) 100vw, 480px"
            className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            priority
          />
          {/* Neon/Hover Image */}
          <Image
            src={AboutNeonBg}
            alt="About Pariah Neon"
            fill
            sizes="(max-w-768px) 100vw, 480px"
            className="object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />

          {/* Slider Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 select-none">
            <span className="w-2 h-2 rounded-full bg-white transition-all duration-300 scale-125" />
            <span className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 cursor-pointer transition-all duration-300" />
            <span className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 cursor-pointer transition-all duration-300" />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-xl mx-auto lg:mx-0">
          <h2 className="text-white text-5xl md:text-6xl font-playfair tracking-wide font-normal">
            About
          </h2>
          <div className="flex flex-col gap-5 text-secondary-gray font-outfit text-[15px] md:text-[16px] leading-relaxed tracking-wider">
            <p>
              Pariah Design House Is A London-Based Experiential Studio
              Specialising In Art Bar Pop-Up Events. We Design Temporary
              Environments Where Art, Architecture, And Hospitality Converge —
              Spaces That Exist For One Night And Live In Memory Indefinitely.
            </p>
            <p>
              Each Event Is Commissioned As A Complete Aesthetic Programme: The
              Art, The Space, The Bar, The Light, The Sound. Nothing Is
              Incidental. Everything Is Designed To Be Felt.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Centered Logo and Concept Statement */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center px-4">
        {/* Concept Statement Text */}
        <h3 
          ref={containerRef}
          className="font-outfit text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-relaxed tracking-wide max-w-3xl"
        >
          <div className="mb-2">
            {line1Words.map((word, i) => (
              <ScrollWord
                key={`l1-${i}`}
                progress={scrollYProgress}
                index={i}
                total={totalElements}
                className="inline-block mr-2"
              >
                {word}
              </ScrollWord>
            ))}
          </div>
          <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
            <ScrollWord
              progress={scrollYProgress}
              index={line1Words.length}
              total={totalElements}
              className="font-semibold inline-block"
            >
              Craft
            </ScrollWord>
            {line2Words.map((word, i) => (
              <ScrollWord
                key={`l2-${i}`}
                progress={scrollYProgress}
                index={line1Words.length + 1 + i}
                total={totalElements}
                className="inline-block"
              >
                {word}
              </ScrollWord>
            ))}
            <ScrollIcon
              progress={scrollYProgress}
              index={line1Words.length + 1 + line2Words.length}
              total={totalElements}
              className="w-5 h-5 md:w-6 md:h-6 inline-block align-middle"
            />
          </div>
          <div className="mt-2">
            {line3Words.map((word, i) => (
              <ScrollWord
                key={`l3-${i}`}
                progress={scrollYProgress}
                index={line1Words.length + 1 + line2Words.length + 1 + i}
                total={totalElements}
                className="inline-block mr-2"
              >
                {word}
              </ScrollWord>
            ))}
          </div>
        </h3>
      </div>
    </section>
  );
};

export default AboutSection;
