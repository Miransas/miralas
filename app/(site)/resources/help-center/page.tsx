import type { Metadata } from "next";

import { HelpCenter } from "@/components/resources/help-center";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Help Center",
  description:
    "Clear answers about Miralas voice technology: current Chatterbox Multilingual capabilities, Uzbek speech development status, permissions, and data handling.",
  path: "/resources/help-center",
});

export default function HelpCenterPage() {
  return (
    <main className="bg-[#F2F2F2] dark:bg-[#08080a]">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Help Center
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Straight answers about what works today and what is still in
            development.
          </p>
        </header>

        <HelpCenter />
      </div>
    </main>
  );
}