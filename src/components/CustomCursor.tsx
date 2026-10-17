"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 1280px) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor");
        setCursorText(text || "VIEW");
        setIsPointer(true);
      } else {
        setCursorText(null);
        const clickable = target.closest("a, button, input, [role='button']");
        setIsPointer(!!clickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden xl:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {cursorText ? (
        <div className="-translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#14110F]/90 backdrop-blur-xs border border-[#B89B6A] flex items-center justify-center text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-[#F7F3EC] shadow-xl animate-in zoom-in-75 duration-200">
          {cursorText}
        </div>
      ) : isPointer ? (
        <div className="-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#B89B6A] bg-[#B89B6A]/15 transition-all duration-200" />
      ) : (
        <div className="-translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B89B6A] transition-all duration-150" />
      )}
    </div>
  );
}
