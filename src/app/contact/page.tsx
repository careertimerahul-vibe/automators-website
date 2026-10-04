import type { Metadata } from "next";
import { HubspotForm } from "@/components/contact/hubspot-form";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Let's talk",
  description: "Bring one repetitive workflow. The strategy session is free, and you can walk away.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" className="page-wrap">
      <div className="contact-grid">
        <header className="page-intro">
          <p className="kicker">
            <i className="dot" aria-hidden="true" />
            Let&apos;s talk
          </p>
          <h1>
            What&apos;s the one task you&apos;d love to <em>let go?</em>
          </h1>
          <p className="lede">
            Bring one repetitive workflow. We&apos;ll look at where it stalls, which tools it touches, and whether an
            automation is the right first move. The session is free, and you can walk away.
          </p>
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
                <li>The task your team repeats</li>
                <li>The tools that already hold the information</li>
                <li>Where a person still needs to decide</li>
              </ul>
            </div>
          </div>
        </header>
        <HubspotForm />
      </div>
    </main>
  );
}
