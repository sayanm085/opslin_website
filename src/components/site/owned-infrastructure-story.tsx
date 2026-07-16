"use client";

import {
  Activity,
  Check,
  CloudCog,
  Code2,
  KeyRound,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const storyStages = [
  {
    label: "Source approved",
    title: "Choose what should run.",
    description: "Select a repository or source upload, branch, target server, runtime settings, and environment configuration.",
    detail: "main · Node.js · your-vps-01",
    icon: Code2,
  },
  {
    label: "Work authenticated",
    title: "The control plane prepares scoped work.",
    description: "Opslin records the deployment and sends authenticated, time-bounded work through the connected agent channel.",
    detail: "signed · freshness checked · scoped",
    icon: KeyRound,
  },
  {
    label: "Agent receives",
    title: "The Go agent initiates the connection.",
    description: "The persistent connection begins inside the customer VPS, so the agent does not require a public management port.",
    detail: "outbound connection · agent online",
    icon: ShieldCheck,
  },
  {
    label: "Server executes",
    title: "The workload runs on your infrastructure.",
    description: "The connected server performs the requested deployment steps and returns logs, state, and operational results.",
    detail: "build · release · route · certificate",
    icon: Server,
  },
  {
    label: "State verified",
    title: "A healthy release returns with context.",
    description: "Health, deployment history, logs, and server signals remain attached to the resource that produced them.",
    detail: "healthy · release recorded · URL ready",
    icon: Check,
  },
];

export function OwnedInfrastructureStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.25"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduceMotion) return;
    const nextIndex = Math.min(storyStages.length - 1, Math.max(0, Math.floor(value * storyStages.length)));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeStage = storyStages[activeIndex];
  const ActiveIcon = activeStage.icon;
  const progress = activeIndex / (storyStages.length - 1);

  return (
    <section className="story-section" aria-labelledby="story-title">
      <div className="site-container">
        <div className="story-heading-grid">
          <div>
            <p className="site-kicker">Owned infrastructure in motion</p>
            <h2 id="story-title" className="site-heading mt-3">Follow one operation from intent to verified state.</h2>
          </div>
          <p className="site-description">
            Scroll through the real operating boundary: Opslin coordinates the work, the outbound agent carries it, and your VPS runs it.
          </p>
        </div>

        <div ref={containerRef} className="story-scroll-track">
          <div className="story-sticky-panel">
            <div className="story-copy-panel">
              <div className="story-step-meta">
                <span className="font-mono">0{activeIndex + 1}</span>
                <span>{activeStage.label}</span>
              </div>
              <div className="story-active-icon"><ActiveIcon className="size-6" aria-hidden="true" /></div>
              <div aria-live="polite" aria-atomic="true">
                <h3>{activeStage.title}</h3>
                <p>{activeStage.description}</p>
              </div>
              <code>{activeStage.detail}</code>
              <div className="story-step-controls" aria-label="Workflow story stages">
                {storyStages.map((stage, index) => (
                  <button
                    type="button"
                    key={stage.label}
                    onClick={() => setActiveIndex(index)}
                    className={cn(index === activeIndex && "is-active")}
                    aria-label={`Show stage ${index + 1}: ${stage.label}`}
                    aria-current={index === activeIndex ? "step" : undefined}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>

            <div className="story-visual-panel">
              <div className="story-example-label">Interactive architecture example</div>
              <div
                className="story-signal-map"
                style={{ "--story-progress": progress } as CSSProperties}
                role="progressbar"
                aria-label="Infrastructure workflow progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
              >
                <div className="story-signal-line"><span /></div>
                {[
                  ["Developer", Code2],
                  ["Opslin", CloudCog],
                  ["Go agent", ShieldCheck],
                  ["Your VPS", Server],
                  ["Healthy", Check],
                ].map(([label, Icon], index) => {
                  const NodeIcon = Icon as typeof Code2;
                  const reached = index <= activeIndex;
                  return (
                    <div key={label as string} className={cn("story-node", reached && "is-reached", index === activeIndex && "is-active")}>
                      <span className="story-node-icon"><NodeIcon className="size-5" /></span>
                      <strong>{label as string}</strong>
                      <small>{index === 2 ? "Initiates outbound" : index === 3 ? "Workload runs here" : index === 4 ? "State returns" : ""}</small>
                    </div>
                  );
                })}
              </div>

              <div className="story-console">
                <div className="story-console-topbar">
                  <span className="inline-flex items-center gap-2"><TerminalSquare className="size-3.5" />Operation trace</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-brand-bright" />Example</span>
                </div>
                <div className="story-console-lines">
                  {storyStages.slice(0, activeIndex + 1).map((stage, index) => (
                    <p key={stage.label}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Activity className="size-3.5" />
                      <span>{stage.label.toLowerCase()}</span>
                      <Check className="ml-auto size-3.5 text-brand-bright" />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
