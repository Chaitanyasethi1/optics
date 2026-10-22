"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { playApertureClick } from "@/lib/audioHaptics";

/**
 * Ultra-Modern Avant-Garde Titanium Eyewear Vector
 * Sleek Japanese Geometric Silhouette with Champagne Gold & Brushed Titanium Bevels
 */
function ModernAvantGardeSpecs() {
  return (
    <svg
      viewBox="0 0 440 160"
      className="w-full h-auto max-h-[160px] select-none pointer-events-none drop-shadow-[0_8px_24px_rgba(184,155,106,0.3)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Luxury Brushed Champagne Gold Gradient */}
        <linearGradient id="modernGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="25%" stopColor="#D8BA84" />
          <stop offset="55%" stopColor="#A8864E" />
          <stop offset="80%" stopColor="#EAD2A8" />
          <stop offset="100%" stopColor="#87652E" />
        </linearGradient>

        {/* Satin Japanese Titanium Rim Gradient */}
        <linearGradient id="modernTitanium" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A4E57" />
          <stop offset="35%" stopColor="#25282E" />
          <stop offset="70%" stopColor="#1A1C20" />
          <stop offset="100%" stopColor="#3E424A" />
        </linearGradient>

        {/* Crystal Clear Sapphire Optical Glass */}
        <linearGradient id="modernSapphireLens" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.22)" />
          <stop offset="35%" stopColor="rgba(184, 155, 106, 0.08)" />
          <stop offset="70%" stopColor="rgba(56, 189, 248, 0.16)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.06)" />
        </linearGradient>

        {/* Diagonal AR Multi-Coating Glare Reflection */}
        <linearGradient id="modernARGlint" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="35%" stopColor="rgba(255, 255, 255, 0.65)" />
          <stop offset="42%" stopColor="rgba(125, 211, 252, 0.45)" />
          <stop offset="50%" stopColor="transparent" />
          <stop offset="78%" stopColor="rgba(255, 255, 255, 0.35)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* ========================================================
          LEFT LENS & FRAME (Sculpted Modern Hexagonal Contour)
          ======================================================== */}
      {/* Left Glass Base */}
      <polygon
        points="46,45 178,45 194,62 194,106 172,126 62,126 38,106 38,62"
        fill="url(#modernSapphireLens)"
      />
      {/* Left AR Glint Sheen */}
      <polygon
        points="46,45 178,45 194,62 194,106 172,126 62,126 38,106 38,62"
        fill="url(#modernARGlint)"
      />
      {/* Left Titanium Outer Rim */}
      <polygon
        points="46,45 178,45 194,62 194,106 172,126 62,126 38,106 38,62"
        stroke="url(#modernTitanium)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Left Gold Inner Chamfer Edge */}
      <polygon
        points="50,48 174,48 189,64 189,103 169,122 66,122 43,103 43,64"
        stroke="url(#modernGold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* ========================================================
          RIGHT LENS & FRAME (Symmetrical Hexagonal Contour)
          ======================================================== */}
      {/* Right Glass Base */}
      <polygon
        points="262,45 394,45 402,62 402,106 378,126 268,126 246,106 246,62"
        fill="url(#modernSapphireLens)"
      />
      {/* Right AR Glint Sheen */}
      <polygon
        points="262,45 394,45 402,62 402,106 378,126 268,126 246,106 246,62"
        fill="url(#modernARGlint)"
      />
      {/* Right Titanium Outer Rim */}
      <polygon
        points="262,45 394,45 402,62 402,106 378,126 268,126 246,106 246,62"
        stroke="url(#modernTitanium)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Right Gold Inner Chamfer Edge */}
      <polygon
        points="266,48 390,48 397,64 397,103 374,122 272,122 251,103 251,64"
        stroke="url(#modernGold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* ========================================================
          ARCHITECTURAL CENTER BRIDGE (Sleek Modern Double Bar)
          ======================================================== */}
      {/* Top Floating Brow Bar */}
      <line
        x1="178"
        y1="45"
        x2="262"
        y2="45"
        stroke="url(#modernGold)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Lower Titanium Bridge Arch */}
      <path
        d="M 194,62 Q 220,54 246,62"
        stroke="url(#modernTitanium)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Gold Center Accent Dot */}
      <circle cx="220" cy="45" r="2.2" fill="#FFF2D6" />

      {/* ========================================================
          MINIMALIST NOSE PADS
          ======================================================== */}
      <ellipse cx="198" cy="78" rx="3.5" ry="7.5" fill="#EAD2A8" opacity="0.9" />
      <ellipse cx="242" cy="78" rx="3.5" ry="7.5" fill="#EAD2A8" opacity="0.9" />

      {/* ========================================================
          CYLINDRICAL BARREL HINGES & TEMPLE ARMS
          ======================================================== */}
      {/* Left Temple Hinge Pin */}
      <path
        d="M 38,62 L 12,58"
        stroke="url(#modernGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="36" cy="62" r="2.5" fill="#FFF2D6" />

      {/* Right Temple Hinge Pin */}
      <path
        d="M 402,62 L 428,58"
        stroke="url(#modernGold)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="404" cy="62" r="2.5" fill="#FFF2D6" />
    </svg>
  );
}

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
    }, 380);
  };

  if (!mounted || phase === "done") return null;

  return (
    <div
      onClick={handleOpenNow}
      className="fixed inset-0 z-[9999] select-none cursor-pointer overflow-hidden pointer-events-auto"
      title="Click to enter showroom immediately"
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
          CENTER ULTRA-MODERN SPECS (Upright 360° Turntable Rotation)
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
          className="relative w-80 h-36 sm:w-96 sm:h-44 flex items-center justify-center filter drop-shadow-[0_12px_35px_rgba(184,155,106,0.35)]"
        >
          {/* 360° Horizontal Y-Axis Turntable Spin (Stays perfectly upright & level) */}
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
            <ModernAvantGardeSpecs />
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
