"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetEventsQuery } from "@/redux/api/apiSlice";
import bg from "@/assets/ebg.png";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  } catch (e) {
    return dateStr;
  }
};

const EventsPageClient = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Build query parameters
  const queryParams = {
    page: currentPage,
    per_page: itemsPerPage,
  };

  if (activeTab !== "all") {
    queryParams.filter = activeTab;
  }

  const { data: response, isLoading, isError } = useGetEventsQuery(queryParams);
  const events = response?.data || [];
  const pagination = response?.pagination;

  const tabs = [
    { id: "all", label: "All" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
  ];

  return (
    <section
      className="w-full min-h-screen py-8 section-padding-x "
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-outfit text-[14px] tracking-wide select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Upcoming Events
          </div>
          <h1 className="text-white font-playfair text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide leading-tight">
            Discover Our Experiences
          </h1>
        </div>

        {/* Tab System Filter */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1); // Reset page on filter change
              }}
              className={`px-6 py-2.5 rounded-full font-outfit text-[15px] font-semibold transition-all duration-300 border cursor-pointer
                ${
                  activeTab === tab.id
                    ? "bg-primary border-primary text-black shadow-[0_0_15px_rgba(243,183,5,0.2)]"
                    : "bg-[#111111]/60 border-white/5 text-white/60 hover:text-white hover:border-white/20"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-3 animate-pulse">
                {/* Image Card Skeleton */}
                <div className="relative w-full aspect-[4/5] rounded-[16px] bg-white/10 border border-white/5 overflow-hidden">
                  <div className="absolute top-4 right-4 w-16 h-8 bg-white/15 rounded-[8px]" />
                </div>
                {/* Info Text Skeleton */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="h-5 bg-white/10 rounded-md w-3/4" />
                  <div className="h-4 bg-white/5 rounded-md w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center py-20">
            <p className="text-red-500/80 font-outfit text-lg">
              Failed to load events. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-white/40 font-outfit text-lg">
              No events scheduled at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* Grid List */}
        {!isLoading && !isError && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="flex flex-col group cursor-pointer"
              >
                {/* Image Container Card */}
                <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg border border-white/5 bg-[#111]">
                  {event.banner_image && (
                    <Image
                      src={event.banner_image}
                      alt={event.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 280px"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  )}

                  {/* Date Tag */}
                  <div className="absolute top-4 right-4 bg-white text-black font-outfit text-[14px] font-semibold px-4 py-2 rounded-[8px] shadow-sm select-none">
                    {formatDate(event.event_date)}
                  </div>
                </div>

                {/* Text Info below card */}
                <div className="mt-4 flex flex-col gap-1">
                  <h3 className="text-white font-outfit text-[19px] font-semibold tracking-wide transition-colors duration-200 group-hover:text-[#E5A93B]">
                    {event.title}
                  </h3>
                  <p className="text-secondary-gray font-outfit text-[14px] tracking-wide">
                    {event.city || "Dhaka"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Integration */}
        {!isLoading && !isError && pagination && pagination.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 rounded-[8px] bg-transparent border border-white/10 hover:border-white/30 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer text-[14px] font-outfit font-semibold"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: pagination.last_page }, (_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-[8px] flex items-center justify-center font-outfit text-[14px] font-semibold transition-all duration-200 border cursor-pointer
                    ${
                      currentPage === pageNum
                        ? "bg-primary border-primary text-black font-bold"
                        : "bg-transparent border-white/10 text-white/70 hover:border-white/30"
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.last_page),
                )
              }
              disabled={currentPage === pagination.last_page}
              className="px-4 py-2.5 rounded-[8px] bg-transparent border border-white/10 hover:border-white/30 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer text-[14px] font-outfit font-semibold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPageClient;
