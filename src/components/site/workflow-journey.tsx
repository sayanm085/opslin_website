"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EvergreenStage } from "@/components/site/evergreen-stage";
import { visualAssets } from "@/lib/visual-assets";

export type JourneyStep = { title: string; description: string; items: string[] };

export function WorkflowJourney({ steps }: { steps: JourneyStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
    }, { rootMargin: "-35% 0px -42%", threshold: [0, .3, .65] });
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <div className="workflow-journey">
    <aside className="workflow-journey-sticky"><EvergreenStage asset={visualAssets.workflow} /><div className="workflow-progress"><span>Stage {active + 1} of {steps.length}</span><div><i style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div><strong>{steps[active].title}</strong></div></aside>
    <div className="workflow-journey-steps">{steps.map((step, index) => <article key={step.title} data-index={index} ref={(node) => { refs.current[index] = node; }} className={active === index ? "active" : ""}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p><ul>{step.items.map((item) => <li key={item}><Check />{item}</li>)}</ul></article>)}</div>
  </div>;
}
