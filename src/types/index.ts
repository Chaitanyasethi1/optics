export type ProductCategory =
  | "sunglasses"
  | "eyeglasses"
  | "lenses"
  | "contact-lenses";

export type Gender = "Men" | "Women" | "Unisex" | "Kids";

export type FrameShape =
  | "Aviator"
  | "Wayfarer"
  | "Round"
  | "Cat-eye"
  | "Rectangle"
  | "Square"
  | "Geometric"
  | "Rimless"
  | "Oval";

export type FrameMaterial =
  | "Pure Titanium"
  | "Beta Titanium"
  | "Handcrafted Italian Acetate"
  | "Stainless Steel"
  | "TR90 Ultralight"
  | "Horn & Wood Accents"
  | "Hypoallergenic Alloy";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  tags?: ("New" | "Polarized" | "Titanium" | "Handcrafted" | "Bestseller" | "Luxury" | "Limited Edition" | "40% OFF")[];
  images: [string, string, ...string[]]; // Primary image, hover image, additional angles
  description: string;
  craftsmanshipNotes?: string;
  specs: {
    material: FrameMaterial | string;
    shape: FrameShape | string;
    gender: Gender;
    size: "Small (48-50mm)" | "Medium (51-53mm)" | "Wide (54-57mm)" | "Universal";
    lensType?: string;
    bridgeWidth?: string;
    templeLength?: string;
    weight?: string;
    color?: string;
    origin?: string;
  };
  features?: string[];
  inStock: boolean;
  featured?: boolean;
  isOffer?: boolean;
  isTitanium?: boolean;
  isPolarized?: boolean;
  isLuxury?: boolean;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  verifiedPurchase: boolean;
  date: string;
  review: string;
  productPurchased: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  content: string[];
}
