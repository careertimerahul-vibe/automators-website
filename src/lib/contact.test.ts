import assert from "node:assert/strict";
import { test } from "node:test";
import { parseContact } from "./contact.ts";

test("name and email are required", () => {
  assert.equal(parseContact({ name: "", email: "a@b.com" }).ok, false);
  assert.equal(parseContact({ name: "Ada", email: "not-an-email" }).ok, false);
});

test("a honeypot hit is rejected before it becomes a lead", () => {
  const parsed = parseContact({
    name: "Ada",
    email: "ada@example.com",
    company_website: "https://spam.test",
  });
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.equal(parsed.honeypot, true);
});

test("optional fields and the trade list are kept", () => {
  const parsed = parseContact({
    name: "Website test",
    email: "test@bizagentos.com",
    phone: "2545550100",
    businessName: "Test Shop",
    trade: "HVAC",
    message: "After-hours calls",
  });
  assert.equal(parsed.ok, true);
  if (parsed.ok && !parsed.honeypot) {
    assert.equal(parsed.lead.trade, "HVAC");
    assert.equal(parsed.lead.businessName, "Test Shop");
  }
  assert.equal(parseContact({ name: "Ada", email: "ada@example.com", trade: "Roofing" }).ok, false);
});
