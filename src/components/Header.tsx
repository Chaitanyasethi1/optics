"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Glasses, 
  Search, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Calendar,
  Sparkles,
  MapPin,
  Clock
} from "lucide-react";
import { STORE_NAME, PHONE, WHATSAPP_NUMBER, getWhatsAppLink } from "@/data/config";
import SearchModal from "@/components/SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* 1. Slim Top Announcement Bar */}
      <div className="bg-[#F3ECE2] border-b border-[#EADFD2] text-xs py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[#7C746C]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#7A5A43]">
              <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
              Free Comprehensive 14-Step Eye Examination at Store
            </span>
            <span className="hidden md:inline text-[#D9BFA3]">•</span>
            <span className="hidden md:inline">Certified Zeiss & Essilor Master Optometrists</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-[#7A5A43]">
              <Clock className="w-3.5 h-3.5 text-[#B08968]" />
              Mon-Sun: 10 AM - 9 PM
            </span>
            <span className="text-[#D9BFA3]">•</span>
            <Link
              href="/book-eye-test"
              className="text-[#7A5A43] hover:text-[#2B2622] font-semibold underline underline-offset-2 transition-colors"
            >
              Book Complimentary Slot
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#EADFD2]"
            : "bg-[#FAF7F2] border-b border-[#EADFD2]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-[#F3ECE2] border border-[#EADFD2] flex items-center justify-center text-[#7A5A43] group-hover:bg-[#B08968] group-hover:text-white transition-all duration-300">
                <Glasses className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#2B2622]">
                  {STORE_NAME}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#B08968] font-medium -mt-1">
                  Optical Showroom
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation with Mega Menus */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname === "/" ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                Home
              </Link>

              {/* Sunglasses with Mega Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("sunglasses")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/sunglasses"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                    pathname.startsWith("/sunglasses") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                  }`}
                >
                  Sunglasses
                  <ChevronDown className="w-3.5 h-3.5 text-[#B08968] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu */}
                {activeDropdown === "sunglasses" && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-[#EADFD2] shadow-xl rounded-2xl p-5 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold mb-3">
                      Curated By Gender & Need
                    </div>
                    <div className="grid grid-cols-2 gap-2 pb-4 border-b border-[#EADFD2]">
                      <Link href="/sunglasses?gender=Men" className="text-sm text-[#2B2622] hover:text-[#7A5A43] py-1 transition-colors">
                        Men&apos;s Sunglasses
                      </Link>
                      <Link href="/sunglasses?gender=Women" className="text-sm text-[#2B2622] hover:text-[#7A5A43] py-1 transition-colors">
                        Women&apos;s Sunglasses
                      </Link>
                      <Link href="/sunglasses?gender=Kids" className="text-sm text-[#2B2622] hover:text-[#7A5A43] py-1 transition-colors">
                        Kids UV-Shield
                      </Link>
                      <Link href="/sunglasses?filter=polarized" className="text-sm text-[#7A5A43] font-medium py-1 transition-colors">
                        Polarized High Clarity
                      </Link>
                    </div>

                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold mt-4 mb-2">
                      Popular Silhouettes
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[#7C746C]">
                      <Link href="/sunglasses?shape=Aviator" className="hover:text-[#2B2622]">Aviator Pilot</Link>
                      <Link href="/sunglasses?shape=Wayfarer" className="hover:text-[#2B2622]">Retro Wayfarer</Link>
                      <Link href="/sunglasses?shape=Round" className="hover:text-[#2B2622]">Round Vintage</Link>
                      <Link href="/sunglasses?shape=Cat-eye" className="hover:text-[#2B2622]">Oversized Cat-Eye</Link>
                      <Link href="/sunglasses?shape=Square" className="hover:text-[#2B2622]">Executive Square</Link>
                      <Link href="/sunglasses?shape=Geometric" className="hover:text-[#2B2622]">Bold Geometric</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Eyeglasses with Mega Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("eyeglasses")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/eyeglasses"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                    pathname.startsWith("/eyeglasses") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                  }`}
                >
                  Eyeglasses
                  <ChevronDown className="w-3.5 h-3.5 text-[#B08968] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {activeDropdown === "eyeglasses" && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-[#EADFD2] shadow-xl rounded-2xl p-5 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold mb-3">
                      Master Craftsmanship
                    </div>
                    <div className="grid grid-cols-2 gap-2 pb-4 border-b border-[#EADFD2]">
                      <Link href="/eyeglasses?material=Pure+Titanium" className="text-sm font-medium text-[#7A5A43] hover:underline py-1">
                        Japanese Titanium
                      </Link>
                      <Link href="/eyeglasses?shape=Rimless" className="text-sm text-[#2B2622] hover:text-[#7A5A43] py-1">
                        Rimless Minimalist
                      </Link>
                      <Link href="/eyeglasses?material=Handcrafted+Italian+Acetate" className="text-sm text-[#2B2622] hover:text-[#7A5A43] py-1">
                        Italian Mazzucchelli
                      </Link>
                      <Link href="/eyeglasses?gender=Women" className="text-sm text-[#2B2622] hover:text-[#7A5A43] py-1">
                        Women&apos;s Optical
                      </Link>
                    </div>

                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold mt-4 mb-2">
                      Browse by Frame Shape
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[#7C746C]">
                      <Link href="/eyeglasses?shape=Aviator" className="hover:text-[#2B2622]">Aviator Frames</Link>
                      <Link href="/eyeglasses?shape=Round" className="hover:text-[#2B2622]">Intellectual Round</Link>
                      <Link href="/eyeglasses?shape=Cat-eye" className="hover:text-[#2B2622]">Sculpted Cat-eye</Link>
                      <Link href="/eyeglasses?shape=Wayfarer" className="hover:text-[#2B2622]">Classic Wayfarer</Link>
                      <Link href="/eyeglasses?shape=Rectangle" className="hover:text-[#2B2622]">Clean Rectangle</Link>
                      <Link href="/eyeglasses?shape=Square" className="hover:text-[#2B2622]">Architectural Square</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Lenses with Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("lenses")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/lenses"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                    pathname.startsWith("/lenses") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                  }`}
                >
                  Lenses
                  <ChevronDown className="w-3.5 h-3.5 text-[#B08968] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {activeDropdown === "lenses" && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-[#EADFD2] shadow-xl rounded-2xl p-5 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold mb-3">
                      Precision Ophthalmic Solutions
                    </div>
                    <div className="space-y-2 text-sm">
                      <Link href="/lenses" className="block text-[#2B2622] hover:text-[#7A5A43] p-1.5 rounded-lg hover:bg-[#FAF7F2]">
                        <span className="font-medium">Single Vision</span>
                        <span className="block text-xs text-[#7C746C]">Zeiss SmartLife & Essilor Crizal Sapphire</span>
                      </Link>
                      <Link href="/lenses" className="block text-[#2B2622] hover:text-[#7A5A43] p-1.5 rounded-lg hover:bg-[#FAF7F2]">
                        <span className="font-medium">Progressive (Multifocal)</span>
                        <span className="block text-xs text-[#7C746C]">Varilux Comfort Max & Zeiss Individual</span>
                      </Link>
                      <Link href="/lenses" className="block text-[#2B2622] hover:text-[#7A5A43] p-1.5 rounded-lg hover:bg-[#FAF7F2]">
                        <span className="font-medium">Blue Cut & Digital Relax</span>
                        <span className="block text-xs text-[#7C746C]">HOYA Sync III Accommodation Support</span>
                      </Link>
                      <Link href="/lenses" className="block text-[#2B2622] hover:text-[#7A5A43] p-1.5 rounded-lg hover:bg-[#FAF7F2]">
                        <span className="font-medium">Photochromic & Night Drive</span>
                        <span className="block text-xs text-[#7C746C]">Transitions Gen S & Zeiss DriveSafe</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact-lenses"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/contact-lenses") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                Contact Lenses
              </Link>

              <Link
                href="/watches"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/watches") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                Watches
              </Link>

              <Link
                href="/brands"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/brands") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                Brands
              </Link>

              <Link
                href="/offers"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/offers") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                <span className="inline-flex items-center gap-1 text-[#7A5A43]">
                  Offers
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08968]"></span>
                </span>
              </Link>

              <Link
                href="/blog"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/blog") ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  pathname === "/contact" ? "text-[#7A5A43] font-semibold" : "text-[#2B2622] hover:text-[#7A5A43]"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Actions (Search, WhatsApp, Book Eye Test CTA - NO CART, NO ACCOUNT) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search catalogue"
                className="p-2.5 rounded-full text-[#2B2622] hover:text-[#7A5A43] hover:bg-[#F3ECE2] transition-colors"
                title="Search frames & lenses"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* WhatsApp direct link */}
              <a
                href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to ask a question regarding your optical showroom collection.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp"
                className="p-2.5 rounded-full text-[#7A5A43] bg-[#F3ECE2] hover:bg-[#B08968] hover:text-white transition-all duration-300"
                title="Direct WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Book Free Eye Test CTA Pill */}
              <Link
                href="/book-eye-test"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase tracking-[0.12em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] shadow-sm transition-all duration-300"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free Eye Test</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="xl:hidden p-2.5 rounded-full text-[#2B2622] hover:bg-[#F3ECE2] transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#FAF7F2] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-[#EADFD2]">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EADFD2]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#7A5A43]">
                    <Glasses className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-xl font-medium text-[#2B2622]">
                    {STORE_NAME}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full text-[#7C746C] hover:text-[#2B2622] hover:bg-[#F3ECE2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-6 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Home
                </Link>
                <Link
                  href="/sunglasses"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Sunglasses
                </Link>
                <Link
                  href="/eyeglasses"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Eyeglasses
                </Link>
                <Link
                  href="/lenses"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Lenses
                </Link>
                <Link
                  href="/contact-lenses"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Contact Lenses
                </Link>
                <Link
                  href="/watches"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Watches
                </Link>
                <Link
                  href="/brands"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Brands
                </Link>
                <Link
                  href="/offers"
                  className="block px-3 py-2.5 text-base font-serif text-[#7A5A43] font-medium rounded-lg hover:bg-[#F3ECE2]"
                >
                  Special Offers
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Eye Care Blog
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2.5 text-base font-serif text-[#2B2622] hover:text-[#7A5A43] rounded-lg hover:bg-[#F3ECE2]"
                >
                  Visit & Contact
                </Link>
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-[#EADFD2] space-y-3">
              <Link
                href="/book-eye-test"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Free Eye Test
              </Link>
              <a
                href={getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to inquire about your eyewear collection.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Showroom
              </a>
              <a
                href={`tel:${PHONE}`}
                className="w-full inline-flex items-center justify-center gap-2 text-xs text-[#7C746C] hover:text-[#2B2622] pt-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Call: {PHONE}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. Live Local Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
