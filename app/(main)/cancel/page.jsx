'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiXCircle, FiArrowLeft } from 'react-icons/fi';
import bg from '@/assets/ebg.png';

const CancelContent = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto text-center">

      {/* Cancel Icon & Title */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
          <FiXCircle className="w-10 h-10 text-red-500/80" />
        </div>
        <h1 className="text-white font-playfair text-4xl sm:text-5xl font-normal tracking-wide">
          Payment Cancelled
        </h1>
        <p className="text-white/50 font-outfit text-[15px] leading-relaxed max-w-md">
          Your payment was cancelled and your seats have been released. No charge was made.
        </p>
      </div>

      {/* Reference Info */}
      {reference && (
        <div className="bg-white/5 border border-white/10 rounded-[16px] px-6 py-4 w-full select-none">
          <span className="text-white/40 font-outfit text-[12px] uppercase tracking-widest block mb-1">Booking Reference</span>
          <span className="text-white/70 font-outfit font-semibold text-[17px] tracking-wide">{reference}</span>
        </div>
      )}

      {/* Info Notice */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-[16px] px-6 py-4 w-full text-left">
        <p className="text-yellow-500/80 font-outfit text-[13px] sm:text-[14px] leading-relaxed">
          <span className="font-semibold">What happened?</span> You cancelled before completing the payment. 
          Your seat reservation may have expired. If you&apos;d like to try again, please go back to the event and reselect your seats.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Link
          href="/"
          className="flex-1 py-4 bg-[#111111] border border-white/10 hover:border-white/25 text-white font-outfit text-[15px] font-semibold rounded-[12px] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        {/* <Link
          href="/events"
          className="flex-1 py-4 bg-primary hover:bg-primary/90 text-black font-outfit text-[15px] font-semibold rounded-[12px] transition-all duration-200 text-center"
        >
          Try Again
        </Link> */}
      </div>

    </div>
  );
};

const CancelPage = () => {
  return (
    <section
      className="w-full min-h-screen bg-[#050505] py-20 md:py-28 section-padding-x flex items-center"
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      }>
        <CancelContent />
      </Suspense>
    </section>
  );
};

export default CancelPage;
