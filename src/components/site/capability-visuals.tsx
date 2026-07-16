import {
  Activity,
  ArrowRight,
  Check,
  CircleDot,
  Database,
  GitBranch,
  Globe2,
  KeyRound,
  LockKeyhole,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import type { CSSProperties } from "react";

export type CapabilityVisualKind =
  | "deploy"
  | "runtime"
  | "observability"
  | "domain"
  | "database"
  | "access";

export function CapabilityVisual({ kind }: { kind: CapabilityVisualKind }) {
  return (
    <div className={`capability-visual capability-visual-${kind}`} aria-hidden="true">
      {kind === "deploy" ? <DeployVisual /> : null}
      {kind === "runtime" ? <RuntimeVisual /> : null}
      {kind === "observability" ? <ObservabilityVisual /> : null}
      {kind === "domain" ? <DomainVisual /> : null}
      {kind === "database" ? <DatabaseVisual /> : null}
      {kind === "access" ? <AccessVisual /> : null}
    </div>
  );
}

function DeployVisual() {
  return (
    <div className="capability-deploy-scene">
      <div className="capability-mini-toolbar">
        <span className="capability-mini-status"><CircleDot className="size-3" />Interactive example</span>
        <span className="font-mono text-[10px] text-muted-foreground">main@7f2c1a</span>
      </div>
      <div className="capability-deploy-rail">
        {[
          ["Source", GitBranch],
          ["Build", TerminalSquare],
          ["Release", Server],
          ["Healthy", Check],
        ].map(([label, Icon], index) => {
          const StageIcon = Icon as typeof GitBranch;
          return (
            <div className="capability-stage-wrap" key={label as string}>
              <div className={`capability-stage ${index < 3 ? "is-done" : "is-live"}`}>
                <StageIcon className="size-3.5" />
                <span>{label as string}</span>
              </div>
              {index < 3 ? <ArrowRight className="capability-stage-arrow" /> : null}
            </div>
          );
        })}
      </div>
      <div className="capability-progress-track"><span /></div>
    </div>
  );
}

function RuntimeVisual() {
  return (
    <div className="capability-runtime-scene">
      <div className="capability-server-shell">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-on-inverse-muted">your-vps-01</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-bright"><span className="size-1.5 rounded-full bg-brand-bright" />Connected</span>
        </div>
        <div className="mt-4 space-y-2">
          {[["CPU", "42%"], ["RAM", "61%"], ["Disk", "28%"]].map(([label, value], index) => (
            <div key={label} className="grid grid-cols-[2.2rem_1fr_2rem] items-center gap-2 text-[10px] text-text-on-inverse-muted">
              <span>{label}</span>
              <span className="capability-meter"><i style={{ "--meter-scale": `${[0.42, 0.61, 0.28][index]}` } as CSSProperties} /></span>
              <span className="text-right font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="capability-owned-label"><Server className="size-4" /><span>Runs on your infrastructure</span></div>
    </div>
  );
}

function ObservabilityVisual() {
  return (
    <div className="capability-observability-scene">
      <div className="capability-chart-card">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-semibold text-foreground">Request health</span>
          <span className="text-muted-foreground">Example · 30 min</span>
        </div>
        <svg viewBox="0 0 300 92" className="mt-3 w-full" role="presentation">
          <path className="capability-chart-area" d="M0 78 C22 74 34 48 57 55 S92 76 116 45 S155 24 176 48 S214 73 236 36 S270 18 300 32 L300 92 L0 92 Z" />
          <path className="capability-chart-line" d="M0 78 C22 74 34 48 57 55 S92 76 116 45 S155 24 176 48 S214 73 236 36 S270 18 300 32" />
          <circle className="capability-chart-dot" cx="236" cy="36" r="4" />
        </svg>
      </div>
      <div className="capability-log-card">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-foreground"><Activity className="size-3 text-brand" />Live context</span>
        <div className="mt-2 space-y-1 font-mono text-[9px] text-muted-foreground">
          <p><span className="text-brand">200</span> GET /health</p>
          <p><span className="text-brand">200</span> GET /api/apps</p>
          <p><span className="text-warning-text">412ms</span> POST /build</p>
        </div>
      </div>
    </div>
  );
}

function DomainVisual() {
  return (
    <div className="capability-domain-scene">
      <div className="capability-domain-card">
        <div className="capability-domain-icon"><Globe2 className="size-5" /></div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">api.example.com</p>
          <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-success-text"><LockKeyhole className="size-3" />Certificate active</p>
        </div>
      </div>
      <div className="capability-route-line"><span /><i /><span /></div>
      <div className="capability-domain-target"><Server className="size-4 text-brand" /><span>nginx route</span><Check className="ml-auto size-3.5 text-success-text" /></div>
    </div>
  );
}

function DatabaseVisual() {
  return (
    <div className="capability-database-scene">
      <div className="capability-db-orbit">
        <div className="capability-db-core"><Database className="size-6" /><span>Postgres</span></div>
        <span className="capability-db-node capability-db-node-one">MySQL</span>
        <span className="capability-db-node capability-db-node-two">Mongo</span>
        <span className="capability-db-node capability-db-node-three">Redis</span>
      </div>
      <div className="capability-query-card">
        <span className="text-[10px] font-semibold text-foreground">Query activity</span>
        <code>SELECT status FROM releases;</code>
      </div>
    </div>
  );
}

function AccessVisual() {
  return (
    <div className="capability-access-scene">
      <div className="capability-access-boundary">
        <div className="capability-role-stack">
          <span><KeyRound className="size-3" />Owner</span>
          <span><ShieldCheck className="size-3" />Member</span>
          <span><Activity className="size-3" />Viewer</span>
        </div>
        <div className="capability-signed-work">
          <div><LockKeyhole className="size-4" /><span>Signed work</span></div>
          <ArrowRight className="size-4 text-brand-bright" />
          <div><Server className="size-4" /><span>Outbound agent</span></div>
        </div>
      </div>
    </div>
  );
}
