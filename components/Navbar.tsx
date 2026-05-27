"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#info", label: "Info" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-6 sm:px-10 py-6 sm:py-7 bg-bg"
      >
        <Link
          href="/"
          className="font-mono text-[14px] tracking-widest uppercase text-ink hover:opacity-60 transition-opacity duration-200 cursor-none"
        >
          Ju
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-5" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="group relative font-mono text-[13px] tracking-wider text-ink cursor-none"
            >
              <span className="opacity-50">[</span>
              {label}
              <span className="opacity-50">]</span>
              <span className="absolute -bottom-0.5 left-[15px] w-0 h-px bg-ink group-hover:w-[calc(100%-30px)] transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="w-5 h-px bg-ink block" />
          <span className="w-5 h-px bg-ink block" />
          <span className="w-3 h-px bg-ink block" />
        </button>
      </header>

      {/* Mobile side panel overlay */}
      <div
        className={`fixed inset-0 z-[300] md:hidden transition-all duration-400 ${
          open ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink/30 transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-bg flex flex-col px-8 py-7 transition-transform duration-400 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <button
            className="self-end font-mono text-[18px] text-muted leading-none mb-14 cursor-pointer"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

          <nav className="flex flex-col gap-8" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[14px] tracking-[0.2em] uppercase text-ink"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <p className="mt-auto font-mono text-[9px] tracking-widest text-muted/50 uppercase">
            © 2025 Ju
          </p>
        </div>
      </div>
    </>
  );
}
