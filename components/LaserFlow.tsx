/* eslint-disable react-hooks/refs */
'use client';

import { useEffect, useRef, useState, type HTMLAttributes, type RefObject, type ReactNode } from 'react';
import type { Settings } from './laser-flow/types';
import { mountLaserFlow } from './laser-flow/renderer';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface LaserFlowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  surfaceRef?: RefObject<HTMLElement | null>;
  beamPosition?: number;
  surfaceLevel?: number;
  color?: string;
  intensity?: number;
  beamWidth?: number;
  flare?: number;
  spread?: number;
  spill?: number;
  fog?: number;
  dust?: number;
  streaks?: number;
  dots?: number;
  pulse?: number;
  speed?: number;
  seed?: number;
  mouseInteraction?: boolean;
  revealImage?: string;
  revealRadius?: number;
  revealOpacity?: number;
  intro?: boolean;
  theme?: 'dark' | 'light';
  paused?: boolean;
  dpr?: number;
  fallback?: ReactNode;
}

export const LaserFlow = ({
  surfaceRef,
  beamPosition = 0.6,
  surfaceLevel = 1,
  color = '#3847ff',
  intensity = 1.8,
  beamWidth = 1.5,
  flare = 1.5,
  spread = 1.5,
  spill = 1,
  fog = 0.2,
  dust = 1.6,
  streaks = 1.5,
  dots = 1,
  pulse = 1.5,
  speed = 1.5,
  seed = 3,
  mouseInteraction = true,
  revealImage,
  revealRadius = 220,
  revealOpacity = 0.6,
  intro = true,
  theme = 'dark',
  paused = false,
  dpr,
  fallback,
  ...rest
}: LaserFlowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const settings: Settings = {
    surfaceRef,
    beamPosition: clamp(beamPosition, 0, 1),
    surfaceLevel: clamp(surfaceLevel, 0, 1),
    color: String(color),
    intensity: Math.max(0, intensity),
    beamWidth: clamp(beamWidth, 0.2, 5),
    flare: clamp(flare, 0.2, 4),
    spread: clamp(spread, 0.1, 4),
    spill: Math.max(0, spill),
    fog: Math.max(0, fog),
    dust: Math.max(0, dust),
    streaks: Math.max(0, streaks),
    dots: Math.max(0, dots),
    pulse: Math.max(0, pulse),
    speed,
    seed,
    mouseInteraction,
    revealImage,
    revealRadius: Math.max(1, revealRadius),
    revealOpacity: clamp(revealOpacity, 0, 1),
    intro,
    theme,
    paused,
    dpr
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    return mountLaserFlow(container, canvas, settingsRef, wakeRef, setReady);
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  });

  const { className = '', ...attributes } = rest;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-full w-full${className ? ` ${className}` : ''}`}
      {...attributes}
    >
      {fallback && <div data-laser-fallback hidden={ready}>{fallback}</div>}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />
    </div>
  );
};

export default LaserFlow;
