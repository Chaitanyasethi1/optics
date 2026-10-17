"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { STORE_NAME, getWhatsAppLink } from "@/data/config";

export default function FloatingWhatsApp() {
  const link = getWhatsAppLink(`Hello ${STORE_NAME}, I am browsing your online showroom catalogue and would like some styling and availability assistance.`);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-6 z-40">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Showroom Optician"
        className="group flex items-center gap-2.5 bg-[#B08968] hover:bg-[#7A5A43] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#FAF7F2]/40"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-sans text-xs uppercase tracking-wider font-medium">
          Inquire on WhatsApp
        </span>
      </a>
    </div>
  );
}
