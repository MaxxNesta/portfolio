"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-animate", sectionRef.current!).forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-6 sm:px-10 py-24 sm:py-28 md:py-36 border-t border-line"
    >
      <p className="contact-animate font-mono text-[11px] tracking-[0.12em] uppercase text-muted mb-10 opacity-0">
        Get in touch
      </p>

      <h2 className="contact-animate font-serif font-light text-[clamp(48px,8vw,130px)] leading-[0.93] tracking-[-0.02em] mb-16 opacity-0">
        Ju
      </h2>

      <a
        href="mailto:"
        className="contact-animate group relative inline-flex items-center gap-2 font-mono text-[13px] tracking-wider text-ink cursor-none opacity-0"
        aria-label="Send me an email"
      >
        <span className="opacity-50">[</span>
        <span className="group-hover:translate-x-1.5 transition-transform duration-300 ease-out inline-block">
          →
        </span>
        <span>Get in touch</span>
        <span className="opacity-50">]</span>
        <span className="absolute -bottom-0.5 left-[18px] w-0 h-px bg-ink group-hover:w-[calc(100%-36px)] transition-all duration-[400ms] ease-out" />
      </a>
    </section>
  );
}
