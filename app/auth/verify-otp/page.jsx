"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const OtpInput = dynamic(() => import("react-otp-input"), {
  ssr: false,
  loading: () => <div className="h-[56px] w-full flex items-center justify-center text-white/40">Loading OTP inputs...</div>,
});

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get email from query params or fallback
  const email = searchParams.get("email") || "example@gmail.com";
  
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(56);
  const [canResend, setCanResend] = useState(false);

  // Timer logic for countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    
    setTimer(60);
    setCanResend(false);
    setOtp("");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-2 text-center">
        Enter OTP Code
      </h1>
      <p className="text-sm text-white/60 text-center mb-8 max-w-[460px] leading-relaxed">
        Check your inbox for the one-time verification code we've sent to your email. Enter the code below to proceed with resetting your password.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col items-center gap-6">
        <p className="text-sm font-semibold text-white/90 text-center">
          Code has been sent to <span className="text-primary">{email}</span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center my-4 otp-input-wrapper">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            renderSeparator={<span className="w-2 sm:w-4"></span>}
            shouldAutoFocus
            renderInput={(props) => (
              <input
                {...props}
                className="!w-[50px] !h-[50px] sm:!w-[56px] sm:!h-[56px] bg-[#1A1A1A] text-white border border-[#262626] rounded-xl text-center text-xl font-semibold focus:!border-primary focus:outline-none transition-colors"
              />
            )}
          />
        </div>

        {/* Resend Code & Timer */}
        <div className="flex flex-col items-center gap-2 text-sm text-center">
          <span className="text-white/60">
            {timer > 0 ? (
              <>
                You can resend the code in{" "}
                <span className="text-primary font-semibold">{timer} Seconds</span>
              </>
            ) : (
              "You can resend the code now"
            )}
          </span>
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend}
            className={`font-semibold transition-all ${
              canResend
                ? "text-primary hover:underline cursor-pointer"
                : "text-white/20 cursor-not-allowed"
            }`}
          >
            Resend Code
          </button>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={otp.length < 5}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

// Next.js SearchParams requires Suspense boundary during static generation/build
const VerifyOtpPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-white">Loading OTP page...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
};

export default VerifyOtpPage;
