"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Droplets, ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT_LENS_BRANDS } from "@/data/products";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";

export default function ContactLensesSection() {
  return (
    <section className="py-20 bg-white border-b border-[#EADFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <Droplets className="w-3.5 h-3.5 text-[#B08968]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
                BREATHABLE HYDRATION
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
              Contact Lenses & Eye Care
            </h2>
            <div className="w-12 h-[1px] bg-[#B08968] mt-3" />
            <p className="text-xs sm:text-sm text-[#7C746C] mt-2 max-w-xl">
              From silky water-gradient daily disposables to therapeutic monthly lenses. Complimentary trial fitting & insertion tutorials at our showroom.
            </p>
          </div>

          <Link
            href="/contact-lenses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-[#7A5A43] hover:text-[#2B2622] group"
          >
            <span>Browse All Contact Lenses</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_LENS_BRANDS.map((item) => (
            <div
              key={item.brand}
              className="bg-[#FAF7F2] border border-[#EADFD2] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 border border-[#EADFD2]/70 bg-white">
                  <Image
                    src={item.image}
                    alt={item.brand}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 border border-[#EADFD2] text-[10px] font-semibold text-[#7A5A43]">
                    {item.badge}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#7C746C] mb-1">
                  <span className="font-sans uppercase tracking-[0.15em] text-[10px] text-[#B08968] font-bold">
                    {item.country}
                  </span>
                  <span>{item.type}</span>
                </div>

                <h3 className="font-serif text-xl text-[#2B2622] font-medium mb-1">
                  {item.brand}
                </h3>
                <p className="text-xs text-[#7C746C] mb-4">
                  {item.title}
                </p>

                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-[11px] text-[#7C746C]">starting from</span>
                  <span className="text-base font-semibold text-[#2B2622]">
                    ₹{item.startingPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] text-[#7C746C]">/ box</span>
                </div>
              </div>

              {/* WhatsApp Action */}
              <a
                href={getWhatsAppLink(`Hello ${STORE_NAME}, I would like to inquire about ${item.brand} contact lens availability and trial fitting.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-[11px] font-sans uppercase tracking-[0.1em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire Availability</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
