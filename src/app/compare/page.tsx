import type { Metadata } from "next";
import { CalendarClock, Scale, Server, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/site/brand-mark";
import { ProviderComparison } from "@/components/site/provider-comparison";
import { ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { providerAssets, providerIds, providerIdFromSlug, type ProviderId } from "@/lib/brand-assets";
import { comparisonDisclaimer, comparisons } from "@/lib/comparisons";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("Compare Opslin with deployment platforms and manual VPS operations", "One dated, source-linked hub comparing Opslin with Coolify, Dokploy, CapRover, Railway, Render, Heroku, Vercel, and manual VPS operation.", "/compare");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opslin.shotlin.in";
const hubFaqs = [
  ["Is Opslin always better than the compared platform?", "No. Each operating model has strengths. The hub shows when Opslin fits, when the alternative fits, and the current limits that can change the decision."],
  ["Does bring-your-own-VPS always mean lower cost?", "No. The total depends on the VPS, storage, traffic, operations time, support, and the platform subscription. Pricing examples are dated and must be rechecked."],
  ["Are provider names and logos endorsements?", "No. Product names and marks identify the products discussed. Opslin is not affiliated with or endorsed by the compared providers."],
  ["How current are the comparisons?", "Pricing claims have a 30-day review window and non-pricing claims have a 90-day review window. Each selected provider shows its source register and due dates."],
];

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ provider?: string }> }) {
  const requested = (await searchParams).provider as ProviderId | undefined;
  const initialProvider = requested && providerIds.includes(requested) ? requested : "coolify";
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", name: "Opslin provider comparison hub", url: `${siteUrl}/compare`, dateModified: "2026-07-16" },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Compare", item: `${siteUrl}/compare` }] },
    { "@context": "https://schema.org", "@type": "ItemList", name: "Opslin operating-model comparisons", itemListElement: comparisons.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `Opslin vs ${item.provider}`, url: `${siteUrl}/compare?provider=${providerIdFromSlug(item.slug)}` })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: hubFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return <ResourcePage>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <ResourceHero eyebrow="One comparison hub · reviewed 16 July 2026" title="Compare who owns the runtime—and who carries each operational responsibility." description="Choose a provider to compare control-plane responsibility, infrastructure ownership, server access, deployment scope, storage, scaling, databases, pricing model, strengths, and limitations. There is no universal winner." aside={<div className="rounded-2xl border border-border bg-card p-5"><Scale className="size-5 text-brand" aria-hidden="true" /><p className="mt-4 font-semibold text-foreground">Evidence before scores</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Official sources and visible limitations replace unsupported rankings.</p></div>} />
    <ResourceSection eyebrow="Interactive decision matrix" title="Select the operating model you are evaluating." description="The selection updates the URL for sharing. The canonical page remains this single comparison hub." tinted>
      <ProviderComparison comparisons={comparisons} initialProvider={initialProvider} mode="hub" />
    </ResourceSection>
    <ResourceSection eyebrow="Crawlable provider summaries" title="All eight comparisons remain readable without interaction." description="These concise summaries keep the full decision surface understandable to people, search engines, and agentic tools.">
      <div className="comparison-summary-grid">{comparisons.map((item) => { const id=providerIdFromSlug(item.slug); return <article id={id} key={id}><BrandMark asset={providerAssets[id]} /><p className="site-kicker">{item.category}</p><h2>Opslin vs {item.provider}</h2><p>{item.directAnswer}</p><div><strong>Competitor strength</strong><span>{item.strengths[0]}</span></div><div><strong>Opslin limitation</strong><span>{item.opslinLimitations[0]}</span></div><a href={`?provider=${id}`}>Open this matrix</a></article>; })}</div>
    </ResourceSection>
    <ResourceSection eyebrow="How to decide" title="Start with responsibility, then compare features." tinted><div className="grid gap-5 md:grid-cols-3"><Guide icon={Server} title="Runtime ownership">Decide whether workloads should run on infrastructure you select or compute operated by the platform provider.</Guide><Guide icon={ShieldCheck} title="Operational responsibility">Account for patching, capacity, storage, backups, recovery, monitoring, and incident response.</Guide><Guide icon={CalendarClock} title="Current evidence">Pricing is reviewed every 30 days; non-pricing claims every 90 days. Recheck official sources before purchase.</Guide></div><p className="mt-8 max-w-5xl text-sm leading-7 text-muted-foreground">{comparisonDisclaimer}</p></ResourceSection>
    <ResourceSection eyebrow="Comparison FAQ" title="Questions that apply to every provider decision."><div className="faq-list max-w-4xl">{hubFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></ResourceSection>
    <ResourceCta title="Compare the workflow as well as the feature list." description="Use the labelled Opslin simulation to understand how supported work moves from the control plane to a customer-controlled VPS." primaryHref="/demo" primaryLabel="Try interactive demo" secondaryHref="/how-it-works" secondaryLabel="See how Opslin works" />
  </ResourcePage>;
}

function Guide({ icon: Icon, title, children }: { icon: typeof Server; title: string; children: React.ReactNode }) { return <article className="resource-card"><div className="bento-icon"><Icon className="size-5" /></div><h3>{title}</h3><p>{children}</p></article>; }
