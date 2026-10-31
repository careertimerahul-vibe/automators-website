export const trades = ["HVAC", "Plumbing", "Electrical", "Other"] as const;

export type Trade = (typeof trades)[number];

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  trade: Trade | "";
  message: string;
};

export type ParsedContact =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; lead: ContactLead }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseContact(body: unknown): ParsedContact {
  if (!body || typeof body !== "object") return { ok: false, error: "Missing details." };
  const record = body as Record<string, unknown>;
  if (text(record.company_website, 200)) return { ok: true, honeypot: true };

  const name = text(record.name, 120);
  const email = text(record.email, 200);
  const phone = text(record.phone, 40);
  const businessName = text(record.businessName, 160);
  const tradeText = text(record.trade, 40);
  const message = text(record.message, 4000);

  if (!name) return { ok: false, error: "Name is required." };
  if (!emailPattern.test(email)) return { ok: false, error: "A valid email is required." };
  if (tradeText && !trades.includes(tradeText as Trade)) return { ok: false, error: "Choose a trade from the list." };

  return {
    ok: true,
    honeypot: false,
    lead: {
      name,
      email,
      phone,
      businessName,
      trade: tradeText as Trade | "",
      message,
    },
  };
}

export function leadRows(lead: ContactLead) {
  return [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Business", lead.businessName || "—"],
    ["Trade", lead.trade || "—"],
    ["Message", lead.message || "—"],
  ] as const;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function leadHtml(lead: ContactLead) {
  const rows = leadRows(lead)
    .map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("");
  return `<table>${rows}</table>`;
}

export const leadSubject = "New Bizagentos lead";
export const formsubmitEndpoint = "https://formsubmit.co/ajax/info@bizagentos.com";
