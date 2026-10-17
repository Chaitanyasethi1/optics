"use client";

import React from "react";
import Link from "next/link";
import { Glasses, Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck, Sparkles, Award } from "lucide-react";
import { STORE_NAME, TAGLINE, PHONE, WHATSAPP_NUMBER, ADDRESS, EMAIL, TIMINGS, getWhatsAppLink } from "@/data/config";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#F3ECE2] text-[#2B2622] border-t border-[#EADFD2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#EADFD2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#B08968]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#2B2622]">100% Genuine Brands</h5>
              <p className="text-[11px] text-[#7C746C]">Direct from Luxottica & Safilo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
              <Award className="w-5 h-5 text-[#B08968]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#2B2622]">14-Step Precision Eye Test</h5>
              <p className="text-[11px] text-[#7C746C]">Zeiss digital diagnostics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
              <Sparkles className="w-5 h-5 text-[#B08968]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#2B2622]">Bespoke Frame Fitting</h5>
              <p className="text-[11px] text-[#7C746C]">Custom facial contour tuning</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] shrink-0">
              <MessageCircle className="w-5 h-5 text-[#B08968]" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-medium text-[#2B2622]">WhatsApp Concierge</h5>
              <p className="text-[11px] text-[#7C746C]">Real-time optical advice</p>
            </div>
          </div>
        </div>

        {/* 4 Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EADFD2]">
          {/* Column 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] group-hover:bg-[#B08968] group-hover:text-white transition-colors">
                <Glasses className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-medium tracking-tight text-[#2B2622]">
                  {STORE_NAME}
                </span>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-[#B08968]">
                  Optical Showroom
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#7C746C] leading-relaxed max-w-sm">
              An experiential optical salon dedicated to optical craftsmanship, certified German lens diagnostics, and curated international eyewear. We believe frames are an architectural extension of human identity.
            </p>

            <div className="pt-2 text-xs text-[#7A5A43] space-y-1">
              <p className="font-medium">Authorized Retailer & Partner for:</p>
              <p className="text-[#7C746C]">
                Carl Zeiss Vision • Essilor France • Silhouette Austria • Luxottica Italy • Maui Jim Hawaii
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink("Hello DemoOptics Concierge, I would like to enquire.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Eyewear Collections */}
          <div>
            <h4 className="font-sans uppercase tracking-[0.15em] text-[11px] font-semibold text-[#B08968] mb-4">
              Eyewear Salon
            </h4>
            <ul className="space-y-2.5 text-xs text-[#7C746C]">
              <li>
                <Link href="/sunglasses" className="hover:text-[#2B2622] transition-colors">
                  Sunglasses Collection
                </Link>
              </li>
              <li>
                <Link href="/sunglasses?filter=polarized" className="hover:text-[#2B2622] transition-colors">
                  Polarized Lenses
                </Link>
              </li>
              <li>
                <Link href="/eyeglasses" className="hover:text-[#2B2622] transition-colors">
                  Optical Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/eyeglasses?material=Pure+Titanium" className="hover:text-[#2B2622] transition-colors">
                  Japanese Titanium Frames
                </Link>
              </li>
              <li>
                <Link href="/lenses" className="hover:text-[#2B2622] transition-colors">
                  Zeiss & Essilor Lenses
                </Link>
              </li>
              <li>
                <Link href="/contact-lenses" className="hover:text-[#2B2622] transition-colors">
                  Contact Lenses & Care
                </Link>
              </li>
              <li>
                <Link href="/watches" className="hover:text-[#2B2622] transition-colors">
                  Curated Timepieces
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-[#7A5A43] font-medium hover:underline">
                  Special Privilege Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Services */}
          <div>
            <h4 className="font-sans uppercase tracking-[0.15em] text-[11px] font-semibold text-[#B08968] mb-4">
              Services & Salon
            </h4>
            <ul className="space-y-2.5 text-xs text-[#7C746C]">
              <li>
                <Link href="/book-eye-test" className="text-[#7A5A43] font-medium hover:underline">
                  Book Free Eye Test
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#2B2622] transition-colors">
                  Our Optical Heritage
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-[#2B2622] transition-colors">
                  Brand Directory
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#2B2622] transition-colors">
                  Vision Health Journal
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#2B2622] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#2B2622] transition-colors">
                  Terms of Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Store Showroom Details */}
          <div>
            <h4 className="font-sans uppercase tracking-[0.15em] text-[11px] font-semibold text-[#B08968] mb-4">
              Visit Showroom
            </h4>
            <div className="space-y-3 text-xs text-[#7C746C]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B08968] shrink-0" />
                <span>{TIMINGS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B08968] shrink-0" />
                <a href={`tel:${PHONE}`} className="hover:text-[#2B2622] transition-colors">
                  {PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B08968] shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-[#2B2622] transition-colors">
                  {EMAIL}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink("Hello DemoOptics Concierge, I would like to visit the showroom.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors text-[11px] font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Catalogue Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7C746C] gap-3">
          <p>© {new Date().getFullYear()} {STORE_NAME} Optical Showroom. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Showroom Catalogue & Appointment Service. No online payment or cart. All eyewear customized at our Indiranagar lounge.
          </p>
        </div>
      </div>
    </footer>
  );
}
