'use client';

import { useSyncExternalStore, type RefObject } from 'react';
import LaserFlow from '../LaserFlow';
import {
  HERO_LASER_PRESETS,
  heroLaserSnapshot,
  serverHeroLaserSnapshot,
  subscribeHeroLaser,
} from './hero-presets';

export function HeroLaser({ surfaceRef }: { surfaceRef: RefObject<HTMLElement | null> }) {
  const tier = useSyncExternalStore(
    subscribeHeroLaser,
    heroLaserSnapshot,
    serverHeroLaserSnapshot
  );

  return (
    <div data-hero-laser className="pointer-events-none absolute inset-0" aria-hidden="true">
      <LaserFlow
        {...HERO_LASER_PRESETS[tier]}
        surfaceRef={surfaceRef}
        fallback={
          <div
            data-laser-static-beam
            className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-[#0F60E4]/60 md:left-[72%] lg:left-[59%]"
          >
            <div className="absolute inset-y-0 -left-px w-[3px] bg-[#0F60E4]/20" />
            <div className="absolute inset-y-0 -left-1.5 w-[13px] bg-[#0F60E4]/5" />
          </div>
        }
      />
    </div>
  );
}