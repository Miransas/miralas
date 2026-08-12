import type { MetadataRoute } from "next";

const baseUrl = "https://miralas.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/community",
    "/contact",
    "/customers",
    "/developer",
    "/docs",
    "/enterprise",
    "/guide",
    "/pricing",
    "/privacy",
    "/products",
    "/resources",
    "/solutions",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
