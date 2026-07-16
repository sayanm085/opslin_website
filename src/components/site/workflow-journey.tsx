"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Boxes, Check, CloudCog, GitBranch, Globe2, MonitorDot, Server } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { EvergreenStage } from "@/components/site/evergreen-stage";
import { visualAssets } from "@/lib/visual-assets";

type JourneyVisual = "controlPlane" | "deployment" | "observability" | "security" | "workflow";
type JourneyIcon = "server" | "source" | "deploy" | "domain" | "observe" | "control";

export type JourneyStep = {
  title: string;
  description: string;
  items: string[];
  visual: JourneyVisual;
  icon: JourneyIcon;
  state: {
    label: string;
    nodes: [string, string, string];
    lines: [string, string];
  };
};

const icons = {
  server: Server,
  source: GitBranch,
  deploy: Boxes,
  domain: Globe2,
  observe: MonitorDot,
  control: CloudCog,
} satisfies Record<JourneyIcon, typeof Server>;

const journeyAssets = {
  controlPlane: visualAssets.controlPlane,
  deployment: visualAssets.deployment,
  observability: visualAssets.observability,
  security: visualAssets.security,
  workflow: visualAssets.workflow,
} satisfies Record<JourneyVisual, (typeof visualAssets)[JourneyVisual]>;

export function WorkflowJourney({ steps }: { steps: JourneyStep[] }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
    }, { rootMargin: "-32% 0px -42%", threshold: [0, 0.3, 0.65] });
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (!steps.length) return null;

  const activeStep = steps[active] ?? steps[0];
  const progressStyle = {
    "--journey-progress": `${(active + 1) / steps.length}`,
  } as CSSProperties;

  return (
    <div className="workflow-journey">
      <aside className="workflow-journey-sticky">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="workflow-active-visual"
            key={`${activeStep.visual}-${active}`}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <EvergreenStage asset={journeyAssets[activeStep.visual]}>
              <div className="workflow-art-hotspots" aria-hidden="true">
                {activeStep.state.nodes.map((node) => <span key={node}>{node}</span>)}
              </div>
            </EvergreenStage>
            <div className="workflow-stage-console" role="status" aria-live="polite">
              <div>
                <span>Illustrative local state</span>
                <strong>{activeStep.state.label}</strong>
              </div>
              {activeStep.state.lines.map((line, index) => (
                <p key={line}><span>0{index + 1}</span>{line}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="workflow-journey-progress">
          <div className="workflow-progress-meta">
            <span>Stage {active + 1} of {steps.length}</span>
            <span>{Math.round(((active + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="workflow-progress-track" aria-hidden="true"><i style={progressStyle} /></div>
          <strong>{activeStep.title}</strong>
          <div className="workflow-stage-nav" aria-label="Workflow stages">
            {steps.map((step, index) => (
              <button
                type="button"
                key={step.title}
                aria-label={`Go to stage ${index + 1}: ${step.title}`}
                aria-current={active === index ? "step" : undefined}
                onClick={() => {
                  setActive(index);
                  refs.current[index]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
                }}
              >
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="workflow-journey-steps">
        {steps.map((step, index) => {
          const Icon = icons[step.icon];
          return (
            <article
              key={step.title}
              data-index={index}
              ref={(node) => { refs.current[index] = node; }}
              className={active === index ? "active" : ""}
              aria-current={active === index ? "step" : undefined}
            >
              <div className="workflow-step-heading">
                <span>0{index + 1}</span>
                <span><Icon aria-hidden="true" /></span>
                <small>{step.state.label}</small>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul>{step.items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
