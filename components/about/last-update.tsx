'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calendar, 
  Share2, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface UpdateCard {
  id: string;
  title: string;
  badgeTitle: string;
  badgeSub: string[];
  category: string;
  date: string;
  readTime: string;
  gradient: string;
  summary: string;
  content: React.ReactNode;
}

const UPDATES_DATA: UpdateCard[] = [
  {
    id: 'fedramp-cert',
    title: 'Miransas is now FedRAMP® 20x Class A certified',
    badgeTitle: 'FedRAMP® 20x Class A certified',
    badgeSub: ['Agents', 'Text to Speech', 'Speech to Text'],
    category: 'Company',
    date: 'Oct 1, 2026',
    readTime: '3 min read',
    gradient: 'from-slate-900 via-indigo-950 to-blue-900',
    summary: 'Miransas AI, kamu ve yüksek güvenlikli kurumsal altyapılar için FedRAMP 20x Class A sertifikasyonunu başarıyla tamamladı.',
    content: (
      <div className="space-y-4">
        <p>
          Kurumsal güvenlik standartlarımızı en üst seviyeye taşımaktan gurur duyuyoruz. Miransas ses mimarisi ve yapay zeka ajanları artık kamu kurumları için tam uyumludur.
        </p>
      </div>
    ),
  },
  {
    id: 'netherlands-expansion',
    title: 'Miransas launches regional Voice Hub in The Netherlands',
    badgeTitle: 'Miransas in The Netherlands',
    badgeSub: ['EU Expansion', 'Low Latency', 'GDPR Node'],
    category: 'Company',
    date: 'Oct 1, 2026',
    readTime: '2 min read',
    gradient: 'from-amber-900 via-orange-950 to-amber-800',
    summary: 'Avrupa’daki gecikme sürelerini 40ms seviyesine düşüren yeni Amsterdam veri merkezimiz faaliyete geçti.',
    content: (
      <div className="space-y-4">
        <p>
          Avrupa Birliği genelindeki müşterilerimize daha düşük gecikme süresi sunmak amacıyla Amsterdam bölgesel merkezimizi açtık.
        </p>
      </div>
    ),
  },
  {
    id: 'valuation-milestone',
    title: 'Miransas valuation increases to $22 billion fueled by enterprise demand',
    badgeTitle: '$22BN valuation',
    badgeSub: ['Lead Investor', 'T.Rowe Price', 'Global Expansion'],
    category: 'Company',
    date: 'Sep 30, 2026',
    readTime: '4 min read',
    gradient: 'from-cyan-950 via-teal-900 to-sky-900',
    summary: 'Kurumsal şirketlerin yapay zeka sesli asistan talebiyle büyüyen Miransas, $22 Milyar değerlemeye ulaştı.',
    content: (
      <div className="space-y-4">
        <p>
          Dünyanın önde gelen yatırım fonlarının katılımıyla gerçekleşen yeni yatırım turunda Miransas $22 Milyar değerlemeyi geride bıraktı.
        </p>
      </div>
    ),
  },
];

export default function LatestUpdatesSection() {
  const [selectedCard, setSelectedCard] = useState<UpdateCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);

  // 🛑 KİLİT VE TİTREME ENGELLERİ (Body Scroll Lock)
  useEffect(() => {
    if (selectedCard) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      // Scrollbar kaybolduğunda sayfanın sağa kaymasını önler
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedCard]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#F5F2EB] py-20 px-6 lg:px-8 transition-colors duration-500 antialiased overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── BAŞLIK & NAVİGASYON ── */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Latest updates
          </h2>

          <div className="flex items-center gap-3">
            <a
              href="/news"
              className="px-4 py-2 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white dark:bg-white/5 text-xs font-semibold hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm"
            >
              View all
            </a>

            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scrollIndex > 0 && setScrollIndex(s => s - 1)}
                disabled={scrollIndex === 0}
                className="size-9 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={() => scrollIndex < UPDATES_DATA.length - 3 && setScrollIndex(s => s + 1)}
                disabled={scrollIndex >= UPDATES_DATA.length - 3}
                className="size-9 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="size-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>

        {/* ── KART LİSTESİ ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPDATES_DATA.slice(scrollIndex, scrollIndex + 3).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCard(item)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              <div
                className={`relative aspect-[1.1/1] w-full rounded-3xl p-7 bg-gradient-to-br ${item.gradient} flex flex-col justify-between text-white overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                    {item.badgeTitle}
                  </h3>
                </div>

                <div className="relative z-10 flex flex-wrap gap-1.5 opacity-80">
                  {item.badgeSub.map((sub, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium tracking-wide bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 px-1">
                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 transition-colors leading-snug">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── POPUP DETAY MODALI (SABİTLENMİŞ VE TAM UYUMLU) ── */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8 overscroll-none">
            {/* Dark Arka Plan Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Penceresi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto"
            >
              {/* Modal Banner */}
              <div
                className={`relative p-8 sm:p-10 bg-gradient-to-br ${selectedCard.gradient} text-white flex flex-col justify-between min-h-[180px] shrink-0`}
              >
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-5 right-5 size-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/20 z-20"
                >
                  <X className="size-4" />
                </button>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-semibold">
                    <Sparkles className="size-3 text-amber-300" />
                    <span>{selectedCard.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {selectedCard.badgeTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium opacity-80 pt-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {selectedCard.date}
                  </span>
                  <span>•</span>
                  <span>{selectedCard.readTime}</span>
                </div>
              </div>

              {/* Modal Body (Scroll Sorunu Engellenmiş Alan) */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto overscroll-contain touch-pan-y leading-relaxed text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <p className="text-base font-semibold text-zinc-950 dark:text-white">
                  {selectedCard.summary}
                </p>

                <div className="h-px w-full bg-[#EFECE6] dark:bg-white/10" />

                {selectedCard.content}
              </div>

              {/* Modal Altlık */}
              <div className="p-5 sm:p-6 bg-[#FAF8F5] dark:bg-[#0C0A09] border-t border-[#EFECE6] dark:border-white/10 flex items-center justify-between shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EFECE6] dark:border-white/10 bg-white dark:bg-white/5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Share2 className="size-3.5" />}
                  <span>{copied ? 'Kopyalandı' : 'Paylaş'}</span>
                </button>

                <a
                  href={`/news/${selectedCard.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <span>Tüm Haberi Oku</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}