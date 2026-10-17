"use client";

import React from "react";
import Link from "next/link";

const BRANDS = [
  { name: "Ray-Ban", slug: "ray-ban" },
  { name: "Gucci", slug: "gucci" },
  { name: "Tommy Hilfiger", slug: "tommy-hilfiger" },
  { name: "Calvin Klein", slug: "calvin-klein" },
  { name: "Carrera", slug: "carrera" },
  { name: "Oakley", slug: "oakley" },
  { name: "Burberry", slug: "burberry" },
  { name: "Police", slug: "police" },
  { name: "Scott", slug: "scott" },
  { name: "Mont Blanc", slug: "mont-blanc" },
];

export default function BrandStrip() {
  return (
    <section aria-label="Official Brand Partners" className="border-y border-[#EADFD2] bg-white py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
          Authorized Showroom Retailer
        </span>
        <Link
          href="/brands"
          className="text-xs text-[#7A5A43] hover:text-[#2B2622] font-medium underline underline-offset-2 transition-colors"
        >
          View All Brands (12+)
        </Link>
      </div>

      {/* Clean Editorial Marquee / Grid */}
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 px-4 py-2">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/brands?brand=${encodeURIComponent(brand.name)}`}
              className="group py-2 px-3 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-wider text-[#7C746C] group-hover:text-[#2B2622] group-hover:font-semibold transition-colors duration-200">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
