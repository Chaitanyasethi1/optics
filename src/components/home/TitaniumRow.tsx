"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Feather } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Eyebrow from "@/components/ui/Eyebrow";

export default function TitaniumRow() {
  const titaniumProducts = PRODUCTS.filter((p) => p.isTitanium).slice(0, 4);

  return (
    <section
      id="titanium"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-10 sm:py-12 xl:py-14 bg-[#F7F3EC] border-y border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>FEATHERWEIGHT AEROSPACE ALLOY</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#14110F] font-normal tracking-tight">
              Premium Titanium Collection
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] sm:text-xs text-[#7A7168]">
              <span className="text-[#B89B6A] font-medium tracking-wide">✦ Sabae, Japan & Linz, Austria</span>
              <span className="text-[#14110F]/30">•</span>
              <span>1.8g Ultralight Featherweight</span>
              <span className="text-[#14110F]/30">•</span>
              <span>23K Gold Ion-Plated Beta Titanium</span>
            </div>
          </div>

          <Link
            href="/eyeglasses?material=Pure+Titanium"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#14110F] hover:text-[#B89B6A] group shrink-0"
          >
            <span>View All Titanium</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {titaniumProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
