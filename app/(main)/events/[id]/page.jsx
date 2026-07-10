"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCalendar, FiMapPin, FiClock, FiChevronRight, FiTag, FiUsers } from "react-icons/fi";
import { useGetEventBySlugQuery } from "@/redux/api/apiSlice";
import BannerBg from "@/assets/banner.png";

// Date Formatter
const formatEventDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeek = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    return `${dayOfWeek}, ${month} ${day}`;
  } catch (e) {
    return dateStr;
  }
};

// Time Formatter
const formatTime = (timeStr) => {
  if (!timeStr) return "";
  try {
    const parts = timeStr.split(":");
    const h = parseInt(parts[0], 10);
    const m = parts[1];
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${m} ${ampm}`;
  } catch (e) {
    return timeStr;
  }
};

const EventDetailPage = ({ params }) => {
  const router = useRouter();
  const { id: slug } = use(params);

  // Fetch event details dynamically from API
  const { data: response, isLoading, isError } = useGetEventBySlugQuery(slug);
  const event = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">
        <p className="text-white/60 font-outfit text-lg">Loading event details...</p>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white gap-4">
        <p className="text-red-500/80 font-outfit text-lg">Event not found or failed to load.</p>
        <Link href="/events" className="text-primary hover:underline font-outfit font-semibold">
          Back to Events
        </Link>
      </div>
    );
  }

  const handleBookNow = () => {
    router.push(`/events/${event.slug}/book`);
  };

  return (
    <div className="min-h-screen text-white relative pb-20 section-padding-x">
      
      {/* Ambient Hero Background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[70vh] overflow-hidden -z-20">
        <Image
          src={event.banner_image || BannerBg}
          alt="Ambient Background"
          fill
          className="object-cover object-center "
          priority
        />
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0D0D0D]/10 via-[#0D0D0D]/60 to-[#0D0D0D]" />
      </div>

      {/* Hero Content Section */}
      <div className=" pt-24 pb-8 flex flex-col justify-end min-h-[35vh] md:min-h-[45vh]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-white/50 font-outfit text-[14px] select-none">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <FiChevronRight className="w-3.5 h-3.5" />
          <Link href="/#events" className="hover:text-white transition-colors">Events</Link>
          <FiChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{event.title}</span>
        </div>
        
        {/* Event Title */}
        <h1 className="text-white text-[36px] sm:text-[48px] md:text-[60px] font-playfair font-normal leading-tight mt-4 select-none">
          {event.title}
        </h1>
      </div>

      {/* Main Grid Layout */}
      <div className=" py-8 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
        
        {/* Left Column (Content Details) */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Metadata Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Date Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-[12px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiCalendar className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-outfit font-semibold text-[15px] truncate">
                  {formatEventDate(event.event_date)}
                </span>
                <span className="text-white/40 font-outfit text-[13px] mt-0.5">
                  {formatTime(event.start_time)}
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-[12px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-outfit font-semibold text-[15px] truncate">
                  {event.city || "Dhaka"}
                </span>
                <span className="text-white/40 font-outfit text-[13px] mt-0.5 truncate">
                  {event.address || "Venue Location"}
                </span>
              </div>
            </div>

            {/* Doors Open Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-[12px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiClock className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-outfit font-semibold text-[15px]">Doors Open</span>
                <span className="text-white/40 font-outfit text-[13px] mt-0.5">
                  {formatTime(event.door_open_time)}
                </span>
              </div>
            </div>

          </div>

          {/* About Section */}
          <div className="mt-12">
            <h2 className="text-white text-[20px] sm:text-[22px] font-outfit font-semibold tracking-wide">About This Event</h2>
            <p className="text-secondary-gray text-[15px] sm:text-[16px] leading-relaxed font-outfit mt-4">
              {event.description || "No description provided."}
            </p>
          </div>

          {/* Main Visual Image Card with Badge Overlay */}
          <div className="relative w-full aspect-video rounded-[24px] overflow-hidden mt-12 border border-white/5 shadow-2xl group bg-[#111]">
            {event.banner_image && (
              <Image
                src={event.banner_image}
                alt={event.title}
                fill
                priority
                sizes="(max-w-1024px) 100vw, 800px"
                className="object-cover"
              />
            )}
            {/* Map pin badge overlay */}
            <div className="absolute bottom-6 left-6 bg-black/75 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2 select-none shadow-md">
              <FiMapPin className="text-primary w-4.5 h-4.5" />
              <span className="text-white text-[13px] sm:text-[14px] font-outfit font-medium">
                {event.city || "Dhaka"}
              </span>
            </div>
          </div>

          {/* Location Area Text */}
          <div className="mt-6">
            <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">{event.city || "Dhaka"}</h3>
            <p className="text-secondary-gray text-[14px] font-outfit mt-1">{event.address || "Venue Address"}</p>
          </div>

          {/* Venues Picture Section */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-14">
              <h2 className="text-white text-[20px] sm:text-[22px] font-outfit font-semibold tracking-wide mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {event.gallery.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative aspect-4/3 rounded-[16px] overflow-hidden border border-white/5 group shadow-md bg-[#111]"
                  >
                    <Image
                      src={item.image_url}
                      alt={`Gallery image ${item.id}`}
                      fill
                      sizes="(max-w-768px) 100vw, 300px"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Interactive Ticket Box Sidebar) */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111]/70 backdrop-blur-md border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 lg:sticky lg:top-28 shadow-xl">
            <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">Ticket Pricing</h3>

            {/* Seat Categories */}
            {event.seat_categories && event.seat_categories.length > 0 ? (
              <div className="flex flex-col gap-3">
                {event.seat_categories.map((cat, idx) => {
                  const catPrice = parseFloat(cat.price) || 0;
                  const serviceCharge = (catPrice * cat.service_charge_pct) / 100;
                  const totalPerSeat = catPrice + serviceCharge;
                  return (
                    <div key={cat.id} className="border border-primary/20 bg-primary/5 rounded-[14px] p-4 flex flex-col gap-2 select-none">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FiTag className="w-3.5 h-3.5 text-primary" />
                          <span className="text-white/70 font-outfit text-[13px] font-medium uppercase tracking-wider">
                            {event.seat_categories.length > 1 ? `Category ${idx + 1}` : "General Admission"}
                          </span>
                        </div>
                        <span className="text-primary font-outfit font-bold text-[19px]">£{catPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/40 font-outfit text-[12px]">Service charge ({cat.service_charge_pct}%)</span>
                        <span className="text-white/50 font-outfit text-[13px]">£{serviceCharge.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-white/5 my-0.5" />
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 font-outfit text-[13px]">Total per seat</span>
                        <span className="text-white font-outfit font-semibold text-[15px]">£{totalPerSeat.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-white/10 rounded-[12px] p-4 text-white/40 font-outfit text-[14px] text-center">
                Pricing not available
              </div>
            )}

            {/* Seat Availability Summary */}
            {event.seat_summary && (
              <div className="flex items-center justify-between bg-white/3 border border-white/5 rounded-[12px] px-4 py-3 select-none">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4 text-white/40" />
                  <span className="text-white/50 font-outfit text-[13px]">Seats Available</span>
                </div>
                <span className={`font-outfit font-bold text-[15px] ${
                  event.seat_summary.available > 10 ? 'text-[#00DF89]' :
                  event.seat_summary.available > 0 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {event.seat_summary.available > 0 ? `${event.seat_summary.available} left` : 'Sold Out'}
                </span>
              </div>
            )}

            {/* Seat Booking Button */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleBookNow}
                disabled={event.seat_summary?.available === 0}
                className="w-full py-4 bg-primary hover:bg-primary/95 text-black font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg border-none disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed disabled:scale-100"
              >
                {event.seat_summary?.available === 0 ? 'Sold Out' : 'Seat Booking'}
              </button>
              <span className="text-white/40 font-outfit text-[12px] text-center select-none">
                No booking fees on selected tickets
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailPage;
