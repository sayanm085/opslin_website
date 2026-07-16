export type VisualAsset = {
  id: string;
  path: string;
  width: number;
  height: number;
  alt: string;
  decorative: boolean;
};

const image = (id: string, alt: string): VisualAsset => ({
  id,
  path: `/images/evergreen/${id}.webp`,
  width: 1672,
  height: 941,
  alt,
  decorative: false,
});

export const visualAssets = {
  controlPlane: image("control-plane-field", "An abstract control plane connected through an outbound channel to a customer-owned server"),
  deployment: image("deploy-pipeline", "An abstract four-stage deployment pipeline from source through build, release, and health verification"),
  observability: image("observability-field", "An abstract observability field joining metrics, logs, health, and alert context"),
  security: image("security-channel", "An authenticated outbound work channel crossing a clearly defined infrastructure boundary"),
  databases: image("database-orbit", "Four database nodes connected to a central customer-owned server"),
  workflow: image("workflow-corridor", "Six abstract stations connected as one deployment and operations workflow"),
} as const;
