"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TRYON_FRAMES, TryOnFrame } from "@/data/tryon";
import TryOnStage from "./TryOnStage";
import FrameCarousel from "./FrameCarousel";
import TryOnControls from "./TryOnControls";
import Eyebrow from "@/components/ui/Eyebrow";
import { Sparkles, Sun, Eye, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TryOnStudioClient() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");

  // Determine initial frame from query param or fallback to first frame
  const initialFrame =
    TRYON_FRAMES.find((f) => f.slug === productSlug) || TRYON_FRAMES[0];

  const [selectedFrame, setSelectedFrame] = useState<TryOnFrame>(initialFrame);
  const [selectedTintId, setSelectedTintId] = useState<string>(initialFrame.defaultTint);
  const [sizeAdjustment, setSizeAdjustment] = useState<number>(0);
  const [verticalAdjustment, setVerticalAdjustment] = useState<number>(0);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [detectedFaceShape, setDetectedFaceShape] = useState<"Oval" | "Round" | "Square" | "Heart" | null>(null);

  // Update selected frame if query param changes
  useEffect(() => {
    if (productSlug) {
      const match = TRYON_FRAMES.find((f) => f.slug === productSlug);
      if (match) {
        setSelectedFrame(match);
        setSelectedTintId(match.defaultTint);
      }
    }
  }, [productSlug]);

  const handleSelectFrame = (frame: TryOnFrame) => {
    setSelectedFrame(frame);
    setSelectedTintId(frame.defaultTint);
  };

  const handleResetAdjustments = () => {
    setSizeAdjustment(0);
    setVerticalAdjustment(0);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
      {/* Studio Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[#14110F]/10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs uppercase font-sans tracking-[0.16em] text-[#7A7168] hover:text-[#14110F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Showroom</span>
            </Link>
            <span className="text-[#14110F]/20">•</span>
            <Eyebrow>BESPOKE AUGMENTED ATELIER</Eyebrow>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
            Virtual Try-On Studio
          </h1>
        </div>

        {/* Studio Tips & Quality Badge */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A7168]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#EDE5D8]/70 border border-[#14110F]/8">
            <Sun className="w-3.5 h-3.5 text-[#B89B6A]" />
            Natural lighting recommended
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#EDE5D8]/70 border border-[#14110F]/8">
            <Eye className="w-3.5 h-3.5 text-[#B89B6A]" />
            Direct eye-level posture
          </span>
        </div>
      </div>

      {/* Main Split Desktop Studio Layout (Left: Mirror Stage | Right: Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        {/* Left Column: Camera / Fitting Mirror Stage (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <TryOnStage
            selectedFrame={selectedFrame}
            selectedTintId={selectedTintId}
            sizeAdjustment={sizeAdjustment}
            verticalAdjustment={verticalAdjustment}
            compareMode={compareMode}
            onFaceShapeDetected={(shape) => setDetectedFaceShape(shape)}
          />
        </div>

        {/* Right Column: Frame Carousel & Fitting Adjustments (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Frame Selector Carousel */}
          <div className="p-5 bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-sans tracking-[0.24em] font-semibold text-[#14110F]">
                Curated Try-On Frames
              </span>
              <span className="text-[10px] uppercase font-mono text-[#B89B6A]">
                {TRYON_FRAMES.length} Available
              </span>
            </div>

            <FrameCarousel
              frames={TRYON_FRAMES}
              selectedFrame={selectedFrame}
              onSelectFrame={handleSelectFrame}
              detectedFaceShape={detectedFaceShape}
            />
          </div>

          {/* Controls: Tints, Sliders & WhatsApp CTAs */}
          <TryOnControls
            selectedFrame={selectedFrame}
            selectedTintId={selectedTintId}
            onSelectTint={(tintId) => setSelectedTintId(tintId)}
            sizeAdjustment={sizeAdjustment}
            setSizeAdjustment={setSizeAdjustment}
            verticalAdjustment={verticalAdjustment}
            setVerticalAdjustment={setVerticalAdjustment}
            onResetAdjustments={handleResetAdjustments}
            compareMode={compareMode}
            setCompareMode={setCompareMode}
            detectedFaceShape={detectedFaceShape}
          />
        </div>
      </div>
    </div>
  );
}
