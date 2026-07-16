import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { CookieBanner } from "@/components/gdpr/cookie-banner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://opslin.shotlin.in");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Opslin — Deploy and manage apps on your own VPS",
  description:
    "Turn your VPS into a managed deployment platform with Git deploys, SSL, logs, monitoring, databases, and rollback from one dashboard.",
  keywords: [
    "VPS deployment",
    "DevOps automation",
    "Git deploy",
    "SSL",
    "PaaS alternative",
    "server management",
  ],
  authors: [{ name: "Opslin" }],
  creator: "Opslin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl.toString(),
    siteName: "Opslin",
    title: "Opslin — Deploy and manage apps on your own VPS",
    description: "Turn your VPS into a managed deployment platform.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Opslin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opslin — Deploy and manage apps on your own VPS",
    description: "Turn your VPS into a managed deployment platform.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <Script
          id="strip-extension-hydration-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "document.querySelectorAll('[bis_skin_checked]').forEach(function (element) { element.removeAttribute('bis_skin_checked'); });",
          }}
        />
        <ErrorBoundary>
          <div className="landing-theme min-h-screen bg-[#F7F4EE] text-zinc-950">
            {children}
          </div>
          <CookieBanner />
        </ErrorBoundary>
      </body>
    </html>
  );
}
