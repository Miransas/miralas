"use client";

import { RevealEyebrow, RevealHeading, RevealParagraph, StaggerReveal, RevealCard } from "@/components/motion/primitives";
import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Video assets                                                               */
/* Keep these files inside /public.                                           */
/* -------------------------------------------------------------------------- */
const VIDEO_1 = "/stack-card-1.mp4";
const VIDEO_2 = "/stack-card-2.mp4";
const VIDEO_3 = "/stack-card-3.mp4";

const workflowItems = [
  { title: "Reference prepared", sub: "Voice profile · Step 01", time: "00:02" },
  { title: "Speech generated", sub: "Sample output · Step 02", time: "00:05" },
  { title: "Audio reviewed", sub: "Quality check · Step 03", time: "00:08" },
  { title: "Export prepared", sub: "WAV / MP3 · Step 04", time: "00:11" },
];

const INITIAL_MINUTES = 120;
const INITIAL_RATE = 6;
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2";

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                   */
/* -------------------------------------------------------------------------- */
const VideoBackground = memo(function VideoBackground({
  src,
  reduceMotion,
}: {
  src: string;
  reduceMotion: boolean | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause background video decoding whenever scrolled off-screen or tab is hidden.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      void video.play().catch(() => undefined);
      return;
    }

    let isIntersecting = false;
    const syncPlayback = () => {
      if (isIntersecting && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = Boolean(entry?.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <>
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 dark:opacity-35"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
});

function CardOverlay({ variant = "standard" }: { variant?: "standard" | "soft" }) {
  return (
    <div
      aria-hidden="true"
      className={
        variant === "soft"
          ? "pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/94 via-[#FFFFFF]/82 to-[#FFFFFF]/55 dark:from-surface-card/94 dark:via-surface-card/78 dark:to-surface-card/42"
          : "pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/96 via-[#FFFFFF]/86 to-[#FFFFFF]/58 dark:from-surface-card/96 dark:via-surface-card/82 dark:to-surface-card/44"
      }
    />
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <RevealEyebrow as="span"
      className="inline-flex w-fit items-center rounded-full bg-surface-page px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-text-primary dark:bg-white/[0.06] sm:text-[13px] md:px-5 md:py-2"
    >
      {children}
    </RevealEyebrow>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <RevealHeading
      className="mt-4 text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-text-heading sm:text-5xl lg:text-[3.5rem] md:mt-6"
    >
      {children}
    </RevealHeading>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <RevealParagraph
      className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-text-muted sm:text-base md:mt-5"
    >
      {children}
    </RevealParagraph>
  );
}

/* -------------------------------------------------------------------------- */
/* Card 1 — voice workflow preview (pure CSS marquee, paused off-screen)      */
/* -------------------------------------------------------------------------- */
function WorkflowMarquee({ reduceMotion }: { reduceMotion: boolean | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.05 });

  const renderItems = (copy: string) =>
    workflowItems.map((item) => (
      <li
        key={`${copy}-${item.title}`}
        className="flex items-center gap-3 rounded-2xl bg-surface-page/90 px-4 py-3.5 dark:bg-[#050505]/90 md:gap-4 md:px-5 md:py-4"
      >
        <span className="size-2 shrink-0 rounded-full bg-text-heading" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-text-heading sm:text-base">
            {item.title}
          </span>
          <span className="mt-0.5 block truncate text-xs leading-[1.45] text-text-muted sm:text-[13px]">
            {item.sub}
          </span>
        </span>
        <span className="shrink-0 font-mono text-xs leading-[1.45] tabular-nums text-text-muted sm:text-[13px]">
          {item.time}
        </span>
      </li>
    ));

  const paused = Boolean(reduceMotion) || !isInView;

  return (
    <div
      ref={containerRef}
      className="relative h-[230px] overflow-hidden md:h-[340px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        contain: "layout paint",
      }}
    >
      <div
        className="workflow-marquee-track"
        style={{
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <ul className="flex flex-col gap-3 pb-3">{renderItems("first")}</ul>
        <ul aria-hidden="true" className="flex flex-col gap-3 pb-3">
          {renderItems("second")}
        </ul>
      </div>
    </div>
  );
}

function CardOne({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <VideoBackground src={VIDEO_1} reduceMotion={reduceMotion} />
      <CardOverlay />

      <div className="relative z-10 grid h-full grid-cols-1 content-center gap-6 overflow-hidden p-5 sm:p-7 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-12 md:p-11 lg:p-14">
        <StaggerReveal
          className="flex flex-col justify-center"
        >
          <Pill>Voice generation · Workflow</Pill>
          <Heading>Turn written language into natural voice.</Heading>
          <Lead>
            Move from prepared text to generated speech through a focused voice
            workflow. Keep each stage clear, repeatable and ready for review.
          </Lead>
        </StaggerReveal>

        <div className="flex flex-col justify-center">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
              Workflow preview
            </span>
            <span className="rounded-full bg-surface-page px-3 py-1 text-xs leading-[1.45] text-text-muted dark:bg-white/[0.06]">
              Illustrative activity
            </span>
          </div>
          <WorkflowMarquee reduceMotion={reduceMotion} />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Card 2 — interactive recording-cost estimator (isolated slider state)      */
/* -------------------------------------------------------------------------- */
function Range({
  label,
  value,
  min,
  max,
  onChange,
  prefix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  prefix?: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mt-5 md:mt-6">
      <div className="flex items-center justify-between gap-4 text-[15px] text-text-primary sm:text-base">
        <label>{label}</label>
        <span className="font-semibold tabular-nums text-text-heading">
          {prefix}
          {value.toLocaleString("en-US")}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className={`mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 [--range-track:rgba(0,0,0,0.1)] dark:bg-white/10 dark:[--range-track:rgba(255,255,255,0.12)] ${FOCUS_RING} [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-text-heading [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-text-heading/10 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-text-heading`}
        style={{
          background: `linear-gradient(to right, var(--text-heading) 0%, var(--text-heading) ${percentage}%, var(--range-track) ${percentage}%, var(--range-track) 100%)`,
        }}
      />
    </div>
  );
}

function EstimatorInteractive({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [minutes, setMinutes] = useState(INITIAL_MINUTES);
  const [rate, setRate] = useState(INITIAL_RATE);
  const monthly = minutes * rate;
  const yearly = monthly * 12;

  // Start at the SSR-rendered baseline so there is zero $0 flash on hydration.
  const monthlyValue = useMotionValue(INITIAL_MINUTES * INITIAL_RATE);
  const yearlyValue = useMotionValue(INITIAL_MINUTES * INITIAL_RATE * 12);

  const formattedMonthly = useTransform(monthlyValue, (value) =>
    `$${Math.round(value).toLocaleString("en-US")}`,
  );
  const formattedYearly = useTransform(yearlyValue, (value) =>
    `$${Math.round(value).toLocaleString("en-US")}`,
  );

  useEffect(() => {
    const duration = reduceMotion ? 0 : 0.36;
    const monthlyCtrl = animate(monthlyValue, monthly, { duration, ease: EASE_OUT_EXPO });
    const yearlyCtrl = animate(yearlyValue, yearly, { duration, ease: EASE_OUT_EXPO });
    return () => {
      monthlyCtrl.stop();
      yearlyCtrl.stop();
    };
  }, [monthlyValue, yearlyValue, monthly, yearly, reduceMotion]);

  return (
    <div className="relative z-10 grid h-full grid-cols-1 content-center gap-6 overflow-hidden p-5 sm:p-7 md:grid-cols-2 md:items-center md:gap-10 md:p-11 lg:gap-12 lg:p-14">
      <div className="flex flex-col justify-center">
        <StaggerReveal
        >
          <Pill>Voice production · Estimator</Pill>
          <Heading>See what recording time can add up to.</Heading>
          <Lead>
            Adjust the sample workload and studio rate to estimate a traditional
            recording budget. Use your own figures to make the calculation
            relevant to your production.
          </Lead>
        </StaggerReveal>

        <Range
          label="Audio minutes per month"
          value={minutes}
          min={10}
          max={600}
          onChange={setMinutes}
        />
        <Range
          label="Studio cost per minute"
          value={rate}
          min={1}
          max={20}
          prefix="$"
          onChange={setRate}
        />
      </div>

      {/* Primary Estimator output panel — Strategic Violet Gradient focal surface */}
      <RevealCard
        className="bg-surface-card surface-shadow flex flex-col justify-center rounded-4xl p-6 sm:p-8 md:p-10"
      >
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
          Estimated recording spend / month
        </span>
        <motion.span className="mt-4 text-[clamp(44px,6.5vw,84px)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-text-heading">
          {formattedMonthly}
        </motion.span>
        <p className="mt-5 max-w-[390px] text-[15px] leading-[1.6] text-text-primary sm:text-base">
          Approximately{" "}
          <motion.span className="font-semibold tabular-nums text-text-heading">
            {formattedYearly}
          </motion.span>{" "}
          per year at these assumptions. This is an illustrative estimate, not a
          quote or a guaranteed saving.
        </p>
      </RevealCard>
    </div>
  );
}

function CardTwo({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <VideoBackground src={VIDEO_2} reduceMotion={reduceMotion} />
      <CardOverlay variant="soft" />
      <EstimatorInteractive reduceMotion={reduceMotion} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Card 3 — voice cloning workflow (staggered process cards, crisp hover)     */
/* -------------------------------------------------------------------------- */
const cloningSteps = [
  {
    number: "01",
    title: "Add a reference recording",
    description: "Start with a clear recording you have permission to use.",
  },
  {
    number: "02",
    title: "Create a voice profile",
    description: "Prepare and review the voice identity for generation.",
  },
  {
    number: "03",
    title: "Generate speech",
    description: "Turn approved text into audio using the selected voice.",
  },
];

function CardThree({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <VideoBackground src={VIDEO_3} reduceMotion={reduceMotion} />
      <CardOverlay variant="soft" />

      <div className="relative z-10 grid h-full grid-cols-1 content-center gap-6 overflow-hidden p-5 sm:p-7 md:grid-cols-2 md:items-center md:gap-12 md:p-11 lg:p-14">
        <StaggerReveal
          className="flex flex-col justify-center"
        >
          <Pill>Voice cloning · In development</Pill>
          <Heading>One voice identity. A reusable creative workflow.</Heading>
          <Lead>
            Bring a reference recording into a structured process, review the
            voice profile and generate speech from text. Clear steps keep the
            experience understandable from start to finish. This is a proposed
            workflow; public cloning access is not confirmed.
          </Lead>
        </StaggerReveal>

        <StaggerReveal
          className="flex flex-col justify-center gap-3"
        >
          <div className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-text-primary sm:text-[13px]">
            From reference to output
          </div>
          {cloningSteps.map((step) => (
            <RevealCard
              key={step.number}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl bg-surface-page/90 px-4 py-4 transition-[transform,background-color] duration-(--motion-interaction-duration) hover:-translate-y-0.5 dark:bg-[#050505]/90 md:gap-5 md:px-5 md:py-5"
            >
              <span className="relative z-10 pt-0.5 font-mono text-sm tabular-nums text-text-muted md:text-base">
                {step.number}
              </span>
              <span className="relative z-10 min-w-0">
                <span className="block text-[15px] font-semibold text-text-heading sm:text-base">
                  {step.title}
                </span>
                <span className="mt-1 block text-xs leading-[1.45] text-text-muted sm:text-[13px]">
                  {step.description}
                </span>
              </span>
            </RevealCard>
          ))}
        </StaggerReveal>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Sticky stack                                                               */
/* -------------------------------------------------------------------------- */
function StackCard({
  index,
  total,
  progress,
  reduceMotion,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  const isLast = index === total - 1;
  const start = total > 1 ? index / (total - 1) : 0;
  const end = total > 1 ? (index + 1) / (total - 1) : 1;

  // Each card settles gently as the next card takes its place.
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [start, end],
    isLast ? [1, 1] : [1, 0.94],
  );
  const dim = useTransform(
    progress,
    isLast ? [0, 1] : [start, end],
    isLast ? [0, 0] : [0, 0.16],
  );
  const lift = useTransform(
    progress,
    isLast ? [0, 1] : [start, end],
    isLast ? [0, 0] : [0, -10],
  );

  return (
    <div
      className="sticky top-0 flex h-[100svh] items-center justify-center px-3 py-5 sm:px-5 md:px-8"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{
          scale: reduceMotion ? 1 : scale,
          y: reduceMotion ? 0 : lift,
          transformOrigin: "top center",
        }}
        className="surface-shadow-lg relative h-[82svh] min-h-[540px] max-h-[780px] w-full max-w-[1220px] overflow-hidden rounded-4xl bg-surface-card sm:rounded-4xl"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ opacity: reduceMotion ? 0 : dim }}
          className="pointer-events-none absolute inset-0 z-20 bg-black"
        />
      </motion.div>
    </div>
  );
}

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cards = [
    <CardOne key="voice-generation" reduceMotion={reduceMotion} />,
    <CardTwo key="production-estimator" reduceMotion={reduceMotion} />,
    <CardThree key="voice-cloning" reduceMotion={reduceMotion} />,
  ];

  return (
    <section className="relative overflow-x-clip bg-surface-page text-text-heading">
      <div ref={containerRef} className="relative">
        {cards.map((card, index) => (
          <StackCard
            key={index}
            index={index}
            total={cards.length}
            progress={scrollYProgress}
            reduceMotion={reduceMotion}
          >
            {card}
          </StackCard>
        ))}
      </div>
    </section>
  );
}
