'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun,  AudioLines } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IconBrandGithub } from '@tabler/icons-react';

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/docs/getting-started" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <AudioLines className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight">Miralas.io</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Docs
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/miransas/miralas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="GitHub repository"
          >
            <IconBrandGithub className="h-4 w-4" />
          </a>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
