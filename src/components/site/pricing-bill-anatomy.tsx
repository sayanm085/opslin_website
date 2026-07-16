"use client";

import { Calculator, Check, ReceiptIndianRupee, Server } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export type BillPlan = {
  name: string;
  price: number;
  summary: string;
};

const GST_RATE = 0.18;

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

function BillRow({ label, value, scale, reduced }: { label: string; value: number; scale: number; reduced: boolean | null }) {
  return (
    <div>
      <span className="flex items-baseline justify-between gap-4 text-sm text-muted-foreground"><span>{label}</span><strong className="font-mono font-semibold tabular-nums text-foreground">{formatINR(value)}</strong></span>
      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true"><motion.span className="block h-full origin-left rounded-full bg-brand" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: scale }} transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} /></span>
    </div>
  );
}

export function PricingBillAnatomy({ plans }: { plans: BillPlan[] }) {
  const [selectedName, setSelectedName] = useState(plans.find((plan) => plan.price > 0)?.name ?? plans[0]?.name ?? "");
  const reduced = useReducedMotion();
  const plan = plans.find((item) => item.name === selectedName) ?? plans[0];
  if (!plan) return null;

  const gst = plan.price * GST_RATE;
  const total = plan.price + gst;
  const maxTotal = Math.max(...plans.map((item) => item.price * (1 + GST_RATE)), 1);

  return (
    <section className="grid gap-5 rounded-[var(--opslin-radius-2xl)] border border-border bg-card p-5 shadow-xl lg:grid-cols-[0.85fr_1.15fr] lg:p-8" aria-labelledby="bill-anatomy-title">
      <div>
        <p className="site-kicker">Selected-plan bill anatomy</p>
        <h2 id="bill-anatomy-title" className="mt-3 text-3xl font-semibold tracking-tight">See the monthly Opslin amount before checkout.</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Choose a published plan. The calculation stays in this browser and uses the disclosed monthly base price plus applicable 18% GST.</p>
        <div className="mt-6 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Choose a plan for the monthly bill example">
          {plans.map((item) => <button key={item.name} type="button" role="radio" aria-checked={item.name === plan.name} onClick={() => setSelectedName(item.name)} className={`min-h-16 rounded-xl border p-3 text-left transition-[transform,border-color,background-color] hover:-translate-y-0.5 ${item.name === plan.name ? "border-brand bg-brand-muted" : "border-border bg-background"}`}><strong className="block text-sm">{item.name}</strong><span className="mt-1 block font-mono text-xs tabular-nums text-muted-foreground">{formatINR(item.price)} / month</span></button>)}
        </div>
      </div>

      <div className="rounded-2xl border border-border-inverse bg-inverse p-5 text-text-inverse sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-bright">{plan.name} · monthly example</span><h3 className="mt-2 text-xl font-semibold">{plan.summary}</h3></div><ReceiptIndianRupee className="size-6 text-brand-bright" aria-hidden="true" /></div>
        <div className="mt-6 space-y-5">
          <BillRow label="Opslin monthly base" value={plan.price} scale={plan.price === 0 ? 0 : Math.max(0.02, plan.price / maxTotal)} reduced={reduced} />
          <BillRow label="Applicable GST · 18%" value={gst} scale={gst === 0 ? 0 : Math.max(0.02, gst / maxTotal)} reduced={reduced} />
        </div>
        <div className="my-6 border-t border-dashed border-border-inverse" />
        <div className="flex items-end justify-between gap-4" aria-live="polite"><div><span className="text-xs text-text-on-inverse-muted">Monthly Opslin total</span><strong className="mt-1 block font-mono text-2xl font-semibold tabular-nums text-text-inverse">{formatINR(total)}</strong></div><span className="rounded-full border border-border-inverse bg-brand-muted px-3 py-1.5 text-xs font-semibold text-brand-bright">{plan.price === 0 ? "No GST due" : "GST included"}</span></div>
        <div className="mt-6 grid gap-2 text-xs leading-5 text-text-on-inverse-muted sm:grid-cols-2">
          <p className="flex gap-2 rounded-xl border border-border-inverse bg-inverse-2 p-3"><Server className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" /><span>Your VPS provider, storage, domain, and third-party services remain separate.</span></p>
          <p className="flex gap-2 rounded-xl border border-border-inverse bg-inverse-2 p-3"><Calculator className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" /><span>No annual discount is calculated or implied by this monthly example.</span></p>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs text-text-on-inverse-muted"><Check className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />Local deterministic calculation: {formatINR(plan.price)} + {formatINR(gst)} GST = {formatINR(total)}.</p>
      </div>
    </section>
  );
}
