import type { LaserFlowProps } from '../LaserFlow';

export type HeroLaserTier = 'mobile' | 'tablet' | 'desktop';

// Tailwind md (48rem / 768px) ve lg (64rem / 1024px) ile birebir eşleşir
export const MOBILE_LASER_QUERY = '(width < 48rem)';
export const TABLET_LASER_QUERY = '(width < 64rem)';

export const DESKTOP_HERO_LASER = Object.freeze({
  beamPosition: 0.59, color: '#0F60E4', intensity: 1.65, flare: 1.4,
  spread: 1.35, spill: 0.95, fog: 0.45, dust: 0.85, beamWidth: 1.1,
  streaks: 1.45, dots: 0.30, pulse: 0.9, speed: 1.65, seed: 8,
  mouseInteraction: true,
} satisfies LaserFlowProps);

// Tablet (md - lg): masaüstü düzeni aktif ama GPU yükü hafif (dpr: 1)
export const TABLET_HERO_LASER = Object.freeze({
  beamPosition: 0.72, color: '#0F60E4', intensity: 1.35, flare: 1.2,
  spread: 1.05, spill: 0.7, fog: 0.3, dust: 0.45, beamWidth: 0.95,
  streaks: 1.0, dots: 0.15, pulse: 0.65, speed: 1.35, seed: 8, dpr: 1,
  mouseInteraction: false,
} satisfies LaserFlowProps);

// Mobil (< md): kartın üst ortasına oturur, yuvarlatılmış köşelerden ve yanlardan taşmaz (spill: 0, kontrollü spread/flare)
export const MOBILE_HERO_LASER = Object.freeze({
  beamPosition: 0.5, color: '#0F60E4', intensity: 1.05, flare: 0.85,
  spread: 0.55, spill: 0, fog: 0.18, dust: 0.3, beamWidth: 0.75,
  streaks: 0.7, dots: 0.08, pulse: 0.45, speed: 1.15, seed: 8, dpr: 1,
  mouseInteraction: false,
} satisfies LaserFlowProps);

export const HERO_LASER_PRESETS: Record<HeroLaserTier, LaserFlowProps> = {
  mobile: MOBILE_HERO_LASER,
  tablet: TABLET_HERO_LASER,
  desktop: DESKTOP_HERO_LASER,
};

export function subscribeHeroLaser(onChange: () => void) {
  const mobileMedia = window.matchMedia(MOBILE_LASER_QUERY);
  const tabletMedia = window.matchMedia(TABLET_LASER_QUERY);
  mobileMedia.addEventListener('change', onChange);
  tabletMedia.addEventListener('change', onChange);
  return () => {
    mobileMedia.removeEventListener('change', onChange);
    tabletMedia.removeEventListener('change', onChange);
  };
}

export function heroLaserSnapshot(): HeroLaserTier {
  if (window.matchMedia(MOBILE_LASER_QUERY).matches) return 'mobile';
  if (window.matchMedia(TABLET_LASER_QUERY).matches) return 'tablet';
  return 'desktop';
}

export const serverHeroLaserSnapshot = (): HeroLaserTier => 'desktop';