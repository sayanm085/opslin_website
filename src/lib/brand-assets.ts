export type ProviderId =
  | "coolify"
  | "dokploy"
  | "caprover"
  | "railway"
  | "render"
  | "heroku"
  | "vercel"
  | "manual-vps";

export type BrandAsset = {
  id: string;
  name: string;
  path?: string;
  monogram?: string;
  sourceUrl: string;
  accessibleLabel: string;
  trademarkStatus: "third-party trademark" | "generic mark";
};

export const providerIds: ProviderId[] = [
  "coolify", "dokploy", "caprover", "railway", "render", "heroku", "vercel", "manual-vps",
];

export const providerAssets: Record<ProviderId, BrandAsset> = {
  coolify: { id: "coolify", name: "Coolify", path: "/brands/coolify.svg", sourceUrl: "https://simpleicons.org/?q=coolify", accessibleLabel: "Coolify", trademarkStatus: "third-party trademark" },
  dokploy: { id: "dokploy", name: "Dokploy", monogram: "D", sourceUrl: "https://dokploy.com", accessibleLabel: "Dokploy", trademarkStatus: "third-party trademark" },
  caprover: { id: "caprover", name: "CapRover", path: "/brands/caprover.svg", sourceUrl: "https://simpleicons.org/?q=caprover", accessibleLabel: "CapRover", trademarkStatus: "third-party trademark" },
  railway: { id: "railway", name: "Railway", path: "/brands/railway.svg", sourceUrl: "https://simpleicons.org/?q=railway", accessibleLabel: "Railway", trademarkStatus: "third-party trademark" },
  render: { id: "render", name: "Render", path: "/brands/render.svg", sourceUrl: "https://simpleicons.org/?q=render", accessibleLabel: "Render", trademarkStatus: "third-party trademark" },
  heroku: { id: "heroku", name: "Heroku", monogram: "H", sourceUrl: "https://www.heroku.com", accessibleLabel: "Heroku", trademarkStatus: "third-party trademark" },
  vercel: { id: "vercel", name: "Vercel", path: "/brands/vercel.svg", sourceUrl: "https://simpleicons.org/?q=vercel", accessibleLabel: "Vercel", trademarkStatus: "third-party trademark" },
  "manual-vps": { id: "manual-vps", name: "Manual VPS", monogram: "VPS", sourceUrl: "", accessibleLabel: "Manual VPS operation", trademarkStatus: "generic mark" },
};

export const runtimeAssets: BrandAsset[] = [
  { id: "node", name: "Node.js", path: "/brands/nodedotjs.svg", sourceUrl: "https://simpleicons.org/?q=node.js", accessibleLabel: "Node.js", trademarkStatus: "third-party trademark" },
  { id: "python", name: "Python", path: "/brands/python.svg", sourceUrl: "https://simpleicons.org/?q=python", accessibleLabel: "Python", trademarkStatus: "third-party trademark" },
  { id: "go", name: "Go", path: "/brands/go.svg", sourceUrl: "https://simpleicons.org/?q=go", accessibleLabel: "Go", trademarkStatus: "third-party trademark" },
  { id: "php", name: "PHP", path: "/brands/php.svg", sourceUrl: "https://simpleicons.org/?q=php", accessibleLabel: "PHP", trademarkStatus: "third-party trademark" },
  { id: "ruby", name: "Ruby", path: "/brands/ruby.svg", sourceUrl: "https://simpleicons.org/?q=ruby", accessibleLabel: "Ruby", trademarkStatus: "third-party trademark" },
  { id: "java", name: "Java", path: "/brands/openjdk.svg", sourceUrl: "https://simpleicons.org/?q=openjdk", accessibleLabel: "Java / OpenJDK", trademarkStatus: "third-party trademark" },
  { id: "rust", name: "Rust", path: "/brands/rust.svg", sourceUrl: "https://simpleicons.org/?q=rust", accessibleLabel: "Rust", trademarkStatus: "third-party trademark" },
  { id: "docker", name: "Docker", path: "/brands/docker.svg", sourceUrl: "https://www.docker.com/company/newsroom/media-resources/", accessibleLabel: "Docker", trademarkStatus: "third-party trademark" },
];

export function providerIdFromSlug(slug: string): ProviderId {
  const candidate = slug.replace("opslin-vs-", "") as ProviderId;
  return providerIds.includes(candidate) ? candidate : "coolify";
}
