import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opslin.shotlin.in";

const routes = [
  "",
  "/services",
  "/services/deployments",
  "/services/observability",
  "/services/security",
  "/services/databases",
  "/compare",
  "/pricing",
  "/demo",
  "/about",
  "/how-it-works",
  "/frameworks",
  "/vps-providers",
  "/docs",
  "/quick-start",
  "/faq",
  "/acceptable-use",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
