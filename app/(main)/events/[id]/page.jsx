"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCalendar, FiMapPin, FiClock, FiMinus, FiPlus, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";

// Import local assets
import E1 from "@/assets/e1.png";
import E2 from "@/assets/e2.png";
import E3 from "@/assets/e3.png";
import E4 from "@/assets/e4.png";
import E5 from "@/assets/e5.png";
import V1 from "@/assets/v1.png";
import V2 from "@/assets/v2.png";
import V3 from "@/assets/v3.png";
import V4 from "@/assets/v4.png";
import BannerBg from "@/assets/banner.png";

// Mock Event Details Data
const eventDetailsData = {
  "1": {
    title: "Blue Hour",
    date: "Sat, Nov 8",
    time: "8:00 PM",
    location: "Hackney Wick, London",
    doorsOpen: "7:00 PM",
    price: 45,
    description: "Experience synth-wave legends The Midnight on their world-famous Neon Nights Tour — retro-futuristic soundscapes, pulsing drums, and two hours of pure euphoria.",
    mainImage: E5,
    venueName: "Hackney Wick Studio",
    venueArea: "East London Canal",
  },
  "2": {
    title: "Amber & Ash",
    date: "Mon, Nov 10",
    time: "8:00 PM",
    location: "Old Town District, London",
    doorsOpen: "7:30 PM",
    price: 45,
    description: "Amber & Ash blends live fire cooking, acoustic jazz, and warm lighting to create a cozy, intimate autumn gathering designed for the senses.",
    mainImage: E5,
    venueName: "The Hearth Room",
    venueArea: "Old Town District",
  },
  "3": {
    title: "Bite Society",
    date: "Tue, Nov 11",
    time: "8:00 PM",
    location: "North Garden Street, London",
    doorsOpen: "7:00 PM",
    price: 45,
    description: "A secret society event featuring underground culinary battles, neon pop art, and high-energy music in a repurposed industrial greenhouse.",
    mainImage: E5,
    venueName: "The Glass Greenhouse",
    venueArea: "North Garden",
  },
  "4": {
    title: "Noir Kitchen",
    date: "Sat, Nov 18",
    time: "8:00 PM",
    location: "Lakeside Quarter, London",
    doorsOpen: "6:30 PM",
    price: 45,
    description: "Noir Kitchen is a multi-sensory dark dining experience where blindfolded courses are paired with custom spatial audio and tactile sound design.",
    mainImage: E5,
    venueName: "Noir Black Box",
    venueArea: "Lakeside Quarter",
  }
};

const defaultEvent = {
  title: "Neon Nights Tour",
  date: "Sat, Jul 12",
  time: "8:00 PM",
  location: "Brixton Academy, London",
  doorsOpen: "7:00 PM",
  price: 45,
  description: "Experience synth-wave legends The Midnight on their world-famous Neon Nights Tour — retro-futuristic soundscapes, pulsing drums, and two hours of pure euphoria.",
  mainImage: E5,
  venueName: "Brixton Academy",
  venueArea: "Lakeside Quarter",
};

const EventDetailPage = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const event = eventDetailsData[id] || defaultEvent;

  // Interactive ticket counter state
  const [quantity, setQuantity] = useState(2);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const subtotal = quantity * event.price;
  const serviceFee = quantity * 5.40; // £5.40 fee per ticket (matches £10.80 for 2 tickets)
  const total = subtotal + serviceFee;

  const handleBookNow = () => {
    router.push(`/events/${id}/book`);
  };

  return (
    <div className="min-h-screen  text-white relative pb-20 section-padding-x">
      
      {/* Ambient Hero Background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[70vh] overflow-hidden -z-20">
        <Image
          src={BannerBg}
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
                <span className="text-white font-outfit font-semibold text-[15px] truncate">{event.date}</span>
                <span className="text-white/40 font-outfit text-[13px] mt-0.5">{event.time}</span>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-[12px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-outfit font-semibold text-[15px] truncate">{event.venueName}</span>
                <span className="text-white/40 font-outfit text-[13px] mt-0.5">{event.location.split(',')[1]?.trim() || "London"}</span>
              </div>
            </div>

            {/* Doors Open Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[16px] p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-[12px] bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiClock className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-outfit font-semibold text-[15px]">Doors Open</span>
                <span className="text-white/40 font-outfit text-[13px] mt-0.5">{event.doorsOpen}</span>
              </div>
            </div>

          </div>

          {/* About Section */}
          <div className="mt-12">
            <h2 className="text-white text-[20px] sm:text-[22px] font-outfit font-semibold tracking-wide">About This Event</h2>
            <p className="text-secondary-gray text-[15px] sm:text-[16px] leading-relaxed font-outfit mt-4">
              {event.description}
            </p>
          </div>

          {/* Main Visual Image Card with Badge Overlay */}
          <div className="relative w-full aspect-video rounded-[24px] overflow-hidden mt-12 border border-white/5 shadow-2xl group">
            <Image
              src={event.mainImage}
              alt={event.title}
              fill
              priority
              sizes="(max-w-1024px) 100vw, 800px"
              className="object-cover"
            />
            {/* Map pin badge overlay */}
            <div className="absolute bottom-6 left-6 bg-black/75 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2 select-none shadow-md">
              <FiMapPin className="text-primary w-4.5 h-4.5" />
              <span className="text-white text-[13px] sm:text-[14px] font-outfit font-medium">
                {event.venueName}, {event.location.split(',')[1]?.trim() || "London"}
              </span>
            </div>
          </div>

          {/* Location Area Text */}
          <div className="mt-6">
            <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">{event.venueName}</h3>
            <p className="text-secondary-gray text-[14px] font-outfit mt-1">{event.venueArea}</p>
          </div>

          {/* Venues Picture Section */}
          <div className="mt-14">
            <h2 className="text-white text-[20px] sm:text-[22px] font-outfit font-semibold tracking-wide mb-6">Venues Picture</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[V1, V2, V3, V4, V1, V2].map((vImg, idx) => (
                <div 
                  key={idx} 
                  className="relative aspect-4/3 rounded-[16px] overflow-hidden border border-white/5 group shadow-md"
                >
                  <Image
                    src={vImg}
                    alt={`Venue photo ${idx + 1}`}
                    fill
                    sizes="(max-w-768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Interactive Ticket Box Sidebar) */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111]/70 backdrop-blur-md border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 lg:sticky lg:top-28 shadow-xl">
            <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">Select Tickets</h3>
            
            {/* Price Rate Card */}
            <div className="border border-primary/20 bg-primary/5 rounded-[12px] p-4 flex justify-between items-center select-none">
              <span className="text-primary font-outfit text-[14px] font-medium">Per Ticket Amount</span>
              <span className="text-primary font-outfit font-semibold text-[18px]">£{event.price}</span>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col gap-3">
              <span className="text-white/60 font-outfit text-[14px] select-none">Quantity</span>
              <div className="flex items-center gap-6">
                {/* Decrement Button */}
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white/80 hover:text-white transition-all bg-transparent disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  disabled={quantity <= 1}
                  aria-label="Decrease ticket quantity"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                {/* Value */}
                <span className="text-white font-outfit font-bold text-[18px] select-none w-5 text-center">
                  {quantity}
                </span>
                {/* Increment Button */}
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white/80 hover:text-white transition-all bg-transparent cursor-pointer"
                  aria-label="Increase ticket quantity"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Math Breakdown */}
            <div className="flex flex-col gap-3.5 mt-2 text-font-outfit">
              <div className="flex justify-between items-center select-none">
                <span className="text-white/60 text-[14px]">Subtotal</span>
                <span className="text-white/80 text-[16px] font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center select-none">
                <span className="text-white/60 text-[14px]">Service fee</span>
                <span className="text-white/80 text-[16px] font-medium">£{serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/5 my-1" />
              <div className="flex justify-between items-center select-none">
                <span className="text-white text-[18px] font-semibold">Total</span>
                <span className="text-white text-[20px] font-bold">£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="mt-2 flex flex-col gap-3">
              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-primary hover:bg-primary/95 text-black font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg border-none"
              >
                Book Now
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
