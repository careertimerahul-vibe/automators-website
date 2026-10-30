import { publishedFaqs } from "@/lib/content";

export function FaqList() {
  return (
    <div className="faq-list">
      {publishedFaqs().map((faq) => (
        <div className="faq-item" key={faq.question}>
          <h3>{faq.question}</h3>
          <div className="faq-copy">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
