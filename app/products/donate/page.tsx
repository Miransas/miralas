/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Heart,
  Zap,
  Radio,
  MessageCircle,
  Volume2,
  ShieldCheck,
  Gauge,
  Cpu,
  Code2,
  Server,
  Wifi,
  ArrowRight,

  ExternalLink,
  Coins,
  Users,
  Activity,
  TrendingUp,
  Mic,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";

// ============================================================
// TYPES
// ============================================================
interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TechItem {
  icon: React.ElementType;
  name: string;
  role: string;
}

// ============================================================
// MOCK DATA
// ============================================================
const STATS: StatItem[] = [
  { icon: Coins, value: "₺2.4M+", label: "Total Donations" },
  { icon: Users, value: "12,800+", label: "Active Creators" },
  { icon: Activity, value: "450K+", label: "AI Reads / Month" },
  { icon: TrendingUp, value: "<50ms", label: "Latency" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Heart,
    title: "Make a Donation",
    description:
      "Viewers send live donations to the stream. Instant payments by credit card, bank transfer, or crypto.",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    step: "02",
    icon: Volume2,
    title: "AI Reads It Aloud",
    description:
      "The donation amount and message are read by Miralas AI TTS with a voice that feels natural, expressive, and live.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    step: "03",
    icon: Radio,
    title: "Reaches the Creator",
    description:
      "With gRPC streaming, the donation and voice message reach the creator with <50ms latency. Real-time, seamless, reliable.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
];

const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description:
      "A Rust + gRPC streaming architecture keeps donation-to-creator delivery under 50 milliseconds.",
  },
  {
    icon: Mic,
    title: "Natural AI Voice",
    description:
      "Miralas TTS reads donation messages with expressive, fluid voice quality that sounds human.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "PCI-DSS compliant payment infrastructure. All transactions are encrypted with SSL/TLS and protected by 3D Secure.",
  },
  {
    icon: Gauge,
    title: "High Performance",
    description:
      "The Rust-based backend can process thousands of concurrent donations smoothly, combining memory safety with speed.",
  },
  {
    icon: MessageCircle,
    title: "Customizable Messages",
    description:
      "Viewers can add custom messages to donations. AI can read them in a happy, serious, or energetic tone.",
  },
  {
    icon: Wifi,
    title: "Real-Time Notifications",
    description:
      "WebSocket + gRPC duplex streaming. Donations appear instantly on screen while voice playback starts in sync.",
  },
];

const TECH_STACK: TechItem[] = [
  { icon: Code2, name: "Rust", role: "Backend & gRPC Server" },
  { icon: Server, name: "gRPC + Tonic", role: "High-Performance RPC" },
  { icon: Wifi, name: "WebSocket", role: "Real-time Streaming" },
  { icon: Cpu, name: "Miralas TTS API", role: "AI Voice Synthesis" },
  { icon: ShieldCheck, name: "PostgreSQL", role: "Persistent Storage" },
  { icon: Zap, name: "Redis", role: "In-Memory Cache & Queue" },
];

// ============================================================
// ANIMATION
// ============================================================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ============================================================
// COMPONENTS
// ============================================================
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ---- Counter (Animated) ---- */
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-3xl sm:text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </motion.div>
  );
}

/* ---- Step Card ---- */
function StepCard({
  step,
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  borderColor,
  index,
}: {
  step: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50",
        borderColor,
      )}
    >
      {/* Step number in the background */}
      <span
        className={cn(
          "absolute -right-4 -top-6 text-8xl font-black opacity-[0.06] select-none",
          color,
        )}
      >
        {step}
      </span>

      <div className="relative z-10">
        <div
          className={cn(
            "mb-5 flex size-14 items-center justify-center rounded-2xl",
            bgColor,
          )}
        >
          <Icon className={cn("size-7", color)} />
        </div>

        <span
          className={cn(
            "inline-block mb-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase",
            bgColor,
            color,
          )}
        >
          Step {step}
        </span>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ---- Feature Card ---- */
function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition-colors group-hover:bg-gray-900 group-hover:text-white">
        <Icon className="size-5" />
      </div>
      <h4 className="text-base font-semibold text-gray-900 mb-1">
        {feature.title}
      </h4>
      <p className="text-sm text-gray-500 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

/* ---- Tech Stack Card ---- */
function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  const Icon = tech.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-gray-50 text-gray-700 shrink-0">
        <Icon className="size-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{tech.name}</h4>
        <p className="text-xs text-gray-400">{tech.role}</p>
      </div>
    </motion.div>
  );
}

/* ---- Donation Form ---- */
function DonationForm() {
  const [amount, setAmount] = useState<string>("100");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const presetAmounts = ["50", "100", "250", "500", "1000"];

  const handleCopyWallet = () => {
    navigator.clipboard.writeText("miralas-donate-wallet-address");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm"
    >
      <div className="absolute -top-20 -right-20 size-48 rounded-full bg-rose-50 blur-3xl opacity-60" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg">
            <Heart className="size-7" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Support the Project
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Your donations help us make Miralas Donate better. Every
            contribution matters.
          </p>
        </div>

        {/* Amount selection */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
            Donation Amount (₺)
          </label>
          <div className="grid grid-cols-5 gap-2 mb-3">
            {presetAmounts.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={cn(
                  "h-10 rounded-xl text-sm font-medium transition-all",
                  amount === a
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200",
                )}
              >
                {a}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter a custom amount"
            className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
            Your Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message you want to send to the creator..."
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition resize-none"
          />
        </div>

        {/* CTA */}
        <button className="w-full h-12 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5 mb-4">
          <span className="flex items-center justify-center gap-2">
            <Heart className="size-4 fill-rose-400 text-rose-400" />
            Donate — ₺{amount}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Crypto / Wallet */}
        <div className="mt-4">
          <button
            onClick={handleCopyWallet}
            className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy Wallet Address
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Donation Feed (Live donation feed simulation) ---- */
function DonationFeed() {
  const [donations, setDonations] = useState([
    { name: "Alex K.", amount: "₺250", message: "Great project, keep going!", time: "2s" },
    { name: "Emma Y.", amount: "₺100", message: "The AI voice sounds so real", time: "12s" },
    { name: "Can M.", amount: "₺500", message: "Rust + gRPC", time: "35s" },
    { name: "Zoe A.", amount: "₺50", message: "Best of luck", time: "1m" },
    { name: "Ben T.", amount: "₺1000", message: "You are doing amazing work", time: "2m" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const names = ["Mason", "Ava", "Deniz", "Kaan", "Selen", "Ozan", "Nora", "Evan"];
      const msgs = [
        "Excellent!",
        "Looking forward to more",
        "The AI voice is great",
        "Wishing you success",
        "Great project",
        "Congrats",
        "My first donation",
      ];
      const newDonation = {
        name: names[Math.floor(Math.random() * names.length)] + " " + String.fromCharCode(65 + Math.floor(Math.random() * 26)) + ".",
        amount: "₺" + [50, 100, 250, 500][Math.floor(Math.random() * 4)],
        message: msgs[Math.floor(Math.random() * msgs.length)],
        time: "now",
      };
      setDonations((prev) => [newDonation, ...prev.slice(0, 6)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="absolute -bottom-20 -left-20 size-48 rounded-full bg-indigo-50 blur-3xl opacity-60" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Live Donation Feed</h3>
          <span className="ml-auto text-xs text-gray-400">Real-time gRPC stream</span>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {donations.map((d, i) => (
              <motion.div
                key={d.name + d.time + i}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 rounded-xl bg-gray-50 p-3.5"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xs font-bold shrink-0">
                  {d.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      {d.name}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 shrink-0">
                      {d.amount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{d.message}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{d.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
        <Header variant="light"/>
      {/* ===================== HERO (Video) ===================== */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Video background */}
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-cover"
            poster="/videos/studio_hero.mp4"
          >
            {/* The user can place their own video here */}
            <source src="/videos/studio_hero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Bottom gradient for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Live Donations and AI Voice Reading
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Make Donations <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Live</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              When your viewers send donations to the stream, Miralas AI reads
              them aloud instantly. Rust + gRPC delivers 50ms latency for thousands of concurrent donations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#donate"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-gray-900 shadow-xl hover:bg-gray-100 transition-all hover:-translate-y-0.5"
              >
                <Heart className="size-4 text-rose-500 fill-rose-500" />
                Donate
              </a>
              <a
                href="https://github.com/miralas/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 text-sm font-medium text-white hover:bg-white/20 transition-all"
              >
                {/* <Github className="size-4" /> */}
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] font-medium uppercase tracking-widest">Scroll Down</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="py-12 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS (3 Cards) ===================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              In three simple steps, your donation reaches the creator and is read aloud by AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <StepCard key={step.step} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Miralas Donate?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A high-performance Rust backend, real-time AI voice, and secure payment infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== TECH STACK ===================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm mb-6">
                <Cpu className="size-3.5 text-indigo-500" />
                Open Source
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Built with Rust + gRPC
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                The backend is written entirely in Rust. Duplex streaming runs through
                gRPC (Tonic), with PostgreSQL persistent storage, Redis cache, and queue management.
                Memory safety, high performance, and low latency work together.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Maximum performance with zero-cost abstractions",
                  "Async bidirectional streaming with gRPC Tonic",
                  "Thousands of concurrent connections with the Tokio runtime",
                  "Open source - review it on GitHub and contribute",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://github.com/miralas/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors group"
              >
                {/* <Github className="size-4" /> */}
                View GitHub Repository
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {TECH_STACK.map((t, i) => (
                <TechCard key={t.name} tech={t} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== DONATION + LIVE FEED ===================== */}
      <section id="donate" className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Support Now
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Donate and see your message read aloud live by AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <DonationForm />
            </div>
            <div className="lg:col-span-3">
              <DonationFeed />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER CTA ===================== */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 p-10 sm:p-16 text-center"
          >
            <div className="absolute -top-20 -right-20 size-64 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Contribute to the Project
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
                You can contribute with code, design, documentation, or donations.
                We are building for the open-source community.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/miralas/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-gray-900 shadow-xl hover:bg-gray-100 transition-all hover:-translate-y-0.5"
                >
                  {/* <Github className="size-4" /> */}
                  Star on GitHub
                </a>
                <a
                  href="https://console.miralas/auth"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 text-sm font-medium text-white hover:bg-white/20 transition-all"
                >
                  <ExternalLink className="size-4" />
                  Documentation
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
