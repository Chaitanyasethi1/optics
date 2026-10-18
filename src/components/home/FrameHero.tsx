"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

interface HeroSlide {
  image: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero-sunglasses.jpg",
    eyebrow: "HAUTE SUNWEAR · MILANO & PARIS",
    headline: "Sculpted Italian Acetate Sunglasses",
    description:
      "Handcrafted Mazzucchelli acetate, 24K gold hinges, and Zeiss precision polarized UV400 lenses.",
    primaryCtaText: "Explore Collection",
    primaryCtaHref: "/sunglasses",
    secondaryCtaText: "Try On Virtually",
    secondaryCtaHref: "/try-on",
  },
  {
    image: "/images/hero-eyeglasses.jpg",
    eyebrow: "ARCHITECTURAL OPTICAL · FUKUI & LINZ",
    headline: "Weightless Minimalist Eyeglasses",
    description:
      "Featherlight Japanese titanium frames paired with bespoke Zeiss digital progressive optics.",
    primaryCtaText: "Explore Collection",
    primaryCtaHref: "/eyeglasses",
    secondaryCtaText: "Book Free Eye Test",
    secondaryCtaHref: "/book-eye-test",
  },
  {
    image: "/images/hero-titanium.jpg",
    eyebrow: "AEROSPACE ALLOY · SABAE, JAPAN",
    headline: "Pure Japanese Titanium Suite",
    description:
      "Weighing a mere 1.8 grams with patented screwless architecture and 23K gold ion plating.",
    primaryCtaText: "Explore Collection",
    primaryCtaHref: "/eyeglasses?material=Pure+Titanium",
    secondaryCtaText: "Try On Virtually",
    secondaryCtaHref: "/try-on",
  },
];

export default function FrameHero({ onNextFrame }: { onNextFrame?: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentIdx];

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#14110F] text-[#F7F3EC] select-none">
      {/* Background Slides with Crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.headline}
              fill
              priority={idx === 0}
              className="object-cover object-center lg:object-right scale-100 transition-transform duration-10000 ease-out"
              sizes="100vw"
            />
            {/* Solid Dark Gradient on Left for Razor-Sharp Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14110F] via-[#14110F]/85 to-transparent w-full lg:w-[65%]" />
            {/* Subtle bottom shadow to anchor controls */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#14110F] to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Main Content Area (Vertically Centered in Available Deck Space) */}
      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full py-4 lg:py-6">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
            <span className="w-8 h-[1px] bg-[#B89B6A]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#B89B6A] font-semibold">
              {slide.eyebrow}
            </span>
          </div>

          {/* Headline - Cormorant Garamond 6 words max, clamped */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[#F7F3EC] leading-[1.08] mb-4 lg:mb-6">
            {slide.headline}
          </h1>

          {/* Description - Max 2-3 lines */}
          <p className="font-sans text-sm sm:text-base text-[#D4BE96]/90 font-light leading-relaxed max-w-xl mb-6 lg:mb-8">
            {slide.description}
          </p>

          {/* Buttons: Rectangular 2px radius, uppercase 12px, 0.18em tracking */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={slide.primaryCtaHref}
              className="px-6 sm:px-8 py-3.5 rounded-[2px] bg-[#B89B6A] text-[#14110F] font-sans font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#F7F3EC] transition-colors duration-300 shadow-md inline-flex items-center gap-2"
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={slide.secondaryCtaHref}
              className="px-6 sm:px-8 py-3.5 rounded-[2px] bg-transparent text-[#F7F3EC] border border-[#F7F3EC]/40 hover:border-[#B89B6A] hover:text-[#B89B6A] font-sans font-bold text-xs uppercase tracking-[0.18em] transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89B6A]" />
              <span>{slide.secondaryCtaText}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Deck Controls & Scroll Cue */}
      <div className="relative z-20 shrink-0 pb-6 lg:pb-8 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full flex items-center justify-between">
        {/* Slide Indicators */}
        <div className="flex items-center gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Switch to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === currentIdx
                  ? "w-8 bg-[#B89B6A]"
                  : "w-2 bg-[#F7F3EC]/30 hover:bg-[#F7F3EC]/70"
              }`}
            />
          ))}
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4BE96]/70">
            0{currentIdx + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>

        {/* Small Scroll Cue on Hero */}
        {onNextFrame ? (
          <button
            onClick={onNextFrame}
            className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4BE96]/70 hover:text-[#B89B6A] transition-colors duration-300 group"
          >
            <span>SCROLL TO DISCOVER</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </button>
        ) : (
          <div className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4BE96]/70">
            <span>SCROLL TO DISCOVER</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        )}
      </div>
    </section>
  );
}
