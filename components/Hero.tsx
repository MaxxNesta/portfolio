"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef      = useRef<HTMLElement>(null);
  const jSvgRef         = useRef<SVGSVGElement>(null);
  const uSvgRef         = useRef<SVGSVGElement>(null);
  const jBarRef         = useRef<SVGRectElement>(null);
  const jStemRef        = useRef<SVGLineElement>(null);
  const jHookPathRef    = useRef<SVGPathElement>(null);
  const jHookRef        = useRef<SVGGElement>(null);
  const uCurveRef       = useRef<SVGPathElement>(null);
  const uLeftRef        = useRef<SVGLineElement>(null);
  const uRightRef       = useRef<SVGLineElement>(null);
  const scrollHintRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isTouch = window.matchMedia("(hover: none)").matches;
      const sw    = 5;
      const barH  = 5;
      const barY  = 64 - barH / 2;
      const stemY1 = barY + barH;

      // ── Responsive stroke widths ────────────────────────────────────
      gsap.set(jBarRef.current,      { attr: { height: barH, y: barY } });
      gsap.set(jStemRef.current,     { attr: { "stroke-width": sw, y1: stemY1 } });
      gsap.set(jHookPathRef.current, { attr: { "stroke-width": sw } });
      gsap.set(uCurveRef.current,    { attr: { "stroke-width": sw } });
      gsap.set(uLeftRef.current,     { attr: { "stroke-width": sw } });
      gsap.set(uRightRef.current,    { attr: { "stroke-width": sw } });

      if (isTouch) {
        // Touch devices: show full letters immediately, no scroll animation
        gsap.set(jStemRef.current,  { attr: { y2: 538 } });
        gsap.set(jHookRef.current,  { y: 538 });
        gsap.set(jBarRef.current,   { attr: { x: 20, width: 160 } });
        gsap.set(uLeftRef.current,  { attr: { y1: 80 } });
        gsap.set(uRightRef.current, { attr: { y1: 80 } });
        gsap.set(scrollHintRef.current, { display: "none" });

        gsap.timeline({ defaults: { ease: "power3.out" } })
          .fromTo(jSvgRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 })
          .fromTo(uSvgRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, "-=1.0");
      } else {
        // Desktop: short letters grow on scroll
        gsap.set(jStemRef.current,  { attr: { y2: stemY1 + 164 } });
        gsap.set(jHookRef.current,  { y: stemY1 + 164 });
        gsap.set(uLeftRef.current,  { attr: { y1: 450 } });
        gsap.set(uRightRef.current, { attr: { y1: 450 } });

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(jSvgRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 })
          .fromTo(uSvgRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, "-=1.0")
          .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

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
        tl.to(jStemRef.current, { attr: { y2: 538 }, ease: "none" }, 0);
        tl.to(jHookRef.current, { y: 538,            ease: "none" }, 0);
        tl.to(jBarRef.current,  { attr: { x: 14, width: 172 }, ease: "none" }, 0);
        tl.to(uLeftRef.current,  { attr: { y1: 80 }, ease: "none" }, 0);
        tl.to(uRightRef.current, { attr: { y1: 80 }, ease: "none" }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh flex flex-col items-center px-4 sm:px-10 pb-8"
    >
      <div className="flex-1 flex items-center justify-center gap-4 sm:gap-16 md:gap-24 lg:gap-32 min-h-0 w-full">

        {/* ── J ───────────────────────────────────────────────────────── */}
        <svg
          ref={jSvgRef}
          viewBox="0 0 200 600"
          className="h-[58vh] sm:h-full w-auto opacity-0"
          style={{ overflow: "visible", color: "#1A1A1A" }}
          aria-hidden="true"
        >
          <rect ref={jBarRef} x="34" y="54" width="132" height="20" fill="currentColor" />
          <line
            ref={jStemRef}
            x1="100" y1="74" x2="100" y2="238"
            stroke="currentColor" strokeWidth="1" strokeLinecap="square"
          />
          <g ref={jHookRef}>
            <path
              ref={jHookPathRef}
              d="M 100 0 L 100 22 C 100 82 62 96 38 84 C 16 72 14 46 30 38"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"
            />
          </g>
        </svg>

        {/* ── U ───────────────────────────────────────────────────────── */}
        <svg
          ref={uSvgRef}
          viewBox="0 0 240 600"
          className="h-[58vh] sm:h-full w-auto opacity-0"
          style={{ overflow: "visible", color: "#1A1A1A" }}
          aria-hidden="true"
        >
          <path
            ref={uCurveRef}
            d="M 36 450 Q 36 536 120 536 Q 204 536 204 450"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"
          />
          <line
            ref={uLeftRef}
            x1="36" y1="450" x2="36" y2="450"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round"
          />
          <line
            ref={uRightRef}
            x1="204" y1="450" x2="204" y2="450"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round"
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
