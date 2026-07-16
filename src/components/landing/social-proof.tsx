import { BadgeCheck, Eye, LockKeyhole, MessageSquareText } from "lucide-react";
import { Reveal } from "@/components/reveal";

const transparencyCards = [
  {
    title: "No fake testimonials",
    copy: "Public customer quotes will be added only after named beta users approve them.",
    icon: MessageSquareText,
  },
  {
    title: "Beta limits are visible",
    copy: "Starter is free for six months, and paid capacity opens gradually as support matures.",
    icon: Eye,
  },
  {
    title: "Your infrastructure stays yours",
    copy: "Opslin manages deploy workflows; it does not host your production workloads.",
    icon: LockKeyhole,
  },
  {
    title: "Trust comes from architecture",
    copy: "Outbound-only agent connectivity keeps the management surface off the public internet.",
    icon: BadgeCheck,
  },
];

export function SocialProof() {
  return (
    <section className="landing-section border-b border-black/10 bg-[#F7F4EE]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Transparency</p>
          <h2 className="landing-heading mx-auto">Early product, honest proof.</h2>
          <p className="landing-description mx-auto mt-4">
            Opslin is not using placeholder customers or inflated usage numbers. The page explains
            what exists, what is beta, and why the architecture is safe to try.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {transparencyCards.map(({ title, copy, icon: Icon }, index) => (
            <Reveal key={title} className="landing-reveal" delay={index * 100}>
              <article className="landing-card h-full">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-green-500/15 bg-green-500/10 text-green-600">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-normal text-zinc-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
