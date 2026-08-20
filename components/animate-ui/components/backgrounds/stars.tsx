/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import * as React from 'react';
import {
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type Transition,
} from 'motion/react';

import { cn } from '@/lib/utils';

// ─── UTILITIES ────────────────────────────────────────────────

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

// Check if user prefers reduced motion
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// Check if mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

// ─── STAR LAYER ──────────────────────────────────────────────

type StarLayerProps = HTMLMotionProps<'div'> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className,
  ...props
}: StarLayerProps) {
  // Use useMemo instead of useState + useEffect for boxShadow
  const boxShadow = React.useMemo(
    () => generateStars(count, starColor),
    [count, starColor]
  );

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn('absolute top-0 left-0 w-full h-[2000px]', className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

// ─── STARS BACKGROUND ──────────────────────────────────────

type StarsBackgroundProps = React.ComponentProps<'div'> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  // Reduce star count on mobile
  const starCounts = isMobile
    ? { small: 300, medium: 120, large: 60 }
    : { small: 1000, medium: 400, large: 200 };

  // Disable parallax on mobile (no mouse) and reduced motion
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isMobile || prefersReduced) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor, isMobile, prefersReduced],
  );

  // Static stars for reduced motion
  if (prefersReduced) {
    return (
      <div
        data-slot="stars-background"
        className={cn(
          'relative w-full h-full overflow-hidden',
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0">
          <StarLayer
            count={starCounts.small}
            size={1}
            transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
            starColor={starColor}
          />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      data-slot="stars-background"
      className={cn(
        'relative w-full h-full overflow-hidden',
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn({ 'pointer-events-none': !pointerEvents })}
      >
        <StarLayer
          count={starCounts.small}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={starCounts.medium}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: 'linear',
          }}
          starColor={starColor}
        />
        <StarLayer
          count={starCounts.large}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: 'linear',
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}

export {
  StarLayer,
  StarsBackground,
  type StarLayerProps,
  type StarsBackgroundProps,
};