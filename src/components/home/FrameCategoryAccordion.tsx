"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryPanel {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

const CATEGORIES: CategoryPanel[] = [
  {
    id: "sunglasses",
    num: "01",
    eyebrow: "HAUTE SUNWEAR",
    title: "Sunglasses",
    subtitle: "Italian Mazzucchelli acetate & Zeiss polarized UV400 lenses.",
    href: "/sunglasses",
    image: "/images/cat-sunglasses.jpg",
  },
  {
    id: "eyeglasses",
    num: "02",
    eyebrow: "ARCHITECTURAL FRAMES",
    title: "Eyeglasses",
    subtitle: "Ultralight Japanese titanium and bespoke optical geometry.",
    href: "/eyeglasses",
    image: "/images/cat-eyeglasses.jpg",
  },
  {
    id: "lenses",
    num: "03",
    eyebrow: "PRECISION OPTICS",
    title: "Prescription Lenses",
    subtitle: "Zeiss SmartLife & Essilor Varilux digital progressives.",
    href: "/lenses",
    image: "/images/cat-lenses.jpg",
  },
  {
    id: "contact-lenses",
    num: "04",
    eyebrow: "OCULAR HYDRATION",
    title: "Contact Lenses",
    subtitle: "Breathable water-gradient dailies from Alcon & Bausch + Lomb.",
    href: "/contact-lenses",
    image: "/images/cat-contact-lenses.jpg",
  },
];

export default function FrameCategoryAccordion() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#F7F3EC] text-[#14110F] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Header - Minimal and Elegant */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            HAUTE CURATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14110F] font-normal tracking-tight">
            Shop by Category
          </h2>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7A7168]">
            FOUR ATELIERS · ZERO COMPROMISE
          </span>
        </div>
      </div>

      {/* Accordion Panels Container - Fills remaining height without overflowing */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-1 flex flex-col lg:flex-row gap-3 min-h-0">
        {CATEGORIES.map((cat, idx) => {
          const isHovered = activeIdx === idx;
          const isAnyHovered = activeIdx !== null;

          return (
            <Link
              key={cat.id}
              href={cat.href}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={`group relative overflow-hidden rounded-[2px] transition-all duration-700 ease-out border border-[#14110F]/10 flex flex-col justify-end p-6 sm:p-8 cursor-pointer ${
                isHovered
                  ? "lg:flex-[2.2] border-[#B89B6A]"
                  : isAnyHovered
                  ? "lg:flex-[0.8] opacity-90"
                  : "lg:flex-1 opacity-100"
              } h-64 lg:h-full`}
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className={`object-cover object-center transition-transform duration-1000 ease-out ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
                sizes="(max-width: 1024px) 100vw, 25vw"
              />

              {/* Solid Gradient for Razor-Sharp Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/60 to-transparent pointer-events-none" />

              {/* Panel Top Number Badge */}
              <div className="absolute top-5 left-6 lg:top-6 lg:left-8 z-10 flex items-center gap-2">
                <span className="font-mono text-xs text-[#D4BE96] tracking-[0.2em] font-semibold">
                  {cat.num}
                </span>
                <span className="w-4 h-[1px] bg-[#B89B6A]/50" />
              </div>

              {/* Panel Bottom Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B89B6A] font-semibold block mb-1">
                  {cat.eyebrow}
                </span>

                <div className="flex items-end justify-between gap-2 mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-normal tracking-tight text-[#F7F3EC] group-hover:text-[#D4BE96] transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-[2px] bg-[#14110F]/80 border border-[#B89B6A]/50 flex items-center justify-center text-[#D4BE96] group-hover:bg-[#B89B6A] group-hover:text-[#14110F] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p
                  className={`text-xs text-[#D4BE96]/80 font-light leading-relaxed max-w-sm transition-all duration-500 ${
                    isHovered
                      ? "opacity-100 max-h-20 translate-y-0"
                      : "opacity-80 lg:opacity-0 lg:max-h-0 lg:translate-y-2 overflow-hidden"
                  }`}
                >
                  {cat.subtitle}
                </p>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#D4BE96]">
                  <span>Explore Atelier</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
