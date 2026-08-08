"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check, Languages, Mic2, Play, Sparkles, Wand2 } from "lucide-react";
import type { MouseEvent } from "react";

const bars = [38, 62, 46, 84, 58, 96, 44, 72, 54, 88, 66, 42, 78, 92, 50, 70, 40, 82, 60, 74];
const chips = ["O'zbek", "Ўзбек", "Qaraqalpaq", "English", "Русский"];
const trust = ["Uzbek Language", "API Access", "Fast Inference", "Enterprise Ready"];

export default function HeroSection() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["36%", "64%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "58%"]);

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className="relative isolate min-h-screen overflow-hidden bg-[#fbfaf8] px-6 pb-24 pt-32 text-zinc-950 dark:bg-black dark:text-white sm:pt-36 lg:px-8 xl:min-h-[940px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_82%_14%,rgba(16,185,129,0.13),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.08),transparent_38%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.24),transparent_32%),radial-gradient(circle_at_82%_14%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.12),transparent_38%)]" />
      <motion.div aria-hidden className="absolute h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-[7rem] bg-[radial-gradient(circle,rgba(14,165,233,0.15),transparent_64%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(125,211,252,0.18),transparent_64%)]" style={{ left: glowX, top: glowY }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,39,42,0.05)_1px,transparent_1px),linear-gradient(rgba(39,39,42,0.05)_1px,transparent_1px)] bg-[length:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_78%,transparent)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] [background-size:5px_5px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[45fr_55fr] xl:max-w-[1500px]">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }} className="max-w-3xl">
          <motion.div variants={{ hidden: { opacity: 0, y: 24, filter: "blur(12px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:text-zinc-300"><Sparkles className="size-4 text-sky-500" />Premium AI Voice Platform for Uzbek Language</motion.div>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 24, filter: "blur(12px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mt-8 text-5xl font-semibold leading-[0.96] tracking-tight text-zinc-950 dark:text-white sm:text-7xl lg:text-[5.9rem] xl:text-[6.9rem]">Uzbek voice AI that feels alive, precise and unmistakably human.</motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 24, filter: "blur(12px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300 sm:text-xl sm:leading-9">Generate premium Uzbek speech, prototype expressive voice products, and prepare creator donation moments with a platform crafted for local language at global quality.</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 24, filter: "blur(12px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/get-started" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white shadow-[0_22px_64px_-28px_rgba(14,165,233,0.95)] outline-none transition hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-white dark:text-zinc-950"><span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full" /><span className="relative flex items-center gap-2">Start Creating <ArrowRight className="size-4" /></span></Link>
            <Link href="/demo" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-6 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-xl outline-none transition hover:scale-[1.03] hover:bg-white dark:border-white/10 dark:bg-white/[0.07] dark:text-white dark:hover:bg-white/10"><Play className="size-4" />Watch Demo</Link>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 24, filter: "blur(12px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mt-8 flex max-w-2xl flex-wrap gap-2.5">{trust.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/60 px-3.5 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-300"><Check className="size-4 text-emerald-500" />{item}</span>)}</motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28, filter: "blur(16px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }} className="relative min-h-[540px] [perspective:1700px] lg:min-h-[680px]">
          <motion.div style={reduced ? undefined : { rotateX, rotateY }} className="relative mx-auto w-full max-w-[760px] rounded-[40px] border border-white/70 bg-white/62 p-3 shadow-[0_70px_190px_-86px_rgba(2,6,23,0.98)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/58">
            <div className="relative overflow-hidden rounded-[32px] border border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,244,245,0.72))] p-5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.82),rgba(9,9,11,0.9))] sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.17),transparent_34%),linear-gradient(90deg,rgba(39,39,42,0.045)_1px,transparent_1px),linear-gradient(rgba(39,39,42,0.045)_1px,transparent_1px)] bg-[length:100%_100%,42px_42px,42px_42px] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.22),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)]" />
              <motion.div aria-hidden className="absolute left-[-45%] top-0 h-px w-[80%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 dark:via-sky-100" animate={reduced ? undefined : { x: ["0%", "235%"] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.1 }} />
              <div className="relative flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"><Mic2 className="size-5" /></div><div><p className="text-sm font-semibold">Miralas Live Studio</p><p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Tashkent session - model v0.9</p></div></div><span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">Synthesizing</span></div>
              <div className="relative mt-8 rounded-[30px] border border-zinc-200/90 bg-white/78 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_76px_-48px_rgba(2,6,23,0.75)] backdrop-blur-xl dark:border-white/10 dark:bg-black/30 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Voice Activity</p><h3 className="mt-2 text-2xl font-semibold tracking-tight">Uzbek Narrator Pro</h3></div><Wand2 className="size-6 text-sky-500" /></div><div className="mt-9 flex h-40 items-center gap-1.5 sm:gap-2">{bars.map((h, i) => <motion.span key={i} className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 via-sky-500 to-emerald-300 shadow-[0_0_26px_rgba(14,165,233,0.24)] dark:from-white dark:via-sky-300 dark:to-emerald-300" animate={reduced ? undefined : { height: [`${h * 0.5}%`, `${h}%`, `${h * 0.66}%`], opacity: [0.62, 1, 0.78] }} transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.045, ease: "easeInOut" }} />)}</div></div>
              <div className="relative mt-4 grid gap-4 md:grid-cols-[1.2fr_0.8fr]"><div className="rounded-[26px] border border-zinc-200/90 bg-white/72 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"><div className="flex justify-between text-xs text-zinc-500"><span>00:00</span><span>00:18</span></div><div className="relative mt-4 h-14 rounded-2xl bg-zinc-100 dark:bg-black/40"><motion.div className="absolute inset-y-0 left-0 rounded-2xl bg-gradient-to-r from-sky-500/20 via-emerald-400/20 to-transparent" animate={reduced ? undefined : { width: ["24%", "78%", "42%"] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} /><span className="absolute left-[12%] top-3 h-8 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[11px] font-medium shadow-sm dark:border-white/10 dark:bg-zinc-950/82">Prosody</span><span className="absolute left-[54%] top-3 h-8 rounded-full border border-white/70 bg-white/85 px-3 py-1.5 text-[11px] font-medium shadow-sm dark:border-white/10 dark:bg-zinc-950/82">Tone</span></div></div><div className="rounded-[26px] border border-zinc-200/90 bg-white/72 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"><div className="flex items-center gap-2 text-xs font-medium text-zinc-500"><Languages className="size-4 text-sky-500" />Languages</div><div className="mt-4 flex flex-wrap gap-2">{chips.map((chip, i) => <motion.span key={chip} animate={reduced ? undefined : { y: [0, -3, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} className={i === 0 ? "rounded-full bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950" : "rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs font-medium dark:border-white/10 dark:bg-white/[0.07]"}>{chip}</motion.span>)}</div></div></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
