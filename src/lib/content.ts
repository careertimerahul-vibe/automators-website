import { filled, pending } from "./pending.ts";

export const site = {
  name: "Bizagentos",
  legalName: "Bizagentos",
  url: "https://bizagentos.com",
  email: "info@bizagentos.com",
  phoneDisplay: "+1 (254) 276-5107",
  phoneHref: "tel:+12542765107",
  description:
    "Bizagentos answers your calls 24/7, sorts emergencies from tune-ups, and books jobs on your calendar. Built for 2 to 20 truck shops. Book a free call audit.",
} as const;

export const homeTitle = "AI Receptionist for HVAC, Plumbing & Electrical | Bizagentos";

export const heroLede =
  "Bizagentos picks up when your team can't, after hours, at lunch, or when every tech is on a job. It sorts the no-heat emergency from the tune-up, books the slot, and texts you the details. Built for HVAC, plumbing and electrical shops running 2 to 20 trucks.";

export const closingCopy =
  "In a free 20-minute call audit we test your line, show you what callers hear after hours, and estimate what it costs you. No pitch deck.";

export const primaryCta = "Book a free 20-minute call audit";

export const footerFinePrint = "Bizagentos, formerly The Automators.";

export const hubspot = {
  "script": "https://js-na2.hsforms.net/forms/embed/244154570.js",
  "region": "na2",
  "formId": "d8c2a504-7442-41e9-8eed-7c83f814dc93",
  "portalId": "244154570"
} as const;

export const tools = ["HubSpot", "Salesforce", "Pipedrive", "ServiceTitan", "Jobber", "Zapier"] as const;

export const nav = [
  {
    href: "/#approach",
    label: "How it works",
  },
  {
    href: "/#handles",
    label: "What it handles",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
] as const;

export const approachSteps = [
  {
    index: "01",
    title: "We map your calls (week 1)",
    copy: "Your services, service area, hours, emergency rules and who gets woken up for what.",
  },
  {
    index: "02",
    title: "We build and test it (week 2)",
    copy: "Trained on your business, connected to your calendar, tested on real-world calls before it touches a customer.",
  },
  {
    index: "03",
    title: "It answers, books and hands off",
    copy: "Overflow and after-hours calls get answered; jobs land on your board; anything unusual goes straight to a person.",
  },
] as const;

export const problems = [
  {
    title: "Half your callers never reach a person",
    detail: "Across home services, only 52% of calls are answered by a person. In HVAC it's 34%.",
    source: "Invoca, Home Services Lead Conversion Benchmarks Report 2026",
  },
  {
    title: "They don't leave a voicemail. They call the next guy.",
    detail: "Only 42% of consumers say they leave a voicemail, and 82% say they'll call a competitor.",
    source: "CallRail consumer survey, September 2025",
  },
  {
    title: "You paid for that call",
    detail: "Search-ad leads for HVAC and plumbing average about $128 to $129 each.",
    source: "LocaliQ 2025 Search Ad Benchmarks for Home Services",
  },
  {
    title: "Web leads and quotes go cold",
    detail:
      "Forms sit until morning and estimates never get a second call. Whoever responds first usually gets the job.",
    source: "",
  },
] as const;

export const callTypes = [
  {
    type: "Emergencies (no heat, no AC, burst pipe, power loss)",
    action: "Flags urgency, gets the address, routes to on-call tech",
  },
  {
    type: "Service and repair requests",
    action: "Qualifies the job and books the next open slot",
  },
  {
    type: "Estimates and replacements",
    action: "Captures system details and books the estimate visit",
  },
  {
    type: "Maintenance plans and tune-ups",
    action: "Books routine visits and plan renewals",
  },
  {
    type: "Existing customers and vendors",
    action: "Takes a message or transfers to the right person",
  },
  {
    type: "Missed calls and web forms (secondary: AI lead follow-up)",
    action: "Texts back fast, calls back, and follows up quotes that went quiet",
  },
] as const;

export const chapters = [
  {
    "count": "01 / Receive",
    "bar": "01 \u2014 Receive",
    "copy": "A customer reaches out. Your AI receptionist picks up the conversation, even when your team is away.",
    "title": "A customer calls",
    "meta": "AI receptionist \u00b7 incoming enquiry"
  },
  {
    "count": "02 / Understand",
    "bar": "02 \u2014 Understand",
    "copy": "Intent becomes context. The system identifies the request and gathers what your team needs to know.",
    "title": "The request makes sense",
    "meta": "Intent \u00b7 details \u00b7 qualification"
  },
  {
    "count": "03 / Act",
    "bar": "03 \u2014 Act",
    "copy": "Interest becomes a next step. Offer an available appointment, with a human handoff when needed.",
    "title": "An appointment takes shape",
    "meta": "Availability \u00b7 booking \u00b7 confirmation"
  },
  {
    "count": "04 / Connect",
    "bar": "04 \u2014 Connect",
    "copy": "The loop closes. The conversation, booking, and next action reach the right people and tools.",
    "title": "Your team is in the loop",
    "meta": "CRM update \u00b7 notes \u00b7 next action"
  }
] as const;

const faqBase = [
  {
    question: "Will my customers know it's an AI?",
    answer:
      "Yes if they ask; it never pretends to be human. Most callers care about getting booked, not who picks up.",
  },
  {
    question: "What if it gets something wrong?",
    answer:
      "It follows your rules, hands unusual calls to a person, and you get a transcript of every call to review.",
  },
  {
    question: "I already have an answering service.",
    answer: "Good. Most take messages; Bizagentos books the job.",
  },
  {
    question: "Does it work with my phone number?",
    answer: "You keep your number and forward overflow or after-hours calls to it.",
  },
  {
    question: "How long does setup take?",
    answer: "You spend about an hour with us; we do the rest.",
  },
  {
    question: "What does it cost?",
    answer:
      "Priced by call volume and what it handles. The free call audit tells you whether it's worth it before you spend a dollar.",
  },
] as const;

export function publishedFaqs() {
  return faqBase.map((faq) => {
    if (faq.question === "I already have an answering service." && filled(pending.demoLineDisplay)) {
      return { question: faq.question, answer: `${faq.answer} Call the demo line and compare.` };
    }
    if (faq.question === "Does it work with my phone number?" && filled(pending.phoneSetupNote)) {
      return { question: faq.question, answer: `${faq.answer} ${pending.phoneSetupNote.trim()}` };
    }
    if (faq.question === "How long does setup take?" && filled(pending.launchTime)) {
      return { question: faq.question, answer: `${pending.launchTime.trim()} ${faq.answer}` };
    }
    return { question: faq.question, answer: faq.answer };
  });
}

export function visibleCopy() {
  const priceLine = filled(pending.priceFrom)
    ? `Plans start at ${pending.priceFrom.trim()} per month.`
    : "Priced by call volume and what it handles.";
  return [
    site.name,
    site.legalName,
    site.description,
    homeTitle,
    heroLede,
    closingCopy,
    primaryCta,
    footerFinePrint,
    priceLine,
    pending.terms,
    pending.guarantee,
    pending.launchTime,
    pending.clientResult,
    pending.businessAddress,
    ...tools,
    ...approachSteps.flatMap((step) => [step.title, step.copy]),
    ...problems.flatMap((problem) => [problem.title, problem.detail, problem.source]),
    ...callTypes.flatMap((call) => [call.type, call.action]),
    ...publishedFaqs().flatMap((faq) => [faq.question, faq.answer]),
    ...pending.testimonials.flatMap((item) => [item.quote, item.name, item.company, item.city]),
  ].filter((line) => line.trim().length > 0);
}

export const statementLines = [
  [
    {
      "text": "It's"
    },
    {
      "text": "less"
    },
    {
      "text": "friction."
    }
  ],
  [
    {
      "text": "Fewer"
    },
    {
      "text": "missed"
    },
    {
      "text": "moments."
    }
  ],
  [
    {
      "text": "More",
      "accent": true
    },
    {
      "text": "room",
      "accent": true
    },
    {
      "text": "to",
      "accent": true
    },
    {
      "text": "grow.",
      "accent": true
    }
  ]
] as const;

export type Solution = {
  slug: string;
  title: string;
  group: "Conversations" | "Revenue";
  summary: string;
  description: string;
  features: string[];
  useCases: string[];
};

export const solutions: Solution[] = 
[
  {
    "slug": "voice-receptionist",
    "title": "AI Voice Receptionist",
    "group": "Conversations",
    "summary": "Answer inbound calls, qualify the request, and book a next step when the team is with a customer or off the clock.",
    "description": "A voice receptionist trained on your services, pricing, and booking rules. Callers get a direct response, including after hours, and unusual calls still reach a person.",
    "features": [
      "Call answering in a natural conversation",
      "Routing based on what the caller needs",
      "Appointment scheduling",
      "A record of the call in the CRM you already use"
    ],
    "useCases": [
      "Home service and other appointment businesses",
      "Multi-location operations",
      "Teams with more calls than people to answer them",
      "After-hours coverage"
    ]
  },
  {
    "slug": "chat-support",
    "title": "AI Chat Support",
    "group": "Conversations",
    "summary": "Chat that answers the common questions and brings a person in, with the thread attached, when the request needs one.",
    "description": "Support across your site, SMS, and social. The agent uses your knowledge base, keeps the context of the conversation, and escalates anything that should not be handled alone.",
    "features": [
      "Replies on web, SMS, and social",
      "Conversations that remember the thread",
      "A clear handoff to a person",
      "Multi-language replies when your customers need them",
      "Connected to the answers your team already trusts"
    ],
    "useCases": [
      "Ecommerce businesses",
      "Software companies with customers in more than one region",
      "Support teams with a high volume of repeat questions",
      "Businesses with seasonal spikes"
    ]
  },
  {
    "slug": "voice-support",
    "title": "AI Voice Support",
    "group": "Conversations",
    "summary": "Phone support without the keypad menu. Callers explain the issue, get help, or reach a person with the context intact.",
    "description": "Voice agents that follow your procedures, transcribe the call, and transfer to a teammate when judgment is required. Your team sees the cases that actually need them.",
    "features": [
      "A spoken conversation, not a phone tree",
      "Troubleshooting from your own procedures",
      "Handoff to a person with the context attached",
      "Call transcription",
      "Escalation when the caller is stuck or frustrated"
    ],
    "useCases": [
      "Technical support teams",
      "Utilities and telecom",
      "Healthcare scheduling and triage",
      "Financial services"
    ]
  },
  {
    "slug": "ai-sdr",
    "title": "AI SDR System",
    "group": "Revenue",
    "summary": "Follow up while the enquiry is still warm. Qualify it, then hand your team a clearer conversation.",
    "description": "An outreach workflow that contacts new leads, checks them against your qualification rules, and syncs the result to your pipeline. Reps get context and a next step, not another raw form fill.",
    "features": [
      "Follow-up across email, SMS, and calls",
      "Qualification and lead scoring",
      "CRM sync and pipeline updates",
      "Consent and handoff rules your team defines"
    ],
    "useCases": [
      "B2B companies with a defined sales motion",
      "Teams that need a faster first response",
      "Lead generation partners",
      "Real estate and financial services"
    ]
  },
  {
    "slug": "lead-generation",
    "title": "AI Lead Generation Engine",
    "group": "Revenue",
    "summary": "Find people who fit, start a relevant conversation, and keep it moving until someone on your team should take over.",
    "description": "Prospecting support for teams with a clear ideal customer: discovery, enrichment, outreach, and scoring. The aim is a steadier set of relevant conversations, with your team still deciding who to pursue.",
    "features": [
      "Prospect discovery and enrichment",
      "Outreach across more than one channel",
      "First touches written around the account",
      "Scoring and segmentation"
    ],
    "useCases": [
      "B2B companies with a defined customer profile",
      "Account-based marketing teams",
      "Agencies scaling client acquisition",
      "Sales organizations that need a steadier top of funnel"
    ]
  },
  {
    "slug": "gtm-engineering",
    "title": "AI GTM Engineering",
    "group": "Revenue",
    "summary": "Research, messaging, and launch coordination for a go-to-market that fits the product you actually sell.",
    "description": "Help for teams launching an offer or entering a market: research, ideal-customer work, messaging, and a practical way to test channels. Built around your offer, then handed back to the people who run it.",
    "features": [
      "Market and competitor research support",
      "Ideal-customer and persona development",
      "Messaging frameworks",
      "Channel tests and launch coordination"
    ],
    "useCases": [
      "Teams launching a new offer",
      "Companies entering a new market",
      "Product teams with limited launch support",
      "Agencies running more than one launch"
    ]
  }
];

export type SolutionGroup = {
  id: string;
  index: string;
  title: string;
  summary: string;
  explore: string;
  detail: string;
  links: { href: string; label: string }[];
};

export const solutionGroups: SolutionGroup[] = 
[
  {
    "id": "conversations",
    "index": "01 \u2014 Conversations",
    "title": "Answer the moment.",
    "summary": "Voice and chat agents that help customers move forward, with a clear path to a person.",
    "explore": "Explore conversations",
    "detail": "Understand an incoming request, offer a suitable next step, and hand off unusual cases.",
    "links": [
      {
        "href": "/solutions/voice-receptionist",
        "label": "AI Voice Receptionist"
      },
      {
        "href": "/solutions/chat-support",
        "label": "AI Chat Support"
      },
      {
        "href": "/solutions/voice-support",
        "label": "AI Voice Support"
      }
    ]
  },
  {
    "id": "revenue",
    "index": "02 \u2014 Revenue",
    "title": "Keep interest moving.",
    "summary": "Turn new enquiries into meaningful conversations through qualification and thoughtful follow-up.",
    "explore": "Explore sales automation",
    "detail": "Capture an enquiry, check fit, prepare a relevant response, and give your team the context to take over.",
    "links": [
      {
        "href": "/solutions/ai-sdr",
        "label": "AI SDR System"
      },
      {
        "href": "/solutions/lead-generation",
        "label": "AI Lead Generation Engine"
      },
      {
        "href": "/solutions/gtm-engineering",
        "label": "AI GTM Engineering"
      }
    ]
  },
  {
    "id": "operations",
    "index": "03 \u2014 Operations",
    "title": "Connect the handoffs.",
    "summary": "Let information flow between your tools, so your people can stop moving it by hand.",
    "explore": "Explore connected workflows",
    "detail": "Turn a completed conversation into structured notes, a CRM update, and an assigned next step.",
    "links": [
      {
        "href": "/#tools",
        "label": "Tools we connect"
      },
      {
        "href": "/industries",
        "label": "Home service workflows"
      },
      {
        "href": "/contact",
        "label": "Plan a handoff"
      }
    ]
  }
];

export type Industry = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

export const industries: Industry[] = 
[
  {
    "id": "hvac",
    "title": "HVAC",
    "summary": "Emergency dispatch, seasonal forecasting, preventive maintenance.",
    "items": [
      "Emergency service dispatch",
      "Seasonal demand and scheduling",
      "Coordination when a job needs more than one technician",
      "Preventive maintenance reminders"
    ]
  },
  {
    "id": "plumbing",
    "title": "Plumbing",
    "summary": "Emergency triage, inventory, damage assessment.",
    "items": [
      "Emergency leak triage and priority",
      "Parts inventory",
      "Water damage assessment",
      "License checks for commercial jobs"
    ]
  },
  {
    "id": "electrical",
    "title": "Electrical",
    "summary": "Code compliance, load calculation, permit tracking.",
    "items": [
      "Code compliance checks",
      "Load calculation",
      "Permit tracking and scheduling",
      "Safety inspection coordination"
    ]
  },
  {
    "id": "garage-doors",
    "title": "Garage Doors",
    "summary": "Model identification, parts compatibility, scheduling.",
    "items": [
      "Model identification from photos",
      "Parts compatibility",
      "Installation scheduling",
      "Warranty claim handling"
    ]
  },
  {
    "id": "solar",
    "title": "Solar",
    "summary": "Site assessment, proposals, interconnection, incentives.",
    "items": [
      "Site assessment",
      "Proposal and savings calculations",
      "Utility interconnection tracking",
      "Incentive and rebate paperwork"
    ]
  }
];
