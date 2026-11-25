"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LANDING_STORAGE_KEY = "miralas_landing_attribution";

function captureLandingContext(pathname: string) {
  try {
    const existing = sessionStorage.getItem(LANDING_STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing) as {
        pathname: string;
        search: string;
        referrer: string | null;
      };
    }
    const snapshot = {
      pathname,
      search: window.location.search || "",
      referrer: document.referrer || null,
    };
    sessionStorage.setItem(LANDING_STORAGE_KEY, JSON.stringify(snapshot));
    return snapshot;
  } catch {
    return {
      pathname,
      search: typeof window !== "undefined" ? window.location.search || "" : "",
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    };
  }
}

export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const landingContext = captureLandingContext(pathname);
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
        attribution: landingContext,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
