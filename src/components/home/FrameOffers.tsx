"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle, Tag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { getProductEnquiryLink } from "@/data/config";

export default function FrameOffers() {
  const offerProducts = PRODUCTS.filter((p) => (p.discountPercent || 0) > 0)
    .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
    .slice(0, 3);

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#EDE5D8] text-[#14110F] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            PRIVATE ATELIER SALE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14110F] font-normal tracking-tight">
            Curated Showroom Privileges
          </h2>
        </div>
        <Link
          href="/offers"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#14110F] hover:text-[#B89B6A] transition-colors"
        >
          <span>All Seasonal Offers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Content: Left Big Typographic Statement, Right 3 Products */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-1 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 min-h-0 items-stretch">
        {/* Left Column: Big Typographic Statement (4 of 12 cols) */}
        <div className="lg:col-span-4 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#14110F] text-[#D4BE96] text-[9px] font-mono uppercase tracking-[0.2em] font-bold mb-4">
              <Tag className="w-3 h-3 text-[#B89B6A]" />
              <span>LIMITED CURATION</span>
            </div>

            <div className="font-serif text-5xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-[#14110F] leading-none mb-2">
              40<span className="text-3xl sm:text-4xl font-sans font-light text-[#B89B6A]">%</span>
              <span className="block text-2xl sm:text-3xl uppercase tracking-widest text-[#B89B6A] mt-1 font-sans font-medium">
                OFF
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#14110F] font-normal leading-snug mt-3 mb-3">
              Maison Eyewear at Exclusive Indiranagar Privileges
            </h3>

            <p className="text-xs text-[#7A7168] font-light leading-relaxed mb-4 hidden sm:block">
              Enjoy complimentary Zeiss lens fittings and genuine manufacturer warranty across our select seasonal archives.
            </p>
          </div>

          <div className="pt-4 border-t border-[#14110F]/10">
            <Link
              href="/offers"
              className="w-full py-3 rounded-[2px] bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors duration-300 font-sans font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2"
            >
              <span>Explore All Offers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: 3 Discounted Product Cards (8 of 12 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-h-0 items-stretch">
          {offerProducts.map((prod) => {
            const enquiryLink = getProductEnquiryLink(prod.name, prod.brand, prod.price);

            return (
              <div
                key={prod.id}
                className="group relative bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-3 sm:p-4 flex flex-col justify-between hover:border-[#B89B6A] transition-all duration-300"
              >
                {/* Discount Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#B89B6A] text-[#14110F] text-[9px] font-mono tracking-wider font-bold">
                    SAVE {prod.discountPercent}%
                  </span>
                  <span className="text-[9px] font-mono text-[#7A7168] uppercase tracking-wider">
                    {prod.specs.shape || "Classic"}
                  </span>
                </div>

                {/* Product Image Stage */}
                <Link
                  href={`/products/${prod.slug}`}
                  className="relative w-full flex-1 min-h-[110px] sm:min-h-[140px] max-h-[180px] bg-[#EDE5D8]/50 rounded-[2px] overflow-hidden flex items-center justify-center p-3 mb-2"
                >
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </Link>

                {/* Metadata */}
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#B89B6A] font-semibold block mb-0.5">
                    {prod.brand}
                  </span>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="block font-serif text-base sm:text-lg text-[#14110F] font-normal truncate hover:text-[#B89B6A] transition-colors mb-1"
                  >
                    {prod.name}
                  </Link>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-base font-semibold text-[#14110F]">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                    {prod.oldPrice && (
                      <span className="text-xs text-[#7A7168] line-through font-mono">
                        ₹{prod.oldPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-[#14110F]/8 grid grid-cols-2 gap-2">
                  <Link
                    href={`/try-on?product=${prod.slug}`}
                    className="py-1.5 rounded-[2px] bg-[#14110F]/5 hover:bg-[#B89B6A] hover:text-[#14110F] text-[#14110F] text-center text-[9px] font-mono uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#B89B6A]" />
                    <span>Try On</span>
                  </Link>

                  <a
                    href={enquiryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 rounded-[2px] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white text-center text-[9px] font-mono uppercase tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-2.5 h-2.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
