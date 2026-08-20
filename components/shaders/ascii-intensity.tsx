"use client"
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AsciiIntensityValue = {
  /** 0 = calm/dim, 1 = maximum brightness + motion */
  intensity: number;
  setIntensity: (v: number) => void;
  /** true when the user asked the OS for reduced motion */
  reducedMotion: boolean;
};

const AsciiIntensityContext = createContext<AsciiIntensityValue>({
  intensity: 0.55,
  setIntensity: () => {},
  reducedMotion: false,
});

export function AsciiIntensityProvider({ children }: { children: ReactNode }) {
  const [intensity, setIntensity] = useState(0.55);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const value = useMemo(
    () => ({ intensity, setIntensity, reducedMotion }),
    [intensity, reducedMotion],
  );

  return (
    <AsciiIntensityContext.Provider value={value}>{children}</AsciiIntensityContext.Provider>
  );
}

export const useAsciiIntensity = () => useContext(AsciiIntensityContext);
