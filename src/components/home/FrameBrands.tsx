"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

interface BrandItem {
  name: string;
  wordmarkStyle: string;
  origin: string;
  founded: string;
  specialty: string;
  href: string;
}

const LUXURY_MAISONS: BrandItem[] = [
  {
    name: "CARTIER",
    wordmarkStyle: "font-serif tracking-[0.25em]",
    origin: "Paris, France",
    founded: "Est. 1847",
    specialty: "High Haute Horlogerie & Precious Metals",
    href: "/brands?brand=Cartier",
  },
  {
    name: "GUCCI",
    wordmarkStyle: "font-serif tracking-[0.3em]",
    origin: "Florence, Italy",
    founded: "Est. 1921",
    specialty: "Runway Silhouettes & Italian Acetate",
    href: "/brands?brand=Gucci",
  },
  {
    name: "MONTBLANC",
    wordmarkStyle: "font-serif tracking-[0.22em]",
    origin: "Hamburg, Germany",
    founded: "Est. 1906",
    specialty: "Meisterstück Beta Titanium",
    href: "/brands?brand=Mont+Blanc",
  },
  {
    name: "SILHOUETTE",
    wordmarkStyle: "font-sans tracking-[0.28em] font-light",
    origin: "Linz, Austria",
    founded: "Est. 1964",
    specialty: "1.8g Screwless TMA Rimless",
    href: "/brands?brand=Silhouette",
  },
  {
    name: "RAY-BAN",
    wordmarkStyle: "font-serif tracking-[0.18em] italic font-normal",
    origin: "Milan, Italy",
    founded: "Est. 1937",
    specialty: "Iconic Aviator & Mineral Glass G-15",
    href: "/brands?brand=Ray-Ban",
  },
  {
    name: "MAUI JIM",
    wordmarkStyle: "font-serif tracking-[0.2em]",
    origin: "Lahaina, Hawaii",
    founded: "Est. 1980",
    specialty: "PolarizedPlus2 Glare Elimination",
    href: "/brands?brand=Maui+Jim",
  },
  {
    name: "PRADA",
    wordmarkStyle: "font-serif tracking-[0.32em] font-medium",
    origin: "Milan, Italy",
    founded: "Est. 1913",
    specialty: "Architectural Geometric Couture",
    href: "/brands?brand=Prada",
  },
  {
    name: "OAKLEY",
    wordmarkStyle: "font-sans tracking-[0.26em] font-black",
    origin: "Foothill Ranch, USA",
    founded: "Est. 1975",
    specialty: "Prizm Digital Sports Optics",
    href: "/brands?brand=Oakley",
  },
  {
    name: "LINDBERG",
    wordmarkStyle: "font-sans tracking-[0.3em] font-extralight",
    origin: "Aarhus, Denmark",
    founded: "Est. 1986",
    specialty: "Danish Architectural Titanium Wire",
    href: "/brands?brand=Lindberg",
  },
  {
    name: "OLIVER PEOPLES",
    wordmarkStyle: "font-serif tracking-[0.22em]",
    origin: "West Hollywood, USA",
    founded: "Est. 1987",
    specialty: "Filigreed Core Vintage Aesthetics",
    href: "/brands?brand=Oliver+Peoples",
  },
  {
    name: "TOM FORD",
    wordmarkStyle: "font-sans tracking-[0.25em] font-semibold",
    origin: "New York, USA",
    founded: "Est. 2005",
    specialty: "Signature Metal T-Logo Iconography",
    href: "/brands?brand=Tom+Ford",
  },
  {
    name: "SAINT LAURENT",
    wordmarkStyle: "font-sans tracking-[0.28em] font-normal",
    origin: "Paris, France",
    founded: "Est. 1961",
    specialty: "Monochromatic High Paris Precision",
    href: "/brands?brand=Saint+Laurent",
  },
];

export default function FrameBrands() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#14110F] text-[#F7F3EC] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            AUTHORIZED MAISONS & ATELIERS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F3EC] font-normal tracking-tight">
            Certified Luxury Houses
          </h2>
        </div>
        <Link
          href="/brands"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#D4BE96] hover:text-[#B89B6A] transition-colors"
        >
          <span>Explore All 24 Maisons</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 12-Brand Grid - 4 cols x 3 rows on Desktop */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pb-6 pt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 min-h-0 items-stretch">
        {LUXURY_MAISONS.map((brand, idx) => {
          const isHovered = hoveredIdx === idx;

          return (
            <Link
              key={brand.name}
              href={brand.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative bg-[#2A2623] border transition-all duration-300 rounded-[2px] p-4 flex flex-col justify-between cursor-pointer ${
                isHovered
                  ? "border-[#B89B6A] bg-[#14110F] shadow-lg translate-y-[-1px]"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* Top Accent */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#B89B6A] tracking-[0.2em] uppercase font-semibold">
                  {brand.founded}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A]/40 group-hover:bg-[#B89B6A] transition-colors" />
              </div>

              {/* Wordmark Centerpiece */}
              <div className="my-auto py-2 text-center">
                <div
                  className={`text-base sm:text-lg lg:text-xl text-[#F7F3EC] group-hover:text-[#D4BE96] transition-colors duration-300 ${brand.wordmarkStyle}`}
                >
                  {brand.name}
                </div>
              </div>

              {/* Bottom Origin Reveal */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#D4BE96]/70">
                <span className="truncate group-hover:text-[#B89B6A] transition-colors flex items-center gap-1 font-mono text-[9.5px]">
                  <Compass className="w-2.5 h-2.5 text-[#B89B6A] shrink-0" />
                  {brand.origin}
                </span>
                <span className="text-[#B89B6A] opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
