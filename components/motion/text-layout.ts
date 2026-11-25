/** Batch font/width measurements across all opt-in line reveals. */
const subscribers = new Map<Element, { measure: () => void; width?: number }>();
const queued = new Set<() => void>();
let resize: ResizeObserver | undefined;
let preference: MediaQueryList | undefined;
let frame = 0;
function queue(measure: () => void) {
  queued.add(measure);
  if (!frame) frame = requestAnimationFrame(() => {
    frame = 0;
    const batch = [...queued];
    queued.clear();
    for (const callback of batch) callback();
  });
}
function measureAll() { for (const { measure } of subscribers.values()) queue(measure); }

export function observeTextLayout(element: Element, measure: () => void) {
  if (!resize) {
    resize = new ResizeObserver(entries => {
      for (const entry of entries) {
        const subscriber = subscribers.get(entry.target);
        if (subscriber && subscriber.width !== entry.contentRect.width) {
          subscriber.width = entry.contentRect.width;
          queue(subscriber.measure);
        }
      }
    });
    preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", measureAll);
    document.fonts.addEventListener("loadingdone", measureAll);
    void document.fonts.ready.then(measureAll);
  }
  subscribers.set(element, { measure });
  resize.observe(element);
  queue(measure);
  return () => {
    queued.delete(measure);
    subscribers.delete(element);
    resize?.unobserve(element);
    if (subscribers.size) return;
    resize?.disconnect();
    resize = undefined;
    cancelAnimationFrame(frame);
    frame = 0;
    preference?.removeEventListener("change", measureAll);
    document.fonts.removeEventListener("loadingdone", measureAll);
  };
}
