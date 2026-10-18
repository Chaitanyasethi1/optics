"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowUpRight, Sparkles, Glasses, Check } from "lucide-react";
import { Product } from "@/types";
import { getProductEnquiryLink } from "@/data/config";
import { useTryOn } from "@/context/TryOnContext";
import { getTryOnFrameForProduct } from "@/data/tryon";
import { drawGlassesOnCanvas } from "@/components/tryon/glassesRenderer";

interface ProductCardProps {
  product: Product;
}

function UserTryOnFaceCanvas({
  userPhoto,
  calibration,
  product,
}: {
  userPhoto: string;
  calibration: any;
  product: Product;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 750;

      // Draw user's captured face
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Match product to its corresponding try-on frame
      const frame = getTryOnFrameForProduct(product);

      // Calculate relative scale between calibration dimensions and current canvas
      const scaleX = canvas.width / (calibration.imgWidth || canvas.width);
      const scaleY = canvas.height / (calibration.imgHeight || canvas.height);

      drawGlassesOnCanvas({
        ctx,
        frame,
        tintId: frame.defaultTint,
        x: calibration.x * scaleX,
        y: calibration.y * scaleY,
        ipd: calibration.ipd * scaleX,
        angle: calibration.angle,
        yaw: calibration.yaw || 0,
        pitch: calibration.pitch || 0,
        sizeAdjustment: 0,
        verticalAdjustment: 0,
      });
    };
    img.src = userPhoto;
  }, [userPhoto, calibration, product]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover object-center animate-in fade-in duration-300"
    />
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const enquiryLink = getProductEnquiryLink(product.name, product.brand, product.price);

  const { isTryOnActive, userPhoto, calibration, setIsTryOnActive, setSetupModalOpen } = useTryOn();
  const isEyewear = product.category === "sunglasses" || product.category === "eyeglasses";
  const showTryOnFace = isTryOnActive && userPhoto && calibration && isEyewear;

  const handleTryOnButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userPhoto) {
      setSetupModalOpen(true);
    } else {
      setIsTryOnActive(!isTryOnActive);
    }
  };

  return (
    <div
      className="group relative bg-[#F7F3EC] border border-[#14110F]/10 rounded-[2px] overflow-hidden hover:border-[#B89B6A]/50 transition-all duration-500 flex flex-col justify-between hover:shadow-lg"
      data-cursor={showTryOnFace ? "TRY ON" : "VIEW"}
    >
      {/* Top Image Container: Calibrated luxury aspect ratio for frame fit */}
      <div className="relative aspect-[4/3.8] xl:aspect-[4/3.6] w-full bg-[#EDE5D8]/40 flex items-center justify-center overflow-hidden border-b border-[#14110F]/8">
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {showTryOnFace ? (
            <span className="px-2.5 py-0.5 text-[9px] uppercase font-mono font-bold tracking-[0.16em] bg-[#14110F] text-[#B89B6A] border border-[#B89B6A]/50 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#B89B6A]" />
              <span>ON YOUR FACE</span>
            </span>
          ) : (
            <>
              {product.discountPercent && (
                <span className="px-2.5 py-0.5 text-[9px] uppercase font-mono font-bold tracking-[0.15em] bg-[#14110F] text-[#B89B6A] border border-[#B89B6A]/30">
                  {product.discountPercent}% PRIVILEGE
                </span>
              )}
              {product.tags && product.tags.length > 0 && (
                <span className="px-2.5 py-0.5 text-[9px] uppercase font-sans font-bold tracking-[0.15em] bg-[#F7F3EC]/90 backdrop-blur-xs border border-[#14110F]/10 text-[#7A7168]">
                  {product.tags[0]}
                </span>
              )}
            </>
          )}
        </div>

        {/* Quick Try-On Pill Button in Top Right */}
        {isEyewear && (
          <button
            onClick={handleTryOnButtonClick}
            className={`absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-sans font-bold rounded-[2px] transition-all duration-300 shadow-sm ${
              showTryOnFace
                ? "bg-[#B89B6A] text-[#14110F] border border-[#B89B6A]"
                : "bg-[#14110F]/80 backdrop-blur-xs text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] border border-[#B89B6A]/30"
            }`}
            title={showTryOnFace ? "Turn off 3D try-on" : "Try this frame on your face"}
          >
            <Glasses className="w-3 h-3 text-[#B89B6A]" />
            <span className="hidden sm:inline">{showTryOnFace ? "Face Active" : "3D Try On"}</span>
          </button>
        )}

        {/* Primary Image Link / Canvas Try-On Face */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full block"
          tabIndex={-1}
        >
          {showTryOnFace ? (
            <UserTryOnFaceCanvas
              userPhoto={userPhoto}
              calibration={calibration}
              product={product}
            />
          ) : (
            <div className="relative w-full h-full p-4 sm:p-5 flex items-center justify-center">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  product.images[1] ? "group-hover:opacity-0" : ""
                } ${imageLoaded ? "opacity-100" : "opacity-90"}`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Second Alternate Image on Hover */}
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={`${product.name} alternate view`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              )}
            </div>
          )}
        </Link>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#F7F3EC]">
        <div>
          {/* Brand & Shape */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-sans uppercase tracking-[0.28em] text-[#B89B6A] font-bold text-[11px]">
              {product.brand}
            </span>
            <span className="text-[9.5px] text-[#7A7168] uppercase tracking-[0.15em] font-bold font-mono">
              {product.specs.shape}
            </span>
          </div>

          {/* Product Name in Serif with thin champagne underline on hover */}
          <Link href={`/product/${product.slug}`} className="block group/title">
            <h3 className="font-serif text-lg sm:text-xl text-[#14110F] font-medium leading-snug line-clamp-1 relative inline-block">
              {product.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B89B6A] transition-all duration-300 group-hover/title:w-full" />
            </h3>
          </Link>

          {/* Spec preview snippet */}
          <p className="text-[10px] sm:text-[11px] text-[#7A7168] mt-1 line-clamp-1 tracking-wide font-normal">
            {product.specs.material} • {product.specs.gender}
          </p>

          {/* Price with tabular numbers & muted strikethrough */}
          <div className="flex items-baseline gap-2 mt-2 pt-1.5 border-t border-[#14110F]/6">
            <span className="text-base sm:text-lg font-sans font-bold text-[#14110F] tabular-nums tracking-tight">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#7A7168]/70 line-through tabular-nums font-normal">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.category === "lenses" && (
              <span className="text-[10px] uppercase tracking-wider text-[#7A7168] font-bold">
                from
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3.5 pt-2 border-t border-[#14110F]/8 grid grid-cols-2 gap-2">
          {/* WhatsApp Inquire */}
          <a
            href={enquiryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-[2px] text-[10px] font-sans uppercase tracking-[0.18em] font-bold border border-[#14110F]/25 text-[#14110F] hover:border-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
            title="Inquire directly with our store optician via WhatsApp"
          >
            <MessageCircle className="w-3 h-3 text-[#B89B6A]" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* View Details */}
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-[2px] text-[10px] font-sans uppercase tracking-[0.18em] font-bold bg-[#14110F] text-[#F7F3EC] hover:bg-[#B89B6A] hover:text-[#14110F] transition-all duration-300"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3 h-3 text-[#B89B6A]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
