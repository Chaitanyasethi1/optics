import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, MessageCircle } from "lucide-react";
import { BLOG_POSTS } from "@/data/products";
import { STORE_NAME, getWhatsAppLink } from "@/data/config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | ${STORE_NAME} Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#7C746C] hover:text-[#7A5A43] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Article Container */}
        <div className="bg-white border border-[#EADFD2] rounded-3xl p-6 sm:p-12 shadow-sm">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#7C746C] mb-4">
            <span className="font-sans uppercase tracking-[0.15em] text-[10px] font-bold text-[#B08968] bg-[#F3ECE2] px-3 py-1 rounded-full border border-[#EADFD2]">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#B08968]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#B08968]" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2622] font-medium leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center gap-3 py-4 border-y border-[#EADFD2] mb-8">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#EADFD2]">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-serif font-medium text-[#2B2622] block">
                {post.author.name}
              </span>
              <span className="text-xs text-[#7C746C] block">
                {post.author.role}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-[#EADFD2]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Body Content */}
          <div className="space-y-6 text-sm sm:text-base text-[#2B2622] leading-relaxed font-sans font-normal">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-[#2B2622]/90">
                {paragraph}
              </p>
            ))}
          </div>

          {/* In-article CTA */}
          <div className="mt-12 p-6 bg-[#FAF7F2] border border-[#EADFD2] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg font-medium text-[#2B2622]">
                Have questions about your personal lens prescription?
              </h4>
              <p className="text-xs text-[#7C746C] mt-0.5">
                Consult with Dr. Raghunath or book a complimentary 14-step examination.
              </p>
            </div>
            <Link
              href="/book-eye-test"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors shrink-0"
            >
              Book Eye Test
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
