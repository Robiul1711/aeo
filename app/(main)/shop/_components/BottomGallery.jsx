"use client";

import React from "react";
import Image from "next/image";
import { useGetShopProductsQuery } from "@/redux/api/apiSlice";

// Import required fallback assets
import E1 from "@/assets/e1.png";
import E3 from "@/assets/e3.png";
import E4 from "@/assets/e4.png";
import V1 from "@/assets/v1.png";
import V2 from "@/assets/v2.png";

const BottomGallery = ({ onImageClick }) => {
  const { data: response, isLoading } = useGetShopProductsQuery();
  const products = response?.data || [];

  const fallbackImages = [V1, E3, V2, E4, E1];
  const displayItems = products.length > 0 ? products : fallbackImages;

  return (
    <section className="relative w-full py-16 md:py-24 section-padding-x  overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Gallery Section Container */}
      <div className="w-full z-10 relative select-none">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-4/5 w-full rounded-[24px] bg-white/10 border border-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {displayItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => onImageClick && onImageClick(item)}
                className="relative aspect-4/5 w-full overflow-hidden rounded-[24px] border border-white/5 group shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-[#111]"
              >
                <Image
                  src={item?.image || item?.src || item}
                  alt={item?.title || item?.name || "Pariah Gallery Item"}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-w-768px) 50vw, (max-w-1024px) 33vw, 300px"
                />
                {/* Soft inner glow overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-outfit text-sm font-semibold truncate">
                    {item?.title || item?.name || "View Details"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BottomGallery;
