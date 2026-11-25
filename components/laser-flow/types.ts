import type { RefObject } from 'react';

export type Settings = {
  surfaceRef?: RefObject<HTMLElement | null>;
  beamPosition: number;
  surfaceLevel: number;
  color: string;
  intensity: number;
  beamWidth: number;
  flare: number;
  spread: number;
  spill: number;
  fog: number;
  dust: number;
  streaks: number;
  dots: number;
  pulse: number;
  speed: number;
  seed: number;
  mouseInteraction: boolean;
  revealImage?: string;
  revealRadius: number;
  revealOpacity: number;
  intro: boolean;
  theme: 'dark' | 'light';
  paused: boolean;
  dpr?: number;
};

export type Surface = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  radius: number;
  real: boolean;
};

