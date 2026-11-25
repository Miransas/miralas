'use client';

import { useSyncExternalStore, type RefObject } from 'react';
import LaserFlow from '../LaserFlow';
import { DESKTOP_HERO_LASER, MOBILE_HERO_LASER, mobileLaserSnapshot, serverLaserSnapshot, subscribeMobileLaser } from './hero-presets';

export function HeroLaser({ surfaceRef }: { surfaceRef: RefObject<HTMLElement | null> }) {
  const mobile = useSyncExternalStore(subscribeMobileLaser, mobileLaserSnapshot, serverLaserSnapshot);
  return (
    <div data-hero-laser className="pointer-events-none absolute inset-0" aria-hidden="true">
      <LaserFlow {...(mobile ? MOBILE_HERO_LASER : DESKTOP_HERO_LASER)} surfaceRef={surfaceRef}
        fallback={<div data-laser-static-beam className="pointer-events-none absolute inset-y-0 left-[82%] w-px bg-[#0F60E4]/60 lg:left-[59%]">
          <div className="absolute inset-y-0 -left-px w-[3px] bg-[#0F60E4]/20" />
          <div className="absolute inset-y-0 -left-1.5 w-[13px] bg-[#0F60E4]/5" />
        </div>}
      />
    </div>
  );
}
