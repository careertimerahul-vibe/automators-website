type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

/**
 * The current marketing site calls gtag when it exists, but the served HTML
 * does not include a measurement id. Events are forwarded only if a tag is
 * added later. Nothing here invents an endpoint or reports a false conversion.
 */
export function track(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
