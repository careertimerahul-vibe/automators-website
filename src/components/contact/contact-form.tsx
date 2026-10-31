"use client";

import { useId, useState, type FormEvent } from "react";
import { bookingHref } from "@/lib/booking";
import { trades } from "@/lib/contact";
import { site } from "@/lib/content";

const successCopy = "Thanks, we'll get back to you within one business day.";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const booking = bookingHref();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const businessId = useId();
  const tradeId = useId();
  const messageId = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      businessName: String(data.get("businessName") || ""),
      trade: String(data.get("trade") || ""),
      message: String(data.get("message") || ""),
      company_website: String(data.get("company_website") || ""),
    };
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
    } catch {
      // The mailto link below is the fallback when delivery fails.
    }
    setStatus("error");
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("New Bizagentos lead")}`;

  return (
    <div className="form-panel" id="consultation">
      <p className="kicker kicker-dark">
        <i className="dot" aria-hidden="true" /> Call audit
      </p>
      <h2>Book a free 20-minute call audit.</h2>
      <p className="form-note">Pick a time, or send a note and we&apos;ll write back. The audit is free.</p>
      {booking ? (
        <a className="btn-ink pick-time" href={booking} target="_blank" rel="noopener noreferrer">
          Pick a time <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {status === "sent" ? (
        <p className="form-status" role="status">
          {successCopy}
        </p>
      ) : (
        <form className="audit-form" onSubmit={onSubmit}>
          <label htmlFor={nameId}>
            Name
            <input id={nameId} name="name" autoComplete="name" required />
          </label>
          <label htmlFor={emailId}>
            Email
            <input id={emailId} name="email" type="email" autoComplete="email" required />
          </label>
          <label htmlFor={phoneId}>
            Phone
            <input id={phoneId} name="phone" type="tel" autoComplete="tel" />
          </label>
          <label htmlFor={businessId}>
            Business name
            <input id={businessId} name="businessName" autoComplete="organization" />
          </label>
          <label htmlFor={tradeId}>
            Trade
            <select id={tradeId} name="trade" defaultValue="">
              <option value="">Select a trade</option>
              {trades.map((trade) => (
                <option key={trade} value={trade}>
                  {trade}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor={messageId}>
            Message
            <textarea id={messageId} name="message" rows={4} />
          </label>
          <label className="audit-honeypot" aria-hidden="true">
            Company website
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
          <button className="btn-ink" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send a message"} <span aria-hidden="true">↗</span>
          </button>
          {status === "error" ? (
            <p className="form-status" role="alert">
              That didn&apos;t send. Email <a href={mailto}>{site.email}</a> and we&apos;ll take it from there.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
