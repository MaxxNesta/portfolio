"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FRAMES = 20;
const FRAME_MS = 55;

function scrambleWord(
  word: string,
  setter: (s: string) => void,
  delayMs: number,
  ids: { current: (ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>)[] }
) {
  const t = setTimeout(() => {
    let frame = 0;
    const id = setInterval(() => {
      setter(
        word
          .split("")
          .map((char, i) =>
            frame / FRAMES > i / word.length
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      frame++;
      if (frame > FRAMES) {
        clearInterval(id);
        setter(word);
      }
    }, FRAME_MS);
    ids.current.push(id);
  }, delayMs);
  ids.current.push(t);
}

export default function ProjectsView() {
  const router = useRouter();
  const [card2Visible, setCard2Visible] = useState(false);
  const [line1, setLine1] = useState("Moving");
  const [line2, setLine2] = useState("Images");
  const timerIds = useRef<(ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>)[]>([]);

  const triggerScramble = () => {
    scrambleWord("Moving", setLine1, 0, timerIds);
    scrambleWord("Images", setLine2, 180, timerIds);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) setCard2Visible(true);
      else if (e.deltaY < -20) setCard2Visible(false);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (delta > 30) setCard2Visible(true);
      else if (delta < -30) setCard2Visible(false);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Trigger scramble when card slides in
  useEffect(() => {
    if (card2Visible) triggerScramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card2Visible]);

  // Periodic scramble loop
  useEffect(() => {
    triggerScramble();
    const loop = setInterval(triggerScramble, 5000);
    timerIds.current.push(loop);
    return () => {
      timerIds.current.forEach((id) => clearTimeout(id as ReturnType<typeof setTimeout>));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-6rem)] overflow-hidden">

      {/* Card 1 — Images */}
      <button
        onClick={() => router.push("/projects/images")}
        className="absolute inset-0 w-full h-full flex flex-col justify-end px-8 sm:px-14 py-10 sm:py-14 bg-bg cursor-none text-left z-10"
      >
        {/* Ghost number */}
        <span
          className="absolute left-0 top-[-8%] font-mono leading-[0.85] text-ink/[0.13] select-none pointer-events-none"
          style={{ fontSize: "clamp(280px, 65dvh, 900px)" }}
          aria-hidden="true"
        >
          1
        </span>

        <div className="relative z-10">
          <p className="font-mono leading-[1.0] text-[clamp(36px,6vw,90px)] text-ink mb-3">
            Images
          </p>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-muted mb-6">
            Photography & Styling
          </p>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-muted/50">
            Click to enter &nbsp;·&nbsp; Scroll ↓ to reveal 02
          </p>
        </div>
      </button>

      {/* Card 2 — Moving Images, peeks from right, scroll triggers slide */}
      <button
        onClick={() => router.push("/projects/moving-images")}
        className={`absolute top-0 w-full h-full flex flex-col justify-end px-8 sm:px-14 py-10 sm:py-14 bg-ink cursor-none text-left z-20 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          card2Visible
            ? "left-16 sm:left-20"
            : "left-[calc(100%-4rem)] sm:left-[calc(100%-5rem)]"
        }`}
      >
        {/* Ghost number */}
        <span
          className="absolute left-0 top-[-8%] font-mono leading-[0.85] text-bg/[0.13] select-none pointer-events-none"
          style={{ fontSize: "clamp(280px, 65dvh, 900px)" }}
          aria-hidden="true"
        >
          2
        </span>

        <div className="relative z-10">
          <p className="font-mono leading-[1.0] text-[clamp(36px,6vw,90px)] text-bg mb-3">
            {line1}<br />{line2}
          </p>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-bg/40 mb-6">
            Video & Animation
          </p>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-bg/30">
            Click to enter
          </p>
        </div>
      </button>
    </div>
  );
}
