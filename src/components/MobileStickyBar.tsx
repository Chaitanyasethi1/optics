"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { PHONE_RAW, getWhatsAppLink, STORE_NAME } from "@/data/config";

export default function MobileStickyBar() {
  const whatsappUrl = getWhatsAppLink(`Hello ${STORE_NAME}, I'd like to consult with an optometrist regarding frame fittings and eye examinations.`);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EADFD2] sm:hidden shadow-lg">
      <div className="grid grid-cols-3 divide-x divide-[#EADFD2] h-14">
        {/* Call Store */}
        <a
          href={`tel:${PHONE_RAW}`}
          className="flex flex-col items-center justify-center gap-1 text-[#2B2622] hover:bg-[#F3ECE2] transition-colors py-1"
        >
          <Phone className="w-4 h-4 text-[#B08968]" />
          <span className="text-[10px] font-sans uppercase tracking-wider font-medium text-[#7A5A43]">
            Call Store
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[#2B2622] hover:bg-[#F3ECE2] transition-colors py-1"
        >
          <MessageCircle className="w-4 h-4 text-[#B08968]" />
          <span className="text-[10px] font-sans uppercase tracking-wider font-medium text-[#7A5A43]">
            WhatsApp
          </span>
        </a>

        {/* Book Eye Test */}
        <Link
          href="/book-eye-test"
          className="flex flex-col items-center justify-center gap-1 bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors py-1"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-[10px] font-sans uppercase tracking-wider font-semibold text-white">
            Book Eye Test
          </span>
        </Link>
      </div>
    </div>
  );
}
