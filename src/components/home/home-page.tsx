import { CalendarCheck, PhoneIncoming, Sparkles } from "lucide-react";
import { FaqList } from "@/components/faq/faq-list";
import { CtaLink } from "@/components/site/cta-link";
import {
  approachSteps,
  callTypes,
  closingCopy,
  heroLede,
  primaryCta,
  problems,
  tools,
} from "@/lib/content";
import { filled, pending, publishedCaseStudies } from "@/lib/pending";
import { exampleScenarioLabel, exampleScenarios, industryStats, scenarioDisclaimer } from "@/lib/proof";

const floats = [
  { icon: PhoneIncoming, title: "A call comes in", detail: "After hours, at lunch, or on a job." },
  { icon: Sparkles, title: "Emergency or tune-up", detail: "It sorts the request." },
  { icon: CalendarCheck, title: "The job gets booked", detail: "Your team gets the details." },
];

export function HomePage() {
  const hasDemo = filled(pending.demoLineDisplay) && filled(pending.demoLineHref);
  const testimonials = pending.testimonials.filter(
    (item) => filled(item.quote) && filled(item.name) && filled(item.company) && filled(item.city),
  );
  const hasProof = hasDemo || filled(pending.callRecordingUrl) || filled(pending.clientResult) || testimonials.length > 0;

  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              HVAC, plumbing and electrical
            </p>
            <h1 id="hero-title">
              <span className="hero-line">Every call answered.</span>
              <span className="hero-line">Every job booked.</span>
              <span className="hero-line">
                Even at <em>2 a.m.</em>
              </span>
            </h1>
            <p className="lede">{heroLede}</p>
            <div className="hero-actions">
              <CtaLink className="btn-lime" location="hero">
                {primaryCta} <span aria-hidden="true">↗</span>
              </CtaLink>
              {hasDemo ? (
                <a className="text-link" href={pending.demoLineHref}>
                  Call our demo line: {pending.demoLineDisplay}
                </a>
              ) : (
                <a className="text-link" href="#approach">
                  See how it works <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
            {hasDemo ? <p className="hero-micro">Pretend your AC just died. It&apos;ll book you in.</p> : null}
          </div>
          <div className="art" aria-hidden="true">
            <div className="art-stage">
              <div className="art-glow" />
              <div className="orbit" />
              <div className="orbit orbit-2" />
              <div className="core">ai</div>
            </div>
            {floats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div className={`float float-${index + 1}`} key={item.title}>
                  <Icon aria-hidden="true" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <a className="scroll-cue" href="#problem">
          <span className="scroll-mouse" aria-hidden="true" />
          Your phone is the leak
        </a>
      </section>

      <section className="services band" id="problem" aria-labelledby="problem-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              The problem
            </p>
            <h2 id="problem-title">Your phone is your biggest leak.</h2>
          </div>
        </div>
        <div className="service-grid problem-grid">
          {problems.map((problem) => (
            <article className="service-card" key={problem.title}>
              <h3>{problem.title}</h3>
              <p>{problem.detail}</p>
              {problem.source ? <p className="stat-source">{problem.source}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="method" id="approach" aria-labelledby="approach-title">
        <div className="method-inner">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              How it works
            </p>
            <h2 id="approach-title">How it works</h2>
            {filled(pending.launchTime) ? <p className="lede launch-note">{pending.launchTime.trim()}</p> : null}
          </div>
          <div className="method-steps">
            {approachSteps.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services band" id="proof" aria-labelledby="proof-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              Proof
            </p>
            <h2 id="proof-title" className="measure">
              What the numbers say
            </h2>
          </div>
          <p>Industry benchmarks. Not a Bizagentos client.</p>
        </div>
        <div className="service-grid problem-grid">
          {industryStats.map((stat) => (
            <article className="service-card stat-card" key={stat.figure}>
              <p className={"longFigure" in stat && stat.longFigure ? "stat-figure is-long" : "stat-figure"}>{stat.figure}</p>
              <h3>{stat.title}</h3>
              <p>{stat.detail}</p>
              <p className="stat-source">{stat.source}</p>
            </article>
          ))}
        </div>
        {publishedCaseStudies().length > 0 ? (
          <div className="proof-follow">
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              Case studies
            </p>
            <div className="service-grid problem-grid">
              {publishedCaseStudies().map((study) => (
                <article className="service-card scenario-card" key={study.label}>
                  <p className="example-badge">Case study</p>
                  <h3>{study.label}</h3>
                  <p>{study.summary}</p>
                  {study.metrics.length > 0 ? (
                    <ul className="scenario-math">
                      {study.metrics.map((metric) => (
                        <li key={metric.label}>
                          <span>{metric.label}</span>
                          <strong>{metric.value}</strong>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="proof-follow">
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              Example scenarios
            </p>
            <div className="service-grid problem-grid">
              {exampleScenarios().map((scenario) => (
                <article className="service-card scenario-card" key={scenario.id}>
                  <p className="example-badge">{exampleScenarioLabel}</p>
                  <h3>{scenario.title}</h3>
                  <p className="scenario-note">{scenarioDisclaimer}</p>
                  <p>{scenario.setup}</p>
                  <ul className="scenario-math">
                    {scenario.rows.map((row) => (
                      <li key={row.label}>
                        <span>{row.label}</span>
                        <strong>{row.value}</strong>
                      </li>
                    ))}
                  </ul>
                  <p className="stat-source">{scenario.math}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {hasProof ? (
          <div className="service-grid handle-grid proof-extra">
            {hasDemo ? (
              <article className="service-card">
                <h3>Live demo line</h3>
                <p>
                  Call <a href={pending.demoLineHref}>{pending.demoLineDisplay}</a> any time. It plays a fictional
                  plumbing and HVAC company, says it&apos;s an AI, and books you a slot.
                </p>
              </article>
            ) : null}
            {filled(pending.callRecordingUrl) ? (
              <article className="service-card">
                <h3>Call recording</h3>
                <audio controls preload="none" src={pending.callRecordingUrl}>
                  <a href={pending.callRecordingUrl}>Listen to the call</a>
                </audio>
                {filled(pending.callRecordingTranscript) ? <p>{pending.callRecordingTranscript.trim()}</p> : null}
              </article>
            ) : null}
            {filled(pending.clientResult) ? (
              <article className="service-card">
                <h3>Results</h3>
                <p>{pending.clientResult.trim()}</p>
              </article>
            ) : null}
            {testimonials.map((item) => (
              <blockquote className="service-card" key={`${item.name}-${item.company}`}>
                <p>&ldquo;{item.quote.trim()}&rdquo;</p>
                <p className="stat-source">
                  {item.name.trim()}, {item.company.trim()}, {item.city.trim()}
                </p>
              </blockquote>
            ))}
          </div>
        ) : null}
      </section>

      <section className="services band" id="handles" aria-labelledby="handles-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              The receptionist
            </p>
            <h2 id="handles-title">What it handles</h2>
          </div>
        </div>
        <div className="service-grid handle-grid">
          {callTypes.map((call) => (
            <article className="service-card" key={call.type}>
              <h3>{call.type}</h3>
              <p>{call.action}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services band" id="tools" aria-labelledby="tools-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              Integrations
            </p>
            <h2 id="tools-title" className="measure">
              Works with your tools.
            </h2>
          </div>
          <p>Books into the calendar and job software you already use, and logs every call.</p>
        </div>
      </section>
      <section className="tools" aria-label="Tools you can connect">
        <p>Works with the tools you use.</p>
        <ul>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="services band" id="pricing" aria-labelledby="pricing-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              Pricing
            </p>
            <h2 id="pricing-title" className="measure">
              {filled(pending.priceFrom)
                ? `Plans start at ${pending.priceFrom.trim()} per month.`
                : "Priced by call volume and what it handles."}
            </h2>
          </div>
          <p>
            {filled(pending.priceFrom) ? "Priced by call volume and what it handles. " : null}
            The free call audit tells you whether it&apos;s worth it before you spend a dollar.
            {filled(pending.terms) ? ` ${pending.terms.trim()}` : null}
            {filled(pending.guarantee) ? ` ${pending.guarantee.trim()}` : null}
          </p>
        </div>
      </section>

      <section className="services band" id="faq" aria-labelledby="faq-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              FAQ
            </p>
            <h2 id="faq-title">FAQ</h2>
          </div>
        </div>
        <FaqList />
      </section>

      <div className="close-wrap">
        <section className="close" aria-labelledby="close-title">
          <p className="kicker kicker-dark">
            <i className="dot dot-dark" aria-hidden="true" />
            Free 20-minute call audit
          </p>
          <h2 id="close-title">Find out how many calls you&apos;re missing.</h2>
          <p className="close-copy">{closingCopy}</p>
          <CtaLink className="btn-ink" location="closing">
            {primaryCta} <span aria-hidden="true">↗</span>
          </CtaLink>
          {hasDemo ? (
            <p className="close-note">
              Or call the demo: <a href={pending.demoLineHref}>{pending.demoLineDisplay}</a>
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
