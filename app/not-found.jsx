"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <>
      <title>Page Not Found | Pariah Design House</title>
      <meta name="description" content="The page you are looking for does not exist." />
      <div className="relative min-h-screen bg-[#0D0D0D] flex flex-col justify-center items-center px-4 overflow-hidden font-outfit">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-6000" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-8000" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-[540px] text-center w-full">
        {/* Animated Icon Container */}
        <div className="relative mb-6">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-ping duration-3000" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#121212] border-2 border-primary/30 text-primary shadow-lg shadow-primary/10">
            <FiSearch size={42} className="animate-bounce duration-2000" />
          </div>
        </div>

        {/* Large 404 text with Gradient */}
        <h1 className="text-[120px] sm:text-[160px] font-black tracking-tighter leading-none select-none bg-linear-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-3 tracking-wide">
          Page Not Found
        </h2>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 max-w-[440px]">
          We looked everywhere, but the page you are trying to access doesn&apos;t exist or has been moved to another URL.
        </p>

        {/* Mock Search Bar (Design Element) */}
        <div className="w-full bg-[#121212] border border-[#262626] rounded-2xl p-2 pl-4 flex items-center gap-3 mb-10 shadow-custom focus-within:border-primary/50 transition-colors">
          <FiSearch className="text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search for pages..."
            disabled
            className="bg-transparent text-sm text-white placeholder-white/20 outline-none w-full cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="bg-[#1A1A1A] border border-[#262626] text-white/60 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-not-allowed transition-colors"
          >
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <button
            onClick={() => router.back()}
            className="w-full sm:flex-1 bg-[#121212] border border-[#262626] hover:bg-[#1A1A1A] hover:border-white/10 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>
          
          <Link
            href="/"
            className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <FiHome size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotFoundPage;
