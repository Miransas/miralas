"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { CONTACT_DATA } from "@/constants/index";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: CONTACT_DATA.budgetOptions[0],
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        budget: CONTACT_DATA.budgetOptions[0],
        subject: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <section className="min-h-screen bg-background font-sans text-foreground py-12 md:py-20">
      <main className="mx-auto max-w-[1400px] px-6">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-16"
        >
          {/* HEADER */}
          <motion.div variants={itemVariants} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{CONTACT_DATA.header.badge}</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.08]">
              {CONTACT_DATA.header.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {CONTACT_DATA.header.description}
            </p>
          </motion.div>

          {/* DEPARTMENTS */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CONTACT_DATA.departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.title}
                  className="group flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
                >
                  <div>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {Icon ? <Icon className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {dept.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                  <a
                    href={`mailto:${dept.email}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    <span>{dept.email}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              );
            })}
          </motion.div>

          {/* FORM & LOCATIONS */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">

            {/* FORM */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 md:p-10 shadow-xl shadow-black/5 dark:shadow-black/20"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Send a Message
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Share your project details, goals, or inquiries below.
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-12 w-12 mb-3 shrink-0" />
                  <h3 className="text-lg font-semibold">Message Received</h3>
                  <p className="mt-1 text-xs max-w-md leading-relaxed opacity-90">
                    Thank you for reaching out. A team member will review your message and respond shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 rounded-xl border border-emerald-500/30 bg-background px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="e.g. Design System & Product Design"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      >
                        {CONTACT_DATA.budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Project Details & Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Briefly describe your objectives, scope, or timeline..."
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-4 text-sm font-semibold text-background shadow-sm transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* HUBS & PRESENCE */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">

              <div className="rounded-3xl border border-border/80 bg-muted/30 p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {CONTACT_DATA.presence.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {CONTACT_DATA.presence.description}
                  </p>
                </div>

                <div className="space-y-6 divide-y divide-border/60">
                  {CONTACT_DATA.presence.hubs.map((hub) => (
                    <div key={hub.location} className="pt-6 first:pt-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground">
                          {hub.location}
                        </span>
                        <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                          {hub.status}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <Globe className="h-4 w-4 text-foreground/70 shrink-0 mt-0.5" />
                        <span>{hub.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <MessageSquare className="h-4 w-4" />
                  <span>Direct Contact</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prefer direct email over forms? Reach out directly to{" "}
                  <a
                    href="mailto:hello@miransas.com"
                    className="font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    hello@miransas.com
                  </a>
                </p>
              </div>

            </motion.div>

          </div>

          {/* FAQS */}
          <motion.div
            variants={itemVariants}
            className="pt-12 border-t border-border/60"
          >
            <div className="mb-8 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {CONTACT_DATA.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border/60 bg-card p-6 space-y-2"
                >
                  <h4 className="text-sm font-semibold text-foreground">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

      </main>
    </section>
  );
}
