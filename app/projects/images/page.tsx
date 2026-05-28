import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artworks } from "@/lib/artworks";

export const metadata = { title: "Images — Projects — Ju" };

export default function ImagesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-24">
        <section className="px-6 sm:px-10 py-10 sm:py-12">

          <div className="flex items-center justify-between mb-12">
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted">01 — Images</p>
            <Link
              href="/projects"
              className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted hover:text-ink transition-colors duration-200 cursor-none"
            >
              ← Back
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 sm:gap-7">
            {artworks.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.slug}`}
                className="group relative overflow-hidden bg-ink cursor-none"
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
        </section>
      </main>
      <Footer />
    </>
  );
}
