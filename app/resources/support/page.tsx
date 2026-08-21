"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  LifeBuoy,
  Mail,
  MessageSquare,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  X,
  Bot,
  User,
  ChevronUp,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

// ─── AI CHAT WIDGET ───
function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi there! I'm the Miralas AI assistant. Ask me anything about voice cloning, API setup, or billing." },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    // Mock AI response
    setTimeout(() => {
      setTyping(false);
      const lower = userMsg.toLowerCase();
      let reply = "Thanks for reaching out! For detailed help, please submit a support ticket and our team will assist you within 24 hours.";
      if (lower.includes("price") || lower.includes("cost") || lower.includes("billing")) {
        reply = "Miralas uses a pay-as-you-go model starting with $25 free credit. No subscription required. Check the pricing page for volume discounts.";
      } else if (lower.includes("api") || lower.includes("grpc") || lower.includes("sdk")) {
        reply = "We offer REST and gRPC APIs with SDKs for Node.js, Python, Go, and Rust. Docs are at console.miransas.com/docs.";
      } else if (lower.includes("clone") || lower.includes("voice")) {
        reply = "Voice cloning needs just 10 seconds of clean audio. Upload it in the Studio and we'll generate a custom voice in under a minute.";
      } else if (lower.includes("uzbek") || lower.includes("language")) {
        reply = "We support 28+ languages including Uzbek, Kazakh, Azerbaijani, and more. All built on top of our fine-tuned Chatterbox pipeline.";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        reply = "Hello! How can I help you with Miralas TTS today?";
      }
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[340px] h-[420px] rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-900 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-full bg-white/10">
                  <Bot className="size-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">AI Assistant</div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex size-7 items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "ai" ? "bg-gray-100" : "bg-gray-900"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <Bot className="size-3 text-gray-600" />
                    ) : (
                      <User className="size-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "ai"
                        ? "bg-gray-100 text-gray-800 rounded-bl-md"
                        : "bg-gray-900 text-white rounded-br-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <Bot className="size-3 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="size-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="size-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="size-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-gray-300 focus-within:bg-white transition-colors">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-gray-900 transition-colors"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 ${
          open
            ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
            : "bg-gray-900 text-white hover:bg-gray-800 shadow-gray-900/20"
        }`}
      >
        {open ? <ChevronUp className="size-5" /> : <MessageSquare className="size-5" />}
      </motion.button>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", topic: "General", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans ">
      {/* Header */}
       <Header variant="light"/>
      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* Heading */}
          <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <LifeBuoy className="size-3 text-gray-900" />
            Support Center
          </div>
        </div>
      </header>
        <div className="mb-14 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            How can we help?
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-xl leading-relaxed mx-auto lg:mx-0">
            Have questions about Miralas TTS, custom voice cloning, or enterprise gRPC integration? Drop us a message and our technical team will assist you.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Quick Resources */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 pl-1">
              Quick Resources
            </h2>

            <Link
              href="/resources/docs"
              className="block group rounded-2xl border border-gray-100 bg-gray-50/50 p-5 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-700 shadow-sm">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    Documentation
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Integration schemas, SDK guidelines, and core API specs.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/resources/guides"
              className="block group rounded-2xl border border-gray-100 bg-gray-50/50 p-5 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-700 shadow-sm">
                  <MessageSquare className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    Tutorials & Guides
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Step-by-step masterclasses on voice cloning and fine-tuning.
                  </p>
                </div>
              </div>
            </Link>

            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-700 shadow-sm">
                  <Mail className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email Support</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    For urgent infrastructure issues:
                  </p>
                  <a
                    href="mailto:support.miransas"
                    className="mt-2 inline-block text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500"
                  >
                    support.miransas
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Support Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h2 className="text-base font-semibold text-gray-900 mb-6">
                Send a Support Ticket
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="bg-gray-50 border border-gray-200 focus:border-gray-400 text-gray-900 text-sm rounded-xl py-3 px-4 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="bg-gray-50 border border-gray-200 focus:border-gray-400 text-gray-900 text-sm rounded-xl py-3 px-4 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Topic */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="bg-gray-50 border border-gray-200 focus:border-gray-400 text-gray-900 text-sm rounded-xl py-3 px-4 outline-none transition-all cursor-pointer"
                  >
                    <option value="General">General / Account Inquiry</option>
                    <option value="Voice-Cloning">Voice Cloning & Studio</option>
                    <option value="API-gRPC">API & gRPC Server Latency</option>
                    <option value="Billing">Billing & Subscription</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue or technical question in detail..."
                    className="bg-gray-50 border border-gray-200 focus:border-gray-400 text-gray-900 text-sm rounded-xl py-3 px-4 outline-none transition-all placeholder:text-gray-400 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <AlertCircle className="size-3.5 text-gray-400 shrink-0" />
                    <span>Response time is usually within 12-24 hours.</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg"
                  >
                    Submit Ticket
                  </button>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-700"
                    >
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      Your support ticket has been logged successfully. We will get back to you shortly!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Miransas Software. All rights reserved.
          </p>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AiChatWidget />

      <Footer/>
    </div>
  );
}