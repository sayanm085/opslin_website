import Image from "next/image";
import type { BrandAsset } from "@/lib/brand-assets";

export function BrandMark({ asset, compact = false }: { asset: BrandAsset; compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark-compact" : ""}`}>
      <span className="brand-mark-icon" aria-hidden="true">
        {asset.path ? <Image src={asset.path} alt="" width={28} height={28} /> : <span>{asset.monogram}</span>}
      </span>
      {!compact ? <span>{asset.name}</span> : <span className="sr-only">{asset.accessibleLabel}</span>}
    </span>
  );
}
