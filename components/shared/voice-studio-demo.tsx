"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function VoiceStudioDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect the visitor's motion preference: keep the poster visible.
    if (reduceMotion) {
      video.pause();
      return;
    }

    // Graceful fallback for browsers without IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
      void video.play().catch(() => undefined);
      return;
    }

    let isIntersecting = false;

    const syncPlayback = () => {
      if (isIntersecting && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = Boolean(entry?.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 h-full w-full overflow-hidden bg-[#000103]"
    >
      <video
        ref={videoRef}
        src="/hero.mp4"
        poster="/portraits/hero.png"
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Blend the video edges into the dark hero card. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#000103]/90 via-transparent via-[24%] to-[#000103]/90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#000103]/25 via-transparent to-[#000103]/25" />
    </div>
  );
}
