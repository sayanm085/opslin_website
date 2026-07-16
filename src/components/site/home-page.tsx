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
import { Brand } from "@/components/site/brand";
import { BrandMark } from "@/components/site/brand-mark";
import { CapabilityLedger } from "@/components/site/capability-ledger";
import { CapabilityVisual, type CapabilityVisualKind } from "@/components/site/capability-visuals";
import { OperationsLab } from "@/components/site/operations-lab";
import { EvergreenStage } from "@/components/site/evergreen-stage";
import { OwnedInfrastructureStory } from "@/components/site/owned-infrastructure-story";
import { PricingCards } from "@/components/site/pricing-cards";
import { ProviderComparison } from "@/components/site/provider-comparison";
import { SiteShell } from "@/components/site/site-shell";
import { WorkflowSimulator } from "@/components/site/workflow-simulator";
import { siteLinks } from "@/lib/site-links";
import { runtimeAssets } from "@/lib/brand-assets";
import { visualAssets } from "@/lib/visual-assets";
import { publicCapabilityLedger } from "@/lib/capability-ledger";
import { comparisons } from "@/lib/comparisons";

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

const homepageComparisons = comparisons.map((comparison) => ({
  slug: comparison.slug,
  provider: comparison.provider,
  category: comparison.category,
  directAnswer: comparison.directAnswer,
  reviewedAt: comparison.reviewedAt,
  dimensions: comparison.dimensions,
  opslinFit: comparison.opslinFit,
  alternativeFit: comparison.alternativeFit,
  opslinLimitations: comparison.opslinLimitations,
}));

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
        <div className="hero-stars" aria-hidden="true">
          <Sparkles className="hero-star hero-star-one" />
          <Sparkles className="hero-star hero-star-two" />
          <span className="hero-orbit" />
        </div>
        <div className="site-container relative pt-16 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="site-eyebrow">
              <span className="live-pulse" aria-hidden="true" />
              Live beta · Bring your own VPS
            </div>
            <h1 className="hero-title">
              Deploy applications on <span>infrastructure you control.</span>
            </h1>
            <p className="hero-copy">
              Opslin coordinates Git or source-upload deployments, supported routing and SSL, logs, metrics, databases, and rollback through a managed control plane while workloads run on your compatible Linux VPS.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={siteLinks.register} className="site-button site-button-glass site-button-lg">
                Start free beta
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link href="/demo" className="site-button site-button-secondary site-button-lg">
                Try interactive demo
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              {["No credit card", "Workloads run on your VPS", "Outbound agent connection"].map((item) => (
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
              <div className="flex items-center gap-2">
                <span className="demo-topbar-chip hidden sm:inline-flex">Interactive example</span>
                <span className="demo-topbar-chip">Local simulation</span>
              </div>
            </div>
            <WorkflowSimulator />
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container visual-split">
          <div className="visual-copy"><p className="site-kicker">The operating boundary</p><h2>A managed control plane. An outbound path. Your server.</h2><p>Opslin coordinates supported work without moving your application runtime onto Opslin-owned compute. The agent initiates its connection from the compatible VPS you control.</p><ul className="visual-checks"><li><Check />Dashboard and API remain in Opslin’s managed control plane.</li><li><Check />The Go agent dials out from the VPS.</li><li><Check />Applications and supported databases stay on customer-selected infrastructure.</li></ul></div>
          <EvergreenStage asset={visualAssets.controlPlane} priority caption="Atmospheric architecture illustration. Product labels and claims remain in the surrounding HTML." />
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
            <div className="runtime-brand-cloud">{runtimeAssets.filter((asset) => asset.id !== "docker").map((asset) => <BrandMark key={asset.id} asset={asset} />)}<BrandMark asset={{ id: "static", name: "Static", monogram: "</>", sourceUrl: "", accessibleLabel: "Static sites", trademarkStatus: "generic mark" }} /></div>
            <Link href="/frameworks" className="site-button site-button-glass">Review compatibility<ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section className="site-section site-section-tinted">
        <div className="site-container">
          <SectionHeading
            kicker="Compare with evidence"
            title="Choose by responsibility, control, and current requirements."
            description="Select a provider to compare operating model, infrastructure ownership, deployment scope, storage, scaling, databases, and pricing. The single comparison hub includes official sources, strengths, limitations, and review dates."
          />
          <ProviderComparison comparisons={homepageComparisons} />
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
