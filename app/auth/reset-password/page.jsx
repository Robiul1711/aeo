"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useResetPasswordMutation } from "@/redux/api/apiSlice";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!token) {
      toast.error("Reset token is missing. Please request a new OTP code.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("password", newPassword);
      formData.append("password_confirmation", confirmNewPassword);
      formData.append("token", token);

      const res = await resetPassword(formData).unwrap();
      if (res?.status) {
        toast.success(res.message || "Password has been reset successfully.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else {
        toast.error(res?.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-2 text-center">
        Create New Password
      </h1>
      <p className="text-sm text-white/60 text-center mb-8 max-w-[420px] leading-relaxed">
        Your new password must be different from your previously used password.
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {/* New Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90">New Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10 pointer-events-none">
              <FiLock size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1A1A1A] border border-[#262626] rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword(!showPassword);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/40 hover:text-white/60 focus:outline-none cursor-pointer p-1"
            >
              {showPassword ? (
                <FiEye className="pointer-events-none" size={20} />
              ) : (
                <FiEyeOff className="pointer-events-none" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90">Confirm New Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10 pointer-events-none">
              <FiLock size={20} />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1A1A1A] border border-[#262626] rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowConfirmPassword(!showConfirmPassword);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/40 hover:text-white/60 focus:outline-none cursor-pointer p-1"
            >
              {showConfirmPassword ? (
                <FiEye className="pointer-events-none" size={20} />
              ) : (
                <FiEyeOff className="pointer-events-none" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
        >
          {isLoading ? "Saving..." : "Save New Password"}
        </button>
      </form>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-white">Loading reset page...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
