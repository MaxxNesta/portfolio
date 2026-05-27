import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Info — Ju" };

const skills = [
  {
    title: "Styling",
    items: ["Editorial styling", "Personal styling", "Wardrobe curation", "Fashion direction", "Color theory"],
  },
  {
    title: "Artworks",
    items: ["Fashion illustration", "Collage", "Mixed media", "Print design", "Art direction"],
  },
  {
    title: "Tools",
    items: ["Adobe Illustrator", "Procreate", "Lightroom", "Canva", "Physical media"],
  },
];

export default function InfoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-28 sm:pt-32">
        <section className="px-6 sm:px-10 pt-20 sm:pt-28 pb-16 sm:pb-20">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start mb-16">
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

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-line">
            {skills.map((col, i) => (
              <div
                key={col.title}
                className={`py-8 ${i > 0 ? "md:pl-8 md:border-l border-line" : ""}`}
              >
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mb-5">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <li key={item} className="font-mono text-[12px] text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
