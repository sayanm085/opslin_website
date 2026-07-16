import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/site/site-shell";
import { ServiceVisual } from "@/components/site/service-visual";
import type { ServiceContent } from "@/lib/marketing-content";
import { siteLinks } from "@/lib/site-links";

export function ServicePage({ content }: { content: ServiceContent }) {
  const HeroIcon = content.icon;
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="site-container grid items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <div className="site-eyebrow"><HeroIcon className="size-4" aria-hidden="true" />{content.eyebrow}</div>
            <h1 className="page-title mt-6">{content.title}</h1>
            <p className="page-lead mt-5">{content.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={siteLinks.register} className="site-button site-button-glass site-button-lg">Start free<ArrowRight className="size-4" aria-hidden="true" /></a>
              <Link href="/demo" className="site-button site-button-secondary site-button-lg">Try the demo</Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {content.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />{outcome}
                </li>
              ))}
            </ul>
          </div>
          <ServiceVisual kind={content.visualKind} />
        </div>
      </section>

      <section className="site-section site-section-tinted">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="site-kicker">The workflow</p>
            <h2 className="site-heading mt-3">Clear stages, visible outcomes.</h2>
          </div>
          <div className="process-grid mt-12">
            {content.workflow.map((step, index) => (
              <article key={step.title} className="process-card">
                <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="detail-grid">
            {content.details.map(({ icon: Icon, ...detail }) => (
              <article key={detail.title} className="detail-card">
                <div className="bento-icon"><Icon className="size-5" aria-hidden="true" /></div>
                <h2>{detail.title}</h2>
                <p>{detail.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="site-button site-button-secondary">Explore every service<ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export function ServiceOverviewCard({ href, title, description, icon: Icon, visualKind }: { href: string; title: string; description: string; icon: LucideIcon; visualKind: ServiceContent["visualKind"] }) {
  return (
    <Link href={href} className="service-overview-card">
      <div className="flex items-center justify-between"><div className="bento-icon"><Icon className="size-5" aria-hidden="true" /></div><span className="site-badge">Interactive story</span></div>
      <ServiceVisual kind={visualKind} compact />
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Explore {title}<ArrowRight className="size-4" aria-hidden="true" /></span>
    </Link>
  );
}
