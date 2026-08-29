"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Tag,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowLeft,
  LifeBuoy,
  Clock,
  ShieldCheck,
  Hash
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

    // Simüle edilmiş ticket oluşturma süreci (API çağrısı yeri)
    setTimeout(() => {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket({
        id: `#MRS-${randomId}`,
        email: formState.email,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormState({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#c9a87c]/30">
       

        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-[#c9a87c]/[0.07] blur-[90px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex"
            >
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm hover:border-[#c9a87c] transition-colors"
              >
                <ArrowLeft className="size-3 text-amber-600" />
                Back to Help Center
              </Link>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              Submit a Support Ticket
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed"
            >
              Have a technical issue or billing question? Fill out the form below and our team will get back to you shortly.
            </motion.p>
          </div>
        </section>

        {/* Main Content / Form Section */}
        <main className="mx-auto max-w-3xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {submittedTicket ? (
                /* Başarılı Gönderim Ekranı & Otomatik Ticket ID */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                >
                  <div className="size-16 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Ticket Successfully Created!</h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                    We've received your request and assigned an automatic tracking number. A confirmation has been sent to <span className="font-semibold text-foreground">{submittedTicket.email}</span>.
                  </p>

                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-muted border border-border text-foreground font-mono text-sm font-bold mb-8 shadow-inner">
                    <Hash className="size-4 text-amber-600" />
                    <span>Ticket ID: {submittedTicket.id}</span>
                  </div>

                  <div>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90 transition-colors shadow-sm"
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
                      <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Sardor Azimov"
                          className="w-full h-13 rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-[#c9a87c] focus:bg-card focus:ring-2 focus:ring-[#c9a87c]/20"
                        />
                      </div>
                    </div>

                    {/* E-posta Alanı */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="sardor@miransas.com"
                          className="w-full h-13 rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-[#c9a87c] focus:bg-card focus:ring-2 focus:ring-[#c9a87c]/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Konu / Kategori Seçimi */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Topic / Category
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full h-13 rounded-2xl border border-border bg-background pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-all focus:border-[#c9a87c] focus:bg-card focus:ring-2 focus:ring-[#c9a87c]/20 appearance-none cursor-pointer"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="billing">Billing & Subscriptions</option>
                        <option value="voice">Voice Cloning & TTS Models</option>
                        <option value="api">API & Technical Integration</option>
                        <option value="security">Security & Compliance</option>
                      </select>
                    </div>
                  </div>

                  {/* Mesaj Alanı */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Message Details
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Describe your issue or question in detail..."
                        className="w-full rounded-2xl border border-border bg-background p-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-[#c9a87c] focus:bg-card focus:ring-2 focus:ring-[#c9a87c]/20 resize-none"
                      />
                    </div>
                  </div>

                  {/* Gönder Butonu */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-primary h-13 text-sm font-semibold text-foreground hover:opacity-90 transition-all shadow-md disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="size-4 border-2 border-border border-t-white rounded-full animate-spin" />
                        Generating Ticket...
                      </span>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>Submit Support Ticket</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By submitting this ticket, you agree to Miralas support terms and privacy policies.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </main>

       
      </div>
    </>
  );
}