'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    id: 'agents-cost',
    question: 'MiransasAgents paketleri dakika başına ne kadar tutar ve neleri kapsar?',
    answer: (
      <p>
        Paketlerimiz dahilinde her ay belirli bir <strong>ücretsiz görüşme dakikası</strong> tanımlanır. Dahili dakikalarınız tükendiğinde, ek kullanım için paket seviyenize göre dakika başı (overage) birim fiyatlandırma devreye girer. Paketler; yüksek kaliteli ses sentezi, WebRTC canlı akış altyapısı, dahili LLM entegrasyonu ve gerçek zamanlı kesinti (interruption) yönetimini kapsar.
      </p>
    ),
  },
  {
    id: 'agent-limits',
    question: 'Kaç adet sesli asistan (agent) oluşturabilirim?',
    answer: (
      <p>
        Oluşturabileceğiniz asistan sayısında katı bir sınır yoktur. Free plan ile <strong>1 adet</strong> test asistanı oluşturabilirken, Pro ve Business planlarında dilediğiniz kadar farklı senaryoya ve dile özel asistan tanımlayabilirsiniz. Sınırlandırmalar asistan sayısına değil, eşzamanlı çağrı kapasitesine (Concurrency) dayanır.
      </p>
    ),
  },
  {
    id: 'llm-costs',
    question: 'Sesli asistanda kullanılan LLM (Büyük Dil Modeli) için ekstra ücret öder miyim?',
    answer: (
      <p>
        Hayır. Standart paketlerimizde Miransas optimize edilmiş dahili dil modelleri dakika maliyetine dahildir. Dilerseniz <strong>BYOK (Bring Your Own Key)</strong> mimarimiz sayesinde kendi OpenAI, Anthropic veya Groq API anahtarlarınızı bağlayarak doğrudan kendi model sağlayıcınız üzerinden de faturalandırılabilirsiniz.
      </p>
    ),
  },
  {
    id: 'telephony-charges',
    question: 'Telefon entegrasyonu (SIP / Twilio / Santral) için ek ücret alınıyor mu?',
    answer: (
      <p>
        WebRTC tabanlı tarayıcı ve mobil uygulama aramaları tamamen paket dahiline dahildir. Telefon hatları (PSTN / Twilio / SIP Trunk) üzerinden yapılan gelen ve giden aramalar için operatör taşıma maliyetleri dakika başına cüzi bir ek ücretle yansıtılır veya kendi SIP altyapınızı sıfır komisyonla bağlayabilirsiniz.
      </p>
    ),
  },
  {
    id: 'burst-pricing',
    question: 'Burst Pricing (Esnek Kapasite Kullanımı) nedir?',
    answer: (
      <p>
        Beklenmedik çağrı yoğunluklarında (kampanya dönemleri, kriz anları) sisteminizin kilitlenmesini önleyen akıllı ölçekleme mekanizmasıdır. Eşzamanlı çağrı limitinizi aştığınızda, sunucularımız otomatik olarak kapasiteyi artırır ve aşan trafiği kesintisiz işleyerek sizi yalnızca gerçekleşen ekstra çağrı süresi kadar esnek birim fiyattan ücretlendirir.
      </p>
    ),
  },
  {
    id: 'plan-changes',
    question: 'Aboneliğimi yükseltirsem, düşürürsem veya iptal edersem ne olur?',
    answer: (
      <p>
        Plan yükseltmelerinde, mevcut ayda kullanmadığınız bakiyeniz orantılı (prorated) olarak yeni paketinize indirim olarak yansır ve anında üst özelliklere erişirsiniz. İptal veya alt pakete geçiş durumlarında ise fatura döneminizin sonuna kadar mevcut paket ayrıcalıklarınızı kullanmaya devam edersiniz.
      </p>
    ),
  },
  {
    id: 'cancellation-terms',
    question: 'Aboneliğimi ne zaman ve nasıl iptal edebilirim?',
    answer: (
      <p>
        Herhangi bir taahhüt veya gizli şart yoktur. Kontrol panelinizdeki <strong>Abonelik Yönelim</strong> sekmesinden tek tıkla aboneliğinizi dilediğiniz an iptal edebilirsiniz. İptal sonrasında gelecek dönem için hesabınızdan hiçbir ücret tahsil edilmez.
      </p>
    ),
  },
  {
    id: 'credit-tracking',
    question: 'Kalan dakikalarımı veya karakter kredilerimi nasıl takip edebilirim?',
    answer: (
      <p>
        Miransas Console paneli üzerinden kullanım istatistiklerinizi, kalan dakikalarınızı ve anlık grafikleri canlı olarak izleyebilirsiniz. Ayrıca dakikalarınız %80 ve %95 seviyelerine ulaştığında e-posta ve Webhook uyarıları alabilirsiniz.
      </p>
    ),
  },
  {
    id: 'payment-methods',
    question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    answer: (
      <p>
        Tüm uluslararası geçerliliği olan Kredi ve Banka Kartlarını (Visa, Mastercard, American Express) Stripe güvencesiyle kabul ediyoruz. Kurumsal ve Ultra paket kullanan şirketler için <strong>Banka Havalesi / EFT ve Vadeli Fatura</strong> ile ödeme imkanı da sunulmaktadır.
      </p>
    ),
  },
];

export function PricingFAQ() {
  const [openId, setOpenId] = useState<string | null>('agents-cost');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 bg-background dark:bg-background text-[#1C1917] dark:text-[#F5F2EB] transition-colors duration-500 antialiased overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/5 dark:bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* ── ÜST BAŞLIK ── */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 shadow-sm">
            <HelpCircle className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Sıkça Sorulan Sorular</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Aklınıza takılan <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">tüm detaylar</span>
          </h2>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            Faturalandırma, sesli asistan limitleri ve teknik altyapımız hakkında merak ettiğiniz her şey.
          </p>
        </div>

        {/* ── AKORDEON LİSTESİ ── */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-4xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-zinc-300 dark:border-white/20 bg-white dark:bg-[#141210] shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
                    : 'border-[#EFECE6] dark:border-white/10 bg-[#FAF8F5] dark:bg-white/[0.02] hover:border-zinc-300 dark:hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-zinc-950 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`size-4 rounded-full border border-[#EFECE6] dark:border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950' : 'bg-[#FAF8F5] dark:bg-white/5 text-zinc-500'
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-[#EFECE6]/60 dark:border-white/5 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── ALT DESTEK BANNERI ── */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[#EFECE6] dark:border-white/10 bg-white/80 dark:bg-[#141210] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="size-12 rounded-2xl bg-zinc-900 dark:bg-white/10 text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageSquare className="size-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                Farklı bir sorunuz mu var?
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Mühendislik ve satış ekibimiz özel altyapı gereksinimleriniz için hazır.
              </p>
            </div>
          </div>

          <a
            href="/resources/support"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Ekip ile İletişime Geçin</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

export default PricingFAQ;