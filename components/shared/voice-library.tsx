/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
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
  orbGradient: string;
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  size?: number;
  delay?: number;
}

const VOICES: Voice[] = [
  {
    id: "default",
    label: "Narrator",
    title: "Narrator: Deep and Authoritative",
    desc: "Rich, resonant, and trustworthy. For narration and e-learning.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 50,
    colors: ["#64748b", "#475569", "#1e293b"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#94a3b8,_#475569,_#0f172a)]",
    pos: { left: "0", top: "0" },
  },
  {
    id: "v1",
    label: "Energetic",
    title: "Energetic: Fast and Dynamic",
    desc: "High energy for ads and action sequences.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 85,
    colors: ["#f43f5e", "#e11d48", "#9f1239"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#fb7185,_#e11d48,_#4c0519)]",
    pos: { left: "18%", top: "25%" },
    size: 60,
    delay: 0,
  },
  {
    id: "v2",
    label: "Dramatic",
    title: "Dramatic: Intense & Dark",
    desc: "Deep intensity for thrillers and audiobooks.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 20,
    colors: ["#71717a", "#52525b", "#27272a"],
    orbGradient: "bg-[radial-gradient(circle_at_40%_20%,_#a1a1aa,_#52525b,_#18181b)]",
    pos: { left: "26%", bottom: "20%" },
    size: 70,
    delay: 0.5,
  },
  {
    id: "v3",
    label: "Fluid",
    title: "Fluid: Smooth & Calm",
    desc: "Seamless voice for assistants and avatars.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 60,
    colors: ["#0ea5e9", "#0284c7", "#0c4a6e"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#38bdf8,_#0284c7,_#082f49)]",
    pos: { right: "20%", top: "30%" },
    size: 65,
    delay: 1.2,
  },
  {
    id: "v4",
    label: "Somber",
    title: "Somber: Calm & Melancholic",
    desc: "Soft tone for documentaries and emotional scenes.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 40,
    colors: ["#8b5cf6", "#7c3aed", "#4c1d95"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#a78bfa,_#7c3aed,_#2e1065)]",
    pos: { right: "30%", bottom: "25%" },
    size: 60,
    delay: 0.8,
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

const springSoft = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 } as const;
const springSnappy = { type: "spring", stiffness: 420, damping: 26 } as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const blobRadius = [
  "40% 60% 70% 30% / 40% 50% 60% 50%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "30% 60% 70% 40% / 50% 60% 30% 60%",
  "60% 40% 60% 40% / 70% 30% 50% 50%",
  "40% 60% 70% 30% / 40% 50% 60% 50%",
];

function AliveShaderOrb({
  colors,
  voiceId,
  isPlaying,
  onClick,
}: {
  colors: [string, string, string];
  voiceId: string;
  isPlaying: boolean;
  onClick: () => void;
}) {
  const primary = colors[0];

  return (
    <div className="relative z-10 flex size-[300px] items-center justify-center sm:size-[340px]">
      <AnimatePresence>
        <motion.div
          key={`${voiceId}-glow-a`}
          className="absolute inset-0 rounded-full blur-[70px]"
          style={{ backgroundColor: primary }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: isPlaying ? [0.14, 0.32, 0.14] : 0.1,
            scale: isPlaying ? [1, 1.16, 1] : 1,
          }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute -inset-10 rounded-full blur-[90px]"
        style={{ backgroundColor: colors[1] }}
        animate={{
          opacity: isPlaying ? [0.07, 0.18, 0.07] : 0.05,
          scale: isPlaying ? [1, 1.22, 1] : 1,
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          opacity: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 28, repeat: Infinity, ease: "linear" },
        }}
      />

      <motion.div
        className="relative flex size-[280px] items-center justify-center sm:size-[320px]"
        animate={isPlaying ? { scale: [1, 1.045, 1.02, 1] } : { scale: 1 }}
        transition={
          isPlaying
            ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
            : springSoft
        }
      >
        <motion.div
          className="absolute inset-0 opacity-80 blur-[16px]"
          animate={{
            borderRadius: blobRadius,
            rotate: isPlaying ? 360 : 180,
            scale: isPlaying ? [1, 1.08, 0.96, 1] : [1, 1.03, 1],
          }}
          transition={{ duration: isPlaying ? 10 : 18, repeat: Infinity, ease: "linear" }}
          style={{ background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})` }}
        />
        <motion.div
          className="absolute inset-5 opacity-70 blur-[12px]"
          animate={{
            borderRadius: [...blobRadius].reverse(),
            rotate: isPlaying ? -360 : -120,
          }}
          transition={{ duration: isPlaying ? 14 : 24, repeat: Infinity, ease: "linear" }}
          style={{ background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})` }}
        />
        <motion.div
          className="absolute inset-10 opacity-80 blur-[8px]"
          animate={{ borderRadius: blobRadius, rotate: 360 }}
          transition={{ duration: isPlaying ? 8 : 14, repeat: Infinity, ease: "linear" }}
          style={{
            background: `conic-gradient(from 90deg, ${colors[2]}, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
          }}
        />
        <motion.div
          className="absolute inset-14 rounded-full blur-[4px]"
          animate={{
            scale: isPlaying ? [0.82, 1.18, 0.82] : [0.94, 1.05, 0.94],
            opacity: isPlaying ? [0.4, 0.85, 0.4] : [0.28, 0.48, 0.28],
          }}
          transition={{ duration: isPlaying ? 1.6 : 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: `radial-gradient(circle, ${primary} 0%, transparent 70%)` }}
        />

        <motion.div
          className="relative z-20 flex size-[200px] items-center justify-center rounded-full border border-white/70 bg-white/50 shadow-[inset_0_0_40px_rgba(255,255,255,0.55),0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:size-[220px]"
          animate={{
            boxShadow: isPlaying
              ? [
                  `inset 0 0 36px ${primary}22, 0 18px 40px rgba(15,23,42,0.08)`,
                  `inset 0 0 56px ${primary}40, 0 22px 48px rgba(15,23,42,0.1)`,
                  `inset 0 0 36px ${primary}22, 0 18px 40px rgba(15,23,42,0.08)`,
                ]
              : `inset 0 0 40px rgba(255,255,255,0.55), 0 18px 40px rgba(15,23,42,0.08)`,
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            type="button"
            onClick={onClick}
            aria-label={isPlaying ? "Pause" : "Play"}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={springSnappy}
            className="relative flex size-20 items-center justify-center overflow-hidden rounded-full bg-white text-stone-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
          >
            <motion.span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isPlaying ? "pause" : "play"}
                initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.6, opacity: 0, rotate: 20 }}
                transition={springSnappy}
                className="relative z-10"
              >
                {isPlaying ? (
                  <Pause className="size-7 fill-current" />
                ) : (
                  <Play className="ml-1 size-7 fill-current" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function WaveformVisualizer({
  analyser,
  isPlaying,
  color,
}: {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bufferLength = analyser ? analyser.frequencyBinCount : 48;
    const dataArray = new Uint8Array(bufferLength);
    let raf = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (analyser && isPlaying) analyser.getByteFrequencyData(dataArray);
      else {
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.abs(Math.sin(now / 700 + i * 0.09)) * 20 + 8;
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bufferLength;
      for (let i = 0; i < bufferLength; i++) {
        const h = (dataArray[i] / 255) * canvas.height * 0.82;
        const g = ctx.createLinearGradient(0, canvas.height - h, 0, canvas.height);
        g.addColorStop(0, color);
        g.addColorStop(1, `${color}28`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.roundRect(i * barWidth + 0.6, canvas.height - h, Math.max(barWidth - 1.2, 1), h, 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [analyser, isPlaying, color]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={56}
      height={280}
      initial={{ opacity: 0, x: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
      className="rounded-2xl border border-stone-200/80 bg-white/70 backdrop-blur-md"
    />
  );
}

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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accentColor: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative flex h-5 flex-1 items-center">
      <div className="absolute inset-y-[7px] left-0 right-0 rounded-full bg-stone-200" />
      <motion.div
        className="absolute inset-y-[7px] left-0 rounded-full"
        animate={{ width: `${percent}%`, backgroundColor: accentColor }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
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
        animate={{ left: `calc(${percent}% - 8px)` }}
        transition={{ type: "spring", stiffness: 400, damping: 34 }}
      />
    </div>
  );
}

function formatTime(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VoiceLibrary() {
  const [activeVoice, setActiveVoice] = useState<Voice>(VOICES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeView, setActiveView] = useState("library");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tone, setTone] = useState(50);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new Ctx();
    }
    
    const ctx = audioContextRef.current;

    if (!sourceNodeRef.current) {
      try {
        sourceNodeRef.current = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.85;
        
        sourceNodeRef.current.connect(analyser);
        analyser.connect(ctx.destination);
        setAnalyserNode(analyser);
      } catch (error) {
        console.error("AudioContext connection error:", error);
      }
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = 0.75 + (tone / 100) * 0.5;
    audio.preservesPitch = false;
  }, [tone]);

  const playVoice = async (voice?: Voice) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioContextRef.current?.state === "suspended") await audioContextRef.current.resume();
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

  const handleVoiceSelect = (voice: Voice) => {
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

  const primary = activeVoice.colors[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="flex min-h-screen items-center justify-center bg-[#FAF9F6] p-4 font-sans text-stone-900 selection:bg-violet-200/50 lg:p-10"
    >
      <audio ref={audioRef} src={activeVoice.audio} />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: easeOut }}
        className="relative flex h-[min(760px,92vh)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white/85 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.1)] backdrop-blur-3xl"
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2 rounded-full blur-[110px]"
          animate={{
            backgroundColor: primary,
            opacity: isPlaying ? [0.06, 0.14, 0.06] : 0.05,
            scale: isPlaying ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex min-h-0 flex-1">
          <AnimatePresence mode="wait">
            {activeView === "library" ? (
              <motion.div
                key="library"
                initial={{ opacity: 0, scale: 0.985, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.015, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="flex h-full w-full"
              >
                <div className="relative flex flex-1 items-center justify-center">
                  {VOICES.slice(1).map((voice, i) => {
                    const active = activeVoice.id === voice.id;
                    return (
                      <motion.button
                        key={voice.id}
                        type="button"
                        onClick={() => handleVoiceSelect(voice)}
                        className="group absolute z-20 flex cursor-pointer flex-col items-center gap-2"
                        style={voice.pos as CSSProperties}
                        initial={{ opacity: 0, scale: 0.6, y: 18 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        transition={{
                          opacity: { delay: 0.2 + i * 0.08, duration: 0.5, ease: easeOut },
                          scale: { delay: 0.2 + i * 0.08, ...springSoft },
                          y: {
                            duration: 4 + i * 0.35,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: voice.delay ?? 0,
                          },
                        }}
                        whileHover={{ scale: 1.12, y: -14 }}
                        whileTap={{ scale: 0.94 }}
                      >
                        <motion.span
                          layout
                          className={`rounded-full border shadow-sm ${voice.orbGradient}`}
                          animate={{
                            borderColor: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                            boxShadow: active
                              ? `0 0 0 4px ${voice.colors[0]}33, 0 10px 24px ${voice.colors[0]}2a`
                              : "0 4px 14px rgba(15,23,42,0.08)",
                            scale: active ? 1.08 : 1,
                          }}
                          transition={springSoft}
                          style={{ width: voice.size ?? 56, height: voice.size ?? 56 }}
                        />
                        <motion.span
                          layout
                          className="rounded-full border bg-white/80 px-3 py-1 text-[11px] font-semibold backdrop-blur-md"
                          animate={{
                            borderColor: active ? `${voice.colors[0]}55` : "rgba(231,229,228,0.8)",
                            color: active ? voice.colors[1] : "#57534e",
                          }}
                        >
                          {voice.label}
                        </motion.span>
                      </motion.button>
                    );
                  })}

                  <motion.div
                    key={activeVoice.id}
                    initial={{ opacity: 0.45, scale: 0.88, filter: "blur(16px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: easeOut }}
                  >
                    <AliveShaderOrb
                      voiceId={activeVoice.id}
                      colors={activeVoice.colors}
                      isPlaying={isPlaying}
                      onClick={togglePlay}
                    />
                  </motion.div>
                </div>

                <div className="hidden w-24 items-center justify-center pr-10 sm:flex">
                  <WaveformVisualizer
                    analyser={analyserNode}
                    isPlaying={isPlaying}
                    color={primary}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tab"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="flex-1 overflow-y-auto p-8"
              >
                <div className="h-full rounded-3xl border border-stone-200 bg-stone-50/70 p-8">
                  <h2 className="mb-3 text-2xl font-bold text-stone-900">{activeView}</h2>
                  <p className="mb-8 text-stone-500">Bu alan seçilen taba aittir.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activeView === "library" && (
          <div className="z-10 flex flex-col items-center px-8 pb-6">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeVoice.title}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="mb-1 text-lg font-bold tracking-tight text-stone-900"
              >
                {activeVoice.title}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeVoice.desc}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: easeOut }}
                className="mb-5 max-w-lg text-center text-sm leading-relaxed text-stone-500"
              >
                {activeVoice.desc}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: easeOut }}
              className="mb-5 flex w-full max-w-sm items-center gap-3"
            >
              <Clock className="size-3.5 text-stone-400" />
              <span className="w-10 text-right text-[11px] tabular-nums text-stone-400">
                {formatTime((progress / 100) * duration)}
              </span>
              <RangeSlider
                value={progress}
                min={0}
                max={100}
                accentColor={primary}
                onChange={(e) => {
                  const audio = audioRef.current;
                  const v = parseFloat(e.target.value);
                  if (audio && duration) audio.currentTime = (v / 100) * duration;
                  setProgress(v);
                }}
              />
              <span className="w-10 text-[11px] tabular-nums text-stone-400">
                {formatTime(duration)}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5, ease: easeOut }}
              className="flex w-full max-w-sm items-center gap-4 text-[11px] font-medium text-stone-400"
            >
              <Volume2 className="size-3.5" />
              <span>Warm</span>
              <RangeSlider
                value={tone}
                min={0}
                max={100}
                accentColor={primary}
                onChange={(e) => setTone(parseInt(e.target.value, 10))}
              />
              <span>Bright</span>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}