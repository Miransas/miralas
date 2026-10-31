"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBolt,
  FaBookOpen,
  FaGithub,
  FaHeadphones,
  FaMicrophone,
  FaRobot,
  FaShieldHalved,
  FaStar,
  FaUsers,
  FaWandMagicSparkles,
  FaWaveSquare,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

/* ───────────────────────── Icons ───────────────────────── */

type IconName =
  | "wave"
  | "bolt"
  | "shield"
  | "mic"
  | "bot"
  | "star"
  | "arrow"
  | "spark"
  | "headphones"
  | "book"
  | "users"
  | "x"
  | "github"
  | "youtube";

const iconMap: Record<IconName, IconType> = {
  wave: FaWaveSquare,
  bolt: FaBolt,
  shield: FaShieldHalved,
  mic: FaMicrophone,
  bot: FaRobot,
  star: FaStar,
  arrow: FaArrowRight,
  spark: FaWandMagicSparkles,
  headphones: FaHeadphones,
  book: FaBookOpen,
  users: FaUsers,
  x: FaXTwitter,
  github: FaGithub,
  youtube: FaYoutube,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} aria-hidden="true" focusable="false" />;
}

/* ───────────────────────── Data ───────────────────────── */

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#how-it-works" },
  { label: "Pricing", href: "#get-started" },
  { label: "Blog", href: "#blog" },
  { label: "Docs", href: "#docs" },
];

const features = [
  {
    icon: "wave" as const,
    title: "Natural & expressive",
    text: "Keep the tone, emotion, and character that make a voice unmistakable.",
  },
  {
    icon: "bolt" as const,
    title: "Made to move fast",
    text: "Go from a voice sample to a usable voice identity with a streamlined workflow.",
  },
  {
    icon: "shield" as const,
    title: "Privacy comes first",
    text: "Voice data deserves care, transparency, and thoughtful protection at every step.",
  },
];

const steps = [
  {
    number: "1",
    title: "Share a voice sample",
    text: "Start with a short, clear recording of a voice you have permission to use.",
  },
  {
    number: "2",
    title: "Let the model learn",
    text: "The model studies vocal qualities like tone, rhythm, and distinctive patterns.",
  },
  {
    number: "3",
    title: "Bring it to life",
    text: "Use your voice identity across supported Miransas voice experiences.",
  },
];

const apps = [
  { icon: "users" as const, label: "AI Characters" },
  { icon: "headphones" as const, label: "Voice Assistants" },
  { icon: "book" as const, label: "Audiobooks" },
  { icon: "spark" as const, label: "Content Creation" },
];

const useCases = [
  {
    icon: "wave" as const,
    title: "TTS with cloned voice",
    text: "Turn written words into speech that sounds familiar and natural.",
  },
  {
    icon: "mic" as const,
    title: "Real-time voice",
    text: "Bring a consistent voice into live conversations and interactive experiences.",
  },
  {
    icon: "bot" as const,
    title: "Voice agents",
    text: "Give assistants and customer experiences a recognizable voice.",
  },
  {
    icon: "star" as const,
    title: "Creative projects",
    text: "Build characters, narrations, and new worlds with a distinct sound.",
  },
];

const waveBars = [
  7, 12, 19, 11, 24, 15, 30, 17, 10, 23, 33, 14, 24, 39, 19, 30, 12, 22, 34,
  14, 26, 18, 9, 19, 29, 13, 35, 22, 12, 25, 16, 31, 19, 10, 22, 13,
];

/* ───────────────────────── Small pieces ───────────────────────── */

const container = "mx-auto w-full max-w-[1200px] px-5 md:px-9";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
      <span className="inline-block h-px w-[22px] bg-sky-500 opacity-70" />
      {children}
    </div>
  );
}

function Waveform({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center overflow-hidden text-sky-500 ${
        compact ? "mt-2 h-[24px] justify-start gap-[2px]" : "h-9 justify-center gap-[3px]"
      }`}
      role="img"
      aria-label="Stylized audio waveform"
    >
      {waveBars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] shrink-0 origin-center rounded-full bg-current opacity-80 animate-pulse"
          style={{
            height: `${compact ? Math.max(4, h * 0.56) : h}px`,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function VoiceCloneLanding() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-slate-100 font-sans antialiased"
    >
      {/* ───────── HERO ───────── */}
      <section
        className="relative isolate flex min-h-[600px] items-center border-b border-slate-200 dark:border-white/5 md:min-h-[640px]"
        aria-labelledby="hero-heading"
      >
        {/* Hero Background / Image (Mobile Layering Included) */}
        <div
          className="pointer-events-none absolute inset-0 md:left-auto md:right-0 -z-10 w-full md:w-[65%] overflow-hidden"
          aria-hidden="true"
        >
          {/* Main Hero Image - Fullscreen low-opacity on mobile, full-right on desktop */}
          <div className="absolute inset-0 opacity-30 dark:opacity-25 md:opacity-90 dark:md:opacity-80">
            <Image
              src="/portraits/hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover object-[65%_35%]"
            />
          </div>

          {/* Gradient Masks */}
          {/* Light Mode Fades */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:hidden md:via-slate-50/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50/50 dark:hidden" />

          {/* Dark Mode Fades */}
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent md:via-[#0a0a0a]/40" />
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />

          {/* Decorative Orbits */}
          <div className="absolute right-[10%] top-[5%] h-[470px] w-[470px] -rotate-[28deg] scale-y-[0.38] rounded-full border border-slate-300/50 dark:border-white/10 hidden md:block" />
          <div className="absolute right-[15%] top-[15%] h-[380px] w-[380px] rotate-[37deg] scale-y-[0.47] rounded-full border border-slate-300/40 dark:border-white/5 hidden md:block" />
        </div>

        {/* Hero Content */}
        <div className={`${container} relative z-10 pb-14 pt-[100px] md:pt-[120px]`}>
          <Reveal className="max-w-[640px]">
            <Eyebrow>Voice Clone</Eyebrow>

            <h1
              id="hero-heading"
              className="my-6 text-[clamp(42px,5.4vw,72px)] font-bold tracking-tight leading-[1.05]"
            >
              Your voice,
              <br />
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                infinite possibilities.
              </span>
            </h1>

            <p className="max-w-[470px] text-[15px] leading-[1.75] text-slate-600 dark:text-slate-400">
              Bring a voice to life with remarkable fidelity. Create a recognizable voice identity for your product, a character, or a story worth telling.
            </p>

            <ul className="mt-10 grid max-w-[680px] grid-cols-1 gap-6 sm:grid-cols-3">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="shrink-0 pt-0.5 text-sky-500">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <div>
                    <h2 className="mb-1 text-[13px] font-semibold leading-snug">{f.title}</h2>
                    <p className="max-w-[170px] text-[12px] leading-[1.6] text-slate-500 dark:text-slate-400">
                      {f.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#how-it-works"
              className="mt-9 inline-flex min-h-[44px] items-center justify-center gap-3.5 rounded-full bg-slate-900 px-6 text-[13px] font-medium text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:-translate-y-0.5 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Explore Voice Clone <Icon name="arrow" size={16} />
            </a>
          </Reveal>
        </div>

        {/* Floating Voice Card */}
        

        {/* Hero Note */}
        <div className="absolute bottom-10 right-8 hidden flex-col items-start gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 md:flex lg:right-[max(36px,calc((100%-1200px)/2+36px))]">
          <span>Same voice.</span>
          <span>New possibilities.</span>
          <i className="mt-1 block h-px w-7 bg-sky-500/60" />
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section
        id="how-it-works"
        aria-labelledby="process-heading"
        className="border-b border-slate-200 bg-slate-100/60 py-12 dark:border-white/5 dark:bg-[#0e0e0e] md:py-24"
      >
        <div className={container}>
          {/* Mobile: the visual becomes a full-bleed, image-led hero card. */}
          <Reveal className="md:hidden">
            <div className="group relative isolate min-h-[700px] overflow-hidden rounded-[28px] border border-slate-200/70 bg-[#080b11] shadow-[0_24px_70px_-32px_rgba(0,0,0,0.6)] dark:border-white/10">
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 -z-20"
                initial={reduceMotion ? false : { scale: 1.02 }}
                whileInView={reduceMotion ? undefined : { scale: 1.06 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 12, ease: "easeOut" }}
              >
                <Image
                  src="/portraits/man.png"
                  alt=""
                  fill
                  priority={false}
                  sizes="(max-width: 767px) 100vw, 1px"
                  className="object-cover object-[58%_center] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </motion.div>

              {/* Keep the copy legible over bright and dark parts of the image. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,14,0.78)_0%,rgba(5,8,14,0.34)_34%,rgba(5,8,14,0.58)_52%,rgba(5,8,14,0.94)_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-r from-black/25 via-transparent to-transparent"
              />

              <div className="flex min-h-[700px] flex-col justify-between p-5 sm:p-7">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="pt-1"
                >
                  <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                    <span className="h-px w-6 bg-sky-400" />
                    How it works
                  </div>
                  <h2
                    id="process-heading"
                    className="my-5 max-w-[320px] text-[clamp(34px,9vw,46px)] font-bold leading-[1.04] tracking-[-0.045em] text-white"
                  >
                    From a real voice <span className="text-white/65">to a</span>{" "}
                    <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                      digital twin.
                    </span>
                  </h2>
                  <p className="max-w-[330px] text-[13px] leading-[1.75] text-white/75">
                    A voice is more than sound. Capture its character and bring it into the digital experiences you create.
                  </p>
                </motion.div>

                <motion.ol
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
                  className="mt-8 flex flex-col gap-2.5 rounded-2xl border border-white/15 bg-black/30 p-3.5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-4"
                >
                  {steps.map((step, index) => (
                    <motion.li
                      key={step.number}
                      whileHover={reduceMotion ? undefined : { x: 3 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="grid grid-cols-[34px_1fr] items-start gap-3 rounded-xl p-1.5 transition-colors duration-300 hover:bg-white/[0.06]"
                    >
                      <span className="grid h-[34px] w-[34px] place-items-center rounded-full border border-sky-300/30 bg-sky-400/15 text-[11px] font-semibold tabular-nums text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.08)]">
                        0{index + 1}
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[12px] font-semibold leading-snug text-white">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-[11px] leading-[1.55] text-white/65">
                          {step.text}
                        </span>
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>

                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium tracking-wide text-white/75">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-sky-300/25 bg-sky-300/10 text-sky-200">
                    <Icon name="wave" size={14} />
                  </span>
                  One voice. Many uses.
                </div>
              </div>
            </div>
          </Reveal>

          {/* Desktop: keep the calm two-column editorial layout. */}
          <div className="hidden items-center gap-12 md:grid md:grid-cols-[minmax(300px,0.9fr)_minmax(380px,1.1fr)] md:gap-14">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="my-5 text-[clamp(32px,3.4vw,46px)] font-bold leading-[1.1] tracking-tight">
                From a real voice
                <br />
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                  to a digital twin.
                </span>
              </h2>
              <p className="max-w-[400px] text-[14px] leading-[1.75] text-slate-600 dark:text-slate-400">
                A voice is more than sound. Miransas helps capture its character and turn it into a reusable part of your digital experiences.
              </p>

              <ol className="mt-9 flex flex-col gap-6">
                {steps.map((step, index) => (
                  <motion.li
                    key={step.number}
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                    className="group grid grid-cols-[38px_1fr] items-start gap-3.5 rounded-xl transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-sky-500/20 bg-sky-500/10 text-[12px] font-bold text-sky-500 transition-all duration-300 group-hover:border-sky-500/40 group-hover:bg-sky-500/15">
                      {step.number}
                    </span>
                    <span>
                      <span className="mb-1 block text-[13px] font-semibold">{step.title}</span>
                      <span className="block text-[12px] leading-[1.6] text-slate-500 dark:text-slate-400">
                        {step.text}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1} className="relative min-w-0">
              <div className="absolute left-[15%] top-[18%] h-[55%] w-[70%] rounded-full bg-sky-500/10 blur-[60px]" />
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-[#141414]"
              >
                <Image
                  src="/portraits/man.png"
                  alt="One voice taking on different identities"
                  width={560}
                  height={310}
                  sizes="(max-width: 768px) 90vw, 46vw"
                  className="block h-auto w-full rounded-xl object-contain"
                />
              </motion.div>

              <div className="relative z-10 mt-4 flex items-center justify-center gap-2.5 text-[12px] font-medium text-slate-600 dark:text-slate-400">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-500">
                  <Icon name="wave" size={15} />
                </span>
                One voice. Many uses.
              </div>

              <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {apps.map((app) => (
                  <motion.li
                    key={app.label}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2 rounded-xl border border-slate-200/60 bg-white/50 p-3 text-center text-[11px] font-medium text-slate-600 shadow-sm transition-colors duration-300 hover:border-sky-500/30 hover:bg-white/80 dark:border-white/5 dark:bg-white/[0.02] dark:text-slate-400 dark:hover:bg-white/[0.05]"
                  >
                    <span className="text-sky-500">
                      <Icon name={app.icon} size={18} />
                    </span>
                    {app.label}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Mobile use-cases stay outside the image for a little breathing room. */}
          <ul className="mt-4 grid grid-cols-2 gap-2.5 md:hidden">
            {apps.map((app, index) => (
              <motion.li
                key={app.label}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-3.5 text-[11px] font-medium text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/30 hover:shadow-md dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-slate-300"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-sky-500/15 bg-sky-500/10 text-sky-500 transition-transform duration-300">
                  <Icon name={app.icon} size={17} />
                </span>
                <span className="leading-snug">{app.label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── USE CASES ───────── */}
      <section
        id="use-cases"
        aria-labelledby="use-cases-heading"
        className="border-b border-slate-200 py-16 dark:border-white/5 md:py-24"
      >
        <div className={container}>
          <Reveal className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <Eyebrow>Use cases</Eyebrow>
              <h2
                id="use-cases-heading"
                className="mt-5 text-[clamp(32px,3.4vw,46px)] font-bold tracking-tight leading-[1.1]"
              >
                Built for creators,
                <br />
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                  businesses and beyond.
                </span>
              </h2>
            </div>
            <p className="max-w-[400px] text-[14px] leading-[1.75] text-slate-600 dark:text-slate-400">
              From content creation to customer support, voice cloning opens up new ways to communicate, create, and build experiences that feel more human.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <a
                  href="#get-started"
                  className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-md dark:border-white/5 dark:bg-[#121212] dark:hover:border-sky-500/30"
                >
                  <div>
                    <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-500">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <strong className="block text-[14px] font-semibold">{item.title}</strong>
                    <span className="mt-2 block text-[12px] leading-[1.65] text-slate-500 dark:text-slate-400">
                      {item.text}
                    </span>
                  </div>
                  <span className="mt-4 flex items-center justify-end text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-sky-500">
                    <Icon name="arrow" size={15} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CLOSING ───────── */}
      <section
        id="get-started"
        aria-labelledby="closing-heading"
        className="relative isolate flex min-h-[400px] items-center overflow-hidden border-b border-slate-200 dark:border-white/5"
      >
        {/* Landscape Image Background */}
        <div
          className="absolute inset-0 -z-20 bg-[url('/images/closing-landscape.webp')] bg-cover bg-[center_58%] opacity-20 dark:opacity-15"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90"
          aria-hidden="true"
        />

        <Reveal className={`${container} py-16`}>
          <h2
            id="closing-heading"
            className="text-[clamp(36px,4.2vw,56px)] font-bold tracking-tight leading-[1.05]"
          >
            Same voice.
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              A bigger world.
            </span>
          </h2>
          <p className="mt-4 max-w-[380px] text-[14px] leading-[1.75] text-slate-600 dark:text-slate-400">
            Bring your voice to life across the experiences you create with Miransas.
          </p>
          <a
            href="#how-it-works"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-3.5 rounded-full bg-slate-900 px-6 text-[13px] font-medium text-white shadow-lg transition-all duration-200 hover:bg-slate-800 hover:-translate-y-0.5 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Get started <Icon name="arrow" size={16} />
          </a>
          <span className="mt-6 flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <Icon name="shield" size={14} /> Built around responsible voice creation.
          </span>
        </Reveal>
      </section>
    </div>
  );
}