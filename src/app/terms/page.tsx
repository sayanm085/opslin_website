import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/legal-page";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("Terms of Service — Opslin", "Terms for authorized use of the Opslin deployment control plane.", "/terms");

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="April 26, 2026" intro="These terms govern authorized use of Opslin and the responsibilities that remain with the infrastructure owner.">
      <LegalSection title="Use of Opslin"><p>Opslin is a deployment control plane for authorized infrastructure. Users are responsible for connecting only servers, repositories, and domains they are allowed to manage.</p></LegalSection>
      <LegalSection title="Billing"><p>Free and Starter beta trial plans do not open Razorpay checkout. Pro and Business plans are charged at the displayed GST-inclusive totals, with base amount and GST shown separately on invoices.</p></LegalSection>
      <LegalSection title="Availability"><p>Platform availability depends on the Opslin control plane, connected servers, network access, and third-party services including GitHub, Cloudflare, and Razorpay.</p></LegalSection>
      <LegalSection title="Security"><p>Users must keep credentials private, rotate compromised secrets, and remove access for team members who no longer require platform access.</p></LegalSection>
    </LegalPage>
  );
}
