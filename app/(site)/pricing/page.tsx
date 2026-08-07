"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NumberFlow from "@number-flow/react";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const plans = [
  {
    name: "Free",
    description: "Explore Shaders and see what's possible.",
    price: 0,
    yearlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    features: [
      "Try the design editor",
      "Export preview code (watermarked)",
      "Upload your own assets",
      "Community Discord",
    ],
    glowColor: "from-blue-500/30 via-cyan-500/20 to-transparent",
  },
  {
    name: "Core",
    description: "Design and export code for production.",
    price: 59,
    yearlyPrice: 49,
    buttonText: "Unlock Core",
    popular: true,
    features: [
      "Full design editor access",
      "Export code for all supported frameworks",
      "Export video & images",
      "One-click install inside Framer",
      "Shaders MCP for agent workflows",
      "Commercial use license",
    ],
    glowColor: "from-blue-600/40 via-indigo-500/30 to-blue-400/20",
  },
  {
    name: "Pro",
    description: "For professionals who ship magic every day.",
    price: 199,
    yearlyPrice: 169,
    buttonText: "Unlock Pro",
    popular: false,
    features: [
      "850+ production-ready presets",
      "50+ ready-to-use website sections",
      "Install presets with Shadcn CLI",
      "Exclusive Discord role & channel",
      "Priority support",
      "All future updates",
    ],
    glowColor: "from-sky-500/30 via-blue-700/20 to-white/10",
  },
];

const palettes = {
  dark: {
    surface: "bg-black text-white",
    cardBg: "bg-neutral-950/70 border-white/15",
    heading: "text-white",
    muted: "text-neutral-400",
    dotPattern: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
    badgeBg: "bg-black/60 border-white/20 text-white",
  },
  light: {
    surface: "bg-white text-neutral-900",
    cardBg: "bg-white/80 border-neutral-200 shadow-xl shadow-blue-500/5",
    heading: "text-neutral-900",
    muted: "text-neutral-600",
    dotPattern: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
    badgeBg: "bg-neutral-100 border-neutral-300 text-neutral-900",
  },
};

export default function PricingSection() {
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
  const [isYearly, setIsYearly] = useState(false);

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
    <div className={`w-full py-24 px-4 relative overflow-hidden transition-colors duration-700 ${palette.surface}`}>
      {/* Arka Plan Nokta (Dot) Deseni */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage: palette.dotPattern,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Üst Kısım Başlık */}
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 max-w-3xl mx-auto relative z-10"
      >
        <h2 className={`md:text-5xl sm:text-4xl text-3xl font-bold tracking-tight mb-4 ${palette.heading}`}>
          Flexible plans for your <span className="text-blue-500">workflow</span>
        </h2>
        <p className={`text-sm sm:text-base ${palette.muted}`}>
          Choose the perfect plan with lively animated blue gradients and glassmorphism design.
        </p>

        {/* Aylık / Yıllık Toggle */}
        <div className="flex justify-center mt-8">
          <div className={`flex items-center p-1 rounded-full border backdrop-blur-md ${theme === 'dark' ? 'bg-neutral-900/80 border-white/15' : 'bg-neutral-100 border-neutral-200'}`}>
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : `${palette.muted} hover:opacity-100`
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                isYearly ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : `${palette.muted} hover:opacity-100`
              }`}
            >
              Yearly
              <span className="text-[10px] bg-blue-400/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-400/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Kartlar Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative group"
          >
            {/* Popüler / Most Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Most Popular
              </div>
            )}

            <Card
              className={`relative h-full flex flex-col rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 ${palette.cardBg} ${
                plan.popular ? "ring-2 ring-blue-500/80 shadow-2xl shadow-blue-500/20" : "hover:border-blue-500/40"
              }`}
            >
              {/* CANLI VE HAREKETLİ ARKA PLAN MAVİ/BEYAZ IŞILTILARI (Glow) */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                  x: [0, 15, -15, 0],
                  y: [0, -15, 15, 0],
                }}
                transition={{
                  duration: 6 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute -bottom-20 -left-10 -right-10 h-56 bg-gradient-to-t ${plan.glowColor} blur-[70px] pointer-events-none rounded-full`}
              />

              <CardHeader className="p-8 pb-4 relative z-10">
                <h3 className={`text-2xl font-bold tracking-tight ${palette.heading}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm leading-relaxed mt-2 mb-6 ${palette.muted}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-extrabold tracking-tight ${palette.heading}`}>
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="inline-block"
                    />
                  </span>
                  <span className={`text-sm font-medium ${palette.muted}`}>
                    /{isYearly ? "yr" : "mo"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-2 flex flex-col h-full relative z-10 justify-between">
                <div>
                  <div className={`h-[1px] w-full my-6 ${theme === 'dark' ? 'bg-white/10' : 'bg-neutral-200'}`} />
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`p-1 rounded-full border mt-0.5 shrink-0 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className={`text-sm font-medium ${palette.muted}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-blue-500/30 border border-blue-400/30"
                        : theme === 'dark'
                        ? "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                        : "bg-neutral-900 hover:bg-neutral-800 text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                  <p className={`text-center text-xs mt-3 ${palette.muted}`}>
                    {plan.name === "Free" ? "Upgrade whenever you're ready." : "Commercial license included."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export { PricingSection };