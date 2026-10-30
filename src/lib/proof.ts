/**
 * Industry benchmarks already published on the site, plus illustrative
 * scenarios. Real shop results belong in pending.caseStudies and replace
 * the scenarios when that list is filled.
 */

const hvacMissedCallsPerWeek = 20;
const hvacBookingRate = 0.15;
const hvacTicket = 300;

const plumbingLeadsPerMonth = 20;
const plumbingCostPerLead = 129;
const plumbingColdShare = 0.2;

function usd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export const industryStats = [
  {
    figure: "34%",
    title: "of HVAC calls are answered by a person",
    detail: "In HVAC, 34% of calls reach a person.",
    source: "Invoca, Home Services Lead Conversion Benchmarks Report 2026",
  },
  {
    figure: "52%",
    title: "of home-services calls are answered by a person",
    detail: "Across home services, 52% of calls reach a person.",
    source: "Invoca, Home Services Lead Conversion Benchmarks Report 2026",
  },
  {
    figure: "82%",
    title: "say they will call a competitor instead",
    detail: "Only 42% of consumers say they leave a voicemail. 82% say they will call a competitor.",
    source: "CallRail consumer survey, September 2025",
  },
  {
    figure: "$128–$129",
    title: "average search-ad lead for HVAC and plumbing",
    detail: "Search-ad leads for HVAC and plumbing average about $128 to $129 each.",
    source: "LocaliQ 2025 Search Ad Benchmarks for Home Services",
    longFigure: true,
  },
] as const;

export const exampleScenarioLabel = "Example scenario";

export const scenarioDisclaimer = "Illustrative math based on industry benchmarks, not a specific client.";

export function hvacScenarioMath() {
  const jobsPerWeek = hvacMissedCallsPerWeek * hvacBookingRate;
  const weeklyRevenue = jobsPerWeek * hvacTicket;
  const monthlyRevenue = weeklyRevenue * 4;
  return { jobsPerWeek, weeklyRevenue, monthlyRevenue };
}

export function plumbingScenarioMath() {
  const monthlySpend = plumbingLeadsPerMonth * plumbingCostPerLead;
  const coldLeads = plumbingLeadsPerMonth * plumbingColdShare;
  const coldSpend = coldLeads * plumbingCostPerLead;
  return { monthlySpend, coldLeads, coldSpend };
}

export function exampleScenarios() {
  const hvac = hvacScenarioMath();
  const plumbing = plumbingScenarioMath();
  return [
    {
      id: "hvac-after-hours",
      title: "A 6-truck HVAC shop",
      setup: "Suppose 20 after-hours calls a week go unanswered.",
      rows: [
        { label: "Missed after-hours calls", value: "20 a week" },
        { label: "Assumed booking rate", value: "15%" },
        { label: "Jobs that rate implies", value: `${hvac.jobsPerWeek} a week` },
        { label: "Assumed service ticket", value: usd(hvacTicket) },
        { label: "Illustrative revenue", value: `${usd(hvac.weeklyRevenue)} a week` },
      ],
      math: `20 × 15% = ${hvac.jobsPerWeek} jobs. ${hvac.jobsPerWeek} × ${usd(hvacTicket)} = ${usd(hvac.weeklyRevenue)} a week, about ${usd(hvac.monthlyRevenue)} in a 4-week month. The booking rate and the ticket are assumptions. The ticket is a service visit, not a system replacement.`,
    },
    {
      id: "plumbing-ads",
      title: "A plumbing shop buying search leads",
      setup: "Suppose the shop buys 20 search-ad leads a month.",
      rows: [
        { label: "Search-ad leads", value: "20 a month" },
        { label: "Cost per lead", value: `about ${usd(plumbingCostPerLead)}` },
        { label: "Ad spend", value: `about ${usd(plumbing.monthlySpend)} a month` },
        { label: "Assumed share with no same-day follow-up", value: "1 in 5" },
        { label: "Leads that go quiet", value: `${plumbing.coldLeads} a month` },
        { label: "Spend on those leads", value: `about ${usd(plumbing.coldSpend)} a month` },
      ],
      math: `${usd(plumbingCostPerLead)} is the top of the LocaliQ 2025 range, about $128 to $129. 20 × ${usd(plumbingCostPerLead)} = ${usd(plumbing.monthlySpend)}. One in five is an assumption, not a measured loss rate. ${plumbing.coldLeads} × ${usd(plumbingCostPerLead)} = ${usd(plumbing.coldSpend)}. That is ad spend on leads with no same-day follow-up, not revenue booked.`,
    },
  ] as const;
}
