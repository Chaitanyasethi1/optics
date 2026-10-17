"use client";

import React from "react";
import Link from "next/link";
import { Sun, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function PolarizedRow() {
  const his = PRODUCTS.find((p) => p.id === "prod-polarized-his") || PRODUCTS[4];
  const her = PRODUCTS.find((p) => p.id === "prod-polarized-her") || PRODUCTS[5];
  const kids = PRODUCTS.find((p) => p.id === "prod-polarized-kids") || PRODUCTS[6];

  const polarizedTrio = [
    { ...his, audience: "For Him • High Performance" },
    { ...her, audience: "For Her • Runway Couture" },
    { ...kids, audience: "For Kids • UV400 Safeguard" },
  ];

  return (
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <Sun className="w-3.5 h-3.5 text-[#B08968]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
                GLARE ELIMINATION & TRUE COLOR
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
              Polarized Sunglasses
            </h2>
            <div className="w-12 h-[1px] bg-[#B08968] mt-3" />
            <p className="text-xs sm:text-sm text-[#7C746C] mt-2 max-w-xl">
              Patented optical filters that block blinding horizontal reflections from roads and water while saturating authentic natural tones.
            </p>
          </div>

          <Link
            href="/sunglasses?filter=polarized"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#7A5A43] hover:text-[#2B2622] group"
          >
            <span>Explore All Polarized</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Cards: His / Her / Kids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {polarizedTrio.map((item) => (
            <div key={item.id} className="flex flex-col">
              {/* Audience Pill */}
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[11px] font-sans uppercase tracking-[0.15em] font-medium text-[#7A5A43]">
                  {item.audience}
                </span>
                <span className="text-[11px] text-[#B08968] font-semibold">
                  100% UV400
                </span>
              </div>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
