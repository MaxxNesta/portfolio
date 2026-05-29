"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Puffy 5-pointed star: cubic bezier arms, outer R=11, inner r=5
const PUFFY =
  "M-2.94,-4.05 C0,-11 0,-11 2.94,-4.05 " +
  "C10.46,-3.4 10.46,-3.4 4.76,1.55 " +
  "C6.47,8.9 6.47,8.9 0,5 " +
  "C-6.47,8.9 -6.47,8.9 -4.76,1.55 " +
  "C-10.46,-3.4 -10.46,-3.4 -2.94,-4.05 Z";

// Flat 5-pointed star: straight lines, outer R=11, inner r=4.5
const FLAT = "M0,-11 L2.65,-3.64 L10.46,-3.4 L4.28,1.39 L6.47,8.9 L0,4.5 L-6.47,8.9 L-4.28,1.39 L-10.46,-3.4 L-2.65,-3.64 Z";

export default function CustomCursor() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const filledRef = useRef<SVGSVGElement>(null);
  const neonRef   = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const filled = filledRef.current;
    const neon   = neonRef.current;
    if (!wrap || !filled || !neon) return;

    let revealed   = false;
    let rotation   = 0;
    let lastY      = window.scrollY;

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

    const onScroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      rotation += delta * 0.5;
      gsap.to(wrap, { rotation, duration: 0.7, ease: "power2.out" });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest('[data-cursor="media"], img, video')) {
        gsap.to(filled, { opacity: 0, duration: 0.2 });
        gsap.to(neon,   { opacity: 1, duration: 0.2 });
        gsap.to(wrap,   { scale: 1.2, duration: 0.3, ease: "power2.out" });
      } else if (t.closest("a, button")) {
        gsap.to(wrap, { scale: 1.3, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest('[data-cursor="media"], img, video')) {
        gsap.to(filled, { opacity: 1, duration: 0.2 });
        gsap.to(neon,   { opacity: 0, duration: 0.2 });
        gsap.to(wrap,   { scale: 1, duration: 0.3, ease: "power2.out" });
      } else if (t.closest("a, button")) {
        gsap.to(wrap, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor-star" aria-hidden="true">

      {/* Default: filled puffy pink star with gradient */}
      <svg ref={filledRef} viewBox="-14 -14 28 28" width="28" height="28">
        <defs>
          <radialGradient id="starFill" cx="38%" cy="32%" r="60%">
            <stop offset="0%"   stopColor="#ffe8f2" />
            <stop offset="100%" stopColor="#f0a8c8" />
          </radialGradient>
        </defs>
        <path d={PUFFY} fill="url(#starFill)" stroke="#e090b8" strokeWidth="0.4" />
      </svg>

      {/* Hover on photo/video: flat outline star, pink glow */}
      <svg
        ref={neonRef}
        viewBox="-14 -14 28 28"
        width="28"
        height="28"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
      >
        <defs>
          <filter id="neonGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={FLAT} fill="none" stroke="#ff79c6" strokeWidth="1.5" filter="url(#neonGlow)" />
      </svg>

    </div>
  );
}
