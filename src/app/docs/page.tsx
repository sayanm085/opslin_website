import type { Metadata } from "next";
import { BookOpen, Boxes, CircleHelp, CreditCard, Database, Network, Rocket, Server } from "lucide-react";
import { Notice, ResourceCard, ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = createMetadata("Documentation — Opslin", "Start with Opslin guides for servers, applications, databases, networking, troubleshooting, and billing.", "/docs");

const sections = [
  { icon: Rocket, title: "Getting started", description: "Connect a test server, verify the agent, deploy an application, and understand the resulting state.", href: "/quick-start" },
  { icon: Boxes, title: "Applications", description: "Frameworks, source settings, builds, ports, environment variables, deployments, and rollback.", href: siteLinks.docs },
  { icon: Server, title: "Servers", description: "Prerequisites, agent installation, connection status, firewall considerations, updates, and removal.", href: siteLinks.docs },
  { icon: Database, title: "Databases", description: "Supported database engines, connection details, lifecycle operations, and external connectivity.", href: siteLinks.docs },
  { icon: Network, title: "Networking", description: "Custom domains, DNS records, SSL state, reverse proxy configuration, and common failure modes.", href: siteLinks.docs },
  { icon: CircleHelp, title: "Troubleshooting", description: "Diagnose an offline agent, failed build, crashing app, port mismatch, DNS issue, or SSL delay.", href: siteLinks.docs },
  { icon: CreditCard, title: "Account and billing", description: "Plans, usage, subscription state, invoices, cancellation, teams, roles, and invitations.", href: siteLinks.docs },
];

export default function DocsGatewayPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="Documentation" title="Find the next answer without losing the system around it." description="Start with the public guide that matches your task, then move into the detailed Opslin documentation for exact setup and troubleshooting steps." aside={<><BookOpen className="size-6 text-brand" aria-hidden="true" /><p className="mt-4">This page is a documentation gateway. Detailed, versioned procedures live in the separate Opslin documentation site.</p></>} />
    <ResourceSection eyebrow="Task navigator" title="Begin with the outcome, then inspect the exact procedure." tinted><div className="docs-command-window"><header><i/><i/><i/><span>opslin docs navigator</span></header><div><code>$ choose-task --safe-first-deploy</code><p><span>01</span>Check server prerequisites</p><p><span>02</span>Generate account-specific agent setup</p><p><span>03</span>Deploy and verify a simple application</p><p><span>04</span>Review cleanup and recovery access</p><small>Illustrative navigation only · not an executable command</small></div></div></ResourceSection>
    <ResourceSection eyebrow="Browse by task" title="From first connection to ongoing operations." description="The documentation is organized around the resource and outcome you are working with.">
      <div className="resource-grid">{sections.map((section) => <ResourceCard key={section.title} {...section} />)}</div>
    </ResourceSection>
    <ResourceSection eyebrow="Public API" title="API documentation will follow a stable public contract." description="Opslin’s dashboard and agent already communicate with the control plane, but internal endpoints are not the same thing as a supported public developer API." tinted>
      <Notice title="No invented public API surface">Public API references, long-lived compatibility promises, and SDK examples will be published only after the external contract, authentication model, versioning, and support policy are ready.</Notice>
    </ResourceSection>
    <ResourceCta title="Start with one non-critical deployment." description="The quick-start guide keeps prerequisites and expected outcomes visible before you connect a production workload." primaryHref="/quick-start" primaryLabel="Open quick start" secondaryHref="/faq" secondaryLabel="Read common questions" />
  </ResourcePage>;
}
