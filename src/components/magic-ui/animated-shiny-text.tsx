import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedShinyText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur",
        "before:mr-2 before:size-1.5 before:rounded-full before:bg-green-500 before:content-['']",
        "landing-shine",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}
