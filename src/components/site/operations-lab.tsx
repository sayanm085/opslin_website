"use client";

import {
  Activity,
  Check,
  Database,
  Globe2,
  RotateCcw,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const views = [
  { id: "health", label: "Health", icon: Activity },
  { id: "logs", label: "Logs", icon: TerminalSquare },
  { id: "domains", label: "Domains", icon: Globe2 },
  { id: "database", label: "Database", icon: Database },
] as const;

type ViewId = (typeof views)[number]["id"];

export function OperationsLab() {
  const [activeView, setActiveView] = useState<ViewId>("health");

  return (
    <section className="operations-lab" aria-label="Interactive post-deployment operations example">
      <div className="operations-lab-sidebar">
        <div>
          <span className="operations-lab-eyebrow"><span className="live-pulse" />Interactive example</span>
          <h3>api-service</h3>
          <p>your-vps-01 · main</p>
        </div>
        <div className="operations-lab-nav" role="tablist" aria-label="Operations examples">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={activeView === view.id}
                key={view.id}
                className={cn(activeView === view.id && "is-active")}
                onClick={() => setActiveView(view.id)}
              >
                <Icon className="size-4" />
                {view.label}
              </button>
            );
          })}
        </div>
        <div className="operations-lab-release">
          <Check className="size-4" />
          <span><strong>Release healthy</strong><small>Example state</small></span>
        </div>
      </div>

      <div className="operations-lab-content">
        {activeView === "health" ? <HealthPanel /> : null}
        {activeView === "logs" ? <LogsPanel /> : null}
        {activeView === "domains" ? <DomainsPanel /> : null}
        {activeView === "database" ? <DatabasePanel /> : null}
      </div>
    </section>
  );
}

function HealthPanel() {
  return (
    <div role="tabpanel" className="operations-panel">
      <PanelHeader title="Application and server health" description="Illustrative values show how operational context can remain attached to a release." />
      <div className="operations-stat-grid">
        {[["CPU", "42%", "Normal"], ["Memory", "61%", "Normal"], ["Disk", "28%", "Normal"]].map(([label, value, status]) => (
          <div key={label} className="operations-stat-card"><span>{label}</span><strong>{value}</strong><small><Check className="size-3" />{status}</small></div>
        ))}
      </div>
      <div className="operations-chart-card">
        <div className="flex items-center justify-between"><span className="text-xs font-semibold">Resource history</span><span className="text-[10px] text-muted-foreground">Example · last 30 min</span></div>
        <svg viewBox="0 0 720 210" role="img" aria-label="Illustrative CPU and memory history chart">
          <path className="operations-grid-line" d="M0 45H720 M0 105H720 M0 165H720" />
          <path className="operations-area" d="M0 160 C55 142 80 82 132 106 S210 174 268 118 S345 66 402 112 S485 158 540 80 S632 52 720 76 L720 210 L0 210 Z" />
          <path className="operations-line" d="M0 160 C55 142 80 82 132 106 S210 174 268 118 S345 66 402 112 S485 158 540 80 S632 52 720 76" />
          <path className="operations-line-secondary" d="M0 132 C72 128 96 148 164 130 S254 92 332 116 S426 146 494 120 S610 88 720 102" />
        </svg>
      </div>
    </div>
  );
}

function LogsPanel() {
  const lines = [
    ["14:21:08", "INFO", "release container started"],
    ["14:21:09", "INFO", "nginx route prepared"],
    ["14:21:11", "INFO", "local health check returned 200"],
    ["14:21:12", "DONE", "release marked healthy"],
  ];
  return (
    <div role="tabpanel" className="operations-panel">
      <PanelHeader title="Logs with deployment context" description="Filter example events without leaving the application or release you are investigating." />
      <div className="operations-log-toolbar"><span>All events</span><span>Follow enabled</span></div>
      <div className="operations-log-view" aria-live="polite">
        {lines.map(([time, level, message]) => <p key={message}><time>{time}</time><span className={level === "DONE" ? "is-done" : ""}>{level}</span><code>{message}</code></p>)}
      </div>
      <div className="operations-inline-action"><RotateCcw className="size-4" /><span><strong>Release history remains available</strong><small>Rollback is a controlled action with application and migration limitations.</small></span></div>
    </div>
  );
}

function DomainsPanel() {
  return (
    <div role="tabpanel" className="operations-panel">
      <PanelHeader title="Routing and certificate state" description="Keep the domain, reverse-proxy target, certificate, and application health in one view." />
      <div className="operations-domain-map">
        <div><Globe2 className="size-5" /><span><strong>api.example.com</strong><small>Customer-controlled DNS</small></span></div>
        <span className="operations-domain-link"><i /></span>
        <div><ShieldCheck className="size-5" /><span><strong>Certificate active</strong><small>Illustrative state</small></span></div>
        <span className="operations-domain-link"><i /></span>
        <div><Server className="size-5" /><span><strong>api-service:3000</strong><small>Target on your VPS</small></span></div>
      </div>
      <div className="operations-responsibility-note"><ShieldCheck className="size-4" /><p><strong>Shared responsibility:</strong> the customer owns the domain and correct DNS records; Opslin coordinates supported routing and certificate workflows.</p></div>
    </div>
  );
}

function DatabasePanel() {
  return (
    <div role="tabpanel" className="operations-panel">
      <PanelHeader title="Database beside the application" description="Provision supported engines on an eligible connected server and keep connection context near the workload." />
      <div className="operations-db-grid">
        {[["PostgreSQL", "Available"], ["MySQL", "Available"], ["MongoDB", "Available"], ["Redis", "Available"]].map(([name, status]) => (
          <div key={name}><Database className="size-5 text-brand" /><span><strong>{name}</strong><small>{status} · plan limits apply</small></span><Check className="ml-auto size-4 text-success-text" /></div>
        ))}
      </div>
      <div className="operations-query-preview"><span>Read-only example</span><code>SELECT status FROM releases LIMIT 10;</code></div>
    </div>
  );
}

function PanelHeader({ title, description }: { title: string; description: string }) {
  return <div className="operations-panel-header"><div><p className="site-kicker">Operate after deployment</p><h3>{title}</h3><p>{description}</p></div><span><Activity className="size-3.5" />Example data</span></div>;
}
