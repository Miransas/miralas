import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import About from "./about.mdx";

export const metadata: Metadata = createPageMetadata({
  title: "About Miralas",
  description:
    "Learn about Miralas by Miransas: our Chatterbox Multilingual speech foundation, Rust and Python gRPC architecture, and ongoing native Uzbek speech research.",
  path: "/resources/about",
});

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 md:px-8">
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <About />
      </article>
    </main>
  );
}
