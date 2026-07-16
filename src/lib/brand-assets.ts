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
  category: "provider" | "runtime" | "database" | "workflow" | "generic";
  logoPlate: "invariant-pale" | "neutral";
};

const brand = (asset: BrandAsset) => asset;

export const providerIds: ProviderId[] = [
  "coolify", "dokploy", "caprover", "railway", "render", "heroku", "vercel", "manual-vps",
];

export const providerAssets: Record<ProviderId, BrandAsset> = {
  coolify: brand({ id: "coolify", name: "Coolify", path: "/brands/coolify.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/coolify.svg", accessibleLabel: "Coolify", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  dokploy: brand({ id: "dokploy", name: "Dokploy", monogram: "D", sourceUrl: "https://dokploy.com", accessibleLabel: "Dokploy", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  caprover: brand({ id: "caprover", name: "CapRover", path: "/brands/caprover.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/caprover.svg", accessibleLabel: "CapRover", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  railway: brand({ id: "railway", name: "Railway", path: "/brands/railway.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/railway.svg", accessibleLabel: "Railway", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  render: brand({ id: "render", name: "Render", path: "/brands/render.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/render.svg", accessibleLabel: "Render", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  heroku: brand({ id: "heroku", name: "Heroku", monogram: "H", sourceUrl: "https://www.heroku.com", accessibleLabel: "Heroku", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  vercel: brand({ id: "vercel", name: "Vercel", path: "/brands/vercel.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/vercel.svg", accessibleLabel: "Vercel", trademarkStatus: "third-party trademark", category: "provider", logoPlate: "invariant-pale" }),
  "manual-vps": brand({ id: "manual-vps", name: "Manual VPS", monogram: "VPS", sourceUrl: "", accessibleLabel: "Manual VPS operation", trademarkStatus: "generic mark", category: "generic", logoPlate: "neutral" }),
};

export const runtimeAssets: BrandAsset[] = [
  brand({ id: "node", name: "Node.js", path: "/brands/nodedotjs.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/nodedotjs.svg", accessibleLabel: "Node.js", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "python", name: "Python", path: "/brands/python.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/python.svg", accessibleLabel: "Python", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "go", name: "Go", path: "/brands/go.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/go.svg", accessibleLabel: "Go", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "php", name: "PHP", path: "/brands/php.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/php.svg", accessibleLabel: "PHP", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "ruby", name: "Ruby", path: "/brands/ruby.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/ruby.svg", accessibleLabel: "Ruby", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "java", name: "Java", path: "/brands/openjdk.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/openjdk.svg", accessibleLabel: "Java / OpenJDK", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "rust", name: "Rust", path: "/brands/rust.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/rust.svg", accessibleLabel: "Rust", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
  brand({ id: "docker", name: "Docker", path: "/brands/docker.svg", sourceUrl: "https://www.docker.com/company/newsroom/media-resources/", accessibleLabel: "Docker", trademarkStatus: "third-party trademark", category: "runtime", logoPlate: "invariant-pale" }),
];

export const databaseAssets: BrandAsset[] = [
  brand({ id: "postgresql", name: "PostgreSQL", path: "/brands/postgresql.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/postgresql.svg", accessibleLabel: "PostgreSQL", trademarkStatus: "third-party trademark", category: "database", logoPlate: "invariant-pale" }),
  brand({ id: "mysql", name: "MySQL", path: "/brands/mysql.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/mysql.svg", accessibleLabel: "MySQL", trademarkStatus: "third-party trademark", category: "database", logoPlate: "invariant-pale" }),
  brand({ id: "mongodb", name: "MongoDB", path: "/brands/mongodb.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/mongodb.svg", accessibleLabel: "MongoDB", trademarkStatus: "third-party trademark", category: "database", logoPlate: "invariant-pale" }),
  brand({ id: "redis", name: "Redis", path: "/brands/redis.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/redis.svg", accessibleLabel: "Redis", trademarkStatus: "third-party trademark", category: "database", logoPlate: "invariant-pale" }),
];

export const workflowAssets: BrandAsset[] = [
  brand({ id: "github", name: "GitHub", path: "/brands/github.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/github.svg", accessibleLabel: "GitHub", trademarkStatus: "third-party trademark", category: "workflow", logoPlate: "invariant-pale" }),
  brand({ id: "docker", name: "Docker", path: "/brands/docker.svg", sourceUrl: "https://www.docker.com/company/newsroom/media-resources/", accessibleLabel: "Docker", trademarkStatus: "third-party trademark", category: "workflow", logoPlate: "invariant-pale" }),
  brand({ id: "nginx", name: "NGINX", path: "/brands/nginx.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/nginx.svg", accessibleLabel: "NGINX", trademarkStatus: "third-party trademark", category: "workflow", logoPlate: "invariant-pale" }),
  brand({ id: "cloudflare", name: "Cloudflare", path: "/brands/cloudflare.svg", sourceUrl: "https://cdn.jsdelivr.net/npm/simple-icons@16.26.0/icons/cloudflare.svg", accessibleLabel: "Cloudflare", trademarkStatus: "third-party trademark", category: "workflow", logoPlate: "invariant-pale" }),
];

export function providerIdFromSlug(slug: string): ProviderId {
  const candidate = slug.replace("opslin-vs-", "") as ProviderId;
  return providerIds.includes(candidate) ? candidate : "coolify";
}
