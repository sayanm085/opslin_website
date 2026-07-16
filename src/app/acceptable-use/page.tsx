import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/legal-page";
import { createMetadata } from "@/lib/metadata";
import { siteLinks } from "@/lib/site-links";

export const metadata: Metadata = createMetadata("Acceptable Use Policy — Opslin", "Rules for authorized, lawful, and responsible use of Opslin and connected infrastructure.", "/acceptable-use");

export default function AcceptableUsePage() {
  return <LegalPage title="Acceptable Use Policy" updated="July 16, 2026" intro="Use Opslin only with infrastructure, repositories, domains, and data you own or are explicitly authorized to administer. This policy protects customers, providers, and the wider internet from misuse.">
    <LegalSection title="Prohibited activity"><p>You may not use Opslin or connected infrastructure to create, distribute, operate, or facilitate malware, phishing, credential theft, botnets, exploit hosting, unauthorized access, denial-of-service or resource attacks, spam, or other abusive activity.</p><p>Illegal content, copyright infringement, abuse of third-party infrastructure, and attempts to interfere with Opslin, another customer, or a provider are prohibited. Cryptocurrency mining is prohibited where it violates an Opslin plan, provider terms, applicable law, or an explicit platform restriction.</p></LegalSection>
    <LegalSection title="Authorized access"><p>Connect only servers, repositories, accounts, and networks you are permitted to control. Do not probe, access, monitor, or modify another party’s systems without documented authorization.</p></LegalSection>
    <LegalSection title="Credentials and security"><p>You are responsible for protecting account credentials, API keys, agent credentials, provider access, repository permissions, and recovery methods. Notify Opslin promptly if you believe an account or connected server has been compromised.</p></LegalSection>
    <LegalSection title="Resource responsibility"><p>Do not intentionally consume resources in a way that degrades the control plane or harms other users. Follow the acceptable-use, content, traffic, and resource policies of your VPS, domain, repository, payment, and other third-party providers.</p></LegalSection>
    <LegalSection title="Enforcement"><p>Opslin may investigate credible abuse reports and restrict or suspend access where reasonably necessary to protect the service, customers, providers, or the public. Severe or urgent abuse may require immediate action. Where appropriate, Opslin may request remediation before access is restored.</p></LegalSection>
    <LegalSection title="Report abuse"><p>Send reports to <a className="font-medium text-brand underline-offset-4 hover:underline" href={`mailto:${siteLinks.contactEmail}`}>{siteLinks.contactEmail}</a>. Include the affected resource, timestamps, supporting evidence, and a safe way to contact you. Do not send active malware or expose unrelated personal data.</p></LegalSection>
  </LegalPage>;
}
