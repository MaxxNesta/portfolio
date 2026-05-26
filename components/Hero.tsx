"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.4"
      )
      .fromTo(
        bottomRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
  }, []);

  return (
    <section className="min-h-screen px-10 pt-48 pb-28 flex flex-col justify-between">
      <div>
        <p
          ref={labelRef}
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted mb-14 opacity-0"
        >
          Visual Designer &amp; Developer
        </p>
        <h1
          ref={titleRef}
          className="font-serif font-light leading-[0.9] tracking-[-0.02em] text-[clamp(72px,11vw,170px)] opacity-0"
        >
          Maxx
          <br />
          <em>Nesta</em>
        </h1>
      </div>

      <div ref={bottomRef} className="flex justify-between items-end opacity-0 mt-16">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted max-w-[200px] leading-[1.8]">
          Crafting digital experiences
          <br />
          from interfaces to identities
        </p>
        <div
          className="flex items-center gap-3 font-mono text-[11px] tracking-wider uppercase text-muted"
          aria-hidden="true"
        >
          <span className="w-10 h-px bg-muted inline-block" />
          Scroll
        </div>
      </div>
    </section>
  );
}
