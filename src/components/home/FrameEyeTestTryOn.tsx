"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle,
  Eye,
  Sliders
} from "lucide-react";
import { useTryOn } from "@/context/TryOnContext";

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Maisons",
    subtitle: "Direct factory origin with verified serial certs",
  },
  {
    icon: Award,
    title: "14-Step Clinical Exam",
    subtitle: "Zeiss digital wavefront analysis (Worth ₹1,500)",
  },
  {
    icon: CheckCircle,
    title: "1-Year Atelier Warranty",
    subtitle: "Complimentary ultrasonic spa & alignment tune-ups",
  },
  {
    icon: Sliders,
    title: "Bespoke Facial Fitting",
    subtitle: "Vertex distance & pantoscopic tilt calibration",
  },
];

export default function FrameEyeTestTryOn() {
  const { setSetupModalOpen } = useTryOn();

  return (
    <section className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#EDE5D8] text-[#14110F] select-none">
      {/* Top spacing to clear fixed 72px navbar */}
      <div className="h-[72px] shrink-0" />

      {/* Frame Top Header */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pt-2 pb-1 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#B89B6A] font-semibold block mb-0.5">
            CLINICAL CARE & VIRTUAL AR
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#14110F] font-normal tracking-tight">
            Consultation & Digital Fitting
          </h2>
        </div>
      </div>

      {/* Split Frame: Left Eye Test, Right Virtual Try-On */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-2 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-h-0 items-stretch">
        {/* Left Side: Free 14-Step Eye Test */}
        <div className="bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] p-5 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#14110F] text-[#D4BE96] text-[9px] font-mono uppercase tracking-[0.2em] font-bold mb-3">
              <Eye className="w-3 h-3 text-[#B89B6A]" />
              <span>COMPLIMENTARY CLINICAL CARE</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#14110F] font-normal leading-tight mb-2">
              Free 14-Step Precision Eye Examination
            </h3>

            <p className="text-xs text-[#2A2623] font-light leading-relaxed mb-4">
              Conducted by senior Zeiss-certified master optometrists in our Indiranagar clinic. Evaluates cornea curvature, binocular fusion, astigmatism, and screen stress.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-[#14110F] mb-4 pt-2 border-t border-[#14110F]/8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A]" />
                <span className="truncate">Digital Wavefront Refraction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A]" />
                <span className="truncate">Glaucoma IOP Screen</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A]" />
                <span className="truncate">Accommodative Relief</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A]" />
                <span className="truncate">Zero Sales Pressure</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#14110F]/10">
            <Link
              href="/book-eye-test"
              className="w-full py-3 rounded-[2px] bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] transition-colors duration-300 font-sans font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B89B6A]" />
              <span>Book Complimentary Exam</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Virtual Try-On Studio Mock */}
        <div className="bg-[#14110F] border border-white/10 rounded-[2px] p-5 sm:p-7 flex flex-col justify-between text-[#F7F3EC]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#2A2623] text-[#B89B6A] border border-[#B89B6A]/30 text-[9px] font-mono uppercase tracking-[0.2em] font-bold mb-3">
              <Sparkles className="w-3 h-3 text-[#B89B6A]" />
              <span>3D AR MIRROR STUDIO</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F3EC] font-normal leading-tight mb-2">
              Virtual Try-On Fitting Mirror
            </h3>

            <p className="text-xs text-[#D4BE96]/80 font-light leading-relaxed mb-4">
              Experience handcrafted sunglasses and titanium optical frames live on your face with millimeter nose-bridge tracking and 3D head yaw rotation.
            </p>

            {/* Stylized Camera Frame Preview Mock */}
            <div className="relative rounded-[2px] bg-[#2A2623] border border-white/10 p-3 sm:p-4 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#14110F] border border-[#B89B6A]/50 flex items-center justify-center text-[#B89B6A]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-serif text-[#F7F3EC]">Live Video & Photo Fitting</div>
                  <div className="text-[10px] font-mono text-[#D4BE96]/60">Private · Camera stays on device</div>
                </div>
              </div>

              <button
                onClick={() => setSetupModalOpen(true)}
                className="px-3 py-1.5 rounded-[2px] bg-[#B89B6A] text-[#14110F] font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-[#F7F3EC] transition-colors"
              >
                Launch Now
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => setSetupModalOpen(true)}
              className="py-3 rounded-[2px] bg-[#B89B6A] text-[#14110F] font-sans font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#F7F3EC] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Start Camera</span>
            </button>

            <Link
              href="/try-on"
              className="py-3 rounded-[2px] bg-transparent border border-white/30 text-[#F7F3EC] hover:border-[#B89B6A] hover:text-[#B89B6A] transition-colors font-sans font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2"
            >
              <span>Full Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: 4 Trust Pillars Compressed into 1 Sleek Row */}
      <div className="shrink-0 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 w-full pb-4 pt-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#14110F]/10">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[2px] bg-[#14110F] text-[#B89B6A] flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-xs font-semibold text-[#14110F] truncate">
                    {pillar.title}
                  </h4>
                  <p className="text-[10px] text-[#7A7168] truncate font-light">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
