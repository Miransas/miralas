"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,          // Faster response; avoids sticking during pinned scroll
        duration: 1.0,       // Slightly shorter
        smoothWheel: true,
        wheelMultiplier: 1.0, // Keep scroll speed at 1.0 instead of 0.92
        touchMultiplier: 1.8, // More responsive on mobile
        syncTouch: true,     // Touch scroll'u native gibi sync et
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}