"use client";

import React from "react";
import { Eye, ShieldCheck, UserCheck, RefreshCw, Award } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

const REASONS = [
  {
    icon: Eye,
    title: "Complimentary 14-Step Eye Test",
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
    <section
      id="why-us"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#F7F3EC] border-y border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#B89B6A]" />
            <Eyebrow>THE DEMOOPTICS PROMISE</Eyebrow>
            <span className="w-6 h-[1px] bg-[#B89B6A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
            Why Discerning Clients Choose DemoOptics
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7168] mt-3">
            We operate as an unhurried optical salon rather than a high-volume chain. Experience bespoke care, German precision, and authentic luxury.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#EDE5D8]/40 border border-[#14110F]/8 rounded-[2px] p-8 flex flex-col justify-between hover:border-[#B89B6A]/50 transition-all duration-300 hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-[2px] bg-[#F7F3EC] border border-[#14110F]/10 flex items-center justify-center text-[#B89B6A] group-hover:bg-[#B89B6A] group-hover:text-[#14110F] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-[#7A7168]/60">0{idx + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#14110F] font-normal mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A7168] leading-relaxed font-light">
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
