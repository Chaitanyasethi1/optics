"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { REVIEWS } from "@/data/products";
import Eyebrow from "@/components/ui/Eyebrow";

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
    <section
      id="reviews"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#EDE5D8] border-b border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#B89B6A]" />
            <Eyebrow>CLIENT TESTIMONIALS</Eyebrow>
            <span className="w-6 h-[1px] bg-[#B89B6A]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
            Words From Our Patrons
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7168] mt-3">
            Read unfiltered experiences from discerning professionals, doctors, and collectors who trust DemoOptics with their vision.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-8 sm:p-14 relative shadow-sm">
          {/* Corner brackets */}
          <div className="corner-bracket-tl" />
          <div className="corner-bracket-tr" />
          <div className="corner-bracket-bl" />
          <div className="corner-bracket-br" />

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-6">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#B89B6A] text-[#B89B6A]" />
            ))}
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#B89B6A] font-medium ml-3">
              5.0 Verified Patron
            </span>
          </div>

          {/* Review Text */}
          <blockquote className="font-serif text-xl sm:text-3xl text-[#14110F] leading-relaxed font-normal min-h-[140px] italic">
            &ldquo;{activeReview.review}&rdquo;
          </blockquote>

          {/* Author Details & Purchased Product */}
          <div className="mt-10 pt-6 border-t border-[#14110F]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-medium text-[#14110F]">
                  {activeReview.author}
                </span>
                <span className="text-xs text-[#7A7168]">({activeReview.city})</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B6A]" />
              </div>
              <span className="text-xs text-[#B89B6A] block mt-0.5">
                Acquired: {activeReview.productPurchased}
              </span>
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#7A7168] mr-2">
                0{currentIndex + 1} / 0{REVIEWS.length}
              </span>
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="w-10 h-10 rounded-[2px] bg-[#EDE5D8] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#14110F]/10 text-[#14110F] flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="w-10 h-10 rounded-[2px] bg-[#EDE5D8] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#14110F]/10 text-[#14110F] flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
