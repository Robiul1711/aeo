'use client';

import React from 'react';
import { useGetTermsOfServiceCMSQuery } from '@/redux/api/apiSlice';
import bg from '@/assets/ebg.png';

const TermsOfServicePageClient = () => {
  const { data: response, isLoading, isError } = useGetTermsOfServiceCMSQuery();
  const pageData = response?.data;

  // Format Date Helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section 
      className="w-full min-h-screen section-padding-y section-padding-x border-t border-white/5" 
      style={{
        backgroundImage: `url(${bg.src})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-4 md:gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2 text-primary font-outfit text-[14px] tracking-wide select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Legal Document
          </div>
          <h1 className="text-white font-playfair text-4xl sm:text-5xl font-normal tracking-wide leading-tight">
            {pageData?.title || 'Terms of Service'}
          </h1>
          {pageData?.content?.last_updated && (
            <p className="text-white/40 font-outfit text-[14px] mt-1">
              Last Updated: {formatDate(pageData.content.last_updated)}
            </p>
          )}
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-white/60 font-outfit text-lg">Loading terms of service...</p>
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center py-20">
            <p className="text-red-500/80 font-outfit text-lg">Failed to load content. Please try again later.</p>
          </div>
        )}

        {/* Content Render */}
        {!isLoading && !isError && pageData?.content?.description && (
          <div 
            dangerouslySetInnerHTML={{ __html: pageData.content.description }}
            className="font-outfit text-secondary-gray text-[15px] sm:text-[16px] leading-relaxed flex flex-col gap-4 [&>h2]:text-white [&>h2]:text-[22px] [&>h2]:font-semibold [&>h2]:font-outfit [&>h2]:mt-4 [&>h2]:mb-2 [&>p]:text-secondary-gray [&>p]:leading-relaxed [&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80"
          />
        )}

      </div>
    </section>
  );
};

export default TermsOfServicePageClient;
