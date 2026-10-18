"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FrameHero from "./FrameHero";
import FrameCategoryAccordion from "./FrameCategoryAccordion";
import FrameTitanium from "./FrameTitanium";
import FramePolarized from "./FramePolarized";
import FrameOffers from "./FrameOffers";
import FrameBrands from "./FrameBrands";
import FrameLenses from "./FrameLenses";
import FrameEyeTestTryOn from "./FrameEyeTestTryOn";
import FrameShowroomFooter from "./FrameShowroomFooter";
import DotNav from "./DotNav";
import { useNavbarTheme, NavbarTheme } from "@/context/NavbarThemeContext";

const FRAME_THEMES: NavbarTheme[] = [
  "dark",  // F1 Hero
  "light", // F2 Categories
  "light", // F3 Titanium
  "dark",  // F4 Polarized
  "light", // F5 Offers
  "dark",  // F6 Brands
  "light", // F7 Lenses
  "light", // F8 Eye Test & Try-On
  "dark",  // F9 Showroom & Footer
];

const TOTAL_FRAMES = 9;
const SCROLL_LOCK_DURATION = 900;

export default function FullFrameContainer() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const isLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { setTheme, setIsHomeSnapDeck } = useNavbarTheme();

  // Sync Navbar theme with active frame
  useEffect(() => {
    setIsHomeSnapDeck(isDesktop);
    if (isDesktop) {
      setTheme(FRAME_THEMES[activeFrame]);
    } else {
      setTheme("light");
    }
  }, [activeFrame, isDesktop, setTheme, setIsHomeSnapDeck]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      setIsHomeSnapDeck(false);
      setTheme("light");
    };
  }, [setIsHomeSnapDeck, setTheme]);

  // Handle Window Resize for Desktop vs Mobile breakpoint (1024px)
  useEffect(() => {
    const checkViewport = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const goToFrame = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= TOTAL_FRAMES) return;
    setActiveFrame(targetIndex);
    isLockedRef.current = true;
    setTimeout(() => {
      isLockedRef.current = false;
    }, SCROLL_LOCK_DURATION);
  }, []);

  // Desktop Custom Scroll Controller: Debounced Wheel Lock (~900ms)
  useEffect(() => {
    if (!isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow user interaction if modal is open or target is scrollable
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-allow-scroll]")) return;

      e.preventDefault();

      if (isLockedRef.current) return;

      if (Math.abs(e.deltaY) < 20) return;

      if (e.deltaY > 0) {
        // Scroll down
        if (activeFrame < TOTAL_FRAMES - 1) {
          goToFrame(activeFrame + 1);
        }
      } else {
        // Scroll up
        if (activeFrame > 0) {
          goToFrame(activeFrame - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (["ArrowDown", "PageDown", "Space"].includes(e.code)) {
        if (activeFrame < TOTAL_FRAMES - 1) {
          e.preventDefault();
          goToFrame(activeFrame + 1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.code)) {
        if (activeFrame > 0) {
          e.preventDefault();
          goToFrame(activeFrame - 1);
        }
      } else if (e.code === "Home") {
        e.preventDefault();
        goToFrame(0);
      } else if (e.code === "End") {
        e.preventDefault();
        goToFrame(TOTAL_FRAMES - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;

      if (Math.abs(deltaY) > 50) {
        if (isLockedRef.current) return;

        if (deltaY > 0 && activeFrame < TOTAL_FRAMES - 1) {
          goToFrame(activeFrame + 1);
          touchStartYRef.current = null;
        } else if (deltaY < 0 && activeFrame > 0) {
          goToFrame(activeFrame - 1);
          touchStartYRef.current = null;
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDesktop, activeFrame, goToFrame]);

  const currentTheme = FRAME_THEMES[activeFrame];

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isDesktop
          ? "h-[100dvh] overflow-hidden select-none"
          : "min-h-screen overflow-y-auto"
      }`}
    >
      {/* Vertical Dot Navigation on Desktop Right */}
      {isDesktop && (
        <DotNav
          activeFrame={activeFrame}
          totalFrames={TOTAL_FRAMES}
          onSelectFrame={(idx) => goToFrame(idx)}
          isDarkTheme={currentTheme === "dark"}
        />
      )}

      {/* Frame Deck Container */}
      <div
        className={`w-full ${
          isDesktop
            ? "h-full transition-transform ease-[cubic-bezier(.77,0,.18,1)] will-change-transform"
            : "flex flex-col"
        }`}
        style={{
          transform: isDesktop
            ? `translate3d(0, -${activeFrame * 100}%, 0)`
            : "none",
          transitionDuration: isDesktop ? `${SCROLL_LOCK_DURATION}ms` : "0ms",
        }}
      >
        {/* Frame 1: Hero */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameHero onNextFrame={() => goToFrame(1)} />
        </div>

        {/* Frame 2: Categories Accordion */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameCategoryAccordion />
        </div>

        {/* Frame 3: Titanium Suite */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameTitanium />
        </div>

        {/* Frame 4: Polarized Solar */}
        <div className="w-full h-[100dvh] shrink-0">
          <FramePolarized />
        </div>

        {/* Frame 5: Offers */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameOffers />
        </div>

        {/* Frame 6: Brands */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameBrands />
        </div>

        {/* Frame 7: Lenses */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameLenses />
        </div>

        {/* Frame 8: Eye Test & Try-On */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameEyeTestTryOn />
        </div>

        {/* Frame 9: Showroom & Footer */}
        <div className="w-full h-[100dvh] shrink-0">
          <FrameShowroomFooter />
        </div>
      </div>
    </div>
  );
}
