"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";
import { useForgetPasswordMutation } from "@/redux/api/apiSlice";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await forgetPassword(formData).unwrap();
      if (res?.status) {
        toast.success(res.message || "OTP code sent to email.");
        const resetToken = res.data?.token;
        setTimeout(() => {
          router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}&token=${encodeURIComponent(resetToken)}&type=forgot`);
        }, 1000);
      } else {
        toast.error(res?.message || "Failed to send OTP code.");
      }
    } catch (err) {
      console.error("Forget password error:", err);
      toast.error(err?.data?.message || err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-2 text-center">
        Forget Password
      </h1>
      <p className="text-sm text-white/60 text-center mb-8 max-w-[420px] leading-relaxed">
        Enter your registered email address below, and we will send you a secure code to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90">Your Registered Email</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-white/40">
              <FiMail size={20} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="andrew.ainsley@yourdomain.com"
              className="w-full bg-[#1A1A1A] border border-[#262626] rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
        >
          {isLoading ? "Sending..." : "Send OTP Code"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
