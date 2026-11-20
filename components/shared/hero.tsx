"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { ShaderAnimation } from "./shader-hero";
import { GlowButton } from "../ui/glow-button";
import { HERO_CONTENT } from "@/constants/hero";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-[#7c3aed] focus-visible:outline-offset-2";

export default function HeroSection() {
  return (
    <section className="dark relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-[#050505] pb-20 pt-16 text-white">
      {/* Shader background and readability mask */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
        <ShaderAnimation />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-16 px-6 lg:px-12">
        {/* Main heading and actions */}
        <div className="max-w-5xl pt-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            {HERO_CONTENT.title}{" "}
            <br />
            <span className="font-semibold text-[#D1D1D1]">
              {HERO_CONTENT.titleItalic}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base leading-[1.6] text-[#D1D1D1] sm:text-lg lg:text-[1.1875rem]"
          >
            {HERO_CONTENT.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
          >
            <Link href={HERO_CONTENT.primaryCtaHref} className={FOCUS_RING}>
              <GlowButton className="w-full sm:w-auto">
                {HERO_CONTENT.primaryCta}
              </GlowButton>
            </Link>

            <Link
              href={HERO_CONTENT.secondaryCtaHref}
              className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-white/[0.06] px-5 py-3 text-sm font-medium text-[#D1D1D1] backdrop-blur-md transition-all duration-200 hover:bg-white/[0.12] hover:text-white ${FOCUS_RING}`}
            >
              <Play className="size-4 fill-white/20 transition-transform group-hover:scale-110" />
              <span>{HERO_CONTENT.secondaryCta}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
