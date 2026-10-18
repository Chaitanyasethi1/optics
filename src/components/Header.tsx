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
  Calendar,
  Sparkles,
  Clock,
  ArrowRight
} from "lucide-react";
import { STORE_NAME, PHONE, getWhatsAppLink } from "@/data/config";
import SearchModal from "@/components/SearchModal";

const ANNOUNCEMENTS = [
  {
    tag: "MAISON SALE",
    text: "Seasonal Private Atelier: Enjoy Up to 40% Off Handcrafted Sunglasses & Optical Frames",
    cta: "Explore Offers",
    href: "/offers",
  },
  {
    tag: "PRECISION CLINIC",
    text: "Complimentary 14-Step Precision Eye Examination with Master Optometrists (Worth ₹1,500)",
    cta: "Book Free Slot",
    href: "/book-eye-test",
  },
  {
    tag: "AR STUDIO",
    text: "Virtual Try-On Salon: Fit Curated Designer Frames Live on Your Face in Real Time",
    cta: "Try Frames Now",
    href: "/try-on",
  },
  {
    tag: "BESPOKE LENSES",
    text: "Complimentary Zeiss Anti-Reflective Coating on all Progressive Lenses",
    cta: "Explore Lenses",
    href: "/lenses",
  },
  {
    tag: "AUTHENTIC MAISONS",
    text: "100% Certified Original Maisons: Gucci • Ray-Ban • Montblanc • Silhouette • Oakley",
    cta: "Explore Brands",
    href: "/brands",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Announcement rotator state
  const [currentNotice, setCurrentNotice] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const nextNotice = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentNotice((prev) => (prev + 1) % ANNOUNCEMENTS.length);
      setIsFading(false);
    }, 200);
  };

  const prevNotice = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentNotice((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
      setIsFading(false);
    }, 200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextNotice();
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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

  const navLinkStyle = (href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `relative py-1 text-[11.5px] 2xl:text-xs uppercase tracking-[0.14em] 2xl:tracking-[0.16em] font-medium whitespace-nowrap transition-colors duration-300 ${
      isActive ? "text-[#B89B6A] font-semibold" : "text-[#14110F] hover:text-[#B89B6A]"
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#B89B6A] after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;
  };

  return (
    <>
      {/* 1. Ultra-Refined Luxury Top Announcement Bar */}
      <div className="bg-[#EDE5D8] border-b border-[#14110F]/10 text-xs py-2 px-4 transition-colors">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Maison Tag & Interactive Controls */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#14110F] text-[#D4BE96] text-[9px] font-mono uppercase tracking-[0.2em] font-medium shadow-2xs">
              {ANNOUNCEMENTS[currentNotice].tag}
            </span>
            <div className="flex items-center gap-1 text-[#7A7168] pl-1 select-none">
              <button
                onClick={prevNotice}
                aria-label="Previous announcement"
                className="w-4 h-4 flex items-center justify-center hover:text-[#14110F] transition-colors text-xs font-bold"
              >
                ‹
              </button>
              <span className="text-[10px] font-mono tracking-tighter text-[#7A7168]">
                {currentNotice + 1}/{ANNOUNCEMENTS.length}
              </span>
              <button
                onClick={nextNotice}
                aria-label="Next announcement"
                className="w-4 h-4 flex items-center justify-center hover:text-[#14110F] transition-colors text-xs font-bold"
              >
                ›
              </button>
            </div>
          </div>

          {/* Center: Curated Announcement with Smooth Cross-Fade */}
          <div className="flex-1 flex items-center justify-center text-center px-2 overflow-hidden">
            <div
              className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                isFading ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89B6A] shrink-0" />
              <span className="text-[11.5px] sm:text-xs font-medium tracking-[0.02em] text-[#14110F]">
                {ANNOUNCEMENTS[currentNotice].text}
              </span>
              <Link
                href={ANNOUNCEMENTS[currentNotice].href}
                className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-[#B89B6A] hover:text-[#7A5A43] underline underline-offset-3 ml-1.5 transition-colors whitespace-nowrap"
              >
                <span>{ANNOUNCEMENTS[currentNotice].cta}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right: Flagship Showroom Hours & All Offers */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#7A7168] shrink-0">
            <span className="flex items-center gap-1.5 text-[#14110F]">
              <Clock className="w-3.5 h-3.5 text-[#B89B6A]" />
              <span>Flagship: 10 AM – 9 PM</span>
            </span>
            <span className="text-[#B89B6A]">•</span>
            <Link
              href="/offers"
              className="text-[#14110F] hover:text-[#B89B6A] font-medium uppercase tracking-[0.14em] text-[10.5px] transition-colors"
            >
              All Privileges →
            </Link>
          </div>

        </div>
      </div>

      {/* 2. Main Sticky Header with Maison Blur & Hairline Border */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#F7F3EC]/95 backdrop-blur-md shadow-xs border-b border-[#14110F]/8 py-2.5 sm:py-3"
            : "bg-[#F7F3EC] border-b border-[#14110F]/8 py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-14">
            {/* Left: Brand Logo (shrink-0 with clean spacing) */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 mr-2 lg:mr-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[2px] bg-[#EDE5D8] border border-[#14110F]/10 flex items-center justify-center text-[#14110F] group-hover:bg-[#B89B6A] group-hover:text-[#14110F] transition-all duration-300 shrink-0">
                <Glasses className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="font-serif text-xl sm:text-2xl 2xl:text-3xl font-medium tracking-tight text-[#14110F] whitespace-nowrap">
                  {STORE_NAME}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#B89B6A] font-medium -mt-1 whitespace-nowrap">
                  Haute Optique
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation with Mega Menus (HOME removed for clean luxury maison UX) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 justify-center flex-1 min-w-0 px-2">
              {/* Sunglasses with Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("sunglasses")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/sunglasses"
                  className={`inline-flex items-center gap-1 ${navLinkStyle("/sunglasses")}`}
                >
                  Sunglasses
                  <ChevronDown className="w-3 h-3 text-[#B89B6A] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {activeDropdown === "sunglasses" && (
                  <div className="absolute top-full left-0 w-80 bg-[#F7F3EC] border border-[#14110F]/10 shadow-xl rounded-[2px] p-6 mt-2 animate-in fade-in duration-200 z-50">
                    <div className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B89B6A] font-semibold mb-3">
                      Haute Sunwear
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="font-medium text-[#14110F] block mb-2">By Demographic</span>
                        <div className="space-y-1.5 text-[#7A7168]">
                          <Link href="/sunglasses?gender=Men" className="block hover:text-[#B89B6A]">Gentlemen</Link>
                          <Link href="/sunglasses?gender=Women" className="block hover:text-[#B89B6A]">Ladies</Link>
                          <Link href="/sunglasses?gender=Kids" className="block hover:text-[#B89B6A]">Juniors</Link>
                          <Link href="/sunglasses?gender=Unisex" className="block hover:text-[#B89B6A]">Unisex Atelier</Link>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-[#14110F] block mb-2">Iconic Silhouettes</span>
                        <div className="space-y-1.5 text-[#7A7168]">
                          <Link href="/sunglasses?shape=Aviator" className="block hover:text-[#B89B6A]">Aviator</Link>
                          <Link href="/sunglasses?shape=Wayfarer" className="block hover:text-[#B89B6A]">Wayfarer</Link>
                          <Link href="/sunglasses?shape=Round" className="block hover:text-[#B89B6A]">Round & Oval</Link>
                          <Link href="/sunglasses?shape=Cat-eye" className="block hover:text-[#B89B6A]">Sculpted Cat-eye</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Eyeglasses with Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("eyeglasses")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/eyeglasses"
                  className={`inline-flex items-center gap-1 ${navLinkStyle("/eyeglasses")}`}
                >
                  Eyeglasses
                  <ChevronDown className="w-3 h-3 text-[#B89B6A] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {activeDropdown === "eyeglasses" && (
                  <div className="absolute top-full left-0 w-80 bg-[#F7F3EC] border border-[#14110F]/10 shadow-xl rounded-[2px] p-6 mt-2 animate-in fade-in duration-200 z-50">
                    <div className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B89B6A] font-semibold mb-3">
                      Architectural Optical Frames
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-[#7A7168]">
                      <Link href="/eyeglasses?shape=Aviator" className="hover:text-[#B89B6A]">Aviator Frames</Link>
                      <Link href="/eyeglasses?shape=Round" className="hover:text-[#B89B6A]">Intellectual Round</Link>
                      <Link href="/eyeglasses?shape=Cat-eye" className="hover:text-[#B89B6A]">Sculpted Cat-eye</Link>
                      <Link href="/eyeglasses?shape=Wayfarer" className="hover:text-[#B89B6A]">Classic Wayfarer</Link>
                      <Link href="/eyeglasses?shape=Rectangle" className="hover:text-[#B89B6A]">Clean Rectangle</Link>
                      <Link href="/eyeglasses?shape=Square" className="hover:text-[#B89B6A]">Architectural Square</Link>
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
                  className={`inline-flex items-center gap-1 ${navLinkStyle("/lenses")}`}
                >
                  Lenses
                  <ChevronDown className="w-3 h-3 text-[#B89B6A] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {activeDropdown === "lenses" && (
                  <div className="absolute top-full left-0 w-80 bg-[#F7F3EC] border border-[#14110F]/10 shadow-xl rounded-[2px] p-6 mt-2 animate-in fade-in duration-200 z-50">
                    <div className="text-[10px] font-sans uppercase tracking-[0.24em] text-[#B89B6A] font-semibold mb-3">
                      Precision Ophthalmic Solutions
                    </div>
                    <div className="space-y-2 text-xs">
                      <Link href="/lenses" className="block text-[#14110F] hover:text-[#B89B6A] p-1.5 rounded-[2px] hover:bg-[#EDE5D8]">
                        <span className="font-medium">Single Vision</span>
                        <span className="block text-[11px] text-[#7A7168]">Zeiss SmartLife & Essilor Crizal Sapphire</span>
                      </Link>
                      <Link href="/lenses" className="block text-[#14110F] hover:text-[#B89B6A] p-1.5 rounded-[2px] hover:bg-[#EDE5D8]">
                        <span className="font-medium">Progressive (Multifocal)</span>
                        <span className="block text-[11px] text-[#7A7168]">Varilux Comfort Max & Zeiss Individual</span>
                      </Link>
                      <Link href="/lenses" className="block text-[#14110F] hover:text-[#B89B6A] p-1.5 rounded-[2px] hover:bg-[#EDE5D8]">
                        <span className="font-medium">Blue Cut & Digital Relax</span>
                        <span className="block text-[11px] text-[#7A7168]">HOYA Sync III Digital Ergonomics</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/contact-lenses" className={navLinkStyle("/contact-lenses")}>
                Contact Lenses
              </Link>

              {/* VIRTUAL TRY-ON LINK (NEW FEATURE) */}
              <Link
                href="/try-on"
                className={`relative inline-flex items-center gap-1.5 py-1 text-[11.5px] 2xl:text-xs uppercase tracking-[0.14em] 2xl:tracking-[0.16em] font-medium whitespace-nowrap transition-colors ${
                  pathname === "/try-on" ? "text-[#B89B6A] font-semibold" : "text-[#14110F] hover:text-[#B89B6A]"
                }`}
              >
                <span>Virtual Try-On</span>
                <span className="px-1.5 py-0.5 text-[7.5px] 2xl:text-[8px] uppercase tracking-wider font-mono bg-[#14110F] text-[#D4BE96] border border-[#B89B6A]/30 rounded-[2px]">
                  AR
                </span>
              </Link>

              <Link href="/brands" className={navLinkStyle("/brands")}>
                Brands
              </Link>

              <Link href="/offers" className={navLinkStyle("/offers")}>
                Offers
              </Link>

              <Link href="/contact" className={navLinkStyle("/contact")}>
                Contact
              </Link>
            </nav>

            {/* Right: Actions (Search, WhatsApp, Book Eye Test CTA - NO CART, NO ACCOUNT) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2 lg:ml-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search catalogue"
                className="p-2 text-[#14110F] hover:text-[#B89B6A] transition-colors shrink-0"
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
                className="p-2 text-[#14110F] hover:text-[#B89B6A] transition-colors shrink-0"
                title="Direct WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Book Free Eye Test CTA Pill - Pure Maison Luxury */}
              <Link
                href="/book-eye-test"
                className="hidden lg:inline-flex items-center gap-2 px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-[2px] text-[10px] uppercase tracking-[0.18em] font-sans font-medium bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#B89B6A]/30 shadow-xs transition-all duration-300 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B89B6A]" />
                <span className="whitespace-nowrap">Book Free Eye Test</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="xl:hidden p-2 text-[#14110F] hover:text-[#B89B6A] transition-colors shrink-0"
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
            className="fixed inset-0 bg-[#14110F]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#F7F3EC] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-[#14110F]/10">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#14110F]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[2px] bg-[#EDE5D8] flex items-center justify-center text-[#14110F]">
                    <Glasses className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-xl font-medium text-[#14110F]">
                    {STORE_NAME}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-[#7A7168] hover:text-[#14110F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-6 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Home
                </Link>
                <Link
                  href="/try-on"
                  className="flex items-center justify-between px-3 py-2.5 text-base font-serif text-[#B89B6A] font-medium rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  <span>Virtual Try-On</span>
                  <span className="px-2 py-0.5 text-[9px] uppercase font-mono bg-[#14110F] text-[#B89B6A] rounded-[2px]">
                    NEW
                  </span>
                </Link>
                <Link
                  href="/sunglasses"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Sunglasses
                </Link>
                <Link
                  href="/eyeglasses"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Eyeglasses
                </Link>
                <Link
                  href="/lenses"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Lenses
                </Link>
                <Link
                  href="/contact-lenses"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Contact Lenses
                </Link>
                <Link
                  href="/brands"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Brands
                </Link>
                <Link
                  href="/offers"
                  className="block px-3 py-2.5 text-base font-serif text-[#B89B6A] font-medium rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Special Offers
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Eye Care Blog
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2.5 text-base font-serif text-[#14110F] hover:text-[#B89B6A] rounded-[2px] hover:bg-[#EDE5D8]"
                >
                  Visit & Contact
                </Link>
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-[#14110F]/10 space-y-3">
              <Link
                href="/book-eye-test"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] text-xs uppercase tracking-[0.16em] font-medium bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Eye Test</span>
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] text-xs uppercase tracking-[0.16em] font-medium border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#B89B6A]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
