"use client";

import { Check, Database, Globe2, Rocket, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { visualAssets } from "@/lib/visual-assets";

const scenarios = [
  { id: "deployment", title: "Application deployment", icon: Rocket, steps: ["Source and branch selected", "Build configuration inspected", "Release run on connected VPS", "Health result returned"] },
  { id: "domain", title: "Domain and SSL", icon: Globe2, steps: ["Domain attached to application", "Required DNS record shown", "DNS state checked", "Supported certificate workflow coordinated"] },
  { id: "database", title: "Database provisioning", icon: Database, steps: ["Supported engine selected", "Target server confirmed", "Database service created on VPS", "Connection details organized"] },
];

export function DemoScenarios() {
  const [selected, setSelected] = useState(scenarios[0].id);
  const scenario = scenarios.find((item) => item.id === selected)!;
  return <div className="scenario-lab"><div role="tablist" aria-label="Local product simulation scenarios">{scenarios.map(({ id, title, icon: Icon }) => <button type="button" role="tab" aria-selected={id === selected} onClick={() => setSelected(id)} key={id}><Icon />{title}</button>)}</div><section role="tabpanel"><p className="site-kicker">Browser-only scenario</p><h2>{scenario.title}</h2><ol>{scenario.steps.map((step, index) => <li key={step}><span>{index + 1}</span><div><strong>{step}</strong><small>{index === scenario.steps.length - 1 ? "Example complete" : "Example checkpoint"}</small></div><Check /></li>)}</ol><p>No API, repository, DNS provider, agent, server, or database is contacted.</p></section></div>;
}

export function QuickStartChecklist() {
  const items = ["Use a non-critical compatible Linux VPS", "Keep independent provider-console access", "Prepare a small supported application", "Confirm the app port and required environment", "Plan how you will remove the test resources"];
  const [checked, setChecked] = useState<string[]>([]);
  return <section className="readiness-lab"><header><div><p className="site-kicker">Local preparation check</p><h2>{checked.length === items.length ? "Ready to follow the dashboard flow" : `${checked.length} of ${items.length} checked`}</h2></div><span>{Math.round((checked.length/items.length)*100)}%</span></header><div className="readiness-meter"><i style={{ width: `${(checked.length/items.length)*100}%` }} /></div>{items.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])} /><span><Check />{item}</span></label>)}<p>This checklist is stored only in the current browser state and does not verify a real server.</p></section>;
}

export function VpsReadiness() {
  const requirements = ["Maintained Linux environment", "Public IP and required networking", "Authorized administrative access", "Workload-sized CPU and memory", "Durable storage with growth headroom", "Independent provider recovery access"];
  const [checked, setChecked] = useState<string[]>([]);
  return <div className="vps-readiness"><div className="vps-server-anatomy"><Image src={visualAssets.serverNode.path} alt="" width={visualAssets.serverNode.width} height={visualAssets.serverNode.height} sizes="(max-width: 900px) 60vw, 22rem" /><span>Customer-controlled VPS</span>{requirements.map((item,index)=><i key={item} style={{ transform:`rotate(${index*60}deg) translateY(-5.7rem)` }}><b style={{ transform:`rotate(-${index*60}deg)` }}>{index+1}</b></i>)}</div><section className="readiness-lab"><header><div><p className="site-kicker">Interactive preflight</p><h2>{checked.length === requirements.length ? "Prerequisites reviewed" : "Review the compatibility boundary"}</h2></div><span>{checked.length}/{requirements.length}</span></header>{requirements.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current,item])} /><span><ShieldCheck />{item}</span></label>)}<p>Passing this local checklist is not provider certification or a real compatibility test.</p></section></div>;
}

export type FaqGroup = { title: string; items: string[][] };
export function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState(""); const [category,setCategory]=useState("All");
  const filtered=useMemo(()=>groups.map(group=>({...group,items:group.items.filter(([q,a])=>(category==="All"||category===group.title)&&`${q} ${a}`.toLowerCase().includes(query.toLowerCase()))})).filter(group=>group.items.length),[groups,query,category]);
  return <div className="faq-explorer"><div className="faq-tools"><label><Search /><span className="sr-only">Search questions</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search product, deployment, billing…" /></label><div role="tablist" aria-label="FAQ categories">{["All",...groups.map(group=>group.title)].map(item=><button type="button" role="tab" aria-selected={category===item} onClick={()=>setCategory(item)} key={item}>{item}</button>)}</div></div><div className="space-y-12">{filtered.map(group=><section key={group.title} className="faq-groups"><h2 className="faq-group-label">{group.title}</h2><div className="faq-list">{group.items.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>)}{!filtered.length?<p className="faq-empty">No public answer matches that search. Try a broader term.</p>:null}</div></div>;
}
