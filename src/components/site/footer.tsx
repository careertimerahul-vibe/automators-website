import Link from "next/link";
import { site, solutions } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="footer-name">
          the automators<span className="brand-dot">.</span>
        </p>
        <p>AI, put to work.</p>
        <p>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
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
          <li>
            <Link href="/#solutions">What we automate</Link>
          </li>
          <li>
            <Link href="/#approach">Our approach</Link>
          </li>
          <li>
            <Link href="/industries">Industries</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <p className="footer-legal">© {year} {site.legalName}. All rights reserved.</p>
    </footer>
  );
}
