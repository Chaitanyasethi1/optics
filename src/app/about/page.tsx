import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Glasses, Award, Sparkles, UserCheck, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { STORE_NAME, ADDRESS } from "@/data/config";

export const metadata: Metadata = {
  title: "Our Heritage & Philosophy | DemoOptics",
  description: "Learn about DemoOptics: an unhurried optical salon dedicated to optical craftsmanship, certified German lens diagnostics, and bespoke frame fitting in Bengaluru.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-[#EADFD2] py-16 sm:py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <Glasses className="w-4 h-4 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              ESTABLISHED IN BENGALURU
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2B2622] font-medium mt-2 mb-4 leading-tight">
            Haute Eyewear & Unhurried Optometry
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#7C746C] leading-relaxed">
            {STORE_NAME} was conceived as an antidote to fast, impersonal optical chains. We operate as an unhurried atelier where facial architecture, Japanese craftsmanship, and clinical precision meet.
          </p>
        </div>
      </div>

      {/* Story Section: Image & Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#EADFD2] shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80"
              alt="Optical atelier craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-sans uppercase tracking-[0.18em] font-bold text-[#B08968]">
              THE ARCHITECTURE OF VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium leading-tight">
              Eyewear is not merely an accessory; it frames human expression.
            </h2>
            <div className="w-10 h-[1px] bg-[#B08968]" />
            <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
              When someone speaks with you, their visual attention settles squarely upon your eyes and the contours of your eyewear. Yet for decades, optical retail has treated eyeglasses as an afterthought of quick discounts, rushed 3-minute checks, and disposable plastic.
            </p>
            <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
              At DemoOptics, every patron is welcomed into a private fitting suite. We measure pupillary axis deviation, pantoscopic tilt, and vertex distance using high-precision German Zeiss instruments before recommending a single frame.
            </p>

            <div className="pt-2">
              <Link
                href="/book-eye-test"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors"
              >
                <span>Experience Our 14-Step Eye Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Excellence */}
      <div className="bg-white border-y border-[#EADFD2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              OUR FOUNDATIONAL PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium mt-2">
              Three Non-Negotiable Standards
            </h2>
            <div className="w-12 h-[1px] bg-[#B08968] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F2] border border-[#EADFD2] rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#B08968]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                100% Direct Brand Provenance
              </h3>
              <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
                Zero gray-market imports. We are direct authorized partners for Luxottica Italy, Safilo, Kering Eyewear, and Carl Zeiss Germany. Every pair includes international hologram credentials and maker warranties.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#EADFD2] rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#B08968]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                Master Japanese & Austrian Titanium
              </h3>
              <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
                We curate featherweight pure and beta titanium frames from Fukui, Japan and Linz, Austria. Resistant to corrosion and perspiration, weighing as little as 1.8 grams for true weightlessness.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#EADFD2] rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#B08968]">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                Certified Clinical Optometrists
              </h3>
              <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
                Our team consists of Master Optometrists with over 20 years of refractive expertise. We specialize in complex presbyopia, digital accommodation fatigue, and zero-swim progressive lenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
