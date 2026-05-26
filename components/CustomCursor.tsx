"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let revealed = false;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power1.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power1.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      if (!revealed) {
        revealed = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button")) {
        gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button")) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
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
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
