export const capabilityStatuses = [
  "Available in beta",
  "Plan-gated",
  "Gated validation",
  "In development",
  "Planned",
  "Not supported",
] as const;

export type CapabilityStatus = (typeof capabilityStatuses)[number];

export type CapabilityCategory =
  | "Deployments"
  | "Operations"
  | "Access"
  | "Reliability"
  | "Roadmap";

export type PublicCapability = {
  id: string;
  name: string;
  category: CapabilityCategory;
  status: CapabilityStatus;
  summary: string;
  boundary: string;
};

/**
 * Conservative public capability truth for the marketing website.
 *
 * Keep this list aligned with the product implementation and public launch
 * requirements. A route, model, or job existing in the private repository is
 * not enough to promote a capability to "Available in beta"; customer-facing
 * validation and applicable entitlement checks still matter.
 */
export const publicCapabilityLedger = [
  {
    id: "application-deployments",
    name: "Application deployments",
    category: "Deployments",
    status: "Available in beta",
    summary:
      "Deploy a Git-connected or uploaded application to a claimed, compatible Linux VPS and follow build and release state in the dashboard.",
    boundary:
      "This is the normal single-application workflow, not the Yantrix multi-service production-stack workflow.",
  },
  {
    id: "runtime-targets",
    name: "Runtime targets",
    category: "Deployments",
    status: "Available in beta",
    summary:
      "Normal deployments cover Node.js, Python, Go, PHP, Ruby, Java, Rust, and static applications.",
    boundary:
      "Compatibility still depends on the application, build instructions, server operating system, architecture, and available resources.",
  },
  {
    id: "metrics-and-logs",
    name: "Metrics and logs",
    category: "Operations",
    status: "Available in beta",
    summary:
      "Review deployment and application logs alongside reported server and application health signals.",
    boundary:
      "Retention, download, request analytics, and security-event depth vary by plan; Opslin does not replace an incident-response process.",
  },
  {
    id: "temporary-domains",
    name: "Temporary domains",
    category: "Operations",
    status: "Available in beta",
    summary:
      "Use an Opslin-provided temporary domain while validating a compatible deployment.",
    boundary:
      "Availability depends on successful DNS, reverse-proxy, agent, and application-health checks.",
  },
  {
    id: "browser-terminal",
    name: "Browser terminal",
    category: "Access",
    status: "Plan-gated",
    summary:
      "Open an interactive terminal session for a connected server from an eligible organization and plan.",
    boundary:
      "Terminal access is a privileged operation. Organization permissions and server-side controls still apply.",
  },
  {
    id: "custom-domains-and-ssl",
    name: "Custom domains and automatic SSL",
    category: "Operations",
    status: "Plan-gated",
    summary:
      "Connect a custom domain and coordinate supported DNS, reverse-proxy, and certificate workflows.",
    boundary:
      "The customer remains responsible for domain ownership, correct DNS records, and a reachable application server.",
  },
  {
    id: "database-provisioning",
    name: "Database provisioning",
    category: "Operations",
    status: "Plan-gated",
    summary:
      "Provision and operate PostgreSQL, MySQL, MongoDB, or Redis on an eligible connected server.",
    boundary:
      "Engine count and operations depend on plan limits. Database provisioning does not include a managed persistent-volume service.",
  },
  {
    id: "organization-rbac",
    name: "Organization roles and RBAC",
    category: "Access",
    status: "Plan-gated",
    summary:
      "Use organization roles and role-based controls to separate supported team responsibilities.",
    boundary:
      "Dashboard visibility is not the security boundary; authorization is enforced by the Opslin API and plan entitlements.",
  },
  {
    id: "backup-and-restore",
    name: "Backup and restore",
    category: "Reliability",
    status: "Gated validation",
    summary:
      "Backup, restore, scheduling, and restore-drill paths exist but are not advertised as production-ready customer protection.",
    boundary:
      "Customers remain responsible for independent, tested backups until Opslin completes staged and real-environment validation.",
  },
  {
    id: "csf-drift-detection",
    name: "CSF drift detection",
    category: "Reliability",
    status: "Gated validation",
    summary:
      "Convergent State Fabric compares selected desired and observed states and can surface drift for controlled review.",
    boundary:
      "It is off by default, not validated on a real production VPS fleet, and some domains are detect-only or do not yet collect observations.",
  },
  {
    id: "fis-preflight-intelligence",
    name: "FIS deployment preflights",
    category: "Reliability",
    status: "Gated validation",
    summary:
      "Fleet Immune System can turn privacy-preserving, validated failure patterns into advisory deployment preflight signals.",
    boundary:
      "It is off by default, opt-in where applicable, advisory-only, and not validated on a real production VPS fleet.",
  },
  {
    id: "yantrix-production-stack",
    name: "Yantrix production-stack workflow",
    category: "Roadmap",
    status: "In development",
    summary:
      "A coordinated multi-service and Compose-oriented production-stack workflow is being built behind a feature gate.",
    boundary:
      "It is not generally available and has not completed end-to-end validation against a real agent, VPS, and DNS environment.",
  },
  {
    id: "marketplace-and-launchpad",
    name: "Marketplace and Launchpad",
    category: "Roadmap",
    status: "Planned",
    summary:
      "Curated deployment resources and infrastructure-discovery experiences are roadmap concepts.",
    boundary:
      "There is no active inventory, seller network, provider catalogue, or public delivery date.",
  },
  {
    id: "advanced-multi-server",
    name: "Advanced multi-server operation",
    category: "Roadmap",
    status: "Not supported",
    summary:
      "Opslin does not currently provide a production-ready clustered or advanced multi-server application workflow.",
    boundary:
      "Use an alternative with verified cluster orchestration when that is a current requirement.",
  },
  {
    id: "managed-persistent-volumes",
    name: "Managed persistent volumes",
    category: "Roadmap",
    status: "Not supported",
    summary:
      "Opslin does not currently provide a managed persistent-volume product.",
    boundary:
      "Customers must design, operate, protect, and test persistent storage appropriate to their infrastructure.",
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    category: "Roadmap",
    status: "Not supported",
    summary:
      "RabbitMQ provisioning and lifecycle management are not part of the current Opslin capability surface.",
    boundary:
      "Teams that require RabbitMQ must operate it independently or choose a platform with verified support.",
  },
] as const satisfies readonly PublicCapability[];

export const capabilityLedgerReviewedAt = "2026-07-16";

export function groupCapabilitiesByStatus(
  capabilities: readonly PublicCapability[] = publicCapabilityLedger,
) {
  return capabilityStatuses.map((status) => ({
    status,
    capabilities: capabilities.filter((capability) => capability.status === status),
  })).filter((group) => group.capabilities.length > 0);
}
