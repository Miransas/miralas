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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans ">
      <Header variant="dark"/>
      <div className="max-w-5xl mx-auto space-y-8 mt-20">
        {/* Header & Tabs */}
        <div className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight">Voice</h1>
          <p className="text-neutral-400 text-sm">
            Convert between text and speech with our models
          </p>

          <div className="flex items-center gap-2 pt-2">
            {["Text-to-speech", ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#1a1a1a] text-white"
                    : "text-neutral-400 hover:text-neutral-200"
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
            <p className="text-xs text-neutral-500 mt-1">or enter any custom text</p>
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
        <div className="flex items-center justify-between border border-red-900/40 bg-[#1a0f0f]/80 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-red-500" />
            <p className="text-sm">
              <span className="font-semibold text-white">Please log in.</span>
              <span className="text-neutral-400 ml-1">Nothing works here; you definitely need to log in.</span>
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors"
          >
            Giriş Yap
          </button>
        </div>

        {/* Editor Box */}
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-4 flex flex-col gap-4 relative">
          
          {/* Top Toolbar */}
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              {/* Voice Selector */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('voice')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-neutral-800 rounded-lg text-sm hover:bg-neutral-800 transition-colors"
                >
                  <Activity size={14} className="text-neutral-400" />
                  Ara · Multilingual
                </button>
              </div>

              {/* Add Effects */}
              <button 
                onClick={() => toggleDropdown('effects')}
                className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-neutral-800 rounded-lg text-sm hover:bg-neutral-900 transition-colors"
              >
                <Plus size={14} className="text-neutral-400" />
                Add effects
              </button>

              {/* Settings */}
              <button 
                onClick={() => toggleDropdown('settings')}
                className="flex items-center gap-1 px-3 py-1.5 bg-transparent text-neutral-400 text-sm hover:text-neutral-200 transition-colors"
              >
                1.0x · Balanced · MP3
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Regenerate Button -> Triggers Login Modal */}
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              <RefreshCw size={14} />
              Regenerate
            </button>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full bg-transparent text-neutral-200 text-sm resize-none outline-none min-h-[160px] leading-relaxed"
            defaultValue="Turn your ideas into voice with Miralas. A voice AI infrastructure designed for text-to-speech, voice cloning, and real-time workflows for content creators."
            spellCheck="false"
          />

          {/* Bottom Footer */}
          <div className="flex items-end justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-neutral-800 rounded-full">
              <span>Trace ID <span className="font-mono text-neutral-400">6a95ef25...c142</span></span>
              <Copy size={12} className="cursor-pointer hover:text-white" />
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono">216 / 15.000</span>
              {/* <button className="flex items-center gap-2 px-3 py-1.5 border border-neutral-800 rounded-full hover:bg-neutral-900 transition-colors text-white">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#141414] border border-neutral-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-semibold text-white">Sign in required</h2>
                <p className="text-sm text-neutral-400">
                  You must be logged in to test the models and use the voice generation features.
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-2.5 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
                  Continue with Google
                </button>
                <button className="w-full py-2.5 rounded-xl bg-[#2a2a2a] text-white font-medium hover:bg-[#333] transition-colors">
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
    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-transparent hover:bg-neutral-900 transition-colors">
      {icon}
      <span className="text-sm text-neutral-300">{text}</span>
    </button>
  );
}