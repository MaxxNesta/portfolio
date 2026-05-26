"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#info", label: "Info" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start px-10 py-7 opacity-0"
    >
      <Link
        href="/"
        className="font-mono text-[11px] tracking-widest uppercase text-ink hover:opacity-60 transition-opacity duration-200 cursor-none"
      >
        Ju
      </Link>

      <nav className="flex gap-5" aria-label="Main navigation">
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="group relative font-mono text-[11px] tracking-wider text-ink cursor-none"
          >
            <span className="opacity-50">[</span>
            {label}
            <span className="opacity-50">]</span>
            <span className="absolute -bottom-0.5 left-[15px] w-0 h-px bg-ink group-hover:w-[calc(100%-30px)] transition-all duration-300 ease-out" />
          </a>
        ))}
      </nav>
    </header>
  );
}
