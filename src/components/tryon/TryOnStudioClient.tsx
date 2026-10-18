"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TRYON_FRAMES, TryOnFrame } from "@/data/tryon";
import TryOnStage from "./TryOnStage";
import FrameCarousel from "./FrameCarousel";
import TryOnControls from "./TryOnControls";
import Eyebrow from "@/components/ui/Eyebrow";
import { useTryOn } from "@/context/TryOnContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Sparkles, Sun, Eye, ShieldCheck, ArrowLeft, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TryOnStudioClient() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");

  const { isTryOnActive, userPhoto, setSetupModalOpen, setIsTryOnActive } = useTryOn();

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
            Virtual <span className="font-serif italic font-normal text-[#B89B6A]">Try-On</span> Studio
          </h1>
        </div>

        {/* Studio Setup Actions & Quality Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSetupModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-bold transition-all shadow-xs"
          >
            <Camera className="w-4 h-4 text-[#B89B6A]" />
            <span>{userPhoto ? "Change 3D Face Photo" : "Setup 3D Face Try-on"}</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[2px] bg-[#EDE5D8]/70 border border-[#14110F]/8 text-xs text-[#7A7168] font-medium">
            <Sun className="w-3.5 h-3.5 text-[#B89B6A]" />
            Natural lighting
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
              <span className="text-[10.5px] uppercase font-sans tracking-[0.24em] font-bold text-[#14110F]">
                Curated Try-On Frames
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-[#B89B6A]">
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

      {/* Lenskart-Style "All Frames on Your Face" Grid Section */}
      <div className="mt-20 pt-12 border-t border-[#14110F]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>BROWSE CATALOGUE WITH YOUR FACE</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#14110F] font-normal tracking-tight">
              All Frames Fitted to <span className="font-serif italic font-normal text-[#B89B6A]">Your Face</span>
            </h2>
            <p className="text-xs text-[#7A7168] mt-1 max-w-lg">
              {userPhoto
                ? "Every designer frame below is rendered live with your facial proportions. Click any frame to view details or inquire on WhatsApp."
                : "Click 'Setup 3D Face Try-on' above to instantly see all catalogue frames fitted onto your own face."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!userPhoto ? (
              <button
                onClick={() => setSetupModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] rounded-[2px] text-xs font-sans uppercase tracking-[0.18em] font-bold transition-all shadow-sm"
              >
                <Camera className="w-4 h-4 text-[#B89B6A]" />
                <span>Take Photo to Try All</span>
              </button>
            ) : (
              <button
                onClick={() => setSetupModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#14110F]/15 hover:border-[#B89B6A] text-[#14110F] rounded-[2px] text-xs font-sans uppercase tracking-[0.16em] font-bold transition-all"
              >
                <Camera className="w-3.5 h-3.5 text-[#B89B6A]" />
                <span>Retake Face Photo</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Column Product Grid with user face rendering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.filter((p) => p.category === "sunglasses" || p.category === "eyeglasses").slice(0, 12).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}

