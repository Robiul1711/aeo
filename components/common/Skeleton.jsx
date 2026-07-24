// All Skeleton components should be placed here
import React from "react";

export const BannerSkeleton = () => {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex flex-col justify-center items-center overflow-hidden bg-black/90">
      {/* Background Skeleton with pulse */}
      <div className="absolute inset-0 -z-20 bg-neutral-900/80 animate-pulse" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 -z-10" />

      {/* Content Container Skeleton */}
      <div className="flex flex-col items-center gap-8 px-6 text-center select-none w-full max-w-4xl animate-pulse">
        {/* Large Logo Placeholder */}
        <div className="w-70 sm:w-95 md:w-120 h-20 sm:h-28 md:h-36 bg-white/10 rounded-2xl" />

        {/* Text Line Placeholder */}
        <div className="h-5 sm:h-6 w-48 sm:w-64 bg-white/10 rounded-md" />

        {/* Book Now Button Placeholder */}
        <div className="h-14 w-36 bg-white/10 rounded-xl mt-2" />
      </div>
    </section>
  );
};

export const CareersSkeleton = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 overflow-hidden bg-[#0D0D0D]">
      {/* Background Skeleton with pulse */}
      <div className="absolute inset-0 bg-neutral-900/80 animate-pulse" />
      {/* Dark Gradients Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0D0D0D]" />
      <div className="absolute inset-0 bg-black/45" />

      {/* Content Container Skeleton */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8 my-12 animate-pulse">
        {/* Title Placeholder */}
        <div className="h-12 sm:h-16 md:h-20 w-64 sm:w-96 bg-white/10 rounded-2xl" />
        
        {/* Description Lines Placeholders */}
        <div className="flex flex-col items-center gap-3 w-full max-w-3xl px-2">
          <div className="h-4 w-full bg-white/10 rounded-md" />
          <div className="h-4 w-11/12 bg-white/10 rounded-md" />
          <div className="h-4 w-10/12 bg-white/10 rounded-md" />
          <div className="h-4 w-9/12 bg-white/10 rounded-md" />
        </div>

        {/* Email Us Button Placeholder */}
        <div className="h-12 w-44 bg-white/10 rounded-[12px] mt-4" />
      </div>
    </div>
  );
};

export const CollaborateSkeleton = () => {
  return (
    <div className="min-h-screen text-white pb-6 sm:pb-10 md:pb-24 bg-[#0D0D0D]">
      {/* Header Banner Section Skeleton */}
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] flex items-center justify-center p-6 overflow-hidden bg-neutral-900/80 animate-pulse">
        {/* Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0D0D0D]" />
        
        {/* Text Overlay Skeleton */}
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-4 px-4 mt-12 sm:mt-16">
          <div className="h-10 sm:h-12 md:h-14 w-60 sm:w-96 bg-white/10 rounded-xl" />
          <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
            <div className="h-4 w-full bg-white/10 rounded-md" />
            <div className="h-4 w-4/5 bg-white/10 rounded-md" />
          </div>
        </div>
      </div>

      {/* Form Container Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 relative z-20 animate-pulse">
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-6 sm:p-10 shadow-2xl flex flex-col gap-6">
          {/* Name fields row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-white/10 rounded-md" />
              <div className="h-12 w-full bg-white/5 rounded-[12px]" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-white/10 rounded-md" />
              <div className="h-12 w-full bg-white/5 rounded-[12px]" />
            </div>
          </div>

          {/* Single fields */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>

          {/* Textarea fields */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-48 bg-white/10 rounded-md" />
            <div className="h-28 w-full bg-white/5 rounded-[12px]" />
          </div>

          {/* Single fields */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>

          {/* Textarea field */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-48 bg-white/10 rounded-md" />
            <div className="h-28 w-full bg-white/5 rounded-[12px]" />
          </div>

          {/* Single field */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-white/10 rounded-md" />
            <div className="h-12 w-full bg-white/5 rounded-[12px]" />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3.5 mt-2">
            <div className="w-5 h-5 bg-white/10 rounded-[4px] shrink-0" />
            <div className="h-4 w-3/4 bg-white/10 rounded-md mt-0.5" />
          </div>

          {/* Submit button */}
          <div className="h-14 w-full bg-white/10 rounded-[12px] mt-2" />
        </div>
      </div>
    </div>
  );
};

export const NewsLetterSkeleton = () => {
  return (
    <section className="relative w-full h-[650px] flex items-center justify-center overflow-hidden border-t border-white/5 bg-black/90">
      {/* Background Pulse */}
      <div className="absolute inset-0 -z-10 bg-neutral-900/80 animate-pulse" />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 -z-10" />

      {/* Card Content Skeleton */}
      <div className="relative z-10 w-full max-w-[480px] mx-4 bg-[#050505]/45 backdrop-blur-xl border border-white/10 rounded-[24px] px-8 py-12 flex flex-col items-center shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-pulse">
        {/* Subtitle Placeholder */}
        <div className="h-4 w-48 bg-white/10 rounded-md mb-4" />

        {/* Divider Placeholder */}
        <div className="w-full flex items-center justify-center my-4">
          <div className="h-[0.5px] bg-white/10 w-4/5" />
        </div>

        {/* Title Placeholder */}
        <div className="flex flex-col items-center gap-2 mb-8 mt-2 w-full">
          <div className="h-10 w-3/4 bg-white/10 rounded-md" />
          <div className="h-10 w-1/2 bg-white/10 rounded-md" />
        </div>

        {/* Form Inputs Placeholders */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full h-8 bg-white/5 rounded-md border-b border-white/10" />
          <div className="w-full h-8 bg-white/5 rounded-md border-b border-white/10" />
        </div>

        {/* Button Placeholder */}
        <div className="h-12 w-44 bg-white/10 rounded-full mt-8" />
      </div>
    </section>
  );
};
