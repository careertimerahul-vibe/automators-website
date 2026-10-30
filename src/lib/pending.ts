/**
 * Facts that are not confirmed yet.
 *
 * Leave a string empty, or testimonials as an empty list, until the value is
 * real. The site renders a field only when it has a value, so nothing here
 * can show up as placeholder copy.
 *
 * demoLineDisplay / demoLineHref
 *   Public number for the live demo receptionist.
 * callRecordingUrl / callRecordingTranscript
 *   A short after-hours call recording and its transcript.
 * clientResult
 *   One sentence of a real client result, with permission to publish it.
 * testimonials
 *   Quotes with name, company, and city, and written permission.
 * priceFrom
 *   Confirmed starting monthly price, such as a dollar amount.
 * terms
 *   Confirmed contract terms.
 * guarantee
 *   Confirmed risk-reversal offer.
 * launchTime
 *   Typical time from kickoff until the line is live.
 * phoneSetupNote
 *   Confirmed detail on how call forwarding is set up.
 * businessAddress
 *   Optional public mailing address.
 * privacyHref / termsHref
 *   Only after those pages exist.
 * caseStudies
 *   Real anonymised results the shop has approved. When this list has
 *   entries, they replace the example scenarios. A future entry looks like
 *   a label such as "A 12-truck HVAC company in Texas", a summary, and
 *   measured figures. No personal names. Leave the list empty until then.
 *
 * Integration names that are not already on the site stay off the page until
 * someone confirms them. Not confirmed: Housecall Pro, Google Calendar.
 * Still shown, because the current site already names them: HubSpot,
 * Salesforce, Pipedrive, ServiceTitan, Jobber, Zapier.
 */
export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  city: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudy = {
  label: string;
  summary: string;
  metrics: CaseStudyMetric[];
};

export type PendingSiteFacts = {
  demoLineDisplay: string;
  demoLineHref: string;
  callRecordingUrl: string;
  callRecordingTranscript: string;
  clientResult: string;
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
  priceFrom: string;
  terms: string;
  guarantee: string;
  launchTime: string;
  phoneSetupNote: string;
  businessAddress: string;
  privacyHref: string;
  termsHref: string;
};

export const pending: PendingSiteFacts = {
  demoLineDisplay: "",
  demoLineHref: "",
  callRecordingUrl: "",
  callRecordingTranscript: "",
  clientResult: "",
  testimonials: [],
  caseStudies: [],
  priceFrom: "",
  terms: "",
  guarantee: "",
  launchTime: "",
  phoneSetupNote: "",
  businessAddress: "",
  privacyHref: "",
  termsHref: "",
};

export function filled(value: string) {
  return value.trim().length > 0;
}

export function readyCaseStudies(studies: CaseStudy[]) {
  return studies
    .filter((study) => filled(study.label) && filled(study.summary))
    .map((study) => ({
      label: study.label.trim(),
      summary: study.summary.trim(),
      metrics: study.metrics.filter((metric) => filled(metric.label) && filled(metric.value)),
    }));
}

export function publishedCaseStudies() {
  return readyCaseStudies(pending.caseStudies);
}
