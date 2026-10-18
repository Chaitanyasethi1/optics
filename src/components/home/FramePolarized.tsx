"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle, Shield } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { getProductEnquiryLink } from "@/data/config";

const POLARIZED_KEYS = [
  { key: "prod-polarized-his", tag: "FOR GENTLEMEN", gender: "Men" },
  { key: "prod-polarized-her", tag: "FOR LADIES", gender: "Women" },
  { key: "prod-polarized-kids", tag: "FOR JUNIORS", gender: "Kids" },
];

export default function FramePolarized() {
  const featured = POLARIZED_KEYS.map((k) => {
    const prod = PRODUCTS.find((p) => p.id === k.key);
    if (!prod) return null;
    return {
      ...prod,
      demographic: k.tag,
      targetGender: k.gender,
    };
  }).filter((p): p is (typeof PRODUCTS[0] & { demographic: string; targetGender: string }) => p !== null);

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#14110F] text-[#F7F3EC] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            GLARE-FREE HIGH DEFINITION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F3EC] font-normal tracking-tight">
            Polarized Solar Suite
          </h2>
        </div>
        <Link
          href="/sunglasses?lensFeature=Polarized"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#D4BE96] hover:text-[#B89B6A] transition-colors"
        >
          <span>View All Polarized</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Centered Cards Container */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-1 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 min-h-0 items-stretch">
        {featured.map((prod) => {
          const enquiryLink = getProductEnquiryLink(prod.name, prod.brand, prod.price);

          return (
            <div
              key={prod.id}
              className="group relative bg-[#2A2623] border border-white/10 rounded-[2px] p-4 sm:p-5 flex flex-col justify-between hover:border-[#B89B6A] transition-all duration-300"
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 rounded-[2px] bg-[#14110F] text-[#B89B6A] text-[9px] font-mono uppercase tracking-[0.2em] font-bold border border-[#B89B6A]/30">
                  {prod.demographic}
                </span>
                <span className="text-[10px] font-mono text-[#D4BE96]/60 uppercase tracking-widest flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#B89B6A]" />
                  99.9% Glare Free
                </span>
              </div>

              {/* Product Image Stage */}
              <Link
                href={`/products/${prod.slug}`}
                className="relative w-full flex-1 min-h-[140px] sm:min-h-[180px] max-h-[260px] bg-[#14110F]/60 rounded-[2px] overflow-hidden flex items-center justify-center p-4 mb-3 border border-white/5"
              >
                <Image
                  src={prod.images[0]}
                  alt={prod.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>

              {/* Metadata */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#B89B6A] font-semibold block mb-0.5">
                  {prod.brand}
                </span>
                <Link
                  href={`/products/${prod.slug}`}
                  className="block font-serif text-lg sm:text-xl text-[#F7F3EC] font-normal truncate hover:text-[#D4BE96] transition-colors mb-1"
                >
                  {prod.name}
                </Link>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#D4BE96]">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </span>
                  {prod.oldPrice && (
                    <span className="text-xs text-[#7A7168] line-through font-mono">
                      ₹{prod.oldPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                <Link
                  href={`/try-on?product=${prod.slug}`}
                  className="py-2.5 rounded-[2px] bg-[#14110F] text-[#F7F3EC] border border-[#B89B6A]/40 hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors text-center text-[10px] font-mono uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#B89B6A]" />
                  <span>Try On</span>
                </Link>

                <a
                  href={enquiryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-[2px] bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-colors text-center text-[10px] font-mono uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Enquire</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
