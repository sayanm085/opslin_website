import Image from "next/image";
import { Box, CloudCog, Database, GitBranch, RadioTower, Server } from "lucide-react";
import { AnimatedGridPattern } from "@/components/magic-ui/animated-grid-pattern";
import { visualAssets } from "@/lib/visual-assets";

const nodes = [
  { label: "Source", icon: GitBranch, className: "hero-signal-source" },
  { label: "Control plane", icon: CloudCog, className: "hero-signal-control" },
  { label: "Outbound agent", icon: RadioTower, className: "hero-signal-agent" },
  { label: "Your VPS", icon: Server, className: "hero-signal-server" },
  { label: "Docker", icon: Box, className: "hero-signal-docker" },
  { label: "Databases", icon: Database, className: "hero-signal-database" },
];

export function HeroDevOpsField() {
  return (
    <div className="hero-devops-field" aria-hidden="true">
      <Image
        className="hero-devops-atmosphere"
        src={visualAssets.heroDevops.path}
        alt=""
        width={visualAssets.heroDevops.width}
        height={visualAssets.heroDevops.height}
        priority
        sizes="100vw"
      />
      <AnimatedGridPattern />
      <div className="hero-signal-path"><i /></div>
      {nodes.map(({ label, icon: Icon, className }) => (
        <span key={label} className={`hero-signal-node ${className}`}>
          <Icon />
          <b>{label}</b>
        </span>
      ))}
    </div>
  );
}
