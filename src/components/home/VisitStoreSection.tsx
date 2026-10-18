"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation, Coffee, Sparkles, Car, Calendar, MessageCircle } from "lucide-react";
import { STORE_NAME, ADDRESS, TIMINGS, PHONE, GOOGLE_MAPS_URL, getWhatsAppLink } from "@/data/config";
import Eyebrow from "@/components/ui/Eyebrow";

export default function VisitStoreSection() {
  return (
    <section
      id="visit"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-10 sm:py-12 xl:py-14 bg-[#EDE5D8] border-t border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>FLAGSHIP SHOWROOM</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-[#14110F] font-normal tracking-tight">
              Visit Our Indiranagar <span className="font-serif italic font-normal text-[#B89B6A]">Salon</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7168] mt-2 max-w-xl font-light">
              Experience luxury eyewear as it was meant to be—held in the hands, fitted with optical millimeter accuracy, and matched to your individuality.
            </p>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#14110F] hover:text-[#B89B6A] group shrink-0"
          >
            <Navigation className="w-4 h-4 text-[#B89B6A]" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* 2 Column Card & Map Grid (12-column system) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Store Details & Amenities */}
          <div className="lg:col-span-5 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-8 sm:p-10 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.24em] text-[#B89B6A] font-semibold block mb-1">
                  Bengaluru Flagship
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#14110F] font-normal">
                  {STORE_NAME} Optical Lounge
                </h3>
              </div>

              {/* Address, Timings, Phone */}
              <div className="space-y-4 text-xs sm:text-sm text-[#14110F]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[#EDE5D8] flex items-center justify-center text-[#B89B6A] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium block text-[10px] text-[#B89B6A] uppercase tracking-[0.18em] mb-0.5">
                      Showroom Address
                    </span>
                    <p className="text-[#7A7168] leading-relaxed font-light">
                      {ADDRESS}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[#EDE5D8] flex items-center justify-center text-[#B89B6A] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium block text-[10px] text-[#B89B6A] uppercase tracking-[0.18em] mb-0.5">
                      Salon Hours
                    </span>
                    <p className="text-[#7A7168] font-light">{TIMINGS}</p>
                    <span className="text-[10px] text-[#B89B6A] font-medium block">
                      Optometrist on duty all 7 days
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[#EDE5D8] flex items-center justify-center text-[#B89B6A] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium block text-[10px] text-[#B89B6A] uppercase tracking-[0.18em] mb-0.5">
                      Concierge Desk
                    </span>
                    <a href={`tel:${PHONE}`} className="text-[#14110F] hover:text-[#B89B6A] font-mono">
                      {PHONE}
                    </a>
                  </div>
                </div>
              </div>

              {/* Showroom Amenities */}
              <div className="pt-4 border-t border-[#14110F]/8">
                <span className="text-[10px] font-sans uppercase tracking-[0.18em] font-medium text-[#B89B6A] block mb-3">
                  Lounge Amenities
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#7A7168]">
                  <span className="flex items-center gap-1.5 font-light">
                    <Coffee className="w-3.5 h-3.5 text-[#B89B6A]" />
                    Artisan Espresso Bar
                  </span>
                  <span className="flex items-center gap-1.5 font-light">
                    <Car className="w-3.5 h-3.5 text-[#B89B6A]" />
                    Valet Parking
                  </span>
                  <span className="flex items-center gap-1.5 font-light">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89B6A]" />
                    Ultrasonic Eyewear Spa
                  </span>
                  <span className="flex items-center gap-1.5 font-light">
                    <Navigation className="w-3.5 h-3.5 text-[#B89B6A]" />
                    Private Styling Suites
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Actions */}
            <div className="pt-6 mt-6 border-t border-[#14110F]/8 grid grid-cols-2 gap-2">
              <Link
                href="/book-eye-test"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-[2px] text-[10px] uppercase tracking-[0.16em] font-medium bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-all duration-300"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </Link>
              <a
                href={getWhatsAppLink(`Hello ${STORE_NAME}, I would like to schedule a visit to your Indiranagar salon.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-[2px] text-[10px] uppercase tracking-[0.16em] font-medium border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B89B6A]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed with Luxury Frame */}
          <div className="lg:col-span-7 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] overflow-hidden min-h-[360px] lg:min-h-full flex flex-col relative shadow-xs">
            <iframe
              title={`${STORE_NAME} Showroom Location`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985552399587!2d77.6401666!3d12.9727778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a75f1b1b1b%3A0x1b1b1b1b1b1b1b1b!2s100%20Feet%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="flex-1 w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
