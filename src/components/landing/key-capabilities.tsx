"use client";

import { ArrowRight, Database, GitBranch, Lock, RotateCcw, Server } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const capabilities = [
  {
    value: "deploy",
    tab: "Deploy",
    title: "Git push deployment flow",
    copy: "Connect GitHub or paste a Git URL, then move from build to live without hand-maintained server scripts.",
    icon: GitBranch,
    metrics: ["Build", "Deploy", "Live"],
  },
  {
    value: "monitor",
    tab: "Monitor",
    title: "Logs and metrics dashboard",
    copy: "Watch deploy output, runtime logs, CPU, memory, and health checks from the same operations surface.",
    icon: Server,
    metrics: ["Logs", "Metrics", "Alerts"],
  },
  {
    value: "secure",
    tab: "Secure",
    title: "SSL, firewall, and agent security",
    copy: "Use outbound-only agent connectivity, automated SSL, and firewall controls without exposing a management port.",
    icon: Lock,
    metrics: ["SSL", "Firewall", "Outbound"],
  },
  {
    value: "scale",
    tab: "Scale",
    title: "Multi-server, multi-app management",
    copy: "Keep several apps and servers organized while retaining the ownership model of your own infrastructure.",
    icon: Database,
    metrics: ["Apps", "Servers", "Teams"],
  },
  {
    value: "recover",
    tab: "Recover",
    title: "Rollback and backup features",
    copy: "Recover from failed deployments and restore important database state without rebuilding your runbook.",
    icon: RotateCcw,
    metrics: ["Rollback", "Backups", "History"],
  },
];

function CapabilityPanel({
  title,
  copy,
  icon: Icon,
  metrics,
}: {
  title: string;
  copy: string;
  icon: typeof GitBranch;
  metrics: string[];
}) {
  return (
    <div className="landing-card grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Opslin</p>
              <p className="text-xs text-zinc-500">Capability preview</p>
            </div>
          </div>
          <span className="landing-badge">Live</span>
        </div>
        <div className="mt-5 grid gap-3">
          {metrics.map((metric, index) => (
            <div key={metric} className="rounded-xl border border-zinc-800 bg-[#111111] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">{metric}</span>
                <span className="text-xs text-green-400">0{index + 1}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-zinc-800">
                <div
                  className="h-1.5 rounded-full bg-green-500"
                  style={{ width: `${70 + index * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="landing-label mb-3">Launch-ready operations</p>
        <h3 className="text-3xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">{copy}</p>
        <a href="#features" className="landing-link mt-6">
          Learn More
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}

export function KeyCapabilities() {
  return (
    <section className="landing-dark landing-section border-b border-white/10">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Key capabilities</p>
          <h2 className="landing-heading mx-auto">Launch-ready control without manual operations.</h2>
          <p className="landing-description mx-auto mt-4">
            The core workflows are organized into focused surfaces so teams can deploy, monitor,
            secure, scale, and recover from one dashboard.
          </p>
        </div>

        <Tabs defaultValue="deploy" className="mt-12">
          <TabsList className="mx-auto h-auto flex-wrap rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur">
            {capabilities.map((capability) => (
              <TabsTrigger
                key={capability.value}
                value={capability.value}
                className="rounded-full px-5 py-2 text-zinc-400 focus-visible:ring-2 focus-visible:ring-green-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                {capability.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            {capabilities.map((capability) => (
              <TabsContent key={capability.value} value={capability.value}>
                <CapabilityPanel {...capability} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Reveal>
    </section>
  );
}
