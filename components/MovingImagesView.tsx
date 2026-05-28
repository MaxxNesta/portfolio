"use client";

import { useEffect, useRef, useState } from "react";

type VideoWork = {
  id: string;
  title: string;
  tags: string;
  year: string;
  src: string;
};

const videos: VideoWork[] = [
  {
    id: "01",
    title: "Bloom",
    tags: "Fashion Film",
    year: "2025",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "02",
    title: "Dusk",
    tags: "Short Film",
    year: "2025",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "03",
    title: "Thread",
    tags: "Motion Study",
    year: "2024",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: "04",
    title: "Reverie",
    tags: "Art Direction",
    year: "2024",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
];

export default function MovingImagesView() {
  const [active, setActive] = useState<VideoWork | null>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

  const open = (v: VideoWork) => {
    setActive(v);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setActive(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Play modal video with sound once src is set
  useEffect(() => {
    if (active && modalRef.current) {
      modalRef.current.play().catch(() => {});
    }
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
        {videos.map((v) => (
          <div key={v.id} className="flex flex-col">
            <button
              onClick={() => open(v)}
              className="group relative w-full aspect-video overflow-hidden bg-ink cursor-none text-left"
            >
              {/* Muted autoplay preview */}
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/50 transition-colors duration-500" />

              {/* Play row */}
              <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-8">
                <span className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
                    <path d="M0 0L9 5.5L0 11V0Z" />
                  </svg>
                  Play
                </span>
                <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/50">
                  {v.tags}
                </span>
              </div>

              {/* Bottom ID */}
              <div className="absolute bottom-0 left-0 px-6 sm:px-8 pb-5">
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
                  {v.id}
                </p>
              </div>
            </button>

            {/* Label below */}
            <div className="pt-2 sm:pt-3">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink">{v.title}</p>
              <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">
                {v.tags} · {v.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={close}
        >
          {/* Stop propagation so clicking video itself doesn't close */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="relative w-full max-w-6xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalRef}
              src={active.src}
              controls
              playsInline
              className="w-full aspect-video bg-black"
            />

            {/* Title row */}
            <div className="flex items-center justify-between mt-4 px-1">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
                  {active.id} — {active.tags}
                </p>
                <p className="font-mono text-[13px] tracking-[0.1em] uppercase text-white mt-1">
                  {active.title}
                </p>
              </div>
              <button
                onClick={close}
                className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors duration-200 cursor-none"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
