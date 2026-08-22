"use client";
import { IconBrandTwitch, IconBrandYoutube } from "@tabler/icons-react";


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ChevronDown,

  Radio,
  MonitorPlay,
  Zap,
  Settings,
  Link as LinkIcon,
  CheckCircle2,
  ArrowRight,
  Plus
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SmoothScroll from "../../../components/providers/SmoothScroll";

// --- VERİLER ---

const features = [
  {
    id: 1,
    icon: <IconBrandYoutube className="w-6 h-6 text-red-500" />,
    title: "YouTube Integration",
    desc: "Super Chat & Membership alerts with natural AI voice reading in real-time.",
    gradient: "from-red-500/20 to-neutral-900"
  },
  {
    id: 2,
    icon: <Radio className="w-6 h-6 text-green-500" />,
    title: "Kick Donations",
    desc: "Stream donations with custom AI voice messages specifically tuned for your audience.",
    gradient: "from-green-500/20 to-neutral-900"
  },
  {
    id: 3,
    icon: <IconBrandTwitch className="w-6 h-6 text-purple-500" />,
    title: "Twitch Bits & Subs",
    desc: "Bits & Sub alerts with multilingual TTS. Never miss a supporter's message.",
    gradient: "from-purple-500/20 to-neutral-900"
  },
  {
    id: 4,
    icon: <MonitorPlay className="w-6 h-6 text-blue-500" />,
    title: "OBS Browser Source",
    desc: "One simple URL to paste into OBS or Streamlabs. Zero complex software required.",
    gradient: "from-blue-500/20 to-neutral-900"
  },
];

const obsSteps = [
  {
    icon: <LinkIcon className="w-5 h-5 text-blue-400" />,
    title: "1. Copy Your Widget URL",
    desc: "Log into your dashboard, customize your AI voice and alert design, then copy your unique secure widget link."
  },
  {
    icon: <MonitorPlay className="w-5 h-5 text-emerald-400" />,
    title: "2. Add Browser Source",
    desc: "Open OBS Studio, click the '+' icon in the Sources panel, select 'Browser', and name it 'AI Voice Alerts'."
  },
  {
    icon: <Settings className="w-5 h-5 text-purple-400" />,
    title: "3. Configure Settings",
    desc: "Paste your URL. Set Width to 800 and Height to 600. Check the 'Control audio via OBS' box to manage volume via your audio mixer."
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-rose-400" />,
    title: "4. Test & Go Live",
    desc: "Click 'Send Test Alert' from our dashboard. You'll hear the AI voice read a test donation directly in your OBS mixer."
  }
];

const faqs = [
  {
    question: "How do I connect this to my stream?",
    answer: "It's incredibly simple. Just log in, connect your Twitch, YouTube, or Kick accounts, copy your unique Widget URL, and add it as a 'Browser Source' in OBS Studio or Streamlabs. No extra software needed."
  },
  {
    question: "Does it read Super Chats and Bits automatically?",
    answer: "Yes! Once connected, our system listens for incoming Super Chats, Bits, Subscribes, and standard donations, instantly converting the attached messages into studio-quality AI voiceover on your stream."
  },
  {
    question: "Can I customize the alert visuals and voices?",
    answer: "Absolutely. You can choose from our extensive library of premium AI voices, adjust the reading speed, and fully customize how the alert box looks on your screen directly from the web dashboard."
  },
  {
    question: "Is there a delay when a donation happens?",
    answer: "Our ultra-low latency infrastructure ensures that donations are processed and synthesized into speech almost instantly, keeping your stream's interaction natural and real-time."
  },
];

// --- ANIMATION VARIANTS ---

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

// --- KOMPONENTLER ---

export default function StreamerLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
        <Header variant="dark" />
        {/* 1. HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
          {/* HERO COPY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                  AI voice alerts
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-medium tracking-[-0.04em] leading-[0.98] text-white">
                Turn every alert
                <br />
                into a moment.
              </h1>

              <p className="mt-7 max-w-2xl text-base md:text-lg leading-8 text-neutral-400">
                Let premium AI voices read donations, memberships, Super Chats and
                more live on stream — directly through OBS.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button className="bg-white hover:bg-neutral-200 text-black rounded-full px-7 py-3.5 text-sm md:text-base font-medium transition-all hover:scale-[1.03] active:scale-[0.98]">
                  Start monetizing for free
                </button>

                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Setup in under 2 minutes</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="rounded-[2rem] border border-neutral-800 bg-[#0a0a0a] p-6 md:p-7">
                <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Stream integration
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      Everything connected in one place
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/[0.06] px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-green-400">
                      Live
                    </span>
                  </div>
                </div>

                <div className="py-5 space-y-4">
                  {[
                    {
                      name: "Twitch",
                      detail: "Donations & subscriptions",
                      status: "Connected",
                    },
                    {
                      name: "YouTube",
                      detail: "Super Chats & memberships",
                      status: "Connected",
                    },
                    {
                      name: "Kick",
                      detail: "Tips & interactions",
                      status: "Connected",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm text-neutral-200">
                          {item.name}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          {item.detail}
                        </p>
                      </div>

                      <span className="text-[10px] uppercase tracking-wider text-neutral-600">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-[#080808] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      OBS Browser Source
                    </span>

                    <span className="font-mono text-[10px] text-neutral-700">
                      HTTPS
                    </span>
                  </div>

                  <div className="mt-2 font-mono text-xs text-neutral-400 truncate">
                    console.miralas.io/stream
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* VIDEO */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              type: "spring",
              bounce: 0.12,
            }}
            className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-neutral-900 border border-neutral-800 group"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dwdk20m6q/video/upload/14130907_1920_1080_30fps_zcdixc.mp4"
                type="video/mp4"
              />
            </video>

            {/* video overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute left-5 bottom-5 md:left-7 md:bottom-7">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                  Live voice alert
                </span>
              </div>
            </div>

            <div className="absolute right-5 bottom-5 md:right-7 md:bottom-7 hidden sm:block">
              <span className="rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1.5 text-[10px] font-mono text-white/60">
                1920 × 1080
              </span>
            </div>
          </motion.div>
        </section>

        {/* 2. PLATFORM FEATURES */}
        {/* 2. FEATURES */}
        <section className="max-w-7xl mx-auto px-6 py-28 border-t border-neutral-800">
          <div className="mb-14 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                Built for creators
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-medium tracking-tight text-white"
            >
              Everything you need
              <br />
              <span className="text-neutral-500">
                to make your stream sound better.
              </span>
            </motion.h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {features.map((feat, index) => (
              <motion.div
                variants={itemVariants}
                key={feat.id}
                className="group relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-[#0a0a0a] p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-neutral-700"
              >
                {/* ambient glow */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-tr ${feat.gradient} opacity-[0.08] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.18]`}
                />

                <div className="relative flex h-full flex-col">
                  {/* top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${feat.gradient} border border-white/10`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#090909] text-white">
                        {feat.icon}
                      </div>
                    </div>

                    <span className="font-mono text-xs tracking-[0.2em] text-neutral-600">
                      0{index + 1}
                    </span>
                  </div>

                  {/* content */}
                  <div className="mt-10 max-w-xl">
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {feat.title}
                    </h3>

                    <p className="mt-3 max-w-lg text-[15px] leading-7 text-neutral-400">
                      {feat.desc}
                    </p>
                  </div>

                  {/* bottom */}
                  <div className="mt-10 flex items-center justify-between border-t border-neutral-800 pt-5">
                    <span className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                      Miralas
                    </span>

                    <div className="flex items-center gap-2 text-xs text-neutral-500 transition-colors group-hover:text-neutral-300">
                      <span>Built into the platform</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. OBS INTEGRATION */}
        <section className="border-y border-neutral-800 bg-[#070707]">
          <div className="max-w-7xl mx-auto px-6 py-28">
            {/* heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-16"
            >
              <span className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                OBS integration
              </span>

              <h2 className="mt-5 text-4xl md:text-6xl font-medium tracking-tight text-white">
                One URL.
                <br />
                <span className="text-neutral-500">
                  That&apos;s all OBS needs.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">
                No virtual cables. No desktop bridge. No extra software running in the
                background. Add the Miralas source once and let OBS handle the rest.
              </p>
            </motion.div>

            {/* main setup card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-[#0a0a0a]"
            >
              {/* glow */}
              <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/[0.07] blur-3xl" />
              <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-purple-500/[0.05] blur-3xl" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12">
                {/* left info */}
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-neutral-800 p-7 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Browser Source
                      </p>
                      <p className="text-xs text-neutral-600">
                        Native OBS integration
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                    Add Miralas directly
                    <br />
                    to your scene.
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-neutral-500">
                    Miralas runs through an OBS Browser Source, so the generated voice
                    becomes part of your scene without touching your desktop audio.
                  </p>

                  <div className="mt-10 space-y-6">
                    {obsSteps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex gap-4"
                      >
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-mono text-neutral-400">
                          {String(idx + 1).padStart(2, "0")}

                          {idx !== obsSteps.length - 1 && (
                            <span className="absolute left-1/2 top-full h-6 w-px -translate-x-1/2 bg-neutral-800" />
                          )}
                        </div>

                        <div className="pt-0.5">
                          <h4 className="text-sm font-medium text-neutral-200">
                            {step.title}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-neutral-500">
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* right visual */}
                <div className="lg:col-span-7 p-6 md:p-10">
                  <div className="h-full rounded-3xl border border-neutral-800 bg-[#080808] overflow-hidden">
                    {/* fake browser header */}
                    <div className="flex h-12 items-center gap-2 border-b border-neutral-800 px-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neutral-800" />

                      <div className="ml-4 flex-1 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5">
                        <span className="font-mono text-[10px] text-neutral-600">
                          console.miralas.io/embed/stream
                        </span>
                      </div>
                    </div>

                    {/* fake OBS panel */}
                    <div className="p-5 md:p-7">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
                            OBS Studio
                          </p>
                          <p className="mt-1 text-sm text-neutral-300">
                            Browser Source
                          </p>
                        </div>

                        <span className="rounded-full border border-green-500/20 bg-green-500/[0.07] px-2.5 py-1 text-[10px] uppercase tracking-wider text-green-400">
                          Connected
                        </span>
                      </div>

                      {/* source url */}
                      <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs text-neutral-500">
                            URL
                          </span>

                          <span className="font-mono text-[10px] text-neutral-700">
                            HTTPS
                          </span>
                        </div>

                        <div className="rounded-xl border border-neutral-800 bg-black px-4 py-3">
                          <span className="font-mono text-xs text-neutral-400">
                            https://console.miralas.io/embed/stream
                          </span>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-neutral-800 bg-black p-4">
                            <p className="text-[10px] uppercase tracking-wider text-neutral-600">
                              Width
                            </p>
                            <p className="mt-1 text-sm text-neutral-300">
                              1920
                            </p>
                          </div>

                          <div className="rounded-xl border border-neutral-800 bg-black p-4">
                            <p className="text-[10px] uppercase tracking-wider text-neutral-600">
                              Height
                            </p>
                            <p className="mt-1 text-sm text-neutral-300">
                              1080
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* audio control */}
                      <div className="mt-4 rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-neutral-200">
                              Control audio via OBS
                            </p>
                            <p className="mt-1 text-xs leading-5 text-neutral-600">
                              Send the generated voice directly into the OBS mixer.
                            </p>
                          </div>

                          <div className="relative h-6 w-11 shrink-0 rounded-full border border-neutral-700 bg-neutral-800">
                            <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                          </div>
                        </div>
                      </div>

                      {/* status */}
                      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-neutral-800 bg-[#0d0d0d] px-5 py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/[0.08]">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-neutral-300">
                            Audio is being routed through OBS
                          </p>
                          <p className="text-[11px] text-neutral-600">
                            You can now control volume, filters and monitoring.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* bottom tips */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "No extra software",
                  desc: "Everything runs directly through the browser source.",
                },
                {
                  title: "Native audio control",
                  desc: "Use the OBS mixer for volume, filters and monitoring.",
                },
                {
                  title: "Low overhead",
                  desc: "No virtual audio cable or background desktop app.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-neutral-800 bg-[#0a0a0a] p-5"
                >
                  <div className="mb-4 font-mono text-[10px] tracking-[0.18em] text-neutral-700">
                    0{index + 1}
                  </div>

                  <h4 className="text-sm font-medium text-neutral-200">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* 4. FAQ SECTION */}

        <section className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <div className="sticky top-24">
                  <span className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                    FAQ
                  </span>

                  <h2 className="mt-5 text-4xl md:text-5xl font-medium tracking-tight text-white">
                    Questions,
                    <br />
                    answered.
                  </h2>

                  <p className="mt-6 max-w-sm text-base leading-7 text-neutral-500">
                    Everything you need to know about using Miralas with your stream,
                    OBS, audio setup, and AI voices.
                  </p>

                  {/* mini info card */}
                  <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-800 bg-[#0a0a0a] p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-neutral-200">
                          Ready to go
                        </p>
                        <p className="text-xs text-neutral-500">
                          No desktop software required
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* right */}
              <div className="lg:col-span-8">
                <div className="rounded-[2rem] border border-neutral-800 bg-[#0a0a0a] overflow-hidden">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-neutral-800 last:border-b-0"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaq(isOpen ? null : index)
                          }
                          className="flex w-full items-center justify-between gap-6 px-6 py-6 md:px-8 text-left"
                        >
                          <div className="flex items-start gap-5">
                            <span className="pt-1 font-mono text-[11px] tracking-[0.18em] text-neutral-600">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span
                              className={`text-lg md:text-xl font-medium transition-colors ${isOpen
                                ? "text-white"
                                : "text-neutral-300 group-hover:text-white"
                                }`}
                            >
                              {faq.question}
                            </span>
                          </div>

                          <motion.div
                            animate={{
                              rotate: isOpen ? 45 : 0,
                            }}
                            transition={{ duration: 0.25 }}
                            className="shrink-0"
                          >
                            <Plus className="h-5 w-5 text-neutral-500" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-7 pl-[4.5rem] pr-8 md:px-8 md:pl-[5.5rem] md:pr-12">
                                <p className="max-w-2xl text-[15px] leading-7 text-neutral-500">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </SmoothScroll>
  );
}