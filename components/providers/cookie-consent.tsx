"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleAnalytics } from "@next/third-parties/google";
import { DURATION_UI, EASE_OUT_EXPO } from "@/lib/motion";

type Choice = "granted" | "denied";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function readChoice(): Choice | null {
  const m = document.cookie.match(/(?:^|; )consent=(granted|denied)/);
  return (m?.[1] as Choice | undefined) ?? null;
}

function clearGaCookies() {
  const host = location.hostname;
  const domains = [host, `.${host}`, ".miralas.io"];
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${d}`;
      }
    }
  }
}

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = readChoice();
    setChoice(c);
    setOpen(c === null);
    setReady(true);

    const reopen = () => setOpen(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  async function decide(next: Choice) {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice: next }),
    }).catch(() => {});

    if (next === "denied") clearGaCookies();
    setOpen(false);

    // Reload when consent is granted or revoked so proxy cookies and GA stay aligned.
    if (next === "granted" || choice === "granted") {
      window.location.reload();
      return;
    }
    setChoice(next);
  }

  if (!ready) return null;

  return (
    <>
      {choice === "granted" && GA_ID && <GoogleAnalytics gaId={GA_ID} />}

      <AnimatePresence>
        {open && (
          <motion.div
            key="cookie-consent-banner"
            role="dialog"
            aria-label="Cookie settings"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: DURATION_UI, ease: EASE_OUT_EXPO }}
            className="surface-shadow-lg fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-[24px] bg-surface-card p-5"
          >
            <p className="text-[15px] leading-[1.6] text-text-primary">
              We use optional cookies to measure which links bring visitors to
              Miralas. Nothing is stored unless you accept. Read our{" "}
              <a
                href="https://privacy.miransas.com"
                className="text-text-heading underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2"
              >
                privacy policy
              </a>
              .
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="h-10 flex-1 rounded-full bg-black/[0.06] text-sm font-medium text-text-primary transition-[background-color,color,transform] duration-200 hover:bg-black/[0.1] hover:text-text-heading active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2 dark:bg-white/[0.07] dark:hover:bg-white/[0.12]"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="h-10 flex-1 rounded-full bg-text-heading text-sm font-semibold text-surface-page transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2"
              >
                Accept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
