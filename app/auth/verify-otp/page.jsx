"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useVerifyOtpMutation, useResendOtpMutation, useForgetPasswordVerifyOtpMutation } from "@/redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

const OtpInput = dynamic(() => import("react-otp-input"), {
  ssr: false,
  loading: () => <div className="h-[56px] w-full flex items-center justify-center text-white/40">Loading OTP inputs...</div>,
});

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  // Get email, initial token, and type from query params
  const email = searchParams.get("email") || "";
  const initialToken = searchParams.get("token") || "";
  const type = searchParams.get("type") || ""; // 'forgot' or default registration
  
  const [registerToken, setRegisterToken] = useState(initialToken);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(56);
  const [canResend, setCanResend] = useState(false);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [forgetPasswordVerifyOtp, { isLoading: isVerifyingForgot }] = useForgetPasswordVerifyOtpMutation();

  const isPending = isVerifying || isVerifyingForgot;

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

  const handleResend = async () => {
    if (!canResend || !email) {
      toast.error("Email not found. Cannot resend OTP.");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await resendOtp(formData).unwrap();
      
      if (res?.status) {
        toast.success(res.message || "OTP code resent successfully.");
        if (res.data?.token) {
          setRegisterToken(res.data.token);
        }
        setTimer(60);
        setCanResend(false);
        setOtp("");
      } else {
        toast.error(res?.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to resend OTP.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    if (!registerToken) {
      toast.error("Token is missing. Please request a new OTP.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("otp", otp);
      formData.append("token", registerToken);

      if (type === "forgot") {
        // Forgot password flow
        const res = await forgetPasswordVerifyOtp(formData).unwrap();
        if (res?.status) {
          toast.success(res.message || "OTP verified successfully.");
          const resetToken = res.data?.reset_token;
          setTimeout(() => {
            router.push(`/auth/reset-password?token=${encodeURIComponent(resetToken)}`);
          }, 1000);
        } else {
          toast.error(res?.message || "Verification failed!");
        }
      } else {
        // Default registration flow
        const res = await verifyOtp(formData).unwrap();
        if (res?.status) {
          toast.success(res.message || "User registration successful.");
          
          dispatch(setUser({
            ...res.data,
            accessToken: res.token,
          }));

          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          toast.error(res?.message || "Verification failed!");
        }
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      toast.error(err?.data?.message || err?.message || "Verification failed! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-2 text-center">
        Enter OTP Code
      </h1>
      <p className="text-sm text-white/60 text-center mb-8 max-w-[460px] leading-relaxed">
        Check your inbox for the one-time verification code we've sent to your email. Enter the code below to complete your verification.
      </p>

      <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-6">
        <p className="text-sm font-semibold text-white/90 text-center">
          Code has been sent to <span className="text-primary">{email || "your email"}</span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center my-4 otp-input-wrapper">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
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
            disabled={!canResend || isResending}
            className={`font-semibold transition-all ${
              canResend
                ? "text-primary hover:underline cursor-pointer"
                : "text-white/20 cursor-not-allowed"
            }`}
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={otp.length < 6 || isPending}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
        >
          {isPending ? "Verifying..." : "Verify"}
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
