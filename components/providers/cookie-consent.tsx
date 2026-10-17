"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

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

    // Onay verilince ya da geri alınınca yeniden yükle: proxy çerezleri
    // geçerli URL'deki UTM ile yazar, GA de yüklenir ya da kalkar.
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

      {open && (
        <div
          role="dialog"
          aria-label="Cookie settings"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-2xl border border-border bg-background p-5 shadow-lg"
        >
          <p className="text-sm text-muted-foreground">
            We use optional cookies to measure which links bring visitors to
            Miralas. Nothing is stored unless you accept. Read our{" "}
            <a
              href="https://privacy.miransas.com"
              className="underline underline-offset-4 hover:text-foreground"
            >
              privacy policy
            </a>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="h-10 flex-1 rounded-xl border border-border text-sm font-medium transition-colors hover:bg-muted"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="h-10 flex-1 rounded-xl border border-border text-sm font-medium transition-colors hover:bg-muted"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}