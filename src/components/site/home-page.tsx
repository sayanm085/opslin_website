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
  Network,
  Radar,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";
import { CapabilityLedger } from "@/components/site/capability-ledger";
import { CapabilityVisual, type CapabilityVisualKind } from "@/components/site/capability-visuals";
import { OperationsLab } from "@/components/site/operations-lab";
import { OwnedInfrastructureStory } from "@/components/site/owned-infrastructure-story";
import { PricingCards } from "@/components/site/pricing-cards";
import { SiteShell } from "@/components/site/site-shell";
import { WorkflowSimulator } from "@/components/site/workflow-simulator";
import { siteLinks } from "@/lib/site-links";
import { publicCapabilityLedger } from "@/lib/capability-ledger";

const capabilities: Array<{
  title: string;
  description: string;
  icon: typeof GitBranch;
  kind: CapabilityVisualKind;
  className: string;
}> = [
  { title: "Push to deploy", description: "Connect Git or upload source, choose a compatible server, and follow the normal deployment lifecycle.", icon: GitBranch, kind: "deploy", className: "bento-card bento-wide" },
  { title: "Own the runtime", description: "Applications and supported databases run on the Linux VPS you select and remain your infrastructure responsibility.", icon: Server, kind: "runtime", className: "bento-card" },
  { title: "Operate with context", description: "Review health, infrastructure metrics, logs, and configured alerts beside the resource that produced them.", icon: Activity, kind: "observability", className: "bento-card" },
  { title: "Domains and SSL", description: "Coordinate supported DNS, reverse-proxy, and certificate workflows while retaining ownership of the domain.", icon: Globe2, kind: "domain", className: "bento-card" },
  { title: "Database operations", description: "Provision PostgreSQL, MySQL, MongoDB, or Redis on an eligible connected server and keep operational context nearby.", icon: Database, kind: "database", className: "bento-card bento-wide" },
  { title: "Guarded access", description: "Organization roles, API authorization, and authenticated agent work create explicit operational boundaries.", icon: ShieldCheck, kind: "access", className: "bento-card" },
];

const fragmentedTools = [
  ["Repository", GitBranch],
  ["SSH terminal", TerminalSquare],
  ["DNS", Globe2],
  ["Certificates", ShieldCheck],
  ["Logs", Code2],
  ["Metrics", Activity],
  ["Database", Database],
  ["Server", Server],
];

const homepageCapabilityIds = new Set([
  "application-deployments",
  "metrics-and-logs",
  "database-provisioning",
  "backup-and-restore",
  "yantrix-production-stack",
  "advanced-multi-server",
]);

const homepageCapabilities = publicCapabilityLedger.filter((capability) => homepageCapabilityIds.has(capability.id));

const faqs = [
  ["Does Opslin host my applications?", "No. Opslin operates a managed control plane while your application workloads run on the compatible VPS you connect."],
  ["Does the agent need an inbound management port?", "The agent initiates its persistent connection from the VPS. A public agent-management port is not required for that connection."],
  ["Does Opslin replace a DevOps engineer?", "No. Opslin reduces repetitive deployment and server work. Teams still own architecture, application quality, capacity, security decisions, backups, and incident response."],
  ["Are the interface examples connected to real servers?", "No. Website interactions are deterministic browser simulations labelled as examples. They do not contact an API, repository, VPS, or customer environment."],
  ["What is not generally available?", "Yantrix remains in development. Backups, CSF, and FIS are gated validation surfaces. Advanced multi-server operations, managed persistent volumes, and RabbitMQ are not currently supported."],
  ["Is Opslin production proven?", "Opslin is a live beta with limited operating history. The website separates available beta features from gated validation, development, planned, and unsupported capabilities."],
];

export function HomePage() {
  return (
    <SiteShell>
      <section className="hero-section">
        <div className="hero-stars" aria-hidden="true"><Sparkles className="hero-star hero-star-one" /><Sparkles className="hero-star hero-star-two" /><span className="hero-orbit" /></div>
        <div className="site-container relative py-14 sm:py-20 lg:py-24">
          <div className="hero-layout">
            <div className="hero-copy-column">
              <div className="site-eyebrow"><span className="live-pulse" aria-hidden="true" />Live beta · Customer-controlled VPS</div>
              <h1 className="hero-title">Your server. <span>One calm control plane.</span></h1>
              <p className="hero-copy">
                Opslin coordinates application deployments and common infrastructure operations through an outbound Go agent—while the runtime stays on a compatible Linux VPS you control.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={siteLinks.register} className="site-button site-button-primary site-button-lg">Start free beta<ArrowRight className="size-4" aria-hidden="true" /></a>
                <Link href="/demo" className="site-button site-button-secondary site-button-lg">Try the interactive example</Link>
              </div>
              <div className="hero-trust-list">
                {["No credit card", "Workloads run on your VPS", "Outbound agent connection"].map((item) => <span key={item}><Check className="size-3.5" aria-hidden="true" />{item}</span>)}
              </div>
              <p className="hero-beta-note"><ShieldCheck className="size-4" aria-hidden="true" />Opslin automates repetitive operations. It does not replace architecture, security, capacity planning, backups, or incident response.</p>
            </div>

            <div className="hero-command-center">
              <div className="hero-command-chrome">
                <div className="flex gap-1.5" aria-hidden="true"><span /><span /><span /></div>
                <p>Interactive deployment example</p>
                <div className="hero-command-status"><span />Local simulation</div>
              </div>
              <WorkflowSimulator />
              <div className="hero-signal-caption">
                <span><CloudCog className="size-4" />Opslin coordinates</span>
                <ArrowRight className="size-3.5" />
                <span><ShieldCheck className="size-4" />Agent carries work</span>
                <ArrowRight className="size-3.5" />
                <span><Server className="size-4" />Your VPS runs it</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Current product scope">
        <div className="site-container trust-strip-inner">
          <p><strong>One operating boundary, stated clearly.</strong> Available beta features, gated work, and current limits are separated throughout the site.</p>
          <div><span>Normal deployments</span><span>Outbound Go agent</span><span>Provider-neutral VPS</span><span>Transparent beta limits</span></div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="problem-grid">
            <div>
              <p className="site-kicker">Why this matters</p>
              <h2 className="site-heading mt-3">A deployment is rarely just a deploy command.</h2>
              <p className="site-description mt-4">Source, server access, routing, certificates, logs, metrics, and data each live in a different operational context. Opslin is designed to bring supported workflows into one understandable system.</p>
              <div className="mt-7 flex flex-wrap gap-2"><span className="site-badge">Less tool switching</span><span className="site-badge">Clearer responsibility</span><span className="site-badge">Recorded operational state</span></div>
            </div>
            <div className="fragmented-tools" aria-label="Examples of fragmented infrastructure tools">
              {fragmentedTools.map(([label, Icon], index) => {
                const ToolIcon = Icon as typeof GitBranch;
                return <div key={label as string} className={`fragmented-tool fragmented-tool-${index + 1}`}><ToolIcon className="size-4" /><span>{label as string}</span></div>;
              })}
              <div className="fragmented-core"><Network className="size-6" /><strong>One operational context</strong><small>Supported Opslin workflows</small></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="site-section site-section-tinted">
        <div className="site-container">
          <SectionHeading kicker="Product, not placeholders" title="Every capability should show what a user can actually understand and control." description="These code-native product scenes are illustrative examples. They explain the workflow without pretending to be live customer data." align="left" />
          <div className="bento-grid mt-10 sm:mt-14">
            {capabilities.map(({ icon: Icon, kind, ...capability }) => (
              <article key={capability.title} className={capability.className}>
                <div className="flex items-center justify-between gap-3"><div className="bento-icon"><Icon className="size-5" aria-hidden="true" /></div><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Illustrative interface</span></div>
                <CapabilityVisual kind={kind} />
                <h3>{capability.title}</h3><p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <OwnedInfrastructureStory />

      <section className="site-section">
        <div className="site-container">
          <SectionHeading kicker="After the release" title="Deployment is the start of the operational story." description="Switch between health, logs, domains, and database examples to understand how Opslin keeps supported operational context attached to the application." align="left" />
          <div className="mt-10 sm:mt-14"><OperationsLab /></div>
        </div>
      </section>

      <section className="site-section site-section-tinted">
        <div className="site-container">
          <div className="ownership-grid">
            <div className="ownership-copy">
              <p className="site-kicker">Architecture and responsibility</p>
              <h2 className="site-heading mt-3">Control plane on one side. Customer runtime on the other.</h2>
              <p className="site-description mt-4">Opslin manages the dashboard, API, orchestration, and agent channel. You remain responsible for the VPS provider, infrastructure bill, capacity, application code, data protection, and decisions outside the released Opslin scope.</p>
              <Link href="/how-it-works" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">Study the architecture<ArrowRight className="size-4" /></Link>
            </div>
            <div className="ownership-zones">
              <div className="ownership-zone ownership-zone-opslin"><span className="site-kicker text-brand-bright">Opslin managed</span><h3>Control plane</h3><ul><li><CloudCog />Dashboard and API</li><li><KeyRound />Authenticated work channel</li><li><Radar />Recorded operational context</li></ul></div>
              <div className="ownership-zone"><span className="site-kicker">Customer controlled</span><h3>Your VPS</h3><ul><li><ShieldCheck />Outbound Go agent</li><li><Boxes />Applications and containers</li><li><Database />Supported databases and data</li></ul></div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="compatibility-band">
            <div><p className="site-kicker text-brand-bright">Supported runtime targets</p><h2>Bring the application. Validate the environment.</h2><p>Support describes runtime targets, not a guarantee for every framework version, package, operating system, architecture, or server configuration.</p></div>
            <div className="runtime-cloud">{["Node.js", "Python", "Go", "PHP", "Ruby", "Java", "Rust", "Static"].map((runtime) => <span key={runtime}>{runtime}</span>)}</div>
            <Link href="/frameworks" className="site-button site-button-light">Review compatibility<ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="site-section site-section-tinted">
        <div className="site-container">
          <SectionHeading kicker="Choose by operating model" title="No platform is the right answer for every workload." description="Opslin should be compared by responsibility, control, maturity, and current requirements—not by a universal winner score." />
          <div className="operating-model-grid mt-10 sm:mt-14">
            <article><span>Managed cloud</span><h3>Provider operates the runtime</h3><p>Strong when the team wants managed compute, scaling, storage, and platform services without administering a VPS.</p></article>
            <article><span>Self-hosted control plane</span><h3>You operate the platform too</h3><p>Strong when open-source control-plane ownership is a firm requirement and the team can operate it.</p></article>
            <article><span>Manual VPS</span><h3>Maximum bespoke control</h3><p>Strong when experienced operators already have reliable automation, monitoring, backup, hardening, and incident processes.</p></article>
            <article className="is-opslin"><span>Opslin model</span><h3>Managed control plane + your VPS</h3><p>Consider it when provider-neutral infrastructure ownership and Opslin’s released agent workflows match the required scope.</p></article>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Detailed, dated comparisons with Coolify, Dokploy, CapRover, Railway, Render, Heroku, Vercel, and manual VPS operation are the next implementation phase.</p>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <CapabilityLedger
            capabilities={homepageCapabilities}
            heading="See what is available, gated, in development, and unsupported."
            description="This homepage shows a representative capability ledger. The full product-truth surface will remain the source for every service and comparison page."
          />
        </div>
      </section>

      <section className="site-section site-section-tinted">
        <div className="site-container">
          <SectionHeading kicker="Beta pricing" title="Start with one server. Expand only when the workload needs it." description="Monthly base prices are shown in INR. Applicable 18% GST is stated clearly instead of appearing late in checkout." />
          <div className="mt-10 sm:mt-14"><PricingCards /></div>
        </div>
      </section>

      <section id="faq" className="site-section">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="site-kicker">Straight answers</p><h2 className="site-heading mt-3">Trust starts with visible boundaries.</h2><p className="site-description mt-4">Understand what Opslin operates, what remains yours, and which product surfaces are still being validated.</p></div>
          <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="site-container"><div className="final-cta-card"><Sparkles className="final-cta-star" aria-hidden="true" /><p className="site-kicker text-brand-bright">Your server. One calmer workflow.</p><h2>Deploy with context. Keep the infrastructure.</h2><p>Start with the live beta or explore the labelled browser simulation before connecting a server.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><a href={siteLinks.register} className="site-button site-button-light site-button-lg">Start free beta</a><Link href="/demo" className="site-button site-button-inverse site-button-lg">Open the interactive example</Link></div></div></div>
      </section>
    </SiteShell>
  );
}

function SectionHeading({ kicker, title, description, align = "center" }: { kicker: string; title: string; description: string; align?: "center" | "left" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}><p className="site-kicker">{kicker}</p><h2 className="site-heading mt-3">{title}</h2><p className={`site-description mt-4 ${align === "center" ? "mx-auto" : ""}`}>{description}</p></div>;
}
