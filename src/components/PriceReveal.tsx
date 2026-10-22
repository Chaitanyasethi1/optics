"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, EyeOff } from "lucide-react";
import { playApertureClick, playPriceChime } from "@/lib/audioHaptics";

const STORAGE_KEY = "optics_revealed_prices";
const listeners = new Set<() => void>();

function getRevealedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function revealPrice(id: string) {
  if (typeof window === "undefined" || !id) return;
  try {
    const set = getRevealedSet();
    set.add(id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    listeners.forEach((listener) => listener());
  } catch {
    // Ignore storage quota / private mode exceptions
  }
}

export function hidePrice(id: string) {
  if (typeof window === "undefined" || !id) return;
  try {
    const set = getRevealedSet();
    set.delete(id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    listeners.forEach((listener) => listener());
  } catch {
    // Ignore
  }
}

export function useIsPriceRevealed(id?: string): boolean {
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const check = () => {
      const set = getRevealedSet();
      setRevealed(set.has(id));
    };
    check();
    listeners.add(check);
    return () => {
      listeners.delete(check);
    };
  }, [id]);

  return revealed;
}

// Bespoke Optical Aperture (Iris) SVG Icon
function ApertureIris({
  className = "w-3 h-3",
  isFocusing = false,
}: {
  className?: string;
  isFocusing?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${isFocusing ? "animate-iris-focus" : ""}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.4" />
      <line x1="14.31" y1="8" x2="20.05" y2="17.94" stroke="#B89B6A" />
      <line x1="9.69" y1="8" x2="21.17" y2="8" stroke="#B89B6A" />
      <line x1="7.38" y1="12" x2="13.12" y2="2.06" stroke="#B89B6A" />
      <line x1="9.69" y1="16" x2="3.95" y2="6.06" stroke="#B89B6A" />
      <line x1="14.31" y1="16" x2="2.83" y2="16" stroke="#B89B6A" />
      <line x1="16.62" y1="12" x2="10.88" y2="21.94" stroke="#B89B6A" />
    </svg>
  );
}

// Rolling-digit count-up hook (600ms, cubic-bezier ease out)
function useCountUp(target: number, duration = 600, active = true) {
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    if (!active) {
      setCurrent(target);
      return;
    }
    const startTime = performance.now();
    const startVal = Math.max(0, Math.round(target * 0.65));
    let frameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      const val = Math.round(startVal + (target - startVal) * eased);
      setCurrent(val);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, active]);

  return current;
}

// Particle micro-burst on quote tap
interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface PriceRevealProps {
  id?: string;
  productId?: string;
  price: number;
  originalPrice?: number;
  oldPrice?: number;
  currency?: string;
  discountPercent?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  productName?: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "dark" | "compact" | "large";
  theme?: "light" | "dark";
  align?: "left" | "center" | "right" | "between";
  className?: string;
  buttonClassName?: string;
  priceClassName?: string;
  oldPriceClassName?: string;
  badgeClassName?: string;
  showOldPrice?: boolean;
  showDiscountBadge?: boolean;
  badgeText?: string;
}

export default function PriceReveal({
  id,
  productId,
  price,
  originalPrice,
  oldPrice: propOldPrice,
  currency = "₹",
  discountPercent,
  prefix,
  suffix,
  productName,
  size = "sm",
  theme = "light",
  align = "left",
  className = "",
  buttonClassName = "",
  priceClassName = "",
  oldPriceClassName = "",
  showOldPrice = true,
  showDiscountBadge = false,
  badgeText,
}: PriceRevealProps) {
  const effectiveId = id || productId;
  const effectiveOldPrice = propOldPrice || originalPrice;

  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "focusing" | "revealed">("idle");
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [showUnlockedBadge, setShowUnlockedBadge] = useState(false);
  const [showHideBtn, setShowHideBtn] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Check touch capabilities on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    }
  }, []);

  // Sync with sessionStorage on mount and listen to shared updates
  useEffect(() => {
    if (!effectiveId) return;
    const sync = () => {
      const set = getRevealedSet();
      if (set.has(effectiveId)) {
        setStatus("revealed");
      } else {
        setStatus("idle");
      }
    };
    sync();
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, [effectiveId]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Magnetic cursor pull on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice || status !== "idle") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticOffset({ x: Math.max(-4, Math.min(4, x * 0.12)), y: Math.max(-4, Math.min(4, y * 0.12)) });
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
    setShowTooltip(false);
  };

  // Click Sequence (1.4s - 1.8s)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "idle") return;

    // Tactile audio-haptics
    playApertureClick();

    // Capture ripple origin
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    setRipple({ x: clickX, y: clickY });
    setShowTooltip(false);
    setMagneticOffset({ x: 0, y: 0 });

    // Generate gold sparkle particles burst
    const newParticles: SparkleParticle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const distance = 24 + Math.random() * 18;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 2.5 + Math.random() * 2,
      };
    });
    setParticles(newParticles);
    const particleTimer = setTimeout(() => setParticles([]), 700);
    timersRef.current.push(particleTimer);

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      playPriceChime();
      setStatus("revealed");
      if (effectiveId) revealPrice(effectiveId);
      return;
    }

    // Step 1: Start focusing (Aperture Iris + "Focusing quote...")
    setStatus("focusing");

    // Step 2 & 3: Reveal price with camera blur rack-focus (~1450ms)
    const revealTimer = setTimeout(() => {
      playPriceChime();
      setStatus("revealed");
      setRipple(null);
      if (effectiveId) revealPrice(effectiveId);

      // Micro-badge "Quote unlocked" appears for 1.2s then fades out
      setShowUnlockedBadge(true);
      const badgeTimer = setTimeout(() => {
        setShowUnlockedBadge(false);
      }, 1200);
      timersRef.current.push(badgeTimer);
    }, 1450);

    timersRef.current.push(revealTimer);
  };

  // Re-hide / Re-lock handler
  const handleHide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (effectiveId) {
      hidePrice(effectiveId);
    }
    setStatus("idle");
    setShowUnlockedBadge(false);
  };

  // Count-up digits
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const displayPrice = useCountUp(
    price,
    600,
    status === "revealed" && !isReducedMotion
  );

  // Locked size token matrix (ensures CLS = 0)
  const sizeStyles = {
    xs: {
      container: "min-h-[26px]",
      btn: "h-[26px] min-w-[104px] px-2.5 text-[9px] tracking-[0.14em]",
      icon: "w-2.5 h-2.5",
      price: "text-xs font-semibold",
      oldPrice: "text-[10.5px]",
      lockIcon: "w-2.5 h-2.5",
    },
    sm: {
      container: "min-h-[32px]",
      btn: "h-[32px] min-w-[124px] px-3 text-[10px] tracking-[0.16em]",
      icon: "w-3 h-3",
      price: "text-sm sm:text-base font-bold",
      oldPrice: "text-xs",
      lockIcon: "w-3 h-3",
    },
    md: {
      container: "min-h-[36px]",
      btn: "h-[36px] min-w-[138px] px-3.5 text-[11px] tracking-[0.18em]",
      icon: "w-3.5 h-3.5",
      price: "text-base sm:text-lg font-bold",
      oldPrice: "text-xs",
      lockIcon: "w-3.5 h-3.5",
    },
    lg: {
      container: "min-h-[46px]",
      btn: "h-[44px] min-w-[168px] px-5 text-xs font-bold tracking-[0.2em]",
      icon: "w-4 h-4",
      price: "text-2xl sm:text-3xl font-bold",
      oldPrice: "text-sm",
      lockIcon: "w-4 h-4",
    },
  }[size];

  const isDark = theme === "dark";

  const btnThemeClasses = isDark
    ? "bg-gradient-to-r from-[#1E1B18]/90 via-[#2B241D]/90 to-[#1E1B18]/90 text-[#D4BE96] border border-[#B89B6A]/45 hover:border-[#B89B6A] shadow-[0_0_12px_rgba(184,155,106,0.15)] hover:shadow-[0_0_20px_rgba(184,155,106,0.35)]"
    : "bg-gradient-to-r from-[#FAF7F2] via-[#EFE6D8] to-[#FAF7F2] text-[#14110F] border border-[#B89B6A]/50 hover:border-[#B89B6A] shadow-[0_1px_3px_rgba(20,17,15,0.08)] hover:shadow-[0_0_18px_rgba(184,155,106,0.28)]";

  const defaultPriceColor = isDark ? "text-[#D4BE96]" : "text-[#14110F]";
  const defaultOldPriceColor = isDark ? "text-[#7A7168]" : "text-[#7A7168]/70";

  const alignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between w-full",
  }[align];

  // SSR Safe & Zero DOM price leakage before click
  const isRevealed = mounted && status === "revealed";

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${alignClass} ${sizeStyles.container} ${className}`}
      onMouseEnter={() => setShowHideBtn(true)}
      onMouseLeave={() => setShowHideBtn(false)}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isRevealed ? (
          <div className="relative inline-flex items-center">
            {/* Tooltip on Hover */}
            <AnimatePresence>
              {showTooltip && status === "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30 px-2 py-0.5 rounded-[2px] bg-[#14110F] text-[#F7F3EC] border border-[#B89B6A]/50 text-[9px] font-mono tracking-wider whitespace-nowrap shadow-md flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A] animate-ping" />
                  <span>Tap to see quote</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#14110F]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sparkle Particles Burst on Tap */}
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: p.x,
                  y: p.y,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-[#B89B6A] shadow-[0_0_6px_#B89B6A] z-30"
                style={{
                  width: p.size,
                  height: p.size,
                  marginLeft: -p.size / 2,
                  marginTop: -p.size / 2,
                }}
              />
            ))}

            {/* Premium Button */}
            <motion.button
              type="button"
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={handleMouseLeave}
              disabled={status === "focusing"}
              animate={{
                x: magneticOffset.x,
                y: magneticOffset.y,
              }}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.97 : 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              aria-label={
                status === "focusing"
                  ? "Focusing quote..."
                  : productName
                  ? `Tap for quote on ${productName}`
                  : "Tap for quote"
              }
              aria-busy={status === "focusing"}
              className={`group relative overflow-hidden inline-flex items-center justify-center font-sans uppercase font-bold rounded-[2px] transition-all duration-300 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B6A] focus-visible:ring-offset-2 ${btnThemeClasses} ${sizeStyles.btn} ${buttonClassName}`}
            >
              {/* Continuous Slow Shimmer Sweep */}
              {status === "idle" && (
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-gold-shimmer"
                  aria-hidden="true"
                />
              )}

              {/* Scanning Lens Flare Line (during focus) */}
              {status === "focusing" && (
                <div
                  className="pointer-events-none absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#B89B6A]/80 to-transparent animate-lens-scan"
                  aria-hidden="true"
                />
              )}

              {/* Click Ripple originating from click coords */}
              {ripple && (
                <span
                  className="pointer-events-none absolute rounded-full bg-[#B89B6A]/30 w-12 h-12 -ml-6 -mt-6 animate-click-ripple"
                  style={{ left: ripple.x, top: ripple.y }}
                  aria-hidden="true"
                />
              )}

              {/* Radial Aura Pulse on focus */}
              {status === "focusing" && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-[2px] bg-[#B89B6A]/20 animate-aura-pulse"
                  aria-hidden="true"
                />
              )}

              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center gap-1.5 w-full">
                <ApertureIris
                  className={`${sizeStyles.icon} text-[#B89B6A] shrink-0`}
                  isFocusing={status === "focusing"}
                />

                <span className="truncate">
                  {status === "focusing" ? "Focusing quote..." : "Tap for Quote"}
                </span>
              </div>
            </motion.button>
          </div>
        ) : (
          <motion.div
            key="revealed-price"
            initial={{ opacity: 0, filter: "blur(12px)", scale: 0.92 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative inline-flex items-baseline gap-2 flex-wrap group/price"
          >
            {prefix && (
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7168] font-normal">
                {prefix}
              </span>
            )}

            {/* Camera Optical In-Focus Digits */}
            <span
              className={`font-sans tabular-nums tracking-tight ${defaultPriceColor} ${sizeStyles.price} ${priceClassName}`}
            >
              {currency}
              {displayPrice.toLocaleString("en-IN")}
            </span>

            {/* Staggered Old Price (+100ms) */}
            {showOldPrice && effectiveOldPrice && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`line-through tabular-nums font-normal ${defaultOldPriceColor} ${sizeStyles.oldPrice} ${oldPriceClassName}`}
              >
                {currency}
                {effectiveOldPrice.toLocaleString("en-IN")}
              </motion.span>
            )}

            {suffix && (
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7168] font-normal">
                {suffix}
              </span>
            )}

            {/* Staggered Discount Badge */}
            {showDiscountBadge && (discountPercent || badgeText) && (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-[2px] bg-[#B89B6A]/20 text-[#B89B6A] border border-[#B89B6A]/30"
              >
                {badgeText || `${discountPercent}% OFF`}
              </motion.span>
            )}

            {/* Micro "Quote unlocked" badge (fades away after 1.2s) */}
            <AnimatePresence>
              {showUnlockedBadge && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, x: -4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8.5px] font-mono tracking-wide rounded-[2px] bg-[#14110F] text-[#4ADE80] border border-[#4ADE80]/40 shadow-xs"
                >
                  <Check className="w-2.5 h-2.5 text-[#4ADE80]" />
                  <span className="hidden sm:inline">Unlocked</span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Subtle "Hide" Re-lock option on hover or touch */}
            {showHideBtn && !showUnlockedBadge && (
              <button
                type="button"
                onClick={handleHide}
                title="Re-hide price quote"
                aria-label={`Re-hide price for ${productName || "product"}`}
                className="inline-flex items-center gap-0.5 text-[8.5px] font-mono uppercase tracking-wider text-[#7A7168] hover:text-[#B89B6A] ml-1 transition-colors px-1 py-0.5 rounded-[2px] hover:bg-[#14110F]/5 cursor-pointer"
              >
                <EyeOff className="w-2.5 h-2.5" />
                <span>Hide</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
