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
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#F7F3EC] border-y border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>FEATHERWEIGHT AEROSPACE ALLOY</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
              Premium Titanium Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7168] mt-3 max-w-xl">
              Engineered in Sabae, Japan and Linz, Austria. Weighing under 10 grams, offering lifelong resilience, zero corrosion, and hypoallergenic skin comfort.
            </p>
          </div>

          <Link
            href="/eyeglasses?material=Pure+Titanium"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#14110F] hover:text-[#B89B6A] group"
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
