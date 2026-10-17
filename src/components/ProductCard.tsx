"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { getProductEnquiryLink } from "@/data/config";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const enquiryLink = getProductEnquiryLink(product.name, product.brand, product.price);

  return (
    <div className="group relative bg-white border border-[#EADFD2] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container with hover transition to second image */}
      <div className="relative aspect-[4/3] w-full bg-[#FAF7F2] p-6 flex items-center justify-center overflow-hidden border-b border-[#EADFD2]/60">
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.discountPercent && (
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full bg-[#7A5A43] text-white shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.tags && product.tags.length > 0 && (
            <span className="px-2.5 py-1 text-[10px] uppercase font-semibold tracking-wider rounded-full bg-[#F3ECE2] border border-[#EADFD2] text-[#7A5A43]">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Primary Image */}
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover object-center rounded-xl transition-all duration-500 ease-out group-hover:scale-105 ${
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center rounded-xl absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
              />
            )}
          </div>
        </Link>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Brand & Shape */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold text-[11px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-[#7C746C] capitalize">
              {product.specs.shape}
            </span>
          </div>

          {/* Product Name in Serif */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-lg text-[#2B2622] group-hover:text-[#7A5A43] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Spec preview snippet */}
          <p className="text-xs text-[#7C746C] mt-1 line-clamp-1">
            {product.specs.material} • {product.specs.gender}
          </p>

          {/* Price with strikethrough & discount */}
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-base font-semibold text-[#2B2622]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#7C746C] line-through">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.category === "lenses" && (
              <span className="text-[11px] text-[#7C746C]">starting</span>
            )}
          </div>
        </div>

        {/* Action Buttons (Strictly NO Cart / NO Buy Now) */}
        <div className="mt-5 pt-4 border-t border-[#EADFD2]/70 grid grid-cols-2 gap-2">
          {/* Primary Action: Enquire on WhatsApp */}
          <a
            href={enquiryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-[11px] font-sans uppercase tracking-[0.1em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-all duration-300 shadow-xs"
            title="Inquire directly with our store optician via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* Secondary Action: View Details */}
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-full text-[11px] font-sans uppercase tracking-[0.1em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-all duration-300"
          >
            <span className="truncate">Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
