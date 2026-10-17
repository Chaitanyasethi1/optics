"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, Phone, Navigation, Coffee, Sparkles, Car, Calendar, MessageCircle } from "lucide-react";
import { STORE_NAME, ADDRESS, TIMINGS, PHONE, GOOGLE_MAPS_URL, getWhatsAppLink } from "@/data/config";

export default function VisitStoreSection() {
  return (
    <section className="py-20 bg-white border-t border-[#EADFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              FLAGSHIP SHOWROOM
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
            Visit Our Indiranagar Salon
          </h2>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C]">
            Experience luxury eyewear as it was meant to be—held in the hands, fitted with optical millimeter accuracy, and matched to your individuality.
          </p>
        </div>

        {/* 2 Column Card & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Store Details & Amenities */}
          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#EADFD2] rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B08968] font-semibold block mb-1">
                  Bengaluru Flagship
                </span>
                <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                  {STORE_NAME} Optical Lounge
                </h3>
              </div>

              {/* Address, Timings, Phone */}
              <div className="space-y-4 text-xs sm:text-sm text-[#2B2622]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
                    <MapPin className="w-4 h-4 text-[#B08968]" />
                  </div>
                  <div>
                    <span className="font-medium block text-xs text-[#7A5A43] uppercase tracking-wider mb-0.5">
                      Showroom Address
                    </span>
                    <p className="text-[#7C746C] leading-relaxed">
                      {ADDRESS}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
                    <Clock className="w-4 h-4 text-[#B08968]" />
                  </div>
                  <div>
                    <span className="font-medium block text-xs text-[#7A5A43] uppercase tracking-wider mb-0.5">
                      Store Hours
                    </span>
                    <p className="text-[#7C746C]">
                      {TIMINGS} (Open All 7 Days)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
                    <Phone className="w-4 h-4 text-[#B08968]" />
                  </div>
                  <div>
                    <span className="font-medium block text-xs text-[#7A5A43] uppercase tracking-wider mb-0.5">
                      Direct Concierge
                    </span>
                    <a href={`tel:${PHONE}`} className="text-[#7C746C] hover:text-[#2B2622] font-medium">
                      {PHONE}
                    </a>
                  </div>
                </div>
              </div>

              {/* Amenities List */}
              <div className="pt-4 border-t border-[#EADFD2]">
                <span className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#7A5A43] block mb-3">
                  Showroom Privileges
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs text-[#7C746C]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
                    <span>Private VIP Fitting Suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-[#B08968]" />
                    <span>Valet Parking Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-[#B08968]" />
                    <span>Artisanal Coffee Bar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#B08968]" />
                    <span>Zeiss Digital Refraction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-[#EADFD2] flex flex-col sm:flex-row gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={getWhatsAppLink(`Hello ${STORE_NAME}, I plan to visit your Indiranagar showroom today and would like assistance.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Store</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed & Map Container */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#EADFD2] relative min-h-[380px] bg-[#FAF7F2] shadow-xs">
            <iframe
              title="DemoOptics Showroom Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.986794611684!2d77.6322896!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a41f6789e9%3A0xb366b26d833878b!2s100%20Feet%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-75 contrast-95"
            />
            {/* Soft map badge overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#EADFD2] rounded-xl p-3 shadow-md hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-semibold text-[#2B2622]">Showroom Open Now</span>
              </div>
              <span className="text-[11px] text-[#7C746C] block mt-0.5">Until 9:00 PM Tonight</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
