"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { hubspot, primaryCta, site } from "@/lib/content";

type Fields = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

const emptyFields: Fields = { name: "", email: "", phone: "", note: "" };

function embedHasHeight(frame: HTMLElement) {
  const declared = Number.parseFloat(frame.style.height);
  return Number.isFinite(declared) && declared > 80;
}

export function HubspotForm() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [embedReady, setEmbedReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const noteId = useId();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const mark = () => {
      if (embedHasHeight(frame)) setEmbedReady(true);
    };
    const observer = new MutationObserver(mark);
    observer.observe(frame, { attributes: true, childList: true, subtree: true, attributeFilter: ["style"] });
    const timer = window.setInterval(mark, 400);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Fields = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      note: String(data.get("note") || ""),
    };
    setFields(next);
    if (String(data.get("company_website") || "").trim()) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...next, company_website: "" }),
      });
      if (response.ok) {
        setStatus("sent");
        return;
      }
    } catch {
      // The mail link below is the path when the hosted form cannot accept the request.
    }
    setStatus("fallback");
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Free 20-minute call audit")}&body=${encodeURIComponent(
    `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\n\n${fields.note}`.trim(),
  )}`;

  return (
    <div className="form-panel" id="consultation">
      <p className="kicker kicker-dark">
        <i className="dot" aria-hidden="true" /> Call audit
      </p>
      <h2>Book a free 20-minute call audit.</h2>
      <p className="form-note">Tell us how to reach you and we&apos;ll set the 20 minutes. The audit is free.</p>
      <div
        ref={frameRef}
        className={embedReady ? "hs-form-frame is-ready" : "hs-form-frame"}
        data-region={hubspot.region}
        data-form-id={hubspot.formId}
        data-portal-id={hubspot.portalId}
      />
      <Script src={hubspot.script} strategy="afterInteractive" />
      {embedReady ? null : status === "sent" ? (
        <p className="form-status" role="status">
          Request received. We&apos;ll email you to set the 20 minutes. You can also call{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
      ) : (
        <form className="audit-form" onSubmit={onSubmit}>
          <label htmlFor={nameId}>
            Name
            <input id={nameId} name="name" autoComplete="name" required defaultValue={fields.name} />
          </label>
          <label htmlFor={emailId}>
            Email
            <input id={emailId} name="email" type="email" autoComplete="email" required defaultValue={fields.email} />
          </label>
          <label htmlFor={phoneId}>
            Phone
            <input id={phoneId} name="phone" type="tel" autoComplete="tel" required defaultValue={fields.phone} />
          </label>
          <label htmlFor={noteId}>
            Shop and what we should look at
            <textarea id={noteId} name="note" rows={4} defaultValue={fields.note} />
          </label>
          <label className="audit-honeypot" aria-hidden="true">
            Company website
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
          <button className="btn-ink" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : primaryCta} <span aria-hidden="true">↗</span>
          </button>
          {status === "fallback" ? (
            <p className="form-status" role="alert">
              That didn&apos;t go through.{" "}
              <a href={mailto}>Email this request to {site.email}</a> or call <a href={site.phoneHref}>{site.phoneDisplay}</a>
              .
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
