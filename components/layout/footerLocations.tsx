"use client";

import React, { useState, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

// Bayraklar kaldırıldı, sadece Dil ve Bölge isimleri bırakıldı
const REGIONS = [
  { code: "EN", name: "English (US)", region: "Global" },
  { code: "TR", name: "Türkçe", region: "Türkiye" },
  { code: "UZ", name: "Oʻzbekcha", region: "Uzbekistan" },
  { code: "KZ", name: "Qazaqsha", region: "Kazakhstan" },
  { code: "ES", name: "Español", region: "LatAm" },
];

export default function FooterLocation() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]); // Varsayılan Global (EN)
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detectRegion() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        
        const userCountryCode = data.country_code;
        const matched = REGIONS.find((r) => r.code === userCountryCode);
        
        if (matched) {
          setSelectedRegion(matched);
        } else {
          setSelectedRegion(REGIONS[0]); // Bulunamazsa Global
        }
      } catch (error) {
        console.error("Location detection failed:", error);
      } finally {
        setLoading(false);
      }
    }

    detectRegion();
  }, []);

  return (
    <div className="relative inline-block font-sans">
      {/* Seçici Buton */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200/60 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm dark:shadow-none"
      >
        <Globe className="size-3.5 text-zinc-400 dark:text-zinc-500" />
        
        {loading ? (
          <span className="animate-pulse text-zinc-400">Detecting...</span>
        ) : (
          <span>{selectedRegion.name}</span>
        )}

        <ChevronDown 
          className={`size-3 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Yukarı Açılan Menü (Popover Dropdown) */}
      {isOpen && (
        <>
          {/* Arka plan tıklama alanı (Kapatmak için) */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />

          <div className="absolute left-0 sm:right-0 sm:left-auto bottom-full mb-2 w-48 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/[0.08] shadow-xl p-1.5 z-50 space-y-0.5 backdrop-blur-xl">
            <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Select Language
            </div>
            
            {REGIONS.map((region) => {
              const isSelected = region.code === selectedRegion.code;
              return (
                <button
                  key={region.code}
                  type="button"
                  onClick={() => {
                    setSelectedRegion(region);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span>{region.name}</span>
                  </div>
                  {isSelected && <Check className="size-3.5 text-zinc-900 dark:text-white" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}