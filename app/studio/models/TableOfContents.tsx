'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { tocSections } from '@/lib/benchmark-data';

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    tocSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin pb-8">
      <div className="mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          On This Page
        </h3>
        <ul className="space-y-1">
          {tocSections.map((section, i) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group block py-2 px-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive ? 'hsl(199 89% 52% / 0.1)' : 'transparent',
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 transition-colors"
                      style={{
                        backgroundColor: isActive ? 'hsl(199 89% 52%)' : 'hsl(217 33% 25%)',
                      }}
                    />
                    <div>
                      <div
                        className="text-sm font-medium transition-colors"
                        style={{
                          color: isActive ? 'hsl(199 89% 52%)' : 'hsl(215 20% 65%)',
                        }}
                      >
                        {section.title}
                      </div>
                      <div className="text-xs text-muted-foreground/60 mt-0.5 hidden lg:block">
                        {section.subtitle}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX: progress / 100,
        background: 'linear-gradient(90deg, hsl(199 89% 52%), hsl(142 69% 48%))',
      }}
    />
  );
}
