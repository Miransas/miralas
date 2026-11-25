/** One observer and preference listener for all opt-in marketing reveals. */
const pending = new Map<Element, () => void>();
let observer: IntersectionObserver | undefined;
let preference: MediaQueryList | undefined;

function finish(element: Element) {
  const reveal = pending.get(element);
  pending.delete(element);
  observer?.unobserve(element);
  reveal?.();
}
function showVisible() {
  for (const element of pending.keys()) {
    if (element.getBoundingClientRect().top < window.innerHeight) finish(element);
  }
  disconnectIfIdle();
}
function onFocus(event: FocusEvent) {
  if (!(event.target instanceof Node)) return;
  for (const element of pending.keys()) {
    if (element.contains(event.target)) finish(element);
  }
  disconnectIfIdle();
}
function onPreference() {
  if (preference?.matches) for (const element of pending.keys()) finish(element);
  disconnectIfIdle();
}
function disconnectIfIdle() {
  if (pending.size) return;
  observer?.disconnect();
  observer = undefined;
  preference?.removeEventListener("change", onPreference);
  preference = undefined;
  document.removeEventListener("focusin", onFocus);
  window.removeEventListener("pageshow", showVisible);
  window.removeEventListener("hashchange", showVisible);
}

export function observeReveal(element: Element, reveal: () => void): () => void {
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        // Reveal tall sections as soon as they enter; never wait for an
        // unreachable fraction of their full height. Also recover skipped
        // content when a fast scroll jumps past an entire element.
        if ((entry.isIntersecting && (entry.intersectionRatio >= 0.12 || entry.boundingClientRect.height > window.innerHeight)) || entry.boundingClientRect.bottom <= 0) {
          finish(entry.target);
        }
      }
      disconnectIfIdle();
    }, { threshold: [0, 0.12] });
    preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", onPreference);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("pageshow", showVisible);
    window.addEventListener("hashchange", showVisible);
  }
  pending.set(element, reveal);
  observer.observe(element);
  return () => {
    pending.delete(element);
    observer?.unobserve(element);
    disconnectIfIdle();
  };
}
