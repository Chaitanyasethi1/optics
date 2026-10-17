"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
            CURATED DEPARTMENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium mt-2 mb-3">
            Shop by Category
          </h2>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C]">
            Explore our curated optical categories, where international luxury meets ophthalmic engineering.
          </p>
        </div>

        {/* 4 Tall Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.link}
              className="group relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#EADFD2] shadow-sm flex flex-col justify-end p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2622]/90 via-[#2B2622]/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Minimalist Card Label */}
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#D9BFA3] font-medium block">
                  {cat.itemCount}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#D9BFA3] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-[#FAF7F2]/80 line-clamp-1">
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
