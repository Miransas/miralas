"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DynamicHeader() {
  const pathname = usePathname(); // Mevcut rotayı (URL yolunu) alır

  // Rotalara göre header içeriğini veya stilini ayarlayabilirsin
  const getHeaderContent = () => {
    switch (pathname) {
      case "/":
        return { title: "Miralas Ana Sayfa", bg: "bg-transparent" };
      case "/dashboard":
        return { title: "Miralas Çalışma Alanı", bg: "bg-zinc-900" };
      case "/pricing":
        return { title: "Fiyatlandırma | Miralas", bg: "bg-zinc-800" };
      default:
        return { title: "Miralas by Miransas", bg: "bg-background" };
    }
  };

  const { title, bg } = getHeaderContent();

  return (
    <header className={`w-full p-4 border-b transition-colors duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Örnek logo kullanımı */}
          <img src="/assets/favicon-32x32.png" alt="Miralas Logo" className="w-8 h-8 rounded" />
          <h1 className="text-xl font-bold font-jakarta">{title}</h1>
        </div>
        
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}