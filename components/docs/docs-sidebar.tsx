'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navigation } from '@/lib/docs-d';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 py-6 pr-4">
      {navigation.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          {/* Başlık: Daha küçük boyut, geniş harf arası (tracking) ile premium hissiyat */}
          <h4 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            {section.title}
          </h4>
          
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = item.href !== '#' && pathname === item.href;
              const isDisabled = item.href === '#';

              // DEVRE DIŞI / YAKINDA DURUMU
              if (isDisabled) {
                return (
                  <span
                    key={`disabled-${item.label}`}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground/40 cursor-not-allowed select-none"
                  >
                    {item.label}
                    <span className="text-[9px] font-medium uppercase tracking-wider bg-muted/50 px-1.5 py-0.5 rounded-sm">
                      Yakında
                    </span>
                  </span>
                );
              }

              // AKTİF / İNAKTİF LİNKLER
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200 ease-out',
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  )}
                >
                  {isActive && (
                    <>
                      {/* Aktif Arkaplan Animasyonu (Premium hissiyat için) */}
                      <motion.div
                        layoutId="sidebar-active-bg"
                        className="absolute inset-0 rounded-lg bg-accent/60 dark:bg-accent/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                      {/* Aktif Sol Çizgi (Daha zarif ve uyumlu bir renk) */}
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-primary"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    </>
                  )}
                  {/* Z-index sayesinde metin animasyonlu arkaplanın üstünde kalır */}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}