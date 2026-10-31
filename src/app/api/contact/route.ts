import { formsubmitEndpoint, leadHtml, leadRows, leadSubject, parseContact, type ContactLead } from "@/lib/contact";
import { site } from "@/lib/content";

function logLead(delivery: string, ok: boolean, lead: ContactLead, detail: string) {
  console.log(
    JSON.stringify({
      event: "bizagentos_lead",
      at: new Date().toISOString(),
      delivery,
      ok,
      detail,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      businessName: lead.businessName,
      trade: lead.trade,
      message: lead.message,
    }),
  );
}

async function deliverResend(lead: ContactLead) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM?.trim() || `Bizagentos <${site.email}>`,
      to: [site.email],
      reply_to: lead.email,
      subject: leadSubject,
      html: leadHtml(lead),
    }),
  });
  const detail = await response.text();
  return { ok: response.ok, detail: detail.slice(0, 500) };
}

async function deliverFormSubmit(lead: ContactLead) {
  const fields = Object.fromEntries(leadRows(lead));
  const response = await fetch(formsubmitEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      _replyto: lead.email,
      _subject: leadSubject,
      _template: "table",
      _captcha: "false",
    }),
  });
  const detail = await response.text();
  let accepted = response.ok;
  try {
    const parsed = JSON.parse(detail) as { success?: boolean | string; message?: string };
    if (parsed.success === false || parsed.success === "false") accepted = false;
  } catch {
    accepted = false;
  }
  return { ok: accepted, detail: detail.slice(0, 500) };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Missing details." }, { status: 400 });
  }

  const parsed = parseContact(body);
  if (!parsed.ok) return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  if (parsed.honeypot) {
    console.log(JSON.stringify({ event: "bizagentos_lead_honeypot", at: new Date().toISOString() }));
    return Response.json({ ok: true });
  }

  const delivery = process.env.RESEND_API_KEY ? "resend" : "formsubmit";
  try {
    const result = delivery === "resend" ? await deliverResend(parsed.lead) : await deliverFormSubmit(parsed.lead);
    logLead(delivery, result.ok, parsed.lead, result.detail);
    if (!result.ok) {
      return Response.json({ ok: false, delivery, detail: result.detail }, { status: 502 });
    }
    return Response.json({ ok: true, delivery, detail: result.detail });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Delivery failed.";
    logLead(delivery, false, parsed.lead, detail);
    return Response.json({ ok: false, delivery, detail }, { status: 502 });
  }
}
