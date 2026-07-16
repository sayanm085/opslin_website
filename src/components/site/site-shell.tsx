import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/components/site/brand";
import { siteLinks } from "@/lib/site-links";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Docs", href: "/docs" },
];

const serviceLinks = [
  { label: "Deployments", href: "/services/deployments" },
  { label: "Observability", href: "/services/observability" },
  { label: "Security", href: "/services/security" },
  { label: "Databases", href: "/services/databases" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container flex h-18 items-center justify-between gap-5">
        <Brand />
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <a href={siteLinks.login} className="site-button site-button-ghost">
            Log in
          </a>
          <a href={siteLinks.register} className="site-button site-button-primary">
            Start free
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <details className="site-mobile-menu lg:hidden">
          <summary aria-label="Open navigation menu">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <div className="site-mobile-panel">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a href={siteLinks.login}>Log in</a>
            <a href={siteLinks.register} className="site-button site-button-primary">
              Start free
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <Brand inverse />
            <p className="mt-4 max-w-sm text-sm leading-6 text-text-on-inverse-muted">
              Production-ready apps on your own VPS, without stitching together every DevOps tool yourself.
            </p>
            <a
              href={`mailto:${siteLinks.contactEmail}`}
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-text-inverse hover:text-brand-bright"
            >
              <Mail className="size-4" aria-hidden="true" />
              {siteLinks.contactEmail}
            </a>
          </div>
          <FooterColumn title="Product" links={[...serviceLinks, { label: "Frameworks", href: "/frameworks" }, { label: "VPS compatibility", href: "/vps-providers" }, { label: "Pricing", href: "/pricing" }]} />
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Interactive demo", href: "/demo" },
              { label: "Documentation", href: "/docs" },
              { label: "Quick start", href: "/quick-start" },
              { label: "FAQ", href: "/faq" },
              { label: "Service status", href: "/status" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Acceptable use", href: "/acceptable-use" },
              { label: "Refund policy", href: "/refund-policy" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border-inverse pt-6 text-xs text-text-on-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Opslin. Built for teams who want infrastructure ownership.</p>
          <p>Private beta · India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-text-inverse">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-text-on-inverse-muted hover:text-text-inverse">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
