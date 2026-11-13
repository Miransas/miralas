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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 h-full w-full overflow-hidden bg-[#060608]"
    >
      <video
        ref={videoRef}
        src="/hero.mp4"
        poster="/miralas-story-poster.jpg"   
        loop
     
        playsInline
        preload="metadata"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Blend the video edges into the dark hero card. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060608]/90 via-transparent via-[24%] to-[#060608]/90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060608]/20 via-transparent to-[#060608]/20" />
    </div>
  );
}