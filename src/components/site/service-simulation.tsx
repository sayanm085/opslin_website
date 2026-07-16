"use client";

import {
  Activity,
  BellRing,
  Check,
  CirclePause,
  Database,
  FileKey2,
  GitBranch,
  HeartPulse,
  KeyRound,
  LockKeyhole,
  Play,
  RefreshCcw,
  RotateCcw,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { type ComponentType, type ReactNode, useEffect, useRef, useState } from "react";
import type { ServiceContent } from "@/lib/marketing-content";

type SimulationKind = ServiceContent["visualKind"];
type SimulationStep = {
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const SIMULATION_INTERVAL_MS = 2400;

const steps: Record<SimulationKind, SimulationStep[]> = {
  deployment: [
    { label: "Source", detail: "Repository and branch selected", icon: GitBranch },
    { label: "Build", detail: "Runtime configuration inspected", icon: TerminalSquare },
    { label: "Release", detail: "Work runs on the connected VPS", icon: Server },
    { label: "Verify", detail: "Health result returns", icon: HeartPulse },
  ],
  observability: [
    { label: "Health", detail: "Current application context", icon: HeartPulse },
    { label: "Metrics", detail: "Server signal sample", icon: Activity },
    { label: "Logs", detail: "Deployment event sample", icon: TerminalSquare },
    { label: "Alerts", detail: "Configured condition example", icon: BellRing },
  ],
  security: [
    { label: "Authorize", detail: "Scoped work is prepared", icon: KeyRound },
    { label: "Sign", detail: "The work envelope is authenticated", icon: FileKey2 },
    { label: "Execute", detail: "The outbound agent receives work", icon: Server },
    { label: "Confirm", detail: "The result returns to Opslin", icon: ShieldCheck },
  ],
  databases: [
    { label: "Select", detail: "Choose a supported engine", icon: Database },
    { label: "Provision", detail: "Create the service on your VPS", icon: Server },
    { label: "Connect", detail: "Organize connection details", icon: KeyRound },
    { label: "Operate", detail: "Review supported lifecycle actions", icon: Activity },
  ],
};

const databaseEngines = [
  { id: "postgresql", name: "PostgreSQL", path: "/brands/postgresql.svg" },
  { id: "mysql", name: "MySQL", path: "/brands/mysql.svg" },
  { id: "mongodb", name: "MongoDB", path: "/brands/mongodb.svg" },
  { id: "redis", name: "Redis", path: "/brands/redis.svg" },
] as const;

function SimulationPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-inverse bg-inverse-2/90 p-4 shadow-2xl backdrop-blur-sm sm:p-5">
      {children}
    </div>
  );
}

function SimulationLabel({ children }: { children: ReactNode }) {
  return <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-on-inverse-muted">{children}</span>;
}

function StatusLine({ icon: Icon, title, detail }: { icon: SimulationStep["icon"]; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border-inverse bg-inverse px-3 py-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-muted text-brand-bright">
        <Icon className="size-4" aria-hidden={true} />
      </span>
      <span className="min-w-0">
        <strong className="block truncate text-sm font-semibold text-text-inverse">{title}</strong>
        <small className="block truncate text-xs text-text-on-inverse-muted">{detail}</small>
      </span>
      <Check className="ml-auto size-4 shrink-0 text-brand-bright" aria-hidden="true" />
    </div>
  );
}

function DeploymentPanel({ active }: { active: number }) {
  const logSets = [
    ["source selected", "branch: main"],
    ["runtime inspected", "build command prepared"],
    ["signed work accepted", "release started on your-vps-01"],
    ["health check returned", "illustrative result: healthy"],
  ];
  return (
    <SimulationPanel>
      <div className="flex items-center justify-between gap-4">
        <div><SimulationLabel>Local deployment simulation</SimulationLabel><h3 className="mt-1 text-lg font-semibold text-text-inverse">api-service · main</h3></div>
        <span className="rounded-full border border-border-inverse bg-brand-muted px-2.5 py-1 text-xs font-semibold text-brand-bright">Stage {active + 1}/4</span>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2" aria-label="Illustrative deployment progress">
        {steps.deployment.map((step, index) => {
          const Icon = step.icon;
          const complete = index <= active;
          return <div key={step.label} className="grid justify-items-center gap-2 text-center"><span className={`grid size-9 place-items-center rounded-xl border ${complete ? "border-brand/60 bg-brand-muted text-brand-bright" : "border-border-inverse bg-inverse text-text-on-inverse-muted"}`}><Icon className="size-4" aria-hidden={true} /></span><small className={complete ? "text-[10px] font-semibold text-text-inverse" : "text-[10px] text-text-on-inverse-muted"}>{step.label}</small></div>;
        })}
      </div>
      <div className="mt-5 rounded-xl border border-border-inverse bg-inverse p-3 font-mono text-xs leading-6 text-text-on-inverse-muted">
        {logSets[active].map((line, index) => <p key={line}><span className="mr-2 text-brand-bright">{String(index + 1).padStart(2, "0")}</span>{line}</p>)}
      </div>
    </SimulationPanel>
  );
}

function ObservabilityPanel({ active }: { active: number }) {
  const panels = [
    { title: "Application health", detail: "Illustrative current state", metric: "Healthy", icon: HeartPulse },
    { title: "CPU sample", detail: "Illustrative server metric", metric: "42%", icon: Activity },
    { title: "Deployment logs", detail: "Illustrative event window", metric: "18 lines", icon: TerminalSquare },
    { title: "Configured alerts", detail: "Illustrative alert state", metric: "0 firing", icon: BellRing },
  ];
  const current = panels[active];
  return (
    <SimulationPanel>
      <div className="flex items-start justify-between gap-4">
        <div><SimulationLabel>Local telemetry simulation</SimulationLabel><h3 className="mt-1 text-lg font-semibold text-text-inverse">{current.title}</h3><p className="mt-1 text-xs text-text-on-inverse-muted">{current.detail}</p></div>
        <span className="font-mono text-xl font-semibold tabular-nums text-brand-bright">{current.metric}</span>
      </div>
      <div className="mt-5 flex h-28 items-end gap-2 rounded-xl border border-border-inverse bg-inverse p-4" aria-label="Illustrative changing metric bars">
        {[38, 54, 46, 72, 62, 84, 66, 78, 58, 70].map((height, index) => <motion.span key={index} className="min-w-0 flex-1 origin-bottom rounded-t bg-brand-bright/70" initial={false} animate={{ scaleY: active === 1 ? height / 100 : Math.max(0.2, (height - active * 7) / 100), opacity: index === 5 ? 1 : 0.55 }} transition={{ duration: 0.35 }} style={{ height: "100%" }} />)}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <StatusLine icon={Server} title="your-vps-01" detail="Illustrative connected server" />
        <StatusLine icon={Check} title="Context retained" detail="App, server, and deployment" />
      </div>
    </SimulationPanel>
  );
}

function SecurityPanel({ active }: { active: number }) {
  const nodes = [
    { icon: LockKeyhole, title: "Control plane", detail: "Scoped job" },
    { icon: FileKey2, title: "Signed work", detail: "Authenticated envelope" },
    { icon: Server, title: "Outbound agent", detail: "Customer VPS" },
  ];
  return (
    <SimulationPanel>
      <div className="flex items-center justify-between gap-4"><div><SimulationLabel>Local security simulation</SimulationLabel><h3 className="mt-1 text-lg font-semibold text-text-inverse">Authenticated work channel</h3></div><ShieldCheck className="size-6 text-brand-bright" aria-hidden="true" /></div>
      <div className="mt-6 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {nodes.map(({ icon: Icon, title, detail }, index) => <div className="contents" key={title}><div className={`rounded-xl border p-3 text-center ${active >= index ? "border-brand/60 bg-brand-muted" : "border-border-inverse bg-inverse"}`}><Icon className="mx-auto size-5 text-brand-bright" aria-hidden={true} /><strong className="mt-2 block text-xs text-text-inverse">{title}</strong><small className="mt-1 block text-[10px] text-text-on-inverse-muted">{detail}</small></div>{index < nodes.length - 1 ? <span className="mx-auto h-5 border-l border-dashed border-border-inverse sm:h-0 sm:w-6 sm:border-b sm:border-l-0" aria-hidden="true" /> : null}</div>)}
      </div>
      <div className="mt-4 rounded-xl border border-border-inverse bg-inverse p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-inverse"><RotateCcw className="size-4 text-brand-bright" aria-hidden="true" />Firewall safety example</div>
        <p className="mt-1 text-xs leading-5 text-text-on-inverse-muted">Apply → confirm → auto-revert if confirmation does not arrive. Illustrative flow only.</p>
      </div>
    </SimulationPanel>
  );
}

function DatabasePanel({ active }: { active: number }) {
  const [selected, setSelected] = useState<(typeof databaseEngines)[number]["id"]>("postgresql");
  const engine = databaseEngines.find((item) => item.id === selected) ?? databaseEngines[0];
  return (
    <SimulationPanel>
      <div className="flex items-center justify-between gap-4"><div><SimulationLabel>Local database simulation</SimulationLabel><h3 className="mt-1 text-lg font-semibold text-text-inverse">{engine.name} on your VPS</h3></div><span className="rounded-full border border-border-inverse px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-on-inverse-muted">Illustrative</span></div>
      <div className="mt-5 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Choose a database engine for this local simulation">
        {databaseEngines.map((item) => <button key={item.id} type="button" role="radio" aria-checked={selected === item.id} onClick={() => setSelected(item.id)} className={`grid min-h-16 place-items-center gap-1 rounded-xl border p-2 transition-[transform,border-color,background-color] hover:-translate-y-0.5 ${selected === item.id ? "border-brand/70 bg-brand-muted" : "border-border-inverse bg-card"}`}><Image src={item.path} alt="" width={24} height={24} className="size-6 object-contain" /><span className="sr-only">{item.name}</span></button>)}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <StatusLine icon={Database} title={steps.databases[active].label} detail={steps.databases[active].detail} />
        <StatusLine icon={Server} title="Customer-controlled VPS" detail="No real server contacted" />
      </div>
    </SimulationPanel>
  );
}

const panels: Record<SimulationKind, ComponentType<{ active: number }>> = {
  deployment: DeploymentPanel,
  observability: ObservabilityPanel,
  security: SecurityPanel,
  databases: DatabasePanel,
};

function CompactPreview({ kind }: { kind: SimulationKind }) {
  const preview = {
    deployment: { icon: GitBranch, title: "Source → build → release → verify", label: "Deployment rail" },
    observability: { icon: Activity, title: "Health, metrics, logs, and alerts", label: "Telemetry context" },
    security: { icon: ShieldCheck, title: "Signed work → outbound agent", label: "Authenticated channel" },
    databases: { icon: Database, title: "Select → provision → connect", label: "Database lifecycle" },
  }[kind];
  const Icon = preview.icon;
  return (
    <div className="relative min-h-44 overflow-hidden rounded-2xl border border-border-inverse bg-inverse p-4 text-text-inverse">
      <div className="absolute -right-10 -top-10 size-32 rounded-full bg-brand-muted blur-2xl" aria-hidden="true" />
      <SimulationLabel>{preview.label}</SimulationLabel>
      <div className="relative mt-8 grid grid-cols-[auto_1fr] items-center gap-4">
        <span className="grid size-12 place-items-center rounded-2xl border border-brand/50 bg-brand-muted"><Icon className="size-5 text-brand-bright" aria-hidden={true} /></span>
        <div><strong className="block text-sm leading-5">{preview.title}</strong><small className="mt-1 block text-xs text-text-on-inverse-muted">Local illustrative preview</small></div>
      </div>
      <div className="relative mt-5 flex gap-1.5" aria-hidden="true">{steps[kind].map((step, index) => <span key={step.label} className={`h-1.5 flex-1 rounded-full ${index < 3 ? "bg-brand-bright/70" : "bg-border-inverse"}`} />)}</div>
    </div>
  );
}

export function ServiceSimulation({ kind, compact = false }: { kind: SimulationKind; compact?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(rootRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (compact || paused || reduceMotion || !isVisible || !documentVisible) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % steps[kind].length), SIMULATION_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [compact, documentVisible, isVisible, kind, paused, reduceMotion]);

  if (compact) return <CompactPreview kind={kind} />;

  const Panel = panels[kind];
  return (
    <div ref={rootRef} className="relative isolate overflow-hidden rounded-[var(--opslin-radius-2xl)] border border-border-inverse bg-inverse p-3 shadow-2xl sm:p-4">
      <div className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-brand-muted blur-3xl" aria-hidden="true" />
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div><SimulationLabel>Interactive product preview</SimulationLabel><p className="mt-1 text-xs text-text-on-inverse-muted">Browser-only · no external system is contacted</p></div>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => setPaused((current) => !current)} aria-pressed={paused} className="site-button site-button-inverse min-h-10 px-3" title={paused ? "Resume simulation" : "Pause simulation"}>{paused ? <Play className="size-4" aria-hidden="true" /> : <CirclePause className="size-4" aria-hidden="true" />}<span className="sr-only">{paused ? "Resume simulation" : "Pause simulation"}</span></button>
          <button type="button" onClick={() => { setActive(0); setPaused(false); }} className="site-button site-button-inverse min-h-10 px-3" title="Replay simulation"><RefreshCcw className="size-4" aria-hidden="true" /><span className="sr-only">Replay simulation</span></button>
        </div>
      </div>
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label={`${kind} simulation stages`}>
        {steps[kind].map((step, index) => {
          const Icon = step.icon;
          return <button key={step.label} type="button" role="tab" aria-selected={active === index} onClick={() => { setActive(index); setPaused(true); }} className={`min-h-14 rounded-xl border px-2 py-2 text-left transition-[transform,border-color,background-color] hover:-translate-y-0.5 ${active === index ? "border-brand/70 bg-brand-muted" : "border-border-inverse bg-inverse-2/70"}`}><span className="flex items-center gap-2 text-xs font-semibold text-text-inverse"><Icon className="size-3.5 shrink-0 text-brand-bright" aria-hidden={true} />{step.label}</span><small className="mt-1 hidden truncate text-[10px] text-text-on-inverse-muted sm:block">{step.detail}</small></button>;
        })}
      </div>
      <motion.div key={`${kind}-${active}`} role="tabpanel" aria-live="polite" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
        <Panel active={active} />
      </motion.div>
    </div>
  );
}
