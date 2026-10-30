import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { homeTitle, site } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
  },
};

export default function Page() {
  return <HomePage />;
}
