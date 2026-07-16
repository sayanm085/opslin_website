"use client";

import { Check, Circle, Cloud, Code2, Globe2, Pause, Play, RefreshCw, Server, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const stages = [
  { label: "Source", detail: "Repository connected", icon: Code2, log: "main branch selected" },
  { label: "Server", detail: "Agent is online", icon: Server, log: "outbound agent authenticated" },
  { label: "Build", detail: "Runtime detected", icon: Cloud, log: "node runtime detected" },
  { label: "Edge", detail: "Domain configured", icon: Globe2, log: "nginx route prepared" },
  { label: "Secure", detail: "Certificate ready", icon: ShieldCheck, log: "ssl certificate issued" },
  { label: "Live", detail: "Health check passed", icon: Check, log: "release marked healthy" },
];

export function WorkflowSimulator({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(() => (reduceMotion ? stages.length - 1 : 0));
  const [playing, setPlaying] = useState(() => !reduceMotion);

  useEffect(() => {
    if (!playing || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= stages.length - 1) {
          window.clearInterval(timer);
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1150);

    return () => window.clearInterval(timer);
  }, [playing, reduceMotion]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const progress = ((activeIndex + 1) / stages.length) * 100;
  const visibleLogs = useMemo(() => stages.slice(0, activeIndex + 1), [activeIndex]);

  const restart = () => {
    if (reduceMotion) {
      setActiveIndex(stages.length - 1);
      return;
    }
    setActiveIndex(0);
    setPlaying(true);
  };

  return (
    <section className={cn("workflow-simulator", compact && "workflow-simulator-compact")} aria-label="Interactive deployment workflow">
      <div className="workflow-toolbar">
        <div className="flex min-w-0 items-center gap-3">
          <span className="live-pulse" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-inverse">api.opslin-demo.app</p>
            <p className="truncate text-xs text-text-on-inverse-muted">main · production · your-vps-01</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="workflow-control"
            onClick={() => setPlaying((current) => !current)}
            disabled={Boolean(reduceMotion) || activeIndex === stages.length - 1}
            aria-label={playing ? "Pause deployment simulation" : "Continue deployment simulation"}
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <button type="button" className="workflow-control" onClick={restart} aria-label="Replay deployment simulation">
            <RefreshCw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="workflow-progress" aria-hidden="true">
        <span style={{ "--workflow-progress": `${progress / 100}` } as CSSProperties} />
      </div>

      <div className="workflow-body">
        <ul className="workflow-stages" aria-label="Deployment stages">
          {stages.map((stage, index) => {
            const complete = index < activeIndex;
            const active = index === activeIndex;
            const Icon = stage.icon;
            return (
              <li key={stage.label}>
                <button
                  type="button"
                  className={cn("workflow-stage", complete && "is-complete", active && "is-active")}
                  onClick={() => {
                    setActiveIndex(index);
                    setPlaying(false);
                  }}
                  aria-current={active ? "step" : undefined}
                >
                  <span className="workflow-stage-icon">
                    {complete ? <Check className="size-4" aria-hidden="true" /> : <Icon className="size-4" aria-hidden="true" />}
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-semibold">{stage.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{stage.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="workflow-terminal" aria-live="polite">
          <div className="flex items-center justify-between border-b border-border-inverse pb-3">
            <span className="site-kicker text-text-on-inverse-muted">Deployment activity</span>
            <span className="status-pill">
              <Circle className="size-2 fill-current" aria-hidden="true" />
              {activeIndex === stages.length - 1 ? "Healthy" : playing ? "Running" : "Paused"}
            </span>
          </div>
          <div className="mt-4 space-y-2 font-mono text-xs leading-5 text-text-on-inverse-muted">
            {visibleLogs.map((stage, index) => (
              <p key={stage.label} className="workflow-log-line">
                <span className="text-brand-bright">{String(index + 1).padStart(2, "0")}</span>
                <span>{stage.log}</span>
                <Check className="ml-auto size-3.5 text-brand-bright" aria-label="complete" />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
