import type { Metadata } from "next";
import { PricingCards } from "@/components/site/pricing-cards";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Pricing — Opslin",
  "Transparent INR beta pricing for Opslin VPS deployment and infrastructure management.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="site-container py-16 text-center sm:py-24">
          <p className="site-kicker">Pricing</p>
          <h1 className="page-title mx-auto mt-4 max-w-4xl">A plan for the infrastructure you operate today.</h1>
          <p className="page-lead mx-auto mt-5 max-w-2xl">Four plans stay aligned in one readable row. Enterprise requirements live in a dedicated conversation, not a broken fifth card.</p>
        </div>
      </section>
      <section className="site-section site-section-tinted">
        <div className="site-container"><PricingCards /></div>
      </section>
      <section className="site-section">
        <div className="site-container grid gap-5 md:grid-cols-3">
          {[
            ["Clear tax treatment", "Paid plan totals show the monthly base price plus applicable 18% GST."],
            ["Your VPS costs stay separate", "Cloud provider, domain, and third-party costs are not included in the Opslin subscription."],
            ["Beta availability", "Paid beta capacity can open gradually while operational support and billing are validated."],
          ].map(([title, description]) => (
            <article key={title} className="detail-card"><h2>{title}</h2><p>{description}</p></article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
