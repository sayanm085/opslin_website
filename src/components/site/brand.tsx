import Link from "next/link";

export function OpslinMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M39.2 31.8A18.4 18.4 0 1 0 14.1 41c4.8 2.9 11 3.4 16.2 1.1"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <path
        d="M13 29.6c1.1-8.3 6.7-14.2 14.6-15.4 3.5-.5 6.4.4 7.4 2.5 1 2.2-.5 4.4-3.6 5.2-5.7 1.5-10 5.2-12.8 11.1"
        fill="currentColor"
      />
      <path
        d="M34.6 16.7 20.2 35h18.6"
        stroke="currentColor"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Opslin home"
      className={`inline-flex min-h-10 items-center gap-2 font-semibold tracking-tight ${
        inverse ? "text-text-inverse" : "text-foreground"
      }`}
    >
      <OpslinMark className="size-9" />
      <span className="text-xl">Opslin</span>
    </Link>
  );
}
