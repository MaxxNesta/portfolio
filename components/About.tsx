"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-animate", sectionRef.current!).forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="info" className="px-6 sm:px-10 py-20 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start about-animate opacity-0">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted pt-1">
          Info
        </div>
        <p className="font-serif font-light text-[clamp(20px,2.4vw,32px)] leading-[1.5] tracking-[-0.01em]">
          Based in Bangkok — styling and creating at the intersection of{" "}
          <em>fashion</em> and <em>art</em>. From curating editorial looks to
          crafting visual artworks, the work spans garments, texture, and
          personal expression.
        </p>
      </div>


    </section>
  );
}
