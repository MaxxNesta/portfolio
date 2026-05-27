import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artworks } from "@/lib/artworks";

export const metadata = { title: "Projects — Ju" };

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-24">
        <section className="px-6 sm:px-10 py-16 sm:py-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted mb-14">
            Selected works
          </p>

          {/* Photo grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 sm:gap-7 mb-20">
            {artworks.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.slug}`}
                className="group relative overflow-hidden bg-ink"
                style={{ aspectRatio: "2/3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.cover}
                  alt={work.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-widest text-white/50 uppercase mb-1">{work.id}</p>
                    <p className="font-serif font-light italic text-white text-[15px] leading-tight">{work.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Text list */}
          <ul aria-label="Projects">
            {artworks.map((work) => (
              <li key={work.id} className="border-t border-line last:border-b last:border-line">
                <Link
                  href={`/works/${work.slug}`}
                  className="group flex justify-between items-center py-7 text-ink hover:pl-5 transition-[padding] duration-[400ms] ease-out"
                >
                  <div className="flex items-baseline gap-3 sm:gap-8">
                    <span className="font-mono text-[11px] text-muted w-7 shrink-0">
                      {work.id}
                    </span>
                    <span className="font-serif font-normal leading-none text-[clamp(24px,3vw,42px)] tracking-[-0.01em] group-hover:tracking-[0.005em] transition-all duration-[400ms]">
                      {work.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-10 text-right">
                    <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted hidden md:block">
                      {work.tags}
                    </span>
                    <span className="font-mono text-[11px] text-muted">{work.year}</span>
                    <span
                      className="text-base opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
