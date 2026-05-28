"use client";

import { useState } from "react";
import Link from "next/link";
import { artworks } from "@/lib/artworks";

type Tab = "images" | "moving";

export default function ProjectsView() {
  const [active, setActive] = useState<Tab | null>(null);

  return (
    <div>
      {/* Full-bleed card deck — fills viewport below the nav */}
      <div className="relative w-full h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-6rem)] overflow-hidden">

        {/* Card 1 — Images, always at left:0 */}
        <button
          onClick={() => setActive("images")}
          className="absolute inset-0 w-full h-full flex flex-col justify-between px-8 sm:px-14 py-10 sm:py-14 bg-bg cursor-none text-left"
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted">01</p>
          <div>
            <p className="font-serif font-light italic leading-[1.0] text-[clamp(40px,8vw,120px)] text-ink mb-4">
              Images
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-muted">
              Photography & Styling
            </p>
          </div>
        </button>

        {/* Card 2 — Moving Images, peeks as dark strip from right, slides over on click */}
        <button
          onClick={() => setActive("moving")}
          className={`absolute top-0 w-full h-full flex flex-col justify-between px-8 sm:px-14 py-10 sm:py-14 bg-ink cursor-none text-left transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            active === "moving"
              ? "left-16 sm:left-20"
              : "left-[calc(100%-4rem)] sm:left-[calc(100%-5rem)]"
          }`}
        >
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-bg/40">02</p>
          <div>
            <p className="font-serif font-light italic leading-[1.0] text-[clamp(40px,8vw,120px)] text-bg mb-4">
              Moving<br />Images
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-bg/40">
              Video & Animation
            </p>
          </div>
        </button>
      </div>

      {/* Content — hidden until a card is selected */}
      {active !== null && (
        <div className="px-6 sm:px-10 py-10 sm:py-14">
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
        </div>
      )}
    </div>
  );
}
