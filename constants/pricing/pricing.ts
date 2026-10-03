

type TabType = "creative" | "agents" | "api";
type BillingCycle = "monthly" | "yearly";
type CardTheme = "default" | "indigo" | "rose" | "emerald" | "purple";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  theme?: CardTheme; 
  description: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  priceUnit?: string;
  subtext?: string;
  featuresTitle?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const PRICING_DATA: Record<TabType, PricingPlan[]> = {
  creative: [
    {
      id: "creative-free",
      name: "Free",
      theme: "default", // Sade kalıyor
      description: "Ses sentezleme ve studio araçlarını ücretsiz keşfedin.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceUnit: "/ ay",
      featuresTitle: "Ücretsiz Pakete Dahil:",
      features: ["10.000 Karakter / Ay", "Standart Ses Sentezi", "3 Standart Ses Modeli"],
      ctaText: "Ücretsiz Dene",
      ctaHref: "/studio",
    },
    {
      id: "creative-pro",
      name: "Pro",
      theme: "emerald", // Mavi/Mor geçişli
      subtext: "İçerik üreticileri için ideal",
      description: "Yüksek kaliteli içerik üretimi ve temel ses klonlama.",
      monthlyPrice: 15,
      yearlyPrice: 12,
      priceUnit: "/ ay",
      featuresTitle: "Free pakete ek olarak:",
      features: ["100.000 Karakter / Ay", "Ticari Kullanım Lisansı", "Anında Ses Klonlama"],
      ctaText: "Pro'ya Geç",
      ctaHref: "/studio?plan=pro",
    },
    {
      id: "creative-max",
      name: "Max",
      popular: true,
      badge: "En Popüler",
      theme: "rose", // Lüks Kırmızı/Gül Kurusu
      description: "Profesyonel yayıncılar, stüdyolar ve podcast üreticileri.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      priceUnit: "/ ay",
      featuresTitle: "Pro pakete ek olarak:",
      features: ["500.000 Karakter / Ay", "Profesyonel Ses Klonlama", "192kbps Kalite"],
      ctaText: "Max'e Yükselt",
      ctaHref: "/studio?plan=max",
    },
    {
      id: "creative-ultra",
      name: "Ultra",
      theme: "purple", // Derin Mor Kurumsal Kart
      description: "Özel yüksek hacim ve kurumsal stüdyo gereksinimleri.",
      monthlyPrice: "İletişim",
      yearlyPrice: "İletişim",
      featuresTitle: "Max pakete ek olarak:",
      features: ["Sınırsız Karakter", "SLA Garantisi", "Dedicated Sunucu"],
      ctaText: "Ekiple Görüşün",
      ctaHref: "/resources/support",
    },
  ],
  agents: [
     {
      id: "creative-free",
      name: "Free",
      theme: "default", // Sade kalıyor
      description: "Ses sentezleme ve studio araçlarını ücretsiz keşfedin.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceUnit: "/ ay",
      featuresTitle: "Ücretsiz Pakete Dahil:",
      features: ["10.000 Karakter / Ay", "Standart Ses Sentezi", "3 Standart Ses Modeli"],
      ctaText: "Ücretsiz Dene",
      ctaHref: "/studio",
    },
    {
      id: "creative-pro",
      name: "Pro",
      theme: "rose", // Mavi/Mor geçişli
      subtext: "İçerik üreticileri için ideal",
      description: "Yüksek kaliteli içerik üretimi ve temel ses klonlama.",
      monthlyPrice: 15,
      yearlyPrice: 12,
      priceUnit: "/ ay",
      featuresTitle: "Free pakete ek olarak:",
      features: ["100.000 Karakter / Ay", "Ticari Kullanım Lisansı", "Anında Ses Klonlama"],
      ctaText: "Pro'ya Geç",
      ctaHref: "/studio?plan=pro",
    },
    {
      id: "creative-max",
      name: "Max",
      popular: true,
      badge: "En Popüler",
      theme: "indigo", // Lüks Kırmızı/Gül Kurusu
      description: "Profesyonel yayıncılar, stüdyolar ve podcast üreticileri.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      priceUnit: "/ ay",
      featuresTitle: "Pro pakete ek olarak:",
      features: ["500.000 Karakter / Ay", "Profesyonel Ses Klonlama", "192kbps Kalite"],
      ctaText: "Max'e Yükselt",
      ctaHref: "/studio?plan=max",
    },
    {
      id: "creative-ultra",
      name: "Ultra",
      theme: "purple", // Derin Mor Kurumsal Kart
      description: "Özel yüksek hacim ve kurumsal stüdyo gereksinimleri.",
      monthlyPrice: "İletişim",
      yearlyPrice: "İletişim",
      featuresTitle: "Max pakete ek olarak:",
      features: ["Sınırsız Karakter", "SLA Garantisi", "Dedicated Sunucu"],
      ctaText: "Ekiple Görüşün",
      ctaHref: "/resources/support",
    },
  ],
  api: [
     {
      id: "creative-free",
      name: "Free",
      theme: "default", // Sade kalıyor
      description: "Ses sentezleme ve studio araçlarını ücretsiz keşfedin.",
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceUnit: "/ ay",
      featuresTitle: "Ücretsiz Pakete Dahil:",
      features: ["10.000 Karakter / Ay", "Standart Ses Sentezi", "3 Standart Ses Modeli"],
      ctaText: "Ücretsiz Dene",
      ctaHref: "/studio",
    },
    {
      id: "creative-pro",
      name: "Pro",
      theme: "purple", // Mavi/Mor geçişli
      subtext: "İçerik üreticileri için ideal",
      description: "Yüksek kaliteli içerik üretimi ve temel ses klonlama.",
      monthlyPrice: 15,
      yearlyPrice: 12,
      priceUnit: "/ ay",
      featuresTitle: "Free pakete ek olarak:",
      features: ["100.000 Karakter / Ay", "Ticari Kullanım Lisansı", "Anında Ses Klonlama"],
      ctaText: "Pro'ya Geç",
      ctaHref: "/studio?plan=pro",
    },
    {
      id: "creative-max",
      name: "Max",
      popular: true,
      badge: "En Popüler",
      theme: "rose", // Lüks Kırmızı/Gül Kurusu
      description: "Profesyonel yayıncılar, stüdyolar ve podcast üreticileri.",
      monthlyPrice: 49,
      yearlyPrice: 39,
      priceUnit: "/ ay",
      featuresTitle: "Pro pakete ek olarak:",
      features: ["500.000 Karakter / Ay", "Profesyonel Ses Klonlama", "192kbps Kalite"],
      ctaText: "Max'e Yükselt",
      ctaHref: "/studio?plan=max",
    },
    {
      id: "creative-ultra",
      name: "Ultra",
      theme: "indigo", // Derin Mor Kurumsal Kart
      description: "Özel yüksek hacim ve kurumsal stüdyo gereksinimleri.",
      monthlyPrice: "İletişim",
      yearlyPrice: "İletişim",
      featuresTitle: "Max pakete ek olarak:",
      features: ["Sınırsız Karakter", "SLA Garantisi", "Dedicated Sunucu"],
      ctaText: "Ekiple Görüşün",
      ctaHref: "/resources/support",
    },
  ]
};