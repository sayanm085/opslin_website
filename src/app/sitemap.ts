import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opslin.shotlin.in";

// Only routes that actually exist in this app — /docs, /pricing, and
// /transparency belong to opslin-dashboard (and the separate docs/ Nextra
// site), not this project, now that the surfaces are split.
const routes = [
  "",
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
