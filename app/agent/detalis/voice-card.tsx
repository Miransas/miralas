"use client";

import { useEffect, useRef } from "react";
import { CardShell } from "./card-shell";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { Mic, Activity } from "lucide-react";

export function VoiceCard() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const bars = 20;
    const barWidth = 3;
    const gap = 3;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const totalWidth = bars * (barWidth + gap) - gap;
      const startX = (w - totalWidth) / 2;
      const centerY = h / 2;

      for (let i = 0; i < bars; i++) {
        const t = reduced ? 0 : now / 1000;
        const wave1 = Math.sin(i * 0.6 + t * 4);
        const wave2 = Math.cos(i * 0.4 - t * 3);
        const amp = Math.abs(wave1 * wave2);
        const height = reduced ? 10 : 6 + amp * (h * 0.4);

        const x = startX + i * (barWidth + gap);
        const y = centerY - height / 2;

        const grad = ctx.createLinearGradient(x, y + height, x, y);
        grad.addColorStop(0, "rgba(99, 102, 241, 0.15)");
        grad.addColorStop(0.5, "rgba(139, 92, 246, 0.5)");
        grad.addColorStop(1, "rgba(236, 72, 153, 0.9)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <CardShell label="Voice" className="h-full min-h-72">
      <div className="relative flex h-full flex-col items-center justify-between overflow-hidden p-5">
        {/* Glow arka plan */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-purple-500/5" />

        {/* Üst status bar */}
        <div className="relative z-10 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-medium text-stone-400">Agent Online</span>
          </div>
          <Activity className="size-4 text-stone-600" />
        </div>

        {/* Orta mikrofon */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-indigo-500/10 blur-xl" />
            <div className="absolute -inset-2 rounded-full bg-purple-500/10 blur-lg" />
            <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Mic className="size-6 text-white" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Voice Agent</p>
            <p className="text-xs text-stone-500">Ready to listen</p>
          </div>
        </div>

        {/* Ses dalgası */}
        <canvas ref={canvasRef} className="relative z-10 h-14 w-full" />
      </div>
    </CardShell>
  );
}