'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiCheckCircle, FiCalendar, FiMapPin, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useGetBookingByReferenceQuery } from '@/redux/api/apiSlice';
import bg from '@/assets/ebg.png';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const { data: response, isLoading, isError } = useGetBookingByReferenceQuery(reference, {
    skip: !reference,
  });
  const booking = response?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6" />
        <p className="text-white/60 font-outfit text-lg">Confirming your booking...</p>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <FiCheckCircle className="w-16 h-16 text-[#00DF89]" />
        <h1 className="text-white font-playfair text-3xl font-normal">Payment Successful!</h1>
        <p className="text-white/50 font-outfit text-[15px]">Reference: <span className="text-primary font-semibold">{reference}</span></p>
        <Link href="/events" className="mt-4 text-primary hover:underline font-outfit font-semibold">
          Browse More Events
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">

      {/* Success Icon & Title */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#00DF89]/10 border-2 border-[#00DF89]/30 flex items-center justify-center">
          <FiCheckCircle className="w-10 h-10 text-[#00DF89]" />
        </div>
        <h1 className="text-white font-playfair text-4xl sm:text-5xl font-normal tracking-wide">
          Booking Confirmed!
        </h1>
        <p className="text-white/50 font-outfit text-[15px] max-w-md leading-relaxed">
          Your tickets have been booked and payment was successful. A confirmation has been sent to your email.
        </p>
      </div>

      {/* Booking Reference Badge */}
      <div className="bg-primary/5 border border-primary/25 rounded-[16px] px-6 py-4 flex flex-col sm:flex-row items-center gap-3 w-full select-none">
        <div className="flex flex-col">
          <span className="text-white/40 font-outfit text-[12px] uppercase tracking-widest">Booking Reference</span>
          <span className="text-primary font-outfit font-bold text-[20px] sm:text-[22px] tracking-wide mt-1">
            {booking.booking_reference}
          </span>
        </div>
        <div className="sm:ml-auto flex flex-col items-start sm:items-end">
          <span className="text-white/40 font-outfit text-[12px] uppercase tracking-widest">Payment Status</span>
          <span className={`font-outfit font-semibold text-[15px] mt-1 capitalize ${
            booking.payment_status === 'paid' ? 'text-[#00DF89]' : 'text-primary'
          }`}>
            {booking.payment_status}
          </span>
        </div>
      </div>

      {/* Event & Customer Details Card */}
      <div className="w-full bg-[#111111]/60 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-lg">
        
        {/* Event Info */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
          <h2 className="text-white font-outfit font-semibold text-[18px]">Event Details</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <FiCalendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-outfit font-semibold text-[15px]">{booking.event_title}</p>
                <p className="text-white/50 font-outfit text-[13px] mt-0.5">{formatDate(booking.event_date)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
          <h2 className="text-white font-outfit font-semibold text-[18px]">Customer Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3">
              <FiUser className="w-4 h-4 text-primary shrink-0" />
              <span className="text-white/70 font-outfit text-[14px]">{booking.customer_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="w-4 h-4 text-primary shrink-0" />
              <span className="text-white/70 font-outfit text-[14px]">{booking.customer_email}</span>
            </div>
            {booking.customer_phone && (
              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-white/70 font-outfit text-[14px]">{booking.customer_phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Seats */}
        {booking.seats && booking.seats.length > 0 && (
          <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
            <h2 className="text-white font-outfit font-semibold text-[18px]">
              Seats ({booking.seats.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {booking.seats.map((seat) => (
                <span
                  key={seat.seat_id}
                  className="bg-primary/10 border border-primary/25 text-primary font-outfit font-semibold text-[13px] px-3.5 py-1.5 rounded-[8px] select-none"
                >
                  {seat.seat_number}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-outfit font-semibold text-[18px]">Price Summary</h2>
          <div className="flex justify-between items-center">
            <span className="text-white/50 font-outfit text-[14px]">Subtotal</span>
            <span className="text-white/80 font-outfit text-[15px] font-medium">£{booking.total_amount?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/50 font-outfit text-[14px]">Service charge</span>
            <span className="text-white/80 font-outfit text-[15px] font-medium">£{booking.service_charge_total?.toFixed(2)}</span>
          </div>
          <div className="border-t border-white/5 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-white font-outfit font-semibold text-[17px]">Total Paid</span>
            <span className="text-primary font-outfit font-bold text-[20px]">
              £{((booking.total_amount || 0) + (booking.service_charge_total || 0)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link
          href="/"
          className="flex-1 py-4 bg-[#111111] border border-white/10 hover:border-white/25 text-white font-outfit text-[15px] font-semibold rounded-[12px] transition-all duration-200 text-center"
        >
          Back to Home
        </Link>
        {/* <Link
          href="/events"
          className="flex-1 py-4 bg-primary hover:bg-primary/90 text-black font-outfit text-[15px] font-semibold rounded-[12px] transition-all duration-200 text-center"
        >
          Browse More Events
        </Link> */}
      </div>

    </div>
  );
};

const SuccessPage = () => {
  return (
    <section
      className="w-full min-h-screen bg-[#050505] py-20 md:py-28 section-padding-x"
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </section>
  );
};

export default SuccessPage;
