"use client"
/* eslint-disable react-hooks/refs */
import { useEffect, useRef } from "react";
import { useAsciiIntensity } from "@/components/shaders/ascii-intensity";





const CHARS = " .·:-=+*#%@";

export type AsciiVariant = "sphere" | "waves" | "grid";

/**
 * Live "shader-like" ASCII field rendered on a 2D canvas.
 * Pure CPU (no WebGPU required). Brightness and motion follow the global
 * intensity slider and are eased smoothly; motion freezes under
 * prefers-reduced-motion while brightness still responds.
 */
export function AsciiBackground({
  variant = "sphere",
  cell = 11,
  className = "",
}: {
  variant?: AsciiVariant;
  cell?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { intensity, reducedMotion } = useAsciiIntensity();

  // live targets read inside the animation loop (no effect restarts)
  const targetRef = useRef(intensity);
  const reducedRef = useRef(reducedMotion);
  targetRef.current = intensity;
  reducedRef.current = reducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      ctx.font = `${cell}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // eased state
    let eased = targetRef.current;
    let clock = 0;
    let lastFrame = 0;
    let lastDraw = 0;

    const field = (nx: number, ny: number, t: number) => {
      const r = Math.sqrt(nx * nx + ny * ny);
      const a = Math.atan2(ny, nx);
      if (variant === "waves") {
        return (
          Math.sin(nx * 10 + t * 1.6) * 0.55 +
          Math.sin(ny * 13 - t * 1.1) * 0.3 +
          Math.sin((nx + ny) * 9 + t * 0.8) * 0.35
        );
      }
      if (variant === "grid") {
        return (
          Math.sin(nx * 26 + Math.sin(t * 0.7) * 2) * 0.45 +
          Math.sin(ny * 22 - t * 0.9) * 0.45 +
          Math.cos(r * 8 - t * 1.3) * 0.3
        );
      }
      return (
        Math.cos(r * 11 - t * 2.2) * 0.5 +
        Math.sin(a * 5 + t * 1.4 + r * 6) * 0.25 +
        Math.sin(nx * 14 + t * 1.9) * Math.cos(ny * 16 - t * 1.1) * 0.35
      );
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);

      const dt = lastFrame ? Math.min(time - lastFrame, 120) : 16;
      lastFrame = time;

      // smooth easing toward the slider target (~250ms time constant)
      eased += (targetRef.current - eased) * (1 - Math.exp(-dt / 250));

      // motion scales with intensity, and stops entirely for reduced motion
      const speed = reducedRef.current ? 0 : 0.2 + eased * 0.9;
      clock += dt * 0.00045 * speed;

      if (time - lastDraw < 55) return; // ~18fps terminal cadence
      lastDraw = time;
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);
      if (eased < 0.02) return;

      const t = clock;
      const cxCell = cols * 0.5;
      const cyCell = rows * 0.5;
      const brightness = 0.3 + eased * 1.25;

      const variantHueShift =
        variant === "waves" ? -25 : variant === "grid" ? 25 : 0;

      const colorFor = (v: number) => {
        const saturated = Math.pow(v, 0.7);
        const hue = 235 + saturated * 35 + variantHueShift;
        const saturation = 60 + saturated * 35;
        const lightness = 70 + saturated * 15;
        const alpha = Math.min(0.9, v * 0.8 * brightness);
        return `hsla(${hue.toFixed(1)},${saturation.toFixed(1)}%,${lightness.toFixed(1)}%,${alpha.toFixed(3)})`;
      };

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = (x - cxCell) / cols;
          const ny = ((y - cyCell) / rows) * 0.62;
          const r = Math.sqrt(nx * nx + ny * ny);

          let v = field(nx, ny, t);
          const falloff = variant === "sphere" ? Math.max(0, 1 - r * 1.9) : Math.max(0, 1 - r * 1.5);
          v = (v * 0.5 + 0.5) * falloff;
          if (v <= 0.06) continue;

          const idx = Math.min(CHARS.length - 1, Math.floor(v * CHARS.length * 1.35));
          const ch = CHARS[idx] ?? " ";
          if (ch === " ") continue;

          ctx.fillStyle = colorFor(v);
          ctx.fillText(ch, x * cell, y * cell);
        }
      }
    };


    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant, cell]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
