"use client";

import React from "react";
import Link from "next/link";
import { 
  MessageCircle, 
  Calendar, 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Columns,
  Glasses
} from "lucide-react";
import { TryOnFrame, LENS_TINTS } from "@/data/tryon";
import { getWhatsAppLink, STORE_NAME } from "@/data/config";
import PriceReveal from "@/components/PriceReveal";

interface TryOnControlsProps {
  selectedFrame: TryOnFrame;
  selectedTintId: string;
  onSelectTint: (tintId: string) => void;
  sizeAdjustment: number;
  setSizeAdjustment: (val: number) => void;
  verticalAdjustment: number;
  setVerticalAdjustment: (val: number) => void;
  onResetAdjustments: () => void;
  compareMode: boolean;
  setCompareMode: (val: boolean) => void;
  compareFrame?: TryOnFrame;
  onSelectCompareFrame?: (frame: TryOnFrame) => void;
  detectedFaceShape?: "Oval" | "Round" | "Square" | "Heart" | null;
}

export default function TryOnControls({
  selectedFrame,
  selectedTintId,
  onSelectTint,
  sizeAdjustment,
  setSizeAdjustment,
  verticalAdjustment,
  setVerticalAdjustment,
  onResetAdjustments,
  compareMode,
  setCompareMode,
  detectedFaceShape,
}: TryOnControlsProps) {
  const enquiryLink = getWhatsAppLink(
    `Hello ${STORE_NAME}, I just tried on the ${selectedFrame.brand} ${selectedFrame.name} (₹${selectedFrame.price.toLocaleString("en-IN")}) in your Virtual Try-On studio and would like to reserve it for an in-store fitting.`
  );

  return (
    <div className="w-full space-y-6">
      {/* 1. Selected Frame Info Card */}
      <div className="p-5 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] flex items-center justify-between">
        <div>
          <span className="text-[10.5px] font-sans uppercase tracking-[0.26em] text-[#B89B6A] font-bold block mb-0.5">
            {selectedFrame.brand} • {selectedFrame.shape}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#14110F] font-medium leading-snug">
            {selectedFrame.name}
          </h2>
          <div className="mt-1 min-h-[28px] flex items-center">
            <PriceReveal
              id={selectedFrame.id}
              price={selectedFrame.price}
              productName={`${selectedFrame.brand} ${selectedFrame.name}`}
              size="md"
            />
          </div>
        </div>

        {detectedFaceShape && selectedFrame.suitableFaceShapes.includes(detectedFaceShape) && (
          <div className="text-right">
            <span className="px-2.5 py-1 text-[9px] uppercase font-mono tracking-wider bg-[#14110F] text-[#B89B6A] border border-[#B89B6A]/30 rounded-[2px] inline-flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-[#B89B6A]" />
              Suits your {detectedFaceShape} face
            </span>
          </div>
        )}
      </div>

      {/* 2. Lens Tint Switcher (Available for all sunglasses & tintable frames) */}
      <div className="p-5 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] uppercase font-sans tracking-[0.22em] font-bold text-[#14110F]">
            Lens Tint Customization
          </span>
          <span className="text-[10px] text-[#7A7168] font-mono font-medium">Real-time shade</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {LENS_TINTS.map((tint) => {
            const isSelected = selectedTintId === tint.id;
            return (
              <button
                key={tint.id}
                onClick={() => onSelectTint(tint.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-[2px] border transition-all ${
                  isSelected
                    ? "bg-[#EDE5D8] border-[#B89B6A] ring-1 ring-[#B89B6A]"
                    : "bg-[#F7F3EC] border-[#14110F]/10 hover:border-[#B89B6A]/40"
                }`}
                title={tint.name}
              >
                <div
                  className="w-6 h-6 rounded-full border border-white/40 shadow-xs relative flex items-center justify-center"
                  style={{
                    background: tint.gradient || tint.hex,
                  }}
                >
                  {isSelected && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
                </div>
                <span className="text-[9px] font-sans text-[#14110F] line-clamp-1 text-center">
                  {tint.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Manual Precision Fit Sliders */}
      <div className="p-5 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] uppercase font-sans tracking-[0.22em] font-bold text-[#14110F] flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#B89B6A]" />
            Fine-Tune Frame Position
          </span>
          <button
            onClick={onResetAdjustments}
            className="text-[10px] uppercase font-sans tracking-widest text-[#7A7168] hover:text-[#14110F] flex items-center gap-1 font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-[11px] text-[#7A7168] mb-1 font-medium">
              <span>Frame Scale</span>
              <span className="font-mono font-bold text-[#14110F]">{sizeAdjustment > 0 ? `+${sizeAdjustment}` : sizeAdjustment}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              value={sizeAdjustment}
              onChange={(e) => setSizeAdjustment(Number(e.target.value))}
              className="w-full accent-[#B89B6A] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-[#7A7168] mb-1 font-medium">
              <span>Nasal Bridge Height</span>
              <span className="font-mono font-bold text-[#14110F]">{verticalAdjustment > 0 ? `+${verticalAdjustment}` : verticalAdjustment}px</span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              value={verticalAdjustment}
              onChange={(e) => setVerticalAdjustment(Number(e.target.value))}
              className="w-full accent-[#B89B6A] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Primary Concierge Call To Actions */}
      <div className="space-y-3 pt-2">
        <a
          href={enquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] rounded-[2px] text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Inquire on WhatsApp for Store Trial</span>
        </a>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/book-eye-test"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] rounded-[2px] text-[10.5px] font-sans uppercase tracking-[0.18em] font-bold transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B89B6A]" />
            <span>Book Free Eye Test</span>
          </Link>

          <Link
            href={`/product/${selectedFrame.slug}`}
            className="inline-flex items-center justify-center gap-1 px-4 py-3 border border-[#B89B6A] text-[#14110F] hover:bg-[#B89B6A] hover:text-[#14110F] rounded-[2px] text-[10.5px] font-sans uppercase tracking-[0.18em] font-bold transition-all"
          >
            <span>View Full Specs</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
