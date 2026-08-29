/* eslint-disable react-hooks/purity */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  RefreshCw,
  Code,
  Plus,
  ChevronDown,
  X,
  Copy,
  Activity,
  Mic,
  Zap,
  Headphones,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

export default function VoiceInterface() {
  const [activeTab, setActiveTab] = useState("Text-to-speech");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-sans ">
      <Header />
      <div className="max-w-5xl mx-auto space-y-8 mt-20">
        {/* Header & Tabs */}
        <div className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight">Voice</h1>
          <p className="text-muted-foreground text-sm">
            Convert between text and speech with our models
          </p>

          <div className="flex items-center gap-2 pt-2">
            {["Text-to-speech", ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Examples Section */}
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="text-center">
            <h3 className="text-sm font-medium">Pick an example to generate</h3>
            <p className="text-xs text-muted-foreground mt-1">or enter any custom text</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Badge icon={<Heart size={14} className="text-orange-500" />} text="Support" />
            {/* <Badge icon={<TrendingUp size={14} className="text-emerald-500" />} text="Sales" />
            <Badge icon={<Mic size={14} className="text-purple-500" />} text="Podcast" />
            <Badge icon={<Zap size={14} className="text-yellow-500" />} text="Announcement" /> */}
            <Badge icon={<Headphones size={14} className="text-blue-500" />} text="Meditation" />
          </div>
        </div>

        {/* Login Required Banner */}
        <div className="flex items-center justify-between border border-destructive/40 bg-destructive/10 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-red-500" />
            <p className="text-sm">
              <span className="font-semibold text-foreground">Please log in.</span>
              <span className="text-muted-foreground ml-1">Nothing works here; you definitely need to log in.</span>
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
          >
            Giriş Yap
          </button>
        </div>

        {/* Editor Box */}
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-4 relative">

          {/* Top Toolbar */}
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              {/* Voice Selector */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('voice')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-sm hover:bg-accent transition-colors"
                >
                  <Activity size={14} className="text-muted-foreground" />
                  Ara · Multilingual
                </button>
              </div>

              {/* Add Effects */}
              <button
                onClick={() => toggleDropdown('effects')}
                className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-border rounded-lg text-sm hover:bg-accent transition-colors"
              >
                <Plus size={14} className="text-muted-foreground" />
                Add effects
              </button>

              {/* Settings */}
              <button
                onClick={() => toggleDropdown('settings')}
                className="flex items-center gap-1 px-3 py-1.5 bg-transparent text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                1.0x · Balanced · MP3
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Regenerate Button -> Triggers Login Modal */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={14} />
              Regenerate
            </button>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full bg-transparent text-foreground text-sm resize-none outline-none min-h-[160px] leading-relaxed"
            defaultValue="Turn your ideas into voice with Miralas. A voice AI infrastructure designed for text-to-speech, voice cloning, and real-time workflows for content creators."
            spellCheck="false"
          />

          {/* Bottom Footer */}
          <div className="flex items-end justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full">
              <span>Trace ID <span className="font-mono text-muted-foreground">6a95ef25...c142</span></span>
              <Copy size={12} className="cursor-pointer hover:text-foreground" />
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="font-mono">216 / 15.000</span>
              {/* <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full hover:bg-accent transition-colors text-foreground">
                <Code size={14} />
                View code
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS & DROPDOWNS --- */}

      {/* Login Modal Overlay (Framer Motion) */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-popover border border-border p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-semibold text-foreground">Sign in required</h2>
                <p className="text-sm text-muted-foreground">
                  You must be logged in to test the models and use the voice generation features.
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                  Continue with Google
                </button>
                <button className="w-full py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors">
                  Continue with Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
     <div className="mt-20"> <Footer/></div>
    </div>
  );
}

// Reusable Badge Component for Examples
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-transparent hover:bg-accent transition-colors">
      {icon}
      <span className="text-sm text-foreground">{text}</span>
    </button>
  );
}