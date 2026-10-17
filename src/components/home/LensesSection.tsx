"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Calendar } from "lucide-react";
import { LENS_BRANDS } from "@/data/products";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";
import Eyebrow from "@/components/ui/Eyebrow";

export default function LensesSection() {
  return (
    <section
      id="lenses"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#F7F3EC]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>OPHTHALMIC EXCELLENCE</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
              Precision Prescription Lenses
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7168] mt-3 max-w-xl">
              We fit exclusively certified German, French, and Japanese optical glass engineered to your exact corneal topography, reading posture, and digital screen distance.
            </p>
          </div>

          <Link
            href="/lenses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#14110F] hover:text-[#B89B6A] group"
          >
            <span>Explore All Lens Portfolios</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3 Major Brands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {LENS_BRANDS.map((item) => (
            <div
              key={item.brand}
              className="bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-8 flex flex-col justify-between hover:border-[#B89B6A]/50 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                {/* Brand Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-semibold text-[#B89B6A] bg-[#EDE5D8] px-3 py-1 rounded-[2px] border border-[#14110F]/8">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[#7A7168] uppercase font-mono tracking-wider">{item.country}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#14110F] font-normal mb-2">
                  {item.brand}
                </h3>
                <p className="text-xs text-[#7A7168] leading-relaxed mb-6 font-light">
                  {item.description}
                </p>

                {/* Starting Prices Box with tabular numbers */}
                <div className="bg-[#EDE5D8]/50 rounded-[2px] p-5 border border-[#14110F]/8 space-y-3 mb-6">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#14110F]/8">
                    <div>
                      <span className="block text-xs font-medium text-[#14110F]">Single Vision</span>
                      <span className="text-[10px] text-[#7A7168]">Digital & Anti-glare</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#7A7168] block">Starting from</span>
                      <span className="text-sm font-semibold text-[#14110F] tabular-nums">
                        ₹{item.singleVisionStarting.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="block text-xs font-medium text-[#14110F]">Progressive Multifocal</span>
                      <span className="text-[10px] text-[#7A7168]">Distortion-free Corridor</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#7A7168] block">Starting from</span>
                      <span className="text-sm font-semibold text-[#14110F] tabular-nums">
                        ₹{item.progressiveStarting.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Popular Technologies */}
                <div className="space-y-2 mb-6">
                  {item.popularTech.map((feat: string) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-[#14110F]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B6A] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#14110F]/8">
                <a
                  href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to consult with an optician about ${item.brand} prescription lenses.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[2px] text-[10px] uppercase tracking-[0.16em] font-medium border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#B89B6A]" />
                  <span>WhatsApp</span>
                </a>

                <Link
                  href="/book-eye-test"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[2px] text-[10px] uppercase tracking-[0.16em] font-medium bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-all duration-300"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Fitting</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
