"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    }
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await loginUser(formData).unwrap();
      
      if (res?.status) {
        toast.success(res.message || "Logged in successfully!");
        
        // Save user and token in Redux store
        dispatch(setUser({
          ...res.data,
          accessToken: res.token,
        }));

        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);
      } else {
        toast.error(res?.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || err?.message || "Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-[32px] font-bold text-white mb-8 text-center font-outfit">
        Welcome back!
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90 font-outfit">Email</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 z-10">
              <FiMail size={20} />
            </span>
            <input
              type="email"
              placeholder="andrew.ainsley@yourdomain.com"
              className={`relative z-0 w-full bg-[#1A1A1A] border ${errors.email ? 'border-red-500/50' : 'border-[#262626]'} rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors font-outfit`}
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm mt-1">
          <label className="flex items-center gap-2 cursor-pointer text-white/80 select-none font-outfit">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border border-[#262626] bg-[#1A1A1A] text-primary focus:ring-0 focus:ring-offset-0 accent-primary cursor-pointer"
              {...register("rememberMe")}
            />
            Remember Me
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-primary hover:underline font-semibold font-outfit"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-4 rounded-xl transition-all duration-200 mt-4 active:scale-[0.98] cursor-pointer font-outfit border-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-white/60 mt-8 font-outfit">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-primary hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

const LoginPage = () => (
  <Suspense fallback={null}>
    <LoginForm />
  </Suspense>
);

export default LoginPage;
