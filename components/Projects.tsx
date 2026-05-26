"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { num: "01", name: "Bloom", tags: "Editorial styling & Lookbook", year: "2025" },
  { num: "02", name: "Dusk", tags: "Wardrobe curation & Fashion story", year: "2025" },
  { num: "03", name: "Thread", tags: "Fashion illustration & Prints", year: "2024" },
  { num: "04", name: "Reverie", tags: "Mixed media artwork & Collage", year: "2024" },
  { num: "05", name: "Petal", tags: "Art direction & Photography", year: "2024" },
  { num: "06", name: "Veil", tags: "Textile & Pattern design", year: "2023" },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
        }
      );

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: i * 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="px-6 sm:px-10 py-20 sm:py-24">
      <p
        ref={labelRef}
        className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted mb-14 opacity-0"
      >
        Selected works
      </p>

      <ul aria-label="Projects">
        {projects.map((p, i) => (
          <li
            key={p.num}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="border-t border-line last:border-b last:border-line opacity-0"
          >
            <a
              href="#"
              className="group flex justify-between items-center py-7 text-ink cursor-none hover:pl-5 transition-[padding] duration-[400ms] ease-out"
            >
              <div className="flex items-baseline gap-3 sm:gap-8">
                <span className="font-mono text-[11px] text-muted w-7 shrink-0">
                  {p.num}
                </span>
                <span className="font-serif font-normal leading-none text-[clamp(24px,3vw,42px)] tracking-[-0.01em] group-hover:tracking-[0.005em] transition-all duration-[400ms]">
                  {p.name}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-10 text-right">
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted hidden md:block">
                  {p.tags}
                </span>
                <span className="font-mono text-[11px] text-muted">{p.year}</span>
                <span className="text-base opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
