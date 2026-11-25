'use client';

import { useSyncExternalStore, type RefObject } from 'react';
import LaserFlow from '../LaserFlow';
import {
  DESKTOP_HERO_LASER,
  mobileLaserSnapshot,
  serverLaserSnapshot,
  subscribeMobileLaser,
} from './hero-presets';

export function HeroLaser({ surfaceRef }: { surfaceRef: RefObject<HTMLElement | null> }) {
  const isMobile = useSyncExternalStore(
    subscribeMobileLaser,
    mobileLaserSnapshot,
    serverLaserSnapshot
  );

  // Mobilde WebGL canvas'ı hiç başlatma; sadece çok hafif bir CSS atmosfer bırak (istersen tamamen null döndür)
  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_at_bottom,rgba(15,96,228,0.18),transparent_70%)] md:hidden"
      />
    );
  }

  return (
    <div data-hero-laser className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <LaserFlow
        {...DESKTOP_HERO_LASER}
        surfaceRef={surfaceRef}
        fallback={
          <div
            data-laser-static-beam
            className="pointer-events-none absolute inset-y-0 left-[59%] w-px bg-[#0F60E4]/60"
          >
            <div className="absolute inset-y-0 -left-px w-[3px] bg-[#0F60E4]/20" />
            <div className="absolute inset-y-0 -left-1.5 w-[13px] bg-[#0F60E4]/5" />
          </div>
        }
      />
    </div>
  );
}