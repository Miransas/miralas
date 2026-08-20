"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Film,
  Maximize2,
  ArrowRight
} from "lucide-react";

// ─── ANIMATION UTILITIES ──────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

function FadeIn({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, isInView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── TYPES ───────────────────────────────────────────────────

interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  duration?: string;
}

// ─── LIGHTBOX ────────────────────────────────────────────────

function Lightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white/60 hover:bg-white/[0.15] hover:text-white transition-all"
      >
        <X className="h-5 w-5" />
      </button>

      <div 
        className="relative max-w-5xl max-h-[85vh] w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <img src={item.src} alt={item.title} className="w-full h-full object-contain rounded-xl" />
        ) : (
          <div className="relative rounded-xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={item.src}
              poster={item.thumbnail}
              className="w-full max-h-[80vh]"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              controls
            />
          </div>
        )}

        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-white/40">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

// ─── VIDEO CARD (Auto-play background) ─────────────────────

function VideoCard({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-[#111] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Video background - auto plays muted */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={item.src}
          poster={item.thumbnail}
          className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1 rounded-full bg-blue-500/15 border border-blue-500/25 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
            <Film className="h-3 w-3" />
            VIDEO
          </span>
          {item.duration && (
            <span className="text-[10px] text-white/30">{item.duration}</span>
          )}
        </div>

        <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-[12px] text-white/35 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Play button - appears on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <Maximize2 className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── IMAGE CARD ────────────────────────────────────────────

function ImageCard({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-[#111] cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={item.src} 
        alt={item.title}
        className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 border border-purple-500/25 px-2 py-0.5 text-[10px] font-semibold text-purple-400 mb-2">
          <ImageIcon className="h-3 w-3" />
          IMAGE
        </span>
        <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-[12px] text-white/35 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ─── MAIN SECTION ───────────────────────────────────────────

export default function MediaShowcase() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const mediaItems: MediaItem[] = [
    {
      id: "1",
      type: "video",
      src: "/videos/voice-clone-demo.mp4",
      thumbnail: "/images/voice-clone-thumb.jpg",
      title: "3-Second Voice Clone",
      description: "Upload any voice sample. Our AI captures timbre, pitch, and emotion instantly.",
      duration: "0:32",
    },
    {
      id: "2",
      type: "image",
      src: "/images/dashboard-dark.jpg",
      title: "Creator Dashboard",
      description: "Manage all your cloned voices, analytics, and streaming integrations in one place.",
    },
    {
      id: "3",
      type: "video",
      src: "/videos/uzbek-tts.mp4",
      thumbnail: "/images/uzbek-thumb.jpg",
      title: "Uzbek Neural TTS",
      description: "Natural Uzbek speech with emotional control. Not translation — native synthesis.",
      duration: "0:45",
    },
    {
      id: "4",
      type: "image",
      src: "/images/youtube-integration.jpg",
      title: "YouTube Super Chat",
      description: "AI reads every donation aloud in your cloned voice while you stream.",
    },
    {
      id: "5",
      type: "video",
      src: "/videos/kick-stream.mp4",
      thumbnail: "/images/kick-thumb.jpg",
      title: "Kick Stream Alerts",
      description: "Custom voice triggers for donations, follows, and subscriptions.",
      duration: "0:28",
    },
    {
      id: "6",
      type: "image",
      src: "/images/api-docs.jpg",
      title: "Developer API",
      description: "Sub-100ms latency. REST and WebSocket support for real-time apps.",
    },
  ];

  const videos = mediaItems.filter(m => m.type === "video");
  const images = mediaItems.filter(m => m.type === "image");

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0d0d12]">
      {/* Subtle bg different from main page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-indigo-900/[0.02] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-16">

        {/* Header */}
        <FadeIn className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-purple-500/50 to-transparent" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            See it in <span className="font-serif italic font-light text-white/40">action.</span>
          </h2>
          <p className="mt-3 text-sm text-white/30 max-w-md">
            Videos auto-play. Images expand. Click anything to see it full screen.
          </p>
        </FadeIn>

        {/* Videos Row */}
        <FadeIn delay={0.1}>
          <div className="mb-3 flex items-center gap-2">
            <Film className="h-3.5 w-3.5 text-blue-400/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">Demos</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {videos.map((item, i) => (
            <FadeIn key={item.id} delay={0.15 + i * 0.1}>
              <div className="aspect-[4/3]">
                <VideoCard item={item} onClick={() => setSelectedItem(item)} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Images Row */}
        <FadeIn delay={0.3}>
          <div className="mb-3 flex items-center gap-2">
            <ImageIcon className="h-3.5 w-3.5 text-purple-400/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">Screenshots</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((item, i) => (
            <FadeIn key={item.id} delay={0.35 + i * 0.1}>
              <div className="aspect-[4/3]">
                <ImageCard item={item} onClick={() => setSelectedItem(item)} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.5} className="mt-14 text-center">
          <button className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-sm font-medium text-white/40 backdrop-blur-md transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-white/70">
            View All Media
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </FadeIn>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}