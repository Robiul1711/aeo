"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

// Mock Event Details Data
const eventDetailsData = {
  "1": {
    title: "Blue Hour - The Midnight",
    date: "Sat, Nov 8",
    time: "8:00 PM",
    price: 45,
  },
  "2": {
    title: "Amber & Ash - The Midnight",
    date: "Mon, Nov 10",
    time: "8:00 PM",
    price: 45,
  },
  "3": {
    title: "Bite Society - The Midnight",
    date: "Tue, Nov 11",
    time: "8:00 PM",
    price: 45,
  },
  "4": {
    title: "Noir Kitchen - The Midnight",
    date: "Sat, Nov 18",
    time: "8:00 PM",
    price: 45,
  }
};

const defaultEvent = {
  title: "Neon Nights Tour · The Midnight",
  date: "Sat, Jul 12",
  time: "8:00 PM",
  price: 45,
};

// Mock Predefined Sold Seats
const soldSeats = [
  { row: 1, seat: 3 }, { row: 1, seat: 9 },
  { row: 2, seat: 2 }, { row: 2, seat: 8 },
  { row: 3, seat: 3 }, { row: 3, seat: 4 }, { row: 3, seat: 8 },
  { row: 4, seat: 2 }, { row: 4, seat: 7 },
  { row: 5, seat: 8 }, { row: 5, seat: 9 }
];

const isSold = (row, seat) => {
  return soldSeats.some((s) => s.row === row && s.seat === seat);
};

const SeatBookingPage = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const event = eventDetailsData[id] || defaultEvent;

  // Selected Seats State (initially pre-selected Row 3 - Seat 5 to match screenshot)
  const [selectedSeats, setSelectedSeats] = useState([{ row: 3, seat: 5 }]);

  const isSelected = (row, seat) => {
    return selectedSeats.some((s) => s.row === row && s.seat === seat);
  };

  const handleSeatClick = (row, seat) => {
    if (isSold(row, seat)) return;
    
    if (isSelected(row, seat)) {
      setSelectedSeats((prev) => prev.filter((s) => !(s.row === row && s.seat === seat)));
    } else {
      setSelectedSeats((prev) => [...prev, { row, seat }]);
    }
  };

  const handleRemoveSeat = (row, seat) => {
    setSelectedSeats((prev) => prev.filter((s) => !(s.row === row && s.seat === seat)));
  };

  // Math calculations
  const subtotal = selectedSeats.length * event.price;
  const serviceFee = selectedSeats.length * 5.40; // £5.40 service fee per seat
  const total = subtotal + serviceFee;

  const handleBookNow = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }
    router.push(`/events/${id}/checkout?seats=${selectedSeats.length}`);
  };

  const rows = [1, 2, 3, 4, 5];
  const seatsInRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="pt-10 pb-24 section-padding-x">
      <div className=" flex flex-col gap-8">
        
        {/* Header Title for SEO / Screen Identifiers */}
        <div className="sr-only">
          <h2>Sit Booking Page Design</h2>
        </div>

        {/* Event & Date Header Block */}
        <div className="bg-[#111111]/60 border border-white/5 rounded-[16px] p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 shadow-md">
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[12px] uppercase tracking-wider font-semibold">Event</span>
            <span className="text-white font-outfit font-semibold text-[17px] sm:text-[19px] mt-1.5 truncate">
              {event.title}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white/40 font-outfit text-[12px] uppercase tracking-wider font-semibold">Date</span>
            <span className="text-white font-outfit font-semibold text-[17px] sm:text-[19px] mt-1.5 truncate">
              {event.date} · {event.time}
            </span>
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Seat Selector Map */}
          <div className="lg:col-span-2 bg-[#111111]/40 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-8 shadow-lg">
            
            {/* Seat Map Header with Legend */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-white/5 pb-5">
              <h3 className="text-white text-[19px] sm:text-[21px] font-outfit font-semibold tracking-wide">
                Section Your Sit
              </h3>
              
              {/* Legend List */}
              <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-[13px] font-outfit text-white/70 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-[4px] border border-primary shrink-0" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-[4px] bg-primary shrink-0" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-[4px] bg-white/10 shrink-0" />
                  <span>Sold</span>
                </div>
              </div>
            </div>

            {/* Responsive Scrollable Seat Grid */}
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[480px] flex flex-col gap-4 sm:gap-5 justify-center py-2">
                {rows.map((rowNum) => (
                  <div key={rowNum} className="flex items-center justify-center gap-2 sm:gap-3">
                    {/* Row Label */}
                    <span className="text-white/40 font-outfit text-[14px] sm:text-[16px] font-semibold w-6 text-center select-none mr-2 sm:mr-3">
                      {rowNum}
                    </span>
                    
                    {/* Row Seats */}
                    {seatsInRow.map((seatNum) => {
                      const sold = isSold(rowNum, seatNum);
                      const selected = isSelected(rowNum, seatNum);

                      let buttonStyles = "w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-[6px] font-outfit font-semibold text-[13px] sm:text-[14px] flex items-center justify-center transition-all select-none ";
                      
                      if (sold) {
                        buttonStyles += "bg-white/10 text-white/30 cursor-not-allowed";
                      } else if (selected) {
                        buttonStyles += "bg-primary text-black cursor-pointer shadow-md";
                      } else {
                        buttonStyles += "border border-primary text-white hover:bg-primary/10 cursor-pointer";
                      }

                      return (
                        <button
                          key={seatNum}
                          onClick={() => handleSeatClick(rowNum, seatNum)}
                          disabled={sold}
                          className={buttonStyles}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#111111]/70 backdrop-blur-md border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-xl lg:sticky lg:top-28">
              <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">
                Your Selection
              </h3>

              {/* Selected Seats List */}
              <div className="flex flex-col gap-3.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {selectedSeats.length === 0 ? (
                  <div className="text-white/40 font-outfit text-center py-6 border border-dashed border-white/5 rounded-[12px] text-[14px]">
                    No seats selected.
                  </div>
                ) : (
                  selectedSeats.map(({ row, seat }, idx) => (
                    <div 
                      key={`${row}-${seat}`}
                      className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-[12px] p-4 select-none transition-all"
                    >
                      <span className="text-primary font-outfit font-medium text-[14px]">
                        Row {row} - Seat {seat}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-outfit font-semibold text-[16px]">
                          £{event.price}
                        </span>
                        <button 
                          onClick={() => handleRemoveSeat(row, seat)}
                          className="text-primary/70 hover:text-primary transition-colors cursor-pointer"
                          aria-label={`Deselect Row ${row} Seat ${seat}`}
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-3.5 mt-2 text-font-outfit">
                <div className="flex justify-between items-center select-none">
                  <span className="text-white/60 text-[14px]">
                    Subtotal ({selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"})
                  </span>
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

              {/* Book Now Action */}
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
    </div>
  );
};

export default SeatBookingPage;
