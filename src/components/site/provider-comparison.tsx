"use client";

import { ArrowRight, CheckCircle2, ExternalLink, Info, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/site/brand-mark";
import { ResponsibilityBoundary } from "@/components/site/responsibility-boundary";
import { providerAssets, providerIdFromSlug, type ProviderId } from "@/lib/brand-assets";
import type { Comparison } from "@/lib/comparisons";

export type HomepageComparison = Pick<Comparison, "slug" | "provider" | "category" | "directAnswer" | "reviewedAt" | "dimensions" | "opslinFit" | "alternativeFit" | "opslinLimitations">;

type ComparisonSelectorProps = {
  comparisons: Comparison[] | HomepageComparison[];
  initialProvider?: ProviderId;
  mode?: "compact" | "hub";
};

export function ProviderComparison({ comparisons, initialProvider = "coolify", mode = "compact" }: ComparisonSelectorProps) {
  const router = useRouter();
  const fallback = comparisons[0];
  const initial = comparisons.find((item) => providerIdFromSlug(item.slug) === initialProvider) ?? fallback;
  const [selectedSlug, setSelectedSlug] = useState(initial?.slug ?? "");
  const comparison = comparisons.find((item) => item.slug === selectedSlug) ?? fallback;
  if (!comparison) return null;

  const select = (slug: string) => {
    setSelectedSlug(slug);
    if (mode === "hub") router.replace(`/compare?provider=${providerIdFromSlug(slug)}`, { scroll: false });
  };

  return (
    <div className={`provider-comparison provider-comparison-${mode}`}>
      <div className="provider-logo-selector" role="tablist" aria-label="Choose a platform to compare with Opslin">
        {comparisons.map((item) => {
          const id = providerIdFromSlug(item.slug);
          return <button key={item.slug} type="button" role="tab" aria-selected={item.slug === comparison.slug} onClick={() => select(item.slug)}><BrandMark asset={providerAssets[id]} compact /><span>{item.provider}</span></button>;
        })}
      </div>

      <article className="comparison-stage" role="tabpanel">
        <header className="comparison-stage-header">
          <div><p className="site-kicker">Opslin vs {comparison.provider}</p><h3>Compare responsibility—not a universal score.</h3><p>{comparison.directAnswer}</p></div>
          <div className="comparison-meta"><span>{comparison.category}</span><span>Reviewed {formatDate(comparison.reviewedAt)}</span></div>
        </header>
        {mode === "hub" ? <ResponsibilityBoundary comparison={comparison} /> : null}
        <div className="comparison-matrix">
          <div className="comparison-matrix-head"><span>Decision area</span><span>Opslin</span><span>{comparison.provider}</span></div>
          {comparison.dimensions.slice(0, mode === "compact" ? 4 : 12).map((dimension) => <div className="comparison-row" key={dimension.label}><strong>{dimension.label}</strong><div><small>Opslin</small>{dimension.opslin}</div><div><small>{comparison.provider}</small>{dimension.alternative}</div></div>)}
        </div>
        <div className="comparison-decisions">
          <DecisionCard icon={ShieldCheck} title="Choose Opslin when" items={comparison.opslinFit.slice(0, mode === "compact" ? 2 : 4)} />
          <DecisionCard icon={Scale} title={`Choose ${comparison.provider} when`} items={comparison.alternativeFit.slice(0, mode === "compact" ? 2 : 4)} />
        </div>
        <div className="comparison-limit"><Info /><p><strong>Current Opslin limitation:</strong> {comparison.opslinLimitations[0]}</p></div>
        {mode === "compact" ? <Link className="site-button site-button-glass" href={`/compare?provider=${providerIdFromSlug(comparison.slug)}`}>Open full comparison hub<ArrowRight /></Link> : <HubEvidence comparison={comparison as Comparison} />}
      </article>
    </div>
  );
}

function HubEvidence({ comparison }: { comparison: Comparison }) {
  return <div className="comparison-evidence">
    <section><p className="site-kicker">Pricing model</p><h4>Separate the platform bill from the infrastructure bill.</h4><p>{comparison.pricing.model}</p><p>{comparison.pricing.datedExample}</p><span>Pricing review due {formatDate(comparison.pricing.nextReviewAt)}</span></section>
    <section><p className="site-kicker">Official source register</p><ul>{comparison.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalLink /></a><small>Claims: {source.claimIds.join(", ")}</small></li>)}</ul><span>Feature review due {formatDate(comparison.nextFeatureReviewAt)}</span></section>
  </div>;
}

function DecisionCard({ icon: Icon, title, items }: { icon: typeof ShieldCheck; title: string; items: string[] }) {
  return <section><div><Icon /><h4>{title}</h4></div><ul>{items.map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul></section>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}
