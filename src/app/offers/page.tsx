import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Special Offers: Up to 40% Off | DemoOptics Privilege",
  description: "Exclusive showroom privileges on select international designer frames and sunglasses. Inquire on WhatsApp to reserve for in-store trial.",
};

export default function OffersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading Special Privilege Offers...</div>}>
      <CollectionPage
        title="Showroom Privilege Offers"
        subtitle="Curated seasonal savings of up to 40% off on authentic designer frames and sunglasses. Reserve your model on WhatsApp for trial at our Indiranagar lounge."
        category="offers"
      />
    </Suspense>
  );
}
