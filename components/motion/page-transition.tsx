"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { animate, useReducedMotion } from "framer-motion";
import { TRANSITION_UI } from "@/lib/motion";

/** Incoming content only: no router interception, keys, exit waits or scroll writes. */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!ref.current || reduced) return;
    // Opacity preserves the containing block of sticky scenes and fixed dialogs.
    const animation = animate(ref.current, { opacity: [0.92, 1] }, TRANSITION_UI);
    return () => animation.stop();
  }, [pathname, reduced]);
  return <div ref={ref} data-page-transition>{children}</div>;
}
