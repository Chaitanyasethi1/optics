"use client";

import React from "react";
import Link from "next/link";
import { Sun, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/ui/Eyebrow";

export default function PolarizedRow() {
  const his = PRODUCTS.find((p) => p.id === "prod-polarized-his") || PRODUCTS[4];
  const her = PRODUCTS.find((p) => p.id === "prod-polarized-her") || PRODUCTS[5];
  const kids = PRODUCTS.find((p) => p.id === "prod-polarized-kids") || PRODUCTS[6];

  const polarizedTrio = [
    { ...his, audience: "Gentlemen • High Performance" },
    { ...her, audience: "Ladies • Runway Couture" },
    { ...kids, audience: "Juniors • UV400 Safeguard" },
  ];

  return (
    <section
      id="polarized"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-10 sm:py-12 xl:py-14 bg-[#EDE5D8]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>GLARE ELIMINATION & TRUE COLOR</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#14110F] font-normal tracking-tight">
              Polarized <span className="font-serif italic font-normal text-[#B89B6A]">Solar</span> Sunwear
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7168] mt-2 max-w-xl font-light">
              Patented optical filters that neutralize blinding horizontal reflections from asphalt and water while saturating authentic natural tones.
            </p>
          </div>

          <Link
            href="/sunglasses?filter=polarized"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#14110F] hover:text-[#B89B6A] group shrink-0"
          >
            <span>Explore All Polarized</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Cards: His / Her / Kids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {polarizedTrio.map((item) => (
            <div key={item.id} className="flex flex-col">
              {/* Audience Label */}
              <div className="mb-2.5 flex items-center justify-between px-1">
                <span className="text-[10.5px] font-sans uppercase tracking-[0.24em] font-bold text-[#14110F]">
                  {item.audience}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B89B6A] font-bold">
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
