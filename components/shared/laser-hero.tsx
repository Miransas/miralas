"use client"
import React, { useRef } from 'react'
import LaserFlow from '../LaserFlow'
import VoiceStudioDemo from './voice-studio-demo'


const LaserHero = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    // "dark" sınıfı + colorScheme: bu bloğun içi her zaman dark kalır
    <section
      className="dark relative w-full overflow-hidden bg-[#060608] text-white"
      style={{ height: '1000px', colorScheme: 'dark' }}
    >
      <LaserFlow
        surfaceRef={cardRef}
        beamPosition={0.6}
        color="#f97316"
        intensity={1.8}
        flare={1.5}
        spread={1.5}
        spill={1.35}
        fog={1.45}
        dust={1.6}
        beamWidth={1.4}
        streaks={1.1}
        dots={1}
        pulse={1.5}
        speed={2.4}
        seed={17}
        mouseInteraction
        intro
      />

      {/* Hero metni (Huly tarzı: sol üst) */}
      <div className="pointer-events-none absolute left-[8%] top-[14%] z-10 max-w-[680px]">
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-transparent md:text-7xl bg-gradient-to-b from-white to-orange-100/70 bg-clip-text">
          Every voice.
          <br />
          One studio.
        </h1>

        <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-white/70 md:text-xl">
          Miralas turns text into natural Uzbek speech. Compose, direct and ship
          voices to your streams, bots and apps.
        </p>

        <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/studio"
            className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-wide text-[#4a1d05] transition hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(90deg, #d9d9dc 0%, #ececee 55%, #fff1dd 100%)',
              boxShadow: '0 0 38px rgba(249,115,22,0.55), inset 0 0 0 1px rgba(255,255,255,0.35)',
            }}
          >
            Open Studio <span className="text-lg leading-none">→</span>
          </a>

          <a
            href="#demo"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Listen to a sample
          </a>
        </div>
      </div>

      {/* Card: tek ref, içinde canlı UI */}
      <div
        ref={cardRef}
        className="border border-white/5"
        style={{
          position: 'absolute',
          left: '18%',
          right: '28%',
          top: '52%',
          bottom: '-24px',
          borderRadius: '14px',
          background: '#0b0b0d',
          overflow: 'hidden',
        }}
      >,    <VoiceStudioDemo />

        {/* <VoiceStudioDemo /> */}
      </div>
    </section>
  )
}

export default LaserHero