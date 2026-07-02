"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCreditCard, 
  FiCalendar, 
  FiLock, 
  FiCheck, 
  FiChevronDown, 
  FiChevronUp,
  FiShield 
} from "react-icons/fi";
import toast from "react-hot-toast";

// Import local assets
import E5 from "@/assets/e5.png";
import BannerBg from "@/assets/banner.png";

// Mock Event Details Data
const eventDetailsData = {
  "1": {
    title: "Blue Hour",
    date: "Sat, Nov 8",
    time: "8:00 PM",
    venueName: "Hackney Wick Studio",
    price: 45,
  },
  "2": {
    title: "Amber & Ash",
    date: "Mon, Nov 10",
    time: "8:00 PM",
    venueName: "The Hearth Room",
    price: 45,
  },
  "3": {
    title: "Bite Society",
    date: "Tue, Nov 11",
    time: "8:00 PM",
    venueName: "The Glass Greenhouse",
    price: 45,
  },
  "4": {
    title: "Noir Kitchen",
    date: "Sat, Nov 18",
    time: "8:00 PM",
    venueName: "Noir Black Box",
    price: 45,
  }
};

const defaultEvent = {
  title: "Neon Nights Tour",
  date: "Sat, Jul 12",
  time: "8:00 PM",
  venueName: "Brixton Academy",
  price: 45,
};

const CheckoutPage = ({ params, searchParams }) => {
  const router = useRouter();
  
  // Resolve Promise params for Next.js 16
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  
  const id = resolvedParams.id;
  const seatsCount = parseInt(resolvedSearchParams.seats) || 2; // Defaults to 2 if not provided

  const event = eventDetailsData[id] || defaultEvent;

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [agree, setAgree] = useState(false);

  // Promo Code States
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "PARIAH10") {
      setPromoApplied(true);
      toast.success("Promo code Applied! 10% discount on subtotal.");
    } else {
      toast.error("Invalid promo code. Try 'PARIAH10'");
    }
  };

  // Math Calculations
  const subtotal = seatsCount * event.price;
  const serviceFee = seatsCount * 5.40; // £5.40 fee per ticket
  const discount = promoApplied ? subtotal * 0.10 : 0;
  const total = subtotal + serviceFee - discount;

  // Form Validation
  const isFormValid = name.trim() !== "" && 
                      email.trim() !== "" && 
                      phone.trim() !== "" && 
                      cardNumber.trim() !== "" && 
                      expiry.trim() !== "" && 
                      cvv.trim() !== "" && 
                      cardName.trim() !== "" && 
                      agree;

  const handlePay = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill in all details and agree to terms.");
      return;
    }
    toast.success("Payment successful! Tickets booked.");
    router.push(`/events/${id}/confirmed?seats=${seatsCount}`);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pt-6 pb-24 section-padding-x">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Progress Steps Header */}
        <div className="flex items-center justify-center gap-4 py-6 border-b border-white/5 select-none">
          {/* Step 1: Select Seats */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#10B981] flex items-center justify-center text-black">
              <FiCheck className="w-4 h-4 text-black stroke-[3px]" />
            </div>
            <span className="text-white/80 font-outfit text-[13px] sm:text-[14px] font-medium">Select seats</span>
          </div>
          
          {/* Connector Line */}
          <div className="w-10 sm:w-16 h-[1.5px] bg-[#10B981]" />

          {/* Step 2: Checkout */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#111111] border border-white/20 flex items-center justify-center text-white/80">
              <FiCheck className="w-4 h-4 stroke-[3px]" />
            </div>
            <span className="text-white font-outfit text-[13px] sm:text-[14px] font-medium">Checkout</span>
          </div>

          {/* Connector Line */}
          <div className="w-10 sm:w-16 h-[1.5px] bg-white/10" />

          {/* Step 3: Confirmation */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white/20">
              <FiCheck className="w-4 h-4 opacity-35" />
            </div>
            <span className="text-white/40 font-outfit text-[13px] sm:text-[14px] font-medium">Confirmation</span>
          </div>
        </div>

        {/* Form & Summary Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Attendee Details & Payment Forms */}
          <form onSubmit={handlePay} className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Attendee Details Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-md">
              <h3 className="text-white text-[19px] sm:text-[21px] font-outfit font-semibold tracking-wide border-b border-white/5 pb-4">
                Attendee Details
              </h3>
              
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">Name</label>
                <div className="relative w-full">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="enter you name"
                    className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">Email</label>
                <div className="relative w-full">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                  />
                </div>
              </div>

              {/* Number Field */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">Number</label>
                <div className="relative w-full">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7700 900000"
                    className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-[#111111]/40 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-md">
              <h3 className="text-white text-[19px] sm:text-[21px] font-outfit font-semibold tracking-wide border-b border-white/5 pb-4">
                Payment
              </h3>
              
              {/* Card Number Field */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">Card number</label>
                <div className="relative w-full">
                  <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                  />
                </div>
              </div>

              {/* Expiry Date and CVV Grid */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Expiry Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">Expiry date</label>
                  <div className="relative w-full">
                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                    />
                  </div>
                </div>

                {/* CVV */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">CVV</label>
                  <div className="relative w-full">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                    <input
                      type="password"
                      maxLength={3}
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* Cardholder Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">Cardholder name</label>
                <div className="relative w-full">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="as shown on card"
                    className="w-full pl-11 pr-4 py-3 bg-[#1A1A1A]/80 border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                  />
                </div>
              </div>

            </div>

            {/* Promo Code Toggle Block */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowPromo(!showPromo)}
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 font-outfit text-[14px] font-semibold cursor-pointer py-2 transition-colors select-none"
              >
                <span>Have A Promo Code?</span>
                {showPromo ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
              </button>

              {/* Collapsible Input */}
              {showPromo && (
                <div className="flex items-center gap-3 mt-3 w-full max-w-sm transition-all duration-300">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    placeholder="Enter code (e.g. PARIAH10)"
                    className="flex-1 px-4 py-2.5 bg-[#1A1A1A]/80 border border-white/5 rounded-[10px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] font-outfit uppercase disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || promoCode.trim() === ""}
                    className="px-5 py-2.5 bg-primary text-black hover:bg-primary/95 disabled:bg-white/10 disabled:text-white/40 font-outfit text-[14px] font-bold rounded-[10px] transition-all cursor-pointer border-none"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
              )}
            </div>

            {/* Agreement Verification Checkbox */}
            <div className="flex items-start gap-3.5 mt-4">
              <input
                id="agreement"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 cursor-pointer w-4 h-4 accent-primary"
              />
              <label 
                htmlFor="agreement" 
                className="text-[13px] sm:text-[14px] text-white/60 font-outfit leading-relaxed select-none cursor-pointer"
              >
                I agree to the <span className="text-primary font-medium hover:underline">Terms Of Service</span> and <span className="text-primary font-medium hover:underline">Privacy Policy</span>. I understand that tickets are non-refundable except as required by law.
              </label>
            </div>

            {/* Secure Checkout Pay Button */}
            <div className="mt-2 flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full py-4 bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary/95 text-black font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg border-none"
              >
                Pay £{total.toFixed(2)}
              </button>
              
              {/* Stripe Security Label */}
              <div className="flex items-center gap-2 text-white/40 font-outfit text-[12px] select-none">
                <FiShield className="w-4 h-4 text-[#10B981]" />
                <span>256-bit SSL encryption · Powered by Stripe</span>
              </div>
            </div>

          </form>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#111111]/70 backdrop-blur-md border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-xl lg:sticky lg:top-28">
              <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">
                Order Summary
              </h3>

              {/* Event Visual Banner Overlay */}
              <div className="relative w-full aspect-[21/9] rounded-[16px] overflow-hidden border border-white/5 flex items-end p-4 shadow-md select-none">
                <Image
                  src={BannerBg}
                  alt="Event Summary Background"
                  fill
                  className="object-cover blur-[1px] opacity-45"
                />
                <div className="relative flex flex-col min-w-0 z-10">
                  <span className="text-white font-outfit font-bold text-[15px] sm:text-[16px] tracking-wide truncate">
                    {event.title}
                  </span>
                  <span className="text-white/50 font-outfit text-[12px] mt-0.5">
                    The Midnight
                  </span>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              </div>

              {/* Price Calculation Breakdown */}
              <div className="flex flex-col gap-3.5 text-font-outfit">
                
                {/* Subtotal */}
                <div className="flex justify-between items-center select-none">
                  <span className="text-white/60 text-[14px]">
                    Subtotal ({seatsCount} {seatsCount === 1 ? "seat" : "seats"})
                  </span>
                  <span className="text-white/80 text-[15px] sm:text-[16px] font-medium">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Promo Applied Line */}
                {promoApplied && (
                  <div className="flex justify-between items-center select-none">
                    <span className="text-[#10B981]/80 text-[14px] font-medium">
                      Promo Discount (10%)
                    </span>
                    <span className="text-[#10B981] text-[15px] sm:text-[16px] font-bold">
                      -£{discount.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Service Fee */}
                <div className="flex justify-between items-center select-none">
                  <span className="text-white/60 text-[14px]">Service fee</span>
                  <span className="text-white/80 text-[15px] sm:text-[16px] font-medium">
                    £{serviceFee.toFixed(2)}
                  </span>
                </div>

                {/* Date Details */}
                <div className="flex justify-between items-center select-none">
                  <span className="text-white/60 text-[14px]">Date</span>
                  <span className="text-white/80 text-[14px] sm:text-[15px] font-medium truncate max-w-[150px]">
                    {event.date}
                  </span>
                </div>

                {/* Venue Details */}
                <div className="flex justify-between items-center select-none">
                  <span className="text-white/60 text-[14px]">Venue</span>
                  <span className="text-white/80 text-[14px] sm:text-[15px] font-medium truncate max-w-[150px]">
                    {event.venueName}
                  </span>
                </div>

                {/* Total */}
                <div className="border-t border-white/5 my-1" />
                <div className="flex justify-between items-center select-none">
                  <span className="text-white text-[18px] font-semibold">Total</span>
                  <span className="text-white text-[20px] font-bold">
                    £{total.toFixed(2)}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
