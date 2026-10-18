"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  AudioLines,
  Fingerprint,
  Sparkles,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";

import RobotEyes from "@/components/shared/robot-eyes";

const WAVEFORM = Array.from({ length: 36 }, (_, i) =>
  Math.round(18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 82),
);


type SignalCardProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  delay?: number;
  reducedMotion: boolean;
};

function SignalCard({
  icon,
  eyebrow,
  title,
  children,
  delay = 0,
  reducedMotion,
}: SignalCardProps) {
  return (
    <motion.div
      animate={reducedMotion ? { y: 0 } : { y: [0, -7, 0] }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 5, delay, repeat: Infinity, ease: "easeInOut" }
      }
      className="w-full max-w-[270px] rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-300/15 to-violet-400/15 text-cyan-100">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-sm font-medium tracking-tight text-white/90">
            {title}
          </h3>
        </div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </motion.div>
  );
}

export function RobotSection() {
  const shouldReduceMotion = !!useReducedMotion();

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#050505] text-white ring-1 ring-white/10 md:rounded-[2.5rem]">
          {/* Soft, layered light behind the robot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute left-1/2 top-[43%] size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.10] blur-[90px] md:size-[520px]" />
            <div className="absolute left-[17%] top-[55%] size-52 rounded-full bg-blue-500/[0.08] blur-[85px]" />
            <div className="absolute right-[12%] top-[36%] size-60 rounded-full bg-violet-500/[0.09] blur-[95px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,5,5,0.72)_100%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>

          <div className="relative z-10 px-5 pb-8 pt-12 sm:px-8 md:px-12 md:pb-10 md:pt-16">
            <header className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                <Sparkles className="size-3.5 text-cyan-200" />
                The voice layer
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl md:text-5xl">
                Give every word a voice.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                From natural speech to voice identity, build experiences that
                sound more human — with Uzbek at the heart of Miransas.
              </p>
            </header>

            {/* Equal side columns keep the robot on the true center line. */}
            <div className="mt-8 grid items-center gap-5 sm:mt-10 lg:min-h-[390px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,390px)_minmax(0,1fr)] lg:gap-6">
              <div className="flex justify-center lg:justify-end">
                <SignalCard
                  icon={<AudioLines className="size-5" />}
                  eyebrow="Text → speech"
                  title="Words, with a voice."
                  delay={0.2}
                  reducedMotion={shouldReduceMotion}
                >
                  <div className="flex h-8 items-center gap-[3px]" aria-label="Decorative audio waveform">
                    {WAVEFORM.map((height, index) => (
                      <motion.span
                        key={index}
                        className="w-[3px] flex-1 rounded-full bg-gradient-to-t from-cyan-400/70 via-sky-300 to-violet-300/90"
                        animate={
                          shouldReduceMotion
                            ? { height: `${height}%` }
                            : {
                                height: [
                                  `${Math.max(12, height * 0.45)}%`,
                                  `${height}%`,
                                  `${Math.max(12, height * 0.6)}%`,
                                ],
                              }
                        }
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                duration: 1.15 + (index % 5) * 0.12,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: index * 0.025,
                              }
                        }
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
                    <span>Natural expression</span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                      Audio preview
                    </span>
                  </div>
                </SignalCard>
              </div>

              <div className="relative order-first flex h-[260px] items-center justify-center sm:h-[320px] lg:order-none lg:h-[390px]">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] sm:h-[290px] sm:w-[290px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-200/15 sm:h-[245px] sm:w-[245px]"
                />
                <motion.div
                  aria-hidden="true"
                  animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                  className="absolute left-1/2 top-1/2 h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 sm:h-[310px] sm:w-[310px]"
                >
                  <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(165,243,252,0.9)]" />
                  <span className="absolute bottom-[16%] right-[8%] size-1.5 rounded-full bg-violet-200 shadow-[0_0_16px_rgba(221,214,254,0.9)]" />
                </motion.div>
                <div className="relative z-10 flex h-full w-full items-center justify-center [&>*]:max-w-full">
                  <RobotEyes />
                </div>
                <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0b0d10]/90 px-3.5 py-2 text-[10px] font-medium text-white/60 shadow-lg backdrop-blur-xl sm:bottom-1">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-cyan-300" />
                  </span>
                  A little intelligence, a lot of character
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <SignalCard
                  icon={<Fingerprint className="size-5" />}
                  eyebrow="Voice identity"
                  title="A voice that feels yours."
                  delay={0.85}
                  reducedMotion={shouldReduceMotion}
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/60">
                      Voice cloning
                    </span>
                    <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[10px] text-emerald-100/70">
                      Consent-first
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-white/35">
                    <Waves className="size-3.5" />
                    <span>Identity · tone · expression</span>
                  </div>
                </SignalCard>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.09] pt-6 sm:flex-row sm:pt-7">
              <p className="text-center text-xs leading-6 text-white/40 sm:text-left">
                Built with care. Still evolving, one voice at a time.
              </p>
              <Link
                href="/resources/changelog"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                Follow the progress
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
