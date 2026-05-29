import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Info — Ju" };

export default function InfoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-16">
        <section className="px-6 sm:px-10 py-10 sm:py-12">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted pt-1">
              Info
            </div>
            <p className="font-serif font-light text-[clamp(20px,2.4vw,32px)] leading-[1.5] tracking-[-0.01em]">
              Based in Bangkok — styling and creating at the intersection of{" "}
              <em>fashion</em> and <em>art</em>. From curating editorial looks to
              crafting visual artworks, the work spans garments, texture, and
              personal expression.
            </p>
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
