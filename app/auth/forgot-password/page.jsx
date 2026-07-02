"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-2 text-center">
        Forget Password
      </h1>
      <p className="text-sm text-white/60 text-center mb-8 max-w-[420px] leading-relaxed">
        Enter your registered email address below, and we will send you a secure link to reset your password.
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col gap-6">
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
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98]"
        >
          Send OTP Code
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
