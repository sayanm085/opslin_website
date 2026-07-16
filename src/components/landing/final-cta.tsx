import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { siteLinks } from "@/lib/site-links";

export function FinalCta() {
  return (
    <section className="landing-dark landing-section bg-[#0A0A0A]">
      <Reveal className="landing-container landing-reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 p-px">
          <div className="relative rounded-3xl bg-[#0A0A0A] px-8 py-16 text-center sm:px-16 sm:py-24">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.16),transparent_45%)]" />
            <div className="relative">
              <p className="landing-label">Start the beta</p>
              <h2 className="landing-heading mx-auto mb-4">
                Try the Opslin beta with your own VPS.
              </h2>
              <p className="landing-description mx-auto mb-8">
                No credit card required. Starter is free for 6 months during beta while product limits,
                reliability, and support are validated in the open.
              </p>
              <TrackedLink
                href={siteLinks.register}
                className="landing-btn-primary inline-flex px-8 py-4 text-base"
                trackEvent="cta_click"
                trackProperties={{ location: "final_cta", action: "register" }}
              >
                Start Free Beta
              </TrackedLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
