"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STAR = "M0,-10 L2.5,-3.4 L9.5,-3.1 L4,1.3 L5.9,8.1 L0,4.2 L-5.9,8.1 L-4,1.3 L-9.5,-3.1 L-2.5,-3.4 Z";

export default function CustomCursor() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const filledRef = useRef<SVGSVGElement>(null);
  const neonRef   = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const filled = filledRef.current;
    const neon   = neonRef.current;
    if (!wrap || !filled || !neon) return;

    let revealed = false;

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.12, ease: "power2.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.12, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!revealed) {
        revealed = true;
        gsap.to(wrap, { opacity: 1, duration: 0.4 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("img, video")) {
        gsap.to(filled, { opacity: 0, duration: 0.2 });
        gsap.to(neon,   { opacity: 1, duration: 0.2 });
        gsap.to(wrap,   { scale: 1.2, duration: 0.3, ease: "power2.out" });
      } else if (target.closest("a, button")) {
        gsap.to(wrap, { scale: 1.3, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("img, video")) {
        gsap.to(filled, { opacity: 1, duration: 0.2 });
        gsap.to(neon,   { opacity: 0, duration: 0.2 });
        gsap.to(wrap,   { scale: 1, duration: 0.3, ease: "power2.out" });
      } else if (target.closest("a, button")) {
        gsap.to(wrap, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor-star" aria-hidden="true">

      {/* Default: filled pink star */}
      <svg ref={filledRef} viewBox="-13 -13 26 26" width="26" height="26">
        <defs>
          <radialGradient id="starFill" cx="38%" cy="32%" r="58%">
            <stop offset="0%" stopColor="#ffe8f2" />
            <stop offset="100%" stopColor="#f0a8c8" />
          </radialGradient>
        </defs>
        <path d={STAR} fill="url(#starFill)" stroke="#e090b8" strokeWidth="0.5" strokeLinejoin="round" />
      </svg>

      {/* Hover media: hollow neon pink star */}
      <svg
        ref={neonRef}
        viewBox="-13 -13 26 26"
        width="26"
        height="26"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
      >
        <defs>
          <filter id="neonGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={STAR} fill="none" stroke="#ff79c6" strokeWidth="1.5" strokeLinejoin="round" filter="url(#neonGlow)" />
      </svg>

    </div>
  );
}
