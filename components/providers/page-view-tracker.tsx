"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!/(?:^|; )consent=granted/.test(document.cookie)) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: crypto.randomUUID(),
        eventName: "page_view",
        page: pathname,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}