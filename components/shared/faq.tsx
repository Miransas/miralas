"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Terminal, Box, Zap, Sparkles } from "lucide-react";

const faqItems = [
  {
    id: 1,
    question: "What are WebGL Shaders and how do I export them?",
    answer: "WebGL shaders are high-performance visual effects rendered directly on the GPU. Instead of heavy videos, you use math to draw pixels. You can design them in our canvas and export pure React/TSX code instantly.",
    visualType: "code",
  },
  {
    id: 2,
    question: "Can I integrate these components into Next.js?",
    answer: "Yes, seamlessly. The exported components are strictly typed with TypeScript and use standard modern hooks. Just copy the snippet, install Framer Motion, and drop it into your Next.js application.",
    visualType: "frameworks",
  },
  {
    id: 3,
    question: "Are the background animations optimized for performance?",
    answer: "Absolutely. Every shader runs strictly on the GPU via WebGL, ensuring a stable 60 FPS without interrupting the main JavaScript thread, keeping your UI buttery smooth on all devices.",
    visualType: "performance",
  },
];

const palettes = {
  dark: {
    bg: "bg-black",
    text: "text-white",
    muted: "text-neutral-500",
    border: "border-white/10",
    activeBorder: "border-white/20",
    cardBg: "bg-[#050505]",
    dotPattern: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
    visualBg: "bg-white/[0.02]",
    hoverText: "group-hover:text-neutral-300",
    laserColors: "from-transparent via-blue-500 to-white",
  },
  light: {
    bg: "bg-white",
    text: "text-neutral-900",
    muted: "text-neutral-500",
    border: "border-neutral-200",
    activeBorder: "border-neutral-300",
    cardBg: "bg-neutral-50/50",
    dotPattern: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
    visualBg: "bg-black/[0.02]",
    hoverText: "group-hover:text-neutral-700",
    laserColors: "from-transparent via-blue-500 to-blue-800",
  },
};

export default function FaqSection() {
  const getRootTheme = () => {
    if (typeof document === "undefined") return "dark";
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  };

  const [theme, setTheme] = useState<"dark" | "light">(getRootTheme);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const applyThemeFromRoot = () => setTheme(getRootTheme());
    applyThemeFromRoot();

    const observer = new MutationObserver(applyThemeFromRoot);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const palette = useMemo(() => palettes[theme], [theme]);

  return (
    <div className={`w-full min-h-screen py-32 px-6 relative transition-colors duration-700 ${palette.bg}`}>
      {/* Black / Light Background with Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: palette.dotPattern,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Minimalist Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 text-blue-500 text-sm font-medium mb-4 tracking-wide uppercase">
            <Sparkles className="w-4 h-4" /> FAQ
          </div>
          <h2 className={`text-4xl md:text-5xl font-light tracking-tight ${palette.text}`}>
            Answers to your <br />
            <span className="font-semibold text-blue-500">frequent questions.</span>
          </h2>
        </motion.div>

        {/* FAQ List - Unified Expanding Cards */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-3xl border backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                  isOpen ? `${palette.cardBg} ${palette.activeBorder}` : `bg-transparent ${palette.border}`
                }`}
              >
                {/* Horizontal Left-to-Right Laser Animation on Active Card */}
                {isOpen && (
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden z-20">
                    <motion.div
                      className={`w-1/2 h-full bg-gradient-to-r ${palette.laserColors}`}
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}

                {/* Clickable Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 md:py-8 px-6 md:px-8 flex items-center justify-between group focus:outline-none"
                >
                  <span className={`text-lg md:text-2xl font-medium tracking-tight transition-colors text-left pr-4 ${
                    isOpen ? palette.text : `${palette.muted} ${palette.hoverText}`
                  }`}>
                    {item.question}
                  </span>
                  <span className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400 rotate-180" 
                      : `${palette.border} text-neutral-500 group-hover:border-blue-500/30 group-hover:text-blue-400`
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                {/* Expandable Content (Both Text and Visual collapse together) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-8 flex flex-col md:flex-row gap-10 items-start">
                        
                        {/* Answer Text */}
                        <div className={`flex-1 text-base md:text-lg leading-relaxed pt-2 ${palette.muted}`}>
                          {item.answer}
                        </div>

                        {/* Visual Preview Container */}
                        <div className={`w-full md:w-[45%] shrink-0 rounded-2xl border ${palette.border} p-5 ${palette.visualBg} relative overflow-hidden shadow-inner`}>
                          
                          {/* Type 1: Code Snippet (No Green, Only Blue/White/Black) */}
                          {item.visualType === "code" && (
                            <div className="font-mono text-[12px] leading-6">
                              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                                <span className="text-blue-400 flex items-center gap-2 font-medium">
                                  <Terminal className="w-4 h-4" /> shader_bg.tsx
                                </span>
                                <span className="text-neutral-500 text-[10px] uppercase tracking-widest">TSX</span>
                              </div>
                              <div className="text-neutral-300">
                                <span className="text-blue-400">export const</span> <span className="text-white">ShaderBackground</span> = () =&gt; {'{'}
                                <br />
                                &nbsp;&nbsp;<span className="text-blue-400">return</span> (
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-400">canvas</span>
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-200">className</span>=<span className="text-white">&quot;w-full h-full bg-black&quot;</span>
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-200">id</span>=<span className="text-white">&quot;gl-canvas&quot;</span>
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
                                <br />
                                &nbsp;&nbsp;);
                                <br />
                                {'}'};
                              </div>
                            </div>
                          )}

                          {/* Type 2: Framework Badges */}
                          {item.visualType === "frameworks" && (
                            <div className="flex flex-col justify-center h-full min-h-[140px]">
                              <div className="flex flex-wrap gap-2.5">
                                {["React", "Next.js", "Framer Motion", "TypeScript", "Tailwind CSS", "WebGL"].map((fw) => (
                                  <div key={fw} className={`px-3 py-2 rounded-xl border ${palette.border} text-xs font-medium flex items-center gap-2 ${palette.text} bg-white/5 backdrop-blur-sm`}>
                                    <Box className="w-3.5 h-3.5 text-blue-500" />
                                    {fw}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Type 3: Performance Chart */}
                          {item.visualType === "performance" && (
                            <div className="flex flex-col justify-center h-full min-h-[140px] space-y-5">
                              <div className="flex items-end justify-between">
                                <div>
                                  <div className={`text-[11px] uppercase tracking-widest mb-1 font-semibold ${palette.muted}`}>Stable Render</div>
                                  <div className={`text-4xl font-light tracking-tighter ${palette.text}`}>
                                    60<span className="text-lg text-blue-500 font-normal ml-1">FPS</span>
                                  </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                  <Zap className="w-5 h-5 text-blue-500" />
                                </div>
                              </div>
                              <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                                <motion.div
                                  className="h-full bg-gradient-to-r from-blue-600 to-white"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { FaqSection };
