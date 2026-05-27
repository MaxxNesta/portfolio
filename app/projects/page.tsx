import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artworks } from "@/lib/artworks";

export const metadata = { title: "Projects — Ju" };

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-20 sm:pt-24">
        <section className="px-6 sm:px-10 py-16 sm:py-20">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted mb-14">
            Selected works
          </p>

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
