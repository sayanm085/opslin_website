import { Children, isValidElement, type ReactNode } from "react";
import { SiteShell } from "@/components/site/site-shell";

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: string; children: ReactNode }) {
  const sections = Children.toArray(children).flatMap((child) => isValidElement<{ title?: string }>(child) && child.props.title ? [child.props.title] : []);
  return (
    <SiteShell>
      <section className="legal-hero">
        <div className="site-container max-w-4xl py-16 sm:py-24">
          <p className="site-kicker">Legal</p>
          <h1 className="page-title mt-4">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
          <p className="page-lead mt-6">{intro}</p>
        </div>
      </section>
      <div className="site-container legal-layout py-12 sm:py-16">
        <aside className="legal-toc"><strong>On this page</strong>{sections.map((section) => <a key={section} href={`#${slugify(section)}`}>{section}</a>)}</aside>
        <div className="legal-content">{children}</div>
      </div>
    </SiteShell>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id={slugify(title)}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
