"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Square, 
  Activity, 
  Bot, 
  Briefcase, 
  Coffee, 
  Database, 
  ChevronDown, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const AGENT_FAQS: FAQItem[] = [
  {
    id: 'what-is-agent',
    question: 'Miransas AI Ajanı tam olarak nedir?',
    answer: (
      <p>
        Miransas AI Ajanı, sadece duyduğunu metne çeviren veya metni okuyan pasif bir sistem değildir. Söylenenleri <strong>anlayan, bağlamı kavrayan, arka plandaki veritabanlarınıza bağlanıp işlem yapabilen</strong> ve insan doğallığında sesli yanıtlar verebilen otonom bir sanal asistandır.
      </p>
    ),
  },
  {
    id: 'daily-and-business',
    question: 'Günlük hayatta ve işletmelerde nerelerde kullanılır?',
    answer: (
      <div className="space-y-2">
        <p>Ajanlarımız iki temel ekosistemde hayat kurtarır:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>İşletme & Ofis:</strong> 7/24 müşteri destek hattı, randevu planlayıcısı, toplantı özetleyici, CRM verisi sorgulama asistanı veya soğuk arama (cold-call) satış temsilcisi olarak.</li>
          <li><strong>Günlük Hayat:</strong> Akıllı ev yönetim sistemleri, kişisel dil öğrenme pratik partneri veya araç içi sesli asistan olarak.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'backend-integration',
    question: 'Ajanı kendi şirket sistemlerime (Backend) bağlayabilir miyim?',
    answer: (
      <p>
        Kesinlikle. Webhook'lar, REST API'ler ve WebSocket aracılığıyla ajanı mevcut ERP, CRM (Salesforce, Hubspot vb.) veya özel backend sistemlerinize doğrudan bağlayabilirsiniz. Ajan, görüşme sırasında müşterinin sipariş durumunu veritabanından çekip saniyeler içinde sesli olarak iletebilir.
      </p>
    ),
  },
  {
    id: 'voice-customization',
    question: 'Ajanın sesini ve kişiliğini (Prompt) özelleştirebilir miyim?',
    answer: (
      <p>
        Evet. Miransas Console üzerinden ajanınızın hangi sesi kullanacağını (kendi klonladığınız bir ses dahil), konuşma hızını, duygu durumunu ve en önemlisi <strong>sistem komutlarını (System Prompt)</strong> belirleyebilirsiniz. Onu ciddi bir banka asistanı veya neşeli bir oyun arkadaşı olarak kurgulayabilirsiniz.
      </p>
    ),
  },
  {
    id: 'latency-live',
    question: 'Canlı görüşmelerde gecikme süresi (Latency) ne kadar?',
    answer: (
      <p>
        Gerçek zamanlı sohbetlerde akıcılık her şeydir. Edge sunucu mimarimiz ve optimize edilmiş uçtan uca modellerimiz sayesinde, kullanıcının cümlesi bittikten sonra ajanın yanıt vermeye başlama süresi ortalama <strong>400-600 milisaniye</strong> arasındadır. Bu, insan-insan konuşma ritmine neredeyse denktir.
      </p>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AgentSectionAndFAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('what-is-agent');
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [demoState, setDemoState] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');

  const handleDemoToggle = () => {
    if (isDemoActive) {
      setIsDemoActive(false);
      setDemoState('idle');
    } else {
      setIsDemoActive(true);
      setDemoState('connecting');
      setTimeout(() => setDemoState('listening'), 1500);
    }
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F2F2F2] dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300 font-sans antialiased overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ════ PART 1: AGENT HERO & LIVE DEMO ════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sol Kısım: Metinler ve Use Cases */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
                <Bot className="size-3.5" />
                <span>Miransas Agents</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
                Sadece bir ses değil, <br />
                <span className="text-zinc-400 dark:text-zinc-500 font-serif ">operasyonel aklınız.</span>
              </h2>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-lg">
                Müşterilerinizle telefonda konuşan, söylediklerini anlayan, arka plandaki CRM sisteminizden veri çekip saniyeler içinde çözüm sunan otonom yapay zeka ajanları inşa edin.
              </p>
            </div>

            {/* Mini Use Case Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-8 rounded-[32px] bg-white dark:bg-[#141210] shadow-sm">
                <Briefcase className="size-6 text-zinc-950 dark:text-white mb-4" />
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">İşletme & Ofis</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  7/24 müşteri desteği, otomatik randevu planlama ve telefonda akıllı satış asistanı.
                </p>
              </div>
              <div className="p-8 rounded-[32px] bg-white dark:bg-[#141210] shadow-sm">
                <Coffee className="size-6 text-zinc-950 dark:text-white mb-4" />
                <h4 className="text-base font-bold text-zinc-950 dark:text-white">Günlük Hayat</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Akıllı ev asistanları, kişisel dil koçları ve araç içi interaktif rehberler.
                </p>
              </div>
            </div>
          </div>

          {/* Sağ Kısım: Live Demo Arayüzü */}
          <div className="relative w-full max-w-md mx-auto lg:ml-auto">
            <div className="relative rounded-[40px] p-3 bg-white dark:bg-[#141210] shadow-sm">
              
              {/* Cihaz Ekranı */}
              <div className="relative rounded-[32px] bg-[#F2F2F2] dark:bg-zinc-900 overflow-hidden aspect-[4/5] flex flex-col">
                
                {/* Üst Bar */}
                <div className="px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-2.5 w-2.5">
                      {isDemoActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isDemoActive ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}></span>
                    </div>
                    <span className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                      {isDemoActive ? 'Live Backend' : 'Standby'}
                    </span>
                  </div>
                  <Database className="size-4 text-zinc-400" />
                </div>

                {/* Orta Kısım: Visualizer ve Durum */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                  <div className="relative flex items-center justify-center">
                    <AnimatePresence>
                      {demoState === 'listening' && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="absolute size-32 rounded-full bg-indigo-500/20"
                        />
                      )}
                    </AnimatePresence>
                    
                    <div className={`size-24 rounded-full flex items-center justify-center z-10 transition-colors duration-500 shadow-sm ${
                      demoState === 'idle' ? 'bg-white dark:bg-[#141210]' : 
                      demoState === 'connecting' ? 'bg-amber-100 dark:bg-amber-900/30' : 
                      'bg-white dark:bg-[#141210] text-zinc-950 dark:text-white'
                    }`}>
                      {demoState === 'idle' ? <Bot className="size-10 text-zinc-400" /> :
                       demoState === 'connecting' ? <Activity className="size-10 text-amber-500 animate-pulse" /> :
                       <Activity className="size-10 animate-bounce" />}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                      {demoState === 'idle' ? 'Satış Asistanı' : 
                       demoState === 'connecting' ? 'Sistemlere Bağlanıyor...' : 
                       'Sizi Dinliyor...'}
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-[200px] mx-auto">
                      {demoState === 'idle' ? 'Mikrofona tıklayın ve stok durumu sormayı deneyin.' : 
                       demoState === 'listening' ? '"Merhaba, sipariş numaram 1402, kargom nerede?"' : ''}
                    </p>
                  </div>
                </div>

                {/* Alt Kısım: Kontrol Butonu */}
                <div className="p-6 pt-0 flex justify-center">
                  <button
                    onClick={handleDemoToggle}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                      isDemoActive 
                        ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20' 
                        : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 shadow-sm'
                    }`}
                  >
                    {isDemoActive ? (
                      <>
                        <Square className="size-4 fill-current" />
                        <span>Görüşmeyi Sonlandır</span>
                      </>
                    ) : (
                      <>
                        <Mic className="size-4" />
                        <span>Canlı Demoyu Başlat</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Dekoratif Badge */}
            <div className="absolute -right-4 top-12 bg-white dark:bg-[#141210] shadow-sm rounded-2xl p-4 flex items-center gap-3 animate-float pointer-events-none">
              <div className="size-10 rounded-xl bg-[#F2F2F2] dark:bg-white/5 flex items-center justify-center">
                <Sparkles className="size-5 text-zinc-950 dark:text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Latency</p>
                <p className="text-xs font-extrabold text-zinc-950 dark:text-white">~450ms</p>
              </div>
            </div>

          </div>
        </div>

        {/* ════ PART 2: AGENT FAQ (SSS) ════ */}
        <div className="max-w-3xl mx-auto space-y-10 pt-16">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
              <HelpCircle className="size-3.5" />
              <span>Agent SSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Ajanlar hakkında <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">bilmeniz gerekenler</span>
            </h2>
          </div>

          <div className="space-y-4">
            {AGENT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="group rounded-[32px] bg-white dark:bg-[#141210] overflow-hidden shadow-sm transition-colors duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none gap-6"
                  >
                    <span className="text-[17px] font-bold text-zinc-950 dark:text-white leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="shrink-0 text-zinc-950 dark:text-white"
                    >
                      <ChevronDown className="size-6" strokeWidth={2.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease },
                          opacity: { duration: 0.2, ease },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-8 text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="pt-8 flex justify-center">
            <a
              href="/agents"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-[#141210] text-sm font-bold text-zinc-950 dark:text-white hover:scale-105 transition-transform shadow-sm"
            >
              <span>Ajan Mimarisini İncele</span>
              <ArrowRight className="size-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}