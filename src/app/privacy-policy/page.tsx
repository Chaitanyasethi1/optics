import React from "react";
import type { Metadata } from "next";
import { STORE_NAME, EMAIL, ADDRESS } from "@/data/config";

export const metadata: Metadata = {
  title: "Privacy Policy | DemoOptics",
  description: "Privacy policy and client data handling practices for DemoOptics optical showroom.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#EADFD2] rounded-3xl p-8 sm:p-14 shadow-sm space-y-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#B08968]">
            CLIENT CONFIDENTIALITY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
            Privacy & Clinical Records Policy
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968]" />

          <div className="space-y-4 text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            <p>
              At {STORE_NAME}, we hold our patrons&apos; optical health information and personal identity in the highest regard. This policy outlines how your diagnostic records and showroom inquiries are protected.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              1. Non-Transactional Catalogue Nature
            </h3>
            <p>
              This website serves exclusively as an informative catalogue and appointment scheduling portal. We do not process digital payments, store credit card numbers, or maintain unsecured online shopping profiles.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              2. Clinical Examination Records
            </h3>
            <p>
              All refraction records, corneal wavefront scans, and pupillary measurements gathered during your complimentary 14-step examination are securely archived within our in-store ophthalmic database. These records are never sold or shared with third-party advertisers.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              3. WhatsApp Communications
            </h3>
            <p>
              When inquiring via WhatsApp, communication is protected under WhatsApp&apos;s end-to-end encryption. Your contact details are utilized solely for frame reservations and appointment reminders.
            </p>

            <h3 className="font-serif text-lg text-[#2B2622] font-medium pt-2">
              4. Contact the Data Protection Officer
            </h3>
            <p>
              For inquiries regarding your optometric records or to request data removal, please email <a href={`mailto:${EMAIL}`} className="text-[#7A5A43] underline">{EMAIL}</a> or visit our Indiranagar lounge at {ADDRESS}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
