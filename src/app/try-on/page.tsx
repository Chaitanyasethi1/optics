import React, { Suspense } from "react";
import type { Metadata } from "next";
import TryOnStudioClient from "@/components/tryon/TryOnStudioClient";
import { STORE_NAME } from "@/data/config";

export const metadata: Metadata = {
  title: "Virtual Try-On Studio | Experience Eyewear on Your Face",
  description: `Experience real-time webcam eyewear try-on at ${STORE_NAME}. Calibrate Ray-Ban, Silhouette titanium, and Gucci frames on your facial anatomy with zero uploads.`,
  openGraph: {
    title: `Virtual Try-On Studio | ${STORE_NAME}`,
    description: "Try on luxury sunglasses and precision titanium eyeglasses live via your camera.",
  },
};

export default function TryOnPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] py-8 sm:py-12 lg:py-16">
      <Suspense
        fallback={
          <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
            <div className="inline-block w-8 h-8 border-2 border-[#B89B6A] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-serif text-xl text-[#14110F]">Opening Virtual Try-On Studio...</p>
          </div>
        }
      >
        <TryOnStudioClient />
      </Suspense>
    </div>
  );
}
