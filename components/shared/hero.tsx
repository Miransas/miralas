"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Globe2,
  Mic2,
  Play,
  Radio,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent } from "react";

const bars = [
  34, 48, 72, 42, 86, 58, 94, 50, 78, 38,
  68, 96, 56, 82, 44, 74, 92, 52, 66, 40,
  84, 58, 88, 46, 70, 98, 54, 76, 44, 82,
  60, 92, 48, 72, 38, 86, 56, 78, 46, 68,
];

const languages = [
  "O'zbek",
  "Ўзбек",
  "Qaraqalpaq",
  "English",
  "Русский",
];

const trustItems = [
  "Uzbek-first",
  "Realtime ready",
  "API native",
];

export default function HeroSection() {
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 55,
    damping: 20,
    mass: 0.8,
  });

  const springY = useSpring(mouseY, {
    stiffness: 55,
    damping: 20,
    mass: 0.8,
  });

  const orbX = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const orbY = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const ringX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const ringY = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const floatX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const floatY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduced) return;

    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) / rect.width - 0.5,
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height - 0.5,
    );
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      className="
        relative
        isolate
        min-h-screen
        overflow-hidden
        bg-background
        text-foreground
        transition-colors
        duration-500
      "
    >
      {/* =====================================================
          ATMOSPHERE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          overflow-hidden
        "
      >
        {/* Central ambient light */}

        <div
          className="
            absolute
            left-1/2
            top-[34%]
            size-[46rem]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-sky-500/[0.045]
            blur-[120px]
            dark:bg-sky-400/[0.075]
          "
        />

        <div
          className="
            absolute
            left-[8%]
            top-[12%]
            size-[24rem]
            rounded-full
            bg-cyan-400/[0.025]
            blur-[100px]
            dark:bg-cyan-400/[0.04]
          "
        />

        <div
          className="
            absolute
            right-[5%]
            top-[22%]
            size-[22rem]
            rounded-full
            bg-emerald-400/[0.02]
            blur-[100px]
            dark:bg-emerald-400/[0.035]
          "
        />

        {/* Extremely subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.28]
            [background-image:linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)]
            [background-size:72px_72px]
            [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_68%,transparent_100%)]
          "
        />

        {/* Grain */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:radial-gradient(circle_at_center,currentColor_1px,transparent_1px)]
            [background-size:6px_6px]
          "
        />
      </div>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1500px]
          flex-col
          items-center
          px-6
          pb-24
          pt-32
          sm:pt-36
          lg:px-8
          xl:pb-28
        "
      >
        {/* ===================================================
            TOP BADGE
            =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-border
            bg-card/80
            px-4
            py-2
            text-xs
            font-medium
            text-muted-foreground
            shadow-sm
            backdrop-blur-xl
          "
        >
          <span className="relative flex size-2">
            <span
              className="
                absolute
                inline-flex
                size-full
                animate-ping
                rounded-full
                bg-emerald-500/40
              "
            />

            <span
              className="
                relative
                inline-flex
                size-2
                rounded-full
                bg-emerald-500
              "
            />
          </span>

          <span>Miralas Voice Infrastructure</span>

          <span className="mx-0.5 h-3 w-px bg-border" />

          <span className="text-foreground">
            Uzbek-first AI
          </span>
        </motion.div>

        {/* ===================================================
            HERO COPY
            =================================================== */}

        <div className="relative z-20 mt-8 max-w-5xl text-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: 28,
              filter: "blur(14px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-balance
              text-5xl
              font-semibold
              leading-[0.92]
              tracking-[-0.055em]
              sm:text-7xl
              lg:text-[6.5rem]
              xl:text-[7.8rem]
            "
          >
            Voice that
            <br />

            <span
              className="
                bg-gradient-to-r
                from-foreground
                via-foreground
                to-muted-foreground
                bg-clip-text
                text-transparent
              "
            >
              feels alive.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 22,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-pretty
              text-base
              leading-7
              text-muted-foreground
              sm:text-lg
              sm:leading-8
            "
          >
            Uzbek-first AI voice infrastructure for creators,
            products and developers — built to sound natural,
            precise and unmistakably human.
          </motion.p>

          {/* Actions */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Link
              href="/get-started"
              className="
                premium-button
                group
                h-12
                rounded-full
                px-6
                text-sm
                font-semibold
              "
            >
              <span>Start creating</span>

              <ArrowRight
                className="
                  size-4
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </Link>

            <Link
              href="/demo"
              className="
                premium-button-ghost
                h-12
                rounded-full
                px-6
                text-sm
                font-semibold
              "
            >
              <Play className="size-4" />
              Watch the demo
            </Link>
          </motion.div>

          {/* Trust */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.42,
            }}
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-5
              gap-y-2
              text-xs
              font-medium
              text-muted-foreground
            "
          >
            {trustItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5"
              >
                <Check className="size-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ===================================================
            VOICE CORE
            =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 35,
            filter: "blur(18px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.15,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            mt-16
            h-[480px]
            w-full
            max-w-[1000px]
            sm:h-[560px]
            lg:mt-20
            lg:h-[620px]
          "
        >
          {/* =================================================
              ORBITAL RINGS
              ================================================= */}

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: ringX,
                    y: ringY,
                  }
            }
            className="
              absolute
              left-1/2
              top-1/2
              size-[310px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-sky-500/[0.12]
              sm:size-[390px]
              dark:border-sky-300/[0.12]
            "
          />

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: orbX,
                    y: orbY,
                    rotate: 360,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="
              absolute
              left-1/2
              top-1/2
              size-[420px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-dashed
              border-border
              sm:size-[510px]
            "
          />

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: orbX,
                    y: orbY,
                  }
            }
            className="
              absolute
              left-1/2
              top-1/2
              size-[210px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-sky-500/[0.08]
              blur-[70px]
              dark:bg-sky-400/[0.12]
              sm:size-[280px]
            "
          />

          {/* =================================================
              CORE
              ================================================= */}

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: orbX,
                    y: orbY,
                  }
            }
            className="
              absolute
              left-1/2
              top-1/2
              size-[180px]
              -translate-x-1/2
              -translate-y-1/2
              sm:size-[230px]
            "
          >
            {/* Outer glow */}

            <div
              className="
                absolute
                inset-[-35px]
                rounded-full
                bg-sky-400/[0.06]
                blur-3xl
                dark:bg-sky-400/[0.10]
              "
            />

            {/* Main core */}

            <div
              className="
                relative
                flex
                size-full
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-border
                bg-card
                shadow-[0_30px_100px_-40px_rgba(14,165,233,0.35)]
                dark:shadow-[0_30px_120px_-45px_rgba(56,189,248,0.45)]
              "
            >
              {/* Inner gradient */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_35%_25%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_70%_75%,rgba(16,185,129,0.10),transparent_38%)]
                  dark:bg-[radial-gradient(circle_at_35%_25%,rgba(125,211,252,0.16),transparent_35%),radial-gradient(circle_at_70%_75%,rgba(52,211,153,0.12),transparent_38%)]
                "
              />

              {/* Waveform */}

              <div
                className="
                  relative
                  flex
                  h-20
                  w-28
                  items-center
                  gap-1
                  sm:h-24
                  sm:w-36
                "
              >
                {bars.slice(8, 28).map((height, index) => (
                  <motion.span
                    key={index}
                    className="
                      flex-1
                      rounded-full
                      bg-gradient-to-t
                      from-sky-500
                      via-cyan-400
                      to-emerald-300
                      dark:from-sky-300
                      dark:via-cyan-200
                      dark:to-emerald-200
                    "
                    animate={
                      reduced
                        ? {
                            height: `${Math.max(
                              18,
                              height * 0.5,
                            )}%`,
                          }
                        : {
                            height: [
                              `${Math.max(
                                18,
                                height * 0.45,
                              )}%`,
                              `${height}%`,
                              `${Math.max(
                                20,
                                height * 0.6,
                              )}%`,
                            ],
                            opacity: [0.5, 1, 0.7],
                          }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: index * 0.055,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Core icon */}

              <div
                className="
                  absolute
                  bottom-5
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-border
                  bg-background/75
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-muted-foreground
                  backdrop-blur-md
                "
              >
                <Mic2 className="size-3" />
                Voice Core
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FLOATING CARD — LANGUAGE
              ================================================= */}

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: floatX,
                    y: floatY,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    y: [0, -8, 0],
                  }
            }
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
              absolute
              left-[4%]
              top-[24%]
              hidden
              w-48
              sm:block
              lg:left-[7%]
            "
          >
            <div className="premium-card p-4">
              <div className="flex items-center gap-2">
                <Globe2 className="size-4 text-sky-500" />

                <span className="text-xs font-semibold">
                  Languages
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {languages.slice(0, 3).map((language) => (
                  <span
                    key={language}
                    className="
                      rounded-full
                      border
                      border-border
                      bg-background
                      px-2.5
                      py-1
                      text-[10px]
                      font-medium
                      text-muted-foreground
                    "
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FLOATING CARD — LATENCY
              ================================================= */}

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: floatX,
                    y: floatY,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    y: [0, 7, 0],
                  }
            }
            transition={{
              y: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
            }}
            className="
              absolute
              right-[4%]
              top-[22%]
              hidden
              w-48
              sm:block
              lg:right-[7%]
            "
          >
            <div className="premium-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-amber-500" />

                  <span className="text-xs font-semibold">
                    Inference
                  </span>
                </div>

                <span className="size-2 rounded-full bg-emerald-500" />
              </div>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-2xl font-semibold tracking-tight">
                  24
                </span>

                <span className="mb-1 text-xs text-muted-foreground">
                  ms latency
                </span>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FLOATING CARD — API
              ================================================= */}

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: floatX,
                    y: floatY,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    y: [0, -6, 0],
                  }
            }
            transition={{
              y: {
                duration: 5.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.3,
              },
            }}
            className="
              absolute
              bottom-[13%]
              left-[10%]
              hidden
              w-52
              sm:block
              lg:left-[14%]
            "
          >
            <div className="premium-card p-4">
              <div className="flex items-center gap-2">
                <Code2 className="size-4 text-violet-500" />

                <span className="text-xs font-semibold">
                  Developer API
                </span>
              </div>

              <div className="mt-3 rounded-lg bg-muted px-3 py-2 font-mono text-[10px] text-muted-foreground">
                voice.generate()
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FLOATING CARD — LIVE
              ================================================= */}

          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: floatX,
                    y: floatY,
                  }
            }
            animate={
              reduced
                ? undefined
                : {
                    y: [0, 8, 0],
                  }
            }
            transition={{
              y: {
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.7,
              },
            }}
            className="
              absolute
              bottom-[12%]
              right-[10%]
              hidden
              w-52
              sm:block
              lg:right-[14%]
            "
          >
            <div className="premium-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="size-4 text-emerald-500" />

                  <span className="text-xs font-semibold">
                    Live synthesis
                  </span>
                </div>

                <span className="text-[10px] font-medium text-emerald-500">
                  ACTIVE
                </span>
              </div>

              <div className="mt-4 flex h-8 items-center gap-1">
                {bars.slice(0, 14).map((height, index) => (
                  <motion.span
                    key={index}
                    className="
                      flex-1
                      rounded-full
                      bg-emerald-500/60
                    "
                    animate={
                      reduced
                        ? undefined
                        : {
                            height: [
                              `${height * 0.35}%`,
                              `${height * 0.7}%`,
                              `${height * 0.45}%`,
                            ],
                          }
                    }
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.05,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* =================================================
              ORBIT DOTS
              ================================================= */}

          <motion.span
            animate={
              reduced
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              size-[430px]
              -translate-x-1/2
              -translate-y-1/2
              sm:size-[520px]
            "
          >
            <span
              className="
                absolute
                left-[4%]
                top-1/2
                size-2
                rounded-full
                bg-sky-400
                shadow-[0_0_18px_rgba(56,189,248,0.65)]
              "
            />

            <span
              className="
                absolute
                right-[8%]
                top-[22%]
                size-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_16px_rgba(52,211,153,0.65)]
              "
            />
          </motion.span>
        </motion.div>

        {/* ===================================================
            BOTTOM SIGNAL
            =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="
            relative
            z-20
            mt-2
            flex
            items-center
            gap-3
            text-xs
            font-medium
            text-muted-foreground
          "
        >
          <Sparkles className="size-3.5 text-sky-500" />

          <span>
            One voice layer.
          </span>

          <span className="size-1 rounded-full bg-border" />

          <span>
            Infinite products.
          </span>

          <Wand2 className="size-3.5 text-emerald-500" />
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM FADE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-32
          bg-gradient-to-t
          from-background
          to-transparent
        "
      />
    </section>
  );
}