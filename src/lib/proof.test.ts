import assert from "node:assert/strict";
import { test } from "node:test";
import { readyCaseStudies } from "./pending.ts";
import { exampleScenarios, hvacScenarioMath, plumbingScenarioMath, scenarioDisclaimer } from "./proof.ts";

test("HVAC example uses the stated conservative assumptions", () => {
  const math = hvacScenarioMath();
  assert.equal(math.jobsPerWeek, 3);
  assert.equal(math.weeklyRevenue, 900);
  assert.equal(math.monthlyRevenue, 3600);
});

test("plumbing example multiplies the LocaliQ lead cost by the stated volume", () => {
  const math = plumbingScenarioMath();
  assert.equal(math.monthlySpend, 2580);
  assert.equal(math.coldLeads, 4);
  assert.equal(math.coldSpend, 516);
});

test("example scenarios stay labelled as illustrations", () => {
  for (const scenario of exampleScenarios()) {
    assert.equal(scenario.math.includes("["), false);
    assert.match(scenario.title, /shop|HVAC|plumbing/i);
    assert.equal(scenario.title.includes("Texas"), false);
  }
  assert.equal(scenarioDisclaimer, "Illustrative math based on industry benchmarks, not a specific client.");
});

test("an approved case study replaces the need for a scenario, and blanks stay out", () => {
  assert.deepEqual(readyCaseStudies([]), []);
  assert.deepEqual(readyCaseStudies([{ label: " ", summary: "Real result", metrics: [] }]), []);
  const ready = readyCaseStudies([
    {
      label: "A 12-truck HVAC company in Texas",
      summary: "Answered the after-hours line for 30 days.",
      metrics: [
        { label: "Calls answered", value: "140" },
        { label: "", value: "skip" },
      ],
    },
  ]);
  assert.equal(ready.length, 1);
  assert.equal(ready[0]?.metrics.length, 1);
});
