"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { playApertureClick } from "@/lib/audioHaptics";

export default function EyewearSplashIntro() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"spinning" | "opening" | "done">("spinning");

  useEffect(() => {
    setMounted(true);

    // 1. Upright 360° turntable rotation for 1.1s
    const spinTimer = setTimeout(() => {
      playApertureClick();
      setPhase("opening");
    }, 1100);

    // 2. Center split completes fast (450ms) -> done at 1.55s
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 1550);

    return () => {
      clearTimeout(spinTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const handleOpenNow = () => {
    if (phase === "done") return;
    playApertureClick();
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
    }, 400);
  };

  if (!mounted || phase === "done") return null;

  return (
    <div
      onClick={handleOpenNow}
      className="fixed inset-0 z-[9999] select-none cursor-pointer overflow-hidden pointer-events-auto"
      title="Click to open"
    >
      {/* ========================================================
          TOP HALF (Slides UP from center)
          ======================================================== */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: phase === "opening" ? "-100%" : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#0E0D0B] flex flex-col justify-between items-center pt-8 pb-14 border-b border-[#B89B6A]/30 overflow-hidden shadow-2xl"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute w-[500px] h-[300px] rounded-full bg-[#B89B6A]/8 blur-[100px] bottom-0 left-1/2 -translate-x-1/2" />

        {/* Top Atelier Mark */}
        <div className="flex items-center gap-2 z-10 opacity-70">
          <span className="w-6 h-[1px] bg-[#B89B6A]/60" />
          <Sparkles className="w-3 h-3 text-[#B89B6A]" />
          <span className="w-6 h-[1px] bg-[#B89B6A]/60" />
        </div>

        {/* Brand Text positioned safely ABOVE the glasses so it NEVER overlaps */}
        <motion.div
          animate={{
            opacity: phase === "opening" ? 0 : 1,
            y: phase === "opening" ? -20 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-center z-10"
        >
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.42em] text-[#B89B6A] font-bold block">
            DEMOOPTICS
          </span>
          <span className="text-[8.5px] font-sans uppercase tracking-[0.26em] text-[#FAF7F2]/50 block mt-1">
            ATELIER & SHOWROOM
          </span>
        </motion.div>
      </motion.div>

      {/* ========================================================
          BOTTOM HALF (Slides DOWN from center)
          ======================================================== */}
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: phase === "opening" ? "100%" : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute top-[50vh] left-0 right-0 h-[50vh] bg-[#0E0D0B] flex flex-col justify-between items-center pt-14 pb-8 border-t border-[#B89B6A]/30 overflow-hidden shadow-2xl"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute w-[500px] h-[300px] rounded-full bg-[#B89B6A]/8 blur-[100px] top-0 left-1/2 -translate-x-1/2" />

        {/* Tagline positioned safely BELOW the glasses so it NEVER overlaps */}
        <motion.div
          animate={{
            opacity: phase === "opening" ? 0 : 1,
            y: phase === "opening" ? 20 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-center z-10 flex flex-col items-center"
        >
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#FAF7F2]/55 font-medium block mb-3">
            HAUTE EYEWEAR & BESPOKE OPTOMETRY
          </span>

          {/* Slim progress bar */}
          <div className="w-28 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#B89B6A] to-[#F5E6CC]"
            />
          </div>
        </motion.div>

        {/* Skip hint */}
        <span className="text-[8px] font-mono tracking-[0.25em] text-[#B89B6A]/50 uppercase z-10">
          TAP TO ENTER
        </span>
      </motion.div>

      {/* ========================================================
          CENTER LUXURY SPECS (Upright 360° Turntable Rotation)
          ======================================================== */}
      <div
        className="fixed inset-0 pointer-events-none z-[10001] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: phase === "opening" ? 0 : 1,
            scale: phase === "opening" ? 1.15 : 1,
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.45 },
          }}
          className="relative w-72 h-36 sm:w-84 sm:h-40 flex items-center justify-center filter drop-shadow-[0_10px_30px_rgba(184,155,106,0.35)]"
        >
          {/* 360° Horizontal Y-Axis Turntable Spin (Stays perfectly upright!) */}
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 1.1,
              ease: [0.25, 0.1, 0.25, 1], // Smooth luxury deceleration
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full relative flex items-center justify-center"
          >
            <Image
              src="/frames/round-gold.svg"
              alt="Haute Eyewear"
              width={340}
              height={150}
              priority
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function ReplayIntroButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      title="Replay Eyewear Intro"
      className={`inline-flex items-center gap-1.5 text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#B89B6A] hover:text-[#14110F] transition-colors ${className}`}
    >
      <Sparkles className="w-3 h-3 text-[#B89B6A]" />
      <span>Replay Intro</span>
    </button>
  );
}
