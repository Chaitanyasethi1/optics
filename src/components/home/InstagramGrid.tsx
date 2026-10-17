"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { INSTAGRAM_POSTS } from "@/data/products";
import Eyebrow from "@/components/ui/Eyebrow";

export default function InstagramGrid() {
  return (
    <section
      id="instagram"
      className="relative w-full min-h-auto xl:min-h-screen flex flex-col justify-center snap-frame py-24 xl:py-32 bg-[#F7F3EC] border-t border-[#14110F]/8"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#B89B6A]" />
              <Eyebrow>EDITORIAL FEED</Eyebrow>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#14110F] font-normal tracking-tight">
              Curated Eyewear Aesthetics
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] text-xs uppercase tracking-[0.18em] font-medium border border-[#14110F]/20 text-[#14110F] hover:border-[#14110F] hover:bg-[#14110F] hover:text-[#F7F3EC] transition-all duration-300"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#B89B6A]" />
            <span>Follow Us @DemoOptics</span>
          </a>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[2px] overflow-hidden border border-[#14110F]/10 shadow-xs bg-[#EDE5D8] block"
              data-cursor="INSTAGRAM"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#14110F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <InstagramIcon className="w-4 h-4 text-[#B89B6A]" />
                </div>
                <div>
                  <p className="text-[11px] line-clamp-3 text-[#F7F3EC]/90 mb-2 font-light">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#B89B6A]">
                    <Heart className="w-3 h-3 fill-[#B89B6A]" />
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
