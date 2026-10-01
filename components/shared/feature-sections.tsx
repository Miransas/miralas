"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Mic, Globe, Zap, Layers, Radio, Code2, LucideIcon } from "lucide-react";
import { FEATURES_DATA, FeatureCard } from "@/constants/feature";

// İkon eşleştirme tablosu
const ICON_MAP: Record<string, LucideIcon> = {
  Mic: Mic,
  Globe: Globe,
  Zap: Zap,
  Layers: Layers,
  Radio: Radio,
};

export default function FeaturesBento() {
  return (
    <section className="bg-background py-24 px-6 text-foreground md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Üst Kısım */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Everything a voice needs.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              From text-to-speech to real-time streaming — one platform, infinite possibilities.
            </p>
          </div>
          <Link
            href="/features"
            className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent shadow-sm"
          >
            <span>Explore all features</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid md:grid-cols-3 shadow-sm">
          {FEATURES_DATA.map((card: FeatureCard) => {
            const IconComponent = card.iconName ? ICON_MAP[card.iconName] : null;

            return (
              <div
                key={card.id}
                className={`
                  ${card.colSpan}
                  bg-card p-8 group relative flex min-h-[260px] flex-col justify-between transition-all duration-300
                  hover:bg-accent/50 cursor-pointer
                `}
              >
                {!card.isSpecial ? (
                  <>
                    <div>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                          {card.number}
                        </span>
                        <span className="text-sm font-semibold text-foreground/80">
                          {card.title}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed pr-4">
                        {card.description}
                      </p>
                    </div>

                    {/* Icon + Arrow */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground/80 transition-all duration-300 group-hover:border-foreground/20">
                        {IconComponent && <IconComponent className="size-4" />}
                      </div>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </>
                ) : (
                  /* Special Developer Card */
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="size-4 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                          Developer Ready
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {card.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-foreground text-sm font-semibold mb-3">
                        {card.subDescription}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {["Node", "Python", "Go", "Rust"].map((lang) => (
                          <span
                            key={lang}
                            className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-mono text-muted-foreground"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
