import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact — Ju" };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-ink pt-14 sm:pt-16">
        <section className="px-6 sm:px-10 py-10 sm:py-12 md:py-16 border-t border-line">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted mb-8">
            Get in touch
          </p>

          <h2 className="font-serif font-light text-[clamp(48px,8vw,130px)] leading-[0.93] tracking-[-0.02em] mb-10">
            Ju
          </h2>

          <a
            href="mailto:kaunghtet2782001@gmail.com"
            className="group relative inline-flex items-center gap-2 font-mono text-[13px] tracking-wider text-ink"
            aria-label="Send an email"
          >
            <span className="opacity-50">[</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300 ease-out inline-block">
              →
            </span>
            <span>Get in touch</span>
            <span className="opacity-50">]</span>
            <span className="absolute -bottom-0.5 left-[18px] w-0 h-px bg-ink group-hover:w-[calc(100%-36px)] transition-all duration-[400ms] ease-out" />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
