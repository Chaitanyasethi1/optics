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
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Breadcrumb */}
        <div className="mb-6">
          <Link
            href={`/${product.category}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#7C746C] hover:text-[#7A5A43] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {product.category}</span>
          </Link>
        </div>

        {/* 2 Column Main Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white border border-[#EADFD2] rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Left Column: Interactive Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EADFD2] cursor-crosshair group flex items-center justify-center"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.discountPercent && (
                  <span className="px-3 py-1 text-xs uppercase font-bold tracking-wider rounded-full bg-[#7A5A43] text-white">
                    {product.discountPercent}% OFF
                  </span>
                )}
                {product.tags && product.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs uppercase font-semibold tracking-wider rounded-full bg-[#F3ECE2] border border-[#EADFD2] text-[#7A5A43]">
                    {t}
                  </span>
                ))}
              </div>

              {/* Zoom hint */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#7C746C] opacity-0 group-hover:opacity-100 transition-opacity">
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
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-[#B08968] ring-2 ring-[#B08968]/20"
                        : "border-[#EADFD2] opacity-70 hover:opacity-100"
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
            <div className="mt-4 bg-[#FAF7F2] border border-[#EADFD2] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#EADFD2] flex items-center justify-center text-[#B08968] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs text-[#7C746C]">
                <span className="font-semibold text-[#2B2622] block">
                  Available for In-Store Fitting & Trial
                </span>
                Experience this frame in person at our Indiranagar showroom. Free custom nasal contour adjustments.
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
                    className="font-sans uppercase tracking-[0.2em] font-semibold text-[#B08968] hover:underline"
                  >
                    {product.brand}
                  </Link>
                  <span className="text-xs text-[#7C746C]">
                    {product.specs.gender} • {product.specs.shape}
                  </span>
                </div>

                {/* Name */}
                <h1 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium leading-tight">
                  {product.name}
                </h1>

                {/* Subcategory */}
                {product.subCategory && (
                  <p className="text-xs text-[#7C746C] mt-1">
                    {product.subCategory}
                  </p>
                )}
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADFD2] flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#2B2622]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#7C746C] line-through">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs text-[#7A5A43] font-medium ml-auto">
                  Inclusive of all showroom taxes
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2 text-xs sm:text-sm text-[#7C746C] leading-relaxed">
                <p>{product.description}</p>
                {product.craftsmanshipNotes && (
                  <p className="italic text-[#7A5A43] pt-1">
                    Craftsmanship: {product.craftsmanshipNotes}
                  </p>
                )}
              </div>

              {/* Technical Specifications Matrix */}
              <div className="pt-4 border-t border-[#EADFD2]">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-[#B08968] mb-3">
                  Frame & Optical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#7C746C]">Material</span>
                    <span className="font-medium text-[#2B2622]">{product.specs.material}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#7C746C]">Shape</span>
                    <span className="font-medium text-[#2B2622]">{product.specs.shape}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#7C746C]">Size Fit</span>
                    <span className="font-medium text-[#2B2622]">{product.specs.size}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-[#7C746C]">Gender</span>
                    <span className="font-medium text-[#2B2622]">{product.specs.gender}</span>
                  </div>
                  {product.specs.bridgeWidth && (
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-[#7C746C]">Bridge Width</span>
                      <span className="font-medium text-[#2B2622]">{product.specs.bridgeWidth}</span>
                    </div>
                  )}
                  {product.specs.templeLength && (
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-[#7C746C]">Temple Length</span>
                      <span className="font-medium text-[#2B2622]">{product.specs.templeLength}</span>
                    </div>
                  )}
                  {product.specs.weight && (
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-[#7C746C]">Weight</span>
                      <span className="font-medium text-[#2B2622]">{product.specs.weight}</span>
                    </div>
                  )}
                  {product.specs.origin && (
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-[#7C746C]">Country of Origin</span>
                      <span className="font-medium text-[#2B2622]">{product.specs.origin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="pt-4 border-t border-[#EADFD2]">
                  <h4 className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-[#B08968] mb-2.5">
                    Highlights & Inclusions
                  </h4>
                  <div className="space-y-1.5">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-[#2B2622]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B08968] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS (Strictly NO Cart, NO Buy Now) */}
            <div className="pt-8 mt-6 border-t border-[#EADFD2] space-y-3">
              {/* Virtual Try-On Button */}
              {(product.category === "sunglasses" || product.category === "eyeglasses") && (
                <Link
                  href={`/try-on?product=${product.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] text-xs uppercase tracking-[0.16em] font-medium bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#B89B6A]/30 transition-all duration-300 shadow-sm"
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] text-xs uppercase tracking-[0.14em] font-medium bg-[#B89B6A] text-[#14110F] hover:bg-[#2A2623] hover:text-[#F7F3EC] transition-all duration-300 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Secondary Actions Row: Call Store & Book Free Eye Test */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>

                <Link
                  href="/book-eye-test"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium bg-[#F3ECE2] text-[#7A5A43] border border-[#EADFD2] hover:bg-[#EADFD2] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free Eye Test</span>
                </Link>
              </div>

              {/* Reassurance note */}
              <p className="text-[11px] text-center text-[#7C746C] pt-2">
                Trial before deciding. We reserve this piece at our Indiranagar lounge upon your WhatsApp message.
              </p>
            </div>
          </div>
        </div>

        {/* "You May Also Like" Related Products Row */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
                COMPLEMENTARY CURATIONS
              </span>
              <h2 className="font-serif text-3xl text-[#2B2622] font-medium mt-1 mb-2">
                You May Also Like
              </h2>
              <div className="w-10 h-[1px] bg-[#B08968] mx-auto" />
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
