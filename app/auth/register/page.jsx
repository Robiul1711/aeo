"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/api/apiSlice";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    }
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.confirmPassword);

      const res = await registerUser(formData).unwrap();
      
      if (res?.status) {
        toast.success(res.message || "A verification code has been sent to your email address.");
        const registerToken = res.data?.token;
        setTimeout(() => {
          router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}&token=${encodeURIComponent(registerToken)}`);
        }, 1000);
      } else {
        toast.error(res?.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err?.data?.message || err?.message || "Registration failed! Please try again.");
    }
  };

  return (
    <>
      <title>Register | Pariah Design House</title>
      <meta name="description" content="Create a Pariah Design House account to book experiential pop-up art bar events." />
      <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-2 text-center font-outfit">
        Create Your Account
      </h1>
      <p className="text-sm text-white/60 text-center mb-8 max-w-[420px] leading-relaxed font-outfit">
        Get started with your professional account. It only takes some time.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        {/* Name Fields (Side by Side on desktop, stacked on mobile) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium text-white/90 font-outfit">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              className={`w-full bg-[#1A1A1A] border ${errors.firstName ? 'border-red-500/50' : 'border-[#262626]'} rounded-xl py-4 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors font-outfit`}
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500 font-outfit text-xs mt-1">{errors.firstName.message}</span>
            )}
          </div>
          
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium text-white/90 font-outfit">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className={`w-full bg-[#1A1A1A] border ${errors.lastName ? 'border-red-500/50' : 'border-[#262626]'} rounded-xl py-4 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors font-outfit`}
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500 font-outfit text-xs mt-1">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90 font-outfit">Email</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-white/40">
              <FiMail size={20} />
            </span>
            <input
              type="email"
              placeholder="andrew.ainsley@yourdomain.com"
              className={`w-full bg-[#1A1A1A] border ${errors.email ? 'border-red-500/50' : 'border-[#262626]'} rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors font-outfit`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }
              })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 font-outfit text-xs mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90 font-outfit">Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10 pointer-events-none">
              <FiLock size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full bg-[#1A1A1A] border ${errors.password ? 'border-red-500/50' : 'border-[#262626]'} rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors font-outfit`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
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
          {errors.password && (
            <span className="text-red-500 font-outfit text-xs mt-1">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90 font-outfit">Confirm Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10 pointer-events-none">
              <FiLock size={20} />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full bg-[#1A1A1A] border ${errors.confirmPassword ? 'border-red-500/50' : 'border-[#262626]'} rounded-xl py-4 pl-12 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors font-outfit`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === passwordValue || "Passwords do not match",
              })}
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
          {errors.confirmPassword && (
            <span className="text-red-500 font-outfit text-xs mt-1">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Agree to Terms */}
        <div className="flex flex-col gap-1 mt-1">
          <label className="flex items-center gap-2 cursor-pointer text-white/80 select-none font-outfit">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border border-[#262626] bg-[#1A1A1A] text-primary focus:ring-0 focus:ring-offset-0 accent-primary cursor-pointer"
              {...register("agreeToTerms", { required: "You must agree to the terms and privacy policy" })}
            />
            I agreeing to the terms of service and privacy policy
          </label>
          {errors.agreeToTerms && (
            <span className="text-red-500 font-outfit text-xs mt-1">{errors.agreeToTerms.message}</span>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98] cursor-pointer font-outfit border-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-white/60 mt-8 font-outfit">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline font-semibold">
          Sign In
        </Link>
      </p>
    </div>
    </>
  );
};

export default RegisterPage;