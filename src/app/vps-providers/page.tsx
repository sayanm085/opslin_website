import type { Metadata } from "next";
import { CircleDot, Cpu, HardDrive, Network, Server, ShieldCheck } from "lucide-react";
import { Notice, ResourceCard, ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";
import { VpsReadiness } from "@/components/site/interactive-labs";

export const metadata: Metadata = createMetadata("VPS Compatibility — Opslin", "Understand the Linux VPS, networking, access, and resource requirements for connecting a server to Opslin.", "/vps-providers");

export default function VpsProvidersPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="VPS compatibility" title="Provider-neutral by design. Requirements-first by necessity." description="Opslin is built for compatible Linux VPS and cloud virtual machines with a public IP, suitable permissions, networking access, and enough resources for the applications you intend to run." aside={<><span className="site-badge">No provider partnership implied</span><p className="mt-4">Choose and pay your infrastructure provider separately. Opslin does not include the VPS in its plan price.</p></>} />
    <ResourceSection eyebrow="Readiness explorer" title="Inspect the server boundary before installation." description="Use the interactive preflight to understand the required layers. It is educational, not a real server scan."><VpsReadiness /></ResourceSection>
    <ResourceSection eyebrow="Compatibility checklist" title="What a server needs before you connect it." description="Exact sizing depends on your workloads. Validate these fundamentals before using a server for production.">
      <div className="resource-grid">
        <ResourceCard icon={Server} title="Linux environment" description="A supported, maintained Linux server environment suitable for the agent and Docker-based workloads." />
        <ResourceCard icon={Network} title="Reachable networking" description="A public IP and firewall rules that allow your applications, domains, and required outbound connections to work." />
        <ResourceCard icon={ShieldCheck} title="Administrative setup" description="Authorized administrative access is required to install and operate the server agent and supporting services." />
        <ResourceCard icon={Cpu} title="Workload-sized CPU and memory" description="Capacity must cover the operating system, agent, builds, application containers, and any co-located services." />
        <ResourceCard icon={HardDrive} title="Durable storage" description="Choose storage capacity and performance for releases, container images, logs, databases, and growth." />
        <ResourceCard icon={CircleDot} title="A clean operational boundary" description="Use infrastructure you own or are explicitly authorized to administer, with provider recovery access retained." />
      </div>
    </ResourceSection>
    <ResourceSection eyebrow="Provider status" title="We do not label unvalidated providers as tested." description="The current public page focuses on technical criteria because provider-specific test evidence and maintained compatibility labels are not yet published." tinted>
      <Notice title="Why there is no logo wall">Cloud and VPS brand logos can imply partnerships or tested support. Opslin will publish provider-specific labels only after the installation, networking, firewall, and ongoing-agent workflow have been validated and can be maintained.</Notice>
      <dl className="compatibility-table mt-6">
        <div className="compatibility-row"><dt>Expected compatible</dt><dd>Standard Linux VPS or cloud VM meeting the documented prerequisites. This is a compatibility expectation, not a completed provider certification.</dd></div>
        <div className="compatibility-row"><dt>Not suitable</dt><dd>Shared hosting without administrative access, unsupported operating systems, restricted networking, or infrastructure you are not authorized to manage.</dd></div>
        <div className="compatibility-row"><dt>Before production</dt><dd>Test agent reconnection, deploy and rollback behavior, DNS, SSL, provider recovery access, resource limits, and your backup strategy.</dd></div>
      </dl>
    </ResourceSection>
    <ResourceCta title="Validate with a test VPS first." description="Use a non-critical server to verify connectivity and workload requirements before moving a production application." primaryHref={siteLinks.register} primaryLabel="Open Opslin" secondaryHref="/quick-start" secondaryLabel="View prerequisites" />
  </ResourcePage>;
}
