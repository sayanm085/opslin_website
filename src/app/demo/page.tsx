import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { WorkflowSimulator } from "@/components/site/workflow-simulator";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Interactive Deployment Demo — Opslin",
  "Interact with a safe local simulation of an Opslin VPS deployment workflow.",
  "/demo",
);

export default function DemoPage() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="site-container py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="site-kicker">Interactive product simulation</p>
            <h1 className="page-title mt-4">Follow a deployment from source to healthy release.</h1>
            <p className="page-lead mt-5">Click any stage, pause the workflow, or replay it. This demo is deliberately local and does not touch a real server.</p>
          </div>
          <div className="mx-auto mt-10 max-w-6xl"><WorkflowSimulator /></div>
          <div className="demo-disclosure mx-auto mt-6 max-w-4xl">
            <Info className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <p><strong>Simulation only.</strong> No API request, repository connection, agent command, or infrastructure change occurs on this page.</p>
          </div>
        </div>
      </section>
      <section className="site-section site-section-tinted">
        <div className="site-container grid gap-5 md:grid-cols-3">
          {["Every stage remains selectable by keyboard", "Progress is announced to assistive technology", "Reduced-motion users receive an instant final state"].map((item) => (
            <div key={item} className="detail-card flex items-start gap-3"><Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" /><p className="mt-0">{item}</p></div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
