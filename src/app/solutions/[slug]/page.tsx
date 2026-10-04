import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.summary,
    alternates: { canonical: `/solutions/${solution.slug}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) notFound();
  const related = solutions.filter((item) => item.group === solution.group && item.slug !== solution.slug);

  return (
    <main id="main" className="page-wrap">
      <header className="page-intro">
        <p className="kicker">
          <i className="dot" aria-hidden="true" />
          {solution.group}
        </p>
        <h1>{solution.title}</h1>
        <p className="lede">{solution.summary}</p>
      </header>
      <p className="prose">{solution.description}</p>
      <div className="detail-grid">
        <section className="panel">
          <h2>What it takes on</h2>
          <ul>
            {solution.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <h2>Where it fits</h2>
          <ul>
            {solution.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="page-actions">
        <Link className="btn-lime" href="/contact">
          Talk through this workflow <span aria-hidden="true">↗</span>
        </Link>
        <Link className="text-link" href="/#solutions">
          All services
        </Link>
      </div>
      {related.length > 0 ? (
        <aside className="related">
          <h2>Related</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/solutions/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </main>
  );
}
