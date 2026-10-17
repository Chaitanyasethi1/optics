import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductDetailView from "@/components/product/ProductDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.brand} ${product.name} | DemoOptics Showroom`,
    description: `${product.name} by ${product.brand}. ${product.description.slice(0, 150)}... Inquire on WhatsApp for showroom trial at DemoOptics Indiranagar.`,
    openGraph: {
      title: `${product.brand} ${product.name} | DemoOptics`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from the same category or brand
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  return (
    <ProductDetailView product={product} relatedProducts={relatedProducts} />
  );
}
