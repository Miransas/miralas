"use client";

import { useEffect, useRef } from "react";

import { CardShell } from "./card-shell";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";

export function VoiceCard() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    const bars = 28;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const mid = height / 2;
      const gap = 3;
      const bw = (width * 0.7) / bars;
      const startX = width * 0.15;
      for (let i = 0; i < bars; i++) {
        const n = reduced
          ? 0.25 + Math.abs(Math.sin(i * 0.45)) * 0.35
          : 0.18 +
            Math.abs(Math.sin(now / 280 + i * 0.38)) * 0.45 +
            Math.abs(Math.sin(now / 160 + i * 0.9)) * 0.25;
        const h = n * height * 0.42;
        ctx.fillStyle = `rgba(236,236,236,${0.18 + n * 0.35})`;
        const x = startX + i * (bw + gap);
        const y = mid - h;
        const w = Math.max(1.5, bw);
        const hh = Math.max(2, h * 2);
        ctx.beginPath();
        ctx.moveTo(x + 2, y);
        ctx.lineTo(x + w - 2, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + 2);
        ctx.lineTo(x + w, y + hh - 2);
        ctx.quadraticCurveTo(x + w, y + hh, x + w - 2, y + hh);
        ctx.lineTo(x + 2, y + hh);
        ctx.quadraticCurveTo(x, y + hh, x, y + hh - 2);
        ctx.lineTo(x, y + 2);
        ctx.quadraticCurveTo(x, y, x + 2, y);
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
    <CardShell label="Voice" className="min-h-72 md:h-80">
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </CardShell>
  );
}
