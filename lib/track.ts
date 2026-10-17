import { sendGAEvent } from "@next/third-parties/google";

export function track(eventName: string, page = window.location.pathname) {
  try {
    if (!/(?:^|; )consent=granted/.test(document.cookie)) return;
    sendGAEvent("event", eventName, { page });
  } catch {}

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId: crypto.randomUUID(), eventName, page }),
    keepalive: true,
  }).catch(() => {});
}