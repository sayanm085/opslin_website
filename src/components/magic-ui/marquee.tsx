import type { ReactNode } from "react";

export function Marquee({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <div className={`magic-marquee ${className}`} role="region" aria-label={label} tabIndex={0}>
      <div className="magic-marquee-track">
        <div className="magic-marquee-group">{children}</div>
        <div className="magic-marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
