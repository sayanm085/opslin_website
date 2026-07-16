import type { NextConfig } from "next";

// Landing makes zero calls to the Opslin API (confirmed: no `lib/api.ts`
// usage anywhere in this app) — connect-src only needs the optional
// analytics beacon endpoint, never Razorpay/checkout, unlike the dashboard's
// CSP. Trimmed deliberately, not copy-pasted from opslin-dashboard.
const ANALYTICS_URL = process.env.NEXT_PUBLIC_ANALYTICS_URL;

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
  "script-src-elem 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self' https://cloudflareinsights.com${ANALYTICS_URL ? ` ${ANALYTICS_URL}` : ""}`,
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return ["coolify", "dokploy", "caprover", "railway", "render", "heroku", "vercel", "manual-vps"].map((provider) => ({
      source: `/compare/opslin-vs-${provider}`,
      destination: `/compare?provider=${provider}`,
      permanent: true,
    }));
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: contentSecurityPolicy,
        },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
