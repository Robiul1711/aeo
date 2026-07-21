"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGetHomePageCMSQuery } from "@/redux/api/apiSlice";
import BannerBg from "@/assets/banner.png";
import E1 from "@/assets/e1.png";
import E2 from "@/assets/e2.png";
import E3 from "@/assets/e3.png";
import E4 from "@/assets/e4.png";

const StoriesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: response } = useGetHomePageCMSQuery();
  const cmsStories = response?.data?.content?.stories;

  // Fallback to static slides if CMS data is not loaded yet
  const slides =
    cmsStories && cmsStories.length > 0
      ? cmsStories.map((story, index) => ({
          id: index + 1,
          image: story.image,
          description: story.description,
        }))
      : [
          {
            id: 1,
            image: BannerBg,
            description:
              "At Pariah Design House, every event is more than just a gathering—it's a shared creative experience. From intimate pop-ups to vibrant art nights, we bring people together to connect, create, and express. Each moment captured here reflects the energy, collaboration, and unique atmosphere that defines our community.",
          },
          {
            id: 2,
            image: E3,
            description:
              "Our dining and culinary workshops bring together fine dining, craft drinks, and artistic expression. Participants engage in sensory explorations, paint with custom palettes, and share unique gastronomic narratives in a collaborative setting.",
          },
          {
            id: 3,
            image: E2,
            description:
              "Celebrations are elevated with bespoke design programs. From custom balloon installations to ambient mood lighting, we transform ordinary spaces into dreamlike environments that spark conversation and joy.",
          },
          {
            id: 4,
            image: E1,
            description:
              "Art workshops and social evenings are the core of our community. We provide the tools, guidance, and setting for guests to unleash their creativity while connecting with like-minded individuals over drinks.",
          },
          {
            id: 5,
            image: E4,
            description:
              "Our signature pop-up bars showcase experimental mixology, curated music playlists, and immersive light installations. Each venue is crafted to engage all senses and create a lasting memory.",
          },
        ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Adjust active index if slides length changes dynamically
  React.useEffect(() => {
    if (activeIndex >= slides.length) {
      setActiveIndex(0);
    }
  }, [slides.length, activeIndex]);

  return (
    <section className="w-full section-padding-y section-padding-x border-t border-white/5 overflow-hidden">
      <div className="flex flex-col gap-6 md:gap-12">
        {/* Top Section: Title & Cards Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h2 className="text-primary font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] uppercase tracking-wider">
              Stories From Our <br /> Events
            </h2>
          </div>

          {/* Right Column: Carousel Slides */}
          <div className="lg:col-span-8 w-full overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * (260 + 24)}px)`, // Portrait width + gap
              }}
            >
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-75 md:h-95 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out shrink-0 cursor-pointer border border-white/5 shadow-lg bg-[#111]
                      ${isActive ? "w-95 sm:w-120 md:w-130" : "w-50 md:w-65 opacity-60 hover:opacity-85"}
                    `}
                  >
                    {slide.image && (
                      <Image
                        src={slide.image}
                        alt={`Event Story ${slide.id}`}
                        fill
                        sizes={isActive ? "520px" : "260px"}
                        className="object-cover"
                        priority={index < 2}
                      />
                    )}

                    {/* Dark gradient overlay for cards */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: Detail Text & Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-4">
          {/* Left: Event Details (aligned with active card description) */}
          <div className="md:col-span-8">
            <p className="text-secondary-gray font-outfit text-[15px] md:text-[16px] leading-relaxed max-w-2xl transition-all duration-300">
              {slides[activeIndex]?.description}
            </p>
          </div>

          {/* Right: Navigation Controls */}
          <div className="md:col-span-4 flex justify-start md:justify-end items-center gap-4">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-[#1A130B] hover:bg-[#251A0E] text-white/80 flex items-center justify-center border border-[#E5A93B]/20 transition-all duration-200 cursor-pointer outline-none active:scale-95"
              aria-label="Previous Slide"
            >
              <svg
                className="w-5 h-5 text-[#E5A93B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#E5A93B] hover:bg-[#f3b705] text-[#0D0D0D] flex items-center justify-center border-none transition-all duration-200 cursor-pointer outline-none active:scale-95 shadow-md"
              aria-label="Next Slide"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesCarousel;
