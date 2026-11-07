"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  ASSET YOLLARI — kendi dosyalarınla değiştir                         */
/* ------------------------------------------------------------------ */
const VIDEO_SRC = "/videos/silk-1.mp4"; // kart 1 arka plan videosu
const IMAGE_2 = "/images/silk-2.jpg"; // kart 2 arka plan resmi
const IMAGE_3 = "/images/silk-3.jpg"; // kart 3 arka plan resmi

const feed = [
  { dot: "bg-emerald-400", title: "Voice cloned", sub: "Aziza · Uzbek", time: "2s ago" },
  { dot: "bg-emerald-400", title: "Speech generated", sub: "Narration · 42s", time: "9s ago" },
  { dot: "bg-amber-300", title: "Export ready", sub: "Studio · WAV", time: "21s ago" },
  { dot: "bg-emerald-400", title: "Voice cloned", sub: "Jasur · Uzbek", time: "35s ago" },
  { dot: "bg-sky-400", title: "Dub completed", sub: "EN → UZ", time: "48s ago" },
  { dot: "bg-emerald-400", title: "Speech generated", sub: "Ad read · 15s", time: "1m ago" },
];

/* ------------------------------------------------------------------ */
/*  Ortak parçalar                                                      */
/* ------------------------------------------------------------------ */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur md:px-5 md:py-2 md:text-sm">
      {children}
    </span>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-4 text-[clamp(26px,3.6vw,52px)] font-medium leading-[1.05] tracking-[-0.045em] text-white md:mt-6">
      {children}
    </h3>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-white/55 md:mt-5 md:text-lg">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Kart 1 — dikey marquee liste                                        */
/* ------------------------------------------------------------------ */
function FeedMarquee({ reduce }: { reduce: boolean | null }) {
  const items = [...feed, ...feed]; // sonsuz döngü için 2x

  return (
    <div
      className="relative h-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
      }}
    >
      <motion.ul
        animate={reduce ? undefined : { y: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-3"
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0b0b10]/80 px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur md:py-5"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dot}`} />
            <span className="min-w-0 flex-1 truncate text-sm text-white/90 md:text-base">
              <span className="font-semibold">{item.title}</span>
              <span className="text-white/60"> — {item.sub}</span>
            </span>
            <span className="shrink-0 font-mono text-[11px] text-white/35 md:text-xs">
              {item.time}
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function CardOne({ reduce }: { reduce: boolean | null }) {
  return (
    <>
      {/* Video arka plan */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 grid h-full grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_1.1fr] md:gap-12 md:p-14">
        <div className="flex flex-col justify-center">
          <Pill>24/7 Voice Generation</Pill>
          <Heading>
            Every line voiced. Every language covered.
          </Heading>
          <Lead>
            While your team is busy creating, Miralas is cloning voices,
            generating speech and exporting finished audio — around the clock.
          </Lead>
        </div>

        <div className="relative h-[34%] md:h-full">
          <FeedMarquee reduce={reduce} />
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Kart 2 — slider'lı hesaplayıcı                                      */
/* ------------------------------------------------------------------ */
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
  onChange: (v: number) => void;
  prefix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mt-5 md:mt-7">
      <div className="flex items-center justify-between text-sm text-white/65 md:text-base">
        <span>{label}</span>
        <span className="font-semibold tabular-nums text-white">
          {prefix}
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400 [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(167,139,250,0.25),0_0_18px_rgba(167,139,250,0.7)]
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-violet-400"
        style={{
          background: `linear-gradient(to right, #38bdf8, #a78bfa ${pct}%, rgba(255,255,255,0.12) ${pct}%)`,
        }}
      />
    </div>
  );
}

function CardTwo() {
  const [minutes, setMinutes] = useState(120);
  const [rate, setRate] = useState(6);

  const monthly = minutes * rate;
  const yearly = monthly * 12;

  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `$${Math.round(v).toLocaleString("en-US")}`);

  useEffect(() => {
    const controls = animate(mv, monthly, { duration: 0.6, ease: "easeOut" });
    return () => controls.stop();
  }, [monthly, mv]);

  return (
    <>
      <Image
        src={IMAGE_2}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-80"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

      <div className="relative z-10 grid h-full grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2 md:gap-12 md:p-14">
        <div className="flex flex-col justify-center">
          <Pill>What It&apos;s Costing You</Pill>
          <Heading>Studio time adds up quietly.</Heading>
          <Lead>
            Drag the sliders to match your workload — this is what recording
            sessions and re-takes take out of your budget every month.
          </Lead>

          <Range
            label="Minutes of audio / month"
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

        <div className="flex flex-col justify-center md:border-l md:border-white/10 md:pl-12">
          <span className="text-[11px] font-medium tracking-[0.22em] text-white/45 md:text-xs">
            ESTIMATED STUDIO SPEND / MONTH
          </span>
          <motion.span className="mt-2 bg-gradient-to-r from-white via-violet-200 to-rose-200 bg-clip-text text-[clamp(44px,7vw,104px)] font-medium leading-none tracking-[-0.06em] tabular-nums text-transparent md:mt-4">
            {text}
          </motion.span>
          <p className="mt-3 max-w-[420px] text-[13px] leading-relaxed text-white/55 md:mt-5 md:text-base">
            That is about ${yearly.toLocaleString("en-US")} a year spent on
            recording, editing and re-takes that a cloned voice can handle.
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Kart 3 — CTA                                                        */
/* ------------------------------------------------------------------ */
const steps = [
  { n: "01", t: "Upload a reference", d: "A short recording is all it takes." },
  { n: "02", t: "Build your voice identity", d: "Tone, rhythm and texture are learned." },
  { n: "03", t: "Generate anywhere", d: "Type text, get speech in your voice." },
];

function CardThree() {
  return (
    <>
      <Image
        src={IMAGE_3}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-80"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

      <div className="relative z-10 grid h-full grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-2 md:gap-12 md:p-14">
        <div className="flex flex-col justify-center">
          <Pill>Your Voice, Ready</Pill>
          <Heading>From one recording to every language.</Heading>
          <Lead>
            Clone once, then speak Uzbek, Turkish, English and more — with the
            same character every time.
          </Lead>
          <a
            href="#"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(167,139,250,0.45)] transition hover:scale-[1.03] md:mt-8"
          >
            Get started <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="flex flex-col justify-center gap-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#0b0b10]/75 px-5 py-4 backdrop-blur md:py-5"
            >
              <span className="bg-gradient-to-br from-sky-300 to-rose-300 bg-clip-text font-mono text-lg text-transparent md:text-2xl">
                {s.n}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white md:text-lg">
                  {s.t}
                </span>
                <span className="block text-xs text-white/55 md:text-sm">
                  {s.d}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky stack mantığı                                                */
/* ------------------------------------------------------------------ */
function StackCard({
  index,
  total,
  progress,
  reduce,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
  children: React.ReactNode;
}) {
  // Üstüne yeni kart bindikçe bu kart küçülür ve kararır
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const start = index / total;

  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : targetScale]);
  const dim = useTransform(progress, [start, 1], [0, index === total - 1 ? 0 : 0.55]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center px-3 md:px-6">
      <motion.div
        style={{ scale, top: `calc(${index} * 26px)` }}
        className="relative h-[74svh] w-full max-w-[1180px] origin-top overflow-hidden rounded-[28px] border border-white/10 bg-black  md:h-[72svh] md:rounded-[36px]"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 z-20 bg-black"
        />
      </motion.div>
    </div>
  );
}

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cards = [
    <CardOne key="1" reduce={reduce} />,
    <CardTwo key="2" />,
    <CardThree key="3" />,
  ];

  return (
    <section className="relative bg-[#EFEFEF] dark:bg-[#050505]">
      <div ref={containerRef} className="relative">
        {cards.map((card, i) => (
          <StackCard
            key={i}
            index={i}
            total={cards.length}
            progress={scrollYProgress}
            reduce={reduce}
          >
            {card}
          </StackCard>
        ))}
      </div>
    </section>
  );
}