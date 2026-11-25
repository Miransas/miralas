"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealCard, RevealContainer, RevealEyebrow, RevealHeading, RevealParagraph, StaggerReveal } from "@/components/motion/primitives";

import { MODEL_LANGUAGES, VOICE_TECHNOLOGY } from "@/lib/voice-technology";

const wrap = "mx-auto max-w-7xl px-6 lg:px-12";
const eyebrow =
  "text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-text-primary";
const heading =
  "mt-5 text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem]";
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

export function VoiceTechnology() {
  const capabilities = [
    [
      "Multilingual text-to-speech",
      "Turn written content into speech with Chatterbox Multilingual, the active engine behind Miralas.",
    ],
    [
      `${MODEL_LANGUAGES.length} model-supported languages`,
      "Explore the engine’s language coverage, with Uzbek speech on a separate research path.",
    ],
    [
      "Rust-backed voice infrastructure",
      "A Rust API connects to a Python inference worker over gRPC, keeping application and model work separate.",
    ],
    [
      "An intentional audio pipeline",
      "A validated 24 kHz mono PCM16 output format gives the engineering work a clear audio foundation.",
    ],
  ];

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="scroll-mt-24 overflow-x-clip bg-surface-page transition-colors duration-(--motion-theme-duration) section-spacing text-text-heading"
    >
      <div className={wrap}>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <RevealContainer className="lg:sticky lg:top-28 lg:self-start">
            <RevealEyebrow className={eyebrow}>The voice foundation</RevealEyebrow>
            <RevealHeading id="technology-heading" className={heading}>
              Voice technology, built with intention.
            </RevealHeading>
            <RevealParagraph className="mt-6 max-w-lg text-[15px] leading-[1.6] text-text-muted sm:text-base">
              Good voice experiences begin with a clear foundation. We’re building on an open
              speech model and a focused infrastructure layer, while being open about what still
              needs validation.
            </RevealParagraph>
            <RevealCard  className="mt-8">
              <Link
                href="/product/models"
                className={buttonVariants({ variant: "secondary", className: "group" })}
              >
                <span>Meet the active engine</span>
                <ArrowRight
                  className="size-3.5 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </RevealCard>
          </RevealContainer>

          <StaggerReveal
            className="flex flex-col gap-3.5"
          >
            {capabilities.map(([title, description], index) => (
              <RevealCard
                key={title}
                className="group relative overflow-hidden rounded-4xl bg-surface-card p-6 transition-colors duration-(--motion-interaction-duration) hover:bg-surface-card-hover sm:p-7"
              >
                <div className="relative z-10">
                  <span className="font-mono text-xs leading-[1.45] tabular-nums text-text-muted sm:text-[13px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-text-muted sm:text-base">
                    {description}
                  </p>
                </div>
              </RevealCard>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}

export function EngineeredAudio() {
  return (
    <section
      aria-labelledby="audio-heading"
      className="overflow-x-clip bg-surface-page transition-colors duration-(--motion-theme-duration) section-spacing text-text-heading"
    >
      <div className={`${wrap} grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20`}>
        <RevealContainer>
          <RevealEyebrow className={eyebrow}>Engineered for real audio</RevealEyebrow>
          <RevealHeading id="audio-heading" className={heading}>
            Care in every part of the signal.
          </RevealHeading>
          <RevealParagraph className="mt-6 text-[15px] leading-[1.6] text-text-muted sm:text-base">
            From an API request to a waveform, each stage has a purpose. The current engineering
            baseline validates the output format and model assets. NVIDIA GPU benchmarks are still
            pending.
          </RevealParagraph>
          <RevealCard  className="mt-8">
            <Link
              href="/product/api"
              className={buttonVariants({ variant: "secondary", className: "group" })}
            >
              <span>Explore the API architecture</span>
              <ArrowRight
                className="size-3.5 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </RevealCard>
        </RevealContainer>

        {/* Neutral signal illustration */}
        <RevealCard
          standalone
          early
          className="bg-surface-card surface-shadow min-w-0 rounded-4xl p-7 sm:p-10"
        >
          <div aria-hidden="true" className="flex h-24 items-center gap-1 overflow-hidden">
            {Array.from({ length: 48 }, (_, index) => (
              <span
                key={index}
                className={`min-w-0 flex-1 rounded-full ${
                  index % 7 === 0
                    ? "bg-text-heading"
                    : "bg-text-heading/65 dark:bg-[#D1D1D1]/70"
                }`}
                style={{
                  // Fixed precision survives browser CSS serialization during hydration.
                  height: `${(12 + Math.abs(Math.sin(index * 0.47) * Math.cos(index * 0.17)) * 80).toFixed(3)}%`,
                }}
              />
            ))}
          </div>
          <p className="mt-4 text-xs leading-[1.45] text-text-muted sm:text-[13px]">
            Signal illustration
          </p>
          <dl className="mt-7 flex flex-col gap-2.5">
            {[
              ["Audio output", "24 kHz · Mono · PCM16"],
              ["Application / inference", "Rust + Python"],
              ["Service connection", "gRPC"],
              ["Model assets", "Approved multilingual checkpoint"],
            ].map(([term, value]) => (
              <div
                key={term}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-3.5 text-sm last:border-0"
              >
                <dt className="text-text-muted">{term}</dt>
                <dd className="font-medium tabular-nums text-text-heading">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs leading-[1.6] text-text-muted sm:text-[13px]">
            Output format is an engineering capability, not a latency or scalability benchmark.{" "}
            <a
              href={VOICE_TECHNOLOGY.audioSource}
              className={`text-text-primary underline underline-offset-4 transition-colors hover:text-text-heading ${focusRing}`}
            >
              Model sample-rate source
            </a>
            .
          </p>
        </RevealCard>
      </div>
    </section>
  );
}

export function WhatsNext() {
  const research = [
    [
      "Uzbek speech research",
      "Research, data collection and model evaluation toward native Uzbek speech. Production inference is not available.",
    ],
    [
      "An expanded voice catalog",
      "Voice Catalog infrastructure is implemented. Curated public voice releases are still ahead.",
    ],
    [
      "GPU inference validation",
      "Docker and CUDA benchmark preparation is complete. Real NVIDIA GPU measurements remain pending.",
    ],
    [
      "Future model exploration",
      "Qwen, CosyVoice and Miransas-native models are long-term research plans. They are not integrated into the current engine.",
    ],
  ];

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="scroll-mt-24 overflow-x-clip bg-surface-page transition-colors duration-(--motion-theme-duration) section-spacing text-text-heading"
    >
      <div className={wrap}>
        <RevealContainer className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <RevealEyebrow className={eyebrow}>What’s next</RevealEyebrow>
            <RevealHeading id="research-heading" className={heading}>
              A thoughtful path forward.
            </RevealHeading>
          </div>
          <RevealParagraph className="max-w-lg text-[15px] leading-[1.6] text-text-muted sm:text-base lg:justify-self-end">
            A roadmap shaped by research and evaluation. These are development directions, with no
            promised release dates.
          </RevealParagraph>
        </RevealContainer>

        <StaggerReveal
          className="mt-12 flex flex-col gap-3.5"
        >
          {research.map(([title, description], index) => (
            <RevealCard
              key={title}
              className="group relative grid gap-4 overflow-hidden rounded-4xl bg-surface-card p-7 transition-colors duration-(--motion-interaction-duration) hover:bg-surface-card-hover md:grid-cols-2 md:items-center md:gap-16 sm:p-8"
            >
              <div className="relative z-10 flex items-baseline gap-4">
                <span className="font-mono text-xs leading-[1.45] tabular-nums text-text-muted sm:text-[13px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-text-heading sm:text-2xl lg:text-[1.75rem]">
                  {title}
                </h3>
              </div>
              <p className="relative z-10 max-w-xl text-[15px] leading-[1.6] text-text-muted sm:text-base">
                {description}
              </p>
            </RevealCard>
          ))}
        </StaggerReveal>

        <RevealCard
          className="mt-10"
        >
          <Link
            href="/resources/changelog"
            className={buttonVariants({ className: "group" })}
          >
            <span>Read development updates</span>
            <ArrowRight
              className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </RevealCard>
      </div>
    </section>
  );
}
