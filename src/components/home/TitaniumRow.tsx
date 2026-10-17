"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Feather } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function TitaniumRow() {
  const titaniumProducts = PRODUCTS.filter((p) => p.isTitanium).slice(0, 4);

  return (
    <section className="py-20 bg-white border-y border-[#EADFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <Feather className="w-3.5 h-3.5 text-[#B08968]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
                FEATHERWEIGHT AEROSPACE ALLOY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
              Premium Collection: Titanium Frames
            </h2>
            <div className="w-12 h-[1px] bg-[#B08968] mt-3" />
            <p className="text-xs sm:text-sm text-[#7C746C] mt-2 max-w-xl">
              Engineered in Sabae, Japan and Linz, Austria. Weighing under 10 grams, offering lifelong resilience, zero corrosion, and hypoallergenic skin comfort.
            </p>
          </div>

          <Link
            href="/eyeglasses?material=Pure+Titanium"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#7A5A43] hover:text-[#2B2622] group"
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
