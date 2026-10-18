"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { getProductEnquiryLink } from "@/data/config";

export default function FrameTitanium() {
  const titaniumProducts = PRODUCTS.filter((p) => p.isTitanium).slice(0, 4);

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#EDE5D8] text-[#14110F] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            AEROSPACE PRECISION · 1.8 GRAMS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14110F] font-normal tracking-tight">
            Titanium Collection
          </h2>
        </div>
        <Link
          href="/eyeglasses?material=Pure+Titanium"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#14110F] hover:text-[#B89B6A] transition-colors"
        >
          <span>View All 18 Titanium</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Split Layout: Left Big Feature Showcase, Right 2x2 Grid */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-0">
        {/* Left Column: Big Feature Image Card (5 of 12 cols) */}
        <div className="lg:col-span-5 relative rounded-[2px] overflow-hidden border border-[#14110F]/10 bg-[#14110F] flex flex-col justify-end p-6 sm:p-8 min-h-[220px] lg:min-h-0">
          <Image
            src="/images/titanium-showcase.jpg"
            alt="Sculptural Pure Titanium Frame on Pedestal"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          {/* Solid Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/60 to-transparent pointer-events-none" />

          {/* Badges and Callout */}
          <div className="relative z-10 text-white">
            <span className="inline-block px-2.5 py-1 rounded-[2px] bg-[#B89B6A] text-[#14110F] font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-2.5">
              FEATHERWEIGHT MASTERY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F7F3EC] leading-tight mb-2">
              Sabae Titanium & Austrian Silhouette
            </h3>
            <p className="text-xs text-[#D4BE96]/80 font-light leading-relaxed max-w-sm mb-4 hidden sm:block">
              Medical-grade Beta Titanium forged at 1,600°C. Hypoallergenic, corrosion-proof, and designed to disappear on the face.
            </p>
            <Link
              href="/eyeglasses?material=Pure+Titanium"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-[#F7F3EC] text-[#14110F] font-sans font-bold text-[11px] uppercase tracking-[0.16em] hover:bg-[#B89B6A] transition-colors duration-300"
            >
              <span>Explore Titanium Atelier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: 4 Products in 2x2 Grid (7 of 12 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-h-0">
          {titaniumProducts.map((prod) => {
            const enquiryLink = getProductEnquiryLink(prod.name, prod.brand, prod.price);

            return (
              <div
                key={prod.id}
                className="group relative bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-3 sm:p-4 flex flex-col justify-between hover:border-[#B89B6A] transition-all duration-300"
              >
                {/* Product Image Area */}
                <Link
                  href={`/products/${prod.slug}`}
                  className="relative w-full flex-1 min-h-[90px] sm:min-h-[120px] max-h-[160px] bg-[#EDE5D8]/50 rounded-[2px] overflow-hidden flex items-center justify-center p-3 mb-2"
                >
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                  {prod.discountPercent && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-[2px] bg-[#14110F] text-[#D4BE96] text-[8px] font-mono tracking-wider font-semibold">
                      -{prod.discountPercent}%
                    </span>
                  )}
                </Link>

                {/* Product Metadata */}
                <div>
                  <div className="flex items-center justify-between gap-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#B89B6A] font-semibold mb-0.5">
                    <span>{prod.brand}</span>
                    <span className="text-[#14110F]/40">{prod.specs.origin || "Japan"}</span>
                  </div>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="block font-serif text-base sm:text-lg text-[#14110F] font-normal truncate hover:text-[#B89B6A] transition-colors"
                  >
                    {prod.name}
                  </Link>
                  <div className="flex items-baseline gap-2 mt-0.5 mb-2">
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#14110F]">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                    {prod.oldPrice && (
                      <span className="text-[10px] text-[#7A7168] line-through font-mono">
                        ₹{prod.oldPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-[#14110F]/8 flex items-center justify-between gap-2">
                  <Link
                    href={`/try-on?product=${prod.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.15em] text-[#14110F] hover:text-[#B89B6A] font-medium"
                  >
                    <Sparkles className="w-3 h-3 text-[#B89B6A]" />
                    <span>Try On</span>
                  </Link>

                  <a
                    href={enquiryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.15em] text-[#14110F] hover:text-[#B89B6A] font-medium"
                  >
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    <span>WhatsApp</span>
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
