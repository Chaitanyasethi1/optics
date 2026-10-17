import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Designer Sunglasses | Polarized & UV400 Collection",
  description: "Browse curated luxury sunglasses from Ray-Ban, Gucci, Maui Jim, Burberry, and Carrera. Polarized optics with complimentary in-store fitting.",
};

export default function SunglassesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading Sunglasses Salon...</div>}>
      <CollectionPage
        title="Haute Sunglasses Collection"
        subtitle="Curated polarized, UV400, and designer solar eyewear from Milan, Maui, and Paris. Every pair fitted to your facial contours."
        category="sunglasses"
      />
    </Suspense>
  );
}
