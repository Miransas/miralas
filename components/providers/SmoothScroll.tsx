"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15, // Yumuşaklık derecesi (0.05 - 0.15 arası idealdir)
        duration: 1.2, // Scroll süresi
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <>{children}</>
    </ReactLenis>
  );
}