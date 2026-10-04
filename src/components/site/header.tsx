"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { nav, solutions } from "@/lib/content";
import { track } from "@/lib/analytics";

export function Header() {
  const progressRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max <= 0 ? 0 : window.scrollY / max;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-nav">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="nav-bar">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            the automators<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link
            className="btn-lime btn-lime-nav"
            href="/contact"
            onClick={() => track("cta_consultation_opened", { location: "navigation" })}
          >
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <div className="nav-mobile">
          <button
            type="button"
            className="menu-trigger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
            <span className="menu-label-text">Menu</span>
          </button>
          <Link
            className="btn-lime btn-lime-nav"
            href="/contact"
            onClick={() => track("cta_consultation_opened", { location: "navigation" })}
          >
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="nav-progress" ref={progressRef} aria-hidden="true" />
      {open ? (
        <>
          <button type="button" className="menu-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="menu-sheet" id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div className="menu-head">
              <p className="menu-title" id={titleId}>
                the automators
              </p>
              <p className="menu-desc">Services, approach, and a way to talk.</p>
              <button ref={closeRef} type="button" className="menu-close" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <nav className="menu-links" aria-label="Mobile" onClick={() => setOpen(false)}>
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <p className="menu-label">Services</p>
              {solutions.map((solution) => (
                <Link key={solution.slug} href={`/solutions/${solution.slug}`}>
                  {solution.title}
                </Link>
              ))}
              <Link href="/industries">Industries</Link>
              <Link href="/faq">FAQ</Link>
              <Link
                className="btn-lime"
                href="/contact"
                onClick={() => track("cta_consultation_opened", { location: "mobile_menu" })}
              >
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
