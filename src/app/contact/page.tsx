import type { Metadata } from "next";
import { HubspotForm } from "@/components/contact/hubspot-form";
import { closingCopy, primaryCta, site } from "@/lib/content";

export const metadata: Metadata = {
  title: primaryCta,
  description: closingCopy,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${primaryCta} | ${site.name}`,
    description: closingCopy,
  },
};

export default function ContactPage() {
  return (
    <main id="main" className="page-wrap">
      <div className="contact-grid">
        <header className="page-intro">
          <p className="kicker">
            <i className="dot" aria-hidden="true" />
            Free 20-minute call audit
          </p>
          <h1>
            Book a free 20-minute <em>call audit.</em>
          </h1>
          <p className="lede">{closingCopy}</p>
          <div className="contact-side">
            <div className="panel">
              <h2>Prefer to talk?</h2>
              <p>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="panel">
              <h2>What to have ready</h2>
              <ul>
                <li>The number customers call</li>
                <li>What should happen on an emergency</li>
                <li>Where jobs get booked today</li>
              </ul>
            </div>
          </div>
        </header>
        <HubspotForm />
      </div>
    </main>
  );
}
