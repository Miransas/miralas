'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ChevronDown, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Globe2, 
  Lock, 
  Zap, 
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

export function ApiSectionFAQ() {
  const [openId, setOpenId] = useState<string | null>('what-is-api');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] dark:bg-black text-[#1C1917] dark:text-[#F5F2EB] transition-colors duration-500 antialiased overflow-hidden">
      {/* Ambient Glow */}

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ════ PART 1: APIS BUILT FOR PRODUCTION (Görseldeki Konsept) ════ */}
        <div className="space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 shadow-sm">
              <Code2 className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>Developer API</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
              APIs built for <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">production.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Yüksek hacimli kurumsal uygulamalarınız için tasarlanmış; uçtan uca şifrelenmiş, esnek ve güvenli mimari.
            </p>
          </div>

          {/* Bento Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Kart 1: Enterprise Data Protection */}
            <div className="lg:col-span-2 rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 flex items-center justify-center">
                  <ShieldCheck className="size-6 text-zinc-900 dark:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  Enterprise-level data protection
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                  Verileriniz aktarım sırasında ve bekleme durumunda şifrelenir. <strong>SOC 2, HIPAA ve GDPR uyumluluğu</strong>[cite: 1] ile birlikte; daha sıkı veri kontrolü isteyenler için AB Veri İkameti (EU Data Residency) ve Sıfır Saklama (Zero Retention) modları[cite: 1] sunulur.
                </p>
              </div>

              {/* Rozet Şeridi */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#EFECE6] dark:border-white/10">
                {['SOC 2 Type II', 'HIPAA attestation', 'Zero Retention mode[cite: 1]', 'Data Residency[cite: 1]'].map((badge, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Kart 2: Python & TypeScript SDKs */}
            <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#141210] border border-[#EFECE6] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#EFECE6] dark:border-white/10 flex items-center justify-center">
                  <Terminal className="size-6 text-zinc-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  Python & TypeScript SDKs[cite: 1]
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Modern geliştirici deneyimi için optimize edilmiş resmi kütüphanelerimizle dakikalar içinde canlıya geçin.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFECE6] dark:border-white/10 flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-white">
                <span>npm i @miransas/sdk</span>
                <FileCode2 className="size-4 text-zinc-400" />
              </div>
            </div>

            {/* Kart 3: Elevated Support & Custom Deployments */}
            <div className="lg:col-span-3 rounded-3xl p-8 sm:p-10 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-zinc-900/10 text-[10px] font-bold uppercase tracking-wider">
                  <Cpu className="size-3 text-emerald-400 dark:text-emerald-600" />
                  <span>Özel Altyapı</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Elevated support and custom deployments[cite: 1]
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 max-w-2xl">
                  Özel bulut (VPC) veya şirket içi (on-premise) kurulumlar, adanmış mimarlar ve öncelikli mühendislik desteğiyle ölçeğinizi güvenceye alın.
                </p>
              </div>

              <a
                href="/enterprise"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>Enterprise Ekibiyle Görüşün</span>
                <ArrowRight className="size-4" />
              </a>
            </div>

          </div>
        </div>

        {/* ════ PART 2: API FREQUENTLY ASKED QUESTIONS (SSS) ════ */}
        <div className="max-w-4xl mx-auto space-y-10 pt-12 border-t border-[#EFECE6] dark:border-white/10">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFECE6] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 shadow-sm">
              <HelpCircle className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>API SSS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              API hakkında <span className="text-zinc-400 dark:text-zinc-500 font-serif italic">merak edilenler</span>
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
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-zinc-300 dark:border-white/20 bg-white dark:bg-[#141210] shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
                      : 'border-[#EFECE6] dark:border-white/10 bg-white/60 dark:bg-white/[0.02] hover:border-zinc-300 dark:hover:border-white/15'
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

        </div>

      </div>
    </section>
  );
}

export default ApiSectionFAQ;