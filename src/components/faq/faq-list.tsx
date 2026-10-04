"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { track } from "@/lib/analytics";

export function FaqList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="faq-list">
      {faqs.map((faq) => {
        const isOpen = open === faq.question;
        return (
          <div className="faq-item" key={faq.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => {
                const next = isOpen ? null : faq.question;
                setOpen(next);
                if (next) track("faq_opened", { question: faq.question });
              }}
            >
              {faq.question}
            </button>
            {isOpen ? (
              <div className="faq-copy">
                <p>{faq.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
