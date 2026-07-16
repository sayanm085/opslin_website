"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { Reveal } from "@/components/reveal";

const stats = [
  {
    end: 6,
    suffix: " mo",
    label: "Starter beta",
    detail: "Starter is free for six months while V2.1 beta feedback is collected.",
  },
  {
    end: 0,
    suffix: "",
    label: "Inbound management ports",
    detail: "The Opslin agent connects outbound; no public management port is required.",
  },
  {
    end: 10,
    suffix: "",
    label: "Plain-language FAQs",
    detail: "The landing page answers the hard questions before you connect a server.",
  },
  {
    end: 5,
    suffix: "",
    label: "Published beta plans",
    detail: "Pricing is visible in INR, with paid access opening gradually during beta.",
  },
];

function StatCard({
  end,
  suffix,
  label,
  detail,
}: {
  end: number;
  suffix: string;
  label: string;
  detail: string;
}) {
  const { count, ref } = useCountUp(end, 1600);

  return (
    <article ref={ref} className="landing-card group relative overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-green-500/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <p className="text-4xl font-semibold tracking-normal text-zinc-950 sm:text-6xl">
        {count}
        <span className="text-3xl text-green-600">{suffix}</span>
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-4 text-sm leading-6 text-zinc-600">{detail}</p>
    </article>
  );
}

export function StatsSection() {
  return (
    <section className="landing-section border-b border-black/10 bg-[#EFE9DE]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Beta transparency</p>
          <h2 className="landing-heading mx-auto">Clear facts, not inflated traction claims.</h2>
          <p className="landing-description mx-auto mt-4">
            Opslin is early. These numbers describe the beta offer and security posture, not made-up
            customer adoption.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} className="landing-reveal" delay={index * 100}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
