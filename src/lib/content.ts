export const site = {
  "name": "the automators",
  "legalName": "The AI Automators",
  "url": "https://theautomators.io",
  "email": "info@theautomators.io",
  "phoneDisplay": "+1 (254) 276-5107",
  "phoneHref": "tel:+12542765107",
  "description": "Your next stage of growth shouldn't need another layer of manual work. Put AI to work across your calls, customers, and operations."
} as const;

export const hubspot = {
  "script": "https://js-na2.hsforms.net/forms/embed/244154570.js",
  "region": "na2",
  "formId": "d8c2a504-7442-41e9-8eed-7c83f814dc93",
  "portalId": "244154570"
} as const;

export const tools = ["HubSpot", "Salesforce", "Pipedrive", "ServiceTitan", "Jobber", "Zapier"] as const;

export const nav = [
  {
    "href": "/#solutions",
    "label": "What we automate"
  },
  {
    "href": "/#approach",
    "label": "Our approach"
  }
] as const;

export const approachSteps = [
  {
    "index": "01",
    "title": "Find the right starting point",
    "copy": "Map the bottleneck and agree what a useful result looks like."
  },
  {
    "index": "02",
    "title": "Make it work in your world",
    "copy": "Connect the tools, test realistic scenarios, and define human handoffs."
  },
  {
    "index": "03",
    "title": "Keep making it better",
    "copy": "Review what happens in practice and refine the system with your team."
  }
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

export const faqs = [
  {
    "question": "Why hire consultants instead of buying software?",
    "answer": "Software gives you tools. A consultant stays through the messy part: strategy, implementation, integration, training, and the changes that show up once real customers use it. You get a working workflow, not a login."
  },
  {
    "question": "Do you work with my existing tools?",
    "answer": "Yes. Engagements are built around the systems you already run. HubSpot, Pipedrive, Salesforce, ServiceTitan, and Jobber come up often. If your stack is different, that is part of the strategy session."
  },
  {
    "question": "What's the difference between you and other AI companies?",
    "answer": "A lot of AI companies sell a generic tool and leave the rollout to you. We start with the business, design the workflow, do the technical work, and keep tuning it with your team."
  },
  {
    "question": "How fast can we launch?",
    "answer": "Timing depends on the workflow, the tools involved, and how your team needs to stay in the loop. On the strategy session we say what a first version can realistically include before anything is built."
  },
  {
    "question": "What if it doesn't work?",
    "answer": "The strategy session is free and there is no obligation to continue. Before a build, we agree what a useful result looks like and review it with you against real scenarios."
  }
] as const;

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
