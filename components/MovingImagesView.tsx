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

// ─── Shared hook: seek to first frame + mobile intersection autoplay ─────────

function useVideoCard(onOpen: (v: VideoWork) => void, v: VideoWork) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) videoRef.current.currentTime = 0.01;
  };
  const handleEnter = () => videoRef.current?.play().catch(() => {});
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const handleClick = () => {
    videoRef.current?.pause();
    onOpen(v);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else { video.pause(); video.currentTime = 0; }
      },
      { threshold: 0.6 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return { videoRef, handleLoadedMetadata, handleEnter, handleLeave, handleClick };
}

// ─── Featured card (first video) ─────────────────────────────────────────────

function FeaturedCard({ v, onOpen }: { v: VideoWork; onOpen: (v: VideoWork) => void }) {
  const { videoRef, handleLoadedMetadata, handleEnter, handleLeave, handleClick } =
    useVideoCard(onOpen, v);

  return (
    <button
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="group relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-ink cursor-none text-left"
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

      {/* Persistent scrim for text legibility */}
      <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/45 transition-colors duration-500" />

      {/* Split text overlay — always visible */}
      <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-12">
        <span className="flex items-center gap-3 font-mono text-[clamp(18px,2.8vw,44px)] text-white">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" aria-hidden="true">
            <path d="M0 0L14 9L0 18V0Z" />
          </svg>
          Watch
        </span>
        <span className="font-mono text-[clamp(18px,2.8vw,44px)] text-white">
          the film
        </span>
      </div>

      {/* Bottom featuring line */}
      <div className="absolute bottom-0 w-full text-center pb-5 sm:pb-7">
        <p className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
          {v.tags} · {v.year}
        </p>
      </div>
    </button>
  );
}

// ─── Grid card ───────────────────────────────────────────────────────────────

function VideoCard({ v, onOpen }: { v: VideoWork; onOpen: (v: VideoWork) => void }) {
  const { videoRef, handleLoadedMetadata, handleEnter, handleLeave, handleClick } =
    useVideoCard(onOpen, v);

  return (
    <div className="flex flex-col">
      <button
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className="group relative w-full aspect-video overflow-hidden bg-ink cursor-none text-left"
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
        <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-8">
          <span className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
              <path d="M0 0L9 5.5L0 11V0Z" />
            </svg>
            Play
          </span>
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {v.tags}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 px-6 sm:px-8 pb-5">
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">{v.id}</p>
        </div>
      </button>
      <div className="pt-2 sm:pt-3">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink">{v.title}</p>
        <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">
          {v.tags} · {v.year}
        </p>
      </div>
    </div>
  );
}

// ─── Main view ───────────────────────────────────────────────────────────────

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
      {/* Featured first video — min-height pushes grid below the fold */}
      <div className="flex justify-center items-center min-h-[calc(100dvh-12rem)] mb-8 sm:mb-16">
        <div className="w-full sm:w-[60%]">
          <FeaturedCard v={videos[0]} onOpen={open} />
        </div>
      </div>

      {/* Remaining grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
        {videos.slice(1).map((v) => (
          <VideoCard key={v.id} v={v} onOpen={open} />
        ))}
      </div>

      {/* ── Fullscreen modal ── */}
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
