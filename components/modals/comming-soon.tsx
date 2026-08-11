'use client';

import { useState } from 'react';

export default function ComingSoonModal() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Bekleme listesi kayıt işleminizi burada gerçekleştirebilirsiniz (örn. Supabase / API)
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 select-none">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/90 p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Arka Plan Glow Efektleri */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-purple-600/25 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* Üst Şirket Markası (Miransas) */}
          <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-neutral-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            MIRANSAS Ecosystem
          </div>

          {/* Ürün İsmi & Rozet */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Miralas<span className="text-indigo-400">.io</span>
          </h1>
          <p className="mt-1 text-xs font-mono text-purple-400 tracking-wide uppercase font-medium">
            AI Voice Cloning & Next-Gen TTS Engine
          </p>

          {/* Ses Dalgası (Waveform) Animasyonu */}
          <div className="my-6 flex items-center justify-center gap-1.5 h-10 px-6 py-2 rounded-xl bg-neutral-900/80 border border-white/5">
            {[40, 75, 30, 90, 60, 100, 45, 80, 35, 65, 95, 50, 20].map((height, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 animate-pulse"
                style={{
                  height: `${height}%`,
                  animationDelay: `${(i % 5) * 0.15}s`,
                  animationDuration: '1.2s',
                }}
              />
            ))}
          </div>

          {/* Ürün Açıklaması */}
          <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
            Realistic voice cloning and multilingual AI voice synthesis technology capable of operating in seconds is being prepared for launch.
          </p>

          {/* Öne Çıkan Özellik Etiketleri */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] text-neutral-400">
              ⚡ Instant Voice Clone
            </span>
            <span className="rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] text-neutral-400">
              🎙️ Studio-Quality TTS
            </span>
            <span className="rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[11px] text-neutral-400">
              🌐 Multilingual Engine
            </span>
          </div>

          {/* Erken Erişim / Waitlist Formu */}
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
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/90 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition active:scale-95"
                >
                  Get Early Access
                </button>
              </form>
            )}
          </div>

          {/* Alt Durum Bilgisi */}
          <div className="mt-6 flex items-center gap-2 text-[11px] text-neutral-500">
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