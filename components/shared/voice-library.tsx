/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Pause, Play, Volume2 } from "lucide-react";

interface Voice {
  id: string;
  label: string;
  title: string;
  desc: string;
  bubble: string;
  audio: string;
  tone: number;
  colors: [string, string, string];
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  size?: number;
  delay?: number;
}

const VOICES: Voice[] = [
  {
    id: "default",
    label: "Narrator",
    title: "Narrator: Deep & Authoritative",
    desc: "Rich, resonant, and trustworthy. Perfect for professional narration and e-learning.",
    bubble: "Ok, your narration voice is ready. Deep, resonant tone loaded for professional delivery.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 50,
    colors: ["#64748b", "#475569", "#1e293b"],
    pos: { left: "0", top: "0" },
  },
  {
    id: "v1",
    label: "Energetic",
    title: "Energetic: Fast & Dynamic",
    desc: "High energy output designed for engaging advertisements and action sequences.",
    bubble: "High energy mode activated! This dynamic voice is perfect for ads and action-packed content.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 85,
    colors: ["#f43f5e", "#e11d48", "#9f1239"],
    pos: { left: "6%", top: "10%" },
    size: 76,
    delay: 0,
  },
  {
    id: "v2",
    label: "Dramatic",
    title: "Dramatic: Intense & Dark",
    desc: "Deep emotional intensity suited for thrillers, mysteries, and audiobooks.",
    bubble: "Dramatic intensity loaded. Dark, emotional depth ready for thrillers and mystery storytelling.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 20,
    colors: ["#f59e0b", "#d97706", "#92400e"],
    pos: { left: "8%", bottom: "12%" },
    size: 84,
    delay: 1.5,
  },
  {
    id: "v3",
    label: "Fluid",
    title: "Fluid: Smooth & Calm",
    desc: "Seamless and approachable voice for modern AI assistants and avatars.",
    bubble: "Fluid voice engaged. Smooth, calm delivery optimized for AI assistants and avatar interactions.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 60,
    colors: ["#0ea5e9", "#0284c7", "#0c4a6e"],
    pos: { right: "6%", top: "14%" },
    size: 80,
    delay: 0.7,
  },
  {
    id: "v4",
    label: "Somber",
    title: "Somber: Calm & Melancholic",
    desc: "Soft, whisper-like tone optimized for documentaries and emotional storytelling.",
    bubble: "Somber tone ready. Soft, whisper-like quality loaded for documentaries and emotional narratives.",
    audio: "/sounds/tts-miralas-en.mp3",
    tone: 40,
    colors: ["#8b5cf6", "#7c3aed", "#4c1d95"],
    pos: { right: "8%", bottom: "10%" },
    size: 72,
    delay: 2.2,
  },
];

const springSoft = { type: "spring", stiffness: 200, damping: 24, mass: 0.8 } as const;
const springSnappy = { type: "spring", stiffness: 400, damping: 25 } as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

// Typewriter hook
function useTypewriter(text: string, speed: number = 35) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setIsTyping(false);
      return;
    }
    
    setDisplayed("");
    setIsTyping(true);
    indexRef.current = 0;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed]);

  return { displayed, isTyping };
}

function AmbientAudioBackground({
  analyser,
  isPlaying,
  colors,
}: {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  colors: [string, string, string];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const bufferLength = analyser ? analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);
    let raf = 0;

    const orbs = [
      { x: 100, y: 100, vx: 0.5, vy: 0.7, baseRadius: 120, color: colors[0] },
      { x: 300, y: 200, vx: -0.6, vy: 0.4, baseRadius: 140, color: colors[1] },
      { x: 200, y: 300, vx: 0.4, vy: -0.8, baseRadius: 110, color: colors[2] },
    ];

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      
      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bass = analyser && isPlaying ? dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10 : 0;
      const mid = analyser && isPlaying ? dataArray.slice(10, 30).reduce((a, b) => a + b, 0) / 20 : 0;
      const treble = analyser && isPlaying ? dataArray.slice(30, 60).reduce((a, b) => a + b, 0) / 30 : 0;

      const audios = [bass, mid, treble];

      orbs.forEach((orb, i) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

        const audioScale = (audios[i] / 255) * 100;
        const currentRadius = orb.baseRadius + (isPlaying ? audioScale : Math.sin(time / 1000 + i) * 10);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, Math.max(currentRadius, 10), 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.globalAlpha = isPlaying ? 0.6 : 0.25;
        ctx.fill();
      });
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [analyser, isPlaying, colors]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background transition-colors duration-1000">
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="h-full w-full object-cover blur-[100px] saturate-[1.5] transition-all duration-700"
      />
      <div className="absolute inset-0 bg-background/30 mix-blend-overlay backdrop-blur-[2px]" />
    </div>
  );
}

function CoreOrb({
  colors,
  isPlaying,
  onClick,
}: {
  colors: [string, string, string];
  isPlaying: boolean;
  onClick: () => void;
}) {
  const primary = colors[0];

  return (
    <motion.div
      className="relative z-20 flex size-[260px] items-center justify-center rounded-full border border-border bg-card/10 shadow-[inset_0_0_60px_rgba(255,255,255,0.5),0_24px_50px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:size-[300px]"
      animate={{
        scale: isPlaying ? [1, 1.05, 0.98, 1] : 1,
        boxShadow: isPlaying
          ? [
              `inset 0 0 60px ${primary}30, 0 24px 50px rgba(0,0,0,0.08)`,
              `inset 0 0 100px ${primary}60, 0 30px 60px rgba(0,0,0,0.15)`,
              `inset 0 0 60px ${primary}30, 0 24px 50px rgba(0,0,0,0.08)`,
            ]
          : `inset 0 0 60px rgba(255,255,255,0.5), 0 24px 50px rgba(0,0,0,0.08)`,
      }}
      transition={
        isPlaying
          ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          : springSoft
      }
    >
      <motion.div
        className="absolute inset-3 rounded-full border border-white/30 mix-blend-overlay"
        animate={{ rotate: isPlaying ? 360 : 0, scale: isPlaying ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ borderTopColor: colors[1], borderBottomColor: colors[2] }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-white/20 mix-blend-overlay"
        animate={{ rotate: isPlaying ? -360 : 0 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ borderLeftColor: colors[0], borderRightColor: colors[2] }}
      />

      <motion.button
        type="button"
        onClick={onClick}
        aria-label={isPlaying ? "Pause" : "Play"}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        transition={springSnappy}
        className="relative flex size-24 items-center justify-center overflow-hidden rounded-full bg-background/95 text-foreground shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isPlaying ? "pause" : "play"}
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
            transition={springSnappy}
            className="relative z-10"
          >
            {isPlaying ? (
              <Pause className="size-8 fill-current" />
            ) : (
              <Play className="ml-1 size-8 fill-current" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// CHAT BALONU — Orbit altında, ortada, typewriter efekti
function ChatBubble({
  text,
  visible,
  colors,
}: {
  text: string;
  visible: boolean;
  colors: [string, string, string];
}) {
  const { displayed, isTyping } = useTypewriter(visible ? text : "", 40);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="pointer-events-none absolute left-1/2 z-40 max-w-[340px] -translate-x-1/2 rounded-[20px] border border-border bg-popover/90 px-6 py-4 text-sm font-medium leading-relaxed text-popover-foreground shadow-2xl backdrop-blur-2xl"
          style={{ top: "58%" }}
        >
          <span className="relative z-10">
            {displayed}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="ml-0.5 inline-block h-3.5 w-0.5 bg-popover-foreground/80"
              />
            )}
          </span>
          <div
            className="absolute -top-[7px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-border bg-popover/90"
          />
          <div
            className="absolute -inset-[1px] rounded-[20px] opacity-20 blur-md"
            style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[2]})` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
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
    <div className="relative flex h-6 flex-1 items-center">
      <div className="absolute inset-y-[10px] left-0 right-0 rounded-full bg-foreground/10 shadow-inner" />
      <motion.div
        className="absolute inset-y-[10px] left-0 rounded-full"
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
        className="pointer-events-none absolute size-5 rounded-full border-[3px] border-background bg-background shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
        animate={{ left: `calc(${percent}% - 10px)` }}
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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tone, setTone] = useState(50);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [showBubble, setShowBubble] = useState(false);

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
      setShowBubble(false);
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
      setShowBubble(true);
    } catch {
      setIsPlaying(false);
      setShowBubble(false);
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
      setShowBubble(false);
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
      className="flex min-h-screen items-center justify-center bg-background p-4 font-sans text-foreground selection:bg-foreground/20 lg:p-10"
    >
      <audio ref={audioRef} src={activeVoice.audio} crossOrigin="anonymous" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="relative flex h-[min(840px,94vh)] w-full max-w-[1280px] flex-col overflow-hidden rounded-[3rem] border-2 border-border bg-card/40 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)]"
      >
        <AmbientAudioBackground 
          analyser={analyserNode} 
          isPlaying={isPlaying} 
          colors={activeVoice.colors} 
        />

        <div className="relative z-10 flex flex-1 flex-col justify-between">
          
          <div className="relative flex flex-1 items-center justify-center">
            
            {VOICES.slice(1).map((voice, i) => {
              const active = activeVoice.id === voice.id;
              
              const animX = isPlaying ? [0, 30, -20, 0] : [0, 12, -8, 0];
              const animY = isPlaying ? [0, -30, 20, 0] : [0, -12, 8, 0];

              return (
                <motion.button
                  key={voice.id}
                  type="button"
                  onClick={() => handleVoiceSelect(voice)}
                  className="group absolute z-30 flex cursor-pointer flex-col items-center gap-3"
                  style={voice.pos as CSSProperties}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: animX,
                    y: animY,
                  }}
                  transition={{
                    opacity: { delay: 0.3 + i * 0.1, duration: 0.6, ease: easeOut },
                    scale: { delay: 0.3 + i * 0.1, ...springSoft },
                    x: { duration: 7 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: voice.delay ?? 0 },
                    y: { duration: 8 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: voice.delay ?? 0 }
                  }}
                  whileHover={{ scale: 1.15, zIndex: 40 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    layout
                    className="relative flex items-center justify-center rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl"
                    style={{ 
                      width: voice.size ?? 64, 
                      height: voice.size ?? 64,
                      background: `linear-gradient(135deg, ${voice.colors[0]}, ${voice.colors[1]})`
                    }}
                    animate={{
                      border: active ? `3px solid white` : `2px solid rgba(255,255,255,0.5)`,
                      boxShadow: active 
                        ? `0 0 0 6px rgba(255,255,255,0.25), 0 20px 40px ${voice.colors[0]}50` 
                        : `0 8px 32px rgba(0,0,0,0.1)`,
                      scale: active ? 1.15 : 1,
                    }}
                    transition={springSoft}
                  >
                    {active && isPlaying && (
                       <motion.div 
                         className="absolute inset-0 rounded-full border-2 border-white mix-blend-overlay"
                         animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                         transition={{ duration: 1.5, repeat: Infinity }}
                       />
                    )}
                  </motion.span>
                  <motion.span
                    layout
                    className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-bold text-foreground shadow-sm backdrop-blur-xl"
                    animate={{
                      opacity: active ? 1 : 0.75,
                    }}
                  >
                    {voice.label}
                  </motion.span>
                </motion.button>
              );
            })}

            <motion.div
              key={activeVoice.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="z-20"
            >
              <CoreOrb
                colors={activeVoice.colors}
                isPlaying={isPlaying}
                onClick={togglePlay}
              />
            </motion.div>

            {/* CHAT BALONU — Orbit altında ortada */}
            <ChatBubble 
              text={activeVoice.bubble} 
              visible={showBubble} 
              colors={activeVoice.colors} 
            />
          </div>

          <div className="z-30 p-6 sm:p-8">
            <motion.div 
              className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-border bg-card/60 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-3xl sm:p-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
            >
              <div className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={activeVoice.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-2 text-2xl font-extrabold tracking-tight text-foreground"
                  >
                    {activeVoice.title}
                  </motion.h2>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeVoice.desc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 max-w-md text-center text-sm font-medium leading-relaxed text-muted-foreground"
                  >
                    {activeVoice.desc}
                  </motion.p>
                </AnimatePresence>

                <div className="flex w-full flex-col gap-6">
                  <div className="flex w-full items-center gap-4">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="w-10 text-right text-xs font-bold tabular-nums text-muted-foreground">
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
                    <span className="w-10 text-xs font-bold tabular-nums text-muted-foreground">
                      {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex w-full items-center gap-4 text-xs font-bold text-muted-foreground">
                    <Volume2 className="size-4" />
                    <span>Warm</span>
                    <RangeSlider
                      value={tone}
                      min={0}
                      max={100}
                      accentColor={primary}
                      onChange={(e) => setTone(parseInt(e.target.value, 10))}
                    />
                    <span>Bright</span>
                  </div>
                </div>
              </div>
            </motion.div>
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