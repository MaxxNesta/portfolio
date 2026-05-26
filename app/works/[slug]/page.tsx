import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/lib/artworks";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getArtwork(slug);
  return { title: work ? `${work.name} — Ju` : "Work — Ju" };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getArtwork(slug);
  if (!work) notFound();

  return (
    <main className="min-h-screen bg-bg text-ink">

      {/* ── Fixed header ──────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:px-10 py-6 sm:py-7 bg-bg border-b border-line">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-widest uppercase text-ink hover:opacity-60 transition-opacity duration-200 cursor-none"
        >
          Ju
        </Link>
        <Link
          href="/"
          className="font-mono text-[11px] tracking-wider text-muted hover:text-ink transition-colors duration-200 cursor-none"
        >
          ← Back
        </Link>
      </header>

      {/* ── Cover image ───────────────────────────────────────────── */}
      <div className="w-full pt-[57px] sm:pt-[61px]">
        <div className="w-full h-[70vh] sm:h-[78vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.cover}
            alt={work.name}
            className="w-full h-full object-cover"
            priority-hint="high"
          />
        </div>
      </div>

      {/* ── Info block ────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 sm:py-20 md:py-24 border-b border-line grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">
        {/* Left: meta */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
            {work.id}
          </p>
          <p className="font-mono text-[10px] tracking-wider uppercase text-muted leading-[1.8]">
            {work.tags}
          </p>
          <p className="font-mono text-[10px] tracking-widest text-muted mt-2">
            {work.year}
          </p>
        </div>

        {/* Right: title + description */}
        <div>
          <h1
            className="font-serif font-light italic text-ink leading-[0.92] tracking-[-0.02em] mb-8 sm:mb-10"
            style={{ fontSize: "clamp(52px, 9vw, 130px)" }}
          >
            {work.name}
          </h1>
          <p className="font-mono text-[11px] sm:text-[12px] leading-[1.9] text-muted max-w-lg">
            {work.description}
          </p>
        </div>
      </section>

      {/* ── Works grid ────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 py-16 sm:py-20 md:py-24">
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-10">
          Works — {work.images.length}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {work.images.map((src, i) => (
            <div key={i} className="overflow-hidden" style={{ aspectRatio: "2/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${work.name} — work ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="px-6 sm:px-10 py-8 border-t border-line flex flex-wrap justify-between items-center gap-4">
        <p className="font-mono text-[11px] text-muted">© 2025 Ju</p>
        <Link
          href="/"
          className="font-mono text-[11px] text-muted hover:text-ink transition-colors duration-200 cursor-none"
        >
          Back to portfolio →
        </Link>
      </footer>

    </main>
  );
}
