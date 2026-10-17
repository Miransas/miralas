import Link from "next/link";

import RobotEyes from "@/components/shared/robot-eyes";

export function RobotSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#050505] ring-1 ring-white/10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(114,184,255,0.18),transparent)]"
          />

          <div className="relative grid items-center gap-10 p-8 md:p-14 lg:grid-cols-2">
            <div className="space-y-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Miralas Voice
              </p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Say it in your own language.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-white/70">
                Miralas is a voice platform for text-to-speech, voice cloning
                and speech-to-speech, built with Uzbek as a first-class
                language. We are still in development and share our progress in
                the changelog.
              </p>
              <Link
                href="/resources/changelog"
                className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105"
              >
                Read the changelog
              </Link>
            </div>

            <div>
              <RobotEyes />
              <p className="mt-2 hidden text-center text-xs text-white/40 [@media(hover:hover)]:block">
                Move your cursor. It is watching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}