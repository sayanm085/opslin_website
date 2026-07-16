"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Check,
  CirclePause,
  CirclePlay,
  Code2,
  Database,
  GitBranch,
  Globe2,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

export type ProductWorkbenchView =
  | "deploy"
  | "observe"
  | "domains"
  | "databases"
  | "access";

type WorkbenchView = {
  id: ProductWorkbenchView;
  label: string;
  summary: string;
  icon: typeof GitBranch;
};

const AUTOPLAY_INTERVAL_MS = 5_800;

const views: WorkbenchView[] = [
  {
    id: "deploy",
    label: "Deploy",
    summary:
      "Follow a normal single-application release from selected source to a health-checked example state.",
    icon: GitBranch,
  },
  {
    id: "observe",
    label: "Observe",
    summary:
      "Review illustrative health, infrastructure metrics, and logs in the application context that produced them.",
    icon: Activity,
  },
  {
    id: "domains",
    label: "Domains & SSL",
    summary:
      "Understand the supported path between customer-controlled DNS, reverse-proxy routing, and certificate state.",
    icon: Globe2,
  },
  {
    id: "databases",
    label: "Databases",
    summary:
      "Select a supported database engine and inspect a deterministic provisioning example on a connected VPS.",
    icon: Database,
  },
  {
    id: "access",
    label: "Access",
    summary:
      "See how organization roles, API authorization, and the authenticated outbound agent channel form explicit boundaries.",
    icon: KeyRound,
  },
];

export function ProductWorkbench() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [documentActive, setDocumentActive] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentActive(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!playing || !isVisible || !documentActive || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % views.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [documentActive, isVisible, playing, reduceMotion]);

  const selectView = useCallback((index: number, focus = false) => {
    setActiveIndex(index);
    setPlaying(false);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % views.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + views.length) % views.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = views.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    selectView(nextIndex, true);
  };

  const replay = () => {
    setActiveIndex(0);
    setPlaying(!reduceMotion);
    tabRefs.current[0]?.focus();
  };

  const activeView = views[activeIndex];
  const effectivePlayback = playing && isVisible && documentActive && !reduceMotion;

  return (
    <section
      ref={rootRef}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
      aria-labelledby="product-workbench-title"
    >
      <div className="flex flex-col gap-5 border-b border-border bg-secondary/50 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <span className="size-1.5 rounded-full bg-brand-bright" aria-hidden="true" />
            Deterministic local simulation
          </div>
          <h3 id="product-workbench-title" className="mt-2 text-xl font-semibold tracking-tight text-foreground">
            Explore the product operating surface
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            These examples explain released beta workflows without contacting an Opslin API, repository, server, DNS provider, or database.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto" aria-label="Simulation playback controls">
          <span className="hidden text-xs text-muted-foreground sm:inline" aria-live="polite">
            {reduceMotion ? "Manual mode" : effectivePlayback ? "Auto-advancing" : playing ? "Waiting until visible" : "Paused"}
          </span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPlaying((current) => !current)}
            disabled={Boolean(reduceMotion)}
            aria-label={playing ? "Pause product simulation" : "Continue product simulation"}
            aria-pressed={!playing}
          >
            {playing ? <CirclePause className="size-4" aria-hidden="true" /> : <CirclePlay className="size-4" aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-secondary"
            onClick={replay}
            aria-label="Replay product simulation from Deploy"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="border-b border-border bg-background/50 p-3 lg:border-b-0 lg:border-r">
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1"
            role="tablist"
            aria-label="Product capability simulations"
          >
            {views.map((view, index) => {
              const Icon = view.icon;
              const selected = activeIndex === index;
              return (
                <button
                  key={view.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`product-workbench-tab-${view.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`product-workbench-panel-${view.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={cn(
                    "group flex min-h-11 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 lg:min-h-14",
                    selected
                      ? "border-brand/30 bg-brand-muted text-foreground"
                      : "border-transparent text-muted-foreground hover:-translate-y-0.5 hover:border-border hover:bg-card hover:text-foreground",
                  )}
                  onClick={() => selectView(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground", selected && "bg-brand text-primary-foreground")}>
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="truncate">{view.label}</span>
                  {selected ? <span className="ml-auto hidden size-1.5 rounded-full bg-brand-bright lg:block" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 bg-inverse p-4 text-text-inverse sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-bright">{activeView.label} example</p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-text-on-inverse-muted">{activeView.summary}</p>
            </div>
            <span className="rounded-full border border-border-inverse bg-inverse-2 px-3 py-1.5 text-[11px] font-semibold text-text-on-inverse-muted">
              Illustrative example · no live data
            </span>
          </div>

          {views.map((view, index) => (
            <motion.div
              key={view.id}
              id={`product-workbench-panel-${view.id}`}
              role="tabpanel"
              aria-labelledby={`product-workbench-tab-${view.id}`}
              tabIndex={0}
              hidden={activeIndex !== index}
              initial={false}
              animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index || reduceMotion ? 0 : 8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              {view.id === "deploy" ? <DeploySimulation active={activeIndex === index && effectivePlayback} /> : null}
              {view.id === "observe" ? <ObserveSimulation active={activeIndex === index && effectivePlayback} /> : null}
              {view.id === "domains" ? <DomainsSimulation active={activeIndex === index && effectivePlayback} /> : null}
              {view.id === "databases" ? <DatabaseSimulation /> : null}
              {view.id === "access" ? <AccessSimulation active={activeIndex === index && effectivePlayback} /> : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeploySimulation({ active }: { active: boolean }) {
  const stages = [
    ["Source", "main selected", GitBranch],
    ["Agent", "authenticated", Server],
    ["Build", "runtime detected", Code2],
    ["Health", "example passed", Check],
  ] as const;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Illustrative deployment stages">
        {stages.map(([label, detail, Icon], index) => (
          <div key={label} className="relative overflow-hidden rounded-2xl border border-border-inverse bg-inverse-2 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-muted text-brand-bright"><Icon className="size-4" aria-hidden="true" /></span>
              <span className="font-mono text-[10px] tabular-nums text-text-on-inverse-muted">0{index + 1}</span>
            </div>
            <strong className="mt-5 block text-sm">{label}</strong>
            <span className="mt-1 block text-xs text-text-on-inverse-muted">{detail}</span>
            <motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-bright" initial={{ scaleX: active ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: active ? 1.1 : 0, delay: active ? index * 0.12 : 0 }} />
          </div>
        ))}
      </div>
      <CodeWindow lines={["source selected: main", "outbound agent authenticated", "runtime detected: node", "example health check: passed"]} />
    </div>
  );
}

function ObserveSimulation({ active }: { active: boolean }) {
  const bars = [38, 56, 45, 67, 52, 73, 61, 78, 66, 71];
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl border border-border-inverse bg-inverse-2 p-5">
        <div className="flex items-center justify-between gap-3"><strong className="text-sm">Illustrative resource history</strong><span className="text-[10px] uppercase tracking-wider text-text-on-inverse-muted">Last 10 samples</span></div>
        <div className="mt-8 flex h-36 items-end gap-2" aria-label="Example resource activity chart">
          {bars.map((height, index) => (
            <motion.span key={`${height}-${index}`} className="min-w-0 flex-1 origin-bottom rounded-t-md bg-brand-bright/70" style={{ height: `${height}%` }} initial={false} animate={{ scaleY: active ? 1 : 0.85, opacity: active ? 1 : 0.65 }} transition={{ duration: 0.35, delay: index * 0.035 }} />
          ))}
        </div>
        <div className="mt-4 flex gap-5 text-xs text-text-on-inverse-muted"><span><i className="mr-2 inline-block size-2 rounded-full bg-brand-bright" />CPU example</span><span><i className="mr-2 inline-block size-2 rounded-full bg-muted-foreground" />Memory example</span></div>
      </div>
      <CodeWindow lines={["INFO release container started", "INFO nginx route prepared", "INFO local health check returned 200", "DONE example release marked healthy"]} />
    </div>
  );
}

function DomainsSimulation({ active }: { active: boolean }) {
  const nodes = [
    ["Customer DNS", "api.example.com", Globe2],
    ["Reverse proxy", "supported route", Server],
    ["Certificate", "illustrative active state", ShieldCheck],
  ] as const;
  return (
    <div className="rounded-2xl border border-border-inverse bg-inverse-2 p-5 sm:p-7">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {nodes.map(([label, detail, Icon], index) => (
          <div key={label} className="contents">
            <div className="rounded-2xl border border-border-inverse bg-inverse p-4">
              <Icon className="size-5 text-brand-bright" aria-hidden="true" />
              <strong className="mt-5 block text-sm">{label}</strong>
              <span className="mt-1 block text-xs text-text-on-inverse-muted">{detail}</span>
            </div>
            {index < nodes.length - 1 ? (
              <div className="relative hidden h-px w-12 overflow-hidden bg-border-inverse md:block" aria-hidden="true">
                {active ? <motion.i className="absolute inset-y-0 w-1/2 bg-brand-bright" animate={{ x: ["-100%", "220%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} /> : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-text-on-inverse-muted"><strong className="text-text-inverse">Shared responsibility:</strong> the customer owns the domain and correct DNS records; Opslin coordinates supported routing and certificate workflows.</p>
    </div>
  );
}

const databaseEngines = [
  { name: "PostgreSQL", path: "/brands/postgresql.svg" },
  { name: "MySQL", path: "/brands/mysql.svg" },
  { name: "MongoDB", path: "/brands/mongodb.svg" },
  { name: "Redis", path: "/brands/redis.svg" },
] as const;

function DatabaseSimulation() {
  const [selected, setSelected] = useState<(typeof databaseEngines)[number]["name"]>(databaseEngines[0].name);
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
      <div className="grid grid-cols-2 gap-3" aria-label="Supported database engine examples">
        {databaseEngines.map((engine) => {
          const isSelected = selected === engine.name;
          return (
            <button
              type="button"
              key={engine.name}
              className={cn("flex min-h-24 items-center gap-3 rounded-2xl border p-4 text-left transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5", isSelected ? "border-brand bg-brand-muted" : "border-border-inverse bg-inverse-2 hover:border-brand/40")}
              onClick={() => setSelected(engine.name)}
              aria-pressed={isSelected}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card p-2"><Image src={engine.path} alt="" width={28} height={28} /></span>
              <span><strong className="block text-sm">{engine.name}</strong><small className="mt-1 block text-text-on-inverse-muted">Supported engine</small></span>
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl border border-border-inverse bg-inverse-2 p-5" aria-live="polite">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-bright">Provisioning example</span>
        <h4 className="mt-3 text-lg font-semibold">{selected} on your VPS</h4>
        <ol className="mt-5 space-y-3 text-sm">
          {["Engine selected", "Eligible server confirmed", "Local service example prepared", "Connection context organized"].map((item, index) => (
            <li key={item} className="flex items-center gap-3 text-text-on-inverse-muted"><span className="flex size-7 items-center justify-center rounded-full border border-border-inverse bg-inverse font-mono text-[10px] text-brand-bright">{index + 1}</span><span>{item}</span><Check className="ml-auto size-4 text-brand-bright" aria-hidden="true" /></li>
          ))}
        </ol>
        <p className="mt-5 text-xs leading-5 text-text-on-inverse-muted">Local example only. No server or database is contacted. Engine versions, storage, access, recovery, and plan limits still require validation.</p>
      </div>
    </div>
  );
}

function AccessSimulation({ active }: { active: boolean }) {
  const boundaries = [
    ["Organization role", "UI scope and available actions", KeyRound],
    ["API authorization", "Server-side enforcement boundary", LockKeyhole],
    ["Signed work", "Authenticated agent messages", ShieldCheck],
    ["Outbound agent", "Connection starts from the VPS", Server],
  ] as const;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {boundaries.map(([label, detail, Icon], index) => (
        <motion.div key={label} className="rounded-2xl border border-border-inverse bg-inverse-2 p-5" initial={false} animate={{ opacity: active ? 1 : 0.8, y: active ? 0 : 0 }} transition={{ duration: 0.2, delay: index * 0.04 }}>
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-muted text-brand-bright"><Icon className="size-4" aria-hidden="true" /></span>
          <strong className="mt-5 block text-sm">{label}</strong>
          <span className="mt-1 block text-xs leading-5 text-text-on-inverse-muted">{detail}</span>
        </motion.div>
      ))}
      <p className="sm:col-span-2 text-xs leading-5 text-text-on-inverse-muted">The website simulation demonstrates responsibility boundaries only. It does not authenticate a user or agent, and UI visibility is not a substitute for API authorization.</p>
    </div>
  );
}

function CodeWindow({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border-inverse bg-inverse p-5">
      <div className="flex items-center justify-between border-b border-border-inverse pb-3"><span className="flex items-center gap-2 text-xs font-semibold"><TerminalSquare className="size-4 text-brand-bright" aria-hidden="true" />Activity example</span><span className="text-[10px] text-text-on-inverse-muted">local simulation</span></div>
      <div className="mt-4 space-y-3 font-mono text-xs tabular-nums text-text-on-inverse-muted">
        {lines.map((line, index) => <p key={line} className="flex gap-3"><span className="text-brand-bright">{String(index + 1).padStart(2, "0")}</span><code className="min-w-0 break-words">{line}</code></p>)}
      </div>
    </div>
  );
}
