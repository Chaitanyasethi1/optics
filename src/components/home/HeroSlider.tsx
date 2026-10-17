"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
}

const SLIDES: Slide[] = [
  {
    id: "slide-1",
    tag: "HAUTE SUNWEAR 2026",
    title: "The Pure Art of Solar Clarity",
    subtitle: "Hand-sculpted Italian acetate paired with high-definition polarized optics, curated for panoramic daylight and understated glamour.",
    ctaText: "Explore Sunglasses",
    ctaLink: "/sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1920&q=85",
    imageAlt: "Luxury designer sunglasses on warm stone",
  },
  {
    id: "slide-2",
    tag: "BESPOKE OPTICAL CRAFT",
    title: "Architectural Elegance For Everyday Vision",
    subtitle: "Refined silhouettes and intellectual geometry designed to balance facial harmony, high-index prescription lenses, and all-day comfort.",
    ctaText: "Discover Eyeglasses",
    ctaLink: "/eyeglasses",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1920&q=85",
    imageAlt: "Minimalist titanium eyewear in warm natural light",
  },
  {
    id: "slide-3",
    tag: "ENGINEERED IN JAPAN & AUSTRIA",
    title: "Pure Titanium: Weightless Perfection",
    subtitle: "Weighing as little as 1.8 grams. Sourced from Fukui Prefecture, featuring screwless hinges and 23K gold ion plating.",
    ctaText: "View Titanium Collection",
    ctaLink: "/eyeglasses?material=Pure+Titanium",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1920&q=85",
    imageAlt: "Featherweight Japanese titanium optical frame",
  },
  {
    id: "slide-4",
    tag: "COMPLIMENTARY CONSULTATION",
    title: "14-Step Precision Eye Examination",
    subtitle: "Step into our Indiranagar lounge for computerized Zeiss corneal wavefront mapping and customized progressive lens fitting by certified optometrists.",
    ctaText: "Book Your Free Eye Test",
    ctaLink: "/book-eye-test",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1920&q=85",
    imageAlt: "High-precision optical consulting and eye examination setup",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      aria-label="Hero Highlights"
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[720px] bg-[#FAF7F2] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with warm gradient overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                className="object-cover object-center scale-105 transition-transform duration-10000 ease-out"
              />
              {/* Dual warm vignette overlay for luxurious editorial contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/80 to-transparent lg:w-3/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/90 via-transparent to-black/10" />
            </div>

            {/* Slide Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
              <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
                {/* Uppercase Tracking Label */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#EADFD2] backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
                  <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#B08968]">
                    {slide.tag}
                  </span>
                </div>

                {/* Main Serif Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2B2622] leading-[1.12]">
                  {slide.title}
                </h1>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-[#7C746C] leading-relaxed max-w-lg font-normal">
                  {slide.subtitle}
                </p>

                {/* Single CTA Button */}
                <div className="pt-2">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white border border-[#EADFD2] text-[#2B2622] hover:text-[#7A5A43] flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-xs"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white border border-[#EADFD2] text-[#2B2622] hover:text-[#7A5A43] flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-xs"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#EADFD2]/70">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              idx === current ? "w-8 bg-[#7A5A43]" : "w-2 bg-[#D9BFA3] hover:bg-[#B08968]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
