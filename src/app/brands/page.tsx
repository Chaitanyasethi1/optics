import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { BRANDS } from "@/data/products";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Official Brand Directory | Ray-Ban, Gucci, Silhouette, Mont Blanc",
  description: "Explore 100% original certified international eyewear houses. Authorized dealer for Luxottica, Kering, Safilo, and Carl Zeiss.",
};

export default async function BrandsPage(props: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeBrand = searchParams.brand;

  if (activeBrand) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading {activeBrand} Catalogue...</div>}>
        <CollectionPage
          title={`${activeBrand} Eyewear Collection`}
          subtitle={`Explore certified 100% genuine ${activeBrand} sunglasses and optical frames available for fitting at DemoOptics showroom.`}
          category="all"
          defaultBrand={activeBrand}
        />
      </Suspense>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-white border-b border-[#EADFD2] py-14 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              CERTIFIED PARTNERSHIPS
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2622] font-medium mb-3">
            World-Renowned Eyewear Houses
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            Every frame in our showroom is sourced directly through official manufacturer channels. Guaranteed authentic with warranty, protective cases, and certificate of origin.
          </p>
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="bg-white border border-[#EADFD2] rounded-3xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-[#FAF7F2] overflow-hidden border-b border-[#EADFD2]">
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#7A5A43] border border-[#EADFD2]">
                    Est. {b.founded}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-[#7C746C] mb-1">
                    <span className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#B08968] font-bold">
                      {b.origin}
                    </span>
                    <span>{b.category}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#2B2622] font-medium mb-2 group-hover:text-[#7A5A43] transition-colors">
                    {b.name}
                  </h3>

                  <p className="text-xs text-[#7C746C] leading-relaxed line-clamp-2">
                    {b.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/brands?brand=${encodeURIComponent(b.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
                >
                  <span>Explore {b.name} Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
