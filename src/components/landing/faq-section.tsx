"use client";

import { Reveal } from "@/components/reveal";
import { useTrackEvent } from "@/hooks/use-track-event";

const faqs = [
  {
    question: "Does Opslin provide hosting?",
    answer: "No. Opslin is a control plane. Your apps run on your own VPS.",
  },
  {
    question: "Do I need DevOps knowledge?",
    answer: "No. Opslin handles nginx, Docker, SSL, and deployment automation.",
  },
  {
    question: "Does my app run on Opslin servers?",
    answer: "No. Your applications stay on your own infrastructure.",
  },
  {
    question: "Is a credit card required during beta?",
    answer: "No. Free and Starter Trial require no payment method during beta.",
  },
  {
    question: "Can I use GitHub?",
    answer: "Yes. Connect any GitHub repo or paste any Git URL.",
  },
  {
    question: "What languages can I deploy?",
    answer: "Node.js, Python, Go, Ruby, PHP, Java, Rust, and more via buildpacks.",
  },
  {
    question: "What happens if Opslin is down?",
    answer: "Your deployed apps keep running. Opslin only manages deployments and monitoring.",
  },
  {
    question: "Is my server exposed to the internet?",
    answer: "The agent connects outbound only. No inbound management port is required.",
  },
  {
    question: "Can I cancel after beta?",
    answer: "Yes. Cancel anytime. Your apps remain on your server.",
  },
  {
    question: "What data does Opslin store?",
    answer: "Deployment metadata, logs, and metrics. App source code is never stored on Opslin servers.",
  },
];

export function FaqSection() {
  const trackEvent = useTrackEvent();

  return (
    <section id="faq" className="landing-section border-b border-black/10 bg-[#F7F4EE]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">FAQ</p>
          <h2 className="landing-heading mx-auto">Questions developers ask before connecting a server.</h2>
        </div>

        <div className="mx-auto mt-10 w-full max-w-3xl divide-y divide-black/10">
          {faqs.map((faq, index) => {
            const [title, answer] = Object.values(faq);

            return (
              <details
                key={title}
                className="group py-2"
                open={index === 0}
                onToggle={(event) => {
                  if (event.currentTarget.open) {
                    trackEvent("faq_open", { question: title, index });
                  }
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-semibold text-zinc-950 transition-colors hover:text-green-700 [&::-webkit-details-marker]:hidden">
                  <span>{title}</span>
                  <span className="text-xl text-zinc-600 transition-transform group-open:rotate-45 group-open:text-green-400">
                    +
                  </span>
                </summary>
                <p className="pb-4 text-base leading-relaxed text-zinc-600">{answer}</p>
              </details>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
