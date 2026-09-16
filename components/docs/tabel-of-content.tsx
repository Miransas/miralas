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
  const [dotTop, setDotTop] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !activeId) return;
    const activeEl = containerRef.current.querySelector(
      `[data-toc-id="${activeId}"]`
    ) as HTMLElement | null;
    if (activeEl) {
      setDotTop(activeEl.offsetTop + activeEl.offsetHeight / 2 - 4);
    }
  }, [activeId]);

  if (items.length === 0) return null;

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-8">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider dark:text-stone-300">
        On this page
      </h4>
      <div ref={containerRef} className="relative pl-4">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 h-full w-px bg-border" />

        {/* Animated tracking dot */}
        <motion.div
          className="absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-500 ring-4 ring-blue-500/20"
          animate={{ top: dotTop }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                data-toc-id={item.id}
                className={cn(
                  'transition-colors',
                  item.level === 3 && 'ml-3'
                )}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className={cn(
                    'block py-1 text-[13px] leading-snug transition-colors',
                    isActive
                      ? 'font-medium text-foreground'
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
