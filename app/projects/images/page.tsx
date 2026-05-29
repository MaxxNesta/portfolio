import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artworks } from "@/lib/artworks";

export const metadata = { title: "Images — Projects — Ju" };

export default function ImagesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-16">
        <section className="px-6 sm:px-10 py-10 sm:py-12">

          <div className="flex items-center justify-between mb-12">
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted">Images</p>
            <Link
              href="/projects"
              className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted hover:text-ink transition-colors duration-200 cursor-none"
            >
              ← Back
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 sm:gap-7">
            {artworks.map((work) => (
              <div key={work.id} className="flex flex-col">
                <Link
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
                  <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <div className="pt-2 sm:pt-3">
                  <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink">{work.name}</p>
                  <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">{work.tags}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
