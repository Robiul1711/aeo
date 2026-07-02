import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import E1 from '@/assets/e1.png';
import E2 from '@/assets/e2.png';
import E3 from '@/assets/e3.png';
import E4 from '@/assets/e4.png';
import bg from '@/assets/ebg.png';

const EventsList = () => {
  const events = [
    {
      id: 1,
      image: E1,
      title: 'Blue Hour',
      location: 'Hackney Wick, London',
      date: '8 Nov',
    },
    {
      id: 2,
      image: E2,
      title: 'Amber & Ash',
      location: 'Old Town District',
      date: '10 Nov',
    },
    {
      id: 3,
      image: E3,
      title: 'Bite Society',
      location: 'North Garden Street',
      date: '11 Nov',
    },
    {
      id: 4,
      image: E4,
      title: 'Noir Kitchen',
      location: 'Lakeside Quarter',
      date: '18 Nov',
    },
  ];

  return (
    <section className="w-full bg-[#050505] py-20 section-padding-x border-t border-white/5" style={{backgroundImage: `url(${bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-white text-5xl md:text-6xl font-playfair tracking-wide font-normal">
            Events List
          </h2>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col group cursor-pointer">
              {/* Image Container Card */}
              <div className="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg border border-white/5">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 280px"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                
                {/* Date Tag */}
                <div className="absolute top-4 right-4 bg-white text-black font-outfit text-[14px] font-semibold px-4 py-2 rounded-[8px] shadow-sm select-none">
                  {event.date}
                </div>
              </div>

              {/* Text Info below card */}
              <div className="mt-4 flex flex-col gap-1">
                <h3 className="text-white font-outfit text-[19px] font-semibold tracking-wide transition-colors duration-200 group-hover:text-[#E5A93B]">
                  {event.title}
                </h3>
                <p className="text-secondary-gray font-outfit text-[14px] tracking-wide">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

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
