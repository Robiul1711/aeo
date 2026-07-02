'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import BannerBg from '@/assets/banner.png';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      number: '',
      message: '',
    }
  });

  const onSubmit = (data) => {
    console.log('Contact form submission data:', data);
    alert('Thank you for getting in touch! We will get back to you shortly.');
    reset();
  };

  return (
    <section className="w-full min-h-screen bg-[#050505] section-padding-y section-padding-x flex flex-col justify-center">
      <div className=" w-full flex flex-col gap-5 md:gap-10 mt-6">
        {/* Header Title Block */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white/60 font-outfit text-[14px] tracking-wide select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Contact Us
          </div>
          <h1 className="text-white font-playfair text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide leading-tight">
            Get In Touch With Us
          </h1>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-12">
          {/* Left Column: Image */}
          <div className="relative w-full h-[450px] lg:h-full rounded-[24px] overflow-hidden shadow-2xl border border-white/5">
            <Image 
              src={BannerBg} 
              alt="Contact Venue"
              fill
              sizes="(max-w-768px) 100vw, 560px"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full bg-[#0C0C0D] border border-white/5 rounded-[24px] p-6 sm:p-10 shadow-2xl">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="flex flex-col gap-2.5">
                <label className="text-white font-outfit text-[14px] font-semibold tracking-wide">Full Name</label>
                <div className={`flex items-center gap-3 bg-[#070708] border ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} rounded-[8px] px-4 py-3.5 focus-within:border-white/35 transition-colors duration-200`}>
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="enter your name"
                    className="bg-transparent border-none outline-none w-full text-white font-outfit text-[15px] placeholder-white/20"
                    {...register('fullName', { required: 'Name is required' })}
                  />
                </div>
                {errors.fullName && (
                  <span className="text-red-500 font-outfit text-xs tracking-wide">{errors.fullName.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2.5">
                <label className="text-white font-outfit text-[14px] font-semibold tracking-wide">Email</label>
                <div className={`flex items-center gap-3 bg-[#070708] border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-[8px] px-4 py-3.5 focus-within:border-white/35 transition-colors duration-200`}>
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    className="bg-transparent border-none outline-none w-full text-white font-outfit text-[15px] placeholder-white/20"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 font-outfit text-xs tracking-wide">{errors.email.message}</span>
                )}
              </div>

              {/* Number */}
              <div className="flex flex-col gap-2.5">
                <label className="text-white font-outfit text-[14px] font-semibold tracking-wide">Number</label>
                <div className={`flex items-center gap-3 bg-[#070708] border ${errors.number ? 'border-red-500/50' : 'border-white/10'} rounded-[8px] px-4 py-3.5 focus-within:border-white/35 transition-colors duration-200`}>
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input 
                    type="tel" 
                    placeholder="enter your phone number"
                    className="bg-transparent border-none outline-none w-full text-white font-outfit text-[15px] placeholder-white/20"
                    {...register('number', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9+\s-]{7,15}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                  />
                </div>
                {errors.number && (
                  <span className="text-red-500 font-outfit text-xs tracking-wide">{errors.number.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2.5">
                <label className="text-white font-outfit text-[14px] font-semibold tracking-wide">Message</label>
                <div className={`flex items-start gap-3 bg-[#070708] border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-[8px] px-4 py-3.5 focus-within:border-white/35 transition-colors duration-200`}>
                  <textarea 
                    rows={4}
                    placeholder="enter your message"
                    className="bg-transparent border-none outline-none w-full text-white font-outfit text-[15px] placeholder-white/20 resize-none min-h-[100px]"
                    {...register('message', { required: 'Message cannot be empty' })}
                  />
                </div>
                {errors.message && (
                  <span className="text-red-500 font-outfit text-xs tracking-wide">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-4 bg-primary hover:bg-[#e2a704] text-black font-outfit text-[16px] font-bold rounded-[8px] transition-colors duration-200 mt-2 cursor-pointer border-none shadow-md active:scale-[0.99]"
              >
                Sent
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
