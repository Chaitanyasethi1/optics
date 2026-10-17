import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Curated Timepiece Salon | Swiss & Japanese Horology",
  description: "Boutique collection of automatic and mechanical timepieces from Montblanc, Tissot, and Seiko curated to complement luxury optical styling.",
};

export default function WatchesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading Timepiece Salon...</div>}>
      <CollectionPage
        title="Curated Timepiece Salon"
        subtitle="Swiss and Japanese mechanical movements, sapphire crystals, and bespoke leather straps selected to complement high-precision eyewear aesthetics."
        category="watches"
      />
    </Suspense>
  );
}
