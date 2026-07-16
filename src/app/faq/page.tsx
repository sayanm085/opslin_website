import type { Metadata } from "next";
import { ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = createMetadata("Frequently Asked Questions — Opslin", "Answers about Opslin hosting, VPS ownership, deployment, domains, databases, billing, security, and beta expectations.", "/faq");

const groups = [
  { title: "Product", items: [
    ["What is Opslin?", "Opslin is a managed deployment and infrastructure control plane for applications running on a compatible VPS you choose."],
    ["Does Opslin host my application?", "No. Your application workload runs on your VPS or cloud VM. Opslin provides the dashboard, API control plane, and server agent that coordinate supported operations."],
    ["Who owns and pays for the server?", "You select, own or administer, and pay the infrastructure provider directly. VPS charges are separate from any Opslin plan."],
    ["Does Opslin replace a DevOps engineer?", "No. It automates repetitive deployment and server operations, but architecture, capacity, security, recovery, and production judgment still require responsible ownership."],
  ]},
  { title: "Deployment", items: [
    ["Which runtimes are supported?", "The normal deployment surface includes Node, Python, Go, PHP, Ruby, Java, Rust, and static applications. Project-specific dependencies and commands can still affect compatibility."],
    ["Can I use Docker Compose?", "A production-stack and Compose workflow exists as a gated, in-build surface. It is not presented as generally available on this website."],
    ["What happens when a deployment fails?", "The deployment state and logs remain available so you can identify the failing stage, correct configuration or code, and retry or redeploy. Recorded rollback controls are available for supported release paths."],
  ]},
  { title: "Domains and data", items: [
    ["Can I add my own domain and SSL?", "Yes. Opslin includes custom-domain management, DNS guidance, reverse-proxy configuration, and a supported automatic SSL workflow."],
    ["Which databases are supported?", "The current database surface includes PostgreSQL, MySQL, MongoDB, and Redis. Validate engine version, storage, access, and recovery requirements for your workload."],
    ["Are backups included?", "Do not assume a backup policy from a pricing label. Confirm the exact backup and restore behavior available to your account, and maintain an independent recovery plan for production data."],
  ]},
  { title: "Billing and beta", items: [
    ["Is there a free plan?", "The website shows a free plan for evaluation. Features, limits, and checkout availability should be confirmed on the current pricing and account screens."],
    ["Are taxes included?", "Where applicable, pricing shows the base amount, GST, and resulting total separately so the payable amount is clear."],
    ["What does beta mean?", "The product is live with early customers, but beta features, limits, workflows, and support processes can change as Opslin validates reliability and product fit."],
  ]},
  { title: "Security", items: [
    ["How does the agent connect?", "The lightweight agent initiates its persistent connection from the VPS to the control plane. Opslin uses signed job messages for the agent workflow."],
    ["Does Opslin require administrative access?", "Administrative permission is required during server setup and for the infrastructure operations the agent performs. Connect only servers you own or are explicitly authorized to manage."],
    ["How do I report a vulnerability?", `Do not disclose exploitable details publicly. Email ${siteLinks.contactEmail} with a clear description, affected surface, reproduction steps, and impact.`],
  ]},
];

export default function FaqPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="FAQ" title="Direct answers about the product, its boundaries, and your infrastructure." description="Opslin is designed to reduce operational repetition—not to blur who owns the server, data, security decisions, or provider bill." />
    <ResourceSection title="Common questions" description="Open a question to see the current public answer.">
      <div className="space-y-14">{groups.map((group) => <section key={group.title} className="faq-groups"><h2 className="faq-group-label">{group.title}</h2><div className="faq-list">{group.items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>)}</div>
    </ResourceSection>
    <ResourceCta title="Still deciding if the model fits?" description="Run the simulation, read the workflow, and contact Opslin before connecting a critical server." primaryHref="/demo" primaryLabel="Try interactive demo" secondaryHref="/how-it-works" secondaryLabel="See how it works" />
  </ResourcePage>;
}
