import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/site-shell";

export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: string; children: ReactNode }) {
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
      <div className="site-container max-w-4xl py-12 sm:py-16">
        <div className="legal-content">{children}</div>
      </div>
    </SiteShell>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
