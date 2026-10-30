import { hubspot, site } from "@/lib/content";

type AuditRequest = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  note?: unknown;
  company_website?: unknown;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: AuditRequest;
  try {
    body = (await request.json()) as AuditRequest;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (text(body.company_website, 200)) {
    return Response.json({ ok: true });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const phone = text(body.phone, 40);
  const note = text(body.note, 2000);
  if (!name || !email.includes("@") || email.startsWith("@") || !phone) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const hubspotResponse = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${hubspot.portalId}/${hubspot.formId}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fields: [
          { objectTypeId: "0-1", name: "email", value: email },
          { objectTypeId: "0-1", name: "firstname", value: name },
          { objectTypeId: "0-1", name: "phone", value: phone },
          { objectTypeId: "0-1", name: "message", value: note },
        ],
        context: {
          pageUri: `${site.url}/contact`,
          pageName: "Book a free 20-minute call audit",
        },
      }),
    },
  );

  if (!hubspotResponse.ok) {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
