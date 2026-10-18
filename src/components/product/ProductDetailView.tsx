"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MessageCircle, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Eye, 
  Sparkles,
  MapPin,
  Clock,
  Ruler,
  Maximize2,
  Glasses
} from "lucide-react";
import { Product } from "@/types";
import { STORE_NAME, PHONE, ADDRESS, getProductEnquiryLink, getWhatsAppLink } from "@/data/config";
import ProductCard from "@/components/ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const enquiryLink = getProductEnquiryLink(product.name, product.brand, product.price);

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Breadcrumb */}
        <div className="mb-6">
          <Link
            href={`/${product.category}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#7A7168] hover:text-[#14110F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {product.category}</span>
          </Link>
        </div>

        {/* 2 Column Main Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white border border-[#14110F]/10 rounded-[2px] p-6 sm:p-10 shadow-sm">
          {/* Left Column: Interactive Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div
              className="relative aspect-[4/3] w-full rounded-[2px] overflow-hidden bg-[#EDE5D8]/40 border border-[#14110F]/8 cursor-crosshair group flex items-center justify-center"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.discountPercent && (
                  <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] rounded-[2px] bg-[#14110F] text-[#D4BE96] border border-[#B89B6A]/30">
                    {product.discountPercent}% OFF
                  </span>
                )}
                {product.tags && product.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] rounded-[2px] bg-[#EDE5D8] border border-[#14110F]/10 text-[#14110F]">
                    {t}
                  </span>
                ))}
              </div>

              {/* Zoom hint */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-[2px] bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#7A7168] opacity-0 group-hover:opacity-100 transition-opacity border border-[#14110F]/10">
                <Maximize2 className="w-4 h-4" />
              </div>

              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} view ${selectedImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover object-center transition-transform duration-500 ${
                  isZoomed ? "scale-125" : "scale-100"
                }`}
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-20 h-20 rounded-[2px] overflow-hidden bg-[#EDE5D8]/40 border transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-[#B89B6A] ring-1 ring-[#B89B6A]"
                        : "border-[#14110F]/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Physical Showroom Trial Guarantee Banner */}
            <div className="mt-4 bg-[#EDE5D8]/50 border border-[#14110F]/8 rounded-[2px] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] bg-white border border-[#14110F]/10 flex items-center justify-center text-[#B89B6A] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs text-[#7A7168]">
                <span className="font-bold uppercase tracking-[0.16em] text-[#14110F] block mb-0.5">
                  Available for In-Store Fitting & Trial
                </span>
                Experience this frame in person at our Indiranagar showroom. Complimentary bespoke contour adjustments.
              </div>
            </div>
          </div>

          {/* Right Column: Product Metadata, Specs & Non-Ecommerce Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Brand and Shape Tag */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <Link
                    href={`/brands?brand=${encodeURIComponent(product.brand)}`}
                    className="font-sans uppercase tracking-[0.28em] font-bold text-[#B89B6A] hover:underline"
                  >
                    {product.brand}
                  </Link>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A7168]">
                    {product.specs.gender} • {product.specs.shape}
                  </span>
                </div>

                {/* Name */}
                <h1 className="font-serif text-3xl sm:text-4xl text-[#14110F] font-normal leading-tight tracking-tight">
                  {product.name}
                </h1>

                {/* Subcategory */}
                {product.subCategory && (
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A7168] mt-1 font-medium">
                    {product.subCategory}
                  </p>
                )}
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-[#EDE5D8]/50 rounded-[2px] border border-[#B89B6A]/30 flex items-baseline gap-3 shadow-xs">
                <span className="text-2xl sm:text-3xl font-bold font-sans text-[#14110F] tabular-nums">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#7A7168]/70 line-through tabular-nums font-normal">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-[11px] text-[#7A7168] uppercase font-mono tracking-wider ml-auto">
                  Showroom Inclusive
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2 text-xs sm:text-sm text-[#7A7168] leading-relaxed">
                <p>{product.description}</p>
                {product.craftsmanshipNotes && (
                  <p className="font-serif italic text-[#B89B6A] pt-1">
                    Craftsmanship: {product.craftsmanshipNotes}
                  </p>
                )}
              </div>

              {/* Technical Specifications Matrix */}
              <div className="pt-4 border-t border-[#14110F]/10">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.24em] font-bold text-[#B89B6A] mb-3">
                  Frame & Optical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Material</span>
                    <span className="font-bold text-[#14110F]">{product.specs.material}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Shape</span>
                    <span className="font-bold text-[#14110F]">{product.specs.shape}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Size Fit</span>
                    <span className="font-bold text-[#14110F]">{product.specs.size}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Gender</span>
                    <span className="font-bold text-[#14110F]">{product.specs.gender}</span>
                  </div>
                  {product.specs.bridgeWidth && (
                    <div className="flex flex-col">
                      <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Bridge Width</span>
                      <span className="font-bold text-[#14110F]">{product.specs.bridgeWidth}</span>
                    </div>
                  )}
                  {product.specs.templeLength && (
                    <div className="flex flex-col">
                      <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Temple Length</span>
                      <span className="font-bold text-[#14110F]">{product.specs.templeLength}</span>
                    </div>
                  )}
                  {product.specs.weight && (
                    <div className="flex flex-col">
                      <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Weight</span>
                      <span className="font-bold text-[#14110F]">{product.specs.weight}</span>
                    </div>
                  )}
                  {product.specs.origin && (
                    <div className="flex flex-col">
                      <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#7A7168]">Country of Origin</span>
                      <span className="font-bold text-[#14110F]">{product.specs.origin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="pt-4 border-t border-[#14110F]/10">
                  <h4 className="font-sans text-[11px] uppercase tracking-[0.24em] font-bold text-[#B89B6A] mb-2.5">
                    Highlights & Inclusions
                  </h4>
                  <div className="space-y-1.5">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-[#14110F]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B6A] shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS (Strictly NO Cart, NO Buy Now) */}
            <div className="pt-8 mt-6 border-t border-[#14110F]/10 space-y-3">
              {/* Virtual Try-On Button */}
              {(product.category === "sunglasses" || product.category === "eyeglasses") && (
                <Link
                  href={`/try-on?product=${product.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] text-xs uppercase tracking-[0.2em] font-bold bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#B89B6A]/30 transition-all duration-300 shadow-sm"
                >
                  <Glasses className="w-4 h-4 text-[#B89B6A]" />
                  <span>Experience Virtual Try-On</span>
                </Link>
              )}

              {/* Primary Action 1: Enquire on WhatsApp */}
              <a
                href={enquiryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] text-xs uppercase tracking-[0.2em] font-bold bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-all duration-300 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Secondary Actions Row: Call Store & Book Free Eye Test */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-[2px] text-xs uppercase tracking-[0.16em] font-bold border border-[#14110F]/20 text-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B89B6A]" />
                  <span>Call Store</span>
                </a>

                <Link
                  href="/book-eye-test"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-[2px] text-xs uppercase tracking-[0.16em] font-bold bg-[#EDE5D8] text-[#14110F] border border-[#14110F]/10 hover:bg-[#14110F] hover:text-[#F7F3EC] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B89B6A]" />
                  <span>Book Free Eye Test</span>
                </Link>
              </div>

              {/* Reassurance note */}
              <p className="text-[11px] text-center text-[#7A7168] pt-2 font-medium">
                Trial before deciding. We reserve this piece at our Indiranagar lounge upon your WhatsApp message.
              </p>
            </div>
          </div>
        </div>

        {/* "You May Also Like" Related Products Row */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-sans text-[10.5px] uppercase tracking-[0.28em] font-bold text-[#B89B6A]">
                COMPLEMENTARY CURATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#14110F] font-normal mt-1 mb-2">
                You May Also <span className="font-serif italic font-normal text-[#B89B6A]">Like</span>
              </h2>
              <div className="w-12 h-[1px] bg-[#B89B6A] mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
