'use client';

import { motion } from 'framer-motion';

type WaveformProps = {
  bars?: number;
  color?: string;
  className?: string;
  animated?: boolean;
};

export function Waveform({
  bars = 40,
  color = 'hsl(199 89% 52%)',
  className = '',
  animated = true,
}: WaveformProps) {
  const barHeights = Array.from({ length: bars }, (_, i) => {
    const phase = (i / bars) * Math.PI * 4;
    return 0.3 + Math.abs(Math.sin(phase)) * 0.7;
  });

  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: color, originY: 0.5 }}
          initial={{ scaleY: h * 0.5 }}
          animate={
            animated
              ? {
                  scaleY: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3],
                }
              : { scaleY: h }
          }
          transition={{
            duration: 1.5 + (i % 5) * 0.3,
            repeat: animated ? Infinity : 0,
            ease: 'easeInOut',
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  );
}

type AudioBarsProps = {
  color?: string;
  className?: string;
  count?: number;
};

export function AudioBars({ color = 'hsl(199 89% 52%)', className = '', count = 5 }: AudioBarsProps) {
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: [8, 24, 12, 20, 8],
          }}
          transition={{
            duration: 0.8 + i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
