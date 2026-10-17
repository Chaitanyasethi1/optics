import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Vision Health & Eyewear Aesthetics Journal | DemoOptics",
  description: "Read clinical optometry guides, digital screen accommodation research, face shape styling principles, and UV400 lens science.",
};

export default function BlogListingPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-white border border-[#EADFD2]">
            <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              OPTOMETRIC SCIENCE & STYLE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2622] font-medium mt-2 mb-3">
            The Vision & Eyewear Journal
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            Written by our master optometrists and optical stylists. Deep dives into ocular ergonomics, lens physics, and aesthetic proportions.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-[#EADFD2] rounded-3xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full bg-[#FAF7F2] overflow-hidden border-b border-[#EADFD2]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#7A5A43] border border-[#EADFD2]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#7C746C] mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B08968]" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#2B2622] group-hover:text-[#7A5A43] transition-colors font-medium mb-3 leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-[#7C746C] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More */}
              <div className="p-6 pt-0 border-t border-[#EADFD2]/70 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5 pt-4">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#EADFD2]">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#2B2622] block">
                      {post.author.name}
                    </span>
                    <span className="text-[10px] text-[#7C746C] block">
                      {post.author.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="pt-4 text-xs font-semibold text-[#7A5A43] hover:text-[#2B2622] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
