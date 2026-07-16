import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ShineBorder({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] p-px",
        "bg-[linear-gradient(135deg,rgba(34,197,94,0.52),rgba(255,255,255,0.7),rgba(24,24,27,0.12))]",
        "shadow-[0_30px_90px_rgba(24,24,27,0.16)]",
        className
      )}
    >
      <div className={cn("relative rounded-[calc(2rem-1px)]", innerClassName)}>{children}</div>
    </div>
  );
}
