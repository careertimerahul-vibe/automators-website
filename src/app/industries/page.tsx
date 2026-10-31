import type { Metadata } from "next";
import { CtaLink } from "@/components/site/cta-link";
import { industries, primaryCta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: "Home service work, with fewer dropped handoffs.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <main id="main" className="page-wrap">
      <header className="page-intro">
        <p className="kicker">
          <i className="dot" aria-hidden="true" />
          Industries
        </p>
        <h1>Home service work, with fewer dropped handoffs.</h1>
        <p className="lede">
          HVAC, plumbing, electrical, garage doors, and solar each stall in a different place. The after-hours call, the
          part that isn&apos;t on the truck, the permit that sits. These are the workflows we already know.
        </p>
      </header>
      <div className="industry-list">
        {industries.map((industry) => (
          <article className="panel industry-card" id={industry.id} key={industry.id}>
            <h2>{industry.title}</h2>
            <p>{industry.summary}</p>
            <ul>
              {industry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="page-actions">
        <CtaLink className="btn-lime" location="industries">
          {primaryCta} <span aria-hidden="true">↗</span>
        </CtaLink>
      </div>
    </main>
  );
}
