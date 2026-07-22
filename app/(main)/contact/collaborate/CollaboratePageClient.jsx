"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSubmitContactInquiryMutation, useGetContactUsCMSQuery } from "@/redux/api/apiSlice";

// Import local assets
import HeaderBg from "@/assets/about.png";

const CollaboratePageClient = () => {
  const [agree, setAgree] = useState(false);
  const [submitContactInquiry, { isLoading }] = useSubmitContactInquiryMutation();
  const { data: response } = useGetContactUsCMSQuery();
  const contactCMSContent = response?.data?.content;

  const collaborateTitle = contactCMSContent?.collaborate_title || "Collaborate With Pariah";
  const collaborateSubtitle =
    contactCMSContent?.collaborate_subtitle ||
    "We love collaborating with artists, brands, and businesses to create meaningful and memorable experiences.";
  const collaborateBottomText =
    contactCMSContent?.collaborate_bottom_text ||
    "I Understand That A 50% Non-Refundable Deposit Is Required Before Any Work Begins.";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      based: "",
      businessName: "",
      describeBusiness: "",
      projectGoal: "",
      businessDescription: "",
      pinterestBoard: "",
      budget: "",
      deadline: "",
      whyWorkWithUs: "",
      howHeard: "",
    }
  });

  const onSubmit = async (data) => {
    if (!agree) {
      toast.error("Please agree to the terms to proceed.");
      return;
    }

    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        based_in: data.based,
        business_name: data.businessName,
        business_three_words: data.describeBusiness,
        project_goal: data.projectGoal,
        business_description: data.businessDescription,
        pinterest_board: data.pinterestBoard,
        budget: data.budget,
        deadline: data.deadline,
        why_work_with_us: data.whyWorkWithUs,
        how_did_you_hear: data.howHeard,
        agree_terms: agree,
      };

      const res = await submitContactInquiry(payload).unwrap();
      if (res?.status) {
        toast.success(res.message || "Inquiry submitted successfully!");
        reset();
        setAgree(false);
      } else {
        toast.error(res?.message || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error("Collaborate submission error:", err);
      toast.error(err?.data?.message || err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen text-white pb-6 sm:pb-10 md:pb-24">
      {/* Header Banner Section */}
      <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] flex items-center justify-center p-6 select-none overflow-hidden">
        <Image
          src={HeaderBg}
          alt="Collaborate with Pariah"
          fill
          className="object-cover opacity-60 object-center"
          priority
        />
        {/* Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0D0D0D]" />
        <div className="absolute inset-0 " />
        
        {/* Text Overlay */}
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col gap-4 px-4 mt-12 sm:mt-16">
          <h1 className="text-white font-playfair text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide leading-tight">
            {collaborateTitle}
          </h1>
          <div
            className="text-white/85 font-outfit text-[14px] sm:text-[16px] md:text-[18px] max-w-2xl mx-auto font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: collaborateSubtitle }}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 relative z-20">
        <div className="bg-[#111111] border border-white/5 rounded-[24px] p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* First and Last Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                  First Name <span className="text-primary">*</span>
                </label>
                <div className="relative w-full">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="enter your first name"
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#1A1A1A] border ${errors.firstName ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                    {...register("firstName", { required: "First name is required" })}
                  />
                </div>
                {errors.firstName && (
                  <span className="text-red-500 text-xs font-outfit">{errors.firstName.message}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                  Last Name <span className="text-primary">*</span>
                </label>
                <div className="relative w-full">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="enter your last name"
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#1A1A1A] border ${errors.lastName ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                    {...register("lastName", { required: "Last name is required" })}
                  />
                </div>
                {errors.lastName && (
                  <span className="text-red-500 text-xs font-outfit">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Email <span className="text-primary">*</span>
              </label>
              <div className="relative w-full">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className={`w-full pl-11 pr-4 py-3.5 bg-[#1A1A1A] border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs font-outfit">{errors.email.message}</span>
              )}
            </div>

            {/* Where Are You Based? */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Where Are You Based? <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="enter your location"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.based ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("based", { required: "Location is required" })}
              />
              {errors.based && (
                <span className="text-red-500 text-xs font-outfit">{errors.based.message}</span>
              )}
            </div>

            {/* Business Name */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Business Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="enter business name"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.businessName ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("businessName", { required: "Business name is required" })}
              />
              {errors.businessName && (
                <span className="text-red-500 text-xs font-outfit">{errors.businessName.message}</span>
              )}
            </div>

            {/* Describe Your Business in 3 Words */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Describe Your Business in 3 Words <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="three words to describe your business"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.describeBusiness ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("describeBusiness", { required: "This field is required" })}
              />
              {errors.describeBusiness && (
                <span className="text-red-500 text-xs font-outfit">{errors.describeBusiness.message}</span>
              )}
            </div>

            {/* What Is Your Goal for This Project? */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                What Is Your Goal for This Project? <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="what do you want to achieve?"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.projectGoal ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("projectGoal", { required: "Goal is required" })}
              />
              {errors.projectGoal && (
                <span className="text-red-500 text-xs font-outfit">{errors.projectGoal.message}</span>
              )}
            </div>

            {/* Give Us a Brief Description of Your Business and What You Do */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Give Us a Brief Description of Your Business and What You Do <span className="text-primary">*</span>
              </label>
              <textarea
                placeholder="tell us about your business and your day-to-day operations"
                rows={4}
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.businessDescription ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors resize-none`}
                {...register("businessDescription", { required: "Description is required" })}
              />
              {errors.businessDescription && (
                <span className="text-red-500 text-xs font-outfit">{errors.businessDescription.message}</span>
              )}
            </div>

            {/* Link to Pinterest Board */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Link to Pinterest Board <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="enter pinterest board link"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.pinterestBoard ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("pinterestBoard", { required: "Pinterest board link is required" })}
              />
              <span className="text-[12px] text-white/40 font-outfit leading-relaxed select-none">
                Please Link Or Attach A Mood Board So We Can Better Understand Your Vision And Respond With A More Tailored Proposal.
              </span>
              {errors.pinterestBoard && (
                <span className="text-red-500 text-xs font-outfit">{errors.pinterestBoard.message}</span>
              )}
            </div>

            {/* What Is Your Budget? */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                What Is Your Budget? <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="enter your estimated budget"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.budget ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("budget", { required: "Budget is required" })}
              />
              {errors.budget && (
                <span className="text-red-500 text-xs font-outfit">{errors.budget.message}</span>
              )}
            </div>

            {/* Do You Have a Deadline or Timeframe? */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Do You Have a Deadline or Timeframe? <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="expected deadline or date range"
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.deadline ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("deadline", { required: "Timeframe is required" })}
              />
              {errors.deadline && (
                <span className="text-red-500 text-xs font-outfit">{errors.deadline.message}</span>
              )}
            </div>

            {/* Why Do You Want to Work With Us? */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                Why Do You Want to Work With Us? <span className="text-primary">*</span>
              </label>
              <textarea
                placeholder="tell us what excites you about collaborating with Pariah"
                rows={4}
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.whyWorkWithUs ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors resize-none`}
                {...register("whyWorkWithUs", { required: "This field is required" })}
              />
              {errors.whyWorkWithUs && (
                <span className="text-red-500 text-xs font-outfit">{errors.whyWorkWithUs.message}</span>
              )}
            </div>

            {/* How Did You Hear About Us? */}
            <div className="flex flex-col gap-2">
              <label className="text-white font-outfit text-[14px] font-medium tracking-wide">
                How Did You Hear About Us? <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="social media, word of mouth, events..."
                className={`w-full px-4 py-3.5 bg-[#1A1A1A] border ${errors.howHeard ? 'border-red-500/50' : 'border-white/5'} rounded-[12px] text-white placeholder-white/20 focus:outline-none focus:border-primary/50 text-[14px] sm:text-[15px] font-outfit transition-colors`}
                {...register("howHeard", { required: "This field is required" })}
              />
              {errors.howHeard && (
                <span className="text-red-500 text-xs font-outfit">{errors.howHeard.message}</span>
              )}
            </div>

            {/* Deposit Terms Checkbox */}
            <div className="mt-2">
              <label className="flex items-start gap-3.5 cursor-pointer select-none">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-[4px] border transition-all flex items-center justify-center ${
                    agree 
                      ? "bg-primary border-primary text-black" 
                      : "border-white/20 bg-[#1A1A1A] hover:border-white/40"
                  }`}>
                    {agree && <FiCheck className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </div>
                <span
                  className="text-[13px] sm:text-[14px] text-white/60 font-outfit leading-relaxed text-left"
                  dangerouslySetInnerHTML={{ __html: collaborateBottomText }}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-black font-outfit text-[16px] font-bold rounded-[12px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg border-none hover:bg-primary/90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Inquiry"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CollaboratePageClient;
