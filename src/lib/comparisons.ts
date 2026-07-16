export type ComparisonCategory =
  | "Hosted control plane with customer servers"
  | "Self-hosted platform"
  | "Managed application platform"
  | "Manual infrastructure operations";

export type ComparisonDimension = {
  label: string;
  opslin: string;
  alternative: string;
};

export type ComparisonSource = {
  title: string;
  url: string;
  claimIds: string[];
};

export type ComparisonFaq = {
  question: string;
  answer: string;
};

export type ComparisonPricing = {
  model: string;
  datedExample: string;
  claimId: string;
  reviewedAt: string;
  nextReviewAt: string;
};

export type Comparison = {
  slug: string;
  provider: string;
  category: ComparisonCategory;
  operatingModel: string;
  directAnswer: string;
  dimensions: ComparisonDimension[];
  strengths: string[];
  opslinFit: string[];
  alternativeFit: string[];
  chooseOpslin: string[];
  chooseAlternative: string[];
  opslinLimitations: string[];
  pricing: ComparisonPricing;
  pricingModel: string;
  sources: ComparisonSource[];
  claimIds: string[];
  reviewedAt: string;
  nextFeatureReviewAt: string;
  nextPricingReview: string;
  nextFeatureReview: string;
  verificationStatus: "Verified from official sources";
  faqs: ComparisonFaq[];
};

type ComparisonRegistryEntry = Omit<
  Comparison,
  | "chooseOpslin"
  | "chooseAlternative"
  | "pricingModel"
  | "nextPricingReview"
  | "nextFeatureReview"
>;

export const comparisonReviewedAt = "2026-07-16";
export const comparisonNextPricingReviewAt = "2026-08-15";
export const comparisonNextFeatureReviewAt = "2026-10-14";

export const comparisonDisclaimer =
  "This comparison is based on publicly available product documentation and Opslin's own product information as reviewed on 16 July 2026. Features, limits, and pricing may change. All third-party names and trademarks belong to their respective owners. Opslin is not affiliated with or endorsed by the products referenced. Verify current details directly with each provider before making a purchasing decision.";

const currentOpslinLimitations = [
  "Opslin is in beta, so availability, support arrangements, and service commitments remain narrower than those of mature platforms.",
  "Backup and restore workflows are in gated validation and should not be treated as production-ready customer protection.",
  "Opslin does not currently provide managed persistent volumes or a production-ready advanced multi-server application workflow.",
  "RabbitMQ provisioning is not currently supported.",
  "Yantrix production-stack workflows are in development; CSF and FIS remain off-by-default gated capabilities without real-fleet validation.",
];

const opslinPricingModel =
  "Opslin charges a separate INR subscription for its managed control plane; the customer acquires and pays for the VPS, domains, storage, and other third-party services.";

const opslinOperatingModel =
  "A managed Opslin control plane coordinates a lightweight Go agent that initiates an outbound connection from a compatible customer-controlled Linux VPS.";

const comparisonEntries = [
  {
    slug: "opslin-vs-coolify",
    provider: "Coolify",
    category: "Hosted control plane with customer servers",
    operatingModel:
      "Coolify can be self-hosted or used as Coolify Cloud. Both models manage customer-connected servers over SSH; applications continue to run on those servers.",
    directAnswer:
      "Opslin and Coolify Cloud both pair a managed control plane with customer-supplied servers, so infrastructure ownership alone is not a meaningful differentiator. Opslin uses a persistent outbound Go-agent and signed work channel. Coolify uses SSH and also offers a free, open-source self-hosted control plane with documented multi-server, application, database, service, and backup capabilities. Choose according to connection model, platform ownership, maturity, and the features you need now.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Choose open-source self-hosting or Coolify Cloud, which hosts and updates the Coolify control plane.",
      },
      {
        label: "Workload location",
        opslin: "Applications and supported databases run on the customer's compatible Linux VPS.",
        alternative: "Applications run on servers connected by the customer, not on Coolify's Cloud control-plane server.",
      },
      {
        label: "Control-plane responsibility",
        opslin: "Opslin operates the control plane; the customer operates the VPS and workloads.",
        alternative: "Coolify manages the Cloud control plane, or the customer operates the self-hosted control plane.",
      },
      {
        label: "Server connection",
        opslin: "The Go agent dials out and receives timestamped, HMAC-signed work over its authenticated channel.",
        alternative: "Coolify connects to local and remote servers with SSH key authentication, commonly using a privileged account.",
      },
      {
        label: "Source and platform ownership",
        opslin: "Private, proprietary managed SaaS.",
        alternative: "The Coolify codebase is open source; self-hosted and managed Cloud options are documented.",
      },
      {
        label: "Deployment model",
        opslin: "Normal beta workflows deploy Git-connected or uploaded applications across documented runtime targets.",
        alternative: "Deploys applications, databases, and one-click services to connected servers; Docker-based workflows are central.",
      },
      {
        label: "Scaling and multi-server",
        opslin: "Advanced multi-server application operation is not currently production-ready.",
        alternative: "Multiple remote servers are documented, with independent proxy and traffic handling per server.",
      },
      {
        label: "Storage and backups",
        opslin: "No managed persistent-volume product; backup and restore remain in gated validation.",
        alternative: "Control-plane backups are documented, but Coolify states that application data and volume mounts require separate backup handling.",
      },
      {
        label: "Server access",
        opslin: "Eligible plans expose a privileged browser terminal while the underlying VPS remains customer controlled.",
        alternative: "The customer owns the server and its SSH access; Coolify itself requires SSH access to manage it.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "Self-hosting is free apart from infrastructure; Coolify Cloud charges a base subscription plus additional connected servers.",
      },
    ],
    strengths: [
      "A free, open-source self-hosted edition with the same public codebase as Cloud.",
      "A managed Cloud control plane for users who do not want to maintain Coolify itself.",
      "Documented remote and multiple-server management over SSH.",
      "A broad documented catalogue of application, database, and one-click service workflows.",
    ],
    opslinFit: [
      "You prefer Opslin's outbound Go-agent and signed-work protocol over control-plane-initiated SSH.",
      "You want Opslin to operate the management layer while retaining your chosen compatible VPS provider.",
      "Opslin's currently available beta scope meets the workload's deployment and operational requirements.",
    ],
    alternativeFit: [
      "You require an open-source control plane that you can inspect, modify, and host yourself.",
      "You need Coolify's currently documented multi-server or broader one-click service capabilities.",
      "You already operate an SSH-centered server-management model and are comfortable with its access requirements.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Coolify Self-hosted is free apart from infrastructure. Coolify Cloud charges for its managed control plane while customers still supply servers.",
      datedExample:
        "Reviewed 16 July 2026: Coolify lists Cloud at $5/month including two connected servers, plus $3/month for each additional server; annual billing is advertised with a 20% saving.",
      claimId: "COOLIFY-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Coolify pricing",
        url: "https://coolify.io/pricing",
        claimIds: ["COOLIFY-MODEL-001", "COOLIFY-PRICE-001", "COOLIFY-OSS-001"],
      },
      {
        title: "Coolify server introduction",
        url: "https://coolify.io/docs/knowledge-base/server/introduction",
        claimIds: ["COOLIFY-SSH-001", "COOLIFY-MULTI-001", "COOLIFY-WORKLOAD-001"],
      },
      {
        title: "Back up and restore Coolify",
        url: "https://coolify.io/docs/knowledge-base/how-to/backup-restore-coolify",
        claimIds: ["COOLIFY-BACKUP-001"],
      },
    ],
    claimIds: [
      "COOLIFY-MODEL-001",
      "COOLIFY-PRICE-001",
      "COOLIFY-OSS-001",
      "COOLIFY-SSH-001",
      "COOLIFY-MULTI-001",
      "COOLIFY-WORKLOAD-001",
      "COOLIFY-BACKUP-001",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Is Opslin the only managed control plane for customer-owned servers?",
        answer:
          "No. Coolify Cloud also hosts the management layer while applications run on customer-connected servers. Opslin's narrower distinction is its outbound Go-agent and signed-work protocol.",
      },
      {
        question: "When is Coolify likely to be the better fit?",
        answer:
          "Coolify may fit better when an open-source, self-hostable control plane or its currently documented multi-server and service catalogue is required.",
      },
    ],
  },
  {
    slug: "opslin-vs-dokploy",
    provider: "Dokploy",
    category: "Hosted control plane with customer servers",
    operatingModel:
      "Dokploy offers an open-source self-hosted edition and Dokploy Cloud. Cloud hosts the UI, database, and management layer, then configures customer servers through SSH.",
    directAnswer:
      "Opslin and Dokploy Cloud both separate a managed control plane from customer-owned compute. Dokploy Cloud connects through SSH and documents applications, databases, Compose, remote servers, monitoring, backups, volumes, and clusters. Opslin uses an outbound Go-agent and signed work channel but currently has a narrower validated multi-server, backup, and production-stack scope. Dokploy may fit broader Docker/Traefik operations; Opslin may fit teams that specifically prefer its agent model.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Choose self-hosted Dokploy or Dokploy Cloud with a managed UI, database, and management layer.",
      },
      {
        label: "Workload location",
        opslin: "Workloads run on the customer's compatible Linux VPS.",
        alternative: "Dokploy Cloud deploys applications, databases, and Compose stacks to customer-connected servers.",
      },
      {
        label: "Control-plane responsibility",
        opslin: "Opslin maintains its proprietary control plane.",
        alternative: "Dokploy manages Cloud; the user maintains the open-source self-hosted edition.",
      },
      {
        label: "Server connection",
        opslin: "A persistent agent-initiated channel carries authenticated, signed work.",
        alternative: "Dokploy Cloud asks for reachable SSH details, then sets up Docker, Traefik, and its monitoring agent.",
      },
      {
        label: "Deployment model",
        opslin: "Normal beta deployment supports Git or upload workflows for documented runtimes.",
        alternative: "Applications, databases, Docker Compose, domains, SSL, and templates share the same deployment engine across editions.",
      },
      {
        label: "Scaling and multi-server",
        opslin: "Advanced multi-server application operation is not production-ready.",
        alternative: "Remote servers and multi-server use are documented; cluster features use Docker Swarm and Traefik routing.",
      },
      {
        label: "Databases",
        opslin: "Eligible plans can provision PostgreSQL, MySQL, MongoDB, and Redis on a connected server.",
        alternative: "Documents PostgreSQL, MySQL, MariaDB, MongoDB, and Redis with metrics, logs, volumes, and S3 backups.",
      },
      {
        label: "Storage and backups",
        opslin: "No managed persistent volumes; backup and restore are still gated validation.",
        alternative: "Documents database, control-plane, and named-volume backup workflows using configured S3 destinations.",
      },
      {
        label: "Source and platform ownership",
        opslin: "Private, proprietary managed SaaS.",
        alternative: "Open-source self-hosted core plus managed and enterprise editions.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "Self-hosted OSS is free; Cloud pricing varies by servers, plan, and support level.",
      },
    ],
    strengths: [
      "Open-source self-hosting and managed Cloud choices using the same documented deployment engine.",
      "Documented Compose, remote-server, cluster, database, and named-volume workflows.",
      "Documented S3-backed database, volume, and platform backup options.",
      "Cloud plans range from individual use to enterprise editions with support and governance features.",
    ],
    opslinFit: [
      "You specifically prefer an agent-initiated connection and Opslin's signed-work protocol.",
      "You want a managed control plane while retaining server-level ownership and provider choice.",
      "The workload fits Opslin's currently released single-application beta surface.",
    ],
    alternativeFit: [
      "You require open-source self-hosting or Dokploy's documented Docker Compose support now.",
      "You require documented remote-server, cluster, volume-backup, or broader database capabilities.",
      "Traefik and Dokploy's Docker-oriented operating model fit your team's existing practices.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Dokploy Self-hosted OSS is free apart from infrastructure; Cloud charges by plan and connected-server allowance.",
      datedExample:
        "Reviewed 16 July 2026: Dokploy Cloud lists Hobby at $4.50/month per server and Startup at $15/month for three included servers, with additional servers at $4.50/month; annual billing advertises a 20% saving.",
      claimId: "DOKPLOY-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Dokploy Cloud",
        url: "https://docs.dokploy.com/docs/core/cloud",
        claimIds: ["DOKPLOY-MODEL-001", "DOKPLOY-SSH-001", "DOKPLOY-PRICE-001"],
      },
      {
        title: "Dokploy Cloud versus Self-hosted",
        url: "https://docs.dokploy.com/docs/core/differences",
        claimIds: ["DOKPLOY-OSS-001", "DOKPLOY-MULTI-001", "DOKPLOY-GOVERNANCE-001"],
      },
      {
        title: "Dokploy databases",
        url: "https://docs.dokploy.com/docs/core/databases",
        claimIds: ["DOKPLOY-DATABASE-001", "DOKPLOY-BACKUP-001"],
      },
      {
        title: "Dokploy volume backups",
        url: "https://docs.dokploy.com/docs/core/volume-backups",
        claimIds: ["DOKPLOY-VOLUME-001"],
      },
    ],
    claimIds: [
      "DOKPLOY-MODEL-001",
      "DOKPLOY-SSH-001",
      "DOKPLOY-PRICE-001",
      "DOKPLOY-OSS-001",
      "DOKPLOY-MULTI-001",
      "DOKPLOY-GOVERNANCE-001",
      "DOKPLOY-DATABASE-001",
      "DOKPLOY-BACKUP-001",
      "DOKPLOY-VOLUME-001",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "How is Opslin's connection model different from Dokploy Cloud?",
        answer:
          "Dokploy Cloud documents SSH-based setup of customer servers. Opslin installs a Go agent that initiates a persistent outbound connection and accepts authenticated, signed work from the control plane.",
      },
      {
        question: "Does Opslin currently match Dokploy's Compose and cluster scope?",
        answer:
          "No. Opslin's Yantrix production-stack workflow remains in development, and advanced multi-server application operation is not production-ready.",
      },
    ],
  },
  {
    slug: "opslin-vs-caprover",
    provider: "CapRover",
    category: "Self-hosted platform",
    operatingModel:
      "CapRover is a free, self-hosted PaaS installed on customer infrastructure. It operates Docker Swarm, nginx, and Let's Encrypt from the customer's server or cluster.",
    directAnswer:
      "CapRover is a free self-hosted PaaS that the user installs and operates, with Docker Swarm, nginx, Let's Encrypt, one-click apps, persistent apps, and clustering. Opslin operates its control plane and connects to a customer VPS through an outbound agent, reducing control-plane installation work. CapRover may suit teams wanting an established open-source Docker/Swarm platform; Opslin may suit teams that prefer a managed dashboard and its narrower agent-based workflow.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "CapRover is installed and operated by the customer on customer-controlled infrastructure.",
      },
      {
        label: "Workload location",
        opslin: "Applications remain on the connected customer VPS.",
        alternative: "Applications and CapRover's management services run on the customer's server or Swarm cluster.",
      },
      {
        label: "Control-plane responsibility",
        opslin: "Opslin maintains the hosted control plane.",
        alternative: "The customer installs, updates, backs up, secures, and monitors CapRover itself.",
      },
      {
        label: "Server connection",
        opslin: "The server-side Go agent initiates an outbound authenticated channel.",
        alternative: "CapRover is installed directly on the server and exposes its own dashboard and deployment interfaces.",
      },
      {
        label: "Deployment model",
        opslin: "Git or upload deployments through the normal beta application workflow.",
        alternative: "Dashboard upload, CLI, webhooks, and Docker-image workflows; Docker Compose parsing is explicitly partial.",
      },
      {
        label: "Scaling and multi-server",
        opslin: "Advanced multi-server application operation is not production-ready.",
        alternative: "Docker Swarm underpins clustering; stateless apps can scale or move, while persistent apps have node constraints.",
      },
      {
        label: "Databases and services",
        opslin: "Plan-gated provisioning covers PostgreSQL, MySQL, MongoDB, and Redis.",
        alternative: "A community-maintained one-click catalogue includes databases and services, with manual Docker images also supported.",
      },
      {
        label: "Persistent storage",
        opslin: "No managed persistent-volume product is currently available.",
        alternative: "Persistent directories and Docker volumes are documented, but persistent apps cannot scale across instances without external storage design.",
      },
      {
        label: "Backup scope",
        opslin: "Backup and restore are in gated validation.",
        alternative: "CapRover backs up platform configuration; container images and persistent directories require separate handling.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "CapRover has no platform subscription; the customer pays for and operates the server, storage, domains, and support if purchased.",
      },
    ],
    strengths: [
      "Free, self-hosted platform with public source code.",
      "Documented Docker Swarm clustering, nginx routing, and Let's Encrypt automation.",
      "A long-standing one-click application and database catalogue.",
      "Direct control over the management plane and its upgrade timing.",
    ],
    opslinFit: [
      "You do not want to install and maintain the deployment control plane on your own server.",
      "You prefer an outbound agent rather than exposing and operating another server-side dashboard.",
      "Opslin's beta feature scope is sufficient and a managed commercial service is acceptable.",
    ],
    alternativeFit: [
      "You want a free, open-source platform and are willing to operate it.",
      "You need CapRover's documented Docker Swarm or one-click app workflows now.",
      "You require full control over the platform's installation, source, and upgrade schedule.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "CapRover is free and self-hosted. Infrastructure, operations, domains, storage, backups, and any commercial assistance remain separate customer costs.",
      datedExample:
        "Reviewed 16 July 2026: CapRover's official site describes the platform as free and self-hosted; its installation guide notes that a server and optional domain are customer-supplied costs rather than a CapRover subscription.",
      claimId: "CAPROVER-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "CapRover official site",
        url: "https://caprover.com/",
        claimIds: ["CAPROVER-MODEL-001", "CAPROVER-PRICE-001", "CAPROVER-SWARM-001"],
      },
      {
        title: "CapRover getting started",
        url: "https://caprover.com/docs/get-started",
        claimIds: ["CAPROVER-INSTALL-001", "CAPROVER-DOMAIN-001"],
      },
      {
        title: "CapRover persistent apps",
        url: "https://caprover.com/docs/persistent-apps.html",
        claimIds: ["CAPROVER-STORAGE-001", "CAPROVER-SCALE-001"],
      },
      {
        title: "CapRover backup and restore",
        url: "https://caprover.com/docs/backup-and-restore.html",
        claimIds: ["CAPROVER-BACKUP-001"],
      },
      {
        title: "CapRover and Docker Compose",
        url: "https://caprover.com/docs/docker-compose.html",
        claimIds: ["CAPROVER-COMPOSE-001"],
      },
    ],
    claimIds: [
      "CAPROVER-MODEL-001",
      "CAPROVER-PRICE-001",
      "CAPROVER-SWARM-001",
      "CAPROVER-INSTALL-001",
      "CAPROVER-DOMAIN-001",
      "CAPROVER-STORAGE-001",
      "CAPROVER-SCALE-001",
      "CAPROVER-BACKUP-001",
      "CAPROVER-COMPOSE-001",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Does CapRover require a separate hosted control plane?",
        answer:
          "No. CapRover is installed on customer infrastructure, where the customer is responsible for operating the platform and workloads.",
      },
      {
        question: "Does CapRover fully support arbitrary Docker Compose files?",
        answer:
          "Its official documentation says Compose parsing is partial and lists the supported fields; pure Compose can also be run manually alongside CapRover networking.",
      },
    ],
  },
  {
    slug: "opslin-vs-railway",
    provider: "Railway",
    category: "Managed application platform",
    operatingModel:
      "Railway runs applications, databases, networking, and persistent volumes on Railway-managed infrastructure and bills a subscription minimum plus measured resource use.",
    directAnswer:
      "Railway provides managed compute, networking, databases, volumes, templates, deployment tooling, and scaling within Railway's platform. Opslin instead coordinates workloads on a compatible VPS selected and paid for by the customer. Railway may reduce server-administration work and offers managed platform primitives; Opslin may fit teams that require provider choice, root-level infrastructure ownership, and predictable separation between the Opslin subscription and their VPS bill.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Railway is a managed application platform with Railway-provided compute, network, and storage primitives.",
      },
      {
        label: "Workload location",
        opslin: "Applications run on the customer's selected compatible VPS.",
        alternative: "Services run in Railway's containerized platform environment.",
      },
      {
        label: "Compute ownership",
        opslin: "The customer selects and pays the VPS provider directly.",
        alternative: "Railway supplies and meters compute, memory, network egress, and volume storage.",
      },
      {
        label: "Server access",
        opslin: "The customer retains server ownership and underlying administrative access.",
        alternative: "Users configure services rather than administer a customer-owned host or receive its root account.",
      },
      {
        label: "Deployment model",
        opslin: "Normal beta workflows deploy Git-connected or uploaded applications to the chosen VPS.",
        alternative: "Deploy from repositories, CLI, Docker images, and templates; Compose configurations are mapped to Railway services.",
      },
      {
        label: "Scaling",
        opslin: "Current production-ready scope is primarily server and single-application oriented.",
        alternative: "Plan-dependent replicas and high resource ceilings are documented per service.",
      },
      {
        label: "Persistent storage",
        opslin: "The customer designs and operates VPS storage; no managed volume product is included.",
        alternative: "Railway Volumes persist service data, support plan-based capacity, resizing, and documented backups.",
      },
      {
        label: "Databases",
        opslin: "Eligible plans provision supported database containers on the customer's server.",
        alternative: "Database templates and container services use Railway networking and attached volumes.",
      },
      {
        label: "Operational responsibility",
        opslin: "Opslin manages the control plane; the customer remains responsible for the VPS, storage, application, and recovery design.",
        alternative: "Railway manages the platform infrastructure while users remain responsible for application behavior, configuration, and spending.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "A monthly plan minimum counts toward metered CPU, memory, egress, and volume usage; usage above it is billed separately.",
      },
    ],
    strengths: [
      "Managed compute without requiring customers to acquire or administer a VPS.",
      "Integrated services, networking, volume storage, templates, metrics, and deployment workflows.",
      "Usage-based resource billing with documented per-unit rates and spend controls.",
      "Documented high resource ceilings and replica allowances on paid plans.",
    ],
    opslinFit: [
      "You already own or want to select the VPS and retain direct server administration.",
      "You want infrastructure-provider choice rather than moving compute into a platform-specific environment.",
      "You prefer paying a VPS provider directly and using Opslin as a separate management layer.",
    ],
    alternativeFit: [
      "You do not want to purchase, patch, harden, or capacity-plan a VPS.",
      "You need Railway's managed volumes, replicas, templates, and platform networking now.",
      "Usage-based managed compute is a better operational trade-off than server ownership.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Railway charges a plan subscription that counts toward resource use, then bills measured CPU, memory, egress, and volume usage above that amount.",
      datedExample:
        "Reviewed 16 July 2026: Railway lists Hobby at $5/month with $5 included usage and Pro at $20/month with $20 included usage; documented rates include $10/GB-month RAM, $20/vCPU-month CPU, $0.05/GB egress, and $0.15/GB-month volume storage.",
      claimId: "RAILWAY-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Railway pricing plans",
        url: "https://docs.railway.com/pricing/plans",
        claimIds: ["RAILWAY-PRICE-001", "RAILWAY-LIMITS-001", "RAILWAY-SCALE-001"],
      },
      {
        title: "Railway databases",
        url: "https://docs.railway.com/databases",
        claimIds: ["RAILWAY-DATABASE-001"],
      },
      {
        title: "Railway volumes",
        url: "https://docs.railway.com/volumes/reference",
        claimIds: ["RAILWAY-VOLUME-001", "RAILWAY-BACKUP-001"],
      },
      {
        title: "Deploy Docker Compose to Railway",
        url: "https://docs.railway.com/guides/docker-compose",
        claimIds: ["RAILWAY-COMPOSE-001"],
      },
    ],
    claimIds: [
      "RAILWAY-PRICE-001",
      "RAILWAY-LIMITS-001",
      "RAILWAY-SCALE-001",
      "RAILWAY-DATABASE-001",
      "RAILWAY-VOLUME-001",
      "RAILWAY-BACKUP-001",
      "RAILWAY-COMPOSE-001",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Does Railway deploy to my existing VPS?",
        answer:
          "Railway's documented model supplies Railway compute and platform services. Opslin's model instead manages applications on a compatible VPS selected by the customer.",
      },
      {
        question: "Is Opslin always less expensive than Railway?",
        answer:
          "No. Total cost depends on VPS pricing, Opslin plan, workload utilization, storage, bandwidth, administration time, and support needs. Compare a real workload and current prices.",
      },
    ],
  },
  {
    slug: "opslin-vs-render",
    provider: "Render",
    category: "Managed application platform",
    operatingModel:
      "Render runs web services, private services, workers, cron jobs, workflows, Postgres, Key Value, and disks on Render-managed infrastructure.",
    directAnswer:
      "Render is a managed cloud platform with application compute, native runtimes, Docker builds, private networking, managed Postgres, Key Value, persistent disks, scaling, and deployment automation. Opslin instead manages selected workflows on a customer-controlled VPS. Render may fit teams that want managed infrastructure and datastores; Opslin may fit teams that prioritize root access, VPS-provider choice, and direct ownership of where the workload runs.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Render is a managed cloud application and datastore platform.",
      },
      {
        label: "Workload location",
        opslin: "Applications remain on the customer's selected compatible VPS.",
        alternative: "Render deploys services to containerized instances on Render infrastructure.",
      },
      {
        label: "Compute ownership",
        opslin: "The customer contracts directly with the VPS provider.",
        alternative: "Render supplies compute and charges by workspace plan, service instance, storage, and usage.",
      },
      {
        label: "Server access",
        opslin: "The customer retains administrative ownership of the underlying VPS.",
        alternative: "Paid services can offer shell access, but users do not administer the underlying Render host as their own VPS.",
      },
      {
        label: "Deployment model",
        opslin: "Git or upload through a normal deployment workflow on the connected server.",
        alternative: "Git providers, public repositories, prebuilt images, Dockerfiles, and native runtimes are documented.",
      },
      {
        label: "Scaling",
        opslin: "Advanced multi-server application operation is not production-ready.",
        alternative: "Vertical scaling is broadly available; horizontal autoscaling is available on qualifying workspace plans.",
      },
      {
        label: "Persistent storage",
        opslin: "The customer operates VPS disks and backup strategy; no Opslin-managed volume product.",
        alternative: "Paid services can attach persistent disks with daily snapshots, subject to documented scaling constraints.",
      },
      {
        label: "Databases",
        opslin: "Supported database containers run on the customer's server and remain the customer's operational responsibility.",
        alternative: "Render offers managed Postgres and Redis-compatible Key Value alongside custom datastores on disks.",
      },
      {
        label: "Networking and delivery",
        opslin: "Domains, reverse proxy, and SSL are coordinated on the connected VPS for eligible plans.",
        alternative: "Render provides platform networking, managed TLS, private networking, and CDN-related services.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "Workspace tiers and separately priced compute, databases, disks, bandwidth, and selected add-ons.",
      },
    ],
    strengths: [
      "Managed application compute with several service types and native runtime or Docker deployment.",
      "Managed Postgres, Redis-compatible Key Value, private networking, and persistent disks.",
      "Documented zero-downtime deployment, scaling, metrics, logs, and preview workflows.",
      "A free evaluation tier and multiple paid workspace and compute tiers.",
    ],
    opslinFit: [
      "You require direct ownership and administrative control of the underlying server.",
      "You want to choose the VPS provider, location, and machine independently of Opslin.",
      "Your workload fits Opslin's current beta capabilities and you accept server operational responsibility.",
    ],
    alternativeFit: [
      "You want Render to supply and operate compute, networking, scaling, and managed datastore primitives.",
      "You need managed persistent disks, Postgres recovery, autoscaling, or private networking now.",
      "Your team values lower server-administration burden over root-level infrastructure control.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Render charges separately for workspace capabilities and service resources, with per-instance compute and metered storage or bandwidth where applicable.",
      datedExample:
        "Reviewed 16 July 2026: Render lists Hobby at $0/month plus compute, Pro at $25/month plus compute, a Starter web service at $7/month, persistent disks at $0.25/GB-month, and paid Postgres storage at $0.30/GB-month.",
      claimId: "RENDER-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Render pricing",
        url: "https://render.com/pricing",
        claimIds: ["RENDER-PRICE-001", "RENDER-SCALE-001", "RENDER-OPERATIONS-001"],
      },
      {
        title: "Render services and service types",
        url: "https://render.com/docs/service-types",
        claimIds: ["RENDER-MODEL-001", "RENDER-DATABASE-001"],
      },
      {
        title: "Docker on Render",
        url: "https://render.com/docs/docker",
        claimIds: ["RENDER-DOCKER-001"],
      },
      {
        title: "Render persistent disks",
        url: "https://render.com/docs/disks",
        claimIds: ["RENDER-STORAGE-001", "RENDER-BACKUP-001"],
      },
      {
        title: "Scaling Render services",
        url: "https://render.com/docs/scaling",
        claimIds: ["RENDER-SCALING-002"],
      },
    ],
    claimIds: [
      "RENDER-PRICE-001",
      "RENDER-SCALE-001",
      "RENDER-OPERATIONS-001",
      "RENDER-MODEL-001",
      "RENDER-DATABASE-001",
      "RENDER-DOCKER-001",
      "RENDER-STORAGE-001",
      "RENDER-BACKUP-001",
      "RENDER-SCALING-002",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Does Render give me ownership of the underlying VPS?",
        answer:
          "Render provides managed service instances rather than a customer-owned root VPS. Opslin is designed around a separate VPS account controlled by the customer.",
      },
      {
        question: "When is Render likely to be a better fit?",
        answer:
          "Render may fit better when managed compute, datastores, private networking, scaling, and lower host-administration responsibility matter more than direct server ownership.",
      },
    ],
  },
  {
    slug: "opslin-vs-heroku",
    provider: "Heroku",
    category: "Managed application platform",
    operatingModel:
      "Heroku runs applications in Heroku-managed dynos and provides deployment, routing, logs, scaling, data services, add-ons, and platform operations.",
    directAnswer:
      "Heroku is a mature managed PaaS built around dynos, buildpacks, data services, add-ons, routing, logs, and automated platform operations. Opslin uses a managed control plane but leaves the workload and server under the customer's VPS account. Heroku may fit teams prioritizing a mature ecosystem and minimal host administration; Opslin may fit teams requiring provider choice, persistent server access, custom host configuration, and infrastructure ownership.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Heroku is a managed PaaS where applications execute in Heroku-managed dynos.",
      },
      {
        label: "Workload location",
        opslin: "Applications run on a compatible VPS selected by the customer.",
        alternative: "All Heroku applications run in dynos on the Heroku platform.",
      },
      {
        label: "Compute ownership",
        opslin: "The customer owns the VPS account and pays its provider directly.",
        alternative: "Heroku supplies and bills dyno compute and data services.",
      },
      {
        label: "Server access",
        opslin: "The customer retains the VPS and can use administrative access independently of Opslin.",
        alternative: "One-off dynos provide process access, but the underlying Heroku host is not a customer-administered VPS.",
      },
      {
        label: "Deployment model",
        opslin: "Git or upload workflows deploy to the connected VPS.",
        alternative: "Git, container, and buildpack workflows create releases executed by managed dynos.",
      },
      {
        label: "Scaling",
        opslin: "Scaling remains bounded by the customer's server and Opslin's current beta surface.",
        alternative: "Standard and higher dyno tiers document horizontal scaling; selected tiers include autoscaling.",
      },
      {
        label: "Filesystem and persistence",
        opslin: "The VPS filesystem persists according to the customer's storage and deployment design.",
        alternative: "Dyno filesystems are ephemeral; durable data belongs in a data service or external store.",
      },
      {
        label: "Databases and ecosystem",
        opslin: "Supported databases can be provisioned on the customer's server for eligible plans.",
        alternative: "Heroku provides managed data products and a long-established add-on marketplace.",
      },
      {
        label: "Operational responsibility",
        opslin: "The customer remains responsible for server hardening, capacity, storage, application behavior, and recovery planning.",
        alternative: "Heroku manages OS patching, container orchestration, routing, and platform infrastructure; customers manage applications and service configuration.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "Dynos, data services, add-ons, and enterprise features are priced separately by tier and consumption rules.",
      },
    ],
    strengths: [
      "Mature managed PaaS with established buildpack, release, dyno, data-service, and add-on concepts.",
      "Platform-managed OS patching, routing, certificate workflows, logs, and container operations.",
      "Documented horizontal scaling, metrics, alerts, zero-downtime options, and enterprise isolation tiers.",
      "A broad ecosystem and operational model that does not require administering a VPS.",
    ],
    opslinFit: [
      "You require a customer-owned server and provider-neutral infrastructure account.",
      "You need root-level host configuration or long-running software outside a managed dyno abstraction.",
      "You accept server operations in exchange for infrastructure ownership and flexibility.",
    ],
    alternativeFit: [
      "You prioritize a mature managed PaaS and established add-on ecosystem.",
      "You do not want to patch, harden, or operate a Linux VPS.",
      "Heroku's dyno, managed data, scaling, compliance, or support options match your requirements.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Heroku prices dyno compute by type and usage rules, with data services, add-ons, Private Spaces, and enterprise services charged separately.",
      datedExample:
        "Reviewed 16 July 2026: Heroku lists Eco at $5/month, Basic at $7/month, Standard-1X at $25/month, and Standard-2X at $50/month; Eco sleeps after 30 minutes of inactivity, while Basic is documented as always on.",
      claimId: "HEROKU-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Heroku pricing",
        url: "https://www.heroku.com/pricing/",
        claimIds: ["HEROKU-PRICE-001", "HEROKU-SCALE-001", "HEROKU-OPERATIONS-001"],
      },
      {
        title: "Heroku dynos",
        url: "https://devcenter.heroku.com/articles/dynos",
        claimIds: ["HEROKU-MODEL-001", "HEROKU-FILESYSTEM-001", "HEROKU-ACCESS-001"],
      },
    ],
    claimIds: [
      "HEROKU-PRICE-001",
      "HEROKU-SCALE-001",
      "HEROKU-OPERATIONS-001",
      "HEROKU-MODEL-001",
      "HEROKU-FILESYSTEM-001",
      "HEROKU-ACCESS-001",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Is Opslin a drop-in replacement for Heroku?",
        answer:
          "No. Heroku supplies managed dyno compute and platform services. Opslin coordinates selected deployment and server workflows on a customer-operated VPS, which creates different responsibilities.",
      },
      {
        question: "Does Opslin claim broader maturity than Heroku?",
        answer:
          "No. Opslin is in beta and should be chosen only when its current documented scope is sufficient. Heroku has a much longer-established platform and ecosystem.",
      },
    ],
  },
  {
    slug: "opslin-vs-vercel",
    provider: "Vercel",
    category: "Managed application platform",
    operatingModel:
      "Vercel provides an application cloud centered on web deployments, global delivery, managed functions, framework workflows, observability, security, and integrated storage services.",
    directAnswer:
      "Vercel is optimized for web application delivery, especially framework-native frontend and function workloads, with managed CI/CD, CDN, Functions, previews, rollbacks, observability, security, and storage integrations. Opslin targets broader VPS-hosted applications and server operations on infrastructure the customer controls. Vercel may fit frontend-heavy teams wanting managed global delivery; Opslin may fit long-running or custom server workloads that require root access and provider-neutral infrastructure.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Vercel is a managed application cloud with platform-managed builds, delivery, functions, and services.",
      },
      {
        label: "Workload location",
        opslin: "Applications run on the customer's selected compatible VPS.",
        alternative: "Deployments and Functions run in Vercel-managed delivery and compute environments.",
      },
      {
        label: "Compute ownership",
        opslin: "The customer owns and pays for the VPS directly.",
        alternative: "Vercel provides and meters managed function, build, delivery, and storage resources.",
      },
      {
        label: "Server access",
        opslin: "The customer retains administrative access and can customize the Linux host.",
        alternative: "Vercel exposes application and function configuration, not root access to a customer-owned host.",
      },
      {
        label: "Deployment model",
        opslin: "Normal beta workflows deploy supported applications onto the connected VPS.",
        alternative: "Git-based CI/CD creates immutable preview and production deployments with framework-aware builds.",
      },
      {
        label: "Runtime shape",
        opslin: "Supports normal containerized application targets, including long-running server processes within VPS limits.",
        alternative: "Official Functions runtimes package handlers into managed functions with runtime, duration, filesystem, and plan limits.",
      },
      {
        label: "Delivery and scaling",
        opslin: "Traffic reaches the customer VPS through its domain and reverse-proxy configuration.",
        alternative: "Global delivery, CDN, automatic function concurrency scaling, and multi-region options are platform features.",
      },
      {
        label: "Storage",
        opslin: "The customer designs and operates persistent storage on or beside the VPS.",
        alternative: "Functions have a read-only filesystem with temporary scratch space; Vercel offers separately metered storage products and integrations.",
      },
      {
        label: "Observability and rollback",
        opslin: "Beta deployment logs, health, metrics, and recorded-release rollback are available within documented boundaries.",
        alternative: "Built-in observability, deployment history, previews, and plan-dependent instant rollback are documented.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "Plan and seat pricing plus metered delivery, build, compute, storage, observability, and security usage after included allowances.",
      },
    ],
    strengths: [
      "Strong framework-aware CI/CD, preview deployments, rollbacks, and global application delivery.",
      "Managed Functions with automatic concurrency scaling and multiple official runtimes.",
      "Integrated CDN, domains, firewall, observability, performance tooling, and storage products.",
      "A particularly cohesive workflow for frontend-heavy and Vercel-native web applications.",
    ],
    opslinFit: [
      "You need root-level control or host software that does not fit a managed function environment.",
      "Your application is a long-running service or custom server workload on a chosen VPS.",
      "Provider-neutral infrastructure ownership is more important than integrated global web delivery.",
    ],
    alternativeFit: [
      "Your workload is frontend-heavy and benefits from Vercel's framework, preview, CDN, and function ecosystem.",
      "You want platform-managed global delivery and automatic compute scaling.",
      "Vercel's security, observability, compliance, collaboration, and enterprise features are required.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Vercel combines plan and team-seat pricing with included usage and metered delivery, function, build, storage, observability, and add-on charges.",
      datedExample:
        "Reviewed 16 July 2026: Vercel lists Hobby at $0 and Pro at $20/month with $20 included usage credit; Pro developer seats are listed at $20/month, with metered usage applying beyond product allowances.",
      claimId: "VERCEL-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Vercel pricing",
        url: "https://vercel.com/pricing",
        claimIds: ["VERCEL-PRICE-001", "VERCEL-DELIVERY-001", "VERCEL-OBSERVABILITY-001"],
      },
      {
        title: "Vercel Functions runtimes",
        url: "https://vercel.com/docs/functions/runtimes",
        claimIds: ["VERCEL-RUNTIME-001", "VERCEL-FILESYSTEM-001", "VERCEL-SCALE-001"],
      },
      {
        title: "Vercel instant rollback",
        url: "https://vercel.com/docs/instant-rollback",
        claimIds: ["VERCEL-ROLLBACK-001"],
      },
      {
        title: "Vercel observability",
        url: "https://vercel.com/docs/observability",
        claimIds: ["VERCEL-OBSERVABILITY-002"],
      },
    ],
    claimIds: [
      "VERCEL-PRICE-001",
      "VERCEL-DELIVERY-001",
      "VERCEL-OBSERVABILITY-001",
      "VERCEL-RUNTIME-001",
      "VERCEL-FILESYSTEM-001",
      "VERCEL-SCALE-001",
      "VERCEL-ROLLBACK-001",
      "VERCEL-OBSERVABILITY-002",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Is Opslin intended to replace Vercel for every frontend application?",
        answer:
          "No. Vercel may be the stronger fit when integrated framework builds, previews, global delivery, and managed functions are the primary requirements.",
      },
      {
        question: "When does Opslin's VPS model matter?",
        answer:
          "It matters when the application needs a customer-owned Linux server, root-level customization, long-running processes, or independent choice of infrastructure provider.",
      },
    ],
  },
  {
    slug: "opslin-vs-manual-vps",
    provider: "Manual VPS",
    category: "Manual infrastructure operations",
    operatingModel:
      "The customer acquires a server and directly installs, configures, secures, deploys, monitors, backs up, updates, and troubleshoots every required component.",
    directAnswer:
      "Manual VPS operation provides maximum freedom and avoids an additional deployment-platform dependency, but the operator must assemble and maintain the runtime, process supervision, reverse proxy, TLS, firewall, logs, metrics, databases, updates, backups, and recovery procedures. Opslin keeps the VPS under the customer's account while automating selected repeatable workflows. Manual operation may fit expert teams with mature automation; Opslin may fit teams wanting a managed interface without surrendering server ownership.",
    dimensions: [
      {
        label: "Operating model",
        opslin: opslinOperatingModel,
        alternative: "Operators use SSH, scripts, configuration management, or internal tooling without an Opslin control plane.",
      },
      {
        label: "Workload location",
        opslin: "Applications run on the customer's VPS.",
        alternative: "Applications run on the customer's VPS; there is no additional platform layer unless the team builds one.",
      },
      {
        label: "Control-plane responsibility",
        opslin: "Opslin maintains the hosted dashboard and API; the customer maintains the VPS.",
        alternative: "The customer owns every operational interface, script, dashboard, credential, and automation path.",
      },
      {
        label: "Server access",
        opslin: "The customer retains administrative access while Opslin's agent performs approved workflows.",
        alternative: "The customer has unrestricted access and defines all account, SSH, sudo, and command boundaries.",
      },
      {
        label: "Deployment model",
        opslin: "Repeatable dashboard workflows coordinate build, release, domain, SSL, health, logs, and selected rollback operations.",
        alternative: "The team designs and maintains deployment scripts, CI/CD, process management, release history, and rollback procedures.",
      },
      {
        label: "Security operations",
        opslin: "Opslin can coordinate selected firewall and access workflows, but the customer remains responsible for host security.",
        alternative: "The customer configures users, SSH, firewall, container networking, patches, secrets, and incident procedures directly.",
      },
      {
        label: "Domains and TLS",
        opslin: "Eligible workflows coordinate supported reverse-proxy, DNS, and certificate tasks.",
        alternative: "The operator configures nginx or another proxy, DNS, certificate issuance, and renewal monitoring.",
      },
      {
        label: "Observability",
        opslin: "Deployment state, supported metrics, health, logs, alerts, and activity are organized in the control plane.",
        alternative: "The team selects, installs, integrates, retains, secures, and pays for its own logs, metrics, alerts, and dashboards.",
      },
      {
        label: "Backups and recovery",
        opslin: "Opslin backup and restore remain gated validation; independent tested backups are still required.",
        alternative: "The customer fully designs, schedules, stores, verifies, restores, and drills every backup path.",
      },
      {
        label: "Pricing model",
        opslin: opslinPricingModel,
        alternative: "No deployment-platform fee, but VPS, storage, bandwidth, domains, tools, and engineering/operations time remain costs.",
      },
    ],
    strengths: [
      "Maximum freedom to choose software, topology, permissions, and automation.",
      "No dependency on an additional commercial deployment control plane.",
      "Can fit specialized environments that a general product does not model.",
      "Experienced teams can integrate existing infrastructure-as-code, observability, security, and incident processes.",
    ],
    opslinFit: [
      "You want to reduce repetitive deployment and server-management work through one dashboard.",
      "You still require the VPS account and workloads to remain under your control.",
      "Your current needs fit Opslin's verified beta capabilities and documented limitations.",
    ],
    alternativeFit: [
      "Your team already has reliable automation, monitoring, backup, hardening, and incident-response processes.",
      "You need unrestricted custom topology or software outside Opslin's supported workflow.",
      "Avoiding any additional platform dependency is more important than a managed dashboard.",
    ],
    opslinLimitations: currentOpslinLimitations,
    pricing: {
      model: "Manual VPS operation has no separate deployment-platform subscription, but infrastructure and engineering effort remain real and workload-specific costs.",
      datedExample:
        "Reviewed 16 July 2026: no universal price is stated because VPS, storage, bandwidth, backup, domain, security, monitoring, and operator-time costs vary by provider and design. Compare a complete bill of materials rather than server price alone.",
      claimId: "MANUAL-PRICE-001",
      reviewedAt: comparisonReviewedAt,
      nextReviewAt: comparisonNextPricingReviewAt,
    },
    sources: [
      {
        title: "Ubuntu Server security suggestions",
        url: "https://ubuntu.com/server/docs/explanation/security/security_suggestions/",
        claimIds: ["MANUAL-SECURITY-001", "MANUAL-UPDATES-001"],
      },
      {
        title: "Install Docker Engine on Ubuntu",
        url: "https://docs.docker.com/engine/install/ubuntu/",
        claimIds: ["MANUAL-CONTAINER-001", "MANUAL-FIREWALL-001"],
      },
      {
        title: "nginx beginner's guide",
        url: "https://nginx.org/en/docs/beginners_guide.html",
        claimIds: ["MANUAL-PROXY-001"],
      },
      {
        title: "Certbot instructions",
        url: "https://certbot.eff.org/instructions",
        claimIds: ["MANUAL-TLS-001"],
      },
    ],
    claimIds: [
      "MANUAL-PRICE-001",
      "MANUAL-SECURITY-001",
      "MANUAL-UPDATES-001",
      "MANUAL-CONTAINER-001",
      "MANUAL-FIREWALL-001",
      "MANUAL-PROXY-001",
      "MANUAL-TLS-001",
    ],
    reviewedAt: comparisonReviewedAt,
    nextFeatureReviewAt: comparisonNextFeatureReviewAt,
    verificationStatus: "Verified from official sources",
    faqs: [
      {
        question: "Is manual VPS operation free?",
        answer:
          "It avoids an additional deployment-platform subscription, but the server, storage, bandwidth, tooling, backups, domains, and operator time still carry costs.",
      },
      {
        question: "Does Opslin remove the need for server administration?",
        answer:
          "No. Opslin automates selected workflows, but customers remain responsible for the VPS, capacity, application behavior, storage, backup strategy, and incident response.",
      },
    ],
  },
] satisfies ComparisonRegistryEntry[];

export const comparisons: Comparison[] = comparisonEntries.map((comparison) => ({
  ...comparison,
  chooseOpslin: comparison.opslinFit,
  chooseAlternative: comparison.alternativeFit,
  pricingModel: `${comparison.pricing.model} ${comparison.pricing.datedExample}`,
  nextPricingReview: comparison.pricing.nextReviewAt,
  nextFeatureReview: comparison.nextFeatureReviewAt,
}));

export function getComparisonBySlug(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug);
}
