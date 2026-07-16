"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const steps = [
  { title: "Create and verify your account", description: "Register, verify your email, and enter the Opslin dashboard.", expected: "The dashboard loads for your organization.", recovery: "Complete email verification before creating resources." },
  { title: "Prepare a test VPS", description: "Confirm the operating system, public IP, administrative access, firewall policy, free disk space, and provider-console access.", expected: "You can administer the server directly.", recovery: "Keep recovery access independent from Opslin." },
  { title: "Add the server", description: "Create a server entry and follow the dashboard-generated agent installation flow. The instructions are bound to the server you are connecting.", expected: "Server state changes to connected or online.", recovery: "If offline, review outbound networking, permissions, time, and agent service logs." },
  { title: "Configure a simple application", description: "Select the source and branch, confirm the detected runtime, set the application port, and add only the environment variables the app needs.", expected: "Build and start settings match the repository.", recovery: "Do not commit secrets into the source repository." },
  { title: "Deploy and verify", description: "Start the deployment, follow each stage, inspect logs, and wait for a healthy application state before adding production traffic.", expected: "Deployment completes and health checks pass.", recovery: "Test the application URL and review logs before adding DNS and SSL." },
] as const;

export function QuickStartStepper() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="quick-start-stepper">
      <ol className="quick-start-step-list" aria-label="Quick-start stages">
        {steps.map((item, index) => (
          <li key={item.title}>
            <button type="button" aria-current={index === active ? "step" : undefined} onClick={() => setActive(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.title}</b>
            </button>
          </li>
        ))}
      </ol>
      <section className="quick-start-step-panel" aria-live="polite">
        <p className="site-kicker">Step {active + 1} of {steps.length}</p>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        <div className="quick-start-result">
          <span><Check aria-hidden="true" />Expected result</span>
          <strong>{step.expected}</strong>
          <small>{step.recovery}</small>
        </div>
        <div className="quick-start-controls">
          <button type="button" onClick={() => setActive((value) => Math.max(0, value - 1))} disabled={active === 0}><ChevronLeft />Previous</button>
          <button type="button" onClick={() => setActive((value) => Math.min(steps.length - 1, value + 1))} disabled={active === steps.length - 1}>Next<ChevronRight /></button>
        </div>
      </section>
    </div>
  );
}
