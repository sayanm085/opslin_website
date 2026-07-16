import {
  Activity,
  ArrowDownUp,
  Bot,
  Database,
  GitBranch,
  Lock,
  RotateCcw,
  ServerCog,
  Shield,
  Terminal,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const features = [
  {
    title: "Git Deploys",
    label: "Deploy",
    description: "Push to deploy. Connect a Git repo and run a guided beta deploy flow.",
    icon: GitBranch,
    size: "large-left",
  },
  {
    title: "Outbound-Only Agent",
    label: "Agent",
    description: "Your server calls Opslin. No inbound management port is required.",
    icon: Bot,
    size: "small",
  },
  {
    title: "SSL Automation",
    label: "Secure",
    description: "Free SSL certificates. Auto-provisioned and auto-renewed.",
    icon: Lock,
    size: "small",
  },
  {
    title: "Multi-Language Buildpacks",
    label: "Build",
    description: "Node, Python, Go, Ruby, PHP, Java, Rust, and more through buildpacks.",
    icon: ArrowDownUp,
    size: "small",
  },
  {
    title: "Logs & Metrics",
    label: "Observe",
    description: "Live logs, deploy history, and server metrics in one dashboard.",
    icon: Activity,
    size: "large-right",
  },
  {
    title: "Managed Databases",
    label: "Data",
    description: "One-click Postgres, MySQL, Redis on your own server.",
    icon: Database,
    size: "small",
  },
  {
    title: "Backups",
    label: "Protect",
    description: "Automated database backups with easy restore.",
    icon: ServerCog,
    size: "small",
  },
  {
    title: "Rollback",
    label: "Recover",
    description: "One-click rollback to any previous deploy.",
    icon: RotateCcw,
    size: "small",
  },
  {
    title: "Web Terminal",
    label: "Access",
    description: "SSH into your server directly from the browser.",
    icon: Terminal,
    size: "small",
  },
  {
    title: "Firewall Controls",
    label: "Firewall",
    description: "Manage server firewall rules from the dashboard.",
    icon: Shield,
    size: "small",
  },
];

function FeatureVisual({ type }: { type: "deploy" | "logs" }) {
  if (type === "deploy") {
    return (
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0A0A] p-4">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>main</span>
          <span className="text-green-400">a19f2c4</span>
        </div>
        <div className="mt-4 grid gap-2">
          {["Build image", "Run checks", "Promote live"].map((step) => (
            <div key={step} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3 py-2">
              <div className="size-2 rounded-full bg-green-500" />
              <span className="text-sm text-zinc-300">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0A0A] p-4">
      <div className="grid grid-cols-12 items-end gap-1">
        {[30, 58, 42, 70, 54, 82, 64, 48, 76, 60, 88, 72].map((height, index) => (
          <div
            key={`${height}-${index}`}
            className="rounded-t bg-green-500/60"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <span>Live logs</span>
        <span>CPU · RAM · latency</span>
      </div>
    </div>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="landing-section border-b border-black/10 bg-[#F7F4EE]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Product</p>
          <h2 className="landing-heading mx-auto">A control plane for the VPS you already own.</h2>
          <p className="landing-description mx-auto mt-4">
            Keep the cost and control of your own VPS. Get the workflow of a managed deployment platform.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {features.map(({ title, label, description, icon: Icon, size }, index) => {
            const largeLeft = size === "large-left";
            const largeRight = size === "large-right";

            return (
              <Reveal
                key={title}
                className={[
                  "landing-reveal",
                  largeLeft ? "lg:col-span-4 lg:row-span-2" : "",
                  largeRight ? "lg:col-span-3 lg:row-span-2" : "",
                  !largeLeft && !largeRight ? "lg:col-span-2" : "",
                ].join(" ")}
                delay={index * 100}
              >
                <article
                  className={[
                    "landing-card group relative h-full overflow-hidden",
                    largeLeft || largeRight ? "bg-[#0A0A0A] text-white hover:bg-[#111111]" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-green-400">
                        {label}
                      </p>
                      <h3
                        className={[
                          "mt-3 text-xl font-semibold tracking-normal",
                          largeLeft || largeRight ? "text-white" : "text-zinc-950",
                        ].join(" ")}
                      >
                        {title}
                      </h3>
                    </div>
                    <div
                      className={[
                        "flex size-11 shrink-0 items-center justify-center rounded-2xl border text-green-500",
                        largeLeft || largeRight ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-[#F7F4EE]",
                      ].join(" ")}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <p
                    className={[
                      "mt-4 max-w-xl text-sm leading-6",
                      largeLeft || largeRight ? "text-zinc-400" : "text-zinc-600",
                    ].join(" ")}
                  >
                    {description}
                  </p>

                  {largeLeft ? <FeatureVisual type="deploy" /> : null}
                  {largeRight ? <FeatureVisual type="logs" /> : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
