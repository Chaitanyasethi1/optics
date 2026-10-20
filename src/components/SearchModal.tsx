"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Glasses, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import PriceReveal from "@/components/PriceReveal";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Live search query matching
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matched = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.specs.shape.toLowerCase().includes(q) ||
        p.specs.material.toLowerCase().includes(q) ||
        p.specs.gender.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
    setResults(matched.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#EADFD2] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EADFD2] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B08968] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, shape (Aviator, Round), material (Titanium), or lens type..."
            className="w-full text-sm sm:text-base bg-transparent text-[#2B2622] placeholder-[#7C746C] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-[#7C746C] hover:text-[#2B2622]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-medium text-[#7C746C] hover:text-[#7A5A43] px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Suggestion Chips */}
        {!query && (
          <div className="p-6 bg-[#FAF7F2]">
            <div className="text-xs font-sans uppercase tracking-[0.15em] text-[#B08968] font-semibold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Titanium Frames",
                "Polarized",
                "Aviator",
                "Zeiss Lenses",
                "Gucci",
                "Cat-eye",
                "Silhouette",
                "Special Offers",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 text-xs rounded-full bg-white border border-[#EADFD2] text-[#7A5A43] hover:border-[#B08968] hover:bg-[#F3ECE2] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#EADFD2] bg-white">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 hover:bg-[#FAF7F2] transition-colors group"
              >
                <div className="relative w-14 h-14 rounded-xl bg-[#FAF7F2] border border-[#EADFD2] shrink-0 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#B08968] font-semibold">
                      {product.brand}
                    </span>
                    <span className="text-xs text-[#7C746C]">•</span>
                    <span className="text-xs text-[#7C746C] capitalize">
                      {product.specs.shape}
                    </span>
                  </div>
                  <h4 className="font-serif text-base text-[#2B2622] group-hover:text-[#7A5A43] truncate transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 min-h-[24px]">
                    <PriceReveal
                      id={product.id}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      productName={`${product.brand} ${product.name}`}
                      size="xs"
                      priceClassName="text-xs font-medium text-[#7A5A43]"
                      oldPriceClassName="text-[11px] text-[#7C746C]"
                    />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B08968] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <div className="p-12 text-center bg-white">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EADFD2] flex items-center justify-center text-[#7C746C] mx-auto mb-3">
              <Glasses className="w-6 h-6 text-[#B08968]" />
            </div>
            <h4 className="font-serif text-lg text-[#2B2622]">No eyewear matches found</h4>
            <p className="text-xs text-[#7C746C] mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any pieces matching &quot;{query}&quot;. Try searching for titanium, aviator, Ray-Ban, or Zeiss.
            </p>
          </div>
        )}

        {/* Footer info */}
        <div className="p-3 bg-[#F3ECE2] border-t border-[#EADFD2] flex items-center justify-between text-[11px] text-[#7C746C] px-5">
          <span>{PRODUCTS.length} curated luxury items in showroom</span>
          <span>Press Esc to close</span>
        </div>
      </div>
    </div>
  );
}
