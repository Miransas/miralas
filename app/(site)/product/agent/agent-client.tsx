"use client";

import { StaggerReveal, RevealHeading, RevealParagraph, SectionReveal } from "@/components/motion/primitives";
import { buttonVariants } from "@/components/ui/button";
import { ScrollReveal as Reveal } from "@/components/motion/reveal";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  GitBranch,
  Headset,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import RobotEyes from "@/components/shared/robot-eyes";

function CinematicVideo({
  src,
  poster,
  className = "",
  objectPosition = "center",
}: {
  src: string;
  poster: string;
  className?: string;
  objectPosition?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) { video.pause(); return; }

    if (!("IntersectionObserver" in window)) {
      video.play().catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, [reduce]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={!reduce}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition }}
    />
  );
}

const flow = [
  {
    number: "01",
    icon: PhoneCall,
    title: "A conversation starts",
    description:
      "A caller explains what they need in their own words, without navigating a rigid menu.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Intent is understood",
    description:
      "The agent is designed to identify the request and the context needed to respond.",
  },
  {
    number: "03",
    icon: Workflow,
    title: "A workflow is followed",
    description:
      "The conversation can be connected to clearly defined business rules and next steps.",
  },
  {
    number: "04",
    icon: Headset,
    title: "A person can take over",
    description:
      "When a request falls outside its boundaries, the intended experience is a clear human handoff.",
  },
];

const principles = [
  {
    number: "01",
    icon: GitBranch,
    title: "Defined workflows",
    description:
      "Shape the conversation around the steps your business actually wants to follow—not an open-ended promise that the agent can do everything.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Boundaries by design",
    description:
      "Keep the agent's responsibilities clear, with a path to stop, clarify or hand over when it should not continue alone.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "A natural conversation",
    description:
      "Build toward voice interactions that feel direct and useful, while keeping the business workflow understandable behind the scenes.",
  },
];

const scenarios = [
  {
    number: "01",
    title: "Inbound questions",
    description:
      "Help callers find approved information about services, availability or common requests.",
    image: "/img/mono.png",
    alt: "Minimal monochrome abstract voice-agent visual",
  },
  {
    number: "02",
    title: "Appointment requests",
    description:
      "Collect the details needed for a booking workflow, with confirmation rules defined by the business.",
    image: "/img/ocean.png",
    alt: "Abstract visual representing connected voice workflows",
  },
  {
    number: "03",
    title: "Call routing",
    description:
      "Understand where a caller needs to go and direct the conversation toward the right person or team.",
    image: "/img/aurora.png",
    alt: "Abstract visual representing a routed conversation",
  },
];

export default function VoiceAgentPage() {
  const reduce = useReducedMotion();

  return (
    <main className="overflow-hidden bg-surface-page text-text-heading transition-colors duration-500">
      {/* HERO */}
      <section className="relative isolate border-b border-black/[0.06] pb-16 pt-32 dark:border-white/[0.07] sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_76%_34%,rgba(255,255,255,0.82),transparent_43%)] dark:bg-[radial-gradient(ellipse_at_76%_34%,rgba(255,255,255,0.065),transparent_43%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-12">
          <div className="relative z-10 max-w-2xl">
            <Reveal trigger="load">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.045] dark:text-neutral-300">
                <span className="size-1.5 rounded-full bg-neutral-800 dark:bg-neutral-200" />
                Miransas · Voice Agent
                <span className="ml-1 rounded-full border border-black/10 px-2 py-0.5 text-[9px] tracking-[0.12em] text-text-muted dark:border-white/10 dark:text-neutral-400">
                  EARLY DEVELOPMENT
                </span>
              </div>
            </Reveal>

            <StaggerReveal trigger="load" delay={0.08}>
              <RevealHeading as="h1" className="mt-7 text-[clamp(3.1rem,6.8vw,6.35rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-text-heading">
                Conversations
                <span className="block text-text-muted">
                  that move work forward.
                </span>
              </RevealHeading>
            </StaggerReveal>

            <Reveal trigger="load" delay={0.16}>
              <RevealParagraph className="mt-7 max-w-xl text-base leading-8 text-text-primary sm:text-lg">
                Miransas is developing voice agents that can understand a
                caller&apos;s intent, follow defined workflows and bring a person
                into the conversation when needed. Not just a voice that answers—
                a clearer path from request to next step.
              </RevealParagraph>
            </Reveal>

            <Reveal trigger="load" delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/resources/changelog"
                  className={buttonVariants({ className: "group" })}
                >
                  Follow development
                  <ArrowUpRight className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#agent-workflow"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Explore the workflow
                  <ArrowDown className="size-4" />
                </a>
              </div>
            </Reveal>

            <Reveal trigger="load" delay={0.32}>
              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted dark:border-white/10 dark:text-neutral-500">
                <span>Listen</span>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span>Understand</span>
                <span className="text-neutral-300 dark:text-neutral-700">/</span>
                <span>Act or hand off</span>
              </div>
            </Reveal>
          </div>

          {/* RobotEyes — product identity, not a mascot illustration */}
          <Reveal trigger="load" delay={0.12} className="relative">
            <div className="relative mx-auto flex min-h-[440px] w-full max-w-[620px] items-center justify-center overflow-hidden rounded-4xl border border-black/10 bg-[#0A0A0B] shadow-[0_35px_100px_-45px_rgba(0,0,0,0.42)] dark:border-white/10 dark:shadow-[0_35px_110px_-45px_rgba(0,0,0,0.85)] sm:min-h-[520px] sm:rounded-4xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_43%,rgba(255,255,255,0.09),transparent_48%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <motion.div
                aria-hidden="true"
                animate={reduce ? { rotate: 0 } : { rotate: 360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                className="absolute h-[330px] w-[330px] rounded-full border border-white/[0.10] sm:h-[410px] sm:w-[410px]"
              >
                <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.5)]" />
                <span className="absolute bottom-[17%] right-[8%] size-1 rounded-full bg-white/50" />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute h-[270px] w-[270px] rounded-full border border-dashed border-white/[0.09] sm:h-[340px] sm:w-[340px]"
              />

              <div className="relative z-10 flex h-[250px] w-[min(78%,390px)] items-center justify-center sm:h-[300px]">
                <RobotEyes />
              </div>

              <div className="absolute inset-x-5 bottom-5 z-20 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    Voice agent · Visual identity
                  </p>
                  <RevealParagraph className="mt-1.5 text-base font-medium tracking-tight text-white/90 sm:text-lg">
                    Present when the conversation needs it.
                  </RevealParagraph>
                </div>
                <span className="shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[9px] font-medium tracking-[0.16em] text-white/60 backdrop-blur-md">
                  MIRANSAS / AGENT
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CINEMATIC FILM */}
      <SectionReveal className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                More than an answering voice
              </p>
              <RevealHeading className="mt-4 text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-text-heading sm:text-5xl">
                A conversation is only the beginning.
              </RevealHeading>
            </div>
            <RevealParagraph className="max-w-sm text-sm leading-7 text-text-primary">
              The goal is to connect natural voice interaction with the rules,
              information and decisions that keep a business moving.
            </RevealParagraph>
          </Reveal>

          <Reveal>
            <div className="relative isolate aspect-[16/9] min-h-[260px] overflow-hidden rounded-4xl border border-black/10 bg-[#090909] shadow-[0_35px_100px_-45px_rgba(0,0,0,0.36)] dark:border-white/10 dark:shadow-[0_35px_110px_-45px_rgba(0,0,0,0.82)] sm:aspect-[2.05/1] sm:rounded-4xl">
              <CinematicVideo
                src="/agent-hero.mp4"
                poster="/img/mono.png"
                className="opacity-90"
                objectPosition="center 48%"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-5 p-5 text-white sm:p-8 lg:p-10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    From intent to outcome
                  </p>
                  <p className="mt-2 max-w-xl text-xl font-medium tracking-tight sm:text-2xl lg:text-3xl">
                    Give every call a clearer next step.
                  </p>
                </div>
                <span className="rounded-full border border-white/20 bg-black/25 px-3.5 py-2 text-[10px] font-medium tracking-[0.16em] text-white/70 backdrop-blur-md">
                  CONCEPT FILM / MIRANSAS
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionReveal>

      {/* WORKFLOW */}
      <SectionReveal
        id="agent-workflow"
        className="border-y border-black/[0.06] bg-surface-card py-20 dark:border-white/[0.07] dark:bg-surface-card sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <StaggerReveal className="max-w-3xl">
            <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              How an agent should work
            </RevealParagraph>
            <RevealHeading className="mt-4 text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-text-heading sm:text-5xl">
              Listen carefully. Act deliberately.
            </RevealHeading>
            <RevealParagraph className="mt-5 max-w-2xl text-base leading-8 text-text-primary">
              A useful voice agent needs more than speech recognition and a
              generated reply. It needs a defined path through the conversation.
            </RevealParagraph>
          </StaggerReveal>

          <div className="mt-14 grid grid-cols-1 gap-0 border-y border-black/10 dark:border-white/10 md:grid-cols-2 lg:grid-cols-4">
            {flow.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.number} delay={index * 0.06}>
                  <article className="group h-full border-b border-black/10 py-7 md:border-r md:px-6 md:py-8 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 dark:border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.16em] text-text-muted">
                        {step.number}
                      </span>
                      <Icon className="size-5 text-text-muted transition-transform duration-(--motion-interaction-duration) group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-white" strokeWidth={1.5} />
                    </div>
                    <RevealHeading as="h3" className="mt-9 text-lg font-semibold tracking-tight text-text-heading">
                      {step.title}
                    </RevealHeading>
                    <RevealParagraph className="mt-3 max-w-xs text-sm leading-7 text-text-primary">
                      {step.description}
                    </RevealParagraph>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      {/* ILLUSTRATIVE SCENARIO */}
      <SectionReveal className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
          <StaggerReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300">
              <span className="size-1.5 rounded-full bg-neutral-700 dark:bg-neutral-300" />
              Illustrative conversation
            </div>
            <RevealHeading className="mt-6 text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-text-heading sm:text-5xl">
              Helpful when it can. Honest when it can&apos;t.
            </RevealHeading>
            <RevealParagraph className="mt-6 max-w-lg text-base leading-8 text-text-primary">
              The intended experience is not an agent that improvises its way
              through every request. It should use approved information, stay
              within its workflow and make it easy to bring in a person.
            </RevealParagraph>
            <RevealParagraph className="mt-5 text-xs leading-6 text-text-muted">
              Example flow for product direction only. Voice Agent is in early
              development and these interactions are not presented as live
              capabilities.
            </RevealParagraph>
          </StaggerReveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-surface-card p-5 dark:border-white/10 dark:bg-surface-card sm:rounded-4xl sm:p-8">
              <div className="flex items-center justify-between border-b border-black/10 pb-5 dark:border-white/10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Example call flow
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-heading">
                    Appointment request
                  </p>
                </div>
                <span className="rounded-full border border-black/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-text-muted dark:border-white/10 dark:text-neutral-400">
                  Concept
                </span>
              </div>

              <div className="space-y-5 py-6">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-neutral-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                    <PhoneCall className="size-4" />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 dark:bg-white/[0.06]">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      Caller
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-heading">
                      “I&apos;d like to book an appointment for tomorrow.”
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-end gap-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#151515] px-4 py-3 text-white dark:bg-[#F0F0F0] dark:text-[#111111]">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/80">
                      Agent · Intended response
                    </p>
                    <p className="mt-1 text-sm leading-6">
                      “Certainly. I can collect your preferred time and pass
                      the request through the booking workflow.”
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#111111] text-white dark:bg-white dark:text-black">
                    <AudioLines className="size-4" />
                  </span>
                </div>

                <div className="mx-4 flex items-center gap-3 border-l border-dashed border-neutral-300 py-1 pl-5 dark:border-neutral-700">
                  <GitBranch className="size-4 text-text-muted" />
                  <p className="text-xs leading-5 text-text-muted">
                    Workflow checks availability and applies business rules.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-neutral-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-neutral-300">
                    <Headset className="size-4" />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-black/10 bg-transparent px-4 py-3 dark:border-white/10">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      Human handoff
                    </p>
                    <p className="mt-1 text-sm leading-6 text-text-primary">
                      A person can review or complete the request when required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-4 text-[10px] text-text-muted dark:border-white/10 dark:text-neutral-500">
                <span>Illustrative product direction</span>
                <span className="font-mono tracking-[0.12em]">MIRANSAS / AGENT</span>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionReveal>

      {/* PRODUCT PRINCIPLES */}
      <SectionReveal className="border-y border-black/[0.06] bg-surface-card py-20 dark:border-white/[0.07] dark:bg-surface-card sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <StaggerReveal>
              <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                Built around the conversation
              </RevealParagraph>
              <RevealHeading className="mt-4 text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-text-heading sm:text-5xl">
                Useful by design. Bounded by design.
              </RevealHeading>
              <RevealParagraph className="mt-5 max-w-md text-sm leading-7 text-text-primary">
                A dependable agent should know what it is responsible for—and
                what should be handled by a person.
              </RevealParagraph>
            </StaggerReveal>

            <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
              {principles.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.number} delay={index * 0.06}>
                    <div className="grid gap-4 py-6 sm:grid-cols-[56px_1fr] sm:gap-6 sm:py-7">
                      <div className="flex items-center justify-between sm:block">
                        <span className="font-mono text-[11px] tracking-[0.16em] text-text-muted">
                          {item.number}
                        </span>
                        <Icon className="size-5 text-text-muted sm:mt-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <RevealHeading as="h3" className="text-lg font-semibold tracking-tight text-text-heading sm:text-xl">
                          {item.title}
                        </RevealHeading>
                        <RevealParagraph className="mt-2 max-w-2xl text-sm leading-7 text-text-primary">
                          {item.description}
                        </RevealParagraph>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* USE CASES — editorial rows with existing images, no bento */}
      <SectionReveal className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <StaggerReveal className="mb-12 max-w-3xl">
            <RevealParagraph className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
              Where voice agents may help
            </RevealParagraph>
            <RevealHeading className="mt-4 text-3xl font-semibold leading-[1.04] tracking-[-0.06em] text-text-heading sm:text-5xl">
              Built for real conversations.
            </RevealHeading>
            <RevealParagraph className="mt-5 max-w-xl text-base leading-8 text-text-primary">
              These are intended application areas—not a list of capabilities
              that are already available in the current release.
            </RevealParagraph>
          </StaggerReveal>

          <div className="space-y-5">
            {scenarios.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.05}>
                <article className="group grid overflow-hidden rounded-4xl border border-black/10 bg-surface-card dark:border-white/10 dark:bg-surface-card sm:grid-cols-[220px_1fr] sm:items-stretch lg:grid-cols-[280px_1fr]">
                  <div className="relative min-h-[190px] overflow-hidden bg-[#111111] sm:min-h-[210px]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-text-muted">
                        {item.number}
                      </span>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                        Intended use case
                      </span>
                    </div>
                    <RevealHeading as="h3" className="mt-5 text-xl font-semibold tracking-tight text-text-heading sm:text-2xl">
                      {item.title}
                    </RevealHeading>
                    <RevealParagraph className="mt-3 max-w-2xl text-sm leading-7 text-text-primary">
                      {item.description}
                    </RevealParagraph>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* FINAL CTA */}
      <SectionReveal className="px-6 pb-20 sm:pb-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#0A0A0B] px-6 py-14 text-white sm:rounded-4xl sm:px-12 sm:py-20 lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_50%,rgba(255,255,255,0.08),transparent_42%)]" />
            <div className="relative z-10 flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  The next layer of voice
                </p>
                <RevealHeading className="mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl">
                  Let&apos;s make conversations more useful.
                </RevealHeading>
                <RevealParagraph className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                  Voice Agent is taking shape. Follow the product&apos;s progress as
                  the workflows, safeguards and voice experience develop.
                </RevealParagraph>
              </div>
              <Link
                href="/resources/changelog"
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#111111] transition duration-(--motion-interaction-duration) hover:-translate-y-0.5 hover:bg-neutral-200"
              >
                Follow the progress
                <ArrowUpRight className="size-4 transition-transform duration-(--motion-interaction-duration) group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </SectionReveal>
    </main>
  );
}
