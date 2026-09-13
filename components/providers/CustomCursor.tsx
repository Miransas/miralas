
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  const springY = useSpring(y, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");

    setEnabled(media.matches);

    if (!media.matches) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;

      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );

      const pointerTarget = target?.closest(
        "a, button, [role='button'], [data-cursor='pointer']"
      );

      setHovering(Boolean(interactive));
      setPointer(Boolean(pointerTarget));
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener(
      "mouseleave",
      handleLeave
    );

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleLeave
      );
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99999] size-0"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Center dot */}
      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          size-[7px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-lime-300
          shadow-[0_0_8px_rgba(190,242,100,0.55),0_0_20px_rgba(190,242,100,0.18)]
        "
        animate={{
          scale: hovering ? 0.45 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          border
          border-lime-300/75
          bg-lime-300/[0.025]
          shadow-[0_0_12px_rgba(190,242,100,0.08),inset_0_0_10px_rgba(190,242,100,0.03)]
          backdrop-blur-[2px]
        "
        animate={{
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          borderRadius: pointer ? 14 : 999,
          rotate: pointer ? 45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
      />
    </motion.div>
  );
}



