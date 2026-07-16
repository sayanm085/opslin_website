import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/legal-page";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy — Opslin",
  description: "Current public-beta information about Opslin cancellation, billing corrections, and excluded provider charges.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: false, follow: true },
};

export default function RefundPolicyPage() {
  return <LegalPage title="Refund and Cancellation Policy" updated="July 16, 2026" intro="This public-beta policy is intentionally conservative while paid-plan checkout, annual billing, promotional terms, and the final legal policy are reviewed. Confirm the terms shown at checkout before purchasing.">
    <div className="resource-notice"><strong>Review status</strong><div>This page is available for transparency but is not indexed as a final paid-plan policy. Opslin should complete business and legal review before enabling new paid checkout flows.</div></div>
    <LegalSection title="Free access"><p>A free plan does not create a refundable Opslin charge. Your VPS provider, domain registrar, repository host, and other third parties may still charge you separately.</p></LegalSection>
    <LegalSection title="Cancellation"><p>When paid subscriptions are available, use the cancellation control shown in your account or contact support. The effective cancellation date, continued access, and renewal behavior must match the terms displayed at the time of purchase.</p></LegalSection>
    <LegalSection title="Billing errors and duplicates"><p>If you believe Opslin charged you incorrectly or more than once, contact support promptly with the invoice identifier, date, and amount. Do not send full card, bank, or authentication details by email.</p></LegalSection>
    <LegalSection title="Provider and third-party charges"><p>VPS, cloud, bandwidth, domain, repository, payment-conversion, tax, and other third-party charges are separate from Opslin and are not refundable by Opslin. Cancel or remove those resources directly with the relevant provider.</p></LegalSection>
    <LegalSection title="Taxes, promotions, and term-specific rules"><p>Taxes, promotional offers, monthly plans, annual plans, trials, credits, and negotiated contracts may have different rules. The checkout or signed order terms control where they apply, subject to applicable law.</p></LegalSection>
    <LegalSection title="Contact"><p>For a cancellation or billing review, email <a className="font-medium text-brand underline-offset-4 hover:underline" href={`mailto:${siteLinks.contactEmail}`}>{siteLinks.contactEmail}</a> from the address associated with your account.</p></LegalSection>
  </LegalPage>;
}
