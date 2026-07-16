"use client";

import { ArrowRight, Boxes, Cloud, KeyRound, Server, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { HomepageComparison } from "@/components/site/provider-comparison";

function findDimension(comparison: HomepageComparison, labels: string[]) {
  return comparison.dimensions.find((dimension) => labels.includes(dimension.label));
}

function FlowArrow({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative flex min-h-12 items-center justify-center overflow-hidden" aria-label={label}>
      <span className="w-full border-t border-dashed border-border-inverse" aria-hidden="true" />
      <motion.span
        className="absolute grid size-7 place-items-center rounded-full border border-brand/60 bg-inverse-2 text-brand-bright shadow-lg"
        animate={reduceMotion ? { x: 0, opacity: 1 } : { x: ["-160%", "160%"], opacity: [0, 1, 1, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 2.8, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <ArrowRight className="size-3.5" />
      </motion.span>
    </div>
  );
}

function BoundaryNode({ icon: Icon, label, owner }: { icon: typeof Server; label: string; owner: string }) {
  return (
    <div className="rounded-xl border border-border-inverse bg-inverse-2/90 p-3 text-center">
      <Icon className="mx-auto size-5 text-brand-bright" aria-hidden="true" />
      <strong className="mt-2 block text-xs text-text-inverse">{label}</strong>
      <small className="mt-1 block text-[10px] leading-4 text-text-on-inverse-muted">{owner}</small>
    </div>
  );
}

export function ResponsibilityBoundary({ comparison }: { comparison: HomepageComparison }) {
  const controlPlane = findDimension(comparison, ["Control-plane responsibility", "Operational responsibility"]);
  const workload = findDimension(comparison, ["Workload location", "Compute ownership"]);
  const serverAccess = findDimension(comparison, ["Server access", "Server connection"]);

  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-border-inverse bg-inverse p-4 text-text-inverse shadow-2xl sm:p-6" aria-labelledby="responsibility-boundary-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-bright">Animated responsibility boundary</p>
          <h4 id="responsibility-boundary-title" className="mt-2 text-xl font-semibold tracking-tight">Opslin and {comparison.provider} place responsibility differently.</h4>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-text-on-inverse-muted">The moving marker explains direction of work, not speed, quality, or a winner. Labels summarize the selected provider&apos;s sourced matrix.</p>
        </div>
        <span className="rounded-full border border-border-inverse bg-inverse-2 px-3 py-1.5 text-xs font-semibold text-text-on-inverse-muted">{comparison.category}</span>
      </div>

      <div className="mt-6 grid gap-3 xl:grid-cols-2">
        <section className="rounded-2xl border border-brand/40 bg-brand-muted p-4" aria-label="Opslin responsibility flow">
          <div className="flex items-center justify-between gap-3"><strong className="text-sm">Opslin model</strong><span className="text-[10px] font-semibold uppercase tracking-wider text-brand-bright">Managed control plane + your VPS</span></div>
          <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_3rem_1fr_3rem_1fr]">
            <BoundaryNode icon={Cloud} label="Opslin control plane" owner="Operated by Opslin" />
            <FlowArrow label="Signed work moves to the outbound agent" />
            <BoundaryNode icon={KeyRound} label="Outbound Go agent" owner="Authenticated work channel" />
            <FlowArrow label="The agent runs scoped work on the customer server" />
            <BoundaryNode icon={Server} label="Apps and databases" owner="Customer-controlled VPS" />
          </div>
        </section>

        <section className="rounded-2xl border border-border-inverse bg-inverse-2/75 p-4" aria-label={`${comparison.provider} responsibility summary`}>
          <div className="flex items-center justify-between gap-3"><strong className="text-sm">{comparison.provider} model</strong><span className="text-[10px] font-semibold uppercase tracking-wider text-text-on-inverse-muted">No score applied</span></div>
          <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_3rem_1fr_3rem_1fr]">
            <BoundaryNode icon={ShieldCheck} label="Operating model" owner={comparison.category} />
            <FlowArrow label={`${comparison.provider} deployment responsibility path`} />
            <BoundaryNode icon={Server} label="Runtime boundary" owner={workload?.alternative ?? comparison.directAnswer} />
            <FlowArrow label={`${comparison.provider} workload responsibility path`} />
            <BoundaryNode icon={Boxes} label="Operational access" owner={serverAccess?.alternative ?? controlPlane?.alternative ?? "See the sourced responsibility matrix below."} />
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-2 text-xs leading-5 text-text-on-inverse-muted sm:grid-cols-2">
        <p className="rounded-xl border border-border-inverse bg-inverse-2/60 p-3"><strong className="text-text-inverse">Opslin:</strong> {controlPlane?.opslin ?? "Opslin operates the control plane while the customer operates the VPS and workloads."}</p>
        <p className="rounded-xl border border-border-inverse bg-inverse-2/60 p-3"><strong className="text-text-inverse">{comparison.provider}:</strong> {controlPlane?.alternative ?? workload?.alternative ?? comparison.directAnswer}</p>
      </div>
      <figcaption className="mt-4 text-xs leading-5 text-text-on-inverse-muted">Responsibility summary only. Verify the selected provider&apos;s current documentation and the full decision matrix below before purchase.</figcaption>
    </figure>
  );
}
