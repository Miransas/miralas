'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navigation } from '@/lib/docs-d';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-8 py-8 ">
      {navigation.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <h4 className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider dark:text-stone-300">
            {section.title}
          </h4>
          {section.items.map((item) => {
            const isActive =
              item.href !== '#' && pathname === item.href;
            const isDisabled = item.href === '#';

            if (isDisabled) {
              return (
                <span
                  key={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm text-stone-500"
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground dark:bg-[#0a0a0a]'
                    : ' text-stone-500 hover:text-foreground hover:bg-accent'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-500"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
