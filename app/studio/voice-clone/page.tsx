"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mic2,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileAudio,
  Zap,
  Lock,
  Info,
  ChevronRight,
  Volume2,
  Play,
  Pause,
  Sparkles,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── DATA ───
const SUPPORTED_FORMATS = [
  { ext: "MP3", desc: "Most common", max: "10 MB" },
  { ext: "WAV", desc: "Lossless", max: "50 MB" },
  { ext: "FLAC", desc: "Compressed lossless", max: "25 MB" },
  { ext: "OGG", desc: "Open format", max: "10 MB" },
  { ext: "M4A", desc: "Apple / AAC", max: "10 MB" },
  { ext: "WEBM", desc: "Web audio", max: "10 MB" },
];

const TIPS = [
  "Use a quiet room with no background noise",
  "Speak naturally, don't read from a script robotically",
  "Avoid music, echo, or other voices in the background",
  "10 seconds is enough for a basic clone, 1 minute for premium quality",
  "WAV or FLAC gives the best results",
];

// ─── DRAG DROP UPLOADER ───
function VoiceUploader({
  file,
  setFile,
  isUploading,
  progress,
}: {
  file: File | null;
  setFile: (f: File | null) => void;
  isUploading: boolean;
  progress: number;
}) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  }, [setFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "relative rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300",
        dragActive
          ? "border-[#c9a87c] bg-[#c9a87c]/5"
          : file
          ? "border-emerald-500/40 bg-emerald-500/[0.03]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.flac,.ogg,.m4a,.webm,audio/*"
        onChange={handleChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center"
          >
            <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <FileAudio className="size-7 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{file.name}</h3>
            <p className="text-sm text-zinc-500 mb-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            {isUploading && (
              <div className="w-full max-w-xs mt-4">
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-zinc-600 mt-2">Processing... {progress}%</p>
              </div>
            )}
            {!isUploading && (
              <button
                onClick={() => setFile(null)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
              >
                <X className="size-3" />
                Remove and upload another
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-5">
              <Upload className="size-7 text-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop your voice sample here
            </h3>
            <p className="text-sm text-zinc-500 mb-6 max-w-sm">
              Or click to browse. We accept MP3, WAV, FLAC, OGG, M4A, and WEBM.
            </p>
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
            >
              <Upload className="size-4" />
              Choose File
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function VoiceClonePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cloned, setCloned] = useState(false);
  const [playingPreview, setPlayingPreview] = useState(false);

  const handleClone = () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setCloned(true);
          return 100;
        }
        return p + 8;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c9a87c]/30">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#c9a87c]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-[#10b981]/[0.02] blur-[100px]" />
      </div>

      {/* Header */}
      <Header variant="dark"/>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-6">
            <Sparkles className="size-3" />
            AI Voice Cloning
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Clone any voice.
          </h1>
          <p className="text-base text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Upload a short audio sample. Our model learns the tone, pitch, and cadence — then speaks whatever you type.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Uploader (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <VoiceUploader
              file={file}
              setFile={setFile}
              isUploading={isUploading}
              progress={progress}
            />

            {/* Action Bar */}
            <AnimatePresence>
              {file && !cloned && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <button
                    onClick={handleClone}
                    disabled={isUploading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a87c] px-8 py-3 text-sm font-semibold text-[#1c1917] hover:bg-[#b8956a] disabled:opacity-50 disabled:hover:bg-[#c9a87c] transition-all"
                  >
                    <Zap className="size-4" />
                    {isUploading ? "Cloning..." : "Clone This Voice"}
                  </button>
                  <span className="text-xs text-zinc-600">
                    Free trial: 1 clone, up to 10 seconds
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success State */}
            <AnimatePresence>
              {cloned && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                      <CheckCircle2 className="size-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white mb-1">Voice cloned successfully</h3>
                      <p className="text-xs text-zinc-500 mb-4">
                        Your voice is ready. Preview it below or head to the Studio to start generating.
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPlayingPreview(!playingPreview)}
                          className="flex size-10 items-center justify-center rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
                        >
                          {playingPreview ? (
                            <Pause className="size-4 fill-current" />
                          ) : (
                            <Play className="size-4 fill-current ml-0.5" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-emerald-500 rounded-full"
                              animate={{ width: playingPreview ? ["0%", "100%"] : "0%" }}
                              transition={{ duration: 8, ease: "linear" }}
                            />
                          </div>
                        </div>
                        <span className="text-xs text-zinc-600 font-mono">0:08</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href="https://console.miralas.io/studio"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
                        >
                          Go to Studio
                          <ArrowUpRight className="size-3" />
                        </Link>
                        <button
                          onClick={() => { setFile(null); setCloned(false); }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-zinc-400 hover:bg-white/5 transition-colors"
                        >
                          Clone Another
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Info Panel (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="size-4 text-[#c9a87c]" />
                <h3 className="text-sm font-semibold text-white">Pricing</h3>
              </div>

              <div className="space-y-4">
                {/* Free Tier */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Free
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Trial Clone</h4>
                  <p className="text-xs text-zinc-500 mb-3">
                    One-time. No credit card required.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-emerald-500" />
                      1 voice clone
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-emerald-500" />
                      Up to 10 seconds of audio
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-emerald-500" />
                      MP3 output only
                    </li>
                  </ul>
                </div>

                {/* Paid Tier */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-[#c9a87c]/10 border border-[#c9a87c]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#c9a87c]">
                      Pro
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Full Access</h4>
                  <p className="text-xs text-zinc-500 mb-3">
                    Starts at $25 credit. Pay-as-you-go.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-[#c9a87c]" />
                      Unlimited clones
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-[#c9a87c]" />
                      Up to 1 minute of audio
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-[#c9a87c]" />
                      WAV, FLAC, OGG output
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3 text-[#c9a87c]" />
                      Higher fidelity model
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Formats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <FileAudio className="size-4 text-[#c9a87c]" />
                <h3 className="text-sm font-semibold text-white">Supported Formats</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SUPPORTED_FORMATS.map((fmt) => (
                  <div
                    key={fmt.ext}
                    className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white">.{fmt.ext.toLowerCase()}</span>
                      <span className="text-[10px] text-zinc-600">{fmt.max}</span>
                    </div>
                    <p className="text-[10px] text-zinc-600">{fmt.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Info className="size-4 text-[#c9a87c]" />
                <h3 className="text-sm font-semibold text-white">Best Practices</h3>
              </div>
              <ul className="space-y-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-white/5 text-[9px] font-bold text-zinc-600">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Security Note */}
            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 flex items-start gap-3">
              <Lock className="size-4 text-zinc-600 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-600 leading-relaxed">
                Your voice data is encrypted with AES-256 and never used to train our models without explicit consent. Read our{" "}
                <Link href="/privacy" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  );
}