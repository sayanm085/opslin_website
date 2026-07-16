import {
  CalendarClock,
  CheckCircle2,
  CircleOff,
  Construction,
  FlaskConical,
  LockKeyhole,
  type LucideIcon,
} from "lucide-react";
import {
  capabilityLedgerReviewedAt,
  capabilityStatuses,
  type CapabilityStatus,
  type PublicCapability,
  publicCapabilityLedger,
} from "@/lib/capability-ledger";

type CapabilityLedgerProps = {
  capabilities?: readonly PublicCapability[];
  description?: string;
  heading?: string;
  id?: string;
  showLegend?: boolean;
};

type StatusPresentation = {
  icon: LucideIcon;
  className: string;
  explanation: string;
};

const statusPresentation: Record<CapabilityStatus, StatusPresentation> = {
  "Available in beta": {
    icon: CheckCircle2,
    className: "border-success/20 bg-success-muted text-success-text",
    explanation: "Available to eligible beta customers; scope and behavior may change.",
  },
  "Plan-gated": {
    icon: LockKeyhole,
    className: "border-info/20 bg-info-muted text-info-text",
    explanation: "Available only when the organization, plan, and permissions allow it.",
  },
  "Gated validation": {
    icon: FlaskConical,
    className: "border-warning/20 bg-warning-muted text-warning-text",
    explanation: "Implemented behind a gate while staged and real-environment validation continues.",
  },
  "In development": {
    icon: Construction,
    className: "border-accent-2-border bg-accent-2-muted text-accent-2",
    explanation: "Actively being built; not generally available or a purchasing commitment.",
  },
  Planned: {
    icon: CalendarClock,
    className: "border-border bg-secondary text-muted-foreground",
    explanation: "Roadmap direction only; scope and timing may change.",
  },
  "Not supported": {
    icon: CircleOff,
    className: "border-danger/20 bg-danger-muted text-danger-text",
    explanation: "Not part of the current product capability surface.",
  },
};

export function CapabilityStatusBadge({ status }: { status: CapabilityStatus }) {
  const presentation = statusPresentation[status];
  const Icon = presentation.icon;

  return (
    <span
      className={`inline-flex min-h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${presentation.className}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}

export function CapabilityLedger({
  capabilities = publicCapabilityLedger,
  description = "A public, conservative view of what customers can use now, what requires an eligible plan, what remains gated, and what Opslin does not currently support.",
  heading = "Capability status, without roadmap blur.",
  id = "capability-status",
  showLegend = true,
}: CapabilityLedgerProps) {
  const reviewedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${capabilityLedgerReviewedAt}T00:00:00Z`));

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="flex flex-col gap-5 border-b border-border pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="site-kicker">Product truth</p>
          <h2 id={`${id}-heading`} className="site-heading mt-3">
            {heading}
          </h2>
          <p className="site-description mt-4">{description}</p>
        </div>
        <p className="shrink-0 text-xs font-medium text-muted-foreground">
          Last reviewed <time dateTime={capabilityLedgerReviewedAt}>{reviewedDate}</time>
        </p>
      </div>

      {showLegend ? (
        <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4 sm:p-5" aria-labelledby={`${id}-legend`}>
          <h3 id={`${id}-legend`} className="text-sm font-semibold text-foreground">
            How to read the status labels
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {capabilityStatuses.map((status) => (
              <li key={status} className="flex items-start gap-3">
                <CapabilityStatusBadge status={status} />
                <p className="pt-1 text-xs leading-5 text-muted-foreground">
                  {statusPresentation[status].explanation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="hidden grid-cols-[minmax(12rem,0.8fr)_minmax(20rem,1.4fr)_minmax(12rem,0.8fr)] gap-5 border-b border-border bg-secondary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground lg:grid">
          <span>Capability</span>
          <span>Current scope and boundary</span>
          <span>Status</span>
        </div>
        <ul className="divide-y divide-border">
          {capabilities.map((capability) => (
            <li
              key={capability.id}
              className="grid gap-4 px-5 py-5 transition-colors hover:bg-secondary/40 sm:px-6 lg:grid-cols-[minmax(12rem,0.8fr)_minmax(20rem,1.4fr)_minmax(12rem,0.8fr)] lg:gap-5"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {capability.category}
                </p>
                <h3 className="mt-1.5 text-sm font-semibold text-foreground">{capability.name}</h3>
              </div>
              <div className="space-y-2 text-sm leading-6">
                <p className="text-foreground">{capability.summary}</p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Boundary:</span> {capability.boundary}
                </p>
              </div>
              <div className="lg:pt-0.5">
                <CapabilityStatusBadge status={capability.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 max-w-4xl text-xs leading-5 text-muted-foreground">
        Beta features may change. Roadmap items are not delivery commitments. Server compatibility, customer configuration,
        plan entitlements, and third-party infrastructure can affect availability.
      </p>
    </section>
  );
}
