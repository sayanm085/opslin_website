import type { Metadata } from "next";
import { Braces, Coffee, Code2, FileCode2, Gem, Layers3, TerminalSquare, Workflow } from "lucide-react";
import { CheckList, Notice, ResourceCard, ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = createMetadata("Supported Frameworks and Runtimes — Opslin", "Explore the application runtimes Opslin can deploy to a compatible Linux VPS.", "/frameworks");

const runtimes = [
  { icon: Braces, title: "JavaScript & TypeScript", description: "Node.js applications and common Node-based web frameworks.", items: ["Node.js services", "Next.js and React projects", "Express, Fastify, and NestJS applications"] },
  { icon: FileCode2, title: "Python", description: "Python web applications with explicit runtime and port settings.", items: ["Django", "Flask", "FastAPI"] },
  { icon: TerminalSquare, title: "Go", description: "Go web applications and APIs compiled and released to the target server.", items: ["Go modules", "Web services and APIs", "Configurable application port"] },
  { icon: Code2, title: "PHP", description: "PHP applications, including common framework project structures.", items: ["PHP projects", "Laravel applications", "Environment configuration"] },
  { icon: Gem, title: "Ruby", description: "Ruby web services with framework or process-file conventions.", items: ["Rails", "Rack and Sinatra", "Procfile-aware web commands"] },
  { icon: Coffee, title: "Java", description: "Java application builds and runtime commands configured for your project.", items: ["JAR-based services", "Maven or Gradle project workflows", "Configurable start command"] },
  { icon: Workflow, title: "Rust", description: "Rust services built from the selected source and run on your VPS.", items: ["Cargo projects", "Compiled web services", "Runtime environment variables"] },
  { icon: Layers3, title: "Static sites", description: "Static HTML and generated front-end output served from your server.", items: ["HTML, CSS, and JavaScript", "Generated static output", "Custom domain and SSL workflow"] },
];

export default function FrameworksPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="Frameworks" title="Deploy the runtime your application actually uses." description="Opslin supports common web application runtimes and static sites through a consistent deployment workflow on your compatible Linux VPS." aside={<><span className="site-badge">Verified in repository</span><p className="mt-4">Node, Python, Go, PHP, Ruby, Java, Rust, and static application paths are present in the working deployment surface.</p></>} />
    <ResourceSection eyebrow="Application support" title="Framework-aware, with controls left visible." description="Detection can accelerate setup, while build commands, start commands, ports, and environment variables remain explicit.">
      <div className="resource-grid">{runtimes.map((runtime) => <ResourceCard key={runtime.title} icon={runtime.icon} title={runtime.title} description={runtime.description}><CheckList items={runtime.items} /></ResourceCard>)}</div>
    </ResourceSection>
    <ResourceSection eyebrow="Set expectations" title="Compatibility still depends on the project." description="Language support does not make every repository deployable without configuration." tinted>
      <div className="resource-grid-two">
        <Notice title="Project-specific settings matter">Monorepos, native dependencies, private packages, unusual build systems, and custom network requirements may need explicit commands or additional setup.</Notice>
        <Notice title="Production-stack workflow is separate">Multi-service Docker Compose deployment is an in-build, gated surface and is not marketed here as generally available.</Notice>
      </div>
    </ResourceSection>
    <ResourceCta title="Bring a project and inspect the workflow." description="Start with the interactive simulation, then connect a test VPS when the project requirements are understood." primaryHref={siteLinks.register} primaryLabel="Start free" secondaryHref="/quick-start" secondaryLabel="Read quick start" />
  </ResourcePage>;
}
