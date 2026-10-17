"use client";

import React from "react";
import { Eye, ShieldCheck, UserCheck, RefreshCw, Award, HeartHandshake } from "lucide-react";

const REASONS = [
  {
    icon: Eye,
    title: "Free Comprehensive Eye Test",
    description: "Our in-house certified optometrists use computerized German wavefront diagnostics across 14 clinical vision checkpoints.",
  },
  {
    icon: ShieldCheck,
    title: "100% Original Certified Brands",
    description: "Direct official partner for Luxottica, Safilo, Kering Eyewear, and Carl Zeiss. Every frame carries genuine manufacturer hologram credentials.",
  },
  {
    icon: UserCheck,
    title: "Master Opticians & Stylists",
    description: "Unrushed private consultations to balance optical axis alignment, vertex distance, and frame symmetry with your facial anatomy.",
  },
  {
    icon: RefreshCw,
    title: "Easy 14-Day Lens Adaptation",
    description: "If your progressive or digital lenses require power re-calibration or corridor adjustments, we remake them with zero dispute.",
  },
  {
    icon: Award,
    title: "Comprehensive 1-2 Year Warranty",
    description: "All designer frames and premium anti-reflective lens coatings include official manufacturer guarantee against manufacturing defects.",
  },
];

export default function WhyDemoOptics() {
  return (
    <section className="py-20 bg-[#F3ECE2] border-y border-[#EADFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              THE DEMOOPTICS PROMISE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
            Why Discerning Clients Choose DemoOptics
          </h2>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C]">
            We operate as an unhurried optical salon rather than a high-volume chain. Experience bespoke care, German precision, and authentic luxury.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#EADFD2] rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] mb-5">
                    <Icon className="w-5 h-5 text-[#B08968]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#2B2622] font-medium mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7C746C] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
