import type { Metadata } from "next";
import { ServicePage } from "@/components/site/service-page";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("VPS Application Deployments — Opslin", services.deployments.description, "/services/deployments");
export default function DeploymentsPage() { return <ServicePage content={services.deployments} />; }
