import { HomePage } from "@/components/site/home-page";
import { pricingPlans } from "@/components/site/pricing-cards";
import { siteLinks } from "@/lib/site-links";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Opslin",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux",
  url: siteLinks.landing,
  description:
    "Opslin coordinates application deployments and selected infrastructure operations on compatible customer-controlled Linux VPSs through a managed control plane and outbound Go agent.",
  offers: pricingPlans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: String(plan.price),
    priceCurrency: "INR",
    description: `${plan.summary} Listed base price; applicable tax is disclosed on the pricing page.`,
  })),
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
