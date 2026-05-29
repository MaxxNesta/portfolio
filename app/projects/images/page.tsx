import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artworks, type Artwork } from "@/lib/artworks";

export const metadata = { title: "Images — Projects — Ju" };

function aspectClass(work: Artwork) {
  if (work.aspect === "square")    return "aspect-square";
  if (work.aspect === "landscape") return "aspect-[3/2]";
  return "aspect-[2/3]";
}

function Card({ work }: { work: Artwork }) {
  return (
    <div className="flex flex-col">
      <Link
        href={`/works/${work.slug}`}
        data-cursor="media"
        className={`block relative overflow-hidden bg-ink cursor-none w-full ${aspectClass(work)}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.cover}
          alt={work.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="pt-2 sm:pt-3">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink">{work.name}</p>
        <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">{work.tags}</p>
      </div>
    </div>
  );
}

export default function ImagesPage() {
  const [a1, a2, a3, a4, a5] = artworks;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-16">
        <section className="px-6 sm:px-10 py-10 sm:py-16">

          <div className="flex items-center justify-between mb-16 sm:mb-24">
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted">Images</p>
            <Link
              href="/projects"
              className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted hover:text-ink transition-colors duration-200 cursor-none"
            >
              ← Back
            </Link>
          </div>

          {/* Row 1 — Photo 1 centred, big */}
          <div className="flex justify-center mb-20 sm:mb-28">
            <div className="w-[60%] sm:w-[42%] md:w-[34%]">
              <Card work={a1} />
            </div>
          </div>

          {/* Row 2 — Photo 2 landscape left, Photo 5 portrait right */}
          <div className="flex items-start gap-5 sm:gap-8 mb-20 sm:mb-28">
            <div className="flex-[3]">
              <Card work={a2} />
            </div>
            <div className="flex-[2]">
              <Card work={a5} />
            </div>
          </div>

          {/* Row 3 — Photo 3 square, left */}
          <div className="flex mb-20 sm:mb-28">
            <div className="w-[55%] sm:w-[46%]">
              <Card work={a3} />
            </div>
          </div>

          {/* Row 4 — Photo 4 landscape, right */}
          <div className="flex justify-end">
            <div className="w-[65%] sm:w-[55%]">
              <Card work={a4} />
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
