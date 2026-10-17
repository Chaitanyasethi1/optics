import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Designer Eyeglasses | Japanese Titanium & Italian Acetate",
  description: "Explore handcrafted optical frames from Silhouette, Mont Blanc, Ray-Ban, Calvin Klein, and Scott. Featherweight titanium and bespoke acetate.",
};

export default function EyeglassesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading Eyeglasses Salon...</div>}>
      <CollectionPage
        title="Bespoke Optical Eyeglasses"
        subtitle="Hand-milled Japanese titanium, screwless Austrian rimless engineering, and vintage Italian Mazzucchelli acetate crafted for lifelong clarity."
        category="eyeglasses"
      />
    </Suspense>
  );
}
