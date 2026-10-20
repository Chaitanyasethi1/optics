"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Calendar, Sparkles, Check, ArrowUpRight } from "lucide-react";
import { LENS_BRANDS } from "@/data/products";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";
import Eyebrow from "@/components/ui/Eyebrow";
import PriceReveal from "@/components/PriceReveal";

export default function LensesSection() {
  return (
    <section
      id="lenses"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-10 sm:py-12 xl:py-14 bg-[#F7F3EC] border-y border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>HAUTE OPHTHALMIC DISPENSARY • INDIRANAGAR ATELIER</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#14110F] font-normal tracking-tight">
              Precision <span className="font-serif italic font-normal text-[#B89B6A]">Prescription</span> Lenses
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] sm:text-xs text-[#7A7168]">
              <span className="text-[#B89B6A] font-bold tracking-wider">✦ German, French & Japanese Optical Laboratories</span>
              <span className="text-[#14110F]/30">•</span>
              <span className="font-medium text-[#14110F]/80">14-Step Corneal Wavefront Topography</span>
              <span className="text-[#14110F]/30">•</span>
              <span className="font-medium text-[#14110F]/80">0.01D Precision Freeform Surfacing</span>
            </div>
          </div>

          <Link
            href="/lenses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#14110F] hover:text-[#B89B6A] group shrink-0"
          >
            <span>Explore All Lens Portfolios</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3 Major Brands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          {LENS_BRANDS.map((item) => (
            <div
              key={item.brand}
              className="group relative bg-[#FFFFFF] border border-[#14110F]/12 rounded-[2px] overflow-hidden flex flex-col justify-between hover:border-[#B89B6A] transition-all duration-500 hover:shadow-2xl"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-[#14110F] border-b border-[#14110F]/8">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={`${item.brand} Precision Optical Lenses`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                  )}
                  {/* Subtle luxury vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/90 via-[#14110F]/40 to-[#14110F]/25" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 text-[9px] uppercase font-mono font-medium tracking-[0.16em] bg-[#14110F]/90 backdrop-blur-xs text-[#B89B6A] border border-[#B89B6A]/40 shadow-sm">
                      {item.origin || item.country}
                    </span>
                    <span className="text-[9px] text-[#F7F3EC] uppercase font-sans tracking-[0.18em] px-2.5 py-1 bg-[#14110F]/80 backdrop-blur-xs border border-white/10 font-medium">
                      {item.seal || "CERTIFIED"}
                    </span>
                  </div>

                  {/* Coating highlight at bottom of image */}
                  {item.coatingBadge && (
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#F7F3EC] tracking-wide font-normal drop-shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#B89B6A] shrink-0" />
                        <span className="truncate">{item.coatingBadge}</span>
                      </div>
                      <span className="text-[9px] uppercase font-mono text-[#B89B6A] tracking-wider shrink-0 bg-[#14110F]/60 px-1.5 py-0.5 border border-[#B89B6A]/20">
                        9-LAYER AR
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Details Body */}
                <div className="p-4 sm:p-5">
                  {/* Brand Header */}
                  <div className="flex items-baseline justify-between mb-0.5">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#14110F] font-medium tracking-tight">
                      {item.brand}
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#B89B6A] font-bold">
                      {item.indexRange ? "1.50 - 1.74" : "FREEFORM"}
                    </span>
                  </div>

                  <p className="text-[10.5px] uppercase font-sans tracking-[0.22em] text-[#7A7168] mb-2 font-bold">
                    {item.tagline || item.fullName}
                  </p>
                  
                  <p className="text-[11.5px] text-[#7A7168] leading-relaxed mb-3 font-normal line-clamp-2">
                    {item.description}
                  </p>

                  {/* Bespoke Optical Technology Pills (Replaces boring checkbox lists) */}
                  <div className="mb-3.5">
                    <span className="text-[9.5px] uppercase tracking-[0.22em] text-[#14110F]/70 block mb-1.5 font-bold">
                      Patented Technologies
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {item.popularTech.map((feat: string) => (
                        <div
                          key={feat}
                          className="flex items-center gap-1 px-2 py-1 bg-[#EDE5D8]/40 border border-[#14110F]/8 rounded-[1px] text-[10px] text-[#14110F] font-sans font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Luxury Investment Plaque (Pricing) */}
                  <div className="bg-[#EDE5D8]/60 rounded-[2px] p-3 border border-[#B89B6A]/30 space-y-1.5 mb-3.5 shadow-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#14110F]/8">
                      <div>
                        <span className="block text-[11px] font-bold text-[#14110F]">Single Vision</span>
                        <span className="text-[9px] text-[#7A7168] font-medium">Digital Wavefront & Anti-Glare</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-[#7A7168] block uppercase font-mono tracking-wider mb-0.5">Starting from</span>
                        <PriceReveal
                          id={`lens-sv-${item.brand.toLowerCase()}`}
                          price={item.singleVisionStarting}
                          productName={`${item.brand} Single Vision Lenses`}
                          size="xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="block text-[11px] font-bold text-[#14110F]">Progressive Multifocal</span>
                        <span className="text-[9px] text-[#7A7168] font-medium">Distortion-Free Custom Corridor</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-[#7A7168] block uppercase font-mono tracking-wider mb-0.5">Starting from</span>
                        <PriceReveal
                          id={`lens-prog-${item.brand.toLowerCase()}`}
                          price={item.progressiveStarting}
                          productName={`${item.brand} Progressive Lenses`}
                          size="xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[#14110F]/8">
                  <a
                    href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to consult with an optician about ${item.brand} prescription lenses.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-[2px] text-[10px] uppercase tracking-[0.18em] font-bold border border-[#14110F]/25 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
                    title="Inquire directly with our store optician via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#B89B6A]" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    href="/book-eye-test"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-[2px] text-[10px] uppercase tracking-[0.18em] font-bold bg-[#B89B6A] text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Fitting</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Provenance Guarantee Strip */}
        <div className="mt-6 pt-4 border-t border-[#14110F]/8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A7168] gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89B6A]" />
            <span>All lenses fitted with computerized 3D pupil centration & 30-Day Adaptation Guarantee.</span>
          </div>
          <Link
            href="/book-eye-test"
            className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.2em] text-[#14110F] hover:text-[#B89B6A] font-medium"
          >
            <span>Book Complimentary 14-Step Corneal Examination</span>
            <ArrowUpRight className="w-3 h-3 text-[#B89B6A]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
