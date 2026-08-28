"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,          // Daha hızlı cevap, pinned scroll'da takılmaz
        duration: 1.0,       // Biraz daha kısa
        smoothWheel: true,
        wheelMultiplier: 1.0, // 0.92 yerine 1.0 — scroll hızını değiştirme!
        touchMultiplier: 1.8, // Mobilde daha canlı
        syncTouch: true,     // Touch scroll'u native gibi sync et
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}