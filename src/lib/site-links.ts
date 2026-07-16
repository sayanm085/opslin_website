const landingUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opslin.shotlin.in";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://appopslin.shotlin.in";
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://adminopslin.shotlin.in";
const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docopslin.shotlin.in";

export const siteLinks = {
  landing: landingUrl,
  dashboard: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? appUrl,
  app: appUrl,
  admin: adminUrl,
  api: process.env.NEXT_PUBLIC_API_URL ?? "https://apiopslin.shotlin.in",
  docs: `${docsUrl}/docs`,
  login: `${appUrl}/login`,
  register: `${appUrl}/register`,
  contactEmail: "hello@shotlin.in",
};
