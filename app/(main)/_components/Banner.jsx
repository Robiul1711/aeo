'use client';
import React from "react";
import Image from "next/image";
import BannerBg from "@/assets/banner.png";
import LogoImg from "@/assets/logoblack.png";
import { useGetHomePageCMSQuery } from "@/redux/api/apiSlice";
import { BannerSkeleton } from "@/components/common/Skeleton";

const Banner = () => {
  const { data: response, isLoading } = useGetHomePageCMSQuery();
  const bannerContent = response?.data?.content?.main_about;
  console.log(bannerContent)
  if(isLoading) {
    return <BannerSkeleton />
  }
  const bgMedia = bannerContent?.bg_image || BannerBg;
  const isVideo = typeof bgMedia === 'string' && (bgMedia.toLowerCase().endsWith('.mp4') || bgMedia.toLowerCase().includes('.mp4?'));

  return (
    <section className="relative w-full h-[85vh] md:h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 -z-20">
        {isVideo ? (
          <video
            src={bgMedia}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <Image
            src={bgMedia}
            alt="Pariah Banner Background"
            fill
            className="object-cover object-center"
            priority
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 -z-10" />

      {/* Content Container */}
      <div className="flex flex-col items-center gap-8 px-6 text-center select-none">
        {/* Large Logo */}
        <div className="w-70 sm:w-95 md:w-120 h-auto relative animate-fade-in">
          <Image
            src={bannerContent?.hero_image || LogoImg}
            alt="Pariah Logo"
            width={480}
            height={150}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <p className="text-white font-outfit text-sm sm:text-base md:text-lg font-semibold tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]  border-none">
          {bannerContent?.hero_text || "Art Bar | Creative Hospitality"}
        </p>
        {/* Book Now Button */}
        <button
          onClick={() => {
            const el = document.getElementById("events");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-3.5 bg-white text-black hover:bg-white/95 rounded-xl font-outfit text-[17px] font-semibold tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shadow-lg border-none cursor-pointer"
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
