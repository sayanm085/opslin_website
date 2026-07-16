import { Info } from "lucide-react";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    title: "Install the Opslin agent on your VPS",
    description: "Run one installer on a Linux server you already own or rent.",
  },
  {
    title: "Claim the server from your dashboard",
    description: "Use the claim flow to attach the outbound agent to your Opslin account.",
  },
  {
    title: "Connect GitHub or paste a Git URL",
    description: "Bring any repository into the control plane without changing your app code.",
  },
  {
    title: "Deploy your app",
    description: "Build, configure nginx, issue SSL, and promote the release from one flow.",
  },
  {
    title: "View logs, metrics, SSL, rollback, and databases",
    description: "Operate the app after launch without falling back to SSH for every routine task.",
  },
];

function TimelineStep({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="landing-reveal relative grid grid-cols-[2.5rem_1fr] gap-5" delay={index * 100}>
      <div className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-green-500 bg-[#141414] text-sm font-bold text-green-400 shadow-glow-sm">
        {index + 1}
      </div>
      <article className="pb-10">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
      </article>
    </Reveal>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-dark landing-section border-b border-white/10">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">How It Works</p>
          <h2 className="landing-heading mx-auto">From a blank VPS to a managed app workflow.</h2>
          <p className="landing-description mx-auto mt-4">
            Opslin keeps the setup sequence short: install one agent, connect a repository, and
            operate the result from a browser dashboard.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative">
            <div className="absolute left-5 top-0 h-[calc(100%-2.5rem)] w-0.5 bg-zinc-800" />
            {steps.map((step, index) => (
              <TimelineStep key={step.title} index={index} {...step} />
            ))}
          </div>

          <div className="landing-card mt-2 flex gap-4 border-zinc-800 bg-[#111111]">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Info className="size-5" />
            </div>
            <div>
              <p className="font-medium text-white">Outbound-only by default</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                The agent connects outbound to Opslin. No inbound management port is required.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
