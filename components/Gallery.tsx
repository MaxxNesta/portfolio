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
      className="h-screen overflow-x-auto overflow-y-hidden md:overflow-hidden"
      style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-3 sm:gap-4 h-full pr-6 sm:pr-10"
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
            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work.cover}
              alt={work.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Default bottom label — fades on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-16 z-10 transition-opacity duration-400 group-hover:opacity-0">
              <p className="font-mono text-[10px] tracking-widest text-white/50 mb-1">{work.id}</p>
              <p className="font-mono text-[11px] tracking-wider uppercase text-white/85">{work.name}</p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-ink/90 px-5 sm:px-6 py-6 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
              <div>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 mb-4 uppercase">
                  {work.id} — {work.tags}
                </p>
                <h3
                  className="font-serif font-light italic text-paper leading-[1.1] mb-5"
                  style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}
                >
                  {work.name}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] leading-[1.8] text-white/55 max-w-[95%]">
                  {work.description}
                </p>
              </div>

              {/* Sub-images */}
              <div>
                <p className="font-mono text-[9px] tracking-widest text-white/30 uppercase mb-3">
                  Works
                </p>
                <div className="flex gap-2">
                  {work.images.map((src, i) => (
                    <div key={i} className="flex-1 overflow-hidden" style={{ aspectRatio: "2/3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
