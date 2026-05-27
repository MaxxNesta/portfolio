"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const star = starRef.current;
    if (!star) return;

    let revealed = false;

    const xStar = gsap.quickTo(star, "x", { duration: 0.12, ease: "power2.out" });
    const yStar = gsap.quickTo(star, "y", { duration: 0.12, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xStar(e.clientX);
      yStar(e.clientY);
      if (!revealed) {
        revealed = true;
        gsap.to(star, { opacity: 1, duration: 0.4 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button")) {
        gsap.to(star, { scale: 1.6, rotation: 45, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button")) {
        gsap.to(star, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
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
    <div ref={starRef} className="cursor-star" aria-hidden="true">
      <svg viewBox="-12 -12 24 24" width="24" height="24" fill="currentColor">
        <path d="M0,-11 L2.5,-2.5 L11,0 L2.5,2.5 L0,11 L-2.5,2.5 L-11,0 L-2.5,-2.5 Z" />
      </svg>
    </div>
  );
}
