"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

const CATEGORIES = [
  {
    title: "Sunglasses",
    subtitle: "Polarized & UV400 Haute Sunwear",
    itemCount: "450+ Designs",
    link: "/sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    ratio: "tall",
  },
  {
    title: "Eyeglasses",
    subtitle: "Bespoke Titanium & Hand-milled Acetate",
    itemCount: "620+ Frames",
    link: "/eyeglasses",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    ratio: "tall",
  },
  {
    title: "Precision Lenses",
    subtitle: "Zeiss, Essilor & Hoya Digital Optics",
    itemCount: "Free 14-Step Fitting",
    link: "/lenses",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    ratio: "tall",
  },
  {
    title: "Contact Lenses",
    subtitle: "Water Gradient & Breathable Comfort",
    itemCount: "Daily & Monthly",
    link: "/contact-lenses",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    ratio: "tall",
  },
];

export default function ShopByCategory() {
  return (
    <section
      id="categories"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#EDE5D8]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>CURATED DEPARTMENTS</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A7168] max-w-md">
            Explore our curated optical categories, where international luxury meets ophthalmic engineering.
          </p>
        </div>

        {/* 4 Tall Cards Grid (4:5 portrait ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.link}
              className="group relative h-[420px] xl:h-[480px] rounded-[2px] overflow-hidden border border-[#14110F]/10 shadow-xs flex flex-col justify-end p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#B89B6A]/50 hover:shadow-xl"
              data-cursor="EXPLORE"
            >
              {/* Luxury Gold Corner Brackets on Hover */}
              <div className="corner-bracket-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="corner-bracket-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="corner-bracket-bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="corner-bracket-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110F]/90 via-[#14110F]/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Minimalist Card Label */}
              <div className="relative z-10 text-white space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4BE96] font-medium block">
                  {cat.itemCount}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl xl:text-3xl font-normal tracking-tight text-white group-hover:text-[#D4BE96] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-[#F7F3EC]/80 line-clamp-1 font-light">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
