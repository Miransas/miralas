"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function IsometricVoiceIntegration() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[5/4] flex items-center justify-center select-none">
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        <defs>
          {/* Taban Cam Platform Gradyanı */}
          <linearGradient id="glassBase" x1="90" y1="180" x2="410" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="glassStroke" x1="90" y1="180" x2="410" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.2" />
          </linearGradient>

          {/* Siyah AI İşlemci Küpü Gradyanları */}
          <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Parlama Işığı (Glow) Filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ════ 1. TABAN ZEMİN PLATFORMU (GLASS ISO PLATFORM) ════ */}
        <g id="BasePlatform">
          {/* Alt Gölge */}
          <path
            d="M 250 200 L 410 280 L 250 360 L 90 280 Z"
            fill="#000000"
            fillOpacity="0.08"
            className="dark:fill-opacity-30"
          />

          {/* Cam Yüzey */}
          <path
            d="M 250 180 L 410 260 L 250 340 L 90 260 Z"
            fill="url(#glassBase)"
            stroke="url(#glassStroke)"
            strokeWidth="1.5"
            rx="12"
          />

          {/* İzometrik Izgara Çizgileri (Grid) */}
          <path d="M 170 220 L 330 300" stroke="#3B82F6" strokeOpacity="0.2" strokeDasharray="3 3" />
          <path d="M 330 220 L 170 300" stroke="#3B82F6" strokeOpacity="0.2" strokeDasharray="3 3" />
          <path d="M 210 200 L 370 280" stroke="#3B82F6" strokeOpacity="0.15" strokeDasharray="3 3" />
          <path d="M 290 200 L 130 280" stroke="#3B82F6" strokeOpacity="0.15" strokeDasharray="3 3" />

          {/* Tabandaki Bağlantı Noktaları (Anchors) */}
          <ellipse cx="170" cy="245" rx="14" ry="7" fill="#3B82F6" fillOpacity="0.15" />
          <ellipse cx="330" cy="245" rx="14" ry="7" fill="#8B5CF6" fillOpacity="0.15" />
          <ellipse cx="250" cy="285" rx="18" ry="9" fill="#06B6D4" fillOpacity="0.2" />
        </g>

        {/* ════ 2. DİK MIZRAK / İZDÜŞÜM ÇİZGİLERİ (DASHED PROJECTION LINES) ════ */}
        <g id="ProjectionLines" strokeDasharray="3 3" strokeWidth="1.5">
          {/* Sol Kart İzdüşümü */}
          <line x1="170" y1="245" x2="170" y2="185" stroke="#60A5FA" strokeOpacity="0.6" />
          {/* Sağ Kart İzdüşümü */}
          <line x1="330" y1="245" x2="330" y2="185" stroke="#C084FC" strokeOpacity="0.6" />
          {/* Orta AI Küpü İzdüşümü */}
          <line x1="250" y1="285" x2="250" y2="215" stroke="#22D3EE" strokeOpacity="0.8" />
        </g>

        {/* ════ 3. YÜZEN SOL KART (SES / AUDIO WAV İKONU) ════ */}
        <motion.g
          id="LeftFloatingCard"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Izometrik Kart Yüzeyi */}
          <path
            d="M 170 155 L 205 172.5 L 170 190 L 135 172.5 Z"
            fill="#FFFFFF"
            className="dark:fill-zinc-900"
            stroke="#93C5FD"
            strokeWidth="1.2"
          />
          {/* Kart Kalınlığı (Yan Yüzeyler) */}
          <path d="M 135 172.5 L 135 178 L 170 195.5 L 170 190 Z" fill="#E2E8F0" className="dark:fill-zinc-800" />
          <path d="M 170 190 L 170 195.5 L 205 178 L 205 172.5 Z" fill="#CBD5E1" className="dark:fill-zinc-700" />

          {/* Ses Dalgası İkonu (Waveform Graphics) */}
          <path d="M 155 170 L 155 175" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
          <path d="M 162 166 L 162 178" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 170 163 L 170 181" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 178 167 L 178 177" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 185 171 L 185 174" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* ════ 4. YÜZEN SAĞ KART (API / ENTEGRASYON İKONU) ════ */}
        <motion.g
          id="RightFloatingCard"
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 330 155 L 365 172.5 L 330 190 L 295 172.5 Z"
            fill="#FFFFFF"
            className="dark:fill-zinc-900"
            stroke="#C084FC"
            strokeWidth="1.2"
          />
          <path d="M 295 172.5 L 295 178 L 330 195.5 L 330 190 Z" fill="#E2E8F0" className="dark:fill-zinc-800" />
          <path d="M 330 190 L 330 195.5 L 365 178 L 365 172.5 Z" fill="#CBD5E1" className="dark:fill-zinc-700" />

          {/* Bağlantı / Node İkonu */}
          <circle cx="320" cy="172" r="3" fill="#8B5CF6" />
          <circle cx="340" cy="172" r="3" fill="#A855F7" />
          <circle cx="330" cy="165" r="3" fill="#D946EF" />
          <path d="M 320 172 L 330 165 L 340 172" stroke="#C084FC" strokeWidth="1.2" strokeLinecap="round" />
        </motion.g>

        {/* ════ 5. MERKEZDEKİ ANTRASİT MIRANSAS AI KÜPÜ (PROCESSING CORE) ════ */}
        <motion.g
          id="CenterAICube"
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Küp Sol Yüz */}
          <path d="M 215 190 L 250 207.5 L 250 245 L 215 227.5 Z" fill="url(#cubeLeft)" />
          {/* Küp Sağ Yüz */}
          <path d="M 250 207.5 L 285 190 L 285 227.5 L 250 245 Z" fill="url(#cubeRight)" />
          {/* Küp Üst Yüz */}
          <path d="M 250 172.5 L 285 190 L 250 207.5 L 215 190 Z" fill="url(#cubeTop)" stroke="#38BDF8" strokeWidth="0.8" />

          {/* Küp Üzerinde Parlayan Neón Kenar Çizgileri */}
          <path d="M 250 207.5 L 250 245" stroke="#00F0FF" strokeWidth="1.5" filter="url(#neonGlow)" />
          <path d="M 215 190 L 250 207.5 L 285 190" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.8" />

          {/* Üstteki Parlayan Miransas AI Logosu / Küresi */}
          <circle cx="250" cy="190" r="6" fill="#00F0FF" filter="url(#neonGlow)" />
          <circle cx="250" cy="190" r="2.5" fill="#FFFFFF" />
        </motion.g>

        {/* ════ 6.IŞILTILAR VE DETAY NİŞANLARI (SPARKLES) ════ */}
        {/* Sol Işıltı */}
        <path d="M 145 140 L 147 145 L 152 147 L 147 149 L 145 154 L 143 149 L 138 147 L 143 145 Z" fill="#60A5FA" />
        {/* Sağ Işıltı */}
        <path d="M 350 135 L 351.5 139 L 355.5 140.5 L 351.5 142 L 350 146 L 348.5 142 L 344.5 140.5 L 348.5 139 Z" fill="#C084FC" />
      </svg>
    </div>
  );
}