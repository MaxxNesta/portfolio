"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const jSvgRef = useRef<SVGSVGElement>(null);
  const uSvgRef = useRef<SVGSVGElement>(null);
  const jStemRef = useRef<SVGRectElement>(null);
  const jHookRef = useRef<SVGGElement>(null);
  const uLeftRef = useRef<SVGRectElement>(null);
  const uRightRef = useRef<SVGRectElement>(null);
  const uArtRef = useRef<SVGGElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial SVG states imperatively so they match the fromTo start
      gsap.set(jStemRef.current, { attr: { height: 180 } });
      gsap.set(jHookRef.current, { y: 238 });
      gsap.set(uLeftRef.current, { attr: { y: 450, height: 0 } });
      gsap.set(uRightRef.current, { attr: { y: 450, height: 0 } });

      // Entry animation (runs once on load)
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          labelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.5 }
        )
        .fromTo(
          jSvgRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.55"
        )
        .fromTo(
          uSvgRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=1.1"
        )
        .fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      // Scroll-pinned animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      });

      // Fade out scroll hint immediately
      tl.to(scrollHintRef.current, { opacity: 0, ease: "none", duration: 0.1 }, 0);

      // J — stem grows downward
      tl.to(jStemRef.current, { attr: { height: 480 }, ease: "none" }, 0);
      // J — hook translates down with the stem bottom
      tl.to(jHookRef.current, { y: 538, ease: "none" }, 0);

      // U — arms grow upward from fixed bottom curve
      tl.to(uLeftRef.current, { attr: { y: 80, height: 370 }, ease: "none" }, 0);
      tl.to(uRightRef.current, { attr: { y: 80, height: 370 }, ease: "none" }, 0);

      // U — interior brushstroke artwork fades in from midpoint
      tl.fromTo(
        uArtRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 0.65 },
        0.35
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center px-6 sm:px-10 pt-24 sm:pt-32 md:pt-36 lg:pt-40 pb-12"
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted mb-8 md:mb-12 lg:mb-14 opacity-0"
      >
        Stylist &amp; Visual Artist
      </p>

      {/* Letters */}
      <div className="flex items-start gap-5 sm:gap-10 md:gap-20 lg:gap-28">

        {/* ── J ── */}
        <svg
          ref={jSvgRef}
          viewBox="0 0 200 600"
          className="h-[34vh] sm:h-[42vh] md:h-[50vh] lg:h-[56vh] w-auto opacity-0"
          style={{ overflow: "visible", color: "#1A1A1A" }}
          aria-hidden="true"
        >
          {/* Top crossbar */}
          <rect x="40" y="58" width="120" height="7" fill="currentColor" />
          {/* Stem — height animated 180 → 480 */}
          <rect ref={jStemRef} x="97" y="58" width="7" height="180" fill="currentColor" />
          {/* Hook group — translateY animated 238 → 538 */}
          <g ref={jHookRef}>
            <path
              d="M 104 0 L 104 24 C 104 74 73 84 50 78 C 30 72 28 52 39 45"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>

        {/* ── U ── */}
        <svg
          ref={uSvgRef}
          viewBox="0 0 240 600"
          className="h-[34vh] sm:h-[42vh] md:h-[50vh] lg:h-[56vh] w-auto opacity-0"
          style={{ overflow: "visible", color: "#1A1A1A" }}
          aria-hidden="true"
        >
          {/* Bottom curve — stays fixed */}
          <path
            d="M 36 450 Q 36 528 120 528 Q 204 528 204 450"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left arm — y: 450→80, height: 0→370 */}
          <rect ref={uLeftRef} x="32" y="450" width="8" height="0" fill="currentColor" />
          {/* Right arm — y: 450→80, height: 0→370 */}
          <rect ref={uRightRef} x="200" y="450" width="8" height="0" fill="currentColor" />

          {/*
            Interior artwork — flowing curves suggesting fabric drape /
            fashion-illustration brushstrokes. Fades in as arms grow.
          */}
          <g
            ref={uArtRef}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            opacity="0"
          >
            <path d="M 52 140 Q 88 160 122 148 Q 156 136 180 156" strokeWidth="1.5" />
            <path d="M 50 188 Q 92 208 126 196 Q 160 184 182 204" strokeWidth="1.2" />
            <path d="M 52 234 Q 96 252 128 240 Q 160 228 180 248" strokeWidth="1.0" />
            <path d="M 55 278 Q 98 295 130 284 Q 162 273 180 290" strokeWidth="0.9" />
            <path d="M 58 322 Q 100 337 131 327 Q 162 317 178 332" strokeWidth="0.8" />
            <path d="M 60 365 Q 102 378 132 369 Q 162 360 176 374" strokeWidth="0.7" />
            <path d="M 63 408 Q 104 419 133 411 Q 161 403 174 415" strokeWidth="0.5" />
            {/* Centre hairline — like a tailor's chalk mark */}
            <line x1="120" y1="96" x2="120" y2="432" strokeWidth="0.4" strokeDasharray="4 10" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 right-6 sm:bottom-10 sm:right-10 flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-muted opacity-0"
        aria-hidden="true"
      >
        <span className="w-10 h-px bg-muted inline-block" />
        Scroll
      </div>
    </section>
  );
}
