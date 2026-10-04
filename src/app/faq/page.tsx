import type { Metadata } from "next";
import { FaqList } from "@/components/faq/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How an engagement starts, which tools we work with, and what happens if the fit isn't there.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main id="main" className="page-wrap">
      <header className="page-intro">
        <p className="kicker">
          <i className="dot" aria-hidden="true" />
          FAQ
        </p>
        <h1>Questions worth asking before a build.</h1>
        <p className="lede">How an engagement starts, which tools we work with, and what happens if the fit isn&apos;t there.</p>
      </header>
      <FaqList />
    </main>
  );
}
