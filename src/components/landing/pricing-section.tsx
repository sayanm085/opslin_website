import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { siteLinks } from "@/lib/site-links";

const plans = [
  {
    name: "Free Beta",
    price: "₹0",
    period: "/mo",
    summary: "1 server, 2 apps",
    features: ["1 server", "2 apps", "Limited logs/metrics", "Community support"],
    cta: "Start",
    href: siteLinks.register,
  },
  {
    name: "Starter Trial",
    price: "₹299",
    period: "/mo",
    summary: "Free for 6 months during beta",
    features: ["1 server", "5 apps", "SSL", "Git deploys", "Basic monitoring", "No credit card required"],
    cta: "Start Free",
    href: siteLinks.register,
    popular: true,
  },
  {
    name: "Pro",
    price: "₹799",
    period: "/mo",
    summary: "3 servers, 15 apps",
    features: ["3 servers", "15 apps", "Databases", "Backups", "Alerts", "Extended logs"],
    cta: "Choose Pro",
    href: siteLinks.register,
  },
  {
    name: "Business",
    price: "₹1,499",
    period: "/mo",
    summary: "Teams and priority operations",
    features: ["Team access", "RBAC", "Audit logs", "Priority support", "More servers/apps"],
    cta: "Choose Business",
    href: siteLinks.register,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    summary: "Custom control and support",
    features: ["SSO", "SLA", "Compliance reports", "Dedicated support"],
    cta: "Contact Sales",
    href: `mailto:${siteLinks.contactEmail}`,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="landing-section border-b border-black/10 bg-[#F7F4EE]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Pricing</p>
          <h2 className="landing-heading mx-auto">Beta pricing in INR.</h2>
          <p className="landing-description mx-auto mt-4">
            Start small, keep workloads on your VPS, and upgrade when you need more apps, servers,
            teams, or compliance support.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} className="landing-reveal" delay={index * 100}>
              <article
                className={[
                  "landing-card relative flex h-full flex-col",
                  plan.popular ? "bg-zinc-950 text-white ring-2 ring-green-500 hover:bg-zinc-950" : "",
                ].join(" ")}
              >
              {plan.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1 text-xs font-medium text-white">
                  Best value
                </span>
              ) : null}

              <h3 className={["text-lg font-semibold", plan.popular ? "text-white" : "text-zinc-950"].join(" ")}>
                {plan.name}
              </h3>
              <p className={["mt-2 min-h-10 text-sm leading-5", plan.popular ? "text-zinc-400" : "text-zinc-600"].join(" ")}>
                {plan.summary}
              </p>

              <div className="mb-6 mt-5">
                <span className={["text-4xl font-bold tracking-normal", plan.popular ? "text-white" : "text-zinc-950"].join(" ")}>
                  {plan.price}
                </span>
                {plan.period ? <span className={["text-sm", plan.popular ? "text-zinc-500" : "text-zinc-500"].join(" ")}>{plan.period}</span> : null}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className={["flex items-center gap-2 text-sm", plan.popular ? "text-zinc-300" : "text-zinc-700"].join(" ")}>
                    <Check className="size-4 shrink-0 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

                <TrackedLink
                  href={plan.href}
                  className={[
                    plan.popular ? "landing-btn-primary" : "landing-btn-secondary",
                    "w-full text-center text-sm",
                  ].join(" ")}
                  trackEvent="pricing_click"
                  trackProperties={{
                    plan: plan.name.toLowerCase().replace(/\s+/g, "_"),
                    cta: plan.cta,
                    price: plan.price,
                  }}
                >
                  {plan.cta}
                </TrackedLink>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-zinc-500">
          During V2.1 beta, Free and Starter Trial require no payment method. Pro and Business
          billing will open gradually as paid beta capacity becomes available.
        </p>
      </Reveal>
    </section>
  );
}
