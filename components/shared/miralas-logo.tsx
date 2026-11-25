'use client';

import { useId } from 'react';

export function MiralasLogo({ className = 'size-5' }: { className?: string }) {
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <rect width="100" height="100" fill="white" />
          <circle cx="50" cy="14" r="14" fill="black" />
          <circle cx="81.2" cy="68" r="14" fill="black" />
          <circle cx="18.8" cy="68" r="14" fill="black" />
        </mask>
      </defs>

      {/* Dış halka */}
      <circle
        cx="50"
        cy="50"
        r="36"
        stroke="currentColor"
        strokeWidth="7"
        mask={`url(#${maskId})`}
      />

      {/* 3 düğüm halkası */}
      <circle cx="50" cy="14" r="8.5" stroke="currentColor" strokeWidth="6" />
      <circle cx="81.2" cy="68" r="8.5" stroke="currentColor" strokeWidth="6" />
      <circle cx="18.8" cy="68" r="8.5" stroke="currentColor" strokeWidth="6" />

      {/* Merkez 3 bıçak */}
      {[0, 120, 240].map((deg) => (
        <path
          key={deg}
          d="M 31 36 Q 50 31 69 36 Q 58 43 53 49 Q 45 39 31 36 Z"
          fill="currentColor"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}