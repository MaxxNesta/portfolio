"use client";

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

      mm.add("(min-width: 768px) and (hover: hover)", () => {
        const section = sectionRef.current!;
        const track   = trackRef.current!;

        section.style.overflow = "hidden";

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

        return () => { section.style.overflow = ""; };
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="h-dvh overflow-x-auto overflow-y-hidden pt-16 sm:pt-20"
      style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
    >
      <div
        ref={trackRef}
        className="flex items-end gap-10 sm:gap-20 md:gap-28 h-full pr-6 sm:pr-10 pb-14 sm:pb-20"
        style={{ width: "max-content" }}
      >
        {/* Left spacer — pushes first card away from screen edge */}
        <div className="flex-none w-10 sm:w-20 md:w-28" aria-hidden="true" />

        {artworks.map((work, index) => {
          const landscape = index % 2 === 1;
          return (
          <div key={work.id} className="flex flex-col flex-none">
            <div
              data-cursor="media"
              className={`relative overflow-hidden cursor-none ${
                landscape
                  ? "h-[65dvh] aspect-[3/2]"
                  : "h-[68dvh] aspect-[2/3]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.cover}
                alt={work.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Label below photo */}
            <div className="pt-3 sm:pt-4">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink">{work.name}</p>
              <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">{work.tags}</p>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
