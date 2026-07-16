"use client";

import { Check, Code2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/site/brand-mark";
import { runtimeAssets, type BrandAsset } from "@/lib/brand-assets";

export type RuntimeStatus = "available-beta" | "in-development-gated";

type Runtime = {
  asset: BrandAsset;
  title: string;
  status: RuntimeStatus;
  description: string;
  examples: string[];
  expectations: string[];
};

const details: Runtime[] = ([
  ["node", "Node.js", "Node services and common web-framework projects with explicit build, start, port, and environment configuration.", ["Next.js", "Express / Fastify", "NestJS"], ["Declare the production start command", "Confirm the listening port"]],
  ["python", "Python", "Python web applications using project-defined dependency and start conventions.", ["Django", "Flask", "FastAPI"], ["Provide the start command", "Include required system dependencies"]],
  ["go", "Go", "Go modules compiled for a web service or API and started on the target VPS.", ["Go modules", "HTTP APIs", "Compiled services"], ["Expose the expected port", "Keep platform-specific build needs explicit"]],
  ["php", "PHP", "PHP projects and common framework structures with environment configuration.", ["PHP applications", "Laravel", "Custom web roots"], ["Confirm the web root", "Provide environment configuration"]],
  ["ruby", "Ruby", "Ruby web services using framework or process-file conventions.", ["Rails", "Rack", "Sinatra"], ["Declare the web process", "Confirm native dependency needs"]],
  ["java", "Java", "JAR-based services and Maven or Gradle project workflows with a configured start command.", ["JAR services", "Maven", "Gradle"], ["Select the correct runtime version", "Confirm memory requirements"]],
  ["rust", "Rust", "Cargo projects compiled into web services and run with explicit runtime configuration.", ["Cargo projects", "Compiled APIs", "Web services"], ["Declare the binary", "Confirm system library needs"]],
] as Array<[string, string, string, string[], string[]]>).map(([id, title, description, examples, expectations]) => ({ asset: runtimeAssets.find((asset) => asset.id === id)!, title, status: "available-beta" as const, description, examples, expectations }));

const staticRuntime: Runtime = {
  asset: { id: "static", name: "Static", monogram: "</>", sourceUrl: "", accessibleLabel: "Static site", trademarkStatus: "generic mark" },
  title: "Static sites", status: "available-beta", description: "Static HTML and generated front-end output served from the connected server.", examples: ["HTML / CSS / JavaScript", "Generated static output", "Custom domain workflow"], expectations: ["Select the correct output directory", "Confirm client-side routing needs"],
};

const composeRuntime: Runtime = {
  asset: runtimeAssets.find((asset) => asset.id === "docker")!, title: "Docker Compose / production stack", status: "in-development-gated", description: "A separate multi-service production-stack workflow is being built and remains gated. It is not generally available or equivalent to the released normal deployment paths.", examples: ["Linked services", "Health checkpoints", "Developer-provided migrations"], expectations: ["Do not plan production adoption yet", "Availability and reliability remain unverified"],
};

const runtimes = [...details, staticRuntime, composeRuntime];

export function RuntimeSelector() {
  const [selected, setSelected] = useState(runtimes[0].asset.id);
  const runtime = runtimes.find((item) => item.asset.id === selected) ?? runtimes[0];
  return (
    <div className="runtime-selector">
      <div className="runtime-tabs" role="tablist" aria-label="Supported runtime targets">
        {runtimes.map((item) => <button key={item.asset.id} type="button" role="tab" aria-selected={selected === item.asset.id} onClick={() => setSelected(item.asset.id)} className="runtime-tab"><BrandMark asset={item.asset} /><span className={`runtime-status-dot ${item.status}`} aria-label={item.status === "available-beta" ? "Available in beta" : "In development and gated"} /></button>)}
      </div>
      <section className="runtime-panel" role="tabpanel">
        <div className="runtime-panel-heading"><BrandMark asset={runtime.asset} /><span className={`runtime-status ${runtime.status}`}>{runtime.status === "available-beta" ? <><Check />Available beta path</> : <><LockKeyhole />In development · gated</>}</span></div>
        <h2>{runtime.title}</h2><p>{runtime.description}</p>
        <div className="runtime-panel-grid"><div><strong>Common project shapes</strong>{runtime.examples.map((item) => <span key={item}><Code2 />{item}</span>)}</div><div><strong>Keep explicit</strong>{runtime.expectations.map((item) => <span key={item}><Check />{item}</span>)}</div></div>
      </section>
    </div>
  );
}
