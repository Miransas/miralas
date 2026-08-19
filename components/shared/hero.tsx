import { ShaderAnimation } from "./shader-hero"

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <ShaderAnimation />

      {/* very subtle contrast */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex min-h-screen w-full items-end">
        <div className="w-full max-w-7xl px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-8 bg-white/30" />
              MIRALAS
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Intelligence,
              <br />
              <span className="text-white/35">in motion.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/45 sm:text-base">
              Voice, AI and modern infrastructure built into one simple
              platform.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
                Start building
              </button>

              <button className="text-sm text-white/50 transition hover:text-white">
                Explore →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* decorative edge info */}
      <div className="absolute bottom-8 right-8 z-10 hidden text-right text-[10px] uppercase tracking-[0.25em] text-white/25 md:block">
        <div>Creative systems</div>
        <div className="mt-1">2026 — MIRALAS</div>
      </div>
    </section>
  )
}