'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '@/hooks/use-active-section';
import type { TocItem } from '@/lib/docs-d';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const ids = items.map((i) => i.id);
  const activeId = useActiveSection(ids);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  
  // Hydration ve ilk yüklenmedeki "zıplama" animasyonunu önlemek için
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !activeId) return;
    
    const activeEl = containerRef.current.querySelector(
      `[data-toc-id="${activeId}"]`
    ) as HTMLElement | null;
    
    if (activeEl) {
      // 16px (h-4) yüksekliğindeki çubuğu tam ortalamak için 8 çıkarıyoruz
      setIndicatorTop(activeEl.offsetTop + activeEl.offsetHeight / 2 - 8);
    }
  }, [activeId, items]);

  if (items.length === 0) return null;

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Offset gerekiyorsa ileride burayı güncelleyebilirsin
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-6">
      {/* Başlık: Sidebar ile aynı premium tipografi */}
      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </h4>
      
      <div ref={containerRef} className="relative pl-4">
        {/* Arka plandaki ince dikey rehber çizgi */}
        <div className="absolute left-0 top-0 h-full w-px bg-border/40" />

        {/* Hareket eden aktif öğe göstergesi (Zarif dikey çubuk) */}
        {hasMounted && activeId && (
          <motion.div
            className="absolute left-[-0.5px] h-4 w-[2px] rounded-full "
            animate={{ top: indicatorTop }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        <ul className="flex flex-col gap-1.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            
            return (
              <li
                key={item.id}
                data-toc-id={item.id}
                className={cn(
                  'transition-all',
                  
                  item.level === 3 && 'pl-3'
                )}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className={cn(
                    'block text-[13px] leading-snug transition-all duration-200 ease-out',
                    isActive
                      ? 'font-medium text-md text-foreground/90 translate-x-0.5' 
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}