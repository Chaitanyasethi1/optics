"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import PriceReveal from "@/components/PriceReveal";

interface LensMaison {
  name: string;
  country: string;
  established: string;
  flagship: string;
  badge: string;
  priceFrom: number;
  highlight: string;
  clinicalFeatures: string[];
  href: string;
}

const LENS_HOUSES: LensMaison[] = [
  {
    name: "ZEISS",
    country: "Oberkochen, Germany",
    established: "Est. 1846",
    flagship: "SmartLife & DuraVision Platinum",
    badge: "PRECISION DIGITAL",
    priceFrom: 4500,
    highlight:
      "Engineered for modern multi-screen connected lifestyles. Micro-tailored to ocular anatomy with 0.01D wavefront accuracy.",
    clinicalFeatures: [
      "SmartLife connected-device focal zone",
      "DuraVision Platinum diamond hardness",
      "Full UV400 sunglass-level clear shield",
      "Free 14-step corneal wavefront fitting",
    ],
    href: "/lenses?brand=Zeiss",
  },
  {
    name: "ESSILOR",
    country: "Charenton-le-Pont, France",
    established: "Est. 1849",
    flagship: "Varilux Comfort Max & Crizal",
    badge: "PROGRESSIVE BENCHMARK",
    priceFrom: 3800,
    highlight:
      "The inventors of the progressive lens. Seamless fluid transitions from infinity distance to intimate reading without swim effect.",
    clinicalFeatures: [
      "Flex Optim ergonomic posture freedom",
      "Crizal Sapphire multi-angular reflection cut",
      "Transitions Gen S responsive photochromic",
      "Instant adaptation guarantee in 30 days",
    ],
    href: "/lenses?brand=Essilor",
  },
  {
    name: "HOYA",
    country: "Tokyo, Japan",
    established: "Est. 1941",
    flagship: "Sync III & Hi-Vision LongLife",
    badge: "DIGITAL RELIEF",
    priceFrom: 3200,
    highlight:
      "Japanese ergonomic innovation. Incorporates micro-boost accommodative power to relieve screen fatigue and dry eye symptoms.",
    clinicalFeatures: [
      "Sync III digital accommodation relief",
      "Hi-Vision LongLife peel-proof guarantee",
      "MiyoSmart clinical myopia progression defense",
      "Ultra-tough substrate impact resistance",
    ],
    href: "/lenses?brand=Hoya",
  },
];

export default function FrameLenses() {
  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#F7F3EC] text-[#14110F] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            CLINICAL OPHTHALMIC LABORATORY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14110F] font-normal tracking-tight">
            Precision Prescription Lenses
          </h2>
        </div>
        <Link
          href="/lenses"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#14110F] hover:text-[#B89B6A] transition-colors"
        >
          <span>Explore All Lens Solutions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Equal Columns */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-1 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 min-h-0 items-stretch">
        {LENS_HOUSES.map((house) => (
          <div
            key={house.name}
            className="group relative bg-[#EDE5D8] border border-[#14110F]/10 rounded-[2px] p-5 sm:p-6 flex flex-col justify-between hover:border-[#B89B6A] transition-all duration-300"
          >
            {/* Header / Brand */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-[2px] bg-[#14110F] text-[#D4BE96] text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
                  {house.badge}
                </span>
                <span className="text-[10px] font-mono text-[#7A7168] uppercase tracking-wider">
                  {house.country}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#14110F] font-normal tracking-tight mb-1">
                {house.name}
              </h3>
              <div className="text-xs font-mono text-[#B89B6A] uppercase tracking-wider font-semibold mb-3">
                {house.flagship}
              </div>

              <p className="text-xs text-[#2A2623] font-light leading-relaxed mb-4">
                {house.highlight}
              </p>

              {/* 4 Clinical Features */}
              <div className="space-y-2 mb-4 pt-3 border-t border-[#14110F]/10">
                {house.clinicalFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#14110F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B6A] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Pricing & CTA */}
            <div className="pt-4 border-t border-[#14110F]/10">
              <div className="flex items-center justify-between mb-3 min-h-[32px]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A7168]">
                  Custom Pairs
                </span>
                <PriceReveal
                  id={`lens-house-${house.name.toLowerCase().replace(/\s+/g, "-")}`}
                  price={house.priceFrom}
                  prefix="FROM "
                  productName={`${house.name} Custom Lenses`}
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={house.href}
                  className="py-2.5 rounded-[2px] bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors text-center text-[10px] font-mono uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-1"
                >
                  <span>Solutions</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <Link
                  href="/book-eye-test"
                  className="py-2.5 rounded-[2px] bg-transparent border border-[#14110F]/30 hover:border-[#B89B6A] text-[#14110F] hover:text-[#B89B6A] transition-colors text-center text-[10px] font-mono uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#B89B6A]" />
                  <span>Free Exam</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
