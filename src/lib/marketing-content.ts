import type { LucideIcon } from "lucide-react";
import { Activity, Boxes, Database, GitBranch, KeyRound, Radar, RotateCcw, ShieldCheck } from "lucide-react";

export type ServiceContent = {
  visualKind: "deployment" | "observability" | "security" | "databases";
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  outcomes: string[];
  workflow: Array<{ title: string; description: string }>;
  details: Array<{ title: string; description: string; icon: LucideIcon }>;
};

export const services: Record<string, ServiceContent> = {
  deployments: {
    visualKind: "deployment",
    eyebrow: "Deployments",
    title: "From Git push to a healthy app on your VPS.",
    description:
      "Opslin coordinates detection, build, container rollout, domain configuration, and health checks while keeping the workload on infrastructure you control.",
    icon: GitBranch,
    outcomes: ["Git or upload deploys", "Runtime detection", "Rollback records"],
    workflow: [
      { title: "Connect", description: "Choose a repository, branch, and target server." },
      { title: "Build", description: "Opslin detects the runtime and prepares the application." },
      { title: "Release", description: "The outbound agent runs the deployment on your VPS." },
      { title: "Verify", description: "Health and deployment status return to the control plane." },
    ],
    details: [
      { title: "Framework-aware builds", description: "Support for common application runtimes and static sites.", icon: Boxes },
      { title: "Deployment history", description: "See status, logs, duration, and previous releases in one place.", icon: Activity },
      { title: "Rollback controls", description: "Return to a recorded release when a deployment needs to be reversed.", icon: RotateCcw },
    ],
  },
  observability: {
    visualKind: "observability",
    eyebrow: "Observability",
    title: "Know what your apps and servers are doing.",
    description:
      "Bring deployment logs, application health, infrastructure metrics, and operational alerts into a single control plane built around action.",
    icon: Radar,
    outcomes: ["Live deployment logs", "Server metrics", "Actionable alerts"],
    workflow: [
      { title: "Collect", description: "The connected agent reports operational state and metrics." },
      { title: "Understand", description: "Opslin organizes signals by server, app, and deployment." },
      { title: "Alert", description: "Configured conditions surface through supported notification channels." },
      { title: "Respond", description: "Open the affected resource with the surrounding context intact." },
    ],
    details: [
      { title: "Health at a glance", description: "See online, degraded, and failed states with clear labels.", icon: Activity },
      { title: "Focused timelines", description: "Connect events with the deployment or infrastructure change that caused them.", icon: Radar },
      { title: "Operational history", description: "Review logs and activity without switching between disconnected tools.", icon: GitBranch },
    ],
  },
  security: {
    visualKind: "security",
    eyebrow: "Security",
    title: "A control plane designed around infrastructure ownership.",
    description:
      "The lightweight agent dials out from your VPS, reducing the need to expose a public management port while Opslin coordinates guarded infrastructure actions.",
    icon: ShieldCheck,
    outcomes: ["Outbound-only agent", "Role-based access", "Auditable activity"],
    workflow: [
      { title: "Authorize", description: "Connect only infrastructure and repositories you control." },
      { title: "Dispatch", description: "The control plane sends signed work to the connected agent." },
      { title: "Execute", description: "The agent performs the scoped operation on your server." },
      { title: "Confirm", description: "Results and operational state are returned to the dashboard." },
    ],
    details: [
      { title: "Team boundaries", description: "Organizations, roles, and access controls separate responsibilities.", icon: KeyRound },
      { title: "Safer connectivity", description: "The agent initiates its persistent connection from inside the VPS.", icon: ShieldCheck },
      { title: "Change visibility", description: "Operational activity is recorded so teams can understand what happened.", icon: Activity },
    ],
  },
  databases: {
    visualKind: "databases",
    eyebrow: "Databases",
    title: "Provision and operate common databases beside your apps.",
    description:
      "Manage supported database services from the same control plane as your deployments, with connection details and operational actions organized per resource.",
    icon: Database,
    outcomes: ["Multiple database engines", "Connection details", "Lifecycle operations"],
    workflow: [
      { title: "Select", description: "Choose a supported engine and target server." },
      { title: "Provision", description: "The agent creates the database service on your VPS." },
      { title: "Connect", description: "Use the generated connection details from your application." },
      { title: "Operate", description: "Review status and run supported lifecycle actions." },
    ],
    details: [
      { title: "Familiar engines", description: "Work with PostgreSQL, MySQL, MongoDB, and Redis.", icon: Database },
      { title: "Resource context", description: "Keep database state and related server information together.", icon: Boxes },
      { title: "Controlled access", description: "Reveal and copy sensitive connection details only when needed.", icon: KeyRound },
    ],
  },
};
