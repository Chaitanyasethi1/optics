"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

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

function saveRevealedId(id: string) {
  if (typeof window === "undefined" || !id) return;
  try {
    const set = getRevealedSet();
    set.add(id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    listeners.forEach((listener) => listener());
  } catch {
    // Ignore storage quota / privacy mode errors
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

export interface PriceRevealProps {
  id?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  productName?: string;
  size?: "xs" | "sm" | "md" | "lg";
  theme?: "light" | "dark";
  align?: "left" | "center" | "right" | "between";
  className?: string;
  buttonClassName?: string;
  priceClassName?: string;
  oldPriceClassName?: string;
  showOldPrice?: boolean;
  showDiscountBadge?: boolean;
  badgeText?: string;
}

export default function PriceReveal({
  id,
  price,
  oldPrice,
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
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "revealed">("idle");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with persistent sessionStorage on client mount
  useEffect(() => {
    setMounted(true);
    if (id) {
      const check = () => {
        const set = getRevealedSet();
        if (set.has(id)) {
          setStatus("revealed");
        }
      };
      check();
      listeners.add(check);
      return () => {
        listeners.delete(check);
      };
    }
  }, [id]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "idle") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setStatus("revealed");
      if (id) saveRevealedId(id);
      return;
    }

    setStatus("loading");
    // 950ms loading duration for a smooth, high-end feel
    timerRef.current = setTimeout(() => {
      setStatus("revealed");
      if (id) saveRevealedId(id);
    }, 950);
  };

  // Size styling tokens
  const sizeStyles = {
    xs: {
      btn: "px-2 py-0.5 text-[9px] gap-1",
      icon: "w-2.5 h-2.5",
      price: "text-xs font-semibold",
      oldPrice: "text-[10px]",
    },
    sm: {
      btn: "px-2.5 py-1 text-[9.5px] sm:text-[10px] gap-1.5",
      icon: "w-2.5 h-2.5",
      price: "text-sm sm:text-base font-bold",
      oldPrice: "text-xs",
    },
    md: {
      btn: "px-3 py-1.5 text-[10.5px] sm:text-[11px] gap-1.5",
      icon: "w-3 h-3",
      price: "text-base sm:text-lg font-bold",
      oldPrice: "text-xs",
    },
    lg: {
      btn: "px-4 py-2 text-xs sm:text-[12.5px] gap-2 font-bold",
      icon: "w-3.5 h-3.5",
      price: "text-2xl sm:text-3xl font-bold",
      oldPrice: "text-sm",
    },
  }[size];

  // Theme styling tokens
  const isDark = theme === "dark";

  const btnThemeClass = isDark
    ? "bg-[#B89B6A]/15 hover:bg-[#B89B6A] text-[#D4BE96] hover:text-[#14110F] border border-[#B89B6A]/40 hover:border-[#B89B6A]"
    : "bg-[#EDE5D8]/80 hover:bg-[#14110F] text-[#14110F] hover:text-[#F7F3EC] border border-[#B89B6A]/50 hover:border-[#14110F]";

  const loadingThemeClass = isDark
    ? "bg-[#B89B6A]/20 text-[#D4BE96] border border-[#B89B6A]/60"
    : "bg-[#14110F]/10 text-[#14110F] border border-[#B89B6A]/40";

  const defaultPriceColor = isDark ? "text-[#D4BE96]" : "text-[#14110F]";
  const defaultOldPriceColor = isDark ? "text-[#7A7168]" : "text-[#7A7168]/70";

  const alignClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between w-full",
  }[align];

  // Never render the price on initial HTML / SSR or when not revealed
  const isRevealed = mounted && status === "revealed";

  return (
    <div
      className={`inline-flex items-baseline ${alignClass} ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isRevealed ? (
          <motion.div
            key="button-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center"
          >
            <button
              type="button"
              onClick={handleClick}
              disabled={status === "loading"}
              aria-label={
                status === "loading"
                  ? "Fetching quote..."
                  : productName
                  ? `Get quote for ${productName}`
                  : "Get quote"
              }
              aria-busy={status === "loading"}
              className={`group relative inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] font-bold rounded-[2px] transition-all duration-300 shadow-2xs select-none active:scale-[0.98] ${
                status === "loading" ? loadingThemeClass : btnThemeClass
              } ${sizeStyles.btn} ${buttonClassName}`}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className={`animate-spin ${sizeStyles.icon} text-[#B89B6A] shrink-0`} />
                  <span className="tracking-widest">Fetching quote...</span>
                </>
              ) : (
                <>
                  <Sparkles
                    className={`${sizeStyles.icon} text-[#B89B6A] group-hover:rotate-12 transition-transform duration-300 shrink-0`}
                  />
                  <span>Get Quote</span>
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="price-container"
            initial={{ opacity: 0, filter: "blur(4px)", y: 2 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="inline-flex items-baseline gap-2 flex-wrap"
          >
            {prefix && (
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7168] font-normal">
                {prefix}
              </span>
            )}

            <span
              className={`font-sans tabular-nums tracking-tight ${defaultPriceColor} ${sizeStyles.price} ${priceClassName}`}
            >
              ₹{price.toLocaleString("en-IN")}
            </span>

            {showOldPrice && oldPrice && (
              <span
                className={`line-through tabular-nums font-normal ${defaultOldPriceColor} ${sizeStyles.oldPrice} ${oldPriceClassName}`}
              >
                ₹{oldPrice.toLocaleString("en-IN")}
              </span>
            )}

            {suffix && (
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#7A7168] font-normal">
                {suffix}
              </span>
            )}

            {showDiscountBadge && (discountPercent || badgeText) && (
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-[2px] bg-[#B89B6A]/20 text-[#B89B6A] border border-[#B89B6A]/30">
                {badgeText || `${discountPercent}% OFF`}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
