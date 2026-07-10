'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetEventsQuery } from '@/redux/api/apiSlice';
import bg from '@/assets/ebg.png';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
  } catch (e) {
    return dateStr;
  }
};

const EventsList = () => {
  const { data: response, isLoading, isError } = useGetEventsQuery();
  const events = response?.data || [];

  // Display only the first 4 events on the homepage grid
  const displayedEvents = events.slice(0, 4);

  return (
    <section id="events" className="w-full bg-[#050505] py-20 section-padding-x border-t border-white/5" style={{backgroundImage: `url(${bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-white text-5xl md:text-6xl font-playfair tracking-wide font-normal">
            Events List
          </h2>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <p className="text-white/60 font-outfit text-lg">Loading events...</p>
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center py-12">
            <p className="text-red-500/80 font-outfit text-lg">Failed to load events. Please try again later.</p>
          </div>
        )}

        {!isLoading && !isError && displayedEvents.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <p className="text-white/40 font-outfit text-lg">No upcoming events found.</p>
          </div>
        )}

        {/* Grid List */}
        {!isLoading && !isError && displayedEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`} className="flex flex-col group cursor-pointer">
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
                    {event.city || 'Dhaka'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom Upcoming Link */}
        <div className="flex justify-end mt-4">
          <Link 
            href="/events" 
            className="text-[#E5A93B] hover:text-[#f3b705] font-outfit text-[16px] font-semibold tracking-wider transition-colors duration-200 cursor-pointer"
          >
            Upcoming...
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsList;
