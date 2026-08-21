/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Settings2,
  FileText,
  Mic,
  MessageSquare,
  Globe,
  Headphones,
  Volume2,
  Clock,
} from "lucide-react";

// --- TIPLER ---
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

interface Tab {
  id: string;
  icon: React.ElementType;
}

// --- SES VERITABANI ---
const VOICES: Voice[] = [
  {
    id: "default",
    label: "Narrator",
    title: "Narrator: Deep and Authoritative",
    desc: "Rich, resonant, and trustworthy tone. Perfect for complex narrations and e-learning.",
    audio: "/ses-default.mp3",
    tone: 50,
    colors: ["#c9a87c", "#a89060", "#8b7355"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#c9a87c,_#a89060,_#1c1917)]",
    pos: { left: "0", top: "0" },
  },
  {
    id: "v1",
    label: "Energetic",
    title: "Energetic: Fast and Dynamic",
    desc: "High energy tone for commercials, dynamic ads, and action sequences.",
    audio: "/ses-energetic-1.mp3",
    tone: 85,
    colors: ["#d97706", "#b45309", "#92400e"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#d97706,_#b45309,_#1c1917)]",
    pos: { left: "18%", top: "25%" },
    size: 60,
    delay: 0,
  },
  {
    id: "v2",
    label: "Dramatic",
    title: "Dramatic: Intense & Dark",
    desc: "Deep, intense voice tailored for thrillers, audiobooks, and dramatic storytelling.",
    audio: "/ses-dramatic-1.mp3",
    tone: 20,
    colors: ["#78716c", "#57534e", "#44403c"],
    orbGradient: "bg-[radial-gradient(circle_at_40%_20%,_#78716c,_#57534e,_#1c1917)]",
    pos: { left: "26%", bottom: "20%" },
    size: 70,
    delay: 0.5,
  },
  {
    id: "v3",
    label: "Fluid",
    title: "Fluid: Smooth & Calm",
    desc: "Seamless, smooth voice blending well with AI avatars and virtual assistants.",
    audio: "/ses-fluid.mp3",
    tone: 60,
    colors: ["#0ea5e9", "#0284c7", "#0369a1"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#0ea5e9,_#0284c7,_#0c4a6e)]",
    pos: { right: "20%", top: "30%" },
    size: 65,
    delay: 1.2,
  },
  {
    id: "v4",
    label: "Somber",
    title: "Somber: Calm & Melancholic",
    desc: "Soft and melancholic tone, ideal for emotional scenes and documentaries.",
    audio: "/ses-somber.mp3",
    tone: 40,
    colors: ["#6366f1", "#4f46e5", "#3730a3"],
    orbGradient: "bg-[radial-gradient(circle_at_30%_30%,_#6366f1,_#4f46e5,_#1e1b4b)]",
    pos: { right: "30%", bottom: "25%" },
    size: 60,
    delay: 0.8,
  },
];

const BOTTOM_TABS: Tab[] = [
  { id: "Sentezleyici", icon: Settings2 },
  { id: "Metin Düzenleyici", icon: FileText },
  { id: "Ses Klonlama", icon: Mic },
  { id: "Konuşmadan Metne", icon: MessageSquare },
  { id: "Çeviri", icon: Globe },
  { id: "Dublaj", icon: Headphones },
];

// --- CANLI ORB + GLOW ---
const AliveShaderOrb = ({
  colors,
  isPlaying,
  onClick,
}: {
  colors: [string, string, string];
  isPlaying: boolean;
  onClick: () => void;
}) => {
  const blobVariants = [
    { borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", rotate: 0 },
    { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", rotate: 90 },
    { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%", rotate: 180 },
    { borderRadius: "60% 40% 60% 40% / 70% 30% 50% 50%", rotate: 270 },
    { borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", rotate: 360 },
  ];

  const primaryColor = colors[0];

  return (
    <div className="relative flex items-center justify-center z-10 w-[340px] h-[340px]">
      {/* AMBIENT GLOW — ses rengine göre pulse */}
      <motion.div
        className="absolute inset-0 rounded-full blur-[60px]"
        style={{ backgroundColor: primaryColor }}
        animate={{
          opacity: isPlaying ? [0.15, 0.35, 0.15] : 0.06,
          scale: isPlaying ? [1, 1.15, 1] : 1,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-8 rounded-full blur-[80px]"
        style={{ backgroundColor: primaryColor }}
        animate={{
          opacity: isPlaying ? [0.08, 0.2, 0.08] : 0.03,
          scale: isPlaying ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* ORB CONTAINER */}
      <motion.div
        className="relative flex items-center justify-center w-[320px] h-[320px]"
        animate={{ scale: isPlaying ? [1, 1.06, 1.03] : 1 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Katman 1: Ana Blob */}
        <motion.div
          className="absolute inset-0 opacity-90 mix-blend-multiply blur-[14px]"
          animate={{
            borderRadius: blobVariants.map((v) => v.borderRadius),
            rotate: blobVariants.map((v) => v.rotate),
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})` }}
        />
        {/* Katman 2: İkinci Blob */}
        <motion.div
          className="absolute inset-4 opacity-80 mix-blend-screen blur-[10px]"
          animate={{
            borderRadius: [...blobVariants].reverse().map((v) => v.borderRadius),
            rotate: [360, 270, 180, 90, 0],
            scale: [1.05, 0.9, 1.15, 1, 1.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})` }}
        />
        {/* Katman 3: Merkez Parlaklık */}
        <motion.div
          className="absolute inset-8 opacity-90 blur-[6px]"
          animate={{
            borderRadius: blobVariants.map((v) => v.borderRadius),
            rotate: [0, 120, 240, 360],
            scale: [0.9, 1.1, 0.95, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            background: `conic-gradient(from 90deg, ${colors[2]}, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
          }}
        />
        {/* Katman 4: İç Nefes */}
        <motion.div
          className="absolute inset-12 rounded-full opacity-60 blur-[3px]"
          animate={{
            scale: isPlaying ? [0.8, 1.2, 0.8] : [0.9, 1.1, 0.9],
            opacity: isPlaying ? [0.4, 0.85, 0.4] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)` }}
        />
        {/* Katman 5: Dış Halka */}
        <motion.div
          className="absolute -inset-4 rounded-full opacity-40 blur-[18px]"
          animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ background: `radial-gradient(circle, ${colors[2]} 0%, transparent 60%)` }}
        />
        {/* Parçacık Halkaları */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                background: colors[i % 3],
                left: "50%",
                top: "50%",
                marginLeft: -5,
                marginTop: -5,
              }}
              animate={{
                x: Math.cos((deg * Math.PI) / 180) * 145,
                y: Math.sin((deg * Math.PI) / 180) * 145,
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </motion.div>

        {/* Cam Merkez ve Buton */}
        <div className="relative w-[220px] h-[220px] rounded-full bg-white/15 backdrop-blur-2xl shadow-[inset_0_0_50px_rgba(255,255,255,0.3),0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center border border-white/50 z-20">
          {/* İç glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `inset 0 0 30px ${primaryColor}30`,
            }}
            animate={{
              boxShadow: isPlaying
                ? [`inset 0 0 30px ${primaryColor}20`, `inset 0 0 50px ${primaryColor}40`, `inset 0 0 30px ${primaryColor}20`]
                : `inset 0 0 30px ${primaryColor}15`,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <button
            onClick={onClick}
            className="relative z-10 w-20 h-20 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 text-[#2d2a26] group"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- WAVEFORM ---
const WaveformVisualizer = ({
  analyser,
  isPlaying,
  color,
}: {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  color: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser ? analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        const time = Date.now() / 600;
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.abs(Math.sin(time + i * 0.08)) * 22 + 6;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.82;
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}22`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 1, barHeight, 3);
        ctx.fill();
        x += barWidth;
      }
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isPlaying, color]);

  return (
    <div className="relative">
      {/* Glow behind canvas */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl"
        style={{ backgroundColor: color }}
        animate={{ opacity: isPlaying ? [0.1, 0.25, 0.1] : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <canvas
        ref={canvasRef}
        width={56}
        height={280}
        className="relative z-10 rounded-2xl bg-white/40 backdrop-blur-md border border-white/50"
      />
    </div>
  );
};

// --- CUSTOM RANGE SLIDER ---
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accentColor: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative flex-1 h-5 flex items-center">
      <div className="absolute inset-y-[7px] left-0 right-0 rounded-full bg-[#e8e0d5]" />
      <div
        className="absolute inset-y-[7px] left-0 rounded-full transition-all duration-150"
        style={{ width: `${percent}%`, backgroundColor: accentColor }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div
        className="absolute h-4 w-4 rounded-full bg-white shadow-md border border-[#e8e0d5] pointer-events-none transition-all duration-150"
        style={{ left: `calc(${percent}% - 8px)` }}
      />
    </div>
  );
}

// --- ANA UYGULAMA ---
export default function App() {
  const [activeVoice, setActiveVoice] = useState<Voice>(VOICES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeView, setActiveView] = useState("library");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tone, setTone] = useState(50);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const source = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.85;
      setAnalyserNode(analyser);
      source.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
    }
    return () => {
      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close();
      }
    };
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
    const rate = 0.75 + (tone / 100) * 0.5;
    audio.playbackRate = rate;
    (audio as any).preservesPitch = false;
    (audio as any).mozPreservesPitch = false;
    (audio as any).webkitPreservesPitch = false;
  }, [tone]);

  const handleVoiceSelect = (voice: Voice) => {
    setActiveVoice(voice);
    setTone(voice.tone);
    const audio = audioRef.current;
    if (audio) {
      audio.src = voice.audio;
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTone(parseInt(e.target.value));
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const primaryColor = activeVoice.colors[0];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 lg:p-10 font-sans selection:bg-[#c9a87c]/30">
      <audio ref={audioRef} src={activeVoice.audio} crossOrigin="anonymous" />

      {/* Main Card */}
      <div className="w-full max-w-[1180px] h-[760px] bg-white/80 backdrop-blur-3xl border border-[#e8e0d5]/60 rounded-[2.5rem] shadow-[0_24px_80px_-20px_rgba(45,42,38,0.08)] flex flex-col relative overflow-hidden">

        {/* Top ambient glow when playing */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: primaryColor }}
          animate={{ opacity: isPlaying ? [0.06, 0.14, 0.06] : 0.02 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="flex-1 relative w-full overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {activeView === "library" ? (
              <motion.div
                key="library-view"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-row w-full h-full"
              >
                {/* Sol: Orb + küçük küreler */}
                <div className="flex-1 relative flex items-center justify-center">
                  {/* Background subtle grid */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#2d2a26 1px, transparent 1px), linear-gradient(90deg, #2d2a26 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {VOICES.slice(1).map((voice) => (
                    <motion.button
                      key={voice.id}
                      onClick={() => handleVoiceSelect(voice)}
                      className="flex flex-col items-center gap-2 absolute z-20 group cursor-pointer"
                      style={voice.pos as React.CSSProperties}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: voice.delay || 0,
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                        className={`rounded-full shadow-lg shadow-black/5 ${voice.orbGradient} border-[1.5px] border-white/30 group-hover:scale-110 group-hover:border-white/70 transition-all duration-300`}
                        style={{
                          width: voice.size || 56,
                          height: voice.size || 56,
                          boxShadow: `inset 0 0 12px rgba(255,255,255,0.3), 0 4px 20px ${voice.colors[0]}20`,
                        }}
                      />
                      <span className="text-[11px] font-semibold text-[#5c5548] bg-white/70 px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-[#e8e0d5]/50">
                        {voice.label}
                      </span>
                    </motion.button>
                  ))}

                  <AliveShaderOrb
                    colors={activeVoice.colors}
                    isPlaying={isPlaying}
                    onClick={togglePlay}
                  />
                </div>

                {/* Sağ: Waveform */}
                <div className="w-24 flex items-center justify-center pr-10">
                  <WaveformVisualizer
                    analyser={analyserNode}
                    isPlaying={isPlaying}
                    color={primaryColor}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tab-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 p-8 overflow-y-auto"
              >
                <div className="w-full h-full bg-[#faf6f0]/60 backdrop-blur-xl border border-[#e8e0d5]/50 rounded-3xl p-8 shadow-inner">
                  <h2 className="text-2xl font-bold text-[#2d2a26] mb-4">
                    {activeView}
                  </h2>
                  <p className="text-[#8a8278] mb-8">
                    Bu alan, alt menüden seçtiğiniz taba aittir.
                  </p>
                  <div className="w-full h-64 border-2 border-dashed border-[#e8e0d5] rounded-2xl flex items-center justify-center text-[#a8a095]">
                    Sizin componentiniz buraya gelecek...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Info & Controls */}
        {activeView === "library" && (
          <div className="flex flex-col items-center pb-6 z-10 px-8">
            <h2 className="text-lg font-bold text-[#2d2a26] mb-1 tracking-tight">
              {activeVoice.title}
            </h2>
            <p className="text-[#8a8278] text-sm max-w-lg text-center mb-5 leading-relaxed">
              {activeVoice.desc}
            </p>

            {/* Progress */}
            <div className="w-full max-w-sm flex items-center gap-3 mb-5">
              <Clock className="size-3.5 text-[#a8a095]" />
              <span className="text-[11px] text-[#a8a095] w-10 text-right tabular-nums">
                {formatTime((progress / 100) * duration)}
              </span>
              <RangeSlider
                value={progress}
                min={0}
                max={100}
                onChange={handleSeek}
                accentColor={primaryColor}
              />
              <span className="text-[11px] text-[#a8a095] w-10 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>

            {/* Tone */}
            <div className="flex items-center gap-4 text-[11px] text-[#a8a095] font-medium w-full max-w-sm">
              <Volume2 className="size-3.5 text-[#a8a095]" />
              <span className="whitespace-nowrap">Warm</span>
              <RangeSlider
                value={tone}
                min={0}
                max={100}
                onChange={handleToneChange}
                accentColor={primaryColor}
              />
              <span className="whitespace-nowrap">Bright</span>
            </div>
          </div>
        )}

        {/* Bottom Tabs */}
        {/* <div className="border-t border-[#e8e0d5]/60 bg-[#faf6f0]/40 backdrop-blur-xl px-6 py-3">
          <div className="flex items-center justify-center gap-1">
            {BOTTOM_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`
                    relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all duration-300
                    ${isActive
                      ? "bg-white text-[#2d2a26] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#e8e0d5]/50"
                      : "text-[#a8a095] hover:text-[#5c5548] hover:bg-white/40"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl border border-[#e8e0d5]/60 bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="size-4" strokeWidth={isActive ? 2.5 : 1.5} />
                    {tab.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}