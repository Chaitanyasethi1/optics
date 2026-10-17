"use client";

import React from "react";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

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
    <section
      aria-label="Official Brand Partners"
      className="border-y border-[#14110F]/8 bg-[#F7F3EC] py-10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-[1px] bg-[#B89B6A]" />
          <Eyebrow>OFFICIAL MAISON PARTNERS</Eyebrow>
        </div>
        <Link
          href="/brands"
          className="text-xs uppercase tracking-[0.16em] text-[#14110F] hover:text-[#B89B6A] font-medium transition-colors"
        >
          View All Maisons →
        </Link>
      </div>

      {/* Clean Luxury Marquee / Strip */}
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10 lg:gap-12 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-2">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/brands?brand=${encodeURIComponent(brand.name)}`}
              className="group py-2 transition-all duration-300"
            >
              <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.08em] text-[#7A7168] group-hover:text-[#14110F] transition-colors duration-200">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
