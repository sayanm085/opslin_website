import { HomePage } from "@/components/site/home-page";
import { siteLinks } from "@/lib/site-links";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Opslin",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux",
  url: siteLinks.landing,
  description:
    "Opslin turns your Linux server into a managed deployment platform with Git deploys, SSL, logs, monitoring, databases, and rollback from one browser dashboard.",
  offers: [
    {
      "@type": "Offer",
      name: "Free Beta",
      price: "0",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "352.82",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "799",
      priceCurrency: "INR",
    },
  ],
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
