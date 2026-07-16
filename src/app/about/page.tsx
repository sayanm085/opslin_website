import type { Metadata } from "next";
import { Compass, Server, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "About — Opslin",
  "Why Opslin is building a calmer control plane for teams running applications on their own VPS.",
  "/about",
);

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="site-container py-16 sm:py-24">
          <p className="site-kicker">About Opslin</p>
          <h1 className="page-title mt-4 max-w-4xl">Infrastructure ownership should not require a dashboard full of disconnected tools.</h1>
          <p className="page-lead mt-6 max-w-2xl">Opslin is a bootstrapped SaaS platform from India, built to automate repetitive deployment and server operations without pretending infrastructure stops requiring judgment.</p>
        </div>
      </section>
      <section className="site-section site-section-tinted">
        <div className="site-container grid gap-5 md:grid-cols-3">
          {[
            [Compass, "Clarity over theatre", "Show the workflow, the state, and the limits in language operators can trust."],
            [Server, "Ownership over lock-in", "Keep application workloads on infrastructure selected and controlled by the customer."],
            [ShieldCheck, "Automation with boundaries", "Automate repetitive operations while keeping security and architecture decisions explicit."],
          ].map(([Icon, title, description]) => {
            const ValueIcon = Icon as typeof Compass;
            return <article key={title as string} className="detail-card"><div className="bento-icon"><ValueIcon className="size-5" aria-hidden="true" /></div><h2>{title as string}</h2><p>{description as string}</p></article>;
          })}
        </div>
      </section>
      <section className="site-section">
        <div className="site-container max-w-4xl">
          <div className="founder-card">
            <p className="site-kicker">Founder-led</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Built closely with the operational reality of early customers.</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">Opslin is founded by Sayan Mondal and remains bootstrapped. Product claims on this website are intentionally checked against the working platform, with in-build capabilities kept separate from shipped workflows.</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
