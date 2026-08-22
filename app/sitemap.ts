import type { MetadataRoute } from "next";

const siteUrl = "https://miralas.io";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
  { path: "/products", priority: 0.8, changeFrequency: "weekly" },
  { path: "/products/api", priority: 0.8, changeFrequency: "weekly" },
  { path: "/products/donate", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/changelog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/resources/docs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/resources/guides", priority: 0.8, changeFrequency: "weekly" },
  { path: "/resources/help-center", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/media", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources/support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/studio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/studio/models", priority: 0.8, changeFrequency: "monthly" },
  { path: "/studio/tts", priority: 0.9, changeFrequency: "weekly" },
  { path: "/studio/voice-clone", priority: 0.9, changeFrequency: "weekly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
