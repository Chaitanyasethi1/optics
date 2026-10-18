import { PRODUCTS } from "@/data/products";

export interface LensTint {
  id: string;
  name: string;
  hex: string;
  gradient?: string;
  opacity: number;
}

export const LENS_TINTS: LensTint[] = [
  { id: "g15", name: "Green G-15", hex: "#1c2b20", opacity: 0.82 },
  { id: "black", name: "Classic Black", hex: "#111111", opacity: 0.88 },
  { id: "brown", name: "Amber Brown", hex: "#4a2c11", opacity: 0.78 },
  { id: "blue", name: "Blue Mirror", hex: "#1e3a5f", opacity: 0.85 },
  {
    id: "gradient",
    name: "Sunset Gradient",
    hex: "#3d2218",
    gradient: "linear-gradient(180deg, rgba(61,34,24,0.9) 0%, rgba(184,155,106,0.3) 100%)",
    opacity: 0.75,
  },
  { id: "clear", name: "Clear Blue-Cut", hex: "rgba(220,240,255,0.12)", opacity: 0.15 },
];

export interface TryOnFrame {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: "sunglasses" | "eyeglasses";
  gender: "Men" | "Women" | "Unisex" | "Kids";
  shape: "Aviator" | "Wayfarer" | "Round" | "Cat-eye" | "Rectangle" | "Square" | "Geometric" | "Rimless";
  frameWidthMm: number;
  bridgeMm: number;
  lensWidthMm: number;
  lensHeightMm: number;
  image: string;
  overlayUrl: string; // High-resolution photorealistic isolated front cutout
  frameColor: string;
  accentColor: string;
  defaultTint: string;
  svgTemplate: "aviator" | "wayfarer" | "round" | "cateye" | "rectangle" | "geometric" | "rimless";
  suitableFaceShapes: ("Oval" | "Round" | "Square" | "Heart")[];
}

// Map high-prestige frames from the catalogue into the Virtual Try-On studio
export const TRYON_FRAMES: TryOnFrame[] = [
  {
    id: "tryon-aviator-rb",
    slug: "ray-ban-aviator-classic-gold-polarized",
    name: "Aviator Classic Gold",
    brand: "Ray-Ban",
    price: 12490,
    category: "sunglasses",
    gender: "Unisex",
    shape: "Aviator",
    frameWidthMm: 138,
    bridgeMm: 14,
    lensWidthMm: 58,
    lensHeightMm: 50,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/aviator-gold.svg",
    frameColor: "#B89B6A",
    accentColor: "#EADFD2",
    defaultTint: "g15",
    svgTemplate: "aviator",
    suitableFaceShapes: ["Oval", "Square", "Heart"],
  },
  {
    id: "tryon-wayfarer-rb",
    slug: "ray-ban-original-wayfarer-ebony",
    name: "Original Wayfarer Classic",
    brand: "Ray-Ban",
    price: 10990,
    category: "sunglasses",
    gender: "Unisex",
    shape: "Wayfarer",
    frameWidthMm: 142,
    bridgeMm: 22,
    lensWidthMm: 50,
    lensHeightMm: 41,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/wayfarer-black.svg",
    frameColor: "#14110F",
    accentColor: "#B89B6A",
    defaultTint: "g15",
    svgTemplate: "wayfarer",
    suitableFaceShapes: ["Oval", "Round"],
  },
  {
    id: "tryon-titanium-silhouette",
    slug: "silhouette-tma-icon-pure-titanium",
    name: "TMA Icon Pure Rimless",
    brand: "Silhouette",
    price: 28500,
    category: "eyeglasses",
    gender: "Unisex",
    shape: "Rimless",
    frameWidthMm: 134,
    bridgeMm: 19,
    lensWidthMm: 52,
    lensHeightMm: 38,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/rimless-titanium.svg",
    frameColor: "#D4BE96",
    accentColor: "#B89B6A",
    defaultTint: "clear",
    svgTemplate: "rimless",
    suitableFaceShapes: ["Oval", "Round", "Square", "Heart"],
  },
  {
    id: "tryon-gucci-round",
    slug: "gucci-round-metal-web-detail",
    name: "Round Metal Web Detail",
    brand: "Gucci",
    price: 34500,
    category: "sunglasses",
    gender: "Women",
    shape: "Round",
    frameWidthMm: 136,
    bridgeMm: 20,
    lensWidthMm: 51,
    lensHeightMm: 48,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/round-gold.svg",
    frameColor: "#B89B6A",
    accentColor: "#14110F",
    defaultTint: "brown",
    svgTemplate: "round",
    suitableFaceShapes: ["Square", "Heart", "Oval"],
  },
  {
    id: "tryon-cateye-burberry",
    slug: "burberry-vintage-check-cat-eye",
    name: "Vintage Check Sculpted Cat-Eye",
    brand: "Burberry",
    price: 24900,
    category: "sunglasses",
    gender: "Women",
    shape: "Cat-eye",
    frameWidthMm: 139,
    bridgeMm: 17,
    lensWidthMm: 54,
    lensHeightMm: 44,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/cateye-black.svg",
    frameColor: "#2A2623",
    accentColor: "#B89B6A",
    defaultTint: "gradient",
    svgTemplate: "cateye",
    suitableFaceShapes: ["Round", "Oval", "Heart"],
  },
  {
    id: "tryon-montblanc-geo",
    slug: "mont-blanc-meisterstuck-beta-titanium",
    name: "Meisterstück Minimal Geometric",
    brand: "Mont Blanc",
    price: 36000,
    category: "eyeglasses",
    gender: "Men",
    shape: "Geometric",
    frameWidthMm: 140,
    bridgeMm: 18,
    lensWidthMm: 53,
    lensHeightMm: 40,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/geometric-gunmetal.svg",
    frameColor: "#2A2623",
    accentColor: "#B89B6A",
    defaultTint: "clear",
    svgTemplate: "geometric",
    suitableFaceShapes: ["Round", "Oval"],
  },
  {
    id: "tryon-mauijim-rectangle",
    slug: "maui-jim-peahi-polarizedplus2",
    name: "Peahi PolarizedPlus2 Wrap",
    brand: "Maui Jim",
    price: 26000,
    category: "sunglasses",
    gender: "Men",
    shape: "Rectangle",
    frameWidthMm: 144,
    bridgeMm: 19,
    lensWidthMm: 65,
    lensHeightMm: 42,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/holbrook-square.svg",
    frameColor: "#14110F",
    accentColor: "#1e3a5f",
    defaultTint: "blue",
    svgTemplate: "rectangle",
    suitableFaceShapes: ["Oval", "Round"],
  },
  {
    id: "tryon-oakley-holbrook",
    slug: "oakley-holbrook-prizm-sapphire",
    name: "Holbrook Prizm Sapphire",
    brand: "Oakley",
    price: 15990,
    category: "sunglasses",
    gender: "Men",
    shape: "Square",
    frameWidthMm: 140,
    bridgeMm: 18,
    lensWidthMm: 57,
    lensHeightMm: 43,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    overlayUrl: "/frames/holbrook-square.svg",
    frameColor: "#14110F",
    accentColor: "#1e3a5f",
    defaultTint: "blue",
    svgTemplate: "rectangle",
    suitableFaceShapes: ["Oval", "Round"],
  },
];

import { Product } from "@/types";

export function getTryOnFrameForProduct(product: Product): TryOnFrame {
  const match = TRYON_FRAMES.find((f) => f.slug === product.slug);
  if (match) return match;

  const shape = product.specs?.shape || "Wayfarer";
  const isSunglasses = product.category === "sunglasses";

  let overlayUrl = "/frames/wayfarer-black.svg";
  let frameColor = "#14110F";
  let defaultTint = isSunglasses ? "g15" : "clear";
  let svgTemplate: TryOnFrame["svgTemplate"] = "wayfarer";

  if (shape === "Aviator") {
    overlayUrl = "/frames/aviator-gold.svg";
    frameColor = "#B89B6A";
    defaultTint = isSunglasses ? "g15" : "clear";
    svgTemplate = "aviator";
  } else if (shape === "Round") {
    overlayUrl = "/frames/round-gold.svg";
    frameColor = "#B89B6A";
    defaultTint = isSunglasses ? "brown" : "clear";
    svgTemplate = "round";
  } else if (shape === "Cat-eye") {
    overlayUrl = "/frames/cateye-black.svg";
    frameColor = "#2A2623";
    defaultTint = isSunglasses ? "gradient" : "clear";
    svgTemplate = "cateye";
  } else if (shape === "Rimless" || product.specs?.material?.includes("Titanium")) {
    overlayUrl = "/frames/rimless-titanium.svg";
    frameColor = "#D4BE96";
    defaultTint = "clear";
    svgTemplate = "rimless";
  } else if (shape === "Geometric") {
    overlayUrl = "/frames/geometric-gunmetal.svg";
    frameColor = "#2A2623";
    defaultTint = isSunglasses ? "g15" : "clear";
    svgTemplate = "geometric";
  } else if (shape === "Rectangle" || shape === "Square") {
    overlayUrl = "/frames/holbrook-square.svg";
    frameColor = "#14110F";
    defaultTint = isSunglasses ? "blue" : "clear";
    svgTemplate = "rectangle";
  }

  return {
    id: `tryon-${product.id}`,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: isSunglasses ? "sunglasses" : "eyeglasses",
    gender: (product.specs?.gender as any) || "Unisex",
    shape: (product.specs?.shape as any) || "Wayfarer",
    frameWidthMm: 140,
    bridgeMm: 18,
    lensWidthMm: 52,
    lensHeightMm: 40,
    image: product.images[0],
    overlayUrl,
    frameColor,
    accentColor: "#B89B6A",
    defaultTint,
    svgTemplate,
    suitableFaceShapes: ["Oval", "Round", "Square"],
  };
}
