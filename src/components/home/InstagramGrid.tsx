"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { INSTAGRAM_POSTS } from "@/data/products";

export default function InstagramGrid() {
  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-[#EADFD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <InstagramIcon className="w-3.5 h-3.5 text-[#B08968]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
                EDITORIAL FEED
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2622] font-medium">
              Curated Eyewear Aesthetics
            </h2>
            <div className="w-12 h-[1px] bg-[#B08968] mt-3" />
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow Us @DemoOptics</span>
          </a>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#EADFD2] shadow-xs bg-white block"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#2B2622]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <InstagramIcon className="w-4 h-4 text-[#D9BFA3]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#FAF7F2] line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-[#D9BFA3]">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
