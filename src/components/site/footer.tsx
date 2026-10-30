import Link from "next/link";
import { footerFinePrint, nav, site, solutions } from "@/lib/content";
import { filled, pending } from "@/lib/pending";

export function Footer() {
  const year = new Date().getFullYear();
  const showPrivacy = filled(pending.privacyHref);
  const showTerms = filled(pending.termsHref);
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="footer-name">
          {site.name}
          <span className="brand-dot">.</span>
        </p>
        <p>AI receptionists for home-service shops.</p>
        <p>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        {filled(pending.businessAddress) ? <p>{pending.businessAddress.trim()}</p> : null}
      </div>
      <nav aria-label="Services">
        <p className="footer-label">Services</p>
        <ul>
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <Link href={`/solutions/${solution.slug}`}>{solution.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Company">
        <p className="footer-label">Company</p>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/industries">Industries</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {showPrivacy ? (
            <li>
              <a href={pending.privacyHref}>Privacy</a>
            </li>
          ) : null}
          {showTerms ? (
            <li>
              <a href={pending.termsHref}>Terms</a>
            </li>
          ) : null}
        </ul>
      </nav>
      <p className="footer-legal">
        <span className="footer-former">{footerFinePrint}</span>
        <span>© {year} {site.name}.</span>
      </p>
    </footer>
  );
}
