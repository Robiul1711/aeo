"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX, FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import {
  useGetEventBySlugQuery,
  useGetSeatsByEventIdQuery,
  useSetupBookingMutation,
} from "@/redux/api/apiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// Date Formatter
const formatEventDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

const SeatBookingPage = ({ params }) => {
  const router = useRouter();
  const { id: slug } = use(params);
  const token = useSelector((state) => state.auth.token);

  // Guests can view the seat map page directly. Redirect will only happen on Booking Setup.

  // Fetch Event details to get the numeric Event ID
  const {
    data: eventResponse,
    isLoading: eventLoading,
    isError: eventError,
  } = useGetEventBySlugQuery(slug);
  const event = eventResponse?.data;

  // Fetch Seat Map using the numeric Event ID (allow guests to view the seat map as well)
  const {
    data: seatsResponse,
    isLoading: seatsLoading,
    isFetching: seatsFetching,
    isError: seatsError,
    error: seatsApiError,
  } = useGetSeatsByEventIdQuery(event?.id, {
    skip: !event?.id,
    refetchOnMountOrArgChange: true,
  });
  const seatMap = seatsResponse?.data;

  // Setup Booking Mutation
  const [setupBooking, { isLoading: isBookingSetupLoading }] =
    useSetupBookingMutation();

  // Handle API authorization errors (401 status) - silent redirect
  useEffect(() => {
    if (seatsApiError?.status === 401) {
      router.push(`/auth/login?redirect=/events/${slug}/book`);
    }
  }, [seatsApiError, router, slug]);

  // Selected Seats State
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Pre-populate selected seats from API when FRESH data arrives (not stale cache)
  // Backend returns status: "selected" for seats the current logged-in user has already selected
  // We wait for seatsFetching=false so we always use fresh server data, not cached data
  // We also load and merge any pending guest selections saved in sessionStorage before login redirect
  useEffect(() => {
    if (seatMap?.seats && !seatsFetching) {
      const alreadySelected = seatMap.seats.filter(
        (s) => s.status === "selected",
      );

      // Load pending guest selections (if any)
      const pendingStr = sessionStorage.getItem("pending_selected_seats");
      let pendingSeats = [];
      if (pendingStr) {
        try {
          pendingSeats = JSON.parse(pendingStr);
          sessionStorage.removeItem("pending_selected_seats");
        } catch (e) {
          console.error("Failed to parse pending seats:", e);
        }
      }

      // Merge backend selections and guest session selections
      const merged = [...alreadySelected];
      pendingSeats.forEach((ps) => {
        if (!merged.some((m) => m.id === ps.id)) {
          // Verify that the seat is still available in the map
          const freshSeat = seatMap.seats.find((s) => s.id === ps.id);
          if (freshSeat && freshSeat.status === "available") {
            merged.push(freshSeat);
          }
        }
      });

      setSelectedSeats(merged);
    }
  }, [seatMap?.seats, seatsFetching]);

  const isSelected = (seatId) => {
    return selectedSeats.some((s) => s.id === seatId);
  };

  // A seat is "disabled" only if it is booked/sold/pre_sold/blocked by someone else
  // "selected" status means the CURRENT user already selected it → it should be toggleable
  const isDisabled = (seat) => {
    return ["booked", "pre_sold", "blocked"].includes(seat.status);
  };

  const handleSeatClick = (seat) => {
    if (isDisabled(seat)) return;

    if (isSelected(seat.id)) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const handleRemoveSeat = (seatId) => {
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
  };

  // Helper to extract seat price and service charge details
  const getSeatPriceDetails = (categoryId) => {
    const category = seatMap?.categories?.find((cat) => cat.id === categoryId);
    const price = category ? category.price : 45; // Default fallback to 45
    const servicePct = category ? category.service_charge_pct : 12; // Default fallback to 12%
    const serviceFee = (price * servicePct) / 100;
    return { price, serviceFee };
  };

  // Math calculations
  let subtotal = 0;
  let serviceFee = 0;
  selectedSeats.forEach((seat) => {
    const details = getSeatPriceDetails(seat.category_id);
    subtotal += details.price;
    serviceFee += details.serviceFee;
  });
  const total = subtotal + serviceFee;

  const handleBookNow = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat.");
      return;
    }

    // If not authenticated, save selection to sessionStorage and redirect to login
    if (!token) {
      toast.error("Please log in to book your seats.");
      sessionStorage.setItem(
        "pending_selected_seats",
        JSON.stringify(selectedSeats),
      );
      router.push(`/auth/login?redirect=/events/${slug}/book`);
      return;
    }

    try {
      // Generate a unique session_id or read from sessionStorage/localStorage
      let sessionId = sessionStorage.getItem("booking_session_id");
      if (!sessionId) {
        sessionId = `sess_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
        sessionStorage.setItem("booking_session_id", sessionId);
      }

      const seatIds = selectedSeats.map((s) => s.id);

      const payload = {
        seat_ids: seatIds,
        session_id: sessionId,
        event_id: event.id,
      };

      const result = await setupBooking(payload).unwrap();

      if (result.status) {
        toast.success(result.message || "Seats reserved successfully!");
        // Navigate to checkout with seats count, booking ID, booking reference, and pricing
        router.push(
          `/events/${slug}/checkout?seats=${selectedSeats.length}&booking_id=${result.data?.booking?.id}&reference=${result.data?.booking?.booking_reference}&subtotal=${subtotal}&serviceFee=${serviceFee}&total=${total}`,
        );
      } else {
        toast.error(result.message || "Failed to reserve seats.");
      }
    } catch (err) {
      console.error("Booking setup error:", err);
      toast.error(
        err?.data?.message ||
          "An error occurred while reserving seats. Please try again.",
      );
    }
  };

  // Loading States
  if (eventLoading || (event?.id && seatsLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">
        <p className="text-white/60 font-outfit text-lg">Loading seat map...</p>
      </div>
    );
  }

  // Error States (only show if not redirecting due to auth errors)
  if ((eventError || seatsError || !event) && seatsApiError?.status !== 401) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white gap-4">
        <p className="text-red-500/80 font-outfit text-lg">
          Failed to load event or seat map.
        </p>
        <Link
          href="/events"
          className="text-primary hover:underline font-outfit font-semibold"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  // Group seats by row
  const seatsByRow = {};
  seatMap?.seats?.forEach((seat) => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
  });

  // Sort seats in each row by column number
  Object.keys(seatsByRow).forEach((row) => {
    seatsByRow[row].sort((a, b) => a.column - b.column);
  });

  // Sort rows alphabetically (A, B, C, D...)
  const rows = Object.keys(seatsByRow).sort();

  return (
    <>
      <title>
        {event?.title
          ? `Book Seats - ${event.title} | Pariah Design House`
          : "Book Seats | Pariah Design House"}
      </title>
      <meta
        name="description"
        content="Select and book your seats for Pariah Design House pop-up art bar events."
      />
      <div className="pt-10 pb-24 section-padding-x">
        <div className=" flex flex-col gap-8">
          {/* Header Title for SEO / Screen Identifiers */}
          <div className="sr-only">
            <h2>Seat Booking Page Design</h2>
          </div>

          {/* Event & Date Header Block */}
          <div className="bg-[#111111]/60 border border-white/5 rounded-[16px] p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 shadow-md select-none">
            <div className="flex flex-col min-w-0">
              <span className="text-white/40 font-outfit text-[12px] uppercase tracking-wider font-semibold">
                Event
              </span>
              <span className="text-white font-outfit font-semibold text-[17px] sm:text-[19px] mt-1.5 truncate">
                {event?.title}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white/40 font-outfit text-[12px] uppercase tracking-wider font-semibold">
                Date
              </span>
              <span className="text-white font-outfit font-semibold text-[17px] sm:text-[19px] mt-1.5 truncate">
                {formatEventDate(event?.event_date)} ·{" "}
                {formatTime(event?.start_time)}
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
                  Section Your Seat
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
                  {rows.map((rowLabel) => (
                    <div
                      key={rowLabel}
                      className="flex items-center justify-center gap-2 sm:gap-3"
                    >
                      {/* Row Label */}
                      <span className="text-white/40 font-outfit text-[14px] sm:text-[16px] font-semibold w-6 text-center select-none mr-2 sm:mr-3">
                        {rowLabel}
                      </span>

                      {/* Row Seats */}
                      {seatsByRow[rowLabel].map((seat) => {
                        const disabled = isDisabled(seat);
                        const selected = isSelected(seat.id);

                        let buttonStyles =
                          "w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] rounded-[6px] font-outfit font-semibold text-[13px] sm:text-[14px] flex items-center justify-center transition-all select-none ";

                        if (disabled) {
                          buttonStyles +=
                            "bg-white/10 text-white/30 cursor-not-allowed";
                        } else if (selected) {
                          buttonStyles +=
                            "bg-primary text-black cursor-pointer shadow-md";
                        } else {
                          buttonStyles +=
                            "border border-primary text-white hover:bg-primary/10 cursor-pointer";
                        }

                        return (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            disabled={disabled}
                            className={buttonStyles}
                            title={`${seat.seat_number} - $${getSeatPriceDetails(seat.category_id).price}${disabled ? ` (${seat.status})` : ""}`}
                          >
                            {seat.column}
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
                    <div className="text-white/40 font-outfit text-center py-6 border border-dashed border-white/5 rounded-[12px] text-[14px] select-none">
                      No seats selected.
                    </div>
                  ) : (
                    selectedSeats.map((seat) => {
                      const { price: seatPrice } = getSeatPriceDetails(
                        seat.category_id,
                      );
                      return (
                        <div
                          key={seat.id}
                          className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-[12px] p-4 select-none transition-all"
                        >
                          <span className="text-primary font-outfit font-medium text-[14px]">
                            Seat {seat.seat_number}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-primary font-outfit font-semibold text-[16px]">
                              ${seatPrice}
                            </span>
                            <button
                              onClick={() => handleRemoveSeat(seat.id)}
                              className="text-primary/70 hover:text-primary transition-colors cursor-pointer bg-transparent border-none outline-none"
                              aria-label={`Deselect Seat ${seat.seat_number}`}
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3.5 mt-2 text-font-outfit">
                  <div className="flex justify-between items-center select-none">
                    <span className="text-white/60 text-[14px]">
                      Subtotal ({selectedSeats.length}{" "}
                      {selectedSeats.length === 1 ? "seat" : "seats"})
                    </span>
                    <span className="text-white/80 text-[16px] font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center select-none">
                    <span className="text-white/60 text-[14px]">
                      Service fee
                    </span>
                    <span className="text-white/80 text-[16px] font-medium">
                      ${serviceFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-white/5 my-1" />
                  <div className="flex justify-between items-center select-none">
                    <span className="text-white text-[18px] font-semibold">
                      Total
                    </span>
                    <span className="text-white text-[20px] font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Book Now Action */}
                <div className="mt-2 flex flex-col gap-3">
                  <button
                    onClick={handleBookNow}
                    disabled={
                      selectedSeats.length === 0 || isBookingSetupLoading
                    }
                    className="w-full py-4 bg-primary hover:bg-primary/95 text-black font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg border-none disabled:bg-[#856A15]/40 disabled:text-white/40 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isBookingSetupLoading ? "Reserving..." : "Book Now"}
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
    </>
  );
};

export default SeatBookingPage;
