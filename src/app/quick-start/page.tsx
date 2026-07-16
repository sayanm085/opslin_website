import type { Metadata } from "next";
import { CheckList, Notice, ResourceCta, ResourceHero, ResourcePage, ResourceSection } from "@/components/site/resource-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";
import { QuickStartChecklist } from "@/components/site/interactive-labs";
import { QuickStartStepper } from "@/components/site/quick-start-stepper";

export const metadata: Metadata = createMetadata("Quick Start — Deploy with Opslin", "Prepare a compatible test VPS, connect the Opslin agent, and deploy a first application with clear verification steps.", "/quick-start");

export default function QuickStartPage() {
  return <ResourcePage>
    <ResourceHero eyebrow="Quick start" title="Deploy a first application without guessing what success looks like." description="Use a non-critical test VPS and a simple supported application. The dashboard will provide the account-specific installation and deployment controls." aside={<><strong className="text-foreground">Before you begin</strong><CheckList items={["An Opslin account with verified email", "A compatible Linux VPS with a public IP", "Administrative access and provider recovery access", "A small application repository you are authorized to deploy"]} /></>} />
    <ResourceSection eyebrow="Preparation lab" title="Confirm the safe starting boundary." description="This browser-only checklist does not inspect infrastructure or save credentials." tinted><QuickStartChecklist /></ResourceSection>
    <ResourceSection eyebrow="Guided setup" title="Five steps to a verifiable first release." description="Do not paste generic agent tokens or credentials from a website. Generate the current, server-specific flow inside your authenticated dashboard.">
      <QuickStartStepper />
    </ResourceSection>
    <ResourceSection eyebrow="Safe finish" title="Know how to stop and clean up." description="A quick start should never leave forgotten infrastructure or unexpected third-party charges." tinted>
      <div className="resource-grid-two">
        <Notice title="Common first-deploy errors">Check the selected branch, runtime version, build/start commands, application port, required environment variables, server capacity, DNS propagation, and the exact failing log line.</Notice>
        <Notice title="Cleanup">Remove test application resources from Opslin, uninstall or revoke the agent connection when the server is no longer used, and delete the VPS through your provider if you do not want continuing provider charges.</Notice>
      </div>
    </ResourceSection>
    <ResourceCta title="Use the dashboard-generated setup flow." description="It contains the current, account-specific instructions and avoids publishing reusable credentials or stale commands." primaryHref={siteLinks.register} primaryLabel="Create account" secondaryHref="/demo" secondaryLabel="Try simulation first" />
  </ResourcePage>;
}
