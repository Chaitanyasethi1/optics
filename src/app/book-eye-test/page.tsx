"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  MapPin 
} from "lucide-react";
import { STORE_NAME, ADDRESS, PHONE, getEyeTestWhatsAppLink, TIMINGS } from "@/data/config";

const TIME_SLOTS = [
  "10:30 AM - 11:15 AM",
  "11:30 AM - 12:15 PM",
  "02:00 PM - 02:45 PM",
  "03:30 PM - 04:15 PM",
  "05:00 PM - 05:45 PM",
  "06:30 PM - 07:15 PM",
  "07:30 PM - 08:15 PM",
];

const VISION_GOALS = [
  "Comprehensive 14-Step Vision Checkup",
  "Digital Screen Fatigue & Blue Light Strain",
  "Progressive (Multifocal) Corridor Consultation",
  "Bespoke Titanium Frame Fitting",
  "Contact Lens Trial & Corneal Hydration Check",
  "Children's Pediatric Eye Examination",
];

const FOURTEEN_STEPS = [
  "Computerized Corneal Wavefront Mapping",
  "High-Definition Auto-Refractometry",
  "Non-Contact Intraocular Tonometry",
  "Pupillary Axis & Vertex Distance Alignment",
  "Binocular Convergence & Muscle Balance",
  "Digital Reading Distance Measurement",
  "Color Contrast & Twilight Sensitivity",
  "Astigmatism Cylinder Precision Tuning",
  "Macular & Ocular Surface Screening",
  "Dry Eye Tear Film Stability Evaluation",
  "Progressive Lens Eye Movement Tracking",
  "Frame Ergonomics & Bridge Weight Test",
  "Trial Lens Room Walk-Around Session",
  "Prescription Delivery & Lens Material Advisory",
];

export default function BookEyeTestPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(TIME_SLOTS[0]);
  const [goal, setGoal] = useState(VISION_GOALS[0]);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      alert("Please enter your name, phone number, and preferred date.");
      return;
    }

    // Build WhatsApp message
    const appointmentDetails = {
      name,
      phone,
      date,
      slot,
    };

    const link = getEyeTestWhatsAppLink(appointmentDetails);
    setIsSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(link, "_blank");
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-white border border-[#EADFD2]">
            <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              COMPLIMENTARY OPHTHALMIC CLINIC
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2622] font-medium mt-2 mb-3">
            Book Your Free 14-Step Eye Test
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            Experience clinical optometry by certified Zeiss and Essilor master specialists. 40 unhurried minutes in a private diagnostic suite. No obligation, 100% free of charge.
          </p>
        </div>

        {/* 2 Column Grid: Booking Form + 14-Step Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Column: Form / Confirmation */}
          <div className="lg:col-span-7 bg-white border border-[#EADFD2] rounded-3xl p-6 sm:p-10 shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#2B2622] font-medium mb-1">
                    Reserve Your Appointment Slot
                  </h2>
                  <p className="text-xs text-[#7C746C]">
                    We will format your details and open WhatsApp so our Indiranagar clinic manager can confirm your slot instantly.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#7C746C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Ananya Sharma"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7C746C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Date & Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#7C746C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-[#7C746C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                      >
                        {TIME_SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Vision Goal */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                    Primary Purpose of Consultation
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                  >
                    {VISION_GOALS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                    Current Prescription or Symptoms (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Mild headache after 5 hours on computer, previous cylindrical power in right eye..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.14em] font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm & Send on WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-[#7C746C]">
                  Clicking will open WhatsApp with your pre-filled booking request. Our clinic manager responds within 15 minutes.
                </p>
              </form>
            ) : (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#B08968] text-[#7A5A43] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#B08968]" />
                </div>
                <h3 className="font-serif text-3xl text-[#2B2622] font-medium">
                  Appointment Request Initiated
                </h3>
                <p className="text-xs sm:text-sm text-[#7C746C] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#2B2622]">{name}</strong>. If your WhatsApp did not open automatically, click the button below to confirm with our concierge.
                </p>

                <div className="bg-[#FAF7F2] border border-[#EADFD2] rounded-2xl p-5 text-left max-w-md mx-auto text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#7C746C]">Date:</span>
                    <span className="font-medium text-[#2B2622]">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C746C]">Time Slot:</span>
                    <span className="font-medium text-[#2B2622]">{slot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C746C]">Consultation:</span>
                    <span className="font-medium text-[#2B2622]">{goal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C746C]">Location:</span>
                    <span className="font-medium text-[#7A5A43]">Indiranagar Flagship Lounge</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
                  <button
                    onClick={() => {
                      const link = getEyeTestWhatsAppLink({ name, phone, date, slot });
                      window.open(link, "_blank");
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp Chat
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-wider font-medium border border-[#EADFD2] text-[#7A5A43] hover:bg-[#FAF7F2]"
                  >
                    Edit Appointment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 14 Clinical Steps & Showroom Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F3ECE2] border border-[#EADFD2] rounded-3xl p-6 sm:p-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#B08968] block mb-1">
                CLINICAL PROTOCOL
              </span>
              <h3 className="font-serif text-2xl text-[#2B2622] font-medium mb-4">
                The 14-Step Zeiss Precision Protocol
              </h3>
              <p className="text-xs text-[#7C746C] leading-relaxed mb-6">
                Most optical stores spend under 5 minutes on basic letter charts. At DemoOptics, every test is an exhaustive diagnostic examination of your visual system.
              </p>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-2">
                {FOURTEEN_STEPS.map((step, idx) => (
                  <div key={step} className="flex items-start gap-2.5 text-xs text-[#2B2622]">
                    <span className="w-5 h-5 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[10px] font-semibold text-[#7A5A43] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Info Box */}
            <div className="bg-white border border-[#EADFD2] rounded-3xl p-6 space-y-3 text-xs text-[#7C746C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#B08968] shrink-0" />
                <span>Clinic Hours: {TIMINGS}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B08968] shrink-0" />
                <span>Telephone: {PHONE}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
