"use client";

import { useEffect, useState } from "react";
import { hubspot, site } from "@/lib/content";

export function HubspotForm() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const script = document.createElement("script");
    script.src = hubspot.script;
    script.defer = true;
    script.onload = () => {
      if (!cancelled) setStatus("ready");
    };
    script.onerror = () => {
      if (!cancelled) setStatus("error");
    };
    document.body.appendChild(script);
    return () => {
      cancelled = true;
      script.remove();
    };
  }, []);

  return (
    <div className="form-panel" id="consultation">
      <p className="kicker kicker-dark">
        <i className="dot" aria-hidden="true" /> Strategy session
      </p>
      <h2>Tell us about one workflow.</h2>
      <p className="form-note">
        This is the consultation form from the current site. It opens a free strategy session. There is no obligation to
        continue.
      </p>
      {status === "loading" ? (
        <p className="form-status" role="status">
          Loading the consultation form…
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-status" role="alert">
          The form didn&apos;t load. Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a> and we&apos;ll take it from there.
        </p>
      ) : null}
      <div
        className="hs-form-frame"
        data-region={hubspot.region}
        data-form-id={hubspot.formId}
        data-portal-id={hubspot.portalId}
        hidden={status === "error"}
      />
    </div>
  );
}
