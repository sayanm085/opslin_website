import type { Metadata } from "next";
import { ServiceOverviewCard } from "@/components/site/service-page";
import { SiteShell } from "@/components/site/site-shell";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Services — Opslin",
  "Explore Opslin deployments, observability, security, and database operations for your own VPS.",
  "/services",
);

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="site-container py-16 text-center sm:py-24">
          <p className="site-kicker">Opslin services</p>
          <h1 className="page-title mx-auto mt-4 max-w-4xl">One control plane for the work around your applications.</h1>
          <p className="page-lead mx-auto mt-5 max-w-2xl">Deploy, observe, secure, and operate services on your VPS without losing infrastructure ownership.</p>
        </div>
      </section>
      <section className="site-section site-section-tinted">
        <div className="site-container grid gap-5 md:grid-cols-2">
          {Object.entries(services).map(([slug, service]) => (
            <ServiceOverviewCard key={slug} href={`/services/${slug}`} title={service.eyebrow} description={service.description} icon={service.icon} visualKind={service.visualKind} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
