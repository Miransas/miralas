"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Bell } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 selection:bg-muted selection:text-foreground relative overflow-hidden">
      
      {/* Arka Plan Atmosferik Işık Efekti (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a87c]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        {/* Üst Etiket */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-8 shadow-sm">
          <Sparkles className="size-3 text-[#c9a87c]" />
          <span>Coming Soon</span>
        </div>

        {/* Başlık */}
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-6">
          We are crafting something <span className="italic text-muted-foreground">extraordinary.</span>
        </h1>

        {/* Açıklama */}
        <p className="text-muted-foreground font-light text-base md:text-lg mb-10 leading-relaxed">
          This feature is currently under active development. We are fine-tuning every detail to bring you the best voice AI experience.
        </p>

        {/* Haber Ver Formu / Buton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <div className="relative w-full sm:w-80 group">
            <input 
              type="email" 
              placeholder="Enter your email for updates..." 
              className="w-full bg-card/40 backdrop-blur-md border border-border/50 rounded-full py-3.5 pl-6 pr-4 text-sm font-light text-foreground focus:outline-none focus:border-[#c9a87c]/50 focus:bg-card/80 transition-all placeholder:text-muted-foreground shadow-lg"
            />
          </div>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shrink-0 shadow-lg">
            <Bell className="size-4" />
            <span>Notify Me</span>
          </button>
        </div>

        {/* Geri Dönüş Linki */}
        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>
        </div>

      </motion.div>
    </div>
  );
}