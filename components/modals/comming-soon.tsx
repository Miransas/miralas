'use client';

import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';

export default function ComingSoonModal() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Add waitlist registration here (for example, through Supabase or an API)
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-surface-page backdrop-blur-2xl p-4 select-none">
      <div className="relative w-full max-w-lg overflow-hidden rounded-4xl bg-surface-card p-8 surface-shadow-lg backdrop-blur-2xl">

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Company brand (Miransas) */}
          <div className="mb-4 flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold tracking-wider text-text-primary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-text-heading" />
            MIRANSAS Ecosystem
          </div>

          {/* Product name and badge */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-heading">
            Miralas<span className="text-text-heading">.io</span>
          </h1>
          <p className="mt-1 text-xs font-mono text-text-primary tracking-wide uppercase font-medium">
            AI Voice Cloning & Next-Gen TTS Engine
          </p>

          {/* Waveform animation */}
          <div className="my-6 flex items-center justify-center gap-1.5 h-10 px-6 py-2 rounded-xl bg-surface-elevated border border-white/5">
            {[40, 75, 30, 90, 60, 100, 45, 80, 35, 65, 95, 50, 20].map((height, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-text-heading animate-pulse"
                style={{
                  height: `${height}%`,
                  animationDelay: `${(i % 5) * 0.15}s`,
                  animationDuration: '1.2s',
                }}
              />
            ))}
          </div>

          {/* Product description */}
          <p className="text-sm text-text-primary leading-relaxed max-w-sm">
            Realistic voice cloning and multilingual AI voice synthesis technology capable of operating in seconds is being prepared for launch.
          </p>

          {/* Featured feature tags */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-md bg-surface-elevated border border-border px-2.5 py-1 text-[11px] text-text-muted">
              ⚡ Instant Voice Clone
            </span>
            <span className="rounded-md bg-surface-elevated border border-border px-2.5 py-1 text-[11px] text-text-muted">
              🎙️ Studio-Quality TTS
            </span>
            <span className="rounded-md bg-surface-elevated border border-border px-2.5 py-1 text-[11px] text-text-muted">
              🌐 Multilingual Engine
            </span>
          </div>

          {/* Early access / waitlist form */}
          <div className="mt-6 w-full">
            {submitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-400 font-medium">
✓ Your spot in the early access queue has been secured. We’ll let you know on launch day!              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="E-posta adress."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl  bg-surface-elevated px-4 py-2.5 text-xs text-text-heading placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-3 transition"
                />
                <button
                  type="submit"
                  className={buttonVariants()}
                >
                  Get Early Access
                </button>
              </form>
            )}
          </div>

          {/* Alt Durum Bilgisi */}
          <div className="mt-6 flex items-center gap-2 text-[11px] text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Model training and infrastructure optimization are ongoing.
          </div>

        </div>
      </div>
    </div>
  );
}