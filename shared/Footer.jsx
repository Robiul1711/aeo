"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import FooterLogo from "@/assets/footerlogo.png";
import { useGetFooterCMSQuery } from "@/redux/api/apiSlice";

const Footer = () => {
  const { data: response, isLoading } = useGetFooterCMSQuery();
  // console.log("footer response", response);
  const footerData = response?.data?.content;
  const footer_image = footerData?.footer_image;
  // console.log("footer image", footer_image);
  const footerText =
    footerData?.footer_text ||
    "Pariah Design House is a London-based experiential studio specialising in Art Bar pop-up events.";
  const rightsReserved =
    footerData?.rights_reserved || "© 2026 Pariah. All rights reserved.";
  const footerBottomLogo = footerData?.footer_bottom_logo || FooterLogo;

  const rawSocialLinks = footerData?.social_links;
  const socialLinks = Array.isArray(rawSocialLinks)
    ? rawSocialLinks
        .map((link) => ({ name: link?.platform, url: link?.url }))
        .filter((link) => link.url)
    : [
        { name: "Facebook", url: rawSocialLinks?.facebook },
        { name: "Instagram", url: rawSocialLinks?.instagram },
        { name: "Twitter", url: rawSocialLinks?.twitter },
        { name: "YouTube", url: rawSocialLinks?.youtube },
        { name: "LinkedIn", url: rawSocialLinks?.linkedin },
        { name: "Pinterest", url: rawSocialLinks?.pinterest },
      ].filter((link) => link.url);

  return (
    <footer className="w-full relative bg-[#050505] border-t border-white/5 pt-16 pb-[25vw] md:pb-[18vw] flex flex-col justify-between overflow-hidden">
      {/* Top Section */}
      <div className="section-padding-x grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-5 relative z-10">
        {/* Info Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link href="/" className="flex items-center">
            {isLoading ? (
              <div className="w-36 md:w-44 lg:w-52 h-10 md:h-12 lg:h-14 bg-white/10 rounded-[8px] animate-pulse self-start" />
            ) : (
              <Image
                src={footer_image || Logo}
                alt="Pariah Logo"
                width={200}
                height={50}
                className="h-12 lg:h-14 xl:h-24 w-auto object-contain self-start"
                priority
              />
            )}
          </Link>
          <p className="text-secondary-gray font-outfit text-[16px] leading-relaxed max-w-sm">
            {footerText}
          </p>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Quick Link */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-outfit text-[18px] font-semibold tracking-wide">
              Quick Link
            </h4>
            <ul className="flex flex-col gap-3 text-secondary-gray text-[15px] font-medium font-outfit">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-white transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/collaborate"
                  className="hover:text-white transition-colors duration-200"
                >
                  Collaborate
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/careers"
                  className="hover:text-white transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          {socialLinks.length > 0 && (
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-outfit text-[18px] font-semibold tracking-wide">
                Social
              </h4>
              <ul className="flex flex-col gap-3 text-secondary-gray text-[15px] font-medium font-outfit">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-outfit text-[18px] font-semibold tracking-wide">
              Legal
            </h4>
            <ul className="flex flex-col gap-3 text-secondary-gray text-[15px] font-medium font-outfit">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms & condition
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright/Rights Reserved section */}
      {/* <div className="section-padding-x mt-12 mb-8 relative z-10 border-t border-white/5 pt-8 text-secondary-gray font-outfit text-[14px]">
        <p>{rightsReserved}</p>
      </div> */}

      {/* Big Logo Section (Bottom) */}
      <div className="w-full select-none pointer-events-none absolute bottom-0 left-0 right-0 z-0">
        <Image
          src={footerBottomLogo}
          alt="Pariah Big Logo"
          width={1920}
          height={380}
          className="w-full h-auto object-cover object-bottom scale-y-105"
          priority
        />
      </div>
    </footer>
  );
};

export default Footer;
