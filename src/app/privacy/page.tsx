import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/legal-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("Privacy Policy — Opslin", "How Opslin processes account, infrastructure, operational, and billing data.", "/privacy");

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="April 26, 2026" intro="This policy explains the information Opslin needs to operate its deployment control plane and how that information is handled.">
      <LegalSection title="Data we process"><p>Opslin stores account details, organization membership, server metadata, deployment records, billing plan state, and operational logs needed to run the platform.</p></LegalSection>
      <LegalSection title="GitHub and infrastructure access"><p>Repository access is limited to the GitHub App installation permissions granted by the user. Server access is handled through the Opslin agent token and encrypted platform credentials.</p></LegalSection>
      <LegalSection title="Payments"><p>Paid plan checkout is handled by Razorpay. Opslin records subscription and invoice metadata, including base amount, GST, total amount, payment status, and invoice identifiers.</p></LegalSection>
      <LegalSection title="Retention and rights"><p>Organization owners may request data export or deletion by contacting support. Operational audit records may be retained where required for security, abuse prevention, or tax compliance.</p></LegalSection>
    </LegalPage>
  );
}
