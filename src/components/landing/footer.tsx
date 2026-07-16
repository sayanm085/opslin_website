import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { siteLinks } from "@/lib/site-links";

const serviceLinks = [
  ["Features", "#features"],
  ["How It Works", "#how-it-works"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

const companyLinks = [
  ["Blog", siteLinks.docs],
  ["Changelog", siteLinks.docs],
  ["Privacy Policy", "/privacy"],
  ["Terms of Use", "/terms"],
  ["Contact", `mailto:${siteLinks.contactEmail}`],
];

export function Footer() {
  return (
    <footer className="landing-dark border-t border-zinc-800 bg-[#0A0A0A] py-12">
      <div className="landing-container">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.6fr_0.6fr]">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Opslin
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
              Deploy apps on your own VPS without DevOps complexity.
            </p>
            <TrackedLink
              href={siteLinks.register}
              className="landing-btn-secondary mt-6 inline-flex text-sm"
              trackEvent="cta_click"
              trackProperties={{ location: "footer", action: "register" }}
            >
              Start Free Beta
            </TrackedLink>
          </div>

          <div>
            <h2 className="text-sm font-medium text-white">Services</h2>
            <div className="mt-4 grid gap-3">
              {serviceLinks.map(([label, href]) => (
                <a key={label} href={href} className="text-sm text-zinc-500 transition-colors hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-white">Company</h2>
            <div className="mt-4 grid gap-3">
              {companyLinks.map(([label, href]) => (
                <a key={label} href={href} className="text-sm text-zinc-500 transition-colors hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6">
          <p className="text-sm text-zinc-600">© 2026 Opslin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
