"use client";

import { BookOpen, Database, Globe2, Rocket } from "lucide-react";
import { useState } from "react";

const tasks = [
  { id: "deploy", label: "First deploy", icon: Rocket, command: "choose-task --safe-first-deploy", steps: ["Check server prerequisites", "Generate account-specific agent setup", "Deploy a simple application", "Verify health and recovery access"] },
  { id: "domain", label: "Domain & SSL", icon: Globe2, command: "choose-task --domain-and-ssl", steps: ["Select a healthy application", "Add the intended hostname", "Review the required DNS record", "Verify the supported certificate state"] },
  { id: "database", label: "Database", icon: Database, command: "choose-task --database-lifecycle", steps: ["Choose a supported engine", "Confirm target-server capacity", "Provision and record connection context", "Plan backup and restore verification"] },
  { id: "diagnose", label: "Troubleshoot", icon: BookOpen, command: "choose-task --diagnose-deploy", steps: ["Open the failed deployment stage", "Read the first actionable log line", "Check runtime, port, and environment", "Retry only after correcting the cause"] },
] as const;

export function DocsNavigator() {
  const [selected, setSelected] = useState<(typeof tasks)[number]["id"]>(tasks[0].id);

  return (
    <div className="docs-navigator">
      <div className="docs-task-list" role="tablist" aria-label="Documentation tasks">
        {tasks.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" role="tab" aria-selected={selected === id} onClick={() => setSelected(id)}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="docs-command-window">
        <header><i/><i/><i/><span>opslin docs navigator</span></header>
        {tasks.map((task) => (
          <div key={task.id} role="tabpanel" hidden={selected !== task.id}>
            <code>$ {task.command}</code>
            {task.steps.map((step, index) => <p key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</p>)}
            <small>Illustrative navigation only · not an executable command</small>
          </div>
        ))}
      </div>
    </div>
  );
}
