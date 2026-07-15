"use client";

import React from "react";
import Image from "next/image";
import Modal from "@/components/common/Modal";
import { GlowButton } from "@/components/common/GlowButton";
import { FiMapPin, FiInfo } from "react-icons/fi";

const ProductModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      containerClassName="max-w-4xl bg-[#0D0D0D]/95 border border-white/10 rounded-[24px] shadow-[0_0_50px_rgba(243,183,5,0.15)] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        {/* Left Side: Large product image */}
        <div className="md:col-span-6 relative aspect-[5/6] md:aspect-auto md:min-h-[500px] w-full bg-[#121212] overflow-hidden group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-w-768px) 100vw, 500px"
            priority
          />
          {/* Elegant dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Right Side: Product Details & CTA */}
        <div className="md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-[#0D0D0D] to-[#141414] text-white">
          <div>
            {/* Elegant Badge for In-Store Exclusive */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-outfit text-xs font-semibold tracking-wider uppercase select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              In-Store Exclusive
            </div>

            {/* Product Name */}
            <h2 className="font-playfair text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-white mt-4 select-none">
              {product.name}
            </h2>

            {/* Price tag */}
            <p className="font-outfit text-2xl font-semibold text-primary mt-2">
              {product.price}
            </p>

            {/* Elegant divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 via-white/10 to-transparent my-6" />

            {/* Description */}
            <p className="font-outfit text-base text-secondary-gray leading-relaxed font-light mt-4">
              {product.description}
            </p>
          </div>

          <div>
            {/* physical notice box */}
            <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
              <FiInfo className="text-primary text-lg shrink-0 mt-0.5" />
              <p className="font-outfit text-xs sm:text-sm text-secondary-gray/80 leading-relaxed font-normal">
                This item is part of our physical collection at Pariah and cannot be purchased online. Visit us to purchase in person or get in touch for details.
              </p>
            </div>

            {/* CTA action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
              <GlowButton href="/contact" className="w-full sm:w-auto flex-1 text-center">
                Inquire Online
              </GlowButton>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-[12px] border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-outfit text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <FiMapPin className="text-primary" />
                Find Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
