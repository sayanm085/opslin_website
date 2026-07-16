"use client";

import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { useTrackEvent } from "@/hooks/use-track-event";

const demoSteps = ["Sign up", "Install agent", "Claim server", "Connect repo", "Deploy app", "See logs/metrics"];

export function DemoSection() {
  const [showPreview, setShowPreview] = useState(false);
  const trackEvent = useTrackEvent();

  return (
    <section id="demo" className="landing-dark landing-section border-b border-white/10 bg-[#111111]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Demo</p>
          <h2 className="landing-heading mx-auto">See Opslin in action.</h2>
          <p className="landing-description mx-auto mt-4">
            A 60 to 90 second walkthrough from signup to agent install, repo connection, deploy,
            logs, and metrics.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#0A0A0A] shadow-2xl shadow-green-500/5">
            <div className="relative aspect-[4/5] sm:aspect-video">
              <div className="absolute inset-0 overflow-hidden bg-[#0A0A0A] text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_45%)]" />
                <div className="absolute inset-3 rounded-2xl border border-zinc-800 bg-[#111111]/80 sm:inset-6" />
                <div className="absolute left-4 right-4 top-4 grid gap-2 sm:left-6 sm:right-6 sm:top-6 sm:grid-cols-3 sm:gap-3">
                  {demoSteps.slice(0, 3).map((step, index) => (
                    <div
                      key={step}
                      className={[
                        "rounded-xl border border-zinc-800 bg-[#0A0A0A]/80 p-3",
                        index > 1 ? "hidden sm:block" : "",
                      ].join(" ")}
                    >
                      <span className="text-xs font-medium text-green-400">0{index + 1}</span>
                      <p className="mt-2 text-sm text-zinc-300">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-zinc-800 bg-[#0A0A0A]/90 p-4 sm:inset-x-6 sm:bottom-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 sm:size-10">
                      <span className="size-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">my-api deployed successfully</p>
                      <p className="text-xs text-zinc-500">Build, SSL, logs, and metrics are ready.</p>
                    </div>
                    <span className="ml-auto hidden rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 sm:inline-flex">
                      Live
                    </span>
                  </div>
                </div>
                {showPreview ? (
                  <a
                    href="/demo"
                    className="absolute left-1/2 top-1/2 inline-flex w-auto -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-all hover:scale-105 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                    aria-label="Open Opslin demo workspace"
                    onClick={() => trackEvent("cta_click", { location: "demo", action: "open_workspace" })}
                  >
                    Open workspace
                    <ArrowRight className="size-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("demo_play", { location: "demo" });
                      setShowPreview(true);
                    }}
                    className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition-all hover:scale-110 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 sm:size-20"
                    aria-label="Play silent Opslin demo preview"
                  >
                    <Play className="ml-1 size-7 fill-current sm:size-8" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {demoSteps.map((step) => (
              <span key={step} className="rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-500">
                {step}
              </span>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/demo"
              className="landing-btn-primary inline-flex items-center gap-2"
              onClick={() => trackEvent("cta_click", { location: "demo", action: "open_demo" })}
            >
              Open Demo
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
