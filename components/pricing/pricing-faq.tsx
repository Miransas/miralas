'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
    <section className="relative w-full py-24 bg-[#F2F2F2] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        
        {/* ── ÜST BAŞLIK ── */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        {/* ── AKORDEON LİSTESİ ── */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[32px] bg-white dark:bg-[#141210] overflow-hidden transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left focus:outline-none gap-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-bold text-zinc-950 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="shrink-0 text-zinc-900 dark:text-white"
                  >
                    <ChevronDown className="size-6" strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-8 pb-8 text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PricingFAQ;