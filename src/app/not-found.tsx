import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page-wrap">
      <header className="page-intro">
        <p className="kicker">
          <i className="dot" aria-hidden="true" />
          Missing page
        </p>
        <h1>That page is not on this site.</h1>
        <p className="lede">The link may be out of date. The work is still on the homepage.</p>
        <div className="page-actions">
          <Link className="btn-lime" href="/">
            Back to the start <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>
    </main>
  );
}
