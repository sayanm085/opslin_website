# Opslin Website

The public marketing/SaaS website for Opslin — home page, pricing, product info, docs links, and legal pages (privacy, terms). Deployed independently from the product itself.

This is one of four Opslin projects; the others (customer dashboard, admin console, API) live in a separate private repo and are not part of this codebase. This site makes no calls to the Opslin API — it's a static/marketing surface with its own independent deploy.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion · GSAP

## Getting started

```bash
npm install
cp .env.example .env.local   # adjust URLs for your environment
npm run dev                  # http://localhost:3001
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 3001 |
| `npm run build` | Production build |
| `npm run start` | Run the production build (port 3001) |
| `npm run lint` | ESLint |

## Environment variables

See `.env.example`. All variables are public (`NEXT_PUBLIC_*`) — this site has no server-side secrets. They control where the site's own CTAs/links point (the app dashboard, the admin console, the docs site) and where it reports itself to be (for metadata/sitemap).

## Deployment

Deployed on Vercel. Set the environment variables above in the Vercel project settings to the real production URLs before deploying.

## Structure

- `src/app/` — pages (home, privacy, terms) + `robots.ts`/`sitemap.ts`/`opengraph-image.tsx`
- `src/components/landing/` — page sections (hero, pricing, FAQ, etc.)
- `src/components/ui/` — shared UI primitives
- `src/styles/tokens.css` + `src/app/globals.css` — design tokens (shared visual language with the rest of Opslin, duplicated here rather than imported from a shared package)
