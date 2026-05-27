"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { artworks } from "@/lib/artworks";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current!;
        const track   = trackRef.current!;

        gsap.to(track, {
          x: () => -(track.scrollWidth - section.offsetWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth - section.offsetWidth}`,
            pin: true,
            pinType: "transform",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="h-dvh overflow-x-auto overflow-y-hidden md:overflow-hidden"
      style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-10 sm:gap-20 md:gap-28 h-full pr-6 sm:pr-10"
        style={{ width: "max-content" }}
      >
        {/* Left spacer — pushes first card away from screen edge */}
        <div className="flex-none w-10 sm:w-20 md:w-28" aria-hidden="true" />

        {artworks.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.slug}`}
            className="group relative flex-none w-[68vw] sm:w-[46vw] md:w-[30vw] lg:w-[26vw] h-[72vh] overflow-hidden cursor-none"
          >
            {/* Cover image — always visible, subtle zoom on hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work.cover}
              alt={work.name}
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Dark scrim + description — fades in on hover */}
            <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            <div className="absolute inset-0 px-5 sm:px-6 py-6 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                {work.id} — {work.tags}
              </p>
              <div>
                <h3
                  className="font-serif font-light italic text-white leading-[1.1] mb-4"
                  style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}
                >
                  {work.name}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] leading-[1.8] text-white/70 max-w-[95%]">
                  {work.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
