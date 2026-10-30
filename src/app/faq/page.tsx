import type { Metadata } from "next";
import { FaqList } from "@/components/faq/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Will callers know it's an AI, what happens if it gets something wrong, and what the free call audit covers.",
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
        <h1>Questions worth asking before a call audit.</h1>
        <p className="lede">
          Will callers know it&apos;s an AI, what happens if it gets something wrong, and what the free call audit
          covers.
        </p>
      </header>
      <FaqList />
    </main>
  );
}
