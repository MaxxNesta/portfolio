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
    src: "https://cdn.pixabay.com/video/2023/01/11/146130-788410151_large.mp4",
  },
  {
    id: "02",
    title: "Dusk",
    tags: "Short Film",
    year: "2025",
    src: "https://cdn.pixabay.com/video/2016/07/01/3681-173505067_large.mp4",
  },
  {
    id: "03",
    title: "Thread",
    tags: "Motion Study",
    year: "2024",
    src: "https://cdn.pixabay.com/video/2015/11/10/1307-145340154_medium.mp4",
  },
  {
    id: "04",
    title: "Reverie",
    tags: "Art Direction",
    year: "2024",
    src: "https://cdn.pixabay.com/video/2024/03/08/203449-921267347_large.mp4",
  },
];

// ─── Viewport autoplay hook ───────────────────────────────────────────────────

function useAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) videoRef.current.currentTime = 0.01;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else { video.pause(); video.currentTime = 0; }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return { videoRef, handleLoadedMetadata };
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ v, onOpen }: { v: VideoWork; onOpen: (v: VideoWork) => void }) {
  const { videoRef, handleLoadedMetadata } = useAutoplay();

  return (
    <button
      onClick={() => { videoRef.current?.pause(); onOpen(v); }}
      className="group relative w-full aspect-video overflow-hidden rounded-2xl bg-ink cursor-none text-left"
    >
      <video
        ref={videoRef}
        src={v.src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Scrim */}
      <div className="absolute inset-0 bg-ink/25 group-hover:bg-ink/40 transition-colors duration-500" />

      {/* Split text */}
      <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-12">
        <span className="flex items-center gap-3 font-mono text-[clamp(16px,2.4vw,38px)] text-white">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" aria-hidden="true">
            <path d="M0 0L12 8L0 16V0Z" />
          </svg>
          Watch
        </span>
        <span className="font-mono text-[clamp(16px,2.4vw,38px)] text-white">
          the film
        </span>
      </div>

      {/* Bottom tags */}
      <div className="absolute bottom-0 w-full text-center pb-5 sm:pb-7">
        <p className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
          {v.tags} · {v.year}
        </p>
      </div>
    </button>
  );
}

// ─── Alternating section ──────────────────────────────────────────────────────

function AlternatingSection({
  v,
  index,
  onOpen,
}: {
  v: VideoWork;
  index: number;
  onOpen: (v: VideoWork) => void;
}) {
  const { videoRef, handleLoadedMetadata } = useAutoplay();
  const { ref: revealRef, visible } = useScrollReveal();
  const videoLeft = index % 2 === 0;

  return (
    <div
      ref={revealRef}
      className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-14 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Video */}
      <button
        onClick={() => { videoRef.current?.pause(); onOpen(v); }}
        className={`group relative w-full sm:w-[58%] flex-none aspect-video overflow-hidden rounded-xl bg-ink cursor-none ${
          !videoLeft ? "sm:order-2" : ""
        }`}
      >
        <video
          ref={videoRef}
          src={v.src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/35 transition-colors duration-500" />
      </button>

      {/* Text */}
      <div className={`w-full sm:flex-1 flex flex-col justify-center ${!videoLeft ? "sm:order-1" : ""}`}>
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted mb-4">
          {v.id}
        </p>
        <p className="font-mono text-[clamp(28px,3.5vw,56px)] text-ink uppercase leading-[1.0] mb-5">
          {v.title}
        </p>
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-muted mb-8">
          {v.tags} · {v.year}
        </p>
        <button
          onClick={() => onOpen(v)}
          className="self-start font-mono text-[9px] tracking-[0.18em] uppercase text-ink border-b border-ink pb-0.5 cursor-none hover:text-muted hover:border-muted transition-colors duration-200"
        >
          Watch ↗
        </button>
      </div>
    </div>
  );
}

// ─── Main view ────────────────────────────────────────────────────────────────

export default function MovingImagesView() {
  const [active, setActive] = useState<VideoWork | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const open = (v: VideoWork) => {
    setActive(v);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modalVideoRef.current?.pause();
    setActive(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      {/* Featured first video */}
      <div className="flex justify-center items-center min-h-[calc(100dvh-12rem)] mb-20 sm:mb-28">
        <div className="w-full sm:w-[70%]">
          <FeaturedCard v={videos[0]} onOpen={open} />
        </div>
      </div>

      {/* Alternating video + text sections */}
      <div className="flex flex-col gap-20 sm:gap-28">
        {videos.slice(1).map((v, i) => (
          <AlternatingSection key={v.id} v={v} index={i} onOpen={open} />
        ))}
      </div>

      {/* Fullscreen modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="relative w-full max-w-5xl mx-4 sm:mx-10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={active.src}
              autoPlay
              controls
              playsInline
              className="w-full aspect-video bg-black rounded-xl"
            />
            <div className="flex items-center justify-between mt-4 px-1">
              <div>
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/40">
                  {active.id} — {active.tags} · {active.year}
                </p>
                <p className="font-mono text-[13px] tracking-[0.08em] uppercase text-white mt-1">
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
