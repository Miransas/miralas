"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waveform = [
  18, 28, 42, 25, 54, 36, 68, 44, 82, 51, 65, 34, 76, 46, 92, 58, 72, 38,
  84, 48, 63, 31, 74, 43, 90, 55, 70, 35, 82, 49, 64, 29, 76, 45, 88, 53,
  68, 37, 80, 47, 61, 30, 73, 42, 86, 54, 69, 34,
];

const identity = [
  { label: "TONE", value: 92 },
  { label: "RHYTHM", value: 86 },
  { label: "TEXTURE", value: 94 },
  { label: "ACCENT", value: 81 },
];

const lines = [
  { lang: "EN", text: "Welcome back. Your order is on its way." },
  { lang: "TR", text: "Merhaba, siparişiniz yola çıktı." },
  { lang: "UZ", text: "Assalomu alaykum, buyurtmangiz yo'lda." },
];

const cardClass =
  "rounded-[5px] border border-[#171321]/10 bg-white/70 backdrop-blur-sm " +
  "shadow-[0_6px_18px_rgba(99,102,241,0.10)] " +
  "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35)] md:rounded-[8px]";

export default function ImmersiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  

  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    

    let media: ReturnType<typeof gsap.matchMedia> | undefined;

    const ctx = gsap.context(() => {
      // Reduced motion: statik, sadece ilk sahne
      if (reduceMotion) {
        gsap.set([introRef.current, sceneRef.current, glowRef.current], {
          opacity: 1,
          clearProps: "transform",
        });
        gsap.set(".stage-2, .stage-3", { display: "none" });
        gsap.set(".progress-fill", { scaleX: 1 });
        if (counterRef.current) counterRef.current.textContent = "98.4";
        return;
      }

      // Başlangıç durumları
      gsap.set(introRef.current, { opacity: 0, y: 18 });
      gsap.set(sceneRef.current, { opacity: 0, scale: 0.92 });
      gsap.set(glowRef.current, { opacity: 0.6 });
      gsap.set(blobRef.current, { opacity: 0.5 });
      gsap.set(".stage-1", { opacity: 1, y: 0 });
      gsap.set(".stage-2, .stage-3", { opacity: 0, y: 22 });
      gsap.set(".step", { opacity: 0.35 });
      gsap.set(".progress-fill", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".s2-card", { opacity: 0, x: 26, scale: 0.96 });
      gsap.set(".s2-bar", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".s3-item", { opacity: 0, y: 18 });
      gsap.set(".s3-text", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".s3-bar", { scaleX: 0, transformOrigin: "left center" });

      // Giriş animasyonu (scroll'dan bağımsız)
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(introRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(sceneRef.current, { opacity: 1, duration: 1.05 }, 0.12)
        .to(glowRef.current, { opacity: 0.92, duration: 0.9 }, 0.35)
        .to(blobRef.current, { opacity: 0.85, duration: 1.2 }, 0.35);

      media = gsap.matchMedia(sectionRef.current);

      media.add(
        {
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const isMobile = Boolean(context.conditions?.mobile);

          const s1 = isMobile ? 1.02 : 1.0;
          const s2 = isMobile ? 1.14 : 1.14;
          const s3 = isMobile ? 1.24 : 1.3;

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: isMobile ? 0.5 : 0.6,
              invalidateOnRefresh: true,
            },
          });

          // --- Sahne zoom: 3 faz, toplam süre 10 birim ---
          tl.fromTo(
            sceneRef.current,
            { scale: 0.92, y: 0 },
            { scale: s1, y: 0, duration: 1, immediateRender: false },
            0
          )
            .fromTo(
              sceneRef.current,
              { scale: s1 },
              { scale: s2, duration: 8, immediateRender: false },
              1
            )
            .fromTo(
              sceneRef.current,
              { scale: s2, y: 0 },
              {
                scale: s3,
                y: isMobile ? -10 : -24,
                duration: 0.4,
                immediateRender: false,
              },
              9
            );

          tl.fromTo(
            glowRef.current,
            { opacity: 0.8 },
            { opacity: 1, duration: 9.4, immediateRender: false },
            0
          );

          // Intro çıkışı
          tl.to(
            introRef.current,
            { opacity: 0, y: -42, duration: 0.7 },
            0.15
          );

          // Stepper + progress
          tl.to(".progress-fill", { scaleX: 1, duration: 8.9 }, 0.5);
          tl.to(".step-1", { opacity: 1, duration: 0.4 }, 0.9);
          tl.to(".step-1", { opacity: 0.55, duration: 0.4 }, 3.6);
          tl.to(".step-2", { opacity: 1, duration: 0.4 }, 3.6);
          tl.to(".step-2", { opacity: 0.55, duration: 0.4 }, 7.0);
          tl.to(".step-3", { opacity: 1, duration: 0.4 }, 7.0);

          // --- Sahne 1: voiceprint (1 → 3) ---
          tl.fromTo(
            ".s1-visual",
            { scale: 1 },
            { scale: 1.07, duration: 2, immediateRender: false },
            1
          );

          // 1 → 2 geçişi
          tl.to(".stage-1", { opacity: 0, y: -18, duration: 0.8 }, 3);
          tl.to(".stage-2", { opacity: 1, y: 0, duration: 0.8 }, 3.5);

          // --- Sahne 2: voice identity kartları (4 → 6) ---
          tl.to(
            ".s2-card",
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.35,
            },
            4.1
          );
          tl.to(
            ".s2-bar",
            {
              scaleX: (_i: number, el: Element) =>
                Number((el as HTMLElement).dataset.v) / 100,
              duration: 1.2,
              stagger: 0.3,
            },
            4.3
          );
          const counter = { v: 0 };
          tl.to(
            counter,
            {
              v: 98.4,
              duration: 1.8,
              onUpdate: () => {
                if (counterRef.current)
                  counterRef.current.textContent = counter.v.toFixed(1);
              },
            },
            4.2
          );

          // 2 → 3 geçişi
          tl.to(".stage-2", { opacity: 0, y: -18, duration: 0.8 }, 6.4);
          tl.to(".stage-3", { opacity: 1, y: 0, duration: 0.8 }, 6.9);

          // --- Sahne 3: generated speech listesi (7 → 9) ---
          tl.to(
            ".s3-item",
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.5 },
            7.3
          );
          tl.to(
            ".s3-text",
            { clipPath: "inset(0 0% 0 0)", duration: 0.9, stagger: 0.5 },
            7.5
          );
          tl.to(
            ".s3-bar",
            { scaleX: 1, duration: 0.9, stagger: 0.5 },
            7.7
          );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      media?.revert();
      ctx.revert();
    };
  }, [reduceMotion]);

  const visibleWithoutMotion = reduceMotion ? "opacity-100" : "opacity-0";

  return (
    <section
      ref={sectionRef}
      id="features"
      className={`relative isolate overflow-clip bg-[#EFEFEF] text-[#09090D] dark:bg-[#050505] dark:text-[#EFEFEF] ${
        // Scroll süresini buradan ayarla: büyüt = daha uzun scroll
        reduceMotion ? "min-h-[100svh]" : "h-[600svh] md:h-[720svh]"
      }`}
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden bg-[#EFEFEF] dark:bg-[#050505] ${
          reduceMotion
            ? "min-h-[100svh]"
            : "sticky top-0 h-[100svh] min-h-[580px]"
        }`}
      >
        {/* Intro */}
        <div className="pointer-events-none absolute inset-x-0 top-[3%] z-10 flex justify-center">
          <div
            ref={introRef}
            className={`w-[92%] max-w-[880px] text-center ${visibleWithoutMotion}`}
          >
            <span className="text-[9px] font-semibold tracking-[0.24em] text-[#15131D]/50 dark:text-[#EFEFEF]/45 md:text-[10px]">
              THE MIRANSAS VOICE PLATFORM
            </span>

            <h2 className="mt-3 text-[clamp(32px,4.6vw,62px)] font-medium leading-[1.04] tracking-[-0.065em]">
              More than a voice.
              <br />
              A recognizable identity.
            </h2>

            <p className="mx-auto mt-3 max-w-[540px] text-xs leading-relaxed text-[#15131D]/60 dark:text-[#EFEFEF]/55 md:text-base">
              Explore how AI voice cloning can carry the tone, rhythm and
              character of a voice into generated speech.
            </p>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-4 text-[9px] font-medium tracking-[0.2em] text-[#15131D]/45 dark:text-[#EFEFEF]/45"
            >
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </motion.div>
          </div>
        </div>

        {/* Tablet scene */}
        <div className="absolute left-0 top-[64%] z-[2] flex w-full -translate-y-1/2 justify-center md:top-[70%]">
          <div
            ref={sceneRef}
            className={`relative aspect-[1672/941] w-[142vw] origin-center will-change-transform md:w-[112vw] md:max-w-[1480px] ${visibleWithoutMotion}`}
          >
            {/* Arkadaki mavi → rose ambient glow */}
            <div
              ref={blobRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-[6%] z-[1] rounded-[48px] bg-gradient-to-r from-sky-400/35 via-violet-400/25 to-rose-400/35 blur-3xl dark:from-sky-500/35 dark:via-violet-500/25 dark:to-rose-500/35"
            />

            {/* Screen content */}
            <div className="absolute left-[13.3%] top-[8%] z-10 h-[76.8%] w-[73.4%] overflow-hidden rounded-[10px] border border-[#171321]/10 bg-[#F8F7FC] text-[#111018] shadow-[0_18px_48px_rgba(22,15,40,0.08)] dark:border-white/10 dark:bg-[#09080F] dark:text-[#F2EFFA] dark:shadow-[0_18px_50px_rgba(0,0,0,0.30)] md:rounded-[18px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(96,165,250,0.07),transparent_42%,rgba(244,170,207,0.07))] dark:bg-[linear-gradient(135deg,rgba(80,120,255,0.10),transparent_42%,rgba(218,104,171,0.08))]"
              />

              <div className="relative flex h-full flex-col">
                {/* Stage area */}
                <div className="relative min-h-0 flex-1">
                  {/* ---------- STAGE 1: Reference / voiceprint ---------- */}
                  <div className="stage-1 absolute inset-0 grid grid-cols-[1.04fr_0.96fr] items-center gap-[3%] px-[4.5%] py-[2.5%]">
                    <div className="flex min-w-0 flex-col justify-center">
                      <span className="text-[6px] font-semibold tracking-[0.2em] text-violet-700 dark:text-violet-300 md:text-[9px]">
                        AI VOICE CLONING{" "}
                        <span className="text-rose-400">/ 01</span>
                      </span>

                      <h3 className="mt-[5%] max-w-[440px] text-[clamp(13px,2.15vw,31px)] font-medium leading-[1.05] tracking-[-0.055em]">
                        A voice that feels unmistakably yours.
                      </h3>

                      <p className="mt-[5%] max-w-[390px] text-[clamp(7px,0.88vw,12px)] leading-[1.65] text-[#171321]/60 dark:text-white/55">
                        Start with a reference recording. The model learns its
                        vocal character — tone, rhythm and texture — to create
                        a reusable voice identity for generated speech.
                      </p>

                      <div className="mt-[8%] flex items-center gap-3 border-t border-[#171321]/10 pt-[4%] dark:border-white/10">
                        <span className="flex items-center gap-1.5 text-[6px] font-semibold tracking-[0.14em] text-[#171321]/55 dark:text-white/50 md:text-[8px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                          REFERENCE SAMPLE
                        </span>
                        <span className="text-[7px] tabular-nums text-[#171321]/45 dark:text-white/40 md:text-[9px]">
                          00:18
                        </span>
                      </div>
                    </div>

                    {/* Animated voiceprint */}
                    <div className="s1-visual relative flex min-h-0 items-center justify-center">
                      <div className="relative flex aspect-square w-[94%] max-w-[420px] items-center justify-center">
                        <motion.div
                          aria-hidden="true"
                          animate={reduceMotion ? undefined : { rotate: 360 }}
                          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                          className="absolute h-[84%] w-[84%] rounded-full border border-dashed border-sky-400/50 dark:border-sky-300/30"
                        />
                        <motion.div
                          aria-hidden="true"
                          animate={reduceMotion ? undefined : { rotate: -360 }}
                          transition={{ duration: 27, repeat: Infinity, ease: "linear" }}
                          className="absolute h-[66%] w-[66%] rounded-full border border-rose-300/55 dark:border-rose-300/25"
                        />
                        <motion.div
                          aria-hidden="true"
                          animate={
                            reduceMotion
                              ? undefined
                              : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }
                          }
                          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute h-[46%] w-[46%] rounded-full border border-violet-300/40 bg-violet-100/10 dark:border-violet-200/25 dark:bg-violet-200/[0.025]"
                        />

                        <div className="relative z-10 flex w-[78%] flex-col items-center">
                          <span className="mb-[8%] text-[6px] font-semibold tracking-[0.2em] text-violet-800/70 dark:text-violet-200/70 md:text-[8px]">
                            VOICEPRINT ANALYSIS
                          </span>

                          <div className="flex h-[clamp(30px,5.8vw,78px)] w-full items-center justify-center gap-[2px]">
                            {waveform.map((height, index) => (
                              <motion.span
                                key={index}
                                aria-hidden="true"
                                initial={false}
                                animate={
                                  reduceMotion
                                    ? { scaleY: 1 }
                                    : { scaleY: [0.42, 1, 0.58, 0.86, 0.42] }
                                }
                                transition={{
                                  duration: 1.05 + (index % 6) * 0.12,
                                  delay: index * 0.018,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="h-full min-w-[1px] flex-1 origin-center rounded-full bg-gradient-to-t from-sky-500 via-violet-400 to-rose-300 opacity-80 dark:opacity-95"
                                style={{ height: `${height}%` }}
                              />
                            ))}
                          </div>

                          <span className="mt-[9%] text-[6px] font-medium tracking-[0.16em] text-[#171321]/50 dark:text-white/45 md:text-[8px]">
                            TONE <span className="px-1 text-rose-400">·</span>
                            RHYTHM <span className="px-1 text-rose-400">·</span>
                            TEXTURE
                          </span>
                        </div>

                        <motion.span
                          aria-hidden="true"
                          animate={
                            reduceMotion
                              ? undefined
                              : { y: [0, -7, 0], opacity: [0.55, 1, 0.55] }
                          }
                          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute right-[16%] top-[24%] h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_18px_rgba(244,145,195,0.85)]"
                        />
                        <motion.span
                          aria-hidden="true"
                          animate={
                            reduceMotion
                              ? undefined
                              : { y: [0, 6, 0], opacity: [0.45, 0.9, 0.45] }
                          }
                          transition={{
                            duration: 4.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                          className="absolute bottom-[22%] left-[14%] h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(96,165,250,0.9)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---------- STAGE 2: Voice identity cards ---------- */}
                  <div className="stage-2 absolute inset-0 grid grid-cols-[0.9fr_1.1fr] items-center gap-[4%] px-[4.5%] py-[2.5%] opacity-0">
                    <div className="flex min-w-0 flex-col justify-center">
                      <span className="text-[6px] font-semibold tracking-[0.2em] text-violet-700 dark:text-violet-300 md:text-[9px]">
                        VOICE IDENTITY <span className="text-rose-400">/ 02</span>
                      </span>

                      <h3 className="mt-[5%] max-w-[420px] text-[clamp(13px,2.15vw,31px)] font-medium leading-[1.05] tracking-[-0.055em]">
                        Your voice, mapped into an identity.
                      </h3>

                      <p className="mt-[5%] max-w-[360px] text-[clamp(7px,0.88vw,12px)] leading-[1.65] text-[#171321]/60 dark:text-white/55">
                        Every trait is measured and stored — so the same voice
                        can speak anything, anywhere.
                      </p>

                      <div className="mt-[7%] flex items-baseline gap-[3%]">
                        <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-400 bg-clip-text text-[clamp(16px,3.2vw,46px)] font-medium leading-none tracking-[-0.05em] tabular-nums text-transparent">
                          <span ref={counterRef}>0.0</span>%
                        </span>
                        <span className="text-[6px] font-semibold tracking-[0.16em] text-[#171321]/50 dark:text-white/45 md:text-[8px]">
                          VOICE MATCH
                        </span>
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-col justify-center gap-[3.5%]">
                      {identity.map((item) => (
                        <div
                          key={item.label}
                          className={`s2-card ${cardClass} px-[4%] py-[2.6%]`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] font-semibold tracking-[0.16em] text-[#171321]/60 dark:text-white/55 md:text-[8px]">
                              {item.label}
                            </span>
                            <span className="text-[7px] font-medium tabular-nums text-[#171321]/70 dark:text-white/70 md:text-[9px]">
                              {item.value}%
                            </span>
                          </div>
                          <div className="mt-[3%] h-[3px] w-full overflow-hidden rounded-full bg-[#171321]/10 dark:bg-white/10 md:h-[4px]">
                            <div
                              data-v={item.value}
                              className="s2-bar h-full w-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-300"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ---------- STAGE 3: Generated speech list ---------- */}
                  <div className="stage-3 absolute inset-0 grid grid-cols-[0.9fr_1.1fr] items-center gap-[4%] px-[4.5%] py-[2.5%] opacity-0">
                    <div className="flex min-w-0 flex-col justify-center">
                      <span className="text-[6px] font-semibold tracking-[0.2em] text-violet-700 dark:text-violet-300 md:text-[9px]">
                        GENERATED SPEECH <span className="text-rose-400">/ 03</span>
                      </span>

                      <h3 className="mt-[5%] max-w-[420px] text-[clamp(13px,2.15vw,31px)] font-medium leading-[1.05] tracking-[-0.055em]">
                        Type anything. Hear it in your voice.
                      </h3>

                      <p className="mt-[5%] max-w-[360px] text-[clamp(7px,0.88vw,12px)] leading-[1.65] text-[#171321]/60 dark:text-white/55">
                        One voice identity, any language. Same character, same
                        warmth, every line.
                      </p>

                      <div className="mt-[7%] flex gap-[3%]">
                        {["EN", "TR", "UZ"].map((l) => (
                          <span
                            key={l}
                            className="rounded-full border border-sky-400/40 bg-sky-400/10 px-[4%] py-[1%] text-[6px] font-semibold tracking-[0.14em] text-sky-700 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-200 md:text-[8px]"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-col justify-center gap-[4%]">
                      {lines.map((line) => (
                        <div
                          key={line.lang}
                          className={`s3-item ${cardClass} flex items-center gap-[4%] px-[4%] py-[3%]`}
                        >
                          <span className="grid h-[clamp(10px,1.6vw,22px)] w-[clamp(10px,1.6vw,22px)] shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-rose-300 text-[5px] text-white md:text-[7px]">
                            ▶
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="s3-text truncate text-[7px] font-medium leading-tight md:text-[10px]">
                                {line.text}
                              </span>
                              <span className="shrink-0 text-[5px] font-semibold tracking-[0.14em] text-rose-400 md:text-[7px]">
                                {line.lang}
                              </span>
                            </div>
                            <div className="mt-[3%] h-[2px] w-full overflow-hidden rounded-full bg-[#171321]/10 dark:bg-white/10 md:h-[3px]">
                              <div className="s3-bar h-full w-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-300" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stepper + scroll progress */}
                <div className="shrink-0 border-t border-[#171321]/10 px-[4.5%] pb-[1.6%] pt-[1.4%] dark:border-white/10">
                  <div className="flex items-center justify-between text-[6px] font-semibold tracking-[0.15em] text-[#171321]/70 dark:text-white/65 md:text-[8px]">
                    <span className="step step-1">01 REFERENCE AUDIO</span>
                    <span className="step step-2">02 VOICE IDENTITY</span>
                    <span className="step step-3">03 GENERATED SPEECH</span>
                  </div>
                  <div className="mt-[1.2%] h-px w-full bg-[#171321]/10 dark:bg-white/10">
                    <div className="progress-fill h-full w-full origin-left bg-gradient-to-r from-sky-400 via-violet-400 to-rose-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rim light: mavi → rose gradient border + glow, light/dark uyumlu */}
            <div
              ref={glowRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-[13.05%] top-[7.75%] z-[15] h-[77.3%] w-[73.9%] rounded-[12px] p-[1.5px] shadow-[-8px_0_26px_rgba(56,189,248,0.30),8px_0_26px_rgba(251,113,133,0.26)] dark:shadow-[-10px_0_32px_rgba(56,189,248,0.38),10px_0_32px_rgba(251,113,133,0.34)] md:rounded-[20px]"
              style={{
                background:
                  "linear-gradient(120deg, rgba(56,189,248,0.95), rgba(167,139,250,0.85) 50%, rgba(251,113,133,0.95))",
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
              }}
            />

            {/* Tablet frame PNG */}
            <Image
              src="/tablet-hands.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 142vw, 112vw"
              className="pointer-events-none absolute inset-0 z-20 select-none object-contain drop-shadow-[0_0_30px_rgba(96,165,250,0.35)] dark:drop-shadow-[0_0_44px_rgba(99,140,255,0.45)]"
            />
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[22%] bg-gradient-to-t from-[#EFEFEF] to-transparent dark:from-[#050505]"
        />

        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[8px] font-semibold tracking-[0.2em] text-[#171321]/40 dark:text-white/35 md:bottom-7 md:text-[9px]">
          <span>SECURE</span>
          <span>·</span>
          <span>CONNECTED</span>
          <span>·</span>
          <span>INTELLIGENT</span>
        </div>
      </div>
    </section>
  );
}