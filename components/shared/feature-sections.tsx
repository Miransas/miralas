"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Mic, Globe, Zap, Layers, Radio, Code2 } from "lucide-react";

export default function FeaturesBento() {
  const cards = [
    {
      id: 1,
      number: "100+",
      title: "AI Voices",
      description:
        "Ultra-realistic voices across every tone — narrator, energetic, dramatic, whisper, and more. Preview instantly, clone your own.",
      icon: Mic,
      colSpan: "md:col-span-1",
    },
    {
      id: 2,
      number: "29+",
      title: "Languages",
      description:
        "Native-quality synthesis with automatic language detection, transliteration, and accent control. Sound local everywhere.",
      icon: Globe,
      colSpan: "md:col-span-1",
    },
    {
      id: 3,
      number: "450K+",
      title: "API Calls / Month",
      description:
        "Production-grade infrastructure handling tens of thousands of concurrent requests with zero degradation.",
      icon: Zap,
      colSpan: "md:col-span-1",
    },
    {
      id: 4,
      number: "1-Click",
      title: "Voice Cloning",
      description:
        "Upload 30 seconds of audio and get a perfect digital replica. Private, encrypted, never used for training.",
      icon: Layers,
      colSpan: "md:col-span-1",
    },
    {
      id: 5,
      number: "<50ms",
      title: "gRPC Streaming",
      description:
        "Bidirectional real-time streaming for live donation reads, IVR, and interactive voice agents. Rust + Tokio powered.",
      icon: Radio,
      colSpan: "md:col-span-1",
    },
    {
      id: 6,
      isSpecial: true,
      description:
        "Official SDKs for Node.js, Python, Go, and Rust. OpenAPI spec, auto-generated docs, and copy-paste examples. Install via npm, pip, cargo, or go get.",
      subDescription: "$25 starting credit. No monthly fees.",
      colSpan: "md:col-span-1",
    },
  ];

  return (
    <section className="bg-background py-24 px-6 text-foreground md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Üst Kısım */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl leading-tight font-bold tracking-tight mb-4">
              Everything a voice needs.
            </h2>
            <p className="text-muted-foreground text-lg">
              From text-to-speech to real-time streaming — one platform, infinite possibilities.
            </p>
          </div>
          <Link
            href="/features"
            className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent"
          >
            Explore all features
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`
                ${card.colSpan}
                bg-background p-8 group relative flex min-h-[240px] flex-col justify-between transition-all duration-300
                hover:bg-accent
                cursor-pointer
              `}
            >
              {!card.isSpecial ? (
                <>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[40px] font-light tracking-tight text-foreground">
                        {card.number}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {card.title}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pr-6">
                      {card.description}
                    </p>
                  </div>

                  {/* Icon + Arrow */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-foreground">
                      {card.icon && <card.icon className="size-4" />}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </>
              ) : (
                /* Special Card */
                <div className="flex flex-col justify-center h-full gap-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="size-4 text-pink-400" />
                    <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                      Developer Ready
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                  <p className="text-foreground text-sm font-medium">
                    {card.subDescription}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {["Node", "Python", "Go", "Rust"].map((lang) => (
                      <span
                        key={lang}
                        className="rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-muted-foreground"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}