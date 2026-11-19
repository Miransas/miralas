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
            className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border border-border bg-background p-5 shadow-lg"
          >
            <p className="text-sm text-muted-foreground">
              We use optional cookies to measure which links bring visitors to
              Miralas. Nothing is stored unless you accept. Read our{" "}
              <a
                href="https://privacy.miransas.com"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
                privacy policy
              </a>
              .
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="h-10 flex-1 rounded-xl border border-border text-sm font-medium transition-[background-color,transform] duration-200 hover:bg-muted active:scale-[0.98]"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="h-10 flex-1 rounded-xl border border-border text-sm font-medium transition-[background-color,transform] duration-200 hover:bg-muted active:scale-[0.98]"
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
