import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Contact Lenses & Solutions | Alcon, Bausch & Lomb, Acuvue",
  description: "Hydrating daily and monthly contact lenses. Water gradient silicone hydrogel from Alcon Dailies, Bausch & Lomb Ultra, and Acuvue Oasys.",
};

export default function ContactLensesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading Contact Lens Salon...</div>}>
      <CollectionPage
        title="Breathable Contact Lenses"
        subtitle="Experience water-gradient technology that feels like natural tears. Complimentary trial fittings and insertion guidance at our Indiranagar lounge."
        category="contact-lenses"
      />
    </Suspense>
  );
}
