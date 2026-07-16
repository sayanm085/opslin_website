export type VisualAsset = {
  id: string;
  path: string;
  darkPath?: string;
  width: number;
  height: number;
  alt: string;
  decorative: boolean;
};

const image = (id: string, alt: string, darkPath?: string): VisualAsset => ({
  id,
  path: `/images/evergreen/${id}.webp`,
  darkPath,
  width: 1672,
  height: 941,
  alt,
  decorative: false,
});

export const visualAssets = {
  controlPlane: image("control-plane-field", "An abstract control plane connected through an outbound channel to a customer-owned server", "/images/evergreen/control-plane-field-dark.webp"),
  deployment: image("deploy-pipeline", "An abstract four-stage deployment pipeline from source through build, release, and health verification", "/images/evergreen/deploy-pipeline-dark.webp"),
  observability: image("observability-field", "An abstract observability field joining metrics, logs, health, and alert context", "/images/evergreen/observability-field-dark.webp"),
  security: image("security-channel", "An authenticated outbound work channel crossing a clearly defined infrastructure boundary", "/images/evergreen/security-channel-dark.webp"),
  databases: image("database-orbit", "Four database nodes connected to a central customer-owned server", "/images/evergreen/database-orbit-dark.webp"),
  workflow: image("workflow-corridor", "Six abstract stations connected as one deployment and operations workflow", "/images/evergreen/workflow-corridor-dark.webp"),
  heroDevops: {
    id: "hero-devops-field-dark-v2",
    path: "/images/evergreen/hero-devops-field-dark-v2.webp",
    width: 1717,
    height: 916,
    alt: "An atmospheric DevOps field with a central server path and emerald signal light",
    decorative: true,
  },
  agentBeacon: {
    id: "agent-beacon-cutout-v1",
    path: "/images/evergreen/agent-beacon-cutout-v1.png",
    width: 1254,
    height: 1254,
    alt: "A matte agent beacon object representing Opslin's outbound Go agent",
    decorative: false,
  },
  serverNode: {
    id: "server-node-cutout-v1",
    path: "/images/evergreen/server-node-cutout-v1.png",
    width: 1254,
    height: 1254,
    alt: "A brushed-metal server object representing a customer-controlled VPS",
    decorative: false,
  },
} as const;
