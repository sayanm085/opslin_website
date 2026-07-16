import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { WorkflowSimulator } from "@/components/site/workflow-simulator";
import { WorkflowJourney, type JourneyStep } from "@/components/site/workflow-journey";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = createMetadata("How Opslin Works — Deploy to Your Own VPS", "Follow the Opslin workflow from connecting a Linux VPS to deploying, securing, and operating an application.", "/how-it-works");

const steps = [
  {
    icon: "server",
    visual: "controlPlane",
    title: "Connect your server",
    description: "Add a compatible Linux VPS you control, then use the dashboard-generated installation flow to connect the outbound Opslin agent.",
    items: ["Public IP and supported Linux environment", "Administrative permission for setup", "Connection health visible in the dashboard"],
    state: {
      label: "Agent channel ready",
      nodes: ["Your VPS", "Outbound agent", "Control plane"],
      lines: ["VPS initiates the connection", "Authenticated work channel becomes available"],
    },
  },
  {
    icon: "source",
    visual: "deployment",
    title: "Add your application",
    description: "Choose a source, branch, target server, runtime settings, application port, and environment variables.",
    items: ["Git repository or supported upload flow", "Build and start settings", "Scoped environment configuration"],
    state: {
      label: "Source configured",
      nodes: ["Repository", "Runtime settings", "Target VPS"],
      lines: ["Source and branch selected", "Runtime configuration scoped to the application"],
    },
  },
  {
    icon: "deploy",
    visual: "deployment",
    title: "Build and deploy",
    description: "Opslin coordinates the deployment while the connected agent performs the work on your VPS and returns progress.",
    items: ["Visible deployment stages", "Streaming build and release logs", "Retry and redeploy controls"],
    state: {
      label: "Release in progress",
      nodes: ["Build", "Release", "Health check"],
      lines: ["Agent performs the selected deployment work", "Progress and result return to the control plane"],
    },
  },
  {
    icon: "domain",
    visual: "security",
    title: "Configure access",
    description: "Attach a custom domain, review the required DNS record, and let the platform coordinate the supported SSL workflow.",
    items: ["Custom domain management", "DNS guidance", "Automatic SSL workflow"],
    state: {
      label: "Domain workflow ready",
      nodes: ["DNS record", "Reverse proxy", "TLS certificate"],
      lines: ["Required DNS target is shown", "Supported SSL workflow is coordinated on the VPS"],
    },
  },
  {
    icon: "observe",
    visual: "observability",
    title: "Operate in context",
    description: "Review health, metrics, logs, alerts, and deployment history without losing the relationship between app and server.",
    items: ["Application and server health", "Logs and terminal access", "Restart and environment operations"],
    state: {
      label: "Operational context visible",
      nodes: ["Health", "Logs", "Metrics"],
      lines: ["Application and server signals stay related", "Deployment history remains available for review"],
    },
  },
  {
    icon: "control",
    visual: "workflow",
    title: "Keep control",
    description: "Your workloads remain on infrastructure you choose. Opslin is the managed control plane around that infrastructure.",
    items: ["Bring your own VPS", "Outbound agent connection", "Clear operational history"],
    state: {
      label: "Infrastructure boundary retained",
      nodes: ["Managed control plane", "Outbound channel", "Your runtime"],
      lines: ["Workload remains on customer-controlled infrastructure", "Opslin retains the operational thread around it"],
    },
  },
] satisfies JourneyStep[];

export default function HowItWorksPage() {
  return (
    <ResourcePage>
      <ResourceHero eyebrow="How it works" title="A clear path from an empty VPS to a running application." description="Opslin brings the recurring deployment and server operations into one guided workflow while keeping your application on infrastructure you own." aside={<><strong className="text-foreground">The operating model</strong><p className="mt-2">Dashboard → control plane → signed work → outbound agent → your VPS. Results and status flow back into the dashboard.</p></>} />
      <ResourceSection eyebrow="The workflow" title="Six understandable stages. One operational thread." description="Each step keeps the target server, application, deployment, and resulting state connected.">
        <WorkflowJourney steps={steps} />
      </ResourceSection>
      <ResourceSection eyebrow="Interactive walkthrough" title="See a deployment progress through the control plane." description="This local simulation mirrors the shape of the workflow. It does not connect to a server or perform a real deployment." tinted>
        <WorkflowSimulator />
      </ResourceSection>
      <section className="site-section">
        <div className="site-container">
          <div className="architecture-card">
            <div className="architecture-copy"><p className="site-kicker">Architecture boundary</p><h3>Your server stays yours.</h3><p>The browser uses Opslin’s managed control plane. The lightweight agent initiates its connection from your VPS, performs scoped work there, and reports the outcome.</p></div>
            <div className="architecture-flow" aria-label="Opslin architecture flow">
              {["Dashboard", "Control plane", "Outbound agent", "Your VPS"].map((item, index, all) => <div key={item} className="architecture-node-wrap"><span className="architecture-node">{item}</span>{index < all.length - 1 ? <ArrowDown className="architecture-arrow" aria-hidden="true" /> : null}</div>)}
            </div>
          </div>
        </div>
      </section>
      <ResourceCta title="Walk through the real product next." description="Use the interactive demo first, or create an account when you are ready to connect infrastructure you control." primaryHref={siteLinks.register} primaryLabel="Start free" secondaryHref="/demo" secondaryLabel="Open interactive demo" />
    </ResourcePage>
  );
}
