/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ElementType,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  FileText,
  Globe,
  Headphones,
  MessageSquare,
  Mic,
  Pause,
  Play,
  Settings2,
  Volume2,
} from "lucide-react";

interface Voice {
  id: string;
  label: string;
  title: string;
  desc: string;
  audio: string;
  tone: number;
  colors: [string, string, string];
}

const VOICES: Voice[] = [
  {
    id: "default",
    label: "Narrator",
    title: "Narrator: Deep and Authoritative",
    desc: "Rich, resonant, and trustworthy. For narration and e-learning.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 50,
    colors: ["#a8b5c8", "#64748b", "#172033"],
  },
  {
    id: "v1",
    label: "Energetic",
    title: "Energetic: Fast and Dynamic",
    desc: "High energy for ads and action sequences.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 85,
    colors: ["#fb7185", "#e11d48", "#4c0519"],
  },
  {
    id: "v2",
    label: "Dramatic",
    title: "Dramatic: Intense & Dark",
    desc: "Deep intensity for thrillers and audiobooks.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 20,
    colors: ["#a1a1aa", "#52525b", "#18181b"],
  },
  {
    id: "v3",
    label: "Fluid",
    title: "Fluid: Smooth & Calm",
    desc: "Seamless voice for assistants and avatars.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 60,
    colors: ["#38bdf8", "#0284c7", "#082f49"],
  },
  {
    id: "v4",
    label: "Somber",
    title: "Somber: Calm & Melancholic",
    desc: "Soft tone for documentaries and emotional scenes.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 40,
    colors: ["#a78bfa", "#7c3aed", "#2e1065"],
  },
];

const BOTTOM_TABS: { id: string; icon: ElementType }[] = [
  { id: "Sentezleyici", icon: Settings2 },
  { id: "Metin Düzenleyici", icon: FileText },
  { id: "Ses Klonlama", icon: Mic },
  { id: "Konuşmadan Metne", icon: MessageSquare },
  { id: "Çeviri", icon: Globe },
  { id: "Dublaj", icon: Headphones },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const springSoft = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
} as const;

const springSnappy = {
  type: "spring",
  stiffness: 420,
  damping: 26,
} as const;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");

  const bigint = parseInt(clean, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatTime(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* -------------------------------------------------------------------------- */
/* Premium Sphera                                                             */
/* -------------------------------------------------------------------------- */

function SpheraVisualizer({
  analyser,
  colors,
  isPlaying,
  onClick,
}: {
  analyser: AnalyserNode | null;
  colors: [string, string, string];
  isPlaying: boolean;
  onClick: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = 640;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const frequencyData = new Uint8Array(
      analyser?.frequencyBinCount || 128
    );

    const particles = Array.from({ length: 190 }, (_, index) => ({
      angle: (Math.PI * 2 * index) / 190,
      radius: 145 + Math.random() * 135,
      speed: 0.00012 + Math.random() * 0.00045,
      size: 0.45 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      eccentricity: 0.72 + Math.random() * 0.28,
    }));

    const draw = (time: number) => {
      animationRef.current = requestAnimationFrame(draw);

      const cx = size / 2;
      const cy = size / 2;

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(frequencyData);
      } else {
        for (let i = 0; i < frequencyData.length; i++) {
          frequencyData[i] =
            7 +
            Math.max(
              0,
              Math.sin(time * 0.0015 + i * 0.16)
            ) *
              9;
        }
      }

      let total = 0;

      for (let i = 0; i < frequencyData.length; i++) {
        total += frequencyData[i];
      }

      const average =
        total / Math.max(frequencyData.length, 1);

      const energy = average / 255;

      ctx.clearRect(0, 0, size, size);

      /* ------------------------------ ambient glow ----------------------- */

      const ambient = ctx.createRadialGradient(
        cx,
        cy,
        30,
        cx,
        cy,
        310
      );

      ambient.addColorStop(
        0,
        hexToRgba(colors[0], isPlaying ? 0.13 : 0.06)
      );

      ambient.addColorStop(
        0.35,
        hexToRgba(colors[1], isPlaying ? 0.07 : 0.025)
      );

      ambient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, size, size);

      /* ----------------------------- outer aura -------------------------- */

      for (let aura = 0; aura < 3; aura++) {
        const radius =
          145 +
          aura * 28 +
          energy * (isPlaying ? 22 : 4);

        const auraGradient = ctx.createRadialGradient(
          cx,
          cy,
          radius * 0.6,
          cx,
          cy,
          radius
        );

        auraGradient.addColorStop(
          0,
          hexToRgba(colors[aura % 3], 0)
        );

        auraGradient.addColorStop(
          0.7,
          hexToRgba(
            colors[aura % 3],
            isPlaying ? 0.025 : 0.012
          )
        );

        auraGradient.addColorStop(
          1,
          hexToRgba(colors[aura % 3], 0)
        );

        ctx.fillStyle = auraGradient;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      /* --------------------------- flowing orbit lines ------------------- */

      for (let orbit = 0; orbit < 5; orbit++) {
        const baseRadius =
          137 + orbit * 25;

        const rotation =
          time *
          0.00016 *
          (orbit % 2 === 0 ? 1 : -1) *
          (isPlaying ? 2.3 : 0.7);

        ctx.beginPath();

        for (let i = 0; i <= 240; i++) {
          const normalized = i / 240;

          const angle =
            normalized * Math.PI * 2 +
            rotation;

          const freqIndex = Math.min(
            frequencyData.length - 1,
            Math.floor(
              normalized *
                (frequencyData.length - 1)
            )
          );

          const freq =
            frequencyData[freqIndex] / 255;

          const wave =
            Math.sin(
              angle * (3 + orbit * 0.7) +
                time * 0.0012
            ) *
            freq *
            (5 + orbit * 2);

          const secondaryWave =
            Math.sin(
              angle * 7 -
                time * 0.001 *
                  (orbit + 1)
            ) *
            freq *
            3;

          const radius =
            baseRadius +
            wave +
            secondaryWave;

          const x =
            cx +
            Math.cos(angle) * radius;

          const y =
            cy +
            Math.sin(angle) *
              radius *
              (0.78 + orbit * 0.025);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = hexToRgba(
          colors[orbit % 3],
          isPlaying
            ? 0.08 + energy * 0.15
            : 0.035
        );

        ctx.lineWidth =
          orbit === 0 ? 1.5 : 0.8;

        ctx.shadowBlur = isPlaying ? 10 : 3;
        ctx.shadowColor = colors[orbit % 3];

        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      /* ---------------------------- live particles ----------------------- */

      particles.forEach((particle, index) => {
        const freq =
          frequencyData[
            index % frequencyData.length
          ] / 255;

        particle.angle +=
          particle.speed *
          (isPlaying
            ? 1 + energy * 11
            : 0.45);

        const breathing =
          Math.sin(
            time * 0.0018 +
              particle.phase
          ) *
          5;

        const audioPush =
          freq *
          (isPlaying ? 35 : 7);

        const radius =
          particle.radius +
          breathing +
          audioPush;

        const x =
          cx +
          Math.cos(particle.angle) *
            radius;

        const y =
          cy +
          Math.sin(particle.angle) *
            radius *
            particle.eccentricity;

        const particleAlpha =
          0.12 +
          freq * (isPlaying ? 0.8 : 0.3);

        const particleSize =
          particle.size +
          freq * (isPlaying ? 2.6 : 0.6);

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          particleSize,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = hexToRgba(
          colors[index % 3],
          particleAlpha
        );

        ctx.shadowBlur =
          freq > 0.42 ? 15 : 5;

        ctx.shadowColor =
          colors[index % 3];

        ctx.fill();
      });

      ctx.shadowBlur = 0;

      /* ----------------------------- sphera ------------------------------- */

      const spherePulse =
        1 +
        energy *
          (isPlaying ? 0.07 : 0.018);

      ctx.save();

      ctx.translate(cx, cy);
      ctx.scale(
        spherePulse,
        spherePulse
      );

      /* outer sphere glow */

      const glow = ctx.createRadialGradient(
        0,
        0,
        45,
        0,
        0,
        150
      );

      glow.addColorStop(
        0,
        hexToRgba(colors[0], 0.18)
      );

      glow.addColorStop(
        0.45,
        hexToRgba(colors[1], 0.08)
      );

      glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = glow;

      ctx.beginPath();
      ctx.arc(0, 0, 154, 0, Math.PI * 2);
      ctx.fill();

      /* main sphere */

      const sphere = ctx.createRadialGradient(
        -42,
        -48,
        4,
        10,
        18,
        122
      );

      sphere.addColorStop(
        0,
        colors[0]
      );

      sphere.addColorStop(
        0.24,
        colors[1]
      );

      sphere.addColorStop(
        0.58,
        colors[2]
      );

      sphere.addColorStop(
        0.82,
        "#080d19"
      );

      sphere.addColorStop(
        1,
        "#01030a"
      );

      ctx.fillStyle = sphere;

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        112,
        0,
        Math.PI * 2
      );
      ctx.fill();

      /* inner liquid light */

      const inner = ctx.createRadialGradient(
        -35,
        -40,
        2,
        5,
        5,
        112
      );

      inner.addColorStop(
        0,
        "rgba(255,255,255,0.42)"
      );

      inner.addColorStop(
        0.18,
        hexToRgba(colors[0], 0.28)
      );

      inner.addColorStop(
        0.45,
        hexToRgba(colors[1], 0.11)
      );

      inner.addColorStop(
        0.75,
        "rgba(0,0,0,0.08)"
      );

      inner.addColorStop(
        1,
        "rgba(0,0,0,0.4)"
      );

      ctx.fillStyle = inner;

      ctx.beginPath();
      ctx.arc(
        0,
        0,
        109,
        0,
        Math.PI * 2
      );
      ctx.fill();

      /* moving light inside the sphere */

      const lightAngle =
        time *
        0.00045 *
        (isPlaying ? 2 : 0.5);

      const lightX =
        Math.cos(lightAngle) * 45;

      const lightY =
        Math.sin(lightAngle * 1.3) * 35;

      const movingLight =
        ctx.createRadialGradient(
          lightX,
          lightY,
          0,
          lightX,
          lightY,
          60
        );

      movingLight.addColorStop(
        0,
        "rgba(255,255,255,0.22)"
      );

      movingLight.addColorStop(
        0.35,
        hexToRgba(colors[0], 0.13)
      );

      movingLight.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = movingLight;

      ctx.beginPath();
      ctx.arc(
        lightX,
        lightY,
        62,
        0,
        Math.PI * 2
      );
      ctx.fill();

      /* specular reflection */

      ctx.fillStyle =
        "rgba(255,255,255,0.52)";

      ctx.beginPath();

      ctx.ellipse(
        -38,
        -49,
        29,
        12,
        -0.65,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /* small secondary reflection */

      ctx.fillStyle =
        "rgba(255,255,255,0.18)";

      ctx.beginPath();

      ctx.ellipse(
        42,
        40,
        13,
        7,
        -0.5,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();

      /* ------------------------- reactive sphere ring --------------------- */

      ctx.beginPath();

      for (let i = 0; i <= 180; i++) {
        const angle =
          (i / 180) * Math.PI * 2;

        const freq =
          frequencyData[
            Math.floor(
              (i / 180) *
                (frequencyData.length - 1)
            )
          ] / 255;

        const radius =
          117 +
          freq *
            (isPlaying ? 24 : 5);

        const x =
          cx +
          Math.cos(angle) * radius;

        const y =
          cy +
          Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = hexToRgba(
        colors[0],
        isPlaying ? 0.65 : 0.2
      );

      ctx.lineWidth = 1.25;

      ctx.shadowBlur = isPlaying ? 14 : 4;
      ctx.shadowColor = colors[0];

      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    animationRef.current =
      requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [analyser, colors, isPlaying]);

  return (
    <div className="relative flex size-[640px] max-w-[92vw] items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* subtle glass center */}

      <motion.div
        animate={{
          scale: isPlaying
            ? [1, 1.025, 1]
            : 1,
          opacity: isPlaying
            ? [0.75, 1, 0.75]
            : 0.72,
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute z-10 size-[142px] rounded-full border border-white/20 bg-white/[0.035] shadow-[inset_0_1px_1px_rgba(255,255,255,.22),0_0_60px_rgba(255,255,255,.04)] backdrop-blur-[2px]"
      />

      <motion.button
        type="button"
        onClick={onClick}
        aria-label={
          isPlaying ? "Pause" : "Play"
        }
        whileHover={{
          scale: 1.07,
        }}
        whileTap={{
          scale: 0.93,
        }}
        transition={springSnappy}
        className="relative z-20 flex size-[112px] items-center justify-center rounded-full border border-white/35 bg-white/[0.08] text-white shadow-[inset_0_1px_2px_rgba(255,255,255,.35),0_16px_50px_rgba(0,0,0,.3)] backdrop-blur-xl"
      >
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{
            background: isPlaying
              ? [
                  "radial-gradient(circle, rgba(255,255,255,.12), transparent 65%)",
                  "radial-gradient(circle, rgba(255,255,255,.22), transparent 65%)",
                  "radial-gradient(circle, rgba(255,255,255,.12), transparent 65%)",
                ]
              : "radial-gradient(circle, rgba(255,255,255,.1), transparent 65%)",
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.span
            key={
              isPlaying ? "pause" : "play"
            }
            initial={{
              opacity: 0,
              scale: 0.6,
              rotate: -18,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
              rotate: 18,
            }}
            transition={springSnappy}
            className="relative z-10"
          >
            {isPlaying ? (
              <Pause className="size-7 fill-white" />
            ) : (
              <Play className="ml-1 size-7 fill-white" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Voice Particles                                                             */
/* -------------------------------------------------------------------------- */

function VoiceParticles({
  voices,
  activeId,
  isPlaying,
  onSelect,
}: {
  voices: Voice[];
  activeId: string;
  isPlaying: boolean;
  onSelect: (voice: Voice) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {voices.slice(1).map((voice, index) => {
        const active =
          activeId === voice.id;

        const positions = [
          {
            left: "15%",
            top: "25%",
          },
          {
            left: "24%",
            bottom: "21%",
          },
          {
            right: "17%",
            top: "27%",
          },
          {
            right: "25%",
            bottom: "23%",
          },
        ];

        const position =
          positions[index] || positions[0];

        return (
          <motion.button
            key={voice.id}
            type="button"
            onClick={() => onSelect(voice)}
            className="pointer-events-auto absolute z-40 flex items-center justify-center"
            style={position}
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              scale: active ? 1.15 : 1,
            }}
            transition={{
              delay: 0.3 + index * 0.1,
              ...springSoft,
            }}
            whileHover={{
              scale: 1.28,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            {/* aura */}

            <motion.span
              className="absolute rounded-full blur-2xl"
              style={{
                width: 70,
                height: 70,
                background:
                  voice.colors[0],
              }}
              animate={{
                opacity: active
                  ? [0.25, 0.5, 0.25]
                  : [0.08, 0.18, 0.08],
                scale: isPlaying
                  ? [0.9, 1.18, 0.9]
                  : 1,
              }}
              transition={{
                duration:
                  1.8 + index * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* particle */}

            <motion.span
              className="relative block size-11 rounded-full border border-white/50"
              style={{
                background: `
                  radial-gradient(
                    circle at 28% 24%,
                    ${voice.colors[0]} 0%,
                    ${voice.colors[1]} 45%,
                    ${voice.colors[2]} 100%
                  )
                `,
                boxShadow: `
                  inset 0 1px 2px rgba(255,255,255,.45),
                  0 0 30px ${voice.colors[0]}35
                `,
              }}
              animate={{
                scale: isPlaying
                  ? [1, 1.1, 0.96, 1]
                  : [1, 1.035, 1],
              }}
              transition={{
                duration:
                  1.5 + index * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* label */}

            <motion.span
              className="absolute top-14 whitespace-nowrap rounded-full border bg-white/65 px-2.5 py-1 text-[10px] font-semibold shadow-sm backdrop-blur-xl"
              style={{
                borderColor: active
                  ? `${voice.colors[0]}66`
                  : "rgba(231,229,228,.8)",
                color: active
                  ? voice.colors[1]
                  : "#57534e",
              }}
            >
              {voice.label}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Slider                                                                      */
/* -------------------------------------------------------------------------- */

function RangeSlider({
  value,
  min,
  max,
  onChange,
  accentColor,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
  accentColor: string;
}) {
  const percent =
    ((value - min) / (max - min)) * 100;

  return (
    <div className="relative flex h-5 flex-1 items-center">
      <div className="absolute inset-y-[7px] left-0 right-0 rounded-full bg-stone-200/80" />

      <motion.div
        className="absolute inset-y-[7px] left-0 rounded-full"
        animate={{
          width: `${percent}%`,
          backgroundColor: accentColor,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 32,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      />

      <motion.div
        className="pointer-events-none absolute size-4 rounded-full border border-stone-200 bg-white shadow-sm"
        animate={{
          left: `calc(${percent}% - 8px)`,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 34,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

export default function VoiceLibrary() {
  const [activeVoice, setActiveVoice] =
    useState<Voice>(VOICES[0]);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [activeView, setActiveView] =
    useState("library");

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [tone, setTone] =
    useState(50);

  const [analyserNode, setAnalyserNode] =
    useState<AnalyserNode | null>(null);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const sourceNodeRef =
    useRef<MediaElementAudioSourceNode | null>(
      null
    );

  /* ----------------------------- Audio setup ----------------------------- */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const Ctx =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!Ctx) return;

    if (!audioContextRef.current) {
      audioContextRef.current =
        new Ctx();
    }

    const ctx =
      audioContextRef.current;

    if (!sourceNodeRef.current) {
      try {
        const source =
          ctx.createMediaElementSource(
            audio
          );

        const analyser =
          ctx.createAnalyser();

        analyser.fftSize = 256;

        analyser.smoothingTimeConstant =
          0.78;

        analyser.minDecibels = -85;
        analyser.maxDecibels = -10;

        source.connect(analyser);
        analyser.connect(
          ctx.destination
        );

        sourceNodeRef.current =
          source;

        setAnalyserNode(analyser);
      } catch (error) {
        console.error(
          "AudioContext connection error:",
          error
        );
      }
    }
  }, []);

  /* ----------------------------- Audio events ---------------------------- */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onTime = () => {
      if (audio.duration) {
        setProgress(
          (audio.currentTime /
            audio.duration) *
            100
        );
      }
    };

    const onMeta = () => {
      setDuration(audio.duration);
    };

    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener(
      "timeupdate",
      onTime
    );

    audio.addEventListener(
      "loadedmetadata",
      onMeta
    );

    audio.addEventListener(
      "ended",
      onEnd
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        onTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        onMeta
      );

      audio.removeEventListener(
        "ended",
        onEnd
      );
    };
  }, []);

  /* ----------------------------- Tone ------------------------------------ */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.playbackRate =
      0.75 + (tone / 100) * 0.5;

    audio.preservesPitch = false;
  }, [tone]);

  /* ----------------------------- Playback -------------------------------- */

  const playVoice = async (
    voice?: Voice
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (
      audioContextRef.current?.state ===
      "suspended"
    ) {
      await audioContextRef.current.resume();
    }

    if (voice) {
      audio.src = voice.audio;
      audio.currentTime = 0;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleVoiceSelect = (
    voice: Voice
  ) => {
    setActiveVoice(voice);
    setTone(voice.tone);

    void playVoice(voice);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    void playVoice();
  };

  const primary =
    activeVoice.colors[0];

  const secondary =
    activeVoice.colors[1];

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: easeOut,
      }}
      className="flex min-h-screen items-center justify-center bg-[#f8f7f4] p-4 font-sans text-stone-900 selection:bg-violet-200/50 lg:p-10"
    >
      <audio
        ref={audioRef}
        src={activeVoice.audio}
        crossOrigin="anonymous"
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.97,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.85,
          ease: easeOut,
        }}
        className="relative flex h-[min(800px,94vh)] w-full max-w-[1220px] flex-col overflow-hidden rounded-[2.75rem] border border-stone-200/80 bg-white/80 shadow-[0_30px_100px_-30px_rgba(15,23,42,0.14)] backdrop-blur-3xl"
      >
        {/* ---------------------------------------------------------------- */}
        {/* Ambient top glow                                                 */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[-120px] h-[380px] w-[720px] -translate-x-1/2 rounded-full blur-[120px]"
          animate={{
            backgroundColor:
              secondary,
            opacity: isPlaying
              ? [0.045, 0.1, 0.045]
              : 0.035,
            scale: isPlaying
              ? [1, 1.12, 1]
              : 1,
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Main content                                                      */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative min-h-0 flex-1">
          <AnimatePresence
            mode="wait"
          >
            {activeView === "library" ? (
              <motion.div
                key="library"
                initial={{
                  opacity: 0,
                  scale: 0.985,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 1.015,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.4,
                  ease: easeOut,
                }}
                className="relative flex h-full w-full items-center justify-center overflow-hidden"
              >
                {/* very subtle background grid */}

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      `
                        linear-gradient(
                          rgba(15,23,42,.4) 1px,
                          transparent 1px
                        ),
                        linear-gradient(
                          90deg,
                          rgba(15,23,42,.4) 1px,
                          transparent 1px
                        )
                      `,
                    backgroundSize:
                      "44px 44px",
                  }}
                />

                {/* center radial atmosphere */}

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                  style={{
                    background:
                      `radial-gradient(
                        circle,
                        ${hexToRgba(primary, 0.08)},
                        transparent 68%
                      )`,
                  }}
                />

                <VoiceParticles
                  voices={VOICES}
                  activeId={activeVoice.id}
                  isPlaying={isPlaying}
                  onSelect={handleVoiceSelect}
                />

                <motion.div
                  key={activeVoice.id}
                  initial={{
                    opacity: 0,
                    scale: 0.86,
                    filter: "blur(14px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.65,
                    ease: easeOut,
                  }}
                  className="relative z-20"
                >
                  <SpheraVisualizer
                    analyser={analyserNode}
                    colors={
                      activeVoice.colors
                    }
                    isPlaying={isPlaying}
                    onClick={togglePlay}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="tab"
                initial={{
                  opacity: 0,
                  y: 24,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -16,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: easeOut,
                }}
                className="h-full overflow-y-auto p-8"
              >
                <div className="flex h-full min-h-[400px] flex-col rounded-[2rem] border border-stone-200 bg-stone-50/70 p-8">
                  <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                    Ultura
                  </span>

                  <h2 className="mb-3 text-3xl font-bold tracking-tight text-stone-900">
                    {activeView}
                  </h2>

                  <p className="max-w-xl text-sm leading-relaxed text-stone-500">
                    Bu alan seçilen Ultura
                    aracının çalışma alanıdır.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Voice information                                                 */}
        {/* ---------------------------------------------------------------- */}

        {activeView === "library" && (
          <div className="relative z-30 flex flex-col items-center px-8 pb-5">
            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={activeVoice.id}
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  filter: "blur(6px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: easeOut,
                }}
                className="flex flex-col items-center"
              >
                <h2 className="mb-1 text-lg font-bold tracking-tight text-stone-900">
                  {activeVoice.title}
                </h2>

                <p className="mb-4 max-w-lg text-center text-sm leading-relaxed text-stone-500">
                  {activeVoice.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* progress */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: easeOut,
              }}
              className="mb-4 flex w-full max-w-[430px] items-center gap-3"
            >
              <Clock className="size-3.5 shrink-0 text-stone-400" />

              <span className="w-10 text-right text-[10px] tabular-nums text-stone-400">
                {formatTime(
                  (progress / 100) *
                    duration
                )}
              </span>

              <RangeSlider
                value={progress}
                min={0}
                max={100}
                accentColor={primary}
                onChange={(e) => {
                  const audio =
                    audioRef.current;

                  const value =
                    parseFloat(
                      e.target.value
                    );

                  if (
                    audio &&
                    duration
                  ) {
                    audio.currentTime =
                      (value / 100) *
                      duration;
                  }

                  setProgress(value);
                }}
              />

              <span className="w-10 text-[10px] tabular-nums text-stone-400">
                {formatTime(duration)}
              </span>
            </motion.div>

            {/* tone */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.27,
                duration: 0.5,
                ease: easeOut,
              }}
              className="flex w-full max-w-[330px] items-center gap-3 text-[10px] font-medium text-stone-400"
            >
              <Volume2 className="size-3.5 shrink-0" />

              <span>Warm</span>

              <RangeSlider
                value={tone}
                min={0}
                max={100}
                accentColor={primary}
                onChange={(e) =>
                  setTone(
                    parseInt(
                      e.target.value,
                      10
                    )
                  )
                }
              />

              <span>Bright</span>
            </motion.div>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Bottom navigation                                                 */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative z-40 border-t border-stone-200/70 bg-white/50 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[900px] items-center justify-center gap-1 overflow-x-auto">
            {BOTTOM_TABS.map(
              (tab) => {
                const Icon = tab.icon;

                const active =
                  activeView ===
                  (tab.id ===
                  "Sentezleyici"
                    ? "library"
                    : tab.id);

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveView(
                        tab.id ===
                          "Sentezleyici"
                          ? "library"
                          : tab.id
                      )
                    }
                    className="relative flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-medium transition-colors"
                  >
                    {active && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-stone-100"
                        transition={
                          springSoft
                        }
                      />
                    )}

                    <Icon
                      className={`relative z-10 size-3.5 ${
                        active
                          ? "text-stone-900"
                          : "text-stone-400"
                      }`}
                    />

                    <span
                      className={`relative z-10 ${
                        active
                          ? "text-stone-900"
                          : "text-stone-400"
                      }`}
                    >
                      {tab.id}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}