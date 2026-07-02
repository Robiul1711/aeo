"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

// Import local assets
import E5 from "@/assets/e5.png";
import V1 from "@/assets/v1.png";

// Mock Event Details Data
const eventDetailsData = {
  "1": {
    title: "Blue Hour",
    artist: "The Midnight",
    date: "Sat, Nov 8, 2026",
    time: "8:00 PM · Doors 7:00",
    venueName: "Hackney Wick Studio",
    mainImage: E5,
  },
  "2": {
    title: "Amber & Ash",
    artist: "The Midnight",
    date: "Mon, Nov 10, 2026",
    time: "8:00 PM · Doors 7:30",
    venueName: "The Hearth Room",
    mainImage: E5,
  },
  "3": {
    title: "Bite Society",
    artist: "The Midnight",
    date: "Tue, Nov 11, 2026",
    time: "8:00 PM · Doors 7:00",
    venueName: "The Glass Greenhouse",
    mainImage: E5,
  },
  "4": {
    title: "Noir Kitchen",
    artist: "The Midnight",
    date: "Sat, Nov 18, 2026",
    time: "8:00 PM · Doors 6:30",
    venueName: "Noir Black Box",
    mainImage: E5,
  }
};

const defaultEvent = {
  title: "Neon Nights Tour",
  artist: "The Midnight",
  date: "Sat, Jul 12, 2025",
  time: "8:00 PM · Doors 7:00",
  venueName: "Brixton Academy",
  mainImage: E5,
};

const BookingConfirmedPage = ({ params, searchParams }) => {
  // Resolve Promise params for Next.js 16
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  
  const id = resolvedParams.id;
  const seatsCount = parseInt(resolvedSearchParams.seats) || 2;

  const event = eventDetailsData[id] || defaultEvent;

  // Generate dynamic seat number text based on count
  const getSeatsText = (count) => {
    if (count === 1) return "Row 3 · Seat 5";
    if (count === 2) return "Row 2 · Seats 3 & 4";
    // Generate sequential seats
    const seatNumbers = Array.from({ length: count }, (_, i) => i + 3);
    const lastSeat = seatNumbers.pop();
    return `Row 2 · Seats ${seatNumbers.join(", ")} & ${lastSeat}`;
  };

  // Generate a mock stable Booking ID
  const bookingId = `#SD-2026-${Math.floor(10000 + (id ? parseInt(id) * 3571 : 78421) % 90000)}`;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center pt-10 pb-24 px-6">
      
      {/* Top Glowing Checkmark Circle */}
      <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(243,183,5,0.25)] select-none">
        <FiCheck className="w-8 h-8 stroke-[3.5px]" />
      </div>

      {/* Confirmation Headers */}
      <h2 className="text-white text-[28px] sm:text-[34px] font-outfit font-bold mt-5 tracking-wide text-center">
        Booking Confirmed!
      </h2>
      <p className="text-white/50 font-outfit text-[14px] sm:text-[15px] mt-2.5 text-center max-w-sm leading-relaxed">
        Your tickets are on the way. Check your email for a confirmation.
      </p>

      {/* Detailed Receipt Ticket Card */}
      <div className="w-full max-w-[460px] bg-[#111111]/70 backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden shadow-2xl mt-8 flex flex-col">
        
        {/* Ticket Header Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden flex items-end p-6">
          <Image
            src={event.mainImage}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="(max-w-460px) 100vw, 460px"
          />
          {/* Green Confirmed Label */}
          <span className="absolute top-6 left-6 bg-[#10B981] text-white font-outfit font-bold text-[11px] sm:text-[12px] px-3.5 py-1.5 rounded-full select-none shadow-md uppercase tracking-wider">
            Confirmed
          </span>
          {/* Title & Subtitle overlay */}
          <div className="relative flex flex-col min-w-0 z-10 select-none">
            <span className="text-white font-outfit font-bold text-[22px] sm:text-[24px] tracking-wide leading-tight drop-shadow-md">
              {event.title}
            </span>
            <span className="text-primary font-outfit font-medium text-[14px] sm:text-[15px] mt-1 drop-shadow-md">
              {event.artist}
            </span>
          </div>
          {/* Black fade gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/10" />
        </div>

        {/* Ticket Info Details Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-2 gap-y-5 gap-x-6 border-t border-white/5">
          
          {/* Date */}
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Date
            </span>
            <span className="text-white font-outfit text-[14px] sm:text-[15px] font-medium mt-1 truncate">
              {event.date}
            </span>
          </div>

          {/* Time */}
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Time
            </span>
            <span className="text-white font-outfit text-[14px] sm:text-[15px] font-medium mt-1 truncate">
              {event.time}
            </span>
          </div>

          {/* Venue */}
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Venue
            </span>
            <span className="text-white font-outfit text-[14px] sm:text-[15px] font-medium mt-1 truncate font-semibold">
              {event.venueName}
            </span>
          </div>

          {/* Seats */}
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Seats
            </span>
            <span className="text-white font-outfit text-[14px] sm:text-[15px] font-medium mt-1 truncate">
              {getSeatsText(seatsCount)}
            </span>
          </div>

          {/* Ticket Type */}
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Ticket type
            </span>
            <span className="text-white/80 font-outfit text-[14px] sm:text-[15px] font-medium mt-1 truncate">
              General Admission
            </span>
          </div>

          {/* Booking ID */}
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider">
              Booking ID
            </span>
            <span className="text-white/80 font-outfit text-[14px] sm:text-[15px] font-medium mt-1 truncate">
              {bookingId}
            </span>
          </div>

        </div>

      </div>

      {/* Back to Homepage Button */}
      <Link
        href="/"
        className="mt-8 px-8 py-3 bg-[#111111] hover:bg-[#1A1A1A] text-white/80 hover:text-white font-outfit text-[15px] font-medium tracking-wide rounded-[12px] border border-white/10 hover:border-white/20 transition-all select-none cursor-pointer"
      >
        Back to Home
      </Link>

    </div>
  );
};

export default BookingConfirmedPage;
