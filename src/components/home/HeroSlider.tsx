"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Glasses, Sparkles } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

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
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      id="hero"
      aria-label="Hero Highlights"
      className="relative w-full min-h-[90vh] xl:min-h-screen bg-[#F7F3EC] overflow-hidden snap-frame flex flex-col justify-center"
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
            {/* Background Image with Ken Burns zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                className={`object-cover object-center ${
                  isActive ? "animate-kenburns scale-105" : "scale-100"
                } transition-all duration-1000`}
              />
              {/* Luxury dual scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EC] via-[#F7F3EC]/85 to-transparent w-full lg:w-3/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EC] via-transparent to-black/10" />
            </div>

            {/* Slide Content */}
            <div className="relative h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col justify-center pt-20 pb-16">
              <div className="max-w-xl lg:max-w-3xl space-y-5 sm:space-y-6">
                {/* Eyebrow Label */}
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-[#B89B6A]" />
                  <Eyebrow>{slide.tag}</Eyebrow>
                </div>

                {/* Main Serif Headline with clamp typography */}
                <h1 className="font-serif text-4xl sm:text-6xl xl:text-[clamp(3.2rem,5.5vw,5.5rem)] font-normal tracking-tight text-[#14110F] leading-[1.08]">
                  {slide.title}
                </h1>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-[#7A7168] leading-relaxed max-w-xl font-normal">
                  {slide.subtitle}
                </p>

                {/* Dual CTA Buttons (Strictly NO Cart) */}
                <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Primary Section CTA */}
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[2px] text-xs uppercase tracking-[0.18em] font-sans font-medium bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-all duration-300 shadow-sm group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Prominent Virtual Try-On CTA */}
                  <Link
                    href="/try-on"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] text-xs uppercase tracking-[0.18em] font-sans font-medium border border-[#14110F]/20 text-[#14110F] hover:border-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300 group"
                  >
                    <Glasses className="w-4 h-4 text-[#B89B6A] group-hover:text-[#B89B6A]" />
                    <span>Experience Virtual Try-On</span>
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
        className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-[2px] bg-[#F7F3EC]/80 hover:bg-[#F7F3EC] border border-[#14110F]/10 text-[#14110F] hover:text-[#B89B6A] flex items-center justify-center transition-all duration-200 backdrop-blur-xs"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-[2px] bg-[#F7F3EC]/80 hover:bg-[#F7F3EC] border border-[#14110F]/10 text-[#14110F] hover:text-[#B89B6A] flex items-center justify-center transition-all duration-200 backdrop-blur-xs"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Bottom Editorial Numbered Pagination */}
      <div className="absolute bottom-10 left-6 sm:left-10 lg:left-20 z-20 flex items-center gap-4 text-xs font-mono tracking-widest text-[#14110F]">
        <span className="font-semibold text-[#B89B6A]">0{current + 1}</span>
        <div className="w-16 h-[1px] bg-[#14110F]/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#B89B6A] transition-all duration-500"
            style={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
        <span className="text-[#7A7168]">0{SLIDES.length}</span>
      </div>
    </section>
  );
}
