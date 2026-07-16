import Image from "next/image";
import type { ReactNode } from "react";
import type { VisualAsset } from "@/lib/visual-assets";

export function ParticleField() {
  return <span className="particle-field" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} />)}</span>;
}

export function EvergreenStage({ asset, children, caption, priority = false, className = "" }: { asset?: VisualAsset; children?: ReactNode; caption?: string; priority?: boolean; className?: string }) {
  return (
    <figure className={`evergreen-stage ${className}`}>
      <div className="evergreen-stage-inner">
        <ParticleField />
        {asset ? <Image className="evergreen-stage-image" src={asset.path} alt={asset.decorative ? "" : asset.alt} width={asset.width} height={asset.height} priority={priority} sizes="(max-width: 768px) 94vw, (max-width: 1280px) 86vw, 1200px" /> : null}
        {children ? <div className="evergreen-stage-content">{children}</div> : null}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
