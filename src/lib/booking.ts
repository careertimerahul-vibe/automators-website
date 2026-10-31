import { pending } from "./pending.ts";

/**
 * Cal.com strategy call, unless NEXT_PUBLIC_BOOKING_URL is set.
 * Book a call buttons open this in a new tab.
 */
export function bookingHref() {
  const fromEnv = (process.env.NEXT_PUBLIC_BOOKING_URL ?? "").trim();
  if (fromEnv) return fromEnv;
  return pending.bookingUrl.trim();
}
