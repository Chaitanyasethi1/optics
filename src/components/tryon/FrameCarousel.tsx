"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TryOnFrame } from "@/data/tryon";
import PriceReveal from "@/components/PriceReveal";

interface FrameCarouselProps {
  frames: TryOnFrame[];
  selectedFrame: TryOnFrame;
  onSelectFrame: (frame: TryOnFrame) => void;
  detectedFaceShape?: "Oval" | "Round" | "Square" | "Heart" | null;
}

export default function FrameCarousel({
  frames,
  selectedFrame,
  onSelectFrame,
  detectedFaceShape,
}: FrameCarouselProps) {
  const [categoryFilter, setCategoryFilter] = useState<"all" | "sunglasses" | "eyeglasses">("all");
  const [genderFilter, setGenderFilter] = useState<"all" | "Men" | "Women" | "Unisex">("all");

  const filteredFrames = frames.filter((frame) => {
    if (categoryFilter !== "all" && frame.category !== categoryFilter) return false;
    if (genderFilter !== "all" && frame.gender !== genderFilter && frame.gender !== "Unisex") return false;
    return true;
  });

  return (
    <div className="w-full space-y-4">
      {/* Category & Gender Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#14110F]/8">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 text-[10px] uppercase font-sans tracking-[0.18em] font-bold rounded-[2px] transition-colors ${
              categoryFilter === "all"
                ? "bg-[#14110F] text-[#F7F3EC]"
                : "bg-[#EDE5D8]/50 text-[#7A7168] hover:text-[#14110F]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter("sunglasses")}
            className={`px-3 py-1.5 text-[10px] uppercase font-sans tracking-[0.18em] font-bold rounded-[2px] transition-colors ${
              categoryFilter === "sunglasses"
                ? "bg-[#14110F] text-[#F7F3EC]"
                : "bg-[#EDE5D8]/50 text-[#7A7168] hover:text-[#14110F]"
            }`}
          >
            Sunwear
          </button>
          <button
            onClick={() => setCategoryFilter("eyeglasses")}
            className={`px-3 py-1.5 text-[10px] uppercase font-sans tracking-[0.18em] font-bold rounded-[2px] transition-colors ${
              categoryFilter === "eyeglasses"
                ? "bg-[#14110F] text-[#F7F3EC]"
                : "bg-[#EDE5D8]/50 text-[#7A7168] hover:text-[#14110F]"
            }`}
          >
            Optical
          </button>
        </div>

        <div className="flex items-center gap-1">
          {(["all", "Men", "Women"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`px-2.5 py-1 text-[9px] uppercase font-sans tracking-[0.16em] rounded-[2px] transition-colors ${
                genderFilter === g
                  ? "text-[#B89B6A] font-bold underline underline-offset-4"
                  : "text-[#7A7168] hover:text-[#14110F] font-medium"
              }`}
            >
              {g === "all" ? "Gender: All" : g}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Cards Horizontal Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[290px] overflow-y-auto pr-1">
        {filteredFrames.map((frame) => {
          const isSelected = selectedFrame.id === frame.id;
          const isRecommended = detectedFaceShape && frame.suitableFaceShapes.includes(detectedFaceShape);

          return (
            <div
              key={frame.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectFrame(frame)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectFrame(frame);
                }
              }}
              className={`relative text-left p-2.5 rounded-[2px] border transition-all duration-300 group flex flex-col justify-between cursor-pointer select-none ${
                isSelected
                  ? "bg-[#EDE5D8] border-[#B89B6A] ring-1 ring-[#B89B6A] shadow-xs"
                  : "bg-[#F7F3EC] border-[#14110F]/10 hover:border-[#B89B6A]/50 hover:bg-[#EDE5D8]/40"
              }`}
            >
              {/* Face Shape Match Badge */}
              {isRecommended && (
                <span className="absolute top-2 right-2 z-10 px-1.5 py-0.5 text-[7.5px] uppercase font-mono font-bold tracking-widest bg-[#14110F] text-[#B89B6A] rounded-[2px]">
                  Match
                </span>
              )}

              {/* Thumbnail */}
              <div className="relative aspect-[4/3] w-full bg-[#EDE5D8]/50 rounded-[2px] overflow-hidden mb-2">
                <Image
                  src={frame.image}
                  alt={frame.name}
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div>
                <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#B89B6A] font-bold block">
                  {frame.brand}
                </span>
                <span className="font-serif text-xs text-[#14110F] font-medium line-clamp-1 block leading-snug">
                  {frame.name}
                </span>
                <div className="mt-1 min-h-[22px] flex items-center">
                  <PriceReveal
                    id={frame.id}
                    price={frame.price}
                    productName={`${frame.brand} ${frame.name}`}
                    size="xs"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
