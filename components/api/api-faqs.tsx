"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ChevronDown, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  ArrowRight,
  HelpCircle,
  FileCode2
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const API_FAQS: FAQItem[] = [
  {
    id: 'what-is-api',
    question: 'Miransas API nedir?',
    answer: (
      <p>
        Miransas API; geliştiricilerin ve şirketlerin insan doğallığındaki ses sentezini, gerçek zamanlı konuşma asistanlarını ve ses klonlama modellerini kendi yazılımlarına, web sitelerine veya mobil uygulamalarına doğrudan entegre etmelerini sağlayan güçlü bir REST ve WebSocket programlama arayüzüdür.
      </p>
    ),
  },
  {
    id: 'available-apis',
    question: 'Hangi API uç noktaları (endpoints) mevcuttur?',
    answer: (
      <p>
        Metinden sese (Text-to-Speech), gerçek zamanlı ses akışı (Real-time Streaming), ses klonlama (Voice Cloning), ses tasarımı (Voice Design), dil modelleri entegrasyonu ve çoklu asistan yönetimi (Multi-agent orchestration) için uçtan uca zengin bir uç nokta koleksiyonu sunuyoruz.
      </p>
    ),
  },
  {
    id: 'what-can-i-build',
    question: 'API ile neler inşa edebilirim?',
    answer: (
      <p>
        Akıllı müşteri hizmetleri botları (IVR), yapay zeka destekli sesli asistanlar, sesli kitap üreticileri, e-learning platformları, oyun içi NPC seslendirmeleri ve otomatik içerik seslendirme sistemleri geliştirebilirsiniz.
      </p>
    ),
  },
  {
    id: 'authentication',
    question: 'Kimlik doğrulama (Authentication) nasıl çalışır?',
    answer: (
      <p>
        Tüm API istekleri, Miransas Console üzerinden üreteceğiniz gizli bir <strong>API Anahtarı (xi-api-key)</strong> gerektirir. Bu anahtarı istek başlıklarında (headers) güvenli bir şekilde ileterek işlemlerinizi yetkilendirebilirsiniz.
      </p>
    ),
  },
  {
    id: 'usage-limits',
    question: 'Kullanım limitleri (Usage limits) nelerdir?',
    answer: (
      <p>
        Limitler seçtiğiniz abonelik planına (Free, Pro, Scale, Enterprise) göre değişiklik gösterir. Dakika başına istek (RPM) sınırları kurumsal ihtiyaçlara göre özel olarak esnetilebilir veya Burst Pricing ile artırılabilir.
      </p>
    ),
  },
  {
    id: 'sdks-provided',
    question: 'Yazılım geliştirme kiti (SDK) sağlıyor musunuz?',
    answer: (
      <p>
        Evet. En popüler diller için optimize edilmiş resmi <strong>Python ve TypeScript / JavaScript SDK</strong> paketlerimiz mevcuttur; böylece projelerinize dakikalar içinde entegrasyon sağlayabilirsiniz.
      </p>
    ),
  },
  {
    id: 'metering',
    question: 'Kullanım ücretlendirmesi nasıl ölçülür (Metered)?',
    answer: (
      <p>
        Faturalandırma, API üzerinden başarıyla sentezlenen toplam karakter veya dakika miktarı baz alınarak saniye hassasiyetinde otomatik olarak ölçülür.
      </p>
    ),
  },
  {
    id: 'custom-voices',
    question: 'API üzerinden özel sesler (Custom voices) kullanabilir miyim?',
    answer: (
      <p>
        Kesinlikle. Kendi ses klonlarınızı kontrol paneli üzerinden oluşturabilir ve API isteklerinizde ilgili <code>voice_id</code> parametresini belirterek özel seslerinizle sentez yapabilirsiniz.
      </p>
    ),
  },
  {
    id: 'commercial-use',
    question: 'API içeriği ticari kullanım için güvenli ve yasal mı?',
    answer: (
      <p>
        Pro, Scale ve Enterprise planlarımızla üretilen tüm ses içerikleri ticari projelerinizde (reklamlar, ticari uygulamalar, prodüksiyonlar) tamamen yasal olarak kullanılabilir.
      </p>
    ),
  },
  {
    id: 'latency',
    question: 'Nasıl bir gecikme (latency) süresi beklemeliyim?',
    answer: (
      <p>
        Küresel edge (kenar) sunucu altyapımız ve optimize edilmiş sinirsel akış modellerimiz sayesinde, standart uçtan uca gecikme süremiz <strong>90 milisaniyenin altındadır</strong>.
      </p>
    ),
  },
  {
    id: 'streaming-support',
    question: 'Akış (Streaming) desteği var mı?',
    answer: (
      <p>
        Evet. WebSocket ve parçalı HTTP transferleri üzerinden gerçek zamanlı ses akışı desteği sunuyoruz; metin işlenirken ses milisaniyeler içinde çalınmaya başlar.
      </p>
    ),
  },
  {
    id: 'error-handling',
    question: 'Hataları (Errors) nasıl yönetmeliyim?',
    answer: (
      <p>
        Standart HTTP durum kodları (400, 401, 429, 500 vb.) ve açıklayıcı JSON hata gövdeleri döneriz. Rate limit aşımı veya geçersiz parametre durumlarında sistemimiz net yönlendirme mesajları sağlar.
      </p>
    ),
  },
  {
    id: 'documentation',
    question: 'API dokümantasyonunu nerede bulabilirim?',
    answer: (
      <p>
        Detaylı kod örnekleri, Postman koleksiyonları ve uç nokta rehberleri için <code>docs.miransas.com</code> adresindeki geliştirici portalımızı inceleyebilirsiniz.
      </p>
    ),
  },
  {
    id: 'enterprise-support',
    question: 'Kurumsal destek (Enterprise support) sunuyor musunuz?',
    answer: (
      <p>
        Evet. Kurumsal müşterilerimize özel Slack/Discord kanalları, SLA garantileri, özel sunucu konuşlandırmaları (custom deployments) ve 7/24 mühendislik desteği sağlıyoruz.
      </p>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ApiSectionFAQ() {
  const [openId, setOpenId] = useState<string | null>('what-is-api');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F2F2F2] dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300 font-sans antialiased overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-24">
        
     
        {/* ════ PART 2: API FREQUENTLY ASKED QUESTIONS (SSS) ════ */}
        <div className="max-w-3xl mx-auto space-y-10 pt-16">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 shadow-sm">
              <HelpCircle className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>API SSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              API hakkında <span className="text-zinc-400 dark:text-zinc-500  ">merak edilenler</span>
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
              Kimlik doğrulama, SDK'lar, gecikme süreleri ve güvenlik politikalarımız hakkında kapsamlı rehber.
            </p>
          </div>

          {/* Akordeon Liste */}
          <div className="space-y-4">
            {API_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="group rounded-[32px] bg-white dark:bg-[#141210] overflow-hidden shadow-sm transition-colors duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none gap-6"
                    aria-expanded={isOpen}
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

        </div>

      </div>
    </section>
  );
}

export default ApiSectionFAQ;