import { ArrowRight, Check } from "lucide-react";
import { siteLinks } from "@/lib/site-links";

const plans = [
  {
    name: "Free Beta",
    price: 0,
    summary: "Explore Opslin with one server.",
    features: ["1 server", "2 apps", "Limited logs and metrics", "Community support"],
  },
  {
    name: "Starter Trial",
    price: 299,
    summary: "For a small production workload.",
    features: ["1 server", "5 apps", "Git deploys and SSL", "Basic monitoring"],
    featured: true,
  },
  {
    name: "Pro",
    price: 799,
    summary: "For growing apps and services.",
    features: ["3 servers", "15 apps", "Databases and alerts", "Extended logs"],
  },
  {
    name: "Business",
    price: 1499,
    summary: "For teams operating together.",
    features: ["Team access", "Role-based controls", "Audit activity", "Priority support"],
  },
];

export function PricingCards() {
  return (
    <>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article key={plan.name} className={plan.featured ? "pricing-card pricing-card-featured" : "pricing-card"}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{plan.name}</h3>
              {plan.featured ? <span className="site-badge">Best value</span> : null}
            </div>
            <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{plan.summary}</p>
            <div className="mt-5">
              <span className="text-4xl font-semibold tracking-tight">{formatINR(plan.price)}</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {plan.price === 0 ? "No GST due" : `${formatINR(plan.price * 1.18, true)} including 18% GST`}
            </p>
            <ul className="my-7 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a href={siteLinks.register} className={plan.featured ? "site-button site-button-primary w-full" : "site-button site-button-secondary w-full"}>
              Start with {plan.name}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <div className="enterprise-banner">
        <div>
          <p className="site-kicker text-brand-bright">Enterprise</p>
          <h3 className="mt-2 text-2xl font-semibold text-text-inverse">Need custom limits, support, or deployment guidance?</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-on-inverse-muted">
            Discuss your infrastructure, rollout requirements, and support expectations directly with Opslin.
          </p>
        </div>
        <a href={`mailto:${siteLinks.contactEmail}`} className="site-button site-button-light">
          Contact Opslin
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

function formatINR(value: number, showPaise = false) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: showPaise ? 2 : 0,
    maximumFractionDigits: showPaise ? 2 : 0,
  }).format(value);
}
