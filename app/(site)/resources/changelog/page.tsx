import type { Metadata } from "next";

// @ts-expect-error MDX module types are provided by the Next.js MDX loader.
import Changelog from "./changelog.mdx";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Everything that ships, changes or goes away at Miralas.",
};

export default function ChangelogPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 md:px-8">
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <Changelog />
      </article>
    </main>
  );
}