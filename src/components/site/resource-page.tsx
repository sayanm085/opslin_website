import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { RevealGroup, RevealItem } from "@/components/site/scroll-reveal";

export function ResourcePage({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}

export function ResourceHero({ eyebrow, title, description, aside }: { eyebrow: string; title: string; description: string; aside?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="site-container grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <p className="site-kicker">{eyebrow}</p>
          <h1 className="page-title mt-4 max-w-5xl">{title}</h1>
          <p className="page-lead mt-6 max-w-3xl">{description}</p>
        </div>
        {aside ? <aside className="resource-hero-aside">{aside}</aside> : null}
      </div>
    </section>
  );
}

export function ResourceSection({ eyebrow, title, description, children, tinted = false }: { eyebrow?: string; title: string; description?: string; children: ReactNode; tinted?: boolean }) {
  return (
    <section className={`site-section${tinted ? " site-section-tinted" : ""}`}>
      <div className="site-container">
        <RevealGroup><RevealItem className="max-w-3xl">
          {eyebrow ? <p className="site-kicker">{eyebrow}</p> : null}
          <h2 className="site-heading mt-3">{title}</h2>
          {description ? <p className="site-description mt-4">{description}</p> : null}
        </RevealItem>
        <RevealItem className="mt-10">{children}</RevealItem></RevealGroup>
      </div>
    </section>
  );
}

export function ResourceCard({ icon: Icon, title, description, children, href }: { icon: LucideIcon; title: string; description: string; children?: ReactNode; href?: string }) {
  const content = (
    <>
      <div className="bento-icon"><Icon className="size-5" aria-hidden="true" /></div>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
      {href ? <span className="resource-card-link">Explore <ArrowUpRight className="size-4" aria-hidden="true" /></span> : null}
    </>
  );

  return href ? <Link href={href} className="resource-card resource-card-interactive">{content}</Link> : <article className="resource-card">{content}</article>;
}

export function StepCard({ number, title, description, children }: { number: string; title: string; description: string; children?: ReactNode }) {
  return (
    <article className="resource-step-card">
      <span className="resource-step-number">{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </article>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="resource-check-list">
      {items.map((item) => <li key={item}><Check className="size-4" aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  );
}

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="resource-notice"><strong>{title}</strong><div>{children}</div></aside>;
}

export function ResourceCta({ title, description, primaryHref, primaryLabel, secondaryHref, secondaryLabel }: { title: string; description: string; primaryHref: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string }) {
  return (
    <section className="final-cta-section">
      <div className="site-container">
        <div className="final-cta-card">
          <p className="site-kicker">Your infrastructure. One clear workflow.</p>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={primaryHref} className="site-button site-button-light site-button-lg">{primaryLabel}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
            {secondaryHref && secondaryLabel ? <Link href={secondaryHref} className="site-button site-button-inverse site-button-lg">{secondaryLabel}</Link> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
