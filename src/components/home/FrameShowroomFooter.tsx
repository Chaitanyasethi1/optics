"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Star, 
  ArrowUpRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { STORE_NAME, ADDRESS, TIMINGS, PHONE, getWhatsAppLink } from "@/data/config";

const TESTIMONIALS = [
  {
    quote:
      "The Silhouette rimless titanium frames I acquired here are an absolute revelation. Weighing practically nothing and paired with Zeiss SmartLife lenses, the vision is crystal clear.",
    author: "Dr. Vikramaditya Rao",
    title: "Chief Surgeon, Indiranagar",
    badge: "Acquired Silhouette TMA Titan",
  },
  {
    quote:
      "Unlike noisy chain optical stores, DemoOptics feels like a private Swiss salon. The 14-step clinical eye exam was more thorough than any clinic in Bangalore.",
    author: "Ananya Deshmukh",
    title: "Architect & Partner",
    badge: "Zeiss Progressive Custom",
  },
  {
    quote:
      "Exceptional collection of original Cartier and Maui Jim sunglasses. The bespoke fitting by their master optician adjusted the temple curve to fit my face comfortably.",
    author: "Karan Singhal",
    title: "Managing Director, Bengaluru",
    badge: "Maui Jim PolarizedPlus2",
  },
];

export default function FrameShowroomFooter() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const review = TESTIMONIALS[activeReviewIdx];

  return (
    <footer className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#14110F] text-[#F7F3EC] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-2 pb-1 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            HAUTE SHOWROOM & ATELIER CONCIERGE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F3EC] font-normal tracking-tight">
            Visit Showroom & Private Salon
          </h2>
        </div>
        <a
          href="https://maps.google.com/?q=12th+Main+Rd+HAL+2nd+Stage+Indiranagar+Bengaluru"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#D4BE96] hover:text-[#B89B6A] transition-colors"
        >
          <span>Get Directions</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Content Area: Showroom Details (Left) + Showroom Lounge & Testimonial (Right) */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-2 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-0 items-stretch">
        {/* Left Column: Showroom Address & Timings (5 of 12 cols) */}
        <div className="lg:col-span-5 bg-[#2A2623] border border-white/10 rounded-[2px] p-5 sm:p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#B89B6A] font-semibold block mb-1">
                FLAGSHIP BOUTIQUE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F7F3EC] font-normal">
                Indiranagar Flagship Lounge
              </h3>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B89B6A] shrink-0 mt-0.5" />
                <span className="text-[#D4BE96]/90 font-light leading-relaxed">
                  {ADDRESS}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#B89B6A] shrink-0" />
                <span className="text-[#D4BE96]/90 font-light">
                  {TIMINGS}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B89B6A] shrink-0" />
                <span className="text-[#D4BE96]/90 font-light font-mono">
                  {PHONE}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to book a private VIP fitting appointment.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-[2px] bg-[#B89B6A] text-[#14110F] hover:bg-[#F7F3EC] transition-colors font-sans font-bold text-[10px] uppercase tracking-[0.16em] flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp VIP</span>
            </a>

            <a
              href="https://maps.google.com/?q=12th+Main+Rd+HAL+2nd+Stage+Indiranagar+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-[2px] bg-transparent border border-white/20 hover:border-[#B89B6A] text-[#F7F3EC] hover:text-[#B89B6A] transition-colors font-sans font-bold text-[10px] uppercase tracking-[0.16em] flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B89B6A]" />
              <span>Google Maps</span>
            </a>
          </div>
        </div>

        {/* Right Column: Showroom Lounge Photo & Rotating Client Testimonial (7 of 12 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-h-0 items-stretch">
          {/* Showroom Image Card */}
          <div className="relative rounded-[2px] overflow-hidden border border-white/10 bg-[#14110F] min-h-[160px] sm:min-h-0">
            <Image
              src="/images/showroom-lounge.jpg"
              alt="DemoOptics Indiranagar Luxury Optical Lounge"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#B89B6A] font-semibold block">
                VIP FITTING SUITE
              </span>
              <span className="font-serif text-sm text-[#F7F3EC]">
                Bespoke Walnut & Brass Vitrines
              </span>
            </div>
          </div>

          {/* Testimonial Box */}
          <div className="bg-[#2A2623] border border-white/10 rounded-[2px] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-[#B89B6A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#B89B6A]" />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded-[2px] bg-[#14110F] text-[#D4BE96] text-[8px] font-mono tracking-wider font-semibold">
                  {review.badge}
                </span>
              </div>

              <p className="font-serif text-sm sm:text-base text-[#F7F3EC] italic leading-relaxed mb-4">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#F7F3EC]">{review.author}</div>
                <div className="text-[10px] text-[#A89F95] font-light">{review.title}</div>
              </div>

              {/* Indicator Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setActiveReviewIdx(
                      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                    )
                  }
                  className="p-1 hover:text-[#B89B6A] text-[#A89F95]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setActiveReviewIdx((prev) => (prev + 1) % TESTIMONIALS.length)
                  }
                  className="p-1 hover:text-[#B89B6A] text-[#A89F95]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Bottom: Clean Footer Navigation Links & Copyright */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pb-4 pt-2 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[#A89F95]">
            <Link href="/sunglasses" className="hover:text-[#B89B6A] transition-colors">
              Sunglasses
            </Link>
            <Link href="/eyeglasses" className="hover:text-[#B89B6A] transition-colors">
              Eyeglasses
            </Link>
            <Link href="/lenses" className="hover:text-[#B89B6A] transition-colors">
              Lenses
            </Link>
            <Link href="/contact-lenses" className="hover:text-[#B89B6A] transition-colors">
              Contact Lenses
            </Link>
            <Link href="/brands" className="hover:text-[#B89B6A] transition-colors">
              Brands
            </Link>
            <Link href="/offers" className="hover:text-[#B89B6A] transition-colors">
              Offers
            </Link>
            <Link href="/book-eye-test" className="hover:text-[#B89B6A] transition-colors">
              Free Eye Test
            </Link>
            <Link href="/contact" className="hover:text-[#B89B6A] transition-colors">
              Contact
            </Link>
          </div>

          <div className="text-[10px] text-[#A89F95]/60 text-center sm:text-right">
            © 2026 {STORE_NAME} Haute Optique. Indiranagar, Bengaluru. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
