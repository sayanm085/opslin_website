import { ArchitectureSection } from "@/components/landing/architecture-section";
import { DemoSection } from "@/components/landing/demo-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeatureBento } from "@/components/landing/feature-bento";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { KeyCapabilities } from "@/components/landing/key-capabilities";
import { Navbar } from "@/components/landing/navbar";
import { PricingComparison } from "@/components/landing/pricing-comparison";
import { PricingSection } from "@/components/landing/pricing-section";
import { SocialProof } from "@/components/landing/social-proof";
import { StatsSection } from "@/components/landing/stats-section";
import { TrustBar } from "@/components/landing/trust-bar";
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
      name: "Starter Trial",
      price: "299",
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <Hero />
      <TrustBar />
      <FeatureBento />
      <KeyCapabilities />
      <StatsSection />
      <HowItWorks />
      <ArchitectureSection />
      <DemoSection />
      <PricingSection />
      <PricingComparison />
      <SocialProof />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
