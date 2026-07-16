import type { Metadata } from "next";
import { ServicePage } from "@/components/site/service-page";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("VPS Observability — Opslin", services.observability.description, "/services/observability");
export default function ObservabilityPage() { return <ServicePage content={services.observability} />; }
