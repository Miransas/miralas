"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Globe2, Layers3, Mic2, Sparkles, Star, Wand2, type LucideIcon } from "lucide-react";
import HeroSection from "@/components/shared/hero";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

const logos = ["BilimLab", "Ovoza", "Payme", "Najot", "UzEdu", "Creator Hub"];
const features: Array<[string, string, LucideIcon]> = [
  ["Uzbek-first generation", "Natural prosody, Latin/Cyrillic workflows, and tone controls for local products.", Mic2],
  ["Voice cloning ready", "Consent-led identity tools for creators, instructors and brand voices.", Wand2],
  ["Creator donations", "Prepare donation-triggered alerts, messages and monetized voice moments.", Sparkles],
  ["Developer API", "Build generation into apps, support flows and automation pipelines.", Code2],
];
const models = ["Narrator Pro", "Creator Soft", "Newsroom Clear", "Teacher Warm"];
const cases = ["Education", "Media", "Creators", "Support", "Fintech", "Developers"];
const stats = [["98.7%", "Target Uzbek clarity"], ["24ms", "Realtime-ready architecture"], ["4", "Core product lines"], ["UZ", "Primary language"]];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 26, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8 ${className}`}>{children}</section>;
}

function MiniVisualizer() {
  const reduced = useReducedMotion();
  return (
    <div className="relative rounded-[34px] border border-zinc-200/80 bg-white/72 p-5 shadow-[0_35px_120px_-78px_rgba(2,6,23,0.95)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/70">
      <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_30%_0%,rgba(14,165,233,0.18),transparent_38%),radial-gradient(circle_at_80%_90%,rgba(16,185,129,0.13),transparent_34%)]" />
      <div className="relative flex items-center justify-between"><div><p className="text-sm font-semibold">Live voice preview</p><p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Fake activity visualization</p></div><span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Streaming</span></div>
      <div className="relative mt-8 flex h-52 items-center gap-2 rounded-[28px] border border-zinc-200/80 bg-white/62 p-5 dark:border-white/10 dark:bg-black/26">
        {[54, 78, 44, 92, 64, 38, 86, 58, 72, 96, 48, 68, 82, 52, 76].map((h, i) => <motion.span key={i} className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 via-sky-500 to-emerald-300 dark:from-white dark:via-sky-300 dark:to-emerald-300" animate={reduced ? undefined : { height: [`${h * 0.55}%`, `${h}%`, `${h * 0.7}%`] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }} />)}
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="bg-[#fbfaf8] text-zinc-950 dark:bg-black dark:text-white">
      <HeroSection />
      <SectionShell className="py-14 sm:py-16">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">Trusted by teams building the next Uzbek digital experiences</p>
          <div className="mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div className="flex min-w-full shrink-0 items-center justify-around gap-10" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>{[...logos, ...logos].map((logo, i) => <div key={`${logo}-${i}`} className="whitespace-nowrap text-xl font-semibold tracking-tight text-zinc-400 dark:text-zinc-600">{logo}</div>)}</motion.div>
          </div>
        </Reveal>
      </SectionShell>
      <SectionShell>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal><p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Interactive Demo</p><h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Watch voice activity form in real time.</h2><p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">A polished preview of how Miralas will expose generation, timing, language and quality signals before real playback is connected.</p></Reveal>
          <Reveal><MiniVisualizer /></Reveal>
        </div>
      </SectionShell>
      <SectionShell className="bg-white/70 dark:bg-zinc-950/55">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">AI Features</p><h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">A complete voice creation stack.</h2></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">{features.map(([title, body, Icon]) => <Reveal key={title as string}><article className="group rounded-[30px] border border-zinc-200/80 bg-[#fbfaf8]/80 p-7 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_100px_-75px_rgba(2,6,23,0.95)] dark:border-white/10 dark:bg-white/[0.055]"><Icon className="size-7 text-sky-500" /><h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">{body}</p></article></Reveal>)}</div>
        </div>
      </SectionShell>
      <SectionShell>
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <Reveal className="rounded-[34px] border border-zinc-200/80 bg-zinc-950 p-8 text-white shadow-[0_40px_120px_-80px_rgba(2,6,23,1)] dark:border-white/10"><h2 className="text-4xl font-semibold tracking-tight">Why choose Miralas?</h2><p className="mt-4 leading-8 text-white/68">Language quality, product craft and creator monetization in one local-first system.</p></Reveal>
          {["Uzbek as a product priority", "Premium controls for tone and timing", "Designed for creators, teams and APIs"].map((item, i) => <Reveal key={item}><div className="h-full rounded-[34px] border border-zinc-200/80 bg-white/74 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"><span className="text-5xl font-semibold text-zinc-200 dark:text-white/10">0{i + 1}</span><h3 className="mt-10 text-2xl font-semibold">{item}</h3><p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">A focused advantage for teams that need audio to feel native, not translated.</p></div></Reveal>)}
        </div>
      </SectionShell>
      <SectionShell className="bg-white/70 dark:bg-zinc-950/55">
        <div className="mx-auto max-w-7xl"><Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Voice Models</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Four model personalities to start.</h2></div><Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold">Explore products <ArrowRight className="size-4" /></Link></Reveal><div className="mt-12 grid gap-5 md:grid-cols-4">{models.map((model, i) => <Reveal key={model}><div className="rounded-[30px] border border-zinc-200/80 bg-[#fbfaf8]/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"><div className="flex h-28 items-end gap-1.5">{[40,70,50,86,58,74,44].map((h, j) => <span key={j} className="flex-1 rounded-full bg-gradient-to-t from-zinc-950 to-sky-400 dark:from-white dark:to-sky-300" style={{ height: `${(h + i * 5) % 92}%` }} />)}</div><h3 className="mt-6 font-semibold">{model}</h3><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Expressive preset for production-ready speech.</p></div></Reveal>)}</div></div>
      </SectionShell>
      <SectionShell><div className="mx-auto max-w-7xl rounded-[38px] border border-zinc-200/80 bg-white/72 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.055] lg:p-12"><Reveal><Globe2 className="size-8 text-emerald-500" /><h2 className="mt-5 text-4xl font-semibold tracking-tight">Languages, with Uzbek first.</h2><p className="mt-4 max-w-2xl leading-8 text-zinc-600 dark:text-zinc-400">The interface is prepared for multilingual teams, but Uzbek is the primary language experience.</p></Reveal><div className="mt-10 flex flex-wrap gap-3">{["O'zbek - Primary", "Ўзбек - Cyrillic", "Qaraqalpaq", "English", "Русский", "Turkish"].map((lang, i) => <span key={lang} className={i === 0 ? "rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950" : "rounded-full border border-zinc-200 bg-white/70 px-5 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/[0.07]"}>{lang}</span>)}</div></div></SectionShell>
      <SectionShell className="bg-zinc-950 text-white"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><Reveal><Code2 className="size-8 text-sky-300" /><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Developer API built for product teams.</h2><p className="mt-5 leading-8 text-white/68">Generate speech, inspect status and route audio into apps with clean primitives.</p></Reveal><Reveal><pre className="overflow-hidden rounded-[30px] border border-white/10 bg-black/40 p-6 text-sm leading-7 text-sky-100 shadow-2xl"><code>{`await miralas.voice.generate({\n  language: "uz-Latn",\n  model: "narrator-pro",\n  text: "Assalomu alaykum, Miralas"\n})`}</code></pre></Reveal></div></SectionShell>
      <SectionShell><div className="mx-auto max-w-7xl"><Reveal className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Use Cases</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Made for the places voice matters.</h2></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cases.map((c) => <Reveal key={c}><div className="rounded-[28px] border border-zinc-200/80 bg-white/74 p-7 backdrop-blur-xl transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.055]"><Layers3 className="size-6 text-sky-500" /><h3 className="mt-5 text-xl font-semibold">{c}</h3><p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">Voice workflows designed for real teams, campaigns and products.</p></div></Reveal>)}</div></div></SectionShell>
      <SectionShell className="bg-white/70 dark:bg-zinc-950/55"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{["The Uzbek pronunciation feels intentional, not bolted on.", "The donation direction is exactly what creators need.", "The product feels like infrastructure, not a toy."].map((quote, i) => <Reveal key={quote}><article className="rounded-[30px] border border-zinc-200/80 bg-[#fbfaf8]/80 p-7 dark:border-white/10 dark:bg-white/[0.055]"><div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="size-4 fill-current" />)}</div><p className="mt-8 text-lg leading-8">{quote}</p><p className="mt-8 text-sm font-semibold">Customer {i + 1}</p></article></Reveal>)}</div></SectionShell>
      <SectionShell><div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-4">{stats.map(([v,l]) => <Reveal key={v}><div className="rounded-[30px] border border-zinc-200/80 bg-white/74 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"><p className="text-5xl font-semibold">{v}</p><p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{l}</p></div></Reveal>)}</div></SectionShell>
      <SectionShell className="bg-white/70 dark:bg-zinc-950/55"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{["Starter", "Growth", "Enterprise"].map((p, i) => <Reveal key={p}><div className={i === 1 ? "rounded-[32px] border border-sky-400/40 bg-zinc-950 p-7 text-white shadow-[0_35px_120px_-76px_rgba(14,165,233,0.9)]" : "rounded-[32px] border border-zinc-200/80 bg-[#fbfaf8]/80 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"}><h3 className="text-2xl font-semibold">{p}</h3><p className="mt-3 text-sm leading-7 opacity-70">A polished plan preview for launch, growth and scale.</p><p className="mt-8 text-4xl font-semibold">{i === 0 ? "Free" : i === 1 ? "$29" : "Custom"}</p><Link href="/pricing" className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-950 dark:bg-white dark:text-zinc-950">View Pricing</Link></div></Reveal>)}</div></SectionShell>
      <FAQ />
      <CTA />
    </div>
  );
}
