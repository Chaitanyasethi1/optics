"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

const CATEGORIES = [
  {
    title: "Sunglasses",
    headline: "Haute Sunwear",
    subtitle: "Polarized & UV400 Atelier Sunwear",
    itemCount: "450+ Designs",
    pill: "ICONIC",
    link: "/sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Eyeglasses",
    headline: "Architectural Frames",
    subtitle: "Bespoke Titanium & Hand-Milled Acetate",
    itemCount: "620+ Frames",
    pill: "BESPOKE",
    link: "/eyeglasses",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Precision Lenses",
    headline: "Ophthalmic Lenses",
    subtitle: "Zeiss, Essilor & Hoya Digital Optics",
    itemCount: "Free 14-Step Fitting",
    pill: "ZEISS CERTIFIED",
    link: "/lenses",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Contact Lenses",
    headline: "Contact Lens Atelier",
    subtitle: "Water Gradient & Breathable Comfort",
    itemCount: "Daily & Monthly",
    pill: "HYDRATION",
    link: "/contact-lenses",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Pure Titanium",
    headline: "Japanese Titanium",
    subtitle: "1.8g Screwless Ultralight from Fukui",
    itemCount: "Featherweight",
    pill: "EXCLUSIVE",
    link: "/sunglasses",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Virtual Try-On",
    headline: "AR Fitting Salon",
    subtitle: "Real-Time 3D Camera Mirror Fitting",
    itemCount: "Live Studio",
    pill: "NEW 3D AR",
    link: "/try-on",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ShopByCategory() {
  return (
    <section
      id="categories"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-10 sm:py-12 xl:py-14 bg-[#EDE5D8] overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 mb-8 lg:mb-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>CURATED DEPARTMENTS</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#14110F] font-normal tracking-tight">
              Curated <span className="font-serif italic font-normal text-[#B89B6A]">Departments</span> & Categories
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs sm:text-sm text-[#7A7168] max-w-md">
            <p className="leading-relaxed font-light">
              Explore our curated optical categories, where international luxury meets ophthalmic engineering.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#14110F]/10 rounded-[2px] text-[10px] uppercase font-mono tracking-widest text-[#B89B6A] shrink-0 self-start sm:self-auto font-bold">
              <Sparkles className="w-3 h-3" />
              Continuous Tape
            </span>
          </div>
        </div>
      </div>

      {/* Endless Smooth Luxury Card Tape (Continuous Infinite Marquee "Gol Gol") */}
      <div
        className="relative w-full overflow-hidden select-none py-4 group"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)",
        }}
      >
        <div className="animate-category-marquee flex items-center whitespace-nowrap">
          {/* Loop Track 1 */}
          <div className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={`cat-t1-${cat.title}-${idx}`}
                href={cat.link}
                className="group/card relative w-[300px] sm:w-[340px] xl:w-[380px] h-[460px] xl:h-[500px] rounded-[2px] overflow-hidden border border-[#14110F]/10 shadow-sm flex flex-col justify-end p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B89B6A] hover:shadow-2xl shrink-0"
              >
                {/* Luxury Gold Corner Brackets on Hover */}
                <div className="corner-bracket-tl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="corner-bracket-tr opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="corner-bracket-bl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="corner-bracket-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#14110F]/85 backdrop-blur-xs text-[#D4BE96] text-[9px] font-mono uppercase tracking-[0.2em] font-medium border border-white/10">
                    {cat.pill}
                  </span>
                </div>

                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="380px"
                  className="object-cover object-center group-hover/card:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Deep Luxury Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/95 via-[#14110F]/45 to-transparent transition-opacity duration-300 group-hover/card:opacity-95" />

                {/* Minimalist Card Label */}
                <div className="relative z-10 text-white space-y-2 whitespace-normal">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4BE96] font-medium block">
                    {cat.itemCount}
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl xl:text-3xl font-normal tracking-tight text-white group-hover/card:text-[#D4BE96] transition-colors leading-tight">
                        {cat.headline}
                      </h3>
                      <span className="text-xs text-[#B89B6A] font-sans tracking-[0.1em] uppercase font-light">
                        {cat.title}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:bg-[#B89B6A] group-hover/card:border-[#B89B6A] group-hover/card:text-[#14110F] transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-[#F7F3EC]/85 line-clamp-1 font-light">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Loop Track 2 (Exact duplicate for seamless continuous 360 loop) */}
          <div className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 shrink-0" aria-hidden="true">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={`cat-t2-${cat.title}-${idx}`}
                href={cat.link}
                className="group/card relative w-[300px] sm:w-[340px] xl:w-[380px] h-[460px] xl:h-[500px] rounded-[2px] overflow-hidden border border-[#14110F]/10 shadow-sm flex flex-col justify-end p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B89B6A] hover:shadow-2xl shrink-0"
              >
                {/* Luxury Gold Corner Brackets on Hover */}
                <div className="corner-bracket-tl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="corner-bracket-tr opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="corner-bracket-bl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="corner-bracket-br opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-20">
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#14110F]/85 backdrop-blur-xs text-[#D4BE96] text-[9px] font-mono uppercase tracking-[0.2em] font-medium border border-white/10">
                    {cat.pill}
                  </span>
                </div>

                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="380px"
                  className="object-cover object-center group-hover/card:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Deep Luxury Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/95 via-[#14110F]/45 to-transparent transition-opacity duration-300 group-hover/card:opacity-95" />

                {/* Minimalist Card Label */}
                <div className="relative z-10 text-white space-y-2 whitespace-normal">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4BE96] font-medium block">
                    {cat.itemCount}
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl xl:text-3xl font-normal tracking-tight text-white group-hover/card:text-[#D4BE96] transition-colors leading-tight">
                        {cat.headline}
                      </h3>
                      <span className="text-xs text-[#B89B6A] font-sans tracking-[0.1em] uppercase font-light">
                        {cat.title}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:bg-[#B89B6A] group-hover/card:border-[#B89B6A] group-hover/card:text-[#14110F] transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-[#F7F3EC]/85 line-clamp-1 font-light">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
