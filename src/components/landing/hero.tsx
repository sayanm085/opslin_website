"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Play, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { TrackedLink } from "@/components/tracked-link";
import { AnimatedShinyText } from "@/components/magic-ui/animated-shiny-text";
import { ShineBorder } from "@/components/magic-ui/shine-border";
import { siteLinks } from "@/lib/site-links";
import { cn } from "@/lib/utils";

const trustBadges = ["Private beta", "No credit card", "Workloads stay on your VPS"];
const pipeline = ["Build", "Deploy", "Live"];
const logs = [
  "agent connected outbound",
  "buildpack detected: node",
  "ssl certificate queued",
  "container promoted to your VPS",
];

// Looping mini deploy-cinematic for the hero mockup: the pipeline advances
// and log lines stream in, then holds at "Live" before resetting. Plain
// framer-motion + setInterval, not gsap — gsap stays reserved for the real
// in-app deploy cinematic. Reduced motion shows the final "Live" state only.
const FRAME_COUNT = 5;
const FRAME_MS = 1500;

function useHeroDeployLoop() {
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState(reduceMotion ? FRAME_COUNT - 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setFrame((current) => (current + 1) % FRAME_COUNT);
    }, FRAME_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return {
    activeStep: Math.min(frame, pipeline.length - 1),
    visibleLogCount: Math.min(frame + 1, logs.length),
    statusLabel: frame === 0 ? "Building" : frame === 1 ? "Deploying" : "Ready",
  };
}

export function Hero() {
  const { activeStep, visibleLogCount, statusLabel } = useHeroDeployLoop();

  return (
    <section className="landing-grid-bg relative overflow-hidden border-b border-black/10 bg-[#F7F4EE] pb-16 pt-12 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(34,197,94,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(247,244,238,0.9)_45%,rgba(239,233,222,0.92))]" />
      <div className="landing-container relative">
        <div className="mx-auto max-w-5xl text-center">
          <AnimatedShinyText>Transparent V2.1 beta for VPS owners</AnimatedShinyText>

          <h1 className="mx-auto mt-7 max-w-5xl text-center text-4xl font-semibold leading-[1.03] tracking-normal text-zinc-950 sm:text-6xl lg:text-7xl">
            Deploy apps on your own VPS without turning into a DevOps team.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-zinc-600 sm:mt-6 sm:text-xl sm:leading-8">
            Opslin is a beta control plane for Linux servers: Git deploys, SSL, logs, metrics,
            databases, and rollback from one dashboard while your apps remain on your infrastructure.
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
            <TrackedLink
              href={siteLinks.register}
              className="landing-btn-primary gap-2 px-7 py-3.5 text-base"
              trackEvent="cta_click"
              trackProperties={{ location: "hero", action: "register" }}
            >
              Start Free Beta
              <ArrowRight className="size-4" />
            </TrackedLink>
            <TrackedLink
              href="#demo"
              className="landing-btn-secondary gap-2 px-7 py-3.5 text-base"
              trackEvent="cta_click"
              trackProperties={{ location: "hero", action: "watch_demo" }}
            >
              Watch Demo
              <Play className="size-4 fill-current" />
            </TrackedLink>
          </div>

          <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2.5 sm:max-w-none sm:gap-3">
            {trustBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm ring-1 ring-black/10 sm:text-sm">
                <Check className="size-4 text-green-600" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl sm:mt-16">
          <ShineBorder className="rounded-3xl sm:rounded-[2rem]" innerClassName="bg-[#0A0A0A] text-white rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)]">
            <div className="grid overflow-hidden rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-7">
                <div className="flex min-w-0 items-center gap-2 border-b border-white/10 pb-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <div className="size-3 rounded-full bg-white/20" />
                    <div className="size-3 rounded-full bg-white/20" />
                    <div className="size-3 rounded-full bg-white/20" />
                  </div>
                  <div className="ml-auto truncate rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                    appopslin.shotlin.in
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="font-medium text-white">my-api</span>
                      <p className="mt-1 text-xs text-zinc-500">main branch · beta deploy preview</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                      {statusLabel}
                    </span>
                  </div>
                  <div className="mb-2 flex gap-1.5">
                    {pipeline.map((step, index) => (
                      <div
                        key={step}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-colors duration-500",
                          index <= activeStep ? "bg-green-400" : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-zinc-500">
                    {pipeline.map((step, index) => (
                      <span
                        key={step}
                        className={cn(
                          index === 1 ? "text-center" : index === 2 ? "text-right" : "",
                          index <= activeStep ? "text-emerald-300" : ""
                        )}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Deploy logs
                  </p>
                  <div className="space-y-2 font-mono text-xs text-zinc-400">
                    {logs.slice(0, visibleLogCount).map((line) => (
                      <p key={line} className="animate-fade-in">
                        <span className="text-green-300">$</span> {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative p-4 sm:p-5 lg:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.2),transparent_35%)]" />
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.045] p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-300">
                        Architecture preview
                      </p>
                      <h2 className="mt-3 text-xl font-semibold tracking-normal text-white sm:text-2xl">
                        Control plane only. Workloads stay yours.
                      </h2>
                    </div>
                    <ShieldCheck className="size-5 shrink-0 text-emerald-300 sm:size-6" />
                  </div>

                  <div className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-2">
                    {[
                      ["Your VPS", "Apps, databases, nginx"],
                      ["Opslin Cloud", "Dashboard and API"],
                      ["Agent", "Outbound connection"],
                      ["Beta status", "Early access, transparent limits"],
                    ].map(([title, copy]) => (
                      <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm font-medium text-white">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">{copy}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm leading-6 text-green-100">
                    Honest beta note: Opslin is not claiming public traction yet. The product is being
                    opened carefully so the deployment agent, billing, and support model can be validated.
                  </p>
                </div>
              </div>
            </div>
          </ShineBorder>
        </div>
      </div>
    </section>
  );
}
