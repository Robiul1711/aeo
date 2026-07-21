"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { useGetFooterCMSQuery } from "@/redux/api/apiSlice";

const AuthLayout = ({ children }) => {
  const { data: response } = useGetFooterCMSQuery();
  const header_image = response?.data?.content?.header_image;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-[620px] border border-transparent rounded-[45px] bg-linear-to-br from-[#080509] via-[#1a171c] to-[#080509] p-4 sm:p-10 md:p-12 xl:p-16 shadow-custom flex flex-col items-center"
        style={{
          backgroundClip: "padding-box",
        }}
      >
        {/* Gradient border using after pseudo-element */}
        <div
          className="absolute -inset-px rounded-[45px] -z-10"
          style={{
            background: "linear-gradient(71deg, #110e0e, #afa220, #110e0e)",
          }}
        ></div>

        {/* Clickable Logo leading to Home */}
        <Link href="/" className="mb-6 inline-block hover:opacity-85 transition-opacity">
          <Image
            src={header_image || Logo}
            alt="Pariah Logo"
            width={200}
            height={50}
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
