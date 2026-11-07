"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                   */
/* -------------------------------------------------------------------------- */
function VideoBackground({
  src,
  reduceMotion,
}: {
  src: string;
  reduceMotion: boolean | null;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(120,120,120,0.16),transparent_54%)] dark:bg-[radial-gradient(ellipse_at_72%_45%,rgba(255,255,255,0.10),transparent_54%)]"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-45"
        src={src}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
}

function CardOverlay({ variant = "standard" }: { variant?: "standard" | "soft" }) {
  return (
    <div
      aria-hidden="true"
      className={
        variant === "soft"
          ? "absolute inset-0 bg-gradient-to-r from-[#EFEFEF]/90 via-[#EFEFEF]/75 to-[#EFEFEF]/45 dark:from-[#050505]/90 dark:via-[#050505]/68 dark:to-[#050505]/28"
          : "absolute inset-0 bg-gradient-to-r from-[#EFEFEF]/95 via-[#EFEFEF]/82 to-[#EFEFEF]/48 dark:from-[#050505]/95 dark:via-[#050505]/76 dark:to-[#050505]/30"
      }
    />
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-neutral-900/10 bg-white/65 px-4 py-1.5 text-[11px] font-medium tracking-wide text-neutral-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80 md:px-5 md:py-2 md:text-xs">
      {children}
    </span>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-4 text-[clamp(27px,3.6vw,52px)] font-medium leading-[1.04] tracking-[-0.05em] text-neutral-950 dark:text-white md:mt-6">
      {children}
    </h3>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-neutral-600 dark:text-white/58 md:mt-5 md:text-base lg:text-lg">
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Card 1 — voice workflow preview                                             */
/* -------------------------------------------------------------------------- */
function WorkflowMarquee({ reduceMotion }: { reduceMotion: boolean | null }) {
  const renderItems = (copy: string) =>
    workflowItems.map((item, index) => (
      <li
        key={`${copy}-${item.title}`}
        className="flex items-center gap-3 rounded-2xl border border-neutral-900/[0.08] bg-white/75 px-4 py-3.5 shadow-[0_8px_28px_rgba(0,0,0,0.045)] backdrop-blur-xl dark:border-white/[0.09] dark:bg-[#0b0b0d]/75 dark:shadow-[0_8px_30px_rgba(0,0,0,0.24)] md:gap-4 md:px-5 md:py-4"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-neutral-500 dark:bg-neutral-300" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-neutral-900 dark:text-white/90 md:text-base">
            {item.title}
          </span>
          <span className="mt-0.5 block truncate text-xs text-neutral-500 dark:text-white/50 md:text-sm">
            {item.sub}
          </span>
        </span>
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-neutral-400 dark:text-white/35 md:text-xs">
          {item.time}
        </span>
      </li>
    ));

  return (
    <div
      className="relative h-[245px] overflow-hidden md:h-[340px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex flex-col"
        animate={reduceMotion ? undefined : { y: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <ul className="flex flex-col gap-3">{renderItems("first")}</ul>
        <ul aria-hidden="true" className="flex flex-col gap-3">
          {renderItems("second")}
        </ul>
      </motion.div>
    </div>
  );
}

function CardOne({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <>
      <VideoBackground src={VIDEO_1} reduceMotion={reduceMotion} />
      <CardOverlay />

      <div className="relative z-10 grid h-full grid-cols-1 gap-6 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-7 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-12 md:p-11 lg:p-14">
        <div className="flex flex-col justify-center">
          <Pill>VOICE GENERATION · WORKFLOW</Pill>
          <Heading>Turn written language into natural voice.</Heading>
          <Lead>
            Move from prepared text to generated speech through a focused voice
            workflow. Keep each stage clear, repeatable and ready for review.
          </Lead>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.19em] text-neutral-500 dark:text-white/45 md:text-xs">
              Workflow preview
            </span>
            <span className="rounded-full border border-neutral-900/10 bg-white/55 px-2.5 py-1 text-[9px] text-neutral-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/45 md:text-[10px]">
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
/* Card 2 — interactive recording-cost estimator                               */
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
    <div className="mt-5 md:mt-7">
      <div className="flex items-center justify-between gap-4 text-sm text-neutral-600 dark:text-white/60 md:text-base">
        <label>{label}</label>
        <span className="font-semibold tabular-nums text-neutral-950 dark:text-white">
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
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 [--range-track:#dedede] outline-none dark:bg-neutral-800 dark:[--range-track:#292929] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-neutral-900 [&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgba(0,0,0,0.08)] dark:[&::-webkit-slider-thumb]:border-neutral-900 dark:[&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:shadow-[0_0_0_5px_rgba(255,255,255,0.12)] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-neutral-900 dark:[&::-moz-range-thumb]:bg-white"
        style={{
          background: `linear-gradient(to right, #737373 0%, #737373 ${percentage}%, var(--range-track, #dedede) ${percentage}%, var(--range-track, #dedede) 100%)`,
        }}
      />
    </div>
  );
}

function CardTwo({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [minutes, setMinutes] = useState(120);
  const [rate, setRate] = useState(6);
  const monthly = minutes * rate;
  const yearly = monthly * 12;

  const amount = useMotionValue(0);
  const formattedAmount = useTransform(amount, (value) =>
    `$${Math.round(value).toLocaleString("en-US")}`
  );

  useEffect(() => {
    const controls = animate(amount, monthly, {
      duration: reduceMotion ? 0 : 0.55,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [amount, monthly, reduceMotion]);

  return (
    <>
      <VideoBackground src={VIDEO_2} reduceMotion={reduceMotion} />
      <CardOverlay variant="soft" />

      <div className="relative z-10 grid h-full grid-cols-1 gap-6 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-7 md:grid-cols-2 md:items-center md:gap-10 md:p-11 lg:gap-12 lg:p-14">
        <div className="flex flex-col justify-center">
          <Pill>VOICE PRODUCTION · ESTIMATOR</Pill>
          <Heading>See what recording time can add up to.</Heading>
          <Lead>
            Adjust the sample workload and studio rate to estimate a traditional
            recording budget. Use your own figures to make the calculation
            relevant to your production.
          </Lead>

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

        <div className="flex flex-col justify-center border-t border-neutral-900/10 pt-6 dark:border-white/10 md:border-l md:border-t-0 md:py-5 md:pl-9 lg:pl-12">
          <span className="text-[10px] font-medium uppercase tracking-[0.19em] text-neutral-500 dark:text-white/45 md:text-xs">
            Estimated recording spend / month
          </span>
          <motion.span className="mt-3 bg-gradient-to-r from-neutral-950 via-neutral-600 to-neutral-400 bg-clip-text text-[clamp(46px,7vw,92px)] font-medium leading-none tracking-[-0.065em] text-transparent dark:from-white dark:via-neutral-200 dark:to-neutral-500 md:mt-4">
            {formattedAmount}
          </motion.span>
          <p className="mt-4 max-w-[390px] text-xs leading-relaxed text-neutral-600 dark:text-white/55 md:mt-5 md:text-sm">
            Approximately ${yearly.toLocaleString("en-US")} per year at these
            assumptions. This is an illustrative estimate, not a quote or a
            guaranteed saving.
          </p>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Card 3 — voice cloning workflow                                             */
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

      <div className="relative z-10 grid h-full grid-cols-1 gap-7 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-7 md:grid-cols-2 md:items-center md:gap-12 md:p-11 lg:p-14">
        <div className="flex flex-col justify-center">
          <Pill>VOICE CLONING · PROCESS</Pill>
          <Heading>One voice identity. A reusable creative workflow.</Heading>
          <Lead>
            Bring a reference recording into a structured process, review the
            voice profile and generate speech from text. Clear steps keep the
            experience understandable from start to finish.
          </Lead>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.19em] text-neutral-500 dark:text-white/45 md:text-xs">
            From reference to output
          </div>
          {cloningSteps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 rounded-2xl border border-neutral-900/[0.08] bg-white/70 px-4 py-4 backdrop-blur-xl dark:border-white/[0.09] dark:bg-[#0b0b0d]/70 md:gap-5 md:px-5 md:py-5"
            >
              <span className="pt-0.5 font-mono text-base tabular-nums text-neutral-400 dark:text-white/45 md:text-xl">
                {step.number}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-neutral-900 dark:text-white/90 md:text-base">
                  {step.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-neutral-600 dark:text-white/50 md:text-sm">
                  {step.description}
                </span>
              </span>
            </div>
          ))}
        </div>
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

  // Each card settles as the next card takes its place.
  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [start, end],
    isLast ? [1, 1] : [1, 0.94]
  );
  const dim = useTransform(
    progress,
    isLast ? [0, 1] : [start, end],
    isLast ? [0, 0] : [0, 0.16]
  );
  const lift = useTransform(
    progress,
    isLast ? [0, 1] : [start, end],
    isLast ? [0, 0] : [0, -10]
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
        className="relative h-[82svh] min-h-[520px] max-h-[780px] w-full max-w-[1220px] overflow-hidden rounded-[25px] border border-neutral-900/10 bg-[#f7f7f5] shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#090909] dark:shadow-[0_28px_100px_rgba(0,0,0,0.38)] sm:rounded-[30px] md:rounded-[36px]"
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
    <section className="relative bg-[#EFEFEF] text-neutral-950 dark:bg-[#050505] dark:text-white">
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
