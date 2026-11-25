"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { animate, useReducedMotion } from "framer-motion";
import { TRANSITION_UI, DURATION_UI } from "@/lib/motion";

/** Incoming content only: no router interception, keys, exit waits or scroll writes. */
export function PageTransition({ children, duration = DURATION_UI, skipHash = false }: { children: ReactNode; duration?: number; skipHash?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.removeProperty("opacity");
    if (reduced || (skipHash && window.location.hash)) return;
    // Opacity preserves the containing block of sticky scenes and fixed dialogs.
    const animation = animate(ref.current, { opacity: [0.92, 1] }, { ...TRANSITION_UI, duration });
    return () => animation.stop();
  }, [pathname, reduced, duration, skipHash]);
  return <div ref={ref} data-page-transition>{children}</div>;
}
