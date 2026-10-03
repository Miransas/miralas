"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Bot, 
  Palette, 
  Code2, 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Globe,
  Zap,
  Award
} from "lucide-react";

export function AboutSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-background text-foreground overflow-hidden">
      
      {/* Arka Plan Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c9a87c]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-24">

        {/* ════ GİRİŞ & VİZYON ════ */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a87c]">
            <Sparkles className="size-3.5" />
            <span>Hakkımızda</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Teknolojiyle iletişim kurma biçiminizi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a87c] via-[#e8d5b5] to-[#c9a87c]">
              yeniden tanımlıyoruz.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            Miralas, insan doğallığındaki yapay zeka ses ve medya teknolojileriyle insan-makine etkileşimini akıcı, engelsiz ve duygusal bir seviyeye taşıyan öncü bir araştırma ve ürün platformudur.
          </p>
        </div>

        {/* İSTATİSTİK ROZETLERİ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl border border-border/60 bg-card/30 backdrop-blur-md shadow-sm">
          <div className="text-center space-y-1 p-4">
            <p className="text-3xl font-extrabold text-[#c9a87c]">70+</p>
            <p className="text-xs text-muted-foreground font-light">Desteklenen Dil & Aksan</p>
          </div>
          <div className="text-center space-y-1 p-4 border-l border-border/40">
            <p className="text-3xl font-extrabold text-foreground">&lt;90ms</p>
            <p className="text-xs text-muted-foreground font-light">Ultra Düşük Gecikme</p>
          </div>
          <div className="text-center space-y-1 p-4 border-l border-border/40">
            <p className="text-3xl font-extrabold text-[#c9a87c]">%99.99</p>
            <p className="text-xs text-muted-foreground font-light">Kesintisiz Uptime SLA</p>
          </div>
          <div className="text-center space-y-1 p-4 border-l border-border/40">
            <p className="text-3xl font-extrabold text-foreground">3 Katmanlı</p>
            <p className="text-xs text-muted-foreground font-light">Yapay Zeka Güvenlik Ağı</p>
          </div>
        </div>

        {/* ════ 3 ANA PLATFORM (Miralas Ecosystem) ════ */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Üç Temel <span className="text-[#c9a87c]">Sütun Üzerine</span> İnşa Edildi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-lg mx-auto">
              Miralas ekosistemi, kurumsal ihtiyaçlardan bireysel içerik üretimine kadar her alana özel çözümler sunar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Platform 1: Miralas Agents */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 border border-border/60 bg-card/40 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[#c9a87c]/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="size-12 rounded-2xl border border-[#c9a87c]/30 bg-[#c9a87c]/10 flex items-center justify-center text-[#c9a87c]">
                  <Bot className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Miralas Agents</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  İşletmelerin ölçeklenebilir, entegre, güvenli ve gerçek zamanlı sesli/yazılı yapay zeka asistanlarını yüksek kararlılıkla canlıya almalarını sağlar.
                </p>
              </div>
              <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-[#c9a87c] font-medium">
                <span>Kurumsal Yapay Zeka</span>
                <Zap className="size-4" />
              </div>
            </motion.div>

            {/* Platform 2: Miralas Creative */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 border border-border/60 bg-card/40 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[#c9a87c]/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="size-12 rounded-2xl border border-[#c9a87c]/30 bg-[#c9a87c]/10 flex items-center justify-center text-[#c9a87c]">
                  <Palette className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Miralas Creative</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  İçerik üreticileri ve pazarlamacılar için 70+ dilde stüdyo kalitesinde konuşma, müzik, görsel ve video içerikleri üretme ve düzenleme imkanı.
                </p>
              </div>
              <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-[#c9a87c] font-medium">
                <span>Stüdyo Üretim Seti</span>
                <Globe className="size-4" />
              </div>
            </motion.div>

            {/* Platform 3: Miralas API */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 border border-border/60 bg-card/40 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[#c9a87c]/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="size-12 rounded-2xl border border-[#c9a87c]/30 bg-[#c9a87c]/10 flex items-center justify-center text-[#c9a87c]">
                  <Code2 className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Miralas API</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Geliştiricilere, sektör lideri temel yapay zeka ses ve medya modellerimize kesintisiz, düşük gecikmeli erişim olanağı sunar.
                </p>
              </div>
              <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-[#c9a87c] font-medium">
                <span>Geliştirici Altyapısı</span>
                <Award className="size-4" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ════ TOPLUMSAL ETKİ & GÜVENLİK (2'li Kutu) ════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Miralas Impact */}
          <div className="rounded-3xl p-8 border border-border/60 bg-card/30 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#c9a87c]/10 text-[#c9a87c] border border-[#c9a87c]/20">
                <HeartHandshake className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Miralas Impact Programı</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Teknolojiyi herkes için erişilebilir kılmayı hedefliyoruz. Özel erişilebilirlik gereksinimi olan bireylere, sağlık, eğitim ve kültür alanındaki kar amacı gütmeyen kuruluşlara ücretsiz lisans ve altyapı desteği sağlıyoruz.
            </p>
          </div>

          {/* AI Safety */}
          <div className="rounded-3xl p-8 border border-border/60 bg-card/30 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#c9a87c]/10 text-[#c9a87c] border border-[#c9a87c]/20">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Etik ve Çok Katmanlı Güvenlik</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
              Yapay zeka etiği inovasyonumuzun merkezindedir. Araştırma ve mühendislik uzmanlarından oluşan özel güvenlik ekibimiz, olası ihlalleri önlemek, tespit etmek ve engellemek için proaktif savunma sistemleri işletmektedir.
            </p>
          </div>

        </div>

        {/* ════ KARİYER & EKİP ÇAĞRISI ════ */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-card via-[#c9a87c]/10 to-card border border-[#c9a87c]/30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c9a87c]">
              <Users className="size-4" />
              <span>Geleceği Birlikte İnşa Edelim</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              İşimizin Arkasındaki Tutkulu Ekip
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Bizler araştırmacılar, mühendisler ve sektörün en iyi zihinleriyiz. Kalıcı, olumlu bir etki yaratmak ve hayatınızın en iyi projelerine imza atmak istiyorsanız ekibimize katılın.
            </p>
          </div>

          <a
            href="/careers"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            <span>Açık Pozisyonları İncele</span>
            <ArrowRight className="size-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;