
"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    name: "Text to Speech",
    description: "Natural speech synthesis",
    label: "TTS",
  },
  {
    number: "02",
    name: "Speech to Text",
    description: "Accurate audio transcription",
    label: "STT",
  },
  {
    number: "03",
    name: "Voice Cloning",
    description: "Personalized voice identity",
    label: "VC",
  },
  {
    number: "04",
    name: "Realtime Voice",
    description: "Live voice experiences",
    label: "RT",
  },
];

export default function ImmersiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const screenRef = useRef<HTMLDivElement>(null);
  const servicePanelRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      // Camera approaches the display.
      timeline.fromTo(
        sceneRef.current,
        { scale: 0.82, y: 90 },
        {
          scale: 1.04,
          y: -8,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Intro disappears.
      timeline.to(
        introRef.current,
        {
          opacity: 0,
          y: -45,
          duration: 0.24,
          ease: "none",
        },
        0.05
      );

      // Screen content enters.
      timeline.fromTo(
        screenRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "none",
        },
        0.2
      );

      // Services appear one by one.
      timeline.fromTo(
        servicePanelRef.current?.querySelectorAll(
          ".immersive-service-row"
        ) ?? [],
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.24,
          ease: "none",
        },
        0.34
      );

      // Analytics panel enters.
      timeline.fromTo(
        analyticsRef.current,
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "none",
        },
        0.52
      );

      // CTA appears last.
      timeline.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "none",
        },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] bg-[#EFEFEF] text-[#050505] dark:bg-[#050505] dark:text-[#EFEFEF] md:h-[320vh]"
    >
      {/* STICKY SCENE */}
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#EFEFEF] dark:bg-[#050505]">

        {/* INTRO */}
        <div
          ref={introRef}
          className="absolute left-0 right-0 top-[7%] z-10 mx-auto w-[92%] max-w-[900px] text-center"
        >
          <span className="text-[9px] font-semibold tracking-[0.24em] text-[#050505]/50 dark:text-[#EFEFEF]/50 md:text-[10px]">
            THE MIRANSAS ECOSYSTEM
          </span>

          <h2 className="mt-5 text-[clamp(34px,5.3vw,72px)] font-medium leading-[1.06] tracking-[-0.065em]">
            Every voice workflow.
            <br />
            One intelligent platform.
          </h2>

          <p className="mx-auto mt-5 max-w-[540px] text-xs leading-relaxed text-[#050505]/55 dark:text-[#EFEFEF]/55 md:text-base">
            From speech synthesis to real-time conversations,
            everything works together in one place.
          </p>

          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-6 text-[9px] font-medium tracking-[0.2em] text-[#050505]/45 dark:text-[#EFEFEF]/45"
          >
            SCROLL TO EXPLORE ↓
          </motion.div>
        </div>

        {/* TABLET */}
        <div className="absolute left-0 top-[60%] flex w-full -translate-y-1/2 justify-center md:top-[64%]">
          <div
            ref={sceneRef}
            className="relative aspect-[1672/941] w-[145vw] origin-center will-change-transform md:w-[112vw] md:max-w-[1480px]"
          >
            {/* ACTUAL SCREEN AREA */}
            <div
              ref={screenRef}
              className="absolute left-[13.3%] top-[8%] z-10 h-[76.8%] w-[73.4%] overflow-hidden rounded-[10px] bg-[#EFEFEF] opacity-100 text-[#050505] dark:bg-[#050505] dark:text-[#EFEFEF] md:rounded-[18px]"
            >
              {/* HEADER */}
              <header className="flex h-[11%] items-center justify-between border-b border-[#050505]/10 px-[4%] dark:border-[#EFEFEF]/10">

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-[#050505] text-[9px] font-bold text-[#EFEFEF] dark:bg-[#EFEFEF] dark:text-[#050505] md:h-7 md:w-7 md:text-xs">
                    M
                  </span>

                  <span className="text-[8px] font-semibold tracking-[0.15em] md:text-xs">
                    MIRANSAS
                  </span>
                </div>

                <div className="hidden items-center gap-5 text-[9px] text-[#050505]/50 dark:text-[#EFEFEF]/50 md:flex">
                  <span>Platform</span>
                  <span>Voice API</span>
                  <span>Infrastructure</span>
                </div>

                <span className="text-[7px] font-medium tracking-wider text-[#050505]/45 dark:text-[#EFEFEF]/45 md:text-[9px]">
                  PLATFORM OVERVIEW
                </span>
              </header>

              {/* MAIN CONTENT */}
              <div className="grid h-[72%] grid-cols-[1.15fr_0.85fr] gap-[3%] px-[4%] py-[3%]">

                {/* LEFT: SERVICES */}
                <div ref={servicePanelRef} className="flex min-w-0 flex-col">

                  <span className="text-[6px] font-semibold tracking-[0.16em] text-[#050505]/45 dark:text-[#EFEFEF]/45 md:text-[9px]">
                    VOICE INFRASTRUCTURE
                  </span>

                  <h3 className="mt-1.5 text-[clamp(11px,1.45vw,21px)] font-medium leading-tight tracking-[-0.045em]">
                    Everything starts
                    <br />
                    with a voice.
                  </h3>

                  <p className="mt-1.5 max-w-[340px] text-[7px] leading-relaxed text-[#050505]/55 dark:text-[#EFEFEF]/55 md:text-[10px]">
                    One connected environment for building
                    intelligent voice experiences.
                  </p>

                  <div className="mt-[4%] flex flex-col gap-1.5 md:gap-2">
                    {services.map((service) => (
                      <div
                        key={service.number}
                        className="immersive-service-row flex min-h-0 items-center gap-2 rounded-lg border border-[#050505]/10 bg-white/65 px-2 py-1.5 dark:border-[#EFEFEF]/10 dark:bg-white/[0.035] md:gap-3 md:px-3 md:py-2"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#050505] text-[7px] font-semibold text-[#EFEFEF] dark:bg-[#EFEFEF] dark:text-[#050505] md:h-8 md:w-8 md:text-[9px]">
                          {service.label}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <strong className="truncate text-[8px] font-medium md:text-xs">
                            {service.name}
                          </strong>

                          <span className="truncate text-[6px] text-[#050505]/45 dark:text-[#EFEFEF]/45 md:text-[9px]">
                            {service.description}
                          </span>
                        </div>

                        <span className="text-[6px] tracking-wider text-[#050505]/40 dark:text-[#EFEFEF]/40 md:text-[8px]">
                          {service.number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: ANALYTICS */}
                <div
                  ref={analyticsRef}
                  className="flex min-w-0 flex-col gap-[5%]"
                >
                  <div className="flex flex-1 flex-col rounded-xl border border-[#050505]/10 bg-white/75 p-[6%] dark:border-[#EFEFEF]/10 dark:bg-white/[0.035]">

                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-semibold tracking-wider md:text-[9px]">
                        WORKSPACE
                      </span>

                      <span className="rounded-full border border-[#050505]/15 px-2 py-0.5 text-[6px] text-[#050505]/50 dark:border-[#EFEFEF]/15 dark:text-[#EFEFEF]/50 md:text-[8px]">
                        PREVIEW
                      </span>
                    </div>

                    <h3 className="mt-3 text-[clamp(11px,1.4vw,20px)] font-medium tracking-tight">
                      Built to connect.
                    </h3>

                    <p className="mt-1 text-[7px] leading-relaxed text-[#050505]/50 dark:text-[#EFEFEF]/50 md:text-[10px]">
                      A unified environment for every stage of voice processing.
                    </p>

                    {/* Monochrome activity chart */}
                    <div className="mt-auto flex h-[38%] items-end gap-[5%] border-b border-[#050505]/10 pb-1 dark:border-[#EFEFEF]/10">
                      {[35, 58, 43, 76, 53, 88, 68, 100].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-[#050505]/[0.75] dark:bg-[#EFEFEF]/[0.75]"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex justify-between text-[6px] text-[#050505]/45 dark:text-[#EFEFEF]/45 md:text-[8px]">
                      <span>VOICE ACTIVITY</span>
                      <span>ILLUSTRATIVE DATA</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#050505]/10 px-[6%] py-[5%] dark:border-[#EFEFEF]/10">
                    <span className="text-[7px] text-[#050505]/45 dark:text-[#EFEFEF]/45 md:text-[9px]">
                      ONE CONNECTED PLATFORM
                    </span>

                    <p className="mt-1 text-[9px] font-medium md:text-sm">
                      Your voice. Your infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTTOM CTA */}
              <div
                ref={ctaRef}
                className="flex h-[17%] items-center justify-between border-t border-[#050505]/10 px-[4%] dark:border-[#EFEFEF]/10"
              >
                <div className="min-w-0 pr-2">
                  <h4 className="text-[9px] font-medium tracking-tight md:text-sm">
                    Ready to build with voice?
                  </h4>

                  <p className="mt-0.5 text-[6px] text-[#050505]/45 dark:text-[#EFEFEF]/45 md:text-[9px]">
                    Explore the Miransas voice platform.
                  </p>
                </div>

                <motion.a
                  href="#features"
                  whileHover={{ y: -2, scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex shrink-0 items-center gap-2 rounded-md bg-[#050505] px-3 py-2 text-[7px] font-medium text-[#EFEFEF] transition-colors hover:bg-[#050505]/80 dark:bg-[#EFEFEF] dark:text-[#050505] dark:hover:bg-[#EFEFEF]/85 md:rounded-lg md:px-5 md:py-3 md:text-[10px]"
                >
                  Explore platform
                  <span aria-hidden="true">↗</span>
                </motion.a>
              </div>
            </div>

            {/* TABLET FRAME + HANDS */}
            <Image
              src="/tablet-hands.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 145vw, 112vw"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-contain"
            />
          </div>
        </div>

        {/* BOTTOM LABEL */}
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[8px] font-semibold tracking-[0.2em] text-[#050505]/40 dark:text-[#EFEFEF]/40 md:bottom-7 md:text-[9px]">
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
