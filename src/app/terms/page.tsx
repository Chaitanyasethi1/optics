import React from "react";
import type { Metadata } from "next";
import { STORE_NAME } from "@/data/config";

export const metadata: Metadata = {
  title: "Terms of Consultation & Guarantee | DemoOptics",
  description: "Terms governing optical consultation, lens adaptation guarantee, and authentic manufacturer warranty.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#EADFD2] rounded-3xl p-8 sm:p-14 shadow-sm space-y-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#B08968]">
            SERVICE PROTOCOLS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
            Terms of Consultation & Warranties
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968]" />

          <div className="space-y-4 text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            <h3 className="font-serif text-lg text-[#2B2622] font-medium">
              1. Showroom Appointments & Trials
            </h3>
            <p>
              Product inquiries made on this website through WhatsApp constitute non-binding reservations. Frames will be held for up to 48 hours for your showroom trial and facial fitment.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              2. 14-Day Progressive Lens Adaptation Guarantee
            </h3>
            <p>
              We provide a complete 14-day progressive lens adaptation guarantee on all premium Zeiss and Essilor multifocal prescriptions. If you experience visual discomfort or corridor distortion, our optometrists will recalibrate the optics at zero cost.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              3. Authentic Manufacturer Warranty
            </h3>
            <p>
              All luxury frames and ophthalmic lenses purchased at our showroom carry direct 1-to-2 year manufacturer warranty against defects in materials, plating, and anti-reflective coatings.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              4. Complimentary Lifetime Maintenance
            </h3>
            <p>
              Every frame acquired at {STORE_NAME} is entitled to complimentary lifetime ultrasonic cleaning, nose pad replacements, and screw adjustments at our Indiranagar lounge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
