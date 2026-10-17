import React, { Suspense } from "react";
import type { Metadata } from "next";
import CollectionPage from "@/components/collection/CollectionPage";

export const metadata: Metadata = {
  title: "Precision Ophthalmic Lenses | Zeiss, Essilor, Hoya",
  description: "Certified German, French, and Japanese prescription lenses. Single vision, progressive multifocals, Blue Cut, and DriveSafe night vision coatings.",
};

export default function LensesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] py-20 text-center text-xs text-[#7C746C]">Loading Lenses Salon...</div>}>
      <CollectionPage
        title="Precision Prescription Lenses"
        subtitle="Calculated with digital corneal wavefront mapping. From Zeiss SmartLife and Essilor Varilux to HOYA Sync III digital accommodation support."
        category="lenses"
      />
    </Suspense>
  );
}
