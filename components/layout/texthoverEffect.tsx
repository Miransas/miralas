"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text = "MIRANSAS",
  duration,
}: {
  text?: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* 1. Kendi Sabit Glow Katmanı (Arka Planda Süzülen Ortam Işığı) */}
      <div 
        className="pointer-events-none absolute inset-0 mx-auto h-full w-3/4 rounded-full bg-stone-900/10 blur-[80px] transition-all duration-500"
        style={{ opacity: hovered ? 0.35 : 0.18 }}
      />

      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 160"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="relative z-10 select-none"
      >
        <defs>
          {/* SVG Yazı İçi Glow Filtresi */}
          <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Hover Renk Gradyanı */}
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0c0a09" />
            <stop offset="50%" stopColor="#44403c" />
            <stop offset="100%" stopColor="#0c0a09" />
          </linearGradient>

          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="30%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{ duration: duration ?? 0.15, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* 2. Sabit Aydınlık Koyu Çizgi & Derinlik Gölgesi */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="1.2"
          filter="url(#textGlow)"
          className="fill-stone-900/5 stroke-stone-400/80 font-sans text-8xl font-black uppercase tracking-widest transition-opacity duration-300"
          style={{ opacity: hovered ? 0.4 : 0.85 }}
        >
          {text}
        </text>

        {/* 3. Hover Anında Parıldayarak Ortaya Çıkan Dolgu Katmanı */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#textGradient)"
          stroke="url(#textGradient)"
          strokeWidth="1"
          mask="url(#textMask)"
          className="font-sans text-8xl font-black uppercase tracking-widest"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};