import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Manrope } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { site } from "@/lib/content";
import "./globals.css";
import "./site.css";

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Less busywork. More possibility. | The Automators",
    template: "%s | The Automators",
  },
  description: site.description,
  applicationName: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Less busywork. More possibility.",
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101A18",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  email: site.email,
  telephone: "+1-254-276-5107",
  description: site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
