"use client";

import React from "react";
import { ArrowRight, Leaf, History, Sparkles, CheckCircle2 } from "lucide-react";

const UPDATES = [
  {
    version: "v2.1.0",
    date: "Bugün",
    title: "Premium Tasarım & Dark Mode",
    desc: "Arayüz tamamen lüks 'Zinc' paleti ile yenilendi ve kusursuz bir karanlık mod eklendi.",
    current: true,
  },
  {
    version: "v1.5.4",
    date: "Ekim 2023",
    title: "Altyapı Optimizasyonu",
    desc: "Sistem performansı %40 oranında artırıldı ve yeni veri modelleri entegre edildi.",
    current: false,
  },
  {
    version: "v1.0.0",
    date: "Ağustos 2023",
    title: "İlk Sürüm & Yola Çıkış",
    desc: "Her şeyin başladığı an. Tek kişilik bir vizyonun ilk kod satırları hayata geçti.",
    current: false,
  },
];

export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#fafafa] dark:bg-[#030303] py-24 px-6 md:px-12 font-sans text-zinc-900 dark:text-zinc-50 overflow-hidden transition-colors duration-500">
      
      {/* Arka Plan Işık Efekti (Dark Mode) */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/[0.02] dark:bg-white/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        
        {/* ================= HİKAYE & RESİMLER (ÜST KISIM) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sol: Metin ve Hikaye */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm backdrop-blur-md">
              <Leaf className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">
                Benim Hikayem
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              Tek bir fikirle başlayan, <span className="text-zinc-400 dark:text-zinc-500">doğadan ilham alan bir yolculuk.</span>
            </h2>

            <div className="space-y-5 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <p>
                Her şey tek başıma, büyük bir vizyonla yola çıkmamla başladı. Hedefim, karmaşık problemleri zarif, basit ve doğanın kendisi kadar pürüzsüz bir deneyimle çözmekti.
              </p>
              <p>
                Gürültüden uzaklaşıp öze odaklandığım bu süreçte, sadece bir ürün değil; sessiz, güçlü ve zamansız bir teknoloji inşa etmeye odaklandım. Tıpkı kökleri derinde olan bir ağaç gibi, sağlam adımlarla büyümeye devam ediyorum.
              </p>
            </div>

            <div className="pt-4">
              <button className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer">
                Tüm hikayeyi oku 
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Sağ: Doğa Resimleri (Bento Grid) */}
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            {/* Büyük Resim */}
            <div className="col-span-1 h-full rounded-[2rem] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format&fit=crop" 
                alt="Doğa İlhamı 1" 
                className="w-full h-full object-cover grayscale-[0.8] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
            
            {/* Sağdaki 2 Küçük Resim */}
            <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
              <div className="row-span-1 w-full h-full rounded-[2rem] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop" 
                  alt="Doğa İlhamı 2" 
                  className="w-full h-full object-cover grayscale-[0.8] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="row-span-1 w-full h-full rounded-[2rem] overflow-hidden group bg-zinc-100 dark:bg-white/5 flex items-center justify-center relative">
                 <img 
                  src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop" 
                  alt="Doğa İlhamı 3" 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.8] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ================= GÜNCELLEMELER (LATEST UPDATES) ================= */}
        <div className="relative rounded-[2.5rem] border border-zinc-200/80 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-8 md:p-12 shadow-sm backdrop-blur-md">
          
          <div className="flex items-center gap-3 mb-10 border-b border-zinc-200/60 dark:border-white/10 pb-6">
            <div className="size-10 rounded-xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
              <History className="size-5 text-zinc-900 dark:text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Son Güncellemeler</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Projenin gelişim günlüğü</p>
            </div>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-white/10 before:to-transparent">
            
            {UPDATES.map((item, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* İkon / Nokta */}
                <div className={`flex items-center justify-center w-9 h-9 rounded-full border-[3px] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                  item.current 
                    ? "bg-zinc-900 border-white dark:bg-white dark:border-[#0a0a0a] z-10" 
                    : "bg-white border-zinc-200 dark:bg-[#0a0a0a] dark:border-white/20 z-10"
                }`}>
                  {item.current ? (
                    <Sparkles className="size-4 text-white dark:text-zinc-900" />
                  ) : (
                    <CheckCircle2 className="size-4 text-zinc-400 dark:text-zinc-500" />
                  )}
                </div>
                
                {/* Kart İçeriği */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200/60 dark:border-white/5 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                      {item.version}
                    </span>
                    <time className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      {item.date}
                    </time>
                  </div>
                  <h4 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}