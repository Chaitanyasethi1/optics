"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT_LENS_BRANDS } from "@/data/products";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";
import Eyebrow from "@/components/ui/Eyebrow";

export default function ContactLensesSection() {
  return (
    <section
      id="contact-lenses"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#EDE5D8] border-b border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>BREATHABLE OCULAR HYDRATION</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
              Contact Lenses & Eye Care
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7168] mt-3 max-w-xl">
              From silky water-gradient daily disposables to therapeutic monthly lenses. Complimentary trial fitting & insertion tutorials at our showroom.
            </p>
          </div>

          <Link
            href="/contact-lenses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#14110F] hover:text-[#B89B6A] group"
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
              className="bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-6 flex flex-col justify-between hover:border-[#B89B6A]/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full rounded-[2px] overflow-hidden mb-5 border border-[#14110F]/8 bg-[#EDE5D8]">
                  <Image
                    src={item.image}
                    alt={item.brand}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-[2px] bg-[#14110F]/90 text-[9px] uppercase font-mono tracking-wider text-[#B89B6A]">
                    {item.badge}
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#14110F] font-normal mb-1">
                  {item.brand}
                </h3>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B89B6A] font-medium block mb-2">
                  {item.title}
                </span>
                <p className="text-xs text-[#7A7168] line-clamp-2 leading-relaxed mb-4 font-light">
                  {item.type}
                </p>

                <div className="text-xs font-medium text-[#14110F] mb-4">
                  Starting ₹{item.startingPrice.toLocaleString("en-IN")}{" "}
                  <span className="text-[10px] text-[#7A7168] font-normal">/ pack</span>
                </div>
              </div>

              {/* Inquire on WhatsApp button */}
              <a
                href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to ask about availability and fitting for ${item.brand} contact lenses.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[2px] text-[10px] uppercase tracking-[0.16em] font-medium border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B89B6A]" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
