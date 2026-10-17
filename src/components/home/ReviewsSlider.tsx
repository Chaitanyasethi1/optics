"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { REVIEWS } from "@/data/products";

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = REVIEWS[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium mt-2 mb-3">
            Words From Our Patrons
          </h2>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C]">
            Read unfiltered experiences from discerning professionals, doctors, and collectors who trust DemoOptics with their vision.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-[#FAF7F2] border border-[#EADFD2] rounded-3xl p-8 sm:p-12 relative shadow-xs">
          <div className="w-12 h-12 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#B08968] mb-6">
            <Quote className="w-5 h-5 fill-[#B08968]/20" />
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#B08968] text-[#B08968]" />
            ))}
            <span className="text-xs text-[#7A5A43] font-medium ml-2">
              5.0 Verified Experience
            </span>
          </div>

          {/* Review Text */}
          <blockquote className="font-serif text-lg sm:text-2xl text-[#2B2622] leading-relaxed font-normal min-h-[120px] italic">
            &ldquo;{activeReview.review}&rdquo;
          </blockquote>

          {/* Author Details & Purchased Product */}
          <div className="mt-8 pt-6 border-t border-[#EADFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-medium text-[#2B2622]">
                  {activeReview.author}
                </span>
                {activeReview.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#7A5A43] bg-white border border-[#EADFD2] px-2 py-0.5 rounded-full font-sans">
                    <CheckCircle2 className="w-3 h-3 text-[#B08968]" />
                    Verified Patron
                  </span>
                )}
              </div>
              <div className="text-xs text-[#7C746C] mt-0.5">
                {activeReview.city} • Fitted:{" "}
                <span className="text-[#7A5A43] font-medium">
                  {activeReview.productPurchased}
                </span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevReview}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#F3ECE2] border border-[#EADFD2] text-[#2B2622] flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-[#7C746C] font-mono">
                {currentIndex + 1} / {REVIEWS.length}
              </span>
              <button
                onClick={nextReview}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#F3ECE2] border border-[#EADFD2] text-[#2B2622] flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Small thumbnail preview grid of all 6 reviews */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 max-w-4xl mx-auto">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setCurrentIndex(i)}
              className={`p-3 rounded-xl border text-left transition-all ${
                i === currentIndex
                  ? "bg-white border-[#B08968] shadow-sm ring-1 ring-[#B08968]"
                  : "bg-[#FAF7F2] border-[#EADFD2] hover:bg-white"
              }`}
            >
              <div className="text-[11px] font-medium text-[#2B2622] truncate">
                {r.author}
              </div>
              <div className="text-[10px] text-[#7C746C] truncate mt-0.5">
                {r.city.split(",")[0]}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
