import type { Metadata } from "next";
import { Activity, CircleDashed, ExternalLink } from "lucide-react";
import { Notice, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Service Status — Opslin",
  description: "Current publication state for Opslin service-status telemetry.",
  alternates: { canonical: "/status" },
  robots: { index: false, follow: true },
};

const components = ["Dashboard", "API and control plane", "Agent communication", "Deployment service", "Domains and SSL", "Billing", "Database provisioning"];

export default function StatusPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="Service status" title="Public status telemetry is not connected yet." description="This page does not invent uptime, component health, incident history, or maintenance data. Authenticated resource state remains available in the Opslin dashboard." aside={<><Activity className="size-6 text-brand" aria-hidden="true" /><p className="mt-4">A production status page needs measured service checks, incident operations, historical retention, and a reliable update channel.</p></>} />
    <ResourceSection eyebrow="Component visibility" title="The public board is waiting for a trustworthy data source." description="Until telemetry is connected, every public component is labelled unavailable rather than operational.">
      <div className="status-board">
        <div className="status-board-header"><div><h3 className="font-semibold">Opslin public components</h3><p className="mt-1 text-sm text-muted-foreground">No live status feed attached</p></div><span className="status-unavailable"><CircleDashed className="size-3.5" aria-hidden="true" />Telemetry unavailable</span></div>
        {components.map((component) => <div key={component} className="status-board-row"><span className="font-medium">{component}</span><span className="status-unavailable">Not publicly measured</span></div>)}
      </div>
      <div className="resource-grid-two mt-6">
        <Notice title="Need resource-specific state?">Open the authenticated dashboard to review the servers, agents, deployments, domains, databases, and billing state available to your account.</Notice>
        <Notice title="Experiencing a problem?">Contact support with the affected resource, timestamp, observed behavior, and relevant request or deployment identifier. Do not include secrets.</Notice>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={siteLinks.dashboard} className="site-button site-button-primary">Open dashboard<ExternalLink className="size-4" aria-hidden="true" /></a><a href={`mailto:${siteLinks.contactEmail}`} className="site-button site-button-secondary">Contact support</a></div>
    </ResourceSection>
  </ResourcePage>;
}
