import assert from "node:assert/strict";
import { test } from "node:test";
import { visibleCopy } from "./content.ts";

test("published copy has no bracketed placeholders", () => {
  for (const line of visibleCopy()) {
    assert.equal(line.includes("["), false, line);
    assert.equal(line.includes("]"), false, line);
  }
});

test("the public brand is Bizagentos, with the old name only in the footer line", () => {
  const lines = visibleCopy();
  assert.equal(lines.filter((line) => line === "Bizagentos, formerly The Automators.").length, 1);
  for (const line of lines) {
    if (line === "Bizagentos, formerly The Automators.") continue;
    assert.equal(/automators/i.test(line), false, line);
  }
});
