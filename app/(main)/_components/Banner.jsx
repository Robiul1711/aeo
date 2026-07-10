'use client';
import React from "react";
import Image from "next/image";
import BannerBg from "@/assets/banner.png";
import LogoImg from "@/assets/logoblack.png";

const Banner = () => {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={BannerBg}
          alt="Pariah Banner Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 -z-10" />

      {/* Content Container */}
      <div className="flex flex-col items-center gap-8 px-6 text-center select-none">
        {/* Large Logo */}
        <div className="w-[280px] sm:w-[380px] md:w-[480px] h-auto relative animate-fade-in">
          <Image
            src={LogoImg}
            alt="Pariah Logo"
            width={480}
            height={150}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <p className="text-white font-outfit text-sm sm:text-base md:text-lg font-semibold tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shadow-lg border-none cursor-pointer">
          Art Bar | Creative Hospitality
        </p>
        {/* Book Now Button */}
        <button
          onClick={() => {
            const el = document.getElementById("events");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-3.5 bg-white text-black hover:bg-white/95 rounded-[12px] font-outfit text-[17px] font-semibold tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shadow-lg border-none cursor-pointer"
        >
          Book Now
        </button>
      </div>

      {/* Custom Keyframe animation for fade-in */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Banner;
