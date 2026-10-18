"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/ui/Eyebrow";

const LUXURY_MAISONS = [
  {
    name: "Gucci",
    tagline: "Florentine Couture & Iconic Horsebit Detailing",
    origin: "Florence, Italy",
  },
  {
    name: "Maui Jim",
    tagline: "Patented PolarizedPlus2 Island Visual Optics",
    origin: "Lahaina, Hawaii",
  },
  {
    name: "Silhouette",
    tagline: "Austrian Masterpieces of Screwless Rimless Titanium",
    origin: "Linz, Austria",
  },
  {
    name: "Mont Blanc",
    tagline: "Executive German Refinement & Japanese Beta Titanium",
    origin: "Hamburg, Germany",
  },
];

export default function LuxuryBrandsSection() {
  const [selectedMaison, setSelectedMaison] = useState("Gucci");

  const currentBrandInfo = LUXURY_MAISONS.find((m) => m.name === selectedMaison) || LUXURY_MAISONS[0];
  const brandProducts = PRODUCTS.filter((p) => p.brand.toLowerCase() === selectedMaison.toLowerCase());

  return (
    <section
      id="luxury-brands"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-10 sm:py-12 xl:py-14 bg-[#14110F] text-[#F7F3EC]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow theme="dark">HAUTE OPTICAL SALON</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#F7F3EC] font-normal tracking-tight">
              Luxury <span className="font-serif italic font-normal text-[#B89B6A]">Maisons</span> Showcase
            </h2>
            <p className="text-xs sm:text-sm text-[#A89F95] mt-2 max-w-xl font-light">
              Experience prestigious eyewear houses revered globally for heritage materials, surgical-grade alloys, and runway silhouettes.
            </p>
          </div>

          <Link
            href={`/brands?brand=${encodeURIComponent(currentBrandInfo.name)}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#D4BE96] hover:text-white group shrink-0"
          >
            <span>Explore All {currentBrandInfo.name}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Maison Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
          {LUXURY_MAISONS.map((maison) => {
            const isSelected = selectedMaison === maison.name;
            return (
              <button
                key={maison.name}
                onClick={() => setSelectedMaison(maison.name)}
                className={`px-5 py-2 rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 ${
                  isSelected
                    ? "bg-[#B89B6A] text-[#14110F] font-bold shadow-sm"
                    : "bg-white/5 text-[#A89F95] hover:text-white hover:bg-white/10 border border-white/10 font-medium"
                }`}
              >
                {maison.name}
              </button>
            );
          })}
        </div>

        {/* Selected Brand Context Header */}
        <div className="bg-[#2A2623] border border-white/10 rounded-[2px] p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {currentBrandInfo.name}
              </h3>
              <span className="text-[10.5px] text-[#B89B6A] font-sans uppercase tracking-[0.22em] font-bold">
                • {currentBrandInfo.origin}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A89F95] mt-1 font-serif italic text-white/80">
              {currentBrandInfo.tagline}
            </p>
          </div>
        </div>

        {/* Products Grid for Active Maison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
