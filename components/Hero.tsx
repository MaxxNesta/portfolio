"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const jSvgRef       = useRef<SVGSVGElement>(null);
  const uSvgRef       = useRef<SVGSVGElement>(null);
  const jBarRef       = useRef<SVGRectElement>(null);
  const jStemRef      = useRef<SVGLineElement>(null);
  const jHookRef      = useRef<SVGGElement>(null);
  const uLeftRef      = useRef<SVGLineElement>(null);
  const uRightRef     = useRef<SVGLineElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial SVG states (short letters) ─────────────────────────
      gsap.set(jStemRef.current,  { attr: { y2: 238 } });
      gsap.set(jHookRef.current,  { y: 238 });
      gsap.set(uLeftRef.current,  { attr: { y1: 450 } });
      gsap.set(uRightRef.current, { attr: { y1: 450 } });

      // ── Entry animation ─────────────────────────────────────────────
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(jSvgRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 })
        .fromTo(uSvgRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 }, "-=1.0")
        .fromTo(scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 }, "-=0.3");

      // ── Scroll-pinned animation (all screen sizes) ──────────────────
      // end "+=300%" = 3× viewport height of scroll — full long desktop pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          pin: true,
          pinType: "transform",
          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scrollHintRef.current, { opacity: 0, ease: "none", duration: 0.1 }, 0);

      // J — stem grows down, hook follows, crossbar widens from centre
      tl.to(jStemRef.current, { attr: { y2: 538 }, ease: "none" }, 0);
      tl.to(jHookRef.current, { y: 538,            ease: "none" }, 0);
      tl.to(jBarRef.current,  { attr: { x: 14, width: 172 }, ease: "none" }, 0);

      // U — arms grow upward from fixed bottom curve
      tl.to(uLeftRef.current,  { attr: { y1: 80 }, ease: "none" }, 0);
      tl.to(uRightRef.current, { attr: { y1: 80 }, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center px-6 sm:px-10 pb-8"
    >
      <div className="flex-1 flex items-center justify-center gap-8 sm:gap-16 md:gap-24 lg:gap-32 min-h-0 w-full">

        {/* ── J ───────────────────────────────────────────────────────── */}
        <svg
          ref={jSvgRef}
          viewBox="0 0 200 600"
          className="h-full w-auto opacity-0"
          style={{ overflow: "visible", color: "#1A1A1A" }}
          aria-hidden="true"
        >
          {/* Crossbar — x/width animated to expand from centre */}
          <rect ref={jBarRef} x="34" y="54" width="132" height="20" fill="currentColor" />

          {/* Stem — y2 animated 238 → 538 */}
          <line
            ref={jStemRef}
            x1="100" y1="74"
            x2="100" y2="238"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="square"
          />

          {/* Hook — translateY animated 238 → 538 */}
          <g ref={jHookRef}>
            <path
              d="M 100 0 L 100 22 C 100 82 62 96 38 84 C 16 72 14 46 30 38"
              stroke="currentColor"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>

        {/* ── U ───────────────────────────────────────────────────────── */}
        <svg
          ref={uSvgRef}
          viewBox="0 0 240 600"
          className="h-full w-auto opacity-0"
          style={{ overflow: "visible", color: "#1A1A1A" }}
          aria-hidden="true"
        >
          {/* Bottom curve — fixed */}
          <path
            d="M 36 450 Q 36 536 120 536 Q 204 536 204 450"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left arm — y1 animated 450 → 80 */}
          <line
            ref={uLeftRef}
            x1="36" y1="450"
            x2="36" y2="450"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Right arm — y1 animated 450 → 80 */}
          <line
            ref={uRightRef}
            x1="204" y1="450"
            x2="204" y2="450"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>
      </div>

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
