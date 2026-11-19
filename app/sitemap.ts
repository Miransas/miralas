import type { MetadataRoute } from "next";
import { getDocs } from "@/lib/docs";
import { SITE_URL } from "@/lib/seo";

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: SitemapEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Core product & pricing
  { path: "/product", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/tts", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/models", priority: 0.9, changeFrequency: "monthly" },
  { path: "/product/voice-clone", priority: 0.8, changeFrequency: "weekly" },
  { path: "/product/api", priority: 0.8, changeFrequency: "weekly" },
  { path: "/product/agent", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },

  // Solutions
  { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/creators", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/streaming", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/voice-agents", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/enterprise-voice", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/others", priority: 0.7, changeFrequency: "monthly" },

  // Resources & secondary
  { path: "/resources/changelog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/help-center", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/support", priority: 0.5, changeFrequency: "monthly" },
  { path: "/resources/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/resources/media", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const docRoutes: SitemapEntry[] = getDocs().map((doc) => ({
    path: `/docs/${doc.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [...staticRoutes, ...docRoutes].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
