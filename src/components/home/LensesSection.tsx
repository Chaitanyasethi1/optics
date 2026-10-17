"use client";

import React from "react";
import Link from "next/link";
import { Eye, ShieldCheck, CheckCircle2, MessageCircle, Calendar } from "lucide-react";
import { LENS_BRANDS } from "@/data/products";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";

export default function LensesSection() {
  return (
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <Eye className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              OPHTHALMIC EXCELLENCE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
            Precision Prescription Lenses
          </h2>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C]">
            We fit exclusively certified German, French, and Japanese optical glass engineered to your exact corneal topography, reading posture, and digital screen distance.
          </p>
        </div>

        {/* 3 Major Brands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {LENS_BRANDS.map((item) => (
            <div
              key={item.brand}
              className="bg-white border border-[#EADFD2] rounded-2xl p-7 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Brand Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-bold text-[#B08968] bg-[#F3ECE2] px-3 py-1 rounded-full border border-[#EADFD2]">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[#7C746C]">{item.country}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#2B2622] font-medium mb-2">
                  {item.brand}
                </h3>
                <p className="text-xs text-[#7C746C] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Starting Prices Box */}
                <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#EADFD2]/70 space-y-3 mb-6">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EADFD2]/60">
                    <div>
                      <span className="block text-xs font-medium text-[#2B2622]">Single Vision</span>
                      <span className="text-[10px] text-[#7C746C]">Digital & Anti-glare</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#7C746C] block">starting from</span>
                      <span className="text-sm font-semibold text-[#7A5A43]">
                        ₹{item.singleVisionStarting.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-medium text-[#2B2622]">Progressive (Multifocal)</span>
                      <span className="text-[10px] text-[#7C746C]">Wide corridor zero-swim</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#7C746C] block">starting from</span>
                      <span className="text-sm font-semibold text-[#7A5A43]">
                        ₹{item.progressiveStarting.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Technologies */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-sans uppercase tracking-[0.12em] font-semibold text-[#7A5A43] block">
                    Proprietary Innovations
                  </span>
                  <div className="space-y-1.5">
                    {item.popularTech.map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-xs text-[#2B2622]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B08968] shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquire Button */}
              <div className="pt-4 border-t border-[#EADFD2]">
                <a
                  href={getWhatsAppLink(`Hello ${STORE_NAME}, I would like a consultation regarding ${item.brand} prescription lenses for my power.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Inquire on {item.brand} Lenses
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Banner CTA for 14-Step Precision Eye Test */}
        <div className="bg-[#F3ECE2] border border-[#EADFD2] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl text-[#2B2622] font-medium">
              Not sure which lens suits your screen habits?
            </h4>
            <p className="text-xs sm:text-sm text-[#7C746C]">
              Book our complimentary 14-step eye test. Our optometrists will measure pupil diameter, corneal curvature, and reading convergence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/book-eye-test"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.14em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Eye Test</span>
            </Link>
            <Link
              href="/lenses"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.14em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
            >
              <span>View Lens Catalogue</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
