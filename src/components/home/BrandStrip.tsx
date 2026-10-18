"use client";

import React from "react";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import { ShieldCheck, ArrowRight, Award, CheckCircle2, Sparkles, Box, Wrench } from "lucide-react";

interface MaisonPartner {
  name: string;
  slug: string;
  origin: string;
  category: string;
  symbol?: string;
  fontClass: string;
}

const MAISON_PARTNERS: MaisonPartner[] = [
  {
    name: "Gucci",
    slug: "gucci",
    origin: "Firenze • 1921",
    category: "High Luxury Couture",
    fontClass: "font-serif tracking-[0.26em] uppercase text-xl font-normal",
  },
  {
    name: "Ray-Ban",
    slug: "ray-ban",
    origin: "Genuine • 1937",
    category: "Iconic Heritage",
    fontClass: "font-serif tracking-tight text-2xl italic font-semibold",
  },
  {
    name: "Mont Blanc",
    slug: "mont-blanc",
    origin: "Hamburg • 1906",
    category: "Executive Prestige",
    symbol: "✦",
    fontClass: "font-serif tracking-[0.2em] uppercase text-lg font-medium",
  },
  {
    name: "Burberry",
    slug: "burberry",
    origin: "London • 1856",
    category: "British Heritage",
    fontClass: "font-serif tracking-[0.22em] uppercase text-lg font-normal",
  },
  {
    name: "Silhouette",
    slug: "silhouette",
    origin: "Linz • 1964",
    category: "Titanium Specialist",
    fontClass: "font-sans tracking-[0.28em] uppercase text-base font-light",
  },
  {
    name: "Oakley",
    slug: "oakley",
    origin: "California • 1975",
    category: "High Performance",
    fontClass: "font-sans tracking-[0.22em] uppercase text-lg font-bold",
  },
  {
    name: "Maui Jim",
    slug: "maui-jim",
    origin: "Hawaii • 1980",
    category: "PolarizedPlus2",
    fontClass: "font-serif tracking-tight text-xl italic font-normal",
  },
  {
    name: "Calvin Klein",
    slug: "calvin-klein",
    origin: "New York • 1968",
    category: "Understated Minimal",
    fontClass: "font-sans tracking-[0.22em] uppercase text-sm font-normal",
  },
  {
    name: "Tommy Hilfiger",
    slug: "tommy-hilfiger",
    origin: "New York • 1985",
    category: "Classic American Cool",
    fontClass: "font-serif tracking-[0.18em] uppercase text-base font-normal",
  },
  {
    name: "Carrera",
    slug: "carrera",
    origin: "Since 1956",
    category: "Motorsport Heritage",
    fontClass: "font-sans tracking-[0.2em] uppercase text-lg font-black italic",
  },
  {
    name: "Police",
    slug: "police",
    origin: "Venice • 1983",
    category: "Contemporary Edge",
    fontClass: "font-sans tracking-[0.24em] uppercase text-base font-medium",
  },
];

export default function BrandStrip() {
  return (
    <section
      aria-label="Official Maison Partners"
      className="border-y border-[#14110F]/8 bg-[#F7F3EC] py-14 lg:py-16 overflow-hidden relative"
    >
      {/* Top Section Header */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#14110F]/8">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>OFFICIAL MAISON PARTNERS</Eyebrow>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14110F] font-normal tracking-tight">
              Curated International Eyewear Houses
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#7A7168] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89B6A]" />
              100% Direct Certified Retailer
            </span>
            <span className="hidden sm:inline text-[#14110F]/20">•</span>
            <Link
              href="/brands"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#14110F] hover:text-[#B89B6A] group transition-colors"
            >
              <span>Explore All Maisons</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#B89B6A]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Endless Smooth Luxury Plaque Tape (Continuous Marquee) */}
      <div
        className="relative w-full overflow-hidden select-none py-2 group/marquee"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 60px, black calc(100% - 60px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 60px, black calc(100% - 60px), transparent 100%)",
        }}
      >
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Loop Track 1 */}
          <div className="flex items-center gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0">
            {MAISON_PARTNERS.map((m) => (
              <Link
                key={`track1-${m.name}`}
                href={`/brands?brand=${encodeURIComponent(m.name)}`}
                className="group/card relative w-[220px] sm:w-[250px] h-[120px] rounded-[2px] bg-white border border-[#14110F]/8 hover:border-[#B89B6A] hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between p-4 text-center"
              >
                {/* Category Pill Tag */}
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#A89F95] group-hover/card:text-[#B89B6A] transition-colors">
                  {m.category}
                </span>

                {/* Brand Typographic Lockup */}
                <div className="flex items-center justify-center gap-1.5 text-[#2A2623] group-hover/card:text-[#14110F] transition-colors my-auto">
                  {m.symbol && (
                    <span className="text-xs text-[#B89B6A]">{m.symbol}</span>
                  )}
                  <span className={`${m.fontClass} transition-transform duration-300 group-hover/card:scale-[1.03]`}>
                    {m.name}
                  </span>
                </div>

                {/* Origin & Year Heritage Badge */}
                <span className="text-[9.5px] uppercase tracking-[0.18em] font-sans text-[#7A7168] group-hover/card:text-[#14110F] transition-colors border-t border-[#14110F]/6 pt-1.5 w-full flex items-center justify-center gap-1">
                  <span>{m.origin}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Loop Track 2 (Exact duplicate for seamless continuous 360 loop) */}
          <div className="flex items-center gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0" aria-hidden="true">
            {MAISON_PARTNERS.map((m) => (
              <Link
                key={`track2-${m.name}`}
                href={`/brands?brand=${encodeURIComponent(m.name)}`}
                className="group/card relative w-[220px] sm:w-[250px] h-[120px] rounded-[2px] bg-white border border-[#14110F]/8 hover:border-[#B89B6A] hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between p-4 text-center"
              >
                {/* Category Pill Tag */}
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#A89F95] group-hover/card:text-[#B89B6A] transition-colors">
                  {m.category}
                </span>

                {/* Brand Typographic Lockup */}
                <div className="flex items-center justify-center gap-1.5 text-[#2A2623] group-hover/card:text-[#14110F] transition-colors my-auto">
                  {m.symbol && (
                    <span className="text-xs text-[#B89B6A]">{m.symbol}</span>
                  )}
                  <span className={`${m.fontClass} transition-transform duration-300 group-hover/card:scale-[1.03]`}>
                    {m.name}
                  </span>
                </div>

                {/* Origin & Year Heritage Badge */}
                <span className="text-[9.5px] uppercase tracking-[0.18em] font-sans text-[#7A7168] group-hover/card:text-[#14110F] transition-colors border-t border-[#14110F]/6 pt-1.5 w-full flex items-center justify-center gap-1">
                  <span>{m.origin}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Showroom Authenticity & Provenance Strip */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 mt-10 pt-8 border-t border-[#14110F]/8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#B89B6A] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#14110F] mb-1">
                Direct Authorization
              </h5>
              <p className="text-[11px] text-[#7A7168] leading-relaxed">
                Direct official procurement from Luxottica, Kering & Safilo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 text-[#B89B6A] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#14110F] mb-1">
                Global Warranty
              </h5>
              <p className="text-[11px] text-[#7A7168] leading-relaxed">
                1–2 Year official manufacturer card with verified serial numbers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Box className="w-4 h-4 text-[#B89B6A] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#14110F] mb-1">
                Original Packaging
              </h5>
              <p className="text-[11px] text-[#7A7168] leading-relaxed">
                Authentic branded hard case, microfiber cloth & certificate.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Wrench className="w-4 h-4 text-[#B89B6A] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#14110F] mb-1">
                Bespoke Fitting
              </h5>
              <p className="text-[11px] text-[#7A7168] leading-relaxed">
                Complimentary optical alignment and ultrasonic cleaning for life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
