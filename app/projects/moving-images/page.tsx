import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Moving Images — Projects — Ju" };

export default function MovingImagesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-24">
        <section className="px-6 sm:px-10 py-10 sm:py-12">

          <div className="flex items-center justify-between mb-12">
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted">02 — Moving Images</p>
            <Link
              href="/projects"
              className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted hover:text-ink transition-colors duration-200 cursor-none"
            >
              ← Back
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center h-[50dvh] border border-line gap-5">
            <p className="font-serif font-light italic text-[clamp(28px,5vw,64px)] text-muted leading-tight text-center">
              Coming soon
            </p>
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted/50">
              Videos & animations
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
