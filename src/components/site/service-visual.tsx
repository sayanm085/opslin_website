import { Activity, Check, Database, GitBranch, KeyRound, Server, ShieldCheck } from "lucide-react";
import { EvergreenStage } from "@/components/site/evergreen-stage";
import type { ServiceContent } from "@/lib/marketing-content";
import { visualAssets } from "@/lib/visual-assets";

const assets = { deployment: visualAssets.deployment, observability: visualAssets.observability, security: visualAssets.security, databases: visualAssets.databases };

export function ServiceVisual({ kind, compact = false }: { kind: ServiceContent["visualKind"]; compact?: boolean }) {
  const labels = {
    deployment: [[GitBranch, "Source selected"], [Server, "Release on your VPS"], [Check, "Health returned"]],
    observability: [[Activity, "Health context"], [Server, "Server metrics"], [Check, "Configured alert"]],
    security: [[ShieldCheck, "Signed work"], [KeyRound, "Authenticated channel"], [Server, "Outbound agent"]],
    databases: [[Database, "Engine selected"], [Server, "Provisioned on VPS"], [KeyRound, "Connection details"]],
  }[kind];
  return <EvergreenStage className={compact ? "service-visual-compact" : ""} asset={assets[kind]} caption={compact ? undefined : "Atmospheric illustration. The labelled checkpoints describe the verified workflow; this is not a live customer environment."}><div className="service-visual-labels">{labels.map(([Icon, label]) => { const ItemIcon=Icon as typeof Check; return <span key={label as string}><ItemIcon />{label as string}</span>; })}</div></EvergreenStage>;
}
