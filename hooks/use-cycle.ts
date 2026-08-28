/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

/** Looping clock in milliseconds, 0..period. */
export function useCycle(period: number, paused = false) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (paused) {
      setT(period - 1);
      return;
    }
    const start = performance.now();
    const id = window.setInterval(() => {
      setT((performance.now() - start) % period);
    }, 40);
    return () => window.clearInterval(id);
  }, [period, paused]);

  return t;
}