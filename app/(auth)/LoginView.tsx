"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Info } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";


import { track } from "@/lib/track";
import { ModeToggle } from "../../components/providers/mode-toggle";

const bars = [24, 48, 80, 120, 160, 120, 200, 140, 90, 60, 110, 70, 40, 28];

const footerLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Privacy", href: "/https://privacy.miransas.com/miralas/legal" },
  { label: "Terms", href: "/https://privacy.miransas.com/miralas/legal" },
  { label: "Miransas", href: "https://miransas.com" },
];

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40";

export function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const attempt = (eventName: string) => {
    track(eventName, "/login");
    setAttempted(true);
    setResetKey((k) => k + 1); // alanları temizle, değerleri hiç okuma
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#1a1240] to-[#2b1a4f] lg:block">
        <Link
          href="/"
          aria-label="Back to home"
          className="relative left-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div aria-hidden className="absolute inset-0 flex items-center justify-center gap-1.5">
         <img src="/login.png" alt="" />
        </div>
        <p className="absolute bottom-8 left-8 text-lg font-black tracking-tight text-white">
          Miransas 
        </p>
      </aside>

      <section className="flex min-h-screen flex-col px-6 py-8">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Don&rsquo;t have an account?{" "}
            <button
              type="button"
              onClick={() => attempt("signup_click")}
              className="font-medium text-foreground underline underline-offset-4"
            >
              Sign up
            </button>
          </p>

          <div
            role={attempted ? "alert" : "note"}
            className={`mt-6 flex gap-3 rounded-xl border px-4 py-3 text-sm ${
              attempted ? "border-foreground/40 bg-muted" : "border-border bg-muted/50"
            }`}
          >
            <Info className="mt-0.5 size-4 shrink-0" />
            <p className="text-muted-foreground">
              {attempted
                ? "Sign-in is not open yet. We are still building the console, and nothing you typed was saved."
                : "The Miralas console is in development. Sign-in opens soon."}
            </p>
          </div>

          <div
            key={resetKey}
            className="mt-6 space-y-5"
            onKeyDown={(e) => e.key === "Enter" && attempt("login_attempt")}
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              <input id="email" type="email" autoComplete="off" placeholder="you@example.com" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => attempt("login_attempt")}
              className="h-11 w-full rounded-xl bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Sign in
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => attempt("google_click")}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition-colors hover:bg-muted"
          >
            <SiGoogle className="size-4" />
            Continue with Google
          </button>
        </div>

        <footer className="mx-auto flex w-full max-w-sm items-center justify-between pt-8 text-xs text-muted-foreground">
          <nav className="flex gap-4">
            {footerLinks.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
          <ModeToggle />
        </footer>
      </section>
    </main>
  );
}