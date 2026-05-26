"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const artworks = [
  {
    id: "01",
    name: "Bloom",
    tags: "Editorial styling & Lookbook",
    description:
      "A spring collection editorial exploring femininity through soft textures, botanical motifs, and fluid silhouettes shot in natural light.",
    cover:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea153895?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "02",
    name: "Dusk",
    tags: "Wardrobe curation & Fashion story",
    description:
      "An evening styling project capturing the transition from day to night through layered textures and deep, saturated tones.",
    cover:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1496747046887-0e4ff20b34b2?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "03",
    name: "Thread",
    tags: "Fashion illustration & Prints",
    description:
      "A series of hand-drawn fashion illustrations celebrating the art of tailoring, celebrating fabric craft and constructed silhouettes.",
    cover:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea153895?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "04",
    name: "Reverie",
    tags: "Mixed media artwork & Collage",
    description:
      "Experimental mixed-media collages blending vintage fashion photography with abstract painted marks and archival imagery.",
    cover:
      "https://images.unsplash.com/photo-1558769132-cb1aea153895?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1496747046887-0e4ff20b34b2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "05",
    name: "Petal",
    tags: "Art direction & Photography",
    description:
      "Art-directed photography series focusing on nature-inspired styling, organic colour palettes, and the relationship between body and flora.",
    cover:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea153895?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "06",
    name: "Veil",
    tags: "Textile & Pattern design",
    description:
      "A textile exploration through sheer fabrics, layered transparencies, and delicate surface treatments applied to garment and installation.",
    cover:
      "https://images.unsplash.com/photo-1496747046887-0e4ff20b34b2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea153895?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const track   = trackRef.current!;

      gsap.to(track, {
        x: () => -(track.scrollWidth - section.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - section.offsetWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center gap-3 sm:gap-4 h-full px-6 sm:px-10"
        style={{ width: "max-content" }}
      >
        {artworks.map((work) => (
          <div
            key={work.id}
            className="group relative flex-none w-[68vw] sm:w-[46vw] md:w-[30vw] lg:w-[26vw] h-[72vh] overflow-hidden cursor-none"
          >
            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work.cover}
              alt={work.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Default bottom label — fades on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-5 pb-5 pt-16 z-10 transition-opacity duration-400 group-hover:opacity-0">
              <p className="font-mono text-[10px] tracking-widest text-white/50 mb-1">{work.id}</p>
              <p className="font-mono text-[11px] tracking-wider uppercase text-white/80">{work.name}</p>
            </div>

            {/* Hover overlay — full detail */}
            <div className="absolute inset-0 bg-ink/90 px-5 sm:px-6 py-6 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
              {/* Header */}
              <div>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 mb-4 uppercase">
                  {work.id} — {work.tags}
                </p>
                <h3 className="font-serif font-light italic text-paper leading-[1.1] mb-5"
                  style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}>
                  {work.name}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] leading-[1.8] text-white/55 max-w-[95%]">
                  {work.description}
                </p>
              </div>

              {/* Sub-images — works within this artwork */}
              <div>
                <p className="font-mono text-[9px] tracking-widest text-white/30 uppercase mb-3">
                  Works
                </p>
                <div className="flex gap-2">
                  {work.images.map((src, i) => (
                    <div
                      key={i}
                      className="flex-1 overflow-hidden"
                      style={{ aspectRatio: "2/3" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
