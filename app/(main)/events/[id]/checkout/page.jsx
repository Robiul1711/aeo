"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiPhone, FiCheck, FiShield } from "react-icons/fi";
import {
  useGetEventBySlugQuery,
  useConfirmBookingCheckoutMutation,
} from "@/redux/api/apiSlice";
import toast from "react-hot-toast";
import BannerBg from "@/assets/banner.png";

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

const CheckoutPage = ({ params, searchParams }) => {
  const router = useRouter();

  // Resolve Promise params for Next.js 16
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);

  const id = resolvedParams.id; // event slug
  const seatsCount = parseInt(resolvedSearchParams.seats) || 2;
  const bookingId = resolvedSearchParams.booking_id;
  const reference = resolvedSearchParams.reference;

  // Load event details dynamically
  const {
    data: eventResponse,
    isLoading: eventLoading,
    isError: eventError,
  } = useGetEventBySlugQuery(id);
  const event = eventResponse?.data;

  // Stripe Checkout Mutation
  const [confirmCheckout, { isLoading: isSubmitting }] =
    useConfirmBookingCheckoutMutation();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [agree, setAgree] = useState(false);

  // Price Calculations (Prefer query parameters passed from book page, fallback to calculations)
  const subtotal = resolvedSearchParams.subtotal
    ? parseFloat(resolvedSearchParams.subtotal)
    : seatsCount * (event?.price || 45);

  const serviceFee = resolvedSearchParams.serviceFee
    ? parseFloat(resolvedSearchParams.serviceFee)
    : seatsCount * ((event?.price || 45) * 0.12);

  const total = resolvedSearchParams.total
    ? parseFloat(resolvedSearchParams.total)
    : subtotal + serviceFee;

  // Form Validation
  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && agree;

  const handlePay = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill in all details and agree to terms.");
      return;
    }

    try {
      const payload = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        agree_terms: agree,
        special_request: specialRequests,
      };

      const result = await confirmCheckout({
        reference,
        body: payload,
      }).unwrap();

      if (result.status && result.data?.checkout_url) {
        toast.success(result.message || "Redirecting to payment gateway...");
        // Redirect to Stripe checkout page
        window.location.href = result.data.checkout_url;
      } else {
        toast.error(result.message || "Failed to initiate payment session.");
      }
    } catch (err) {
      console.error("Checkout payment error:", err);
      toast.error(
        err?.data?.message ||
          "An error occurred during checkout. Please try again.",
      );
    }
  };

  if (eventLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">
        <p className="text-white/60 font-outfit text-lg">
          Loading checkout details...
        </p>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white gap-4">
        <p className="text-red-500/80 font-outfit text-lg">
          Failed to load checkout details.
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

  return (
    <>
      <title>
        {event?.title
          ? `Checkout - ${event.title} | Pariah Design House`
          : "Checkout | Pariah Design House"}
      </title>
      <meta
        name="description"
        content="Checkout and complete your booking for Pariah Design House pop-up art bar events."
      />
      <div className="min-h-screen bg-[#0D0D0D] text-white pt-6 pb-24 section-padding-x">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Progress Steps Header */}
          <div className="flex items-center justify-center gap-4 py-6 border-b border-white/5 select-none">
            {/* Step 1: Select Seats */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#00DF89] flex items-center justify-center text-black">
                <FiCheck className="w-4 h-4 text-black stroke-[3px]" />
              </div>
              <span className="text-white/60 font-outfit text-[13px] sm:text-[14px] font-medium">
                Select seats
              </span>
            </div>

            {/* Connector Line */}
            <div className="w-10 sm:w-16 h-[1px] bg-white/10" />

            {/* Step 2: Checkout */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-black">
                <FiCheck className="w-4 h-4 text-black stroke-[3px]" />
              </div>
              <span className="text-white font-outfit text-[13px] sm:text-[14px] font-medium">
                Checkout
              </span>
            </div>

            {/* Connector Line */}
            <div className="w-10 sm:w-16 h-[1px] bg-white/10" />

            {/* Step 3: Confirmation */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center text-white/20">
                <FiCheck className="w-4 h-4 opacity-35" />
              </div>
              <span className="text-white/40 font-outfit text-[13px] sm:text-[14px] font-medium">
                Confirmation
              </span>
            </div>
          </div>

          {/* Form & Summary Container */}
          <form onSubmit={handlePay} className="flex flex-col gap-8">
            {/* Form & Summary Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Attendee Details */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Attendee Details Card */}
                <div className="bg-[#111111] border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-md">
                  <h3 className="text-white text-[19px] sm:text-[21px] font-outfit font-semibold tracking-wide border-b border-white/5 pb-4">
                    Attendee Details
                  </h3>

                  {/* Name Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">
                      Name
                    </label>
                    <div className="relative w-full">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="enter your name"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#1A1A1A] border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">
                      Email
                    </label>
                    <div className="relative w-full">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#1A1A1A] border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                      />
                    </div>
                  </div>

                  {/* Number Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">
                      Number
                    </label>
                    <div className="relative w-full">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7700 900000"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#1A1A1A] border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors"
                      />
                    </div>
                  </div>

                  {/* Special Requests Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 font-outfit text-[13px] sm:text-[14px] select-none">
                      Special Requests
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="enter your request"
                      rows={6}
                      className="w-full px-4 py-3.5 bg-[#1A1A1A] border border-white/5 rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[#111111] border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col gap-6 shadow-xl lg:sticky lg:top-28">
                  <h3 className="text-white text-[20px] font-outfit font-semibold tracking-wide">
                    Order Summary
                  </h3>

                  {/* Event Visual Banner Overlay */}
                  <div className="relative w-full aspect-[21/9] rounded-[16px] overflow-hidden border border-white/5 flex items-end p-4 shadow-md select-none bg-[#111]">
                    <Image
                      src={event?.banner_image || BannerBg}
                      alt="Event Summary Background"
                      fill
                      className="object-cover opacity-90"
                      priority
                    />
                    <div className="relative flex flex-col min-w-0 z-10">
                      <span className="text-white font-outfit font-bold text-[15px] sm:text-[16px] tracking-wide truncate">
                        {event?.title}
                      </span>
                      <span className="text-white/50 font-outfit text-[12px] mt-0.5">
                        {event?.city || "Dhaka"}
                      </span>
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  </div>

                  {/* Price Calculation Breakdown */}
                  <div className="flex flex-col gap-3.5 font-outfit">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center select-none">
                      <span className="text-white/60 text-[14px]">
                        Subtotal ({seatsCount}{" "}
                        {seatsCount === 1 ? "seat" : "seats"})
                      </span>
                      <span className="text-white/80 text-[15px] sm:text-[16px] font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Service Fee */}
                    <div className="flex justify-between items-center select-none">
                      <span className="text-white/60 text-[14px]">
                        Service fee
                      </span>
                      <span className="text-white/80 text-[15px] sm:text-[16px] font-medium">
                        ${serviceFee.toFixed(2)}
                      </span>
                    </div>

                    {/* Date Details */}
                    <div className="flex justify-between items-center select-none">
                      <span className="text-white/60 text-[14px]">Date</span>
                      <span className="text-white/80 text-[14px] sm:text-[15px] font-medium truncate max-w-[150px]">
                        {formatEventDate(event?.event_date)}
                      </span>
                    </div>

                    {/* Venue Details */}
                    <div className="flex justify-between items-center select-none">
                      <span className="text-white/60 text-[14px]">Venue</span>
                      <span className="text-white/80 text-[14px] sm:text-[15px] font-medium truncate max-w-[150px]">
                        {event?.address || "Venue Address"}
                      </span>
                    </div>

                    {/* Total */}
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
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-6 mt-4">
              {/* Agreement Verification Checkbox */}
              <label className="flex items-start gap-3.5 cursor-pointer select-none">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    id="agreement"
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                      agree
                        ? "bg-primary border-primary text-black"
                        : "border-white/20 bg-[#1A1A1A] hover:border-white/40"
                    }`}
                  >
                    {agree && <FiCheck className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </div>
                <span className="text-[13px] sm:text-[14px] text-white/60 font-outfit leading-relaxed">
                  I agree to the{" "}
                  <span className="text-primary font-medium hover:underline">
                    Terms Of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-primary font-medium hover:underline">
                    Privacy Policy
                  </span>
                  . I understand that tickets are non-refundable except as
                  required by law.
                </span>
              </label>

              {/* Secure Checkout Pay Button */}
              <div className="flex flex-col items-center gap-4 w-full">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full py-4 bg-primary text-black font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg border-none disabled:bg-[#856A15]/40 disabled:text-white/40 disabled:cursor-not-allowed disabled:scale-100 disabled:active:scale-100"
                >
                  {isSubmitting
                    ? "Processing Payment..."
                    : `Pay $${total.toFixed(2)}`}
                </button>

                {/* Stripe Security Label */}
                <div className="flex items-center gap-2 text-white/40 font-outfit text-[12px] select-none">
                  <FiShield className="w-4 h-4 text-[#10B981]" />
                  <span>256-bit SSL encryption · Powered by Stripe</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
