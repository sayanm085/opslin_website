import type { Metadata } from "next";
import { ServicePage } from "@/components/site/service-page";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("VPS Database Operations — Opslin", services.databases.description, "/services/databases");
export default function DatabasesPage() { return <ServicePage content={services.databases} />; }
