"use client";

import React, { useState } from "react";

interface DotNavProps {
  activeFrame: number;
  totalFrames: number;
  onSelectFrame: (index: number) => void;
  isDarkTheme?: boolean;
}

const FRAME_LABELS = [
  "01 · Hero",
  "02 · Categories",
  "03 · Titanium Suite",
  "04 · Polarized Solar",
  "05 · Atelier Offers",
  "06 · Global Maisons",
  "07 · Precision Lenses",
  "08 · Eye Test & 3D Try-On",
  "09 · Showroom & Concierge",
];

export default function DotNav({
  activeFrame,
  totalFrames,
  onSelectFrame,
  isDarkTheme = false,
}: DotNavProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav
      aria-label="Section Navigation"
      className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 select-none"
    >
      {Array.from({ length: totalFrames }).map((_, idx) => {
        const isActive = activeFrame === idx;
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={idx}
            className="relative flex items-center justify-end group py-1 cursor-pointer"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => onSelectFrame(idx)}
          >
            {/* Tooltip Label on Hover */}
            <div
              className={`absolute right-7 pointer-events-none transition-all duration-300 transform whitespace-nowrap px-2.5 py-1 rounded-[2px] text-[10px] uppercase font-mono tracking-[0.2em] font-medium shadow-md ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              } ${
                isDarkTheme
                  ? "bg-[#F7F3EC] text-[#14110F] border border-[#B89B6A]"
                  : "bg-[#14110F] text-[#F7F3EC] border border-[#B89B6A]/40"
              }`}
            >
              {FRAME_LABELS[idx]}
            </div>

            {/* Dot / Pill Indicator */}
            <button
              aria-label={`Scroll to ${FRAME_LABELS[idx]}`}
              aria-current={isActive ? "true" : undefined}
              className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                isActive
                  ? "w-2.5 h-6 bg-[#B89B6A] shadow-sm ring-2 ring-[#B89B6A]/30"
                  : isDarkTheme
                  ? "w-2 h-2 bg-white/40 hover:bg-white/90 hover:scale-125"
                  : "w-2 h-2 bg-[#14110F]/30 hover:bg-[#14110F]/80 hover:scale-125"
              }`}
            />
          </div>
        );
      })}
    </nav>
  );
}
