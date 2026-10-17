"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  RotateCcw, 
  Sparkles,
  Glasses
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Product, ProductCategory, FrameShape, FrameMaterial, Gender } from "@/types";
import ProductCard from "@/components/ProductCard";

interface CollectionPageProps {
  title: string;
  subtitle: string;
  category?: ProductCategory | "all" | "offers";
  defaultBrand?: string;
}

export default function CollectionPage({
  title,
  subtitle,
  category = "all",
  defaultBrand,
}: CollectionPageProps) {
  const searchParams = useSearchParams();

  // Query parameter defaults
  const queryGender = searchParams.get("gender") as Gender | null;
  const queryShape = searchParams.get("shape") as FrameShape | null;
  const queryBrand = searchParams.get("brand") || defaultBrand || null;
  const queryMaterial = searchParams.get("material") || null;
  const queryFilter = searchParams.get("filter");

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    queryBrand ? [queryBrand] : []
  );
  const [selectedGenders, setSelectedGenders] = useState<string[]>(
    queryGender ? [queryGender] : []
  );
  const [selectedShapes, setSelectedShapes] = useState<string[]>(
    queryShape ? [queryShape] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    queryMaterial ? [queryMaterial] : []
  );
  const [priceRange, setPriceRange] = useState<string>("all");
  const [onlyPolarized, setOnlyPolarized] = useState<boolean>(queryFilter === "polarized");
  const [onlyTitanium, setOnlyTitanium] = useState<boolean>(queryFilter === "titanium");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when search params change
  useEffect(() => {
    if (queryBrand) setSelectedBrands([queryBrand]);
    if (queryGender) setSelectedGenders([queryGender]);
    if (queryShape) setSelectedShapes([queryShape]);
    if (queryMaterial) setSelectedMaterials([queryMaterial]);
    if (queryFilter === "polarized") setOnlyPolarized(true);
    if (queryFilter === "titanium") setOnlyTitanium(true);
  }, [queryBrand, queryGender, queryShape, queryMaterial, queryFilter]);

  // Base Products Filtered by Category
  const baseProducts = useMemo(() => {
    if (category === "offers") {
      return PRODUCTS.filter((p) => p.isOffer || (p.discountPercent && p.discountPercent > 0));
    }
    if (category === "all") {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  // Available Filter Options derived from current category products
  const availableBrands = useMemo(() => {
    return Array.from(new Set(baseProducts.map((p) => p.brand))).sort();
  }, [baseProducts]);

  const availableShapes = useMemo(() => {
    return Array.from(
      new Set(baseProducts.map((p) => p.specs.shape).filter(Boolean))
    ).sort();
  }, [baseProducts]);

  const availableMaterials = useMemo(() => {
    return Array.from(
      new Set(baseProducts.map((p) => p.specs.material).filter(Boolean))
    ).sort();
  }, [baseProducts]);

  // Main Filter Logic
  const filteredProducts = useMemo(() => {
    return baseProducts.filter((product) => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Gender filter
      if (
        selectedGenders.length > 0 &&
        !selectedGenders.includes(product.specs.gender) &&
        product.specs.gender !== "Unisex"
      ) {
        return false;
      }
      // Shape filter
      if (selectedShapes.length > 0 && !selectedShapes.includes(product.specs.shape)) {
        return false;
      }
      // Material filter
      if (
        selectedMaterials.length > 0 &&
        !selectedMaterials.includes(product.specs.material)
      ) {
        return false;
      }
      // Polarized filter
      if (onlyPolarized && !product.isPolarized) {
        return false;
      }
      // Titanium filter
      if (onlyTitanium && !product.isTitanium) {
        return false;
      }
      // Price Range filter
      if (priceRange === "under-5k" && product.price > 5000) return false;
      if (
        priceRange === "5k-15k" &&
        (product.price < 5000 || product.price > 15000)
      )
        return false;
      if (
        priceRange === "15k-30k" &&
        (product.price < 15000 || product.price > 30000)
      )
        return false;
      if (priceRange === "above-30k" && product.price < 30000) return false;

      return true;
    });
  }, [
    baseProducts,
    selectedBrands,
    selectedGenders,
    selectedShapes,
    selectedMaterials,
    onlyPolarized,
    onlyTitanium,
    priceRange,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "brand-az") {
      return list.sort((a, b) => a.brand.localeCompare(b.brand));
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => (b.tags?.includes("New") ? 1 : 0) - (a.tags?.includes("New") ? 1 : 0));
    }
    // Default featured
    return list;
  }, [filteredProducts, sortBy]);

  // Reset helper
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedGenders([]);
    setSelectedShapes([]);
    setSelectedMaterials([]);
    setPriceRange("all");
    setOnlyPolarized(false);
    setOnlyTitanium(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedGenders.length > 0 ||
    selectedShapes.length > 0 ||
    selectedMaterials.length > 0 ||
    priceRange !== "all" ||
    onlyPolarized ||
    onlyTitanium;

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-white border-b border-[#EADFD2] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
            DEMOOPTICS SHOWROOM CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2622] font-medium mt-2 mb-3">
            {title}
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Active count, Mobile filter button & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADFD2]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B08968] bg-white text-xs font-medium text-[#7A5A43]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
            </button>
            <span className="text-xs text-[#7C746C]">
              Showing <span className="font-semibold text-[#2B2622]">{sortedProducts.length}</span> of {baseProducts.length} curated designs
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7C746C] whitespace-nowrap">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#EADFD2] rounded-full px-4 py-2 pr-8 text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
                <option value="brand-az">Brand: A to Z</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#7C746C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white border border-[#EADFD2] rounded-2xl p-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#EADFD2]">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#2B2622]">
                <Filter className="w-4 h-4 text-[#B08968]" />
                <span>Refine Catalogue</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#7A5A43] hover:underline inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Quick Toggle Feature Chips */}
            <div className="space-y-2 pb-4 border-b border-[#EADFD2]">
              <label className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#B08968] block">
                Specialties
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-[#2B2622] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyPolarized}
                    onChange={(e) => setOnlyPolarized(e.target.checked)}
                    className="rounded border-[#EADFD2] text-[#B08968] focus:ring-[#B08968]"
                  />
                  <span>Polarized Lenses Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[#2B2622] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyTitanium}
                    onChange={(e) => setOnlyTitanium(e.target.checked)}
                    className="rounded border-[#EADFD2] text-[#B08968] focus:ring-[#B08968]"
                  />
                  <span>Titanium Frames Only</span>
                </label>
              </div>
            </div>

            {/* Brands */}
            {availableBrands.length > 0 && (
              <div className="space-y-2 pb-4 border-b border-[#EADFD2]">
                <label className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#B08968] block">
                  Design Brands
                </label>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
                  {availableBrands.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-xs text-[#2B2622] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, b]);
                          } else {
                            setSelectedBrands(selectedBrands.filter((item) => item !== b));
                          }
                        }}
                        className="rounded border-[#EADFD2] text-[#B08968] focus:ring-[#B08968]"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Gender Filter */}
            <div className="space-y-2 pb-4 border-b border-[#EADFD2]">
              <label className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#B08968] block">
                Gender
              </label>
              <div className="space-y-1.5">
                {["Men", "Women", "Unisex", "Kids"].map((g) => (
                  <label key={g} className="flex items-center gap-2 text-xs text-[#2B2622] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedGenders.includes(g)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGenders([...selectedGenders, g]);
                        } else {
                          setSelectedGenders(selectedGenders.filter((item) => item !== g));
                        }
                      }}
                      className="rounded border-[#EADFD2] text-[#B08968] focus:ring-[#B08968]"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Shapes Filter */}
            {availableShapes.length > 0 && (
              <div className="space-y-2 pb-4 border-b border-[#EADFD2]">
                <label className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#B08968] block">
                  Frame Silhouette
                </label>
                <div className="space-y-1.5">
                  {availableShapes.map((shape) => (
                    <label key={shape} className="flex items-center gap-2 text-xs text-[#2B2622] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedShapes.includes(shape)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedShapes([...selectedShapes, shape]);
                          } else {
                            setSelectedShapes(selectedShapes.filter((item) => item !== shape));
                          }
                        }}
                        className="rounded border-[#EADFD2] text-[#B08968] focus:ring-[#B08968]"
                      />
                      <span>{shape}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Material Filter */}
            {availableMaterials.length > 0 && (
              <div className="space-y-2 pb-4 border-b border-[#EADFD2]">
                <label className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#B08968] block">
                  Frame Material
                </label>
                <div className="space-y-1.5">
                  {availableMaterials.map((mat) => (
                    <label key={mat} className="flex items-center gap-2 text-xs text-[#2B2622] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMaterials([...selectedMaterials, mat]);
                          } else {
                            setSelectedMaterials(selectedMaterials.filter((item) => item !== mat));
                          }
                        }}
                        className="rounded border-[#EADFD2] text-[#B08968] focus:ring-[#B08968]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-sans uppercase tracking-[0.15em] font-semibold text-[#B08968] block">
                Price (INR)
              </label>
              <div className="space-y-1.5 text-xs text-[#2B2622]">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "under-5k", label: "Under ₹5,000" },
                  { id: "5k-15k", label: "₹5,000 - ₹15,000" },
                  { id: "15k-30k", label: "₹15,000 - ₹30,000" },
                  { id: "above-30k", label: "Above ₹30,000" },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === item.id}
                      onChange={() => setPriceRange(item.id)}
                      className="text-[#B08968] focus:ring-[#B08968]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#EADFD2] rounded-3xl p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EADFD2] flex items-center justify-center text-[#7C746C] mx-auto mb-4">
                  <Glasses className="w-6 h-6 text-[#B08968]" />
                </div>
                <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                  No frames match your selected filters
                </h3>
                <p className="text-xs sm:text-sm text-[#7C746C] max-w-md mx-auto mt-2 mb-6">
                  Try broadening your price range or clearing specific shape and brand selections to see more designs.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Slide-over Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-[#EADFD2]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EADFD2]">
                <h3 className="font-serif text-lg font-medium text-[#2B2622]">Filter Catalogue</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#7C746C]" />
                </button>
              </div>

              {/* Mobile filter controls */}
              <div className="mt-6 space-y-6">
                {/* Polarized & Titanium */}
                <div className="space-y-2">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#B08968] font-bold block">
                    Features
                  </span>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={onlyPolarized}
                      onChange={(e) => setOnlyPolarized(e.target.checked)}
                    />
                    <span>Polarized Only</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={onlyTitanium}
                      onChange={(e) => setOnlyTitanium(e.target.checked)}
                    />
                    <span>Titanium Only</span>
                  </label>
                </div>

                {/* Brands */}
                <div className="space-y-2">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#B08968] font-bold block">
                    Brands
                  </span>
                  <div className="max-h-40 overflow-y-auto space-y-1.5">
                    {availableBrands.map((b) => (
                      <label key={b} className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(b)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedBrands([...selectedBrands, b]);
                            else setSelectedBrands(selectedBrands.filter((item) => item !== b));
                          }}
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#B08968] font-bold block">
                    Gender
                  </span>
                  <div className="space-y-1.5">
                    {["Men", "Women", "Unisex", "Kids"].map((g) => (
                      <label key={g} className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedGenders.includes(g)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedGenders([...selectedGenders, g]);
                            else setSelectedGenders(selectedGenders.filter((item) => item !== g));
                          }}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#B08968] font-bold block">
                    Price Range
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { id: "all", label: "All Prices" },
                      { id: "under-5k", label: "Under ₹5,000" },
                      { id: "5k-15k", label: "₹5,000 - ₹15,000" },
                      { id: "15k-30k", label: "₹15,000 - ₹30,000" },
                      { id: "above-30k", label: "Above ₹30,000" },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobile-price"
                          checked={priceRange === item.id}
                          onChange={() => setPriceRange(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EADFD2] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white"
              >
                Apply Filters ({sortedProducts.length} Results)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2.5 rounded-full text-xs uppercase tracking-wider font-medium border border-[#EADFD2] text-[#7A5A43]"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
