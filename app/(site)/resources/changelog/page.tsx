import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Changelog from "./changelog.mdx";

export const metadata: Metadata = createPageMetadata({
  title: "Changelog & Updates",
  description:
    "Follow Miralas engineering milestones, website updates, Chatterbox Multilingual baseline notes, and progress on native Uzbek speech research and validation.",
  path: "/resources/changelog",
});

export default function ChangelogPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 md:px-8">
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <Changelog />
      </article>
    </main>
  );
}
