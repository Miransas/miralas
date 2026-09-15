'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

type AnimatedBarProps = {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  delay?: number;
  className?: string;
  height?: string;
};

export function AnimatedBar({
  value,
  max = 10,
  color = 'hsl(199 89% 52%)',
  label,
  delay = 0,
  className = '',
  height = 'h-2',
}: AnimatedBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const percentage = (value / max) * 100;

  return (
    <div className={className} ref={ref}>
      {label && (
        <div className="flex justify-between mb-1.5 text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono font-semibold" style={{ color }}>
            {value.toFixed(1)}
          </span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-secondary overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full`}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
