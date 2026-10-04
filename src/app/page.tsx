import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Less busywork. More possibility.",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
