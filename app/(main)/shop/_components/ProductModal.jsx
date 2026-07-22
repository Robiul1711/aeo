"use client";

import React from "react";
import Image from "next/image";
import Modal from "@/components/common/Modal";
import { FiInfo } from "react-icons/fi";
import { useGetProductDetailsQuery } from "@/redux/api/apiSlice";

const ProductModal = ({ product, open, onClose }) => {
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetProductDetailsQuery(product?.id, {
    skip: !product?.id,
  });

  if (!product) return null;

  // Check if fetched data matches the current product ID
  const isDataMatching =
    response?.data && String(response.data.id) === String(product.id);
  const showSkeleton = isLoading || isFetching || !isDataMatching;

  const productDetails = isDataMatching ? response.data : product;

  const title =
    productDetails.title ||
    productDetails.name ||
    product.name ||
    product.title;
  const image = productDetails.image || product.image;
  const tag = productDetails.tag || "In-Store Exclusive";
  const rawPrice = productDetails.price || product.price;
  const price = rawPrice
    ? String(rawPrice).includes("$")
      ? rawPrice
      : `$${rawPrice}`
    : "";
  const description =
    productDetails.short_description ||
    productDetails.description ||
    product.description;
  const note =
    productDetails.note ||
    "This item is part of our physical collection at Pariah and cannot be purchased online. Visit us to purchase in person or get in touch for details.";

  return (
    <Modal
      open={open}
      onClose={onClose}
      containerClassName="max-w-4xl bg-[#0D0D0D]/95 border border-white/10 rounded-[24px] shadow-[0_0_50px_rgba(243,183,5,0.15)] overflow-hidden"
    >
      {showSkeleton ? (
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          {/* Left Side: Image Skeleton */}
          <div className="md:col-span-6 relative aspect-5/6 md:aspect-auto md:min-h-125 w-full bg-white/5 animate-pulse" />

          {/* Right Side: Content Skeleton */}
          <div className="md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-linear-to-br from-[#0D0D0D] to-[#141414]">
            <div className="flex flex-col gap-4">
              {/* Badge Skeleton */}
              <div className="w-36 h-6 bg-white/10 rounded-full animate-pulse" />
              {/* Title Skeleton */}
              <div className="w-3/4 h-10 bg-white/10 rounded-xl animate-pulse mt-2" />
              {/* Price Skeleton */}
              <div className="w-24 h-8 bg-white/10 rounded-lg animate-pulse" />
              {/* Divider */}
              <div className="h-px w-full bg-white/10 my-4" />
              {/* Description Skeleton */}
              <div className="flex flex-col gap-2.5">
                <div className="w-full h-4 bg-white/10 rounded-md animate-pulse" />
                <div className="w-11/12 h-4 bg-white/10 rounded-md animate-pulse" />
                <div className="w-4/5 h-4 bg-white/10 rounded-md animate-pulse" />
              </div>
            </div>

            {/* Bottom Notice Skeleton */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse h-20" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          {/* Left Side: Large product image */}
          <div className="md:col-span-6 relative aspect-5/6 md:aspect-auto md:min-h-125 w-full bg-[#121212] overflow-hidden group">
            {image && (
              <Image
                src={image?.src || image}
                alt={title || "Product Showcase"}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 500px"
                priority
              />
            )}
            {/* Elegant dark overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Right Side: Product Details & CTA */}
          <div className="md:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-linear-to-br from-[#0D0D0D] to-[#141414] text-white">
            <div>
              {/* Elegant Badge for Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-outfit text-xs font-semibold tracking-wider uppercase select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {tag}
              </div>

              {/* Product Name */}
              <h2 className="font-playfair text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-white mt-4 select-none">
                {title}
              </h2>

              {/* Price tag */}
              {price && (
                <p className="font-outfit text-2xl font-semibold text-primary mt-2">
                  {price}
                </p>
              )}

              {/* Elegant divider */}
              <div className="h-px w-full bg-linear-to-r from-primary/30 via-white/10 to-transparent my-6" />

              {/* Description */}
              {description && (
                <p className="font-outfit text-base text-secondary-gray leading-relaxed font-light mt-4">
                  {description}
                </p>
              )}
            </div>

            <div>
              {/* physical notice box */}
              <div className="mt-8 p-4 rounded-xl bg-white/2 border border-white/5 flex items-start gap-3">
                <FiInfo className="text-primary text-lg shrink-0 mt-0.5" />
                <p className="font-outfit text-xs sm:text-sm text-secondary-gray/80 leading-relaxed font-normal">
                  {note}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ProductModal;
