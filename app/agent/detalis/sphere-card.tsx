/* eslint-disable prefer-const */
"use client";

import { useEffect, useRef } from "react";
import { CardShell } from "./card-shell";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";

type Pt = { x: number; y: number; z: number; r: number };

function fibonacciSphere(count: number): Pt[] {
  const pts: Pt[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      r: 0.6 + Math.random() * 1.4,
    });
  }
  return pts;
}

export function SphereCard() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const surface = fibonacciSphere(720);
    const inner: Pt[] = Array.from({ length: 180 }, () => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const rad = Math.random() * 0.72;
      return {
        x: rad * Math.sin(phi) * Math.cos(theta),
        y: rad * Math.sin(phi) * Math.sin(theta),
        z: rad * Math.cos(phi),
        r: 0.4 + Math.random(),
      };
    });

    let frame = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2 - 4;
      const R = Math.min(width, height) * 0.34;
      const t = reduced ? 0.6 : now / 1000;
      const rotY = t * 0.35;
      const rotX = 0.35 + Math.sin(t * 0.2) * 0.08;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.35);
      glow.addColorStop(0, "rgba(80, 60, 160, 0.16)");
      glow.addColorStop(0.55, "rgba(20, 40, 80, 0.08)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      const ball = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      ball.addColorStop(0, "rgba(40,40,55,0.5)");
      ball.addColorStop(0.7, "rgba(8,8,12,0.95)");
      ball.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = ball;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 0; i < 48; i++) {
        const a0 = (i / 48) * Math.PI * 2 + t * 0.15;
        const a1 = ((i + 1) / 48) * Math.PI * 2 + t * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${(i * 11 + t * 40) % 360}, 85%, 62%, 0.28)`;
        ctx.lineWidth = 2;
        ctx.arc(0, 0, R + 1.5, a0, a1);
        ctx.stroke();
      }
      ctx.restore();

      const project = (p: Pt) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        return { x: x1, y: y2, z: z2, r: p.r };
      };

      const drawPts = (pts: Pt[], scale: number) => {
        const projected = pts.map(project).sort((a, b) => a.z - b.z);
        for (const p of projected) {
          const px = cx + p.x * R * scale;
          const py = cy + p.y * R * scale;
          const depth = (p.z + 1) / 2;
          const alpha = 0.12 + depth * 0.85;
          const size = p.r * (0.5 + depth * 1.4);
          const hue = p.y > 0.55 ? 270 : p.y < -0.5 ? 190 : 0;
          ctx.fillStyle = hue
            ? `hsla(${hue}, 80%, 70%, ${alpha * 0.9})`
            : `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawPts(inner, 0.72);
      drawPts(surface, 1);

      const spec = ctx.createRadialGradient(
        cx - R * 0.28,
        cy - R * 0.32,
        0,
        cx - R * 0.28,
        cy - R * 0.32,
        R * 0.55,
      );
      spec.addColorStop(0, "rgba(255,255,255,0.14)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <CardShell label="" overlayLabel className="min-h-72 bg-stone-900 md:h-80">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <span className="pointer-events-none absolute right-5 bottom-3 z-10 text-sm text-stone-400">
        Explore →
      </span>
    </CardShell>
  );
}