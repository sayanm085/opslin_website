import type { Metadata } from "next";
import { ServicePage } from "@/components/site/service-page";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("VPS Security Controls — Opslin", services.security.description, "/services/security");
export default function SecurityPage() { return <ServicePage content={services.security} />; }
