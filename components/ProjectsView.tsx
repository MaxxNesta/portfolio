"use client";

import { useState } from "react";
import Link from "next/link";
import { artworks } from "@/lib/artworks";

type Tab = "images" | "moving";

const STRIP = "left-20 sm:left-24"; // width of Card 1 strip visible when Card 2 is active

export default function ProjectsView() {
  const [active, setActive] = useState<Tab>("images");

  return (
    <section className="px-6 sm:px-10 py-10 sm:py-12">

      {/* Card deck — full width, landscape, overflow hidden so Card 2 slides in from right */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden mb-14 sm:mb-16">

        {/* Card 1 — Images, always anchored at left:0 */}
        <button
          onClick={() => setActive("images")}
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 sm:p-12 bg-bg border border-line cursor-none text-left"
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted">01</p>
          <div className="flex items-end justify-between">
            <p className="font-serif font-light italic leading-[1.05] text-[clamp(28px,4.5vw,64px)] text-ink">
              Images
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-muted mb-1">
              Photography & Styling
            </p>
          </div>
        </button>

        {/* Card 2 — Moving Images, slides in from the right, covers Card 1 */}
        <button
          onClick={() => setActive("moving")}
          className={`absolute top-0 w-full h-full flex flex-col justify-between p-8 sm:p-12 bg-ink cursor-none text-left transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            active === "moving" ? STRIP : "left-full"
          }`}
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-bg/40">02</p>
          <div className="flex items-end justify-between">
            <p className="font-serif font-light italic leading-[1.05] text-[clamp(28px,4.5vw,64px)] text-bg">
              Moving Images
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-bg/40 mb-1">
              Video & Animation
            </p>
          </div>
        </button>
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
