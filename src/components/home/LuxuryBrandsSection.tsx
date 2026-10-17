"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

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
    <section className="py-20 bg-white border-b border-[#EADFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <Crown className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              HAUTE OPTICAL SALON
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
            Luxury Brands Showcase
          </h2>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C]">
            Experience prestigious eyewear houses revered globally for heritage materials, surgical-grade alloys, and runway silhouettes.
          </p>
        </div>

        {/* Maison Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {LUXURY_MAISONS.map((maison) => {
            const isSelected = selectedMaison === maison.name;
            return (
              <button
                key={maison.name}
                onClick={() => setSelectedMaison(maison.name)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.15em] transition-all duration-300 ${
                  isSelected
                    ? "bg-[#7A5A43] text-white shadow-sm font-semibold"
                    : "bg-[#FAF7F2] text-[#7C746C] hover:text-[#2B2622] border border-[#EADFD2]"
                }`}
              >
                {maison.name}
              </button>
            );
          })}
        </div>

        {/* Selected Brand Context Header */}
        <div className="bg-[#FAF7F2] border border-[#EADFD2] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                {currentBrandInfo.name}
              </h3>
              <span className="text-xs text-[#B08968] font-sans uppercase tracking-wider font-medium">
                • {currentBrandInfo.origin}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#7C746C] mt-1">
              {currentBrandInfo.tagline}
            </p>
          </div>

          <Link
            href={`/brands?brand=${encodeURIComponent(currentBrandInfo.name)}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#7A5A43] hover:text-[#2B2622] shrink-0"
          >
            <span>View All {currentBrandInfo.name}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
