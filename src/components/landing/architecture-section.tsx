import { Check, Cloud, Server, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const trustPoints = [
  "Apps run on your VPS",
  "Opslin runs the control plane",
  "Agent connects outbound only",
  "Credentials are encrypted",
  "Actions are audit logged",
  "No inbound management port required",
];

export function ArchitectureSection() {
  return (
    <section className="landing-dark landing-section border-b border-white/10">
      <Reveal className="landing-container landing-reveal grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="landing-label">Architecture</p>
          <h2 className="landing-heading">Built for developers who want control without manual operations.</h2>
          <p className="landing-description mt-5">
            Opslin does not host your app workloads. Your applications stay on your own infrastructure.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point, index) => (
              <Reveal
                key={point}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-[#111111] px-4 py-3 text-sm text-zinc-300"
                delay={index * 70}
              >
                <Check className="size-4 shrink-0 text-emerald-400" />
                {point}
              </Reveal>
            ))}
          </div>
        </div>

        <div className="landing-card relative overflow-hidden border-zinc-800 bg-[#141414]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.12),transparent_45%)]" />
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Trust architecture</p>
                <p className="mt-1 text-xs text-zinc-500">Agent to cloud, workloads stay local</p>
              </div>
              <ShieldCheck className="size-5 text-green-400" />
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <Server className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">YOUR VPS</p>
                    <p className="text-xs text-zinc-500">Apps and databases</p>
                  </div>
                </div>
                <div className="mt-5 rounded-xl border border-zinc-800 bg-[#111111] p-4">
                  <p className="text-sm font-medium text-white">Agent</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">Outbound connection only</p>
                </div>
                <p className="mt-5 text-sm text-zinc-500">Your apps run here.</p>
              </div>

              <div className="relative hidden w-20 lg:block">
                <div className="h-px border-t border-dashed border-green-500/70" />
                <div className="absolute -top-3 right-0 text-green-400">►</div>
                <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                  outbound
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <Cloud className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">OPSLIN CLOUD</p>
                    <p className="text-xs text-zinc-500">Control plane only</p>
                  </div>
                </div>
                <div className="mt-5 rounded-xl border border-zinc-800 bg-[#111111] p-4">
                  <p className="text-sm font-medium text-white">Dashboard + API</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">Deploys, logs, metrics, actions</p>
                </div>
                <p className="mt-5 text-sm text-zinc-500">Opslin manages orchestration.</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
