'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BannerBg from '@/assets/banner.png';
import { GlowButton } from '@/components/common/GlowButton';
import { useSubscribeNewsletterMutation, useGetHomePageCMSQuery } from '@/redux/api/apiSlice';
import { NewsLetterSkeleton } from '@/components/common/Skeleton';
import toast from 'react-hot-toast';

const ExperienceForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();
  const { data: response, isLoading: isCMSLoading } = useGetHomePageCMSQuery();

  if (isCMSLoading) {
    return <NewsLetterSkeleton />;
  }

  const contactCMS = response?.data?.content?.home_contact;
  const contactBg = contactCMS?.bg_image || BannerBg;
  const contactTitle = contactCMS?.title || 'Welcome to our Pariah Design House';
  const contactDescription = contactCMS?.description || "Don't Miss\nthe Next\nExperience";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !phone) {
      toast.error('Please enter both email and phone number.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('agreed_to_terms', '1'); // Implicitly agree to terms as required by API

      const res = await subscribeNewsletter(formData).unwrap();
      if (res?.status) {
        toast.success(res.message || 'Thank you for subscribing to our newsletter!');
        setEmail('');
        setPhone('');
      } else {
        toast.error(res?.message || 'Subscription failed!');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      toast.error(err?.data?.message || err?.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <section className="relative w-full h-[650px] flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={contactBg} 
          alt="Experience Background" 
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65 z-0" />

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full max-w-[480px] mx-4 bg-[#050505]/45 backdrop-blur-xl border border-white/10 rounded-[24px] px-8 py-12 flex flex-col items-center shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtitle Header */}
        <p className="text-secondary-gray font-outfit text-[12px] sm:text-sm tracking-wider uppercase text-center font-normal">
          {contactTitle}
        </p>

        {/* Decorative Divider */}
        <div className="w-full flex items-center justify-center my-4 relative">
          <div className="h-[0.5px] bg-white/20 w-4/5 relative flex justify-center items-center">
            <span className="w-1.5 h-1.5 bg-white/80 rotate-45 absolute" />
          </div>
        </div>

        {/* Main Serif Header */}
        <h2 
          className="text-white font-playfair text-[38px] sm:text-[44px] md:text-[48px] xl:text-[52px] text-center leading-[1.15] mb-8 mt-2 tracking-wide font-normal"
          dangerouslySetInnerHTML={{ __html: contactDescription.replace(/\n/g, '<br />') }}
        />

        {/* Form Fields */}
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex flex-col w-full relative">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-outfit text-[15px] placeholder-white/30 focus:border-white/60 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col w-full relative mt-2">
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="enter your phone number"
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-outfit text-[15px] placeholder-white/30 focus:border-white/60 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <GlowButton onClick={null}>
              {isLoading ? 'Subscribing...' : 'Explore the next'}
            </GlowButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ExperienceForm;
