import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieBanner } from "@/components/gdpr/cookie-banner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://opslin.shotlin.in");

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const themeBootstrap = `(() => {
  const root = document.documentElement;
  try {
    const stored = localStorage.getItem("opslin-color-theme");
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch {
    root.classList.add("dark");
    root.dataset.theme = "dark";
    root.style.colorScheme = "dark";
  }
})();`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Opslin — Deploy apps on your own VPS",
    template: "%s",
  },
  description:
    "Coordinate application deployments and common infrastructure operations on a compatible Linux VPS through Opslin's managed control plane and outbound Go agent.",
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
    description: "A managed control plane for application deployments and selected operations on compatible customer-controlled Linux VPSs.",
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
    description: "A managed control plane for application deployments and selected operations on compatible customer-controlled Linux VPSs.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  applicationName: "Opslin",
  category: "developer tools",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#0b1310",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <div className="min-h-screen bg-background text-foreground">{children}</div>
          <CookieBanner />
        </ErrorBoundary>
      </body>
    </html>
  );
}
