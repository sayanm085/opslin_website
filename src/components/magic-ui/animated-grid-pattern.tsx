import type { SVGProps } from "react";

export function AnimatedGridPattern({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={`magic-grid-pattern ${className}`} viewBox="0 0 1200 720" fill="none" aria-hidden="true" {...props}>
      <defs>
        <pattern id="opslin-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" className="magic-grid-line" />
        </pattern>
        <radialGradient id="opslin-grid-mask" cx="50%" cy="38%" r="62%">
          <stop offset="0" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id="opslin-grid-fade">
          <rect width="1200" height="720" fill="url(#opslin-grid-mask)" />
        </mask>
      </defs>
      <rect width="1200" height="720" fill="url(#opslin-grid)" mask="url(#opslin-grid-fade)" />
      {Array.from({ length: 12 }, (_, index) => (
        <rect key={index} x={(index * 97) % 1100} y={(index * 151) % 620} width="44" height="44" className="magic-grid-cell" style={{ animationDelay: `${index * 170}ms` }} />
      ))}
    </svg>
  );
}
