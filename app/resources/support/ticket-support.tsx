"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Tag,
  Send,
  CheckCircle2,
  ArrowLeft,
  Hash,
  ChevronDown
} from "lucide-react";

export default function SupportTicket() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; email: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş ticket oluşturma süreci
    setTimeout(() => {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket({
        id: `#MRS-${randomId}`,
        email: formState.email,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormState({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex"
          >
            <Link
              href="/resources/help-center"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-400 shadow-sm  hover:text-stone-700 dark:hover:text-stone-200 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Help Center
            </Link>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-5"
          >
            Submit a Support Ticket
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-stone-700 dark:text-stone-400 max-w-lg mx-auto leading-relaxed"
          >
            Have a technical issue or billing question? Fill out the form below and our team will get back to you shortly.
          </motion.p>
        </div>
      </section>

      {/* Main Content / Form Section */}
      <main className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl border border-white/10 dark:border-white/10 bg-white dark:bg-black p-8 sm:p-12 shadow-xl shadow-stone-200/40 dark:shadow-none relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {submittedTicket ? (
              /* Başarılı Gönderim Ekranı */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10"
              >
                <div className="size-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-white/10 dark:border-emerald-500/20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="size-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-3">
                  Ticket Successfully Created!
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
                  We've received your request and assigned an automatic tracking number. A confirmation has been sent to <span className="font-semibold text-zinc-900 dark:text-zinc-200">{submittedTicket.email}</span>.
                </p>

                <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-mono text-sm font-bold mb-10 shadow-inner">
                  <Hash className="size-4 text-indigo-500" />
                  <span>Ticket ID: {submittedTicket.id}</span>
                </div>

                <div>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-stone-900 px-8 py-3.5 text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Ticket Formu */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* İsim Alanı */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      Your Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-stone-400 group-focus-within:text-green-500 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Sardor Azimov"
                        className="w-full h-14 rounded-2xl border border-stone-200 dark:border-white/10 bg-zinc-50 dark:bg-black pl-11 pr-4 text-sm text-stone-900 dark:text-white shadow-sm outline-none transition-all placeholder:text-stone-400 focus:border-green-500 focus:bg-white dark:focus:bg-black focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>

                  {/* E-posta Alanı */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="sardor@miransas.com"
                        className="w-full h-14 rounded-2xl border border-stone-200 dark:border-white/10 bg-zinc-50 dark:bg-black pl-11 pr-4 text-sm text-stone-900 dark:text-white shadow-sm outline-none transition-all placeholder:text-stone-400 focus:border-green-500 focus:bg-white dark:focus:bg-black focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Konu / Kategori Seçimi */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    Topic / Category
                  </label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-stone-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none z-10" />
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full h-14 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black pl-11 pr-10 text-sm text-stone-900 dark:text-white shadow-sm outline-none transition-all focus:border-green-500 focus:bg-white dark:focus:bg-black focus:ring-4 focus:ring-green-500/10 appearance-none cursor-pointer relative"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="billing">Billing & Subscriptions</option>
                      <option value="voice">Voice Cloning & TTS Models</option>
                      <option value="api">API & Technical Integration</option>
                      <option value="security">Security & Compliance</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                {/* Mesaj Alanı */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    Message Details
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your issue or question in detail..."
                      className="w-full rounded-2xl border border-white/10 dark:border-white/10 bg-zinc-50 dark:bg-black p-4 text-sm text-stone-900 dark:text-white shadow-sm outline-none transition-all placeholder:text-stone-400 focus:border-green-500 focus:bg-white dark:focus:bg-black focus:ring-4 focus:ring-green-500/10 resize-none"
                    />
                  </div>
                </div>

                {/* Gönder Butonu */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-lime-600 hover:bg-lime-500 text-white dark:bg-lime-700 dark:hover:bg-lime-400 dark:text-stone-950 h-14 text-sm font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-4 border-2 border-white/20 border-t-white dark:border-zinc-900/20 dark:border-t-zinc-900 rounded-full animate-spin" />
                      Generating Ticket...
                    </span>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>Submit Support Ticket</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-6">
                  By submitting this ticket, you agree to Miralas support terms and privacy policies.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}