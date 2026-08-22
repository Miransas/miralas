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
  CheckCircle2
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Header variant="dark" />
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-8">
              The ultimate AI voice alert system for streamers.
            </h1>
            <div className="flex flex-col items-start gap-4">
              <button className="bg-white hover:bg-gray-200 text-black rounded-full px-8 py-4 text-lg font-medium transition-transform hover:scale-105 active:scale-95">
                Start monetizing for free
              </button>
              <p className="text-sm text-neutral-500 italic flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" /> Connect your accounts • Setup in 2 minutes
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:pt-4"
          >
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
              Engage your audience like never before. Connect YouTube, Twitch, and Kick to let premium AI voices read your donations, Super Chats, and memberships live on stream via a simple OBS browser source.
            </p>
          </motion.div>
        </div>

        {/* Hero Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="w-full aspect-video rounded-[2rem] overflow-hidden bg-neutral-900 border border-neutral-800 relative group shadow-2xl shadow-blue-900/10"
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
        </motion.div>
      </section>

      {/* 2. PLATFORM FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-neutral-800">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {features.map((feat) => (
            <motion.div
              variants={itemVariants}
              key={feat.id}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-neutral-600 hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${feat.gradient} flex items-center justify-center mb-6 border border-neutral-800`}>
                <div className="bg-[#0a0a0a] rounded-full p-3 shadow-md">
                  {feat.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feat.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. OBS INTEGRATION BLOG / GUIDE */}
      <section className="bg-neutral-900/30 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
                Zero software.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Just one URL in OBS.
                </span>
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                Forget about complex routing, virtual audio cables, or heavy desktop applications draining your CPU. Our cloud-based system renders the AI audio directly inside your broadcasting software.
              </p>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl mb-8">
                <p className="text-sm text-neutral-300 font-mono flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  OBS Pro Tip: Audio Control
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  Always check the <strong className="text-neutral-300">"Control audio via OBS"</strong> box in the browser source properties. This routes the AI voice through your OBS audio mixer, allowing you to easily adjust the donation volume or add filters without changing your desktop audio.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {obsSteps.map((step, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className="flex gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <div className="mt-1 bg-neutral-900 p-2 rounded-lg border border-neutral-800 h-fit">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-neutral-200 mb-1">{step.title}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight sticky top-24">
              Frequently<br />asked questions
            </h2>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col">
            {faqs.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="border-b border-neutral-800 last:border-0"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="text-xl font-medium text-neutral-200 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-neutral-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-neutral-400 leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}