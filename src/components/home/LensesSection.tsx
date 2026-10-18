"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, MessageCircle, Calendar, Sparkles } from "lucide-react";
import { LENS_BRANDS } from "@/data/products";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";
import Eyebrow from "@/components/ui/Eyebrow";

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
              <Eyebrow>OPHTHALMIC EXCELLENCE • AUTHORIZED DISPENSARY</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#14110F] font-normal tracking-tight">
              Precision Prescription Lenses
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] sm:text-xs text-[#7A7168]">
              <span className="text-[#B89B6A] font-medium tracking-wide">✦ German, French & Japanese Optical Laboratories</span>
              <span className="text-[#14110F]/30">•</span>
              <span>Sub-Micron Corneal Topography Mapping</span>
              <span className="text-[#14110F]/30">•</span>
              <span>Custom Digital Corridor Surfacing</span>
            </div>
          </div>

          <Link
            href="/lenses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#14110F] hover:text-[#B89B6A] group shrink-0"
          >
            <span>Explore All Lens Portfolios</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3 Major Brands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {LENS_BRANDS.map((item) => (
            <div
              key={item.brand}
              className="group relative bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] overflow-hidden flex flex-col justify-between hover:border-[#B89B6A]/60 transition-all duration-500 hover:shadow-xl"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-[#14110F]/5 border-b border-[#14110F]/8">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={`${item.brand} Precision Optical Lenses`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                  {/* Subtle luxury vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/85 via-[#14110F]/35 to-[#14110F]/20" />

                  {/* Badges on top of image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 text-[9px] uppercase font-sans font-semibold tracking-[0.16em] bg-[#14110F]/90 backdrop-blur-xs text-[#B89B6A] border border-[#B89B6A]/30">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-[#F7F3EC] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#14110F]/70 backdrop-blur-xs border border-white/10">
                      {item.country}
                    </span>
                  </div>

                  {/* Coating highlight at bottom of image */}
                  {item.coatingBadge && (
                    <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 text-[10px] font-sans text-[#F7F3EC]/90 tracking-wide font-light">
                      <Sparkles className="w-3 h-3 text-[#B89B6A]" />
                      <span>{item.coatingBadge}</span>
                    </div>
                  )}
                </div>

                {/* Card Details Body */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#14110F] font-normal">
                      {item.brand}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89B6A] font-medium font-sans">
                      Certified
                    </span>
                  </div>
                  
                  <p className="text-[11px] sm:text-xs text-[#7A7168] leading-relaxed mb-3.5 font-light line-clamp-2">
                    {item.description}
                  </p>

                  {/* Starting Prices Box with tabular numbers */}
                  <div className="bg-[#EDE5D8]/50 rounded-[2px] p-3 border border-[#14110F]/8 space-y-2 mb-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-[#14110F]/8">
                      <div>
                        <span className="block text-[11px] font-medium text-[#14110F]">Single Vision</span>
                        <span className="text-[9px] text-[#7A7168]">Digital & Anti-glare</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-[#7A7168] block">Starting from</span>
                        <span className="text-xs sm:text-sm font-semibold text-[#14110F] tabular-nums">
                          ₹{item.singleVisionStarting.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="block text-[11px] font-medium text-[#14110F]">Progressive Multifocal</span>
                        <span className="text-[9px] text-[#7A7168]">Distortion-free Corridor</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-[#7A7168] block">Starting from</span>
                        <span className="text-xs sm:text-sm font-semibold text-[#14110F] tabular-nums">
                          ₹{item.progressiveStarting.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Popular Technologies */}
                  <div className="space-y-1.5 mb-2">
                    {item.popularTech.map((feat: string) => (
                      <div key={feat} className="flex items-center gap-2 text-[11px] text-[#14110F]">
                        <CheckCircle2 className="w-3 h-3 text-[#B89B6A] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#14110F]/8">
                  <a
                    href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to consult with an optician about ${item.brand} prescription lenses.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-[2px] text-[10px] uppercase tracking-[0.15em] font-medium border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
                    title="Inquire directly with our store optician via WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3 text-[#B89B6A]" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    href="/book-eye-test"
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-[2px] text-[10px] uppercase tracking-[0.15em] font-medium bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-all duration-300"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Fitting</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
