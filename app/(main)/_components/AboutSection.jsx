"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import AboutBg from "@/assets/about.png";
import AboutNeonBg from "@/assets/aboutneon.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGetHomePageCMSQuery } from "@/redux/api/apiSlice";

const ScrollWord = ({ children, progress, index, total, className }) => {
  const start = index / total;
  const end = Math.min(1, (index + 1.5) / total);

  // Transition color from secondary-gray to white
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(237, 232, 223, 0.60)", "rgba(255, 255, 255, 1)"],
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
    ["rgba(237, 232, 223, 0.60)", "rgba(255, 255, 255, 1)"],
  );

  return (
    <motion.svg style={{ fill }} className={className} viewBox="0 0 24 24">
      <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
    </motion.svg>
  );
};

const AboutSection = () => {
  const containerRef = useRef(null);

  const { data: response } = useGetHomePageCMSQuery();
  const mainAbout = response?.data?.content?.main_about;

  const aboutTitle = mainAbout?.about_title || "About";
  const aboutSubDescription =
    mainAbout?.about_sub_description ||
    "Pariah Is A Creative Hospitality Concept That Elevates Craft Through Immersive Pop-Up Experiences Designed For The Perfect Night Out.";

  // Construct dynamic slides from CMS or use local assets as fallback
  const slides =
    mainAbout?.slides && mainAbout.slides.length > 0
      ? mainAbout.slides.map((s) => s.image)
      : [AboutBg, AboutNeonBg];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slideshow timer
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const descriptionParagraphs = mainAbout?.about_description
    ? mainAbout.about_description.split("\n").filter((p) => p.trim() !== "")
    : [
        "Pariah Design House Is A London-Based Experiential Studio Specialising In Art Bar Pop-Up Events. We Design Temporary Environments Where Art, Architecture, And Hospitality Converge — Spaces That Exist For One Night And Live In Memory Indefinitely.",
        "Each Event Is Commissioned As A Complete Aesthetic Programme: The Art, The Space, The Bar, The Light, The Sound. Nothing Is Incidental. Everything Is Designed To Be Felt.",
      ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.65"],
  });

  const words = aboutSubDescription.split(" ");
  const totalElements = words.length + 1; // +1 to account for the star icon

  return (
    <section
      id="about"
      className="w-full bg-[#050505] py-20 md:py-28 section-padding-x flex flex-col gap-10 md:gap-20"
    >
      {/* Top Grid: Image & Main About Text */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image Slideshow Container */}
        <div className="relative w-full aspect-4/5 max-w-[480px] mx-auto rounded-[16px] overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5 bg-[#111]">
          {/* Slides */}
          {slides.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-1" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={image}
                alt={`About slide ${index + 1}`}
                fill
                sizes="(max-w-768px) 100vw, 480px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Slider Pagination Dots (Capsule blurred background) */}
          {slides.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 select-none bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-md">
              {slides.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125 shadow-[0_0_8px_#E5A93B]"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-xl mx-auto lg:mx-0">
          <h2 className="text-white text-5xl md:text-6xl font-playfair tracking-wide font-normal">
            {aboutTitle}
          </h2>
          <div className="flex flex-col gap-5 text-secondary-gray font-outfit text-[15px] md:text-[16px] leading-relaxed tracking-wider">
            {descriptionParagraphs.map((para, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Centered Logo and Concept Statement */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center px-4">
        {/* Concept Statement Text */}
        <h3
          ref={containerRef}
          className="font-outfit text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-relaxed tracking-wide max-w-3xl flex justify-center items-center flex-wrap gap-x-2 gap-y-1"
        >
          {words.map((word, idx) => {
            const isCraft =
              word.toLowerCase().replace(/[^a-z]/g, "") === "craft";
            const isExperiences =
              word.toLowerCase().replace(/[^a-z]/g, "") === "experiences";
            return (
              <React.Fragment key={idx}>
                <ScrollWord
                  progress={scrollYProgress}
                  index={idx}
                  total={totalElements}
                  className={`inline-block mr-2 ${isCraft ? "font-semibold" : ""}`}
                >
                  {word}
                </ScrollWord>
                {isExperiences && (
                  <ScrollIcon
                    progress={scrollYProgress}
                    index={idx + 1}
                    total={totalElements}
                    className="w-5 h-5 md:w-6 md:h-6 inline-block align-middle mr-2"
                  />
                )}
              </React.Fragment>
            );
          })}
        </h3>
      </div>
    </section>
  );
};

export default AboutSection;
