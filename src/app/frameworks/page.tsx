import type { Metadata } from "next";
import { Boxes, Check } from "lucide-react";
import { EvergreenStage } from "@/components/site/evergreen-stage";
import { ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";
import { visualAssets } from "@/lib/visual-assets";
import { RuntimeShowcase } from "./runtime-showcase";

export const metadata: Metadata = createMetadata("Supported Frameworks and Runtimes — Opslin", "Explore released beta runtime paths and the separately gated Docker Compose production-stack work.", "/frameworks");

export default function FrameworksPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="Frameworks and runtimes" title="Bring the application. Keep its configuration visible." description="Opslin has normal deployment paths for Node.js, Python, Go, PHP, Ruby, Java, Rust, and static sites. Runtime support does not guarantee every repository, version, or native dependency will work without explicit setup." aside={<div className="space-y-3"><span className="site-badge">Verified in repository</span><p className="text-sm leading-6 text-muted-foreground">Build command, start command, port, environment, project structure, and system dependencies still determine compatibility.</p></div>} />
    <ResourceSection eyebrow="Interactive compatibility explorer" title="Select a runtime to see its real configuration boundary." description="Official-color marks identify ecosystems. The descriptions stay conservative and are based on the current deployment surface."><RuntimeShowcase /></ResourceSection>
    <ResourceSection eyebrow="Deployment field" title="One visible path from source to a verified release." description="The artwork is atmospheric; the runtime selector above carries the product truth." tinted><EvergreenStage asset={visualAssets.deployment} caption="Abstract source, build, release, and health-verification stages. No live server is contacted." /></ResourceSection>
    <ResourceSection eyebrow="Docker Compose status" title="Prominent does not mean generally available."><div className="compose-gated-card"><div><Boxes /><span>Docker Compose / production stack</span></div><strong>In development · gated</strong><p>The Yantrix multi-service workflow is separate from normal application deployment. It remains behind a feature gate, has unverified reliability boundaries, and must not be planned as generally available.</p><ul><li><Check />Shown separately from released beta runtimes</li><li><Check />No production-readiness claim</li><li><Check />Developer-provided migrations remain developer-owned</li></ul></div></ResourceSection>
    <ResourceCta title="Bring a project and inspect the workflow." description="Use the browser-only simulation first, then connect a test VPS after checking the project requirements." primaryHref={siteLinks.register} primaryLabel="Start free" secondaryHref="/quick-start" secondaryLabel="Read quick start" />
  </ResourcePage>;
}
