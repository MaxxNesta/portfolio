"use client";

import { useState } from "react";
import Link from "next/link";
import { artworks } from "@/lib/artworks";

type Tab = "images" | "moving";

export default function ProjectsView() {
  const [active, setActive] = useState<Tab>("images");

  return (
    <section className="px-6 sm:px-10 py-10 sm:py-12">

      {/* Stacked card deck — full width, landscape */}
      {/* Wrapper has extra bottom+right padding so the peeking back card doesn't clip */}
      <div className="relative w-full pb-4 pr-4 mb-14 sm:mb-16">

        {/* Moving Images — back card when Images is active */}
        <button
          onClick={() => setActive("moving")}
          className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 sm:p-12 border border-line cursor-none text-left transition-all duration-500 ease-out ${
            active === "moving"
              ? "z-20 translate-x-0 translate-y-0 bg-ink text-bg"
              : "z-10 translate-x-4 translate-y-4 bg-bg text-ink"
          }`}
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase opacity-40">02</p>
          <div className="flex items-end justify-between">
            <p className="font-serif font-light italic leading-[1.05] text-[clamp(32px,5vw,72px)]">
              Moving Images
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Video & Animation
            </p>
          </div>
        </button>

        {/* Images — front card by default */}
        <button
          onClick={() => setActive("images")}
          className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 sm:p-12 border border-line cursor-none text-left transition-all duration-500 ease-out ${
            active === "images"
              ? "z-20 translate-x-0 translate-y-0 bg-ink text-bg"
              : "z-10 translate-x-4 translate-y-4 bg-bg text-ink"
          }`}
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase opacity-40">01</p>
          <div className="flex items-end justify-between">
            <p className="font-serif font-light italic leading-[1.05] text-[clamp(32px,5vw,72px)]">
              Images
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase opacity-40 mb-1">
              Photography & Styling
            </p>
          </div>
        </button>

        {/* Invisible spacer — gives the relative container its height */}
        <div className="w-full h-48 sm:h-56 md:h-64" />
      </div>

      {/* Content */}
      {active === "images" ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-5 sm:gap-7">
          {artworks.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.slug}`}
              className="group relative overflow-hidden bg-ink cursor-none"
              style={{ aspectRatio: "2/3" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.cover}
                alt={work.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <div>
                  <p className="font-mono text-[9px] tracking-widest text-white/50 uppercase mb-1">{work.id}</p>
                  <p className="font-serif font-light italic text-white text-[15px] leading-tight">{work.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border border-line gap-4">
          <p className="font-serif font-light italic text-[24px] sm:text-[32px] text-muted">Coming soon</p>
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted/50">Videos & animations</p>
        </div>
      )}
    </section>
  );
}
