"use client";

import React from "react";
import Image from "next/image";
import {
  useGetShopCMSQuery,
  useGetShopGalleryQuery,
} from "@/redux/api/apiSlice";

// Import all required assets
import AboutImg from "@/assets/about.png";
import AboutNeonImg from "@/assets/aboutneon.png";
import BannerImg from "@/assets/banner.png";
import E1 from "@/assets/e1.png";
import E2 from "@/assets/e2.png";
import E3 from "@/assets/e3.png";
import E4 from "@/assets/e4.png";
import E5 from "@/assets/e5.png";
import V1 from "@/assets/v1.png";
import V2 from "@/assets/v2.png";
import V3 from "@/assets/v3.png";
import V4 from "@/assets/v4.png";

// A single scroll column component for vertical marquee
const MarqueeColumn = ({
  images,
  speed = "medium",
  direction = "up",
  className = "",
}) => {
  const speedClass =
    speed === "fast"
      ? "duration-[20s]"
      : speed === "medium"
        ? "duration-[30s]"
        : "duration-[40s]";

  const directionClass =
    direction === "up" ? "animate-marquee-up" : "animate-marquee-down";

  // Duplicate images list to ensure a seamless infinite scroll loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div
      className={`relative flex flex-col overflow-hidden h-67.5 sm:h-82.5 md:h-95 lg:h-102.5 rounded-[20px] bg-transparent ${className}`}
    >
      <div
        className={`flex flex-col gap-3 sm:gap-4 shrink-0 ${directionClass} ${speedClass} hover:[animation-play-state:paused]`}
      >
        {duplicatedImages.map((img, idx) => (
          <div
            key={`${idx}`}
            className="relative aspect-4/5 w-full overflow-hidden rounded-[20px] border border-white/5 group shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-primary/20"
          >
            <Image
              src={img?.src || img}
              alt="Pariah Experience Showcase"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-w-640px) 33vw, (max-w-1024px) 16vw, 150px"
            />
            {/* Soft inner glow overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

const MerchandiseSection = () => {
  const { data: cmsResponse, isLoading: cmsLoading } = useGetShopCMSQuery();
  const { data: galleryResponse, isLoading: galleryLoading } =
    useGetShopGalleryQuery();
  const isLoading = cmsLoading || galleryLoading;

  const shopCms = cmsResponse?.data;
  const title = shopCms?.title || "Pariah Merchandise";
  const descriptionHtml = shopCms?.description;

  const galleryItems = galleryResponse?.data
    ? [...galleryResponse.data].sort(
        (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
      )
    : [];

  const getCol = (startIdx, fallback) => {
    if (galleryItems.length >= startIdx + 2) {
      return [galleryItems[startIdx].image, galleryItems[startIdx + 1].image];
    }
    return fallback;
  };

  // Image pools: 2 images per column forming exactly 2 rows across canopy layout
  const col1Images = getCol(0, [E3, V1]);
  const col2Images = getCol(2, [V1, V3]);
  const col3Images = getCol(4, [AboutImg, E5]);
  const col4Images = getCol(6, [AboutNeonImg, E1]);
  const col5Images = getCol(8, [AboutImg, V2]);
  const col6Images = getCol(10, [AboutNeonImg, V3]);
  const col7Images = getCol(12, [E3, V1]);
  const col8Images = getCol(14, [E4, E2]);
  const col9Images = getCol(16, [V1, V4]);
  const col10Images = getCol(18, [E2, E5]);

  // Mobile image pools (3 columns, 2 rows each)
  const mobileCol1 = getCol(0, [E3, V1]);
  const mobileCol2 = getCol(2, [V2, E1]);
  const mobileCol3 = getCol(4, [E2, V4]);

  // Tablet image pools (6 columns, 2 rows each)
  const tabletCol1 = getCol(0, [E3, V1]);
  const tabletCol2 = getCol(2, [V1, V3]);
  const tabletCol3 = getCol(4, [AboutImg, V4]);
  const tabletCol4 = getCol(6, [AboutNeonImg, E1]);
  const tabletCol5 = getCol(8, [E3, V1]);
  const tabletCol6 = getCol(10, [E4, E2]);

  return (
    <section className="relative w-full bg-[#050505] py-16 md:py-24 lg:py-32 section-padding-x overflow-hidden flex flex-col items-center justify-between min-h-[90vh]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Gallery Canopy Area */}
      <div className="w-full max-w-425 mx-auto z-10 relative">
        {isLoading ? (
          <>
            {/* MOBILE SKELETON */}
            <div className="grid grid-cols-3 gap-3 md:hidden w-full max-w-125 mx-auto select-none">
              <div className="flex flex-col gap-3 animate-pulse translate-y-4">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-4">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-4">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
            </div>

            {/* TABLET SKELETON */}
            <div className="hidden md:grid lg:hidden grid-cols-6 gap-4 w-full select-none">
              <div className="flex flex-col gap-3 animate-pulse translate-y-8">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-0">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-8">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-8">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-0">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-8">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
            </div>

            {/* DESKTOP CURVED CANOPY SKELETON */}
            <div className="hidden lg:grid grid-cols-10 gap-4 w-full select-none">
              <div className="flex flex-col gap-3 animate-pulse translate-y-25">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-12.5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-2.5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-7.5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-7.5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse -translate-y-5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-2.5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-12.5">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-pulse translate-y-25">
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
                <div className="aspect-4/5 w-full rounded-[20px] bg-white/10 border border-white/5" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* MOBILE GRID LAYOUT (3 Columns) */}
            <div className="grid grid-cols-3 gap-3 md:hidden w-full max-w-125 mx-auto select-none">
              <MarqueeColumn
                images={mobileCol1}
                speed="medium"
                direction="up"
                className="translate-y-4"
              />
              <MarqueeColumn
                images={mobileCol2}
                speed="slow"
                direction="down"
                className="-translate-y-4"
              />
              <MarqueeColumn
                images={mobileCol3}
                speed="fast"
                direction="up"
                className="translate-y-4"
              />
            </div>

            {/* TABLET GRID LAYOUT (6 Columns) */}
            <div className="hidden md:grid lg:hidden grid-cols-6 gap-4 w-full select-none">
              <MarqueeColumn
                images={tabletCol1}
                speed="medium"
                direction="up"
                className="translate-y-8"
              />
              <MarqueeColumn
                images={tabletCol2}
                speed="slow"
                direction="down"
                className="translate-y-0"
              />
              <MarqueeColumn
                images={tabletCol3}
                speed="fast"
                direction="up"
                className="-translate-y-8"
              />
              <MarqueeColumn
                images={tabletCol4}
                speed="fast"
                direction="down"
                className="-translate-y-8"
              />
              <MarqueeColumn
                images={tabletCol5}
                speed="medium"
                direction="up"
                className="translate-y-0"
              />
              <MarqueeColumn
                images={tabletCol6}
                speed="slow"
                direction="down"
                className="translate-y-8"
              />
            </div>

            {/* DESKTOP GRID LAYOUT (10 Columns) */}
            <div className="hidden lg:grid grid-cols-10 gap-4 w-full select-none">
              <MarqueeColumn
                images={col1Images}
                speed="slow"
                direction="up"
                className="translate-y-25"
              />
              <MarqueeColumn
                images={col2Images}
                speed="medium"
                direction="down"
                className="translate-y-12.5"
              />
              <MarqueeColumn
                images={col3Images}
                speed="slow"
                direction="up"
                className="translate-y-2.5"
              />
              <MarqueeColumn
                images={col4Images}
                speed="fast"
                direction="down"
                className="-translate-y-5"
              />
              <MarqueeColumn
                images={col5Images}
                speed="medium"
                direction="up"
                className="-translate-y-7.5"
              />
              <MarqueeColumn
                images={col6Images}
                speed="medium"
                direction="down"
                className="-translate-y-7.5"
              />
              <MarqueeColumn
                images={col7Images}
                speed="fast"
                direction="up"
                className="-translate-y-5"
              />
              <MarqueeColumn
                images={col8Images}
                speed="slow"
                direction="down"
                className="translate-y-2.5"
              />
              <MarqueeColumn
                images={col9Images}
                speed="medium"
                direction="up"
                className="translate-y-12.5"
              />
              <MarqueeColumn
                images={col10Images}
                speed="slow"
                direction="down"
                className="translate-y-25"
              />
            </div>
          </>
        )}
      </div>

      {/* Typography Content Area */}
      <div className="w-full max-w-4xl mx-auto text-center mt-16 md:mt-24 lg:mt-32 px-4 z-20 flex flex-col gap-6 md:gap-8 items-center">
        <h2 className="text-white font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal leading-tight tracking-wide drop-shadow-md select-none">
          {title}
        </h2>

        {descriptionHtml ? (
          <div
            className="text-secondary-gray font-outfit text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-medium tracking-wide [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        ) : (
          <p className="text-secondary-gray font-outfit text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-medium tracking-wide">
            Take a piece of the Pariah experience home with you. Our exclusive
            merchandise reflects our creative identity and is available only at
            our physical location. Explore our collection during your next
            visit.
          </p>
        )}

        {/* Micro-interaction decoration */}
        <div className="flex items-center gap-2 mt-4 select-none opacity-40 hover:opacity-100 transition-opacity duration-300">
          <span className="w-8 h-px bg-primary/50" />
          <svg
            className="w-4 h-4 text-primary fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
          </svg>
          <span className="w-8 h-px bg-primary/50" />
        </div>
      </div>

      {/* Custom Keyframe Animations Block */}
      <style jsx global>{`
        @keyframes marquee-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        @keyframes marquee-down {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-marquee-up {
          animation: marquee-up linear infinite;
          animation-duration: inherit;
        }
        .animate-marquee-down {
          animation: marquee-down linear infinite;
          animation-duration: inherit;
        }
      `}</style>
    </section>
  );
};

export default MerchandiseSection;
