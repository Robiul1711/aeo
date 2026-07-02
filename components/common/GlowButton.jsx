'use client';

import React from 'react';
import Link from 'next/link';

const GlowButton = ({ children = 'Register', onClick, href, className = '' }) => {
  return (
    <div className={`relative group inline-block cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}>
      {/* Outer Glow Layer */}
      <div 
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#E5A93B] via-[#2A1038] to-[#E5A93B] rounded-[12px] opacity-70 blur-lg transition-all duration-300 group-hover:opacity-85 group-hover:blur-xl bg-glow-animate"
        style={{
          backgroundSize: '200% auto',
        }}
      />
      
      {/* Button Border Container */}
      <div 
        className="p-[1.5px] bg-linear-to-r from-[#E5A93B] via-[#2A1038] to-[#E5A93B] rounded-[12px] transition-all duration-300 bg-glow-animate"
        style={{
          backgroundSize: '200% auto',
        }}
      >
        {/* Button Surface */}
        {href ? (
          <Link 
            href={href}
            className="flex items-center justify-center px-8 py-2 bg-linear-to-b from-[#3A2014] to-[#1B0D08] text-white font-outfit text-lg font-medium tracking-wide rounded-[10px] border-none outline-none cursor-pointer transition-all duration-300 hover:from-[#442618] hover:to-[#22110B] decoration-none"
          >
            {children}
          </Link>
        ) : (
          <button 
            onClick={onClick}
            className="flex items-center justify-center px-8 py-2 bg-linear-to-b from-[#3A2014] to-[#1B0D08] text-white font-outfit text-lg font-medium tracking-wide rounded-[10px] border-none outline-none cursor-pointer transition-all duration-300 hover:from-[#442618] hover:to-[#22110B]"
          >
            {children}
          </button>
        )}
      </div>

      <style>{`
        .bg-glow-animate {
          animation: glow-flow 3s linear infinite;
        }
        @keyframes glow-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export { GlowButton };