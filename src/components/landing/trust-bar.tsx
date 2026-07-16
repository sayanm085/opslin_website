import { Braces, Container, GitBranch, Hexagon, Server, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";

const technologies = [
  { name: "Node.js", type: "Runtime", icon: Hexagon },
  { name: "Python", type: "Language", icon: Braces },
  { name: "Go", type: "Language", icon: Workflow },
  { name: "Docker", type: "Container", icon: Container },
  { name: "Git", type: "Deploys", icon: GitBranch },
  { name: "React", type: "Frontend", icon: Server },
];

export function TrustBar() {
  return (
    <section className="border-y border-black/10 bg-[#EFE9DE] py-8">
      <Reveal className="landing-container landing-reveal">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="hidden h-px flex-1 bg-black/10 sm:block" />
              <p className="shrink-0 text-sm font-semibold text-zinc-700">
                Built for the stack you already use
              </p>
              <div className="h-px flex-1 bg-black/10" />
            </div>
            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-600">
              Opslin keeps the stack familiar: your repositories, your containers, your Linux
              server, and the languages your apps already use.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {technologies.map(({ name, type, icon: Icon }, index) => (
              <Reveal
                key={name}
                className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white/55 px-4 py-3 text-zinc-500 shadow-sm backdrop-blur transition-colors hover:border-black/20 hover:bg-white hover:text-zinc-700"
                delay={index * 80}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#F7F4EE]">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800 transition-colors group-hover:text-zinc-950">
                    {name}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">{type}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="hidden h-px flex-1 bg-black/10 sm:block" />
          <p className="shrink-0 text-center text-xs uppercase tracking-[0.2em] text-zinc-500">
            Git deploys · buildpacks · Docker runtime
          </p>
          <div className="hidden h-px flex-1 bg-black/10 sm:block" />
        </div>
      </Reveal>
    </section>
  );
}
