"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowUpRight, Sparkles, Glasses } from "lucide-react";
import { Product } from "@/types";
import { getProductEnquiryLink } from "@/data/config";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const enquiryLink = getProductEnquiryLink(product.name, product.brand, product.price);

  return (
    <div
      className="group relative bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] overflow-hidden hover:border-[#B89B6A]/50 transition-all duration-500 flex flex-col justify-between hover:shadow-lg"
      data-cursor="VIEW"
    >
      {/* Top Image Container: 4:5 portrait luxury aspect ratio */}
      <div className="relative aspect-[4/5] w-full bg-[#EDE5D8]/40 p-6 sm:p-8 flex items-center justify-center overflow-hidden border-b border-[#14110F]/8">
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          {product.discountPercent && (
            <span className="px-2.5 py-0.5 text-[9px] uppercase font-mono font-medium tracking-[0.15em] bg-[#14110F] text-[#B89B6A] border border-[#B89B6A]/30">
              {product.discountPercent}% PRIVILEGE
            </span>
          )}
          {product.tags && product.tags.length > 0 && (
            <span className="px-2.5 py-0.5 text-[9px] uppercase font-sans font-medium tracking-[0.15em] bg-[#F7F3EC]/90 backdrop-blur-xs border border-[#14110F]/10 text-[#7A7168]">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Quick Try-On Pill Button in Top Right */}
        {(product.category === "sunglasses" || product.category === "eyeglasses") && (
          <Link
            href={`/try-on?product=${product.slug}`}
            className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-sans font-medium bg-[#14110F]/80 backdrop-blur-xs text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#B89B6A]/30 transition-all duration-300 opacity-90 group-hover:opacity-100 shadow-sm"
            title="Experience live webcam try-on"
            data-cursor="TRY ON"
          >
            <Glasses className="w-3 h-3 text-[#B89B6A] group-hover:text-[#14110F]" />
            <span className="hidden sm:inline">Try On</span>
          </Link>
        )}

        {/* Primary Image Link */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full block"
          tabIndex={-1}
        >
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                product.images[1] ? "group-hover:opacity-0" : ""
              } ${imageLoaded ? "opacity-100" : "opacity-90"}`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Second Alternate Image on Hover */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            )}
          </div>
        </Link>
      </div>

      {/* Content Details */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-[#F7F3EC]">
        <div>
          {/* Brand & Shape */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-sans uppercase tracking-[0.24em] text-[#B89B6A] font-medium text-[10px]">
              {product.brand}
            </span>
            <span className="text-[10px] text-[#7A7168] uppercase tracking-[0.1em]">
              {product.specs.shape}
            </span>
          </div>

          {/* Product Name in Serif with thin champagne underline on hover */}
          <Link href={`/product/${product.slug}`} className="block group/title">
            <h3 className="font-serif text-lg sm:text-xl text-[#14110F] font-normal leading-snug line-clamp-1 relative inline-block">
              {product.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B89B6A] transition-all duration-300 group-hover/title:w-full" />
            </h3>
          </Link>

          {/* Spec preview snippet */}
          <p className="text-[11px] text-[#7A7168] mt-1.5 line-clamp-1 tracking-wide">
            {product.specs.material} • {product.specs.gender}
          </p>

          {/* Price with tabular numbers & muted strikethrough */}
          <div className="flex items-baseline gap-2.5 mt-3 pt-2 border-t border-[#14110F]/6">
            <span className="text-base font-sans font-medium text-[#14110F] tabular-nums tracking-tight">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#7A7168]/70 line-through tabular-nums">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.category === "lenses" && (
              <span className="text-[10px] uppercase tracking-wider text-[#7A7168]">
                from
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Minimal Outlined/Ghost Luxury Buttons (Strictly NO Cart) */}
        <div className="mt-5 pt-3 border-t border-[#14110F]/8 grid grid-cols-2 gap-2">
          {/* WhatsApp Inquire */}
          <a
            href={enquiryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[2px] text-[10px] font-sans uppercase tracking-[0.16em] font-medium border border-[#14110F]/20 text-[#14110F] hover:border-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
            title="Inquire directly with our store optician via WhatsApp"
          >
            <MessageCircle className="w-3 h-3 text-[#B89B6A]" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* View Details */}
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-[2px] text-[10px] font-sans uppercase tracking-[0.16em] font-medium border border-[#B89B6A] text-[#14110F] hover:bg-[#B89B6A] hover:text-[#14110F] transition-all duration-300"
          >
            <span className="truncate">Details</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
