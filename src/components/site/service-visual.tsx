import Image from "next/image";
import { ServiceSimulation } from "@/components/site/service-simulation";
import type { ServiceContent } from "@/lib/marketing-content";
import { visualAssets } from "@/lib/visual-assets";

const assets = { deployment: visualAssets.deployment, observability: visualAssets.observability, security: visualAssets.security, databases: visualAssets.databases };

export function ServiceVisual({ kind, compact = false }: { kind: ServiceContent["visualKind"]; compact?: boolean }) {
  if (compact) {
    return (
      <div className="relative mt-5 overflow-hidden rounded-[var(--opslin-radius-2xl)] border border-border bg-inverse p-2">
        <div className="relative overflow-hidden rounded-xl">
          <Image src={assets[kind].path} alt="" width={assets[kind].width} height={assets[kind].height} className="visual-asset-light aspect-[16/5] w-full object-cover opacity-70" sizes="(max-width: 768px) 90vw, 42vw" />
          {assets[kind].darkPath ? <Image src={assets[kind].darkPath} alt="" width={assets[kind].width} height={assets[kind].height} className="visual-asset-dark aspect-[16/5] w-full object-cover opacity-80" sizes="(max-width: 768px) 90vw, 42vw" /> : null}
          <div className="absolute inset-0 bg-gradient-to-t from-inverse to-transparent" aria-hidden="true" />
        </div>
        <div className="relative -mt-8"><ServiceSimulation kind={kind} compact /></div>
      </div>
    );
  }

  return (
    <figure className="grid gap-3">
      <div className="relative overflow-hidden rounded-[var(--opslin-radius-2xl)] border border-border">
        <Image src={assets[kind].path} alt="" width={assets[kind].width} height={assets[kind].height} className="visual-asset-light aspect-[16/6] w-full object-cover opacity-80" sizes="(max-width: 1024px) 94vw, 52vw" priority />
        {assets[kind].darkPath ? <Image src={assets[kind].darkPath} alt="" width={assets[kind].width} height={assets[kind].height} className="visual-asset-dark aspect-[16/6] w-full object-cover opacity-85" sizes="(max-width: 1024px) 94vw, 52vw" priority /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/35 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-3 left-3 rounded-full border border-border-inverse bg-inverse/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-on-inverse-muted backdrop-blur-sm">Atmospheric product illustration</span>
      </div>
      <div className="relative -mt-10 mx-2 sm:mx-4"><ServiceSimulation kind={kind} /></div>
      <figcaption className="px-2 text-xs leading-5 text-muted-foreground">The controls above run a deterministic browser-only example. They do not connect to a repository, Opslin API, agent, server, or database.</figcaption>
    </figure>
  );
}
