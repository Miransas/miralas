"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Mic, Waves, ShieldCheck, LucideIcon } from "lucide-react";
import { ShaderAnimation } from "./shader-hero";
import { GlowButton } from "../ui/glow-button";
import { HERO_CONTENT, HERO_HIGHLIGHTS, HeroHighlight } from "@/constants/hero";

const ICON_MAP: Record<string, LucideIcon> = {
  Mic: Mic,
  Waves: Waves,
  ShieldCheck: ShieldCheck,
};

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden  min-h-[100vh] flex items-center justify-center pt-16 pb-20 bg-black">

      {/* Shader background and readability mask */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <ShaderAnimation />
     
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 w-full flex flex-col justify-between gap-16">

        {/* Main heading and actions */}
        <div className="max-w-5xl pt-8">

          {/* H1 heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
          >
            {HERO_CONTENT.title}{" "}
            <br />
            <span className=" font-semibold text-white leading-[1.05]">
              {HERO_CONTENT.titleItalic}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-2xl font-semibold sm:text-lg leading-relaxed text-white "
          >
            {HERO_CONTENT.description}
          </motion.p>

          {/* Butonlar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link href={HERO_CONTENT.primaryCtaHref}>
              <GlowButton className="w-full sm:w-auto">
                {HERO_CONTENT.primaryCta}
              </GlowButton>
            </Link>

            <Link
              href={HERO_CONTENT.secondaryCtaHref}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-white/5 backdrop-blur-md sm:px-3 sm:py-3.5 px-3 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent shadow-sm"
            >
              <Play className="size-4 fill-foreground/20 transition-transform group-hover:scale-110" />
              <span>{HERO_CONTENT.secondaryCta}</span>
            </Link>
          </motion.div>
        </div>

        {/* Featured cards row */}
        {/* <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border/40 pt-8"
        >
          {HERO_HIGHLIGHTS.map((highlight: HeroHighlight) => {
            const IconComponent = ICON_MAP[highlight.iconName];

            return (
              <div
                key={highlight.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-5 transition-all duration-300 hover:border-border hover:bg-card/70 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-xs">
                    {IconComponent && <IconComponent className="size-4.5" />}
                  </div>
                  <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {highlight.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-foreground">
                  {highlight.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </motion.div> */}

      </div>
    </section>
  );
}
