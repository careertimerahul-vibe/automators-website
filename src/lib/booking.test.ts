import assert from "node:assert/strict";
import { test } from "node:test";
import { bookingHref } from "./booking.ts";

test("book a call opens the Cal.com strategy call", () => {
  const previous = process.env.NEXT_PUBLIC_BOOKING_URL;
  delete process.env.NEXT_PUBLIC_BOOKING_URL;
  try {
    assert.equal(bookingHref(), "https://cal.com/bizagentos/strategy-call");
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BOOKING_URL;
    else process.env.NEXT_PUBLIC_BOOKING_URL = previous;
  }
});
