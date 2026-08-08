"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

const customers = [
  {
    name: "BilimLab",
    category: "Education",
    initials: "BL",
    quote:
      "Miransas helped us turn Uzbek learning content into a much more natural listening experience.",
    person: "Product team",
  },
  {
    name: "Ovoza",
    category: "Creators",
    initials: "OV",
    quote:
      "The creator workflow feels designed around real people instead of forcing creators into a generic platform.",
    person: "Creator platform",
  },
  {
    name: "Payme Studio",
    category: "Customer Experience",
    initials: "PS",
    quote:
      "Localized voice experiences became much easier to imagine as a real product feature.",
    person: "CX team",
  },
  {
    name: "Najot",
    category: "Education",
    initials: "NJ",
    quote:
      "The focus on Uzbek from the beginning makes a meaningful difference.",
    person: "Learning team",
  },
  {
    name: "UzEdu",
    category: "EdTech",
    initials: "UE",
    quote:
      "A promising foundation for building accessible and localized educational audio.",
    person: "Education team",
  },
  {
    name: "Creator Hub",
    category: "Creator Economy",
    initials: "CH",
    quote:
      "Voice, creators and monetization finally feel like parts of the same product story.",
    person: "Creator team",
  },
];

const principles = [
  "Local language quality",
  "Production-ready infrastructure",
  "Creator-first workflows",
  "Developer-friendly APIs",
];

export default function CustomersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-950 dark:bg-black dark:text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[8%] top-[-8%] size-[460px] rounded-full bg-sky-400/8 blur-[140px] dark:bg-sky-500/10" />
        <div className="absolute right-[4%] top-[25%] size-[420px] rounded-full bg-emerald-400/8 blur-[140px] dark:bg-emerald-500/8" />
        <div className="absolute bottom-[8%] left-1/2 size-[360px] -translate-x-1/2 rounded-full bg-violet-400/7 blur-[130px] dark:bg-violet-500/8" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3.5 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
              <Sparkles className="size-3.5 text-sky-500" />
              Built with Miransas
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Products people can{" "}
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                actually use.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Miransas is being built for teams, creators and developers who
              want voice experiences to feel natural, useful and ready for the
              real world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured quote */}
      <section className="relative px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[36px] border border-zinc-200/80 bg-zinc-950 p-8 text-white shadow-[0_45px_140px_-80px_rgba(2,6,23,0.9)] dark:border-white/10 sm:p-12 lg:p-16"
          >
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 size-80 rounded-full bg-sky-400/10 blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-[-100px] left-[25%] size-72 rounded-full bg-emerald-400/8 blur-[100px]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-14">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
                <Quote className="size-6 text-sky-300" />
              </div>

              <div>
                <p className="max-w-4xl text-2xl font-medium leading-[1.45] tracking-tight sm:text-3xl lg:text-4xl">
                  “The Uzbek pronunciation feels intentional, not like an
                  afterthought.”
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white text-xs font-bold text-zinc-950">
                    BL
                  </div>

                  <div>
                    <p className="text-sm font-semibold">BilimLab</p>
                    <p className="text-xs text-white/45">
                      Education platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden items-center gap-1 lg:flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-current text-amber-300"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer grid */}
      <section className="relative px-6 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Customers
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built around real use cases.
            </h2>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              From education and creators to customer experiences and
              developer products, Miransas is designed around practical voice
              workflows.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer, index) => (
              <motion.article
                key={customer.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-[30px] border border-zinc-200/80 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_35px_100px_-70px_rgba(2,6,23,0.8)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 size-40 rounded-full bg-sky-400/0 blur-3xl transition duration-700 group-hover:bg-sky-400/10"
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-bold text-white shadow-lg dark:bg-white dark:text-zinc-950">
                    {customer.initials}
                  </div>

                  <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
                    {customer.category}
                  </span>
                </div>

                <div className="relative mt-8">
                  <p className="text-lg font-medium leading-8 tracking-tight text-zinc-800 dark:text-zinc-200">
                    “{customer.quote}”
                  </p>
                </div>

                <div className="relative mt-auto flex items-end justify-between border-t border-zinc-200 pt-6 dark:border-white/10">
                  <div>
                    <p className="font-semibold text-zinc-950 dark:text-white">
                      {customer.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                      {customer.person}
                    </p>
                  </div>

                  <ArrowUpRight className="size-4 text-zinc-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative px-6 py-20 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                Our standard
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Not just another AI product.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-zinc-600 dark:text-zinc-400">
                We care about the layer underneath the experience: language,
                infrastructure, reliability and the details developers and
                creators interact with every day.
              </p>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                  }}
                  className="group rounded-[24px] border border-zinc-200/80 bg-white/70 p-6 backdrop-blur-xl transition duration-300 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <Check className="size-4" />
                  </div>

                  <p className="mt-6 font-semibold tracking-tight">
                    {principle}
                  </p>

                  <div className="mt-5 h-px w-8 bg-zinc-200 transition-all duration-300 group-hover:w-14 dark:bg-white/10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-32 pt-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-zinc-200/80 bg-white/75 p-8 text-center shadow-[0_40px_130px_-80px_rgba(2,6,23,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] sm:p-12"
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <Sparkles className="size-5" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Want to build with Miransas?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
            Explore the platform, build an integration or talk to the team
            about what you&apos;re creating.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Explore products
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-950 transition duration-300 hover:scale-[1.03] hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/10"
            >
              Talk to us
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}