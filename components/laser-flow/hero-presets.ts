import type { LaserFlowProps } from '../LaserFlow';

// Match Tailwind's lg breakpoint. Tablets below lg use the lighter preset.
export const MOBILE_LASER_QUERY = '(width < 64rem)';

export const DESKTOP_HERO_LASER = Object.freeze({
  beamPosition: 0.59, color: '#0F60E4', intensity: 1.65, flare: 1.4,
  spread: 1.35, spill: 0.95, fog: 0.45, dust: 0.85, beamWidth: 1.1,
  streaks: 1.45, dots: 0.30, pulse: 0.9, speed: 1.65, seed: 8,
  mouseInteraction: true,
} satisfies LaserFlowProps);

export const MOBILE_HERO_LASER = Object.freeze({
  beamPosition: 0.82, color: '#0F60E4', intensity: 1.15, flare: 1.1,
  spread: 0.95, spill: 0.65, fog: 0.22, dust: 0.35, beamWidth: 0.85,
  streaks: 0.8, dots: 0.1, pulse: 0.5, speed: 1.2, seed: 8, dpr: 1,
  mouseInteraction: false,
} satisfies LaserFlowProps);

export function subscribeMobileLaser(onChange: () => void) {
  const media = window.matchMedia(MOBILE_LASER_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export const mobileLaserSnapshot = () => window.matchMedia(MOBILE_LASER_QUERY).matches;
// React uses this same snapshot for SSR and the initial hydration render.
export const serverLaserSnapshot = () => false;
