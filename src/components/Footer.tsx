"use client";

import React from "react";
import Link from "next/link";
import { Glasses, Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck, Sparkles, Award } from "lucide-react";
import { STORE_NAME, PHONE, ADDRESS, EMAIL, TIMINGS, getWhatsAppLink } from "@/data/config";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#14110F] text-[#F7F3EC] border-t border-[#14110F]/10 pt-20 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Top Feature Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 mb-14 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#B89B6A] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#B89B6A]" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-white">100% Genuine Brands</h5>
              <p className="text-[11px] text-[#A89F95] font-light">Direct from Luxottica & Safilo</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#B89B6A] shrink-0">
              <Award className="w-5 h-5 text-[#B89B6A]" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-white">14-Step Precision Eye Test</h5>
              <p className="text-[11px] text-[#A89F95] font-light">Zeiss digital diagnostics</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#B89B6A] shrink-0">
              <Sparkles className="w-5 h-5 text-[#B89B6A]" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-white">Bespoke Frame Fitting</h5>
              <p className="text-[11px] text-[#A89F95] font-light">Custom facial contour tuning</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#B89B6A] shrink-0">
              <MessageCircle className="w-5 h-5 text-[#B89B6A]" />
            </div>
            <div>
              <h5 className="font-serif text-base font-medium text-white">WhatsApp Concierge</h5>
              <p className="text-[11px] text-[#A89F95] font-light">Real-time optical advice</p>
            </div>
          </div>
        </div>

        {/* 5 Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Column 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#B89B6A] group-hover:bg-[#B89B6A] group-hover:text-[#14110F] transition-colors">
                <Glasses className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-normal tracking-tight text-white">
                  {STORE_NAME}
                </span>
                <span className="block text-[9px] tracking-[0.28em] uppercase font-sans text-[#B89B6A] font-medium">
                  Optical Showroom
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#A89F95] leading-relaxed max-w-sm font-light">
              An experiential optical salon dedicated to optical craftsmanship, certified German lens diagnostics, and curated international eyewear. We believe frames are an architectural extension of human identity.
            </p>

            <div className="pt-2 text-xs text-[#D4BE96] space-y-1">
              <p className="font-medium text-[10px] uppercase tracking-[0.18em]">Authorized Retailer & Partner for:</p>
              <p className="text-[#A89F95] font-light">
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
                className="w-8 h-8 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#A89F95] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#A89F95] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#A89F95] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink("Hello DemoOptics Concierge, I would like to enquire.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-[#A89F95] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Eyewear Collections */}
          <div>
            <h4 className="font-sans uppercase tracking-[0.26em] text-[10.5px] font-bold text-[#B89B6A] mb-4">
              Eyewear Salon
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F95]">
              <li>
                <Link href="/try-on" className="text-[#D4BE96] font-medium hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Virtual Try-On Studio</span>
                  <span className="px-1.5 py-0.2 text-[8px] uppercase font-mono bg-[#B89B6A] text-[#14110F] rounded-[2px]">
                    NEW
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sunglasses" className="hover:text-white transition-colors">
                  Sunglasses Collection
                </Link>
              </li>
              <li>
                <Link href="/sunglasses?filter=polarized" className="hover:text-white transition-colors">
                  Polarized Lenses
                </Link>
              </li>
              <li>
                <Link href="/eyeglasses" className="hover:text-white transition-colors">
                  Optical Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/eyeglasses?material=Pure+Titanium" className="hover:text-white transition-colors">
                  Japanese Titanium Frames
                </Link>
              </li>
              <li>
                <Link href="/lenses" className="hover:text-white transition-colors">
                  Zeiss & Essilor Lenses
                </Link>
              </li>
              <li>
                <Link href="/contact-lenses" className="hover:text-white transition-colors">
                  Contact Lenses & Care
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-[#B89B6A] hover:underline">
                  Special Privilege Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Services */}
          <div>
            <h4 className="font-sans uppercase tracking-[0.26em] text-[10.5px] font-bold text-[#B89B6A] mb-4">
              Services & Salon
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89F95]">
              <li>
                <Link href="/book-eye-test" className="text-[#D4BE96] font-medium hover:text-white transition-colors">
                  Book Free Eye Test
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Optical Heritage
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Brand Directory
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Vision Health Journal
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Store Showroom Details */}
          <div>
            <h4 className="font-sans uppercase tracking-[0.26em] text-[10.5px] font-bold text-[#B89B6A] mb-4">
              Visit Showroom
            </h4>
            <div className="space-y-3 text-xs text-[#A89F95]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B89B6A] shrink-0 mt-0.5" />
                <span className="font-light">{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B89B6A] shrink-0" />
                <span className="font-light">{TIMINGS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B89B6A] shrink-0" />
                <a href={`tel:${PHONE}`} className="hover:text-white font-mono transition-colors">
                  {PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B89B6A] shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white font-mono transition-colors">
                  {EMAIL}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink("Hello DemoOptics Concierge, I would like to visit the showroom.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-white/5 border border-white/10 text-[#D4BE96] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors text-[10px] uppercase tracking-[0.18em] font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Catalogue Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A89F95]/70 gap-3">
          <p>© {new Date().getFullYear()} {STORE_NAME} Optical Showroom. All rights reserved.</p>
          <p className="text-center sm:text-right font-light">
            Showroom Catalogue & Appointment Service. No online payment or cart. All eyewear customized at our Indiranagar lounge.
          </p>
        </div>
      </div>
    </footer>
  );
}
