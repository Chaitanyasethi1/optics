"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "01 • Maison" },
  { id: "categories", label: "02 • Departments" },
  { id: "titanium", label: "03 • Titanium" },
  { id: "polarized", label: "04 • Polarized" },
  { id: "offers", label: "05 • Privilege Offers" },
  { id: "luxury-brands", label: "06 • Haute Maisons" },
  { id: "lenses", label: "07 • Precision Optics" },
  { id: "contact-lenses", label: "08 • Contact Care" },
  { id: "why-us", label: "09 • Heritage & Care" },
  { id: "reviews", label: "10 • Testimonials" },
  { id: "instagram", label: "11 • Editorial" },
  { id: "visit", label: "12 • Showroom" },
];

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(SECTIONS[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center gap-3">
      {/* Background track line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#14110F]/10 pointer-events-none -z-10" />

      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            aria-label={`Navigate to ${sec.label}`}
          >
            {/* Tooltip on hover */}
            <span className="absolute right-7 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#14110F] bg-[#F7F3EC] border border-[#B89B6A]/40 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
              {sec.label}
            </span>

            {/* Indicator pip */}
            <span
              className={`block transition-all duration-300 rounded-full ${
                isActive
                  ? "w-2.5 h-2.5 bg-[#B89B6A] ring-4 ring-[#B89B6A]/20"
                  : "w-1.5 h-1.5 bg-[#14110F]/30 group-hover:bg-[#B89B6A]"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
