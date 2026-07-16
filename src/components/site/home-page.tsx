import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  CloudCog,
  Code2,
  Database,
  GitBranch,
  Globe2,
  KeyRound,
  Radar,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/site/brand";
import { PricingCards } from "@/components/site/pricing-cards";
import { SiteShell } from "@/components/site/site-shell";
import { WorkflowSimulator } from "@/components/site/workflow-simulator";
import { siteLinks } from "@/lib/site-links";

const capabilities = [
  { title: "Push to deploy", description: "Connect Git, choose a server, and follow every deployment stage.", icon: GitBranch, className: "bento-card bento-wide" },
  { title: "Own the runtime", description: "Apps and databases stay on infrastructure you control.", icon: Server, className: "bento-card" },
  { title: "Watch it work", description: "Logs, health, metrics, and alerts remain attached to the resource that produced them.", icon: Activity, className: "bento-card" },
  { title: "Domains and SSL", description: "Coordinate routing and certificate workflows from the same dashboard.", icon: Globe2, className: "bento-card" },
  { title: "Database operations", description: "Provision and manage common database engines beside your applications.", icon: Database, className: "bento-card bento-wide" },
  { title: "Guarded access", description: "Organizations, teams, roles, and an outbound-only agent model.", icon: ShieldCheck, className: "bento-card" },
];

const process = [
  { step: "01", title: "Connect your VPS", description: "Install the lightweight agent and claim the server from Opslin.", icon: Server },
  { step: "02", title: "Choose your source", description: "Connect a repository or upload an application and select its target.", icon: Code2 },
  { step: "03", title: "Review the plan", description: "Confirm detected runtime, environment, domain, and deployment settings.", icon: Boxes },
  { step: "04", title: "Deploy and observe", description: "Follow build, rollout, SSL, and health status from one workflow.", icon: Radar },
];

const faqs = [
  ["Does Opslin host my applications?", "No. Opslin provides the control plane while your application workloads run on the VPS you connect."],
  ["Does the agent need an inbound management port?", "The agent is designed to dial out to the Opslin control plane, so a public management port is not required for the agent connection."],
  ["Is this a replacement for a DevOps engineer?", "No. Opslin automates repetitive deployment and infrastructure operations. Teams still own architecture, application quality, security decisions, and incident response."],
  ["Can I interact with the demo safely?", "Yes. The website demo is a deterministic browser simulation. It does not connect to an API, VPS, repository, or customer environment."],
  ["Is Opslin production ready?", "Opslin is in live beta. The public site describes verified platform capabilities conservatively and avoids presenting in-build workflows as shipped."],
];

export function HomePage() {
  return (
    <SiteShell>
      <section className="hero-section">
        <div className="hero-stars" aria-hidden="true">
          <Sparkles className="hero-star hero-star-one" aria-hidden="true" />
          <Sparkles className="hero-star hero-star-two" aria-hidden="true" />
          <span className="hero-orbit" />
        </div>
        <div className="site-container relative pt-16 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="site-eyebrow">
              <span className="live-pulse" aria-hidden="true" />
              Live beta · Bring your own VPS
            </div>
            <h1 className="hero-title">
              Ship production-ready apps on <span>infrastructure you own.</span>
            </h1>
            <p className="hero-copy">
              Opslin turns your Linux VPS into a managed deployment platform—with Git deploys, SSL, logs, metrics, databases, and rollback from one calm control plane.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={siteLinks.register} className="site-button site-button-primary site-button-lg">
                Start free beta
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link href="/demo" className="site-button site-button-secondary site-button-lg">
                Try interactive demo
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              {["No credit card", "Workloads stay on your VPS", "Outbound-only agent"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-brand" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-product-frame">
            <div className="hero-product-topbar">
              <Brand inverse />
              <div className="hidden items-center gap-2 sm:flex">
                <span className="demo-topbar-chip">production</span>
                <span className="demo-topbar-chip">ap-south-1</span>
              </div>
            </div>
            <WorkflowSimulator />
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Supported workflows">
        <div className="site-container flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {[GitBranch, CloudCog, TerminalSquare, Database, ShieldCheck].map((Icon, index) => (
            <div key={index} className="trust-item">
              <Icon className="size-4" aria-hidden="true" />
              {[
                "Git deploys",
                "Container workflows",
                "Live operations",
                "Managed databases",
                "Infrastructure controls",
              ][index]}
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="site-section">
        <div className="site-container">
          <SectionHeading
            kicker="One platform, full context"
            title="The operational pieces belong together."
            description="Deployments, infrastructure state, and operational tools share one clear system so teams can understand what is happening without changing context."
          />
          <div className="bento-grid mt-10 sm:mt-14">
            {capabilities.map(({ icon: Icon, ...capability }) => (
              <article key={capability.title} className={capability.className}>
                <div className="bento-icon"><Icon className="size-5" aria-hidden="true" /></div>
                <div className="bento-art" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="site-section site-section-tinted">
        <div className="site-container">
          <SectionHeading
            kicker="How Opslin works"
            title="From server connection to a verified release."
            description="A managed control plane dispatches work to a lightweight agent on your VPS. The agent dials out, performs the requested operation, and reports progress back."
          />
          <div className="process-grid mt-10 sm:mt-14">
            {process.map(({ icon: Icon, ...item }) => (
              <article key={item.step} className="process-card">
                <div className="flex items-center justify-between">
                  <span className="process-number">{item.step}</span>
                  <Icon className="size-5 text-brand" aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="architecture-card mt-6">
            <div className="architecture-copy">
              <p className="site-kicker text-brand-bright">Ownership by design</p>
              <h3>Your browser controls. Your VPS runs.</h3>
              <p>
                Opslin coordinates deployments and operations without moving your application workload into a proprietary runtime.
              </p>
            </div>
            <div className="architecture-flow" aria-label="Browser to Opslin control plane to outbound agent to your VPS">
              {[
                ["Browser", Globe2],
                ["Opslin", CloudCog],
                ["Agent", KeyRound],
                ["Your VPS", Server],
              ].map(([label, Icon], index) => {
                const FlowIcon = Icon as typeof Globe2;
                return (
                  <div key={label as string} className="architecture-node-wrap">
                    <div className="architecture-node"><FlowIcon className="size-5" aria-hidden="true" /><span>{label as string}</span></div>
                    {index < 3 ? <ArrowRight className="architecture-arrow" aria-hidden="true" /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionHeading
            kicker="Simple beta pricing"
            title="Start with one server. Expand when the workload does."
            description="Monthly base prices are shown in INR. Applicable 18% GST is stated clearly instead of appearing late in checkout."
          />
          <div className="mt-10 sm:mt-14"><PricingCards /></div>
        </div>
      </section>

      <section id="faq" className="site-section site-section-tinted">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="site-kicker">Straight answers</p>
            <h2 className="site-heading mt-3">Understand the product before connecting a server.</h2>
            <p className="site-description mt-4">Opslin is infrastructure software. The website should make boundaries as clear as benefits.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-container">
          <div className="final-cta-card">
            <Sparkles className="final-cta-star" aria-hidden="true" />
            <p className="site-kicker text-brand-bright">Your server. One calmer workflow.</p>
            <h2>Deploy the application. Keep the infrastructure.</h2>
            <p>Start with the live beta or explore the local interactive simulation first.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={siteLinks.register} className="site-button site-button-light site-button-lg">Start free beta</a>
              <Link href="/demo" className="site-button site-button-inverse site-button-lg">Open the demo</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="site-kicker">{kicker}</p>
      <h2 className="site-heading mt-3">{title}</h2>
      <p className="site-description mx-auto mt-4">{description}</p>
    </div>
  );
}
