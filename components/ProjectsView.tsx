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
            char === " "
              ? " "
              : frame / FRAMES > i / word.length
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
  const [movingText, setMovingText] = useState("MOVING IMAGES");
  const timerIds = useRef<(ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>)[]>([]);

  const triggerScramble = () => {
    scrambleWord("MOVING IMAGES", setMovingText, 0, timerIds);
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

  useEffect(() => {
    if (card2Visible) triggerScramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card2Visible]);

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
    <div className="relative w-full h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] overflow-hidden">

      {/* Card 1 — Images */}
      <button
        onClick={() => router.push("/projects/images")}
        className="absolute inset-0 w-full h-full bg-bg cursor-none z-10"
      >
        <div className="absolute bottom-10 sm:bottom-14 left-8 sm:left-14 flex flex-col">
          {/* Vertical IMAGES — flex-col-reverse stacks I at bottom, S at top, chars upright */}
          <div className="flex flex-col-reverse leading-none">
            {"IMAGES".split("").map((char, i) => (
              <span
                key={i}
                className="font-mono text-[clamp(36px,6vw,90px)] text-ink leading-[1.05] block"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Card 2 — Moving Images */}
      <button
        onClick={() => router.push("/projects/moving-images")}
        className={`absolute top-0 w-full h-full flex flex-col justify-end px-8 sm:px-14 py-10 sm:py-14 cursor-none text-left z-20 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          card2Visible
            ? "left-16 sm:left-20 bg-[#E8E4DC]"
            : "left-[calc(100%-4rem)] sm:left-[calc(100%-5rem)] bg-[#E8E4DC]"
        }`}
      >
        <div className="relative z-10">
          <p className="font-mono leading-[1.0] text-ink mb-3 uppercase whitespace-nowrap" style={{ fontSize: "clamp(24px, 11vw, 200px)" }}>
            {movingText}
          </p>
        </div>
      </button>
    </div>
  );
}
