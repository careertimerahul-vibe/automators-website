"use client";

import Link from "next/link";
import { CalendarCheck, Check, PhoneIncoming, Sparkles } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import {
  approachSteps,
  chapters,
  site,
  solutionGroups,
  statementLines,
  tools,
} from "@/lib/content";
import { track } from "@/lib/analytics";
import {
  chapterFill,
  chapterIndex,
  clamp,
  flowProgress,
  heroProgress,
  nodeLit,
  nodeReveal,
  pinProgress,
  reveal,
  wordStrength,
} from "@/lib/motion";

const floats = [
  { icon: PhoneIncoming, title: "A customer calls", detail: "Even after the team clocks off." },
  { icon: Sparkles, title: "AI finds the next step", detail: "Understand. Qualify. Route." },
  { icon: CalendarCheck, title: "Opportunity, booked.", detail: "In your calendar. In your CRM." },
];

function offsetTop(element: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function HomePage() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home]");
    if (!root) return;
    const hero = root.querySelector<HTMLElement>("[data-m='hero']");
    const copy = root.querySelector<HTMLElement>("[data-m='hero-copy']");
    const art = root.querySelector<HTMLElement>("[data-m='art']");
    const core = root.querySelector<HTMLElement>("[data-m='core']");
    const orbits = [...root.querySelectorAll<HTMLElement>("[data-m='orbit']")];
    const floatEls = [...root.querySelectorAll<HTMLElement>("[data-m='float']")];
    const toolsEl = root.querySelector<HTMLElement>("[data-m='tools']");
    const story = root.querySelector<HTMLElement>("[data-m='story']");
    const pin = root.querySelector<HTMLElement>("[data-m='pin']");
    const rail = root.querySelector<HTMLElement>("[data-m='rail']");
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-m='node']")];
    const chapterEls = [...root.querySelectorAll<HTMLElement>("[data-m='chapter']")];
    const count = root.querySelector<HTMLElement>("[data-m='chapter-count']");
    const stages = [...root.querySelectorAll<HTMLElement>("[data-m='stage']")];
    const manifesto = root.querySelector<HTMLElement>("[data-m='manifesto']");
    const words = [...root.querySelectorAll<HTMLElement>("[data-m='word']")];
    const cards = [...root.querySelectorAll<HTMLElement>("[data-m='card']")];
    const steps = [...root.querySelectorAll<HTMLElement>("[data-m='step']")];
    const close = root.querySelector<HTMLElement>("[data-m='close']");
    if (!hero || !copy || !art || !core || !story || !pin || !rail || !manifesto || !close) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let chapter = -1;
    let measuredPin = 0;
    let measuredWidth = -1;
    let busy = false;
    let reduced = motionQuery.matches;
    const metrics = {
      heroTop: 0,
      heroH: 1,
      storyTop: 0,
      storyH: 1,
      pinH: 1,
      navH: 74,
      travel: 1,
      manifesto: 0,
      cards: [] as number[],
      steps: [] as number[],
      close: 0,
      viewH: 800,
    };
    let pinned = false;

    const clearMotion = () => {
      for (const element of [copy, art, core, toolsEl, rail, close, ...orbits, ...floatEls, ...nodes, ...words, ...cards, ...steps]) {
        if (!element) continue;
        element.style.transform = "";
        element.style.opacity = "";
      }
      close.style.borderRadius = "";
      chapterEls.forEach((element) => element.style.removeProperty("--fill"));
    };

    const clearPin = () => {
      story.style.height = "";
      pin.style.position = "";
      pin.style.top = "";
      pin.style.height = "";
      pin.style.overflow = "";
    };

    const setChapter = (index: number) => {
      if (index === chapter) return;
      chapter = index;
      const current = chapters[index];
      if (count && current) count.textContent = current.count;
      stages.forEach((element, stageIndex) => {
        const active = stageIndex === index;
        element.classList.toggle("is-current", active);
        element.toggleAttribute("aria-hidden", !active);
      });
      chapterEls.forEach((element, stageIndex) => {
        const active = stageIndex === index;
        element.classList.toggle("is-current", active);
        if (active) element.setAttribute("aria-current", "step");
        else element.removeAttribute("aria-current");
      });
    };

    const paint = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const viewH = metrics.viewH;
      if (reduced) {
        clearMotion();
        nodes.forEach((element) => element.classList.add("is-lit"));
        chapterEls.forEach((element) => element.style.setProperty("--fill", "1"));
        setChapter(0);
        stages.forEach((element) => {
          element.classList.add("is-current");
          element.removeAttribute("aria-hidden");
        });
        return;
      }

      const wide = window.innerWidth >= 960;
      const phone = window.innerWidth <= 640;
      const progress = heroProgress(scrollY, metrics.heroTop, metrics.heroH);
      copy.style.transform = `translate3d(0, ${-(72 * progress)}px, 0)`;
      copy.style.opacity = String(clamp(1 - 0.72 * progress, 0.2, 1));
      art.style.transform = `translate3d(0, ${78 * progress}px, 0) rotate(${8 * progress}deg) scale(${1 + 0.05 * progress})`;
      core.style.transform = `rotate(${-12 + 80 * progress}deg)`;
      orbits.forEach((element, index) => {
        element.style.transform = `rotateX(${index === 0 ? 35 : -30}deg) rotateZ(${index === 0 ? -30 + 48 * progress : 30 - 56 * progress}deg)`;
      });
      floatEls.forEach((element, index) => {
        if (phone) {
          element.style.transform = "none";
          return;
        }
        const direction = [-1, 1, -1][index] ?? 1;
        const base = [-6, 5, -3][index] ?? 0;
        const drift = wide ? 42 : 6;
        const lift = wide ? 48 : 8;
        const spin = wide ? 14 : 3;
        element.style.transform = `translate3d(${direction * progress * drift}px, ${(index - 1) * progress * lift}px, 0) rotate(${base + direction * progress * spin}deg)`;
      });
      if (toolsEl) {
        const amount = clamp((scrollY - metrics.heroH + 0.35 * viewH) / 450);
        toolsEl.style.transform = `translate3d(${-(wide ? 28 : 0) * amount}px, 0, 0)`;
      }

      const storyProgress = pinned
        ? pinProgress(scrollY, metrics.storyTop, metrics.navH, metrics.travel)
        : flowProgress(scrollY, metrics.storyTop, metrics.storyH, viewH);
      rail.style.transform = `scaleY(${storyProgress})`;
      nodes.forEach((element, index) => {
        const shown = nodeReveal(storyProgress, index);
        const shift = wide ? (1 - shown) * 72 : 0;
        element.style.opacity = String(0.2 + 0.8 * shown);
        element.style.transform = `translate3d(${shift}px, 0, 0) scale(${0.94 + 0.06 * shown})`;
        element.classList.toggle("is-lit", nodeLit(storyProgress, index));
      });
      chapterEls.forEach((element, index) => {
        element.style.setProperty("--fill", String(chapterFill(storyProgress, index)));
      });
      setChapter(chapterIndex(storyProgress));

      const statement = clamp((scrollY + 0.86 * viewH - metrics.manifesto) / (0.55 * viewH));
      words.forEach((element, index) => {
        const strength = wordStrength(statement, index);
        element.style.opacity = String(0.18 + 0.82 * strength);
        element.style.transform = `translate3d(0, ${(1 - strength) * 16}px, 0)`;
      });

      cards.forEach((element, index) => {
        const plain = reveal(scrollY, viewH, metrics.cards[index] ?? 0, Math.min(320, 0.42 * viewH));
        const staggered = reveal(
          scrollY,
          viewH,
          (metrics.cards[index] ?? 0) + (wide ? 36 * index : 0),
          Math.min(320, 0.42 * viewH),
        );
        const amount = wide ? staggered : plain;
        element.style.opacity = String(0.28 + 0.72 * amount);
        element.style.transform = `translate3d(0, ${(1 - amount) * (wide ? 96 : 72)}px, 0) rotateX(${10 * Number(wide) * (1 - amount)}deg) rotate(${(index - 1) * (1 - amount) * (3.5 * Number(wide))}deg)`;
      });
      steps.forEach((element, index) => {
        const amount = reveal(scrollY, viewH, metrics.steps[index] ?? 0, 240);
        const shift = wide ? (1 - amount) * 64 : 0;
        element.style.opacity = String(0.3 + 0.7 * amount);
        element.style.transform = `translate3d(${shift}px, 0, 0)`;
      });
      const closing = reveal(scrollY, viewH, metrics.close, Math.min(420, 0.62 * viewH));
      close.style.transform = `scale(${0.88 + 0.12 * closing})`;
      close.style.borderRadius = `${56 - 32 * closing}px`;
    };

    const measure = (force: boolean) => {
      if (busy) return;
      busy = true;
      try {
        const nav = document.querySelector<HTMLElement>(".site-nav");
        metrics.navH = nav?.offsetHeight ?? 74;
        metrics.viewH = window.innerHeight;
        reduced = motionQuery.matches;
        document.documentElement.classList.toggle("is-reduced", reduced);
        document.documentElement.classList.toggle("is-motion", !reduced);
        if (force) chapter = -1;
        const width = window.innerWidth;
        if (force || width !== measuredWidth || measuredPin === 0) {
          measuredWidth = width;
          clearPin();
          measuredPin = pin.offsetHeight;
        }
        const room = metrics.viewH - metrics.navH;
        pinned = !reduced && measuredPin > 0 && measuredPin <= room - 8;
        story.dataset.pinned = pinned ? "true" : "false";
        if (pinned) {
          const travel = Math.round(1.75 * metrics.viewH);
          metrics.pinH = room;
          metrics.travel = travel;
          story.style.height = `${room + travel}px`;
          pin.style.position = "sticky";
          pin.style.top = `${metrics.navH}px`;
          pin.style.height = `${room}px`;
          pin.style.overflow = "hidden";
        } else {
          clearPin();
          metrics.pinH = measuredPin;
          metrics.travel = Math.max(1, story.offsetHeight);
        }
        metrics.heroTop = offsetTop(hero);
        metrics.heroH = hero.offsetHeight;
        metrics.storyTop = offsetTop(story);
        metrics.storyH = story.offsetHeight;
        metrics.manifesto = offsetTop(manifesto);
        metrics.cards = cards.map(offsetTop);
        metrics.steps = steps.map(offsetTop);
        metrics.close = offsetTop(close);
        paint();
      } finally {
        busy = false;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onResize = () => measure(true);
    measure(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onResize);
    const observer = new ResizeObserver(() => {
      if (!busy) measure(window.innerWidth !== measuredWidth);
    });
    observer.observe(root);
    const grid = root.querySelector(".service-grid");
    if (grid) observer.observe(grid);
    document.fonts?.ready.then(() => measure(true));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onResize);
      observer.disconnect();
      clearPin();
      clearMotion();
      document.documentElement.classList.remove("is-motion", "is-reduced");
    };
  }, []);

  return (
    <main id="main" data-home="true">
      <section className="hero" data-m="hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy" data-m="hero-copy">
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              AI automation. Built around you.
            </p>
            <h1 id="hero-title">
              Less busywork.
              <br />
              More <em>possibility.</em>
            </h1>
            <p className="lede">{site.description}</p>
            <div className="hero-actions">
              <Link
                className="btn-lime"
                href="/contact"
                onClick={() => track("cta_consultation_opened", { location: "hero" })}
              >
                Find your first automation <span aria-hidden="true">↗</span>
              </Link>
              <a className="text-link" href="#story">
                Watch it unfold <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="art" data-m="art" aria-hidden="true">
            <div className="art-stage">
              <div className="art-glow" />
              <div className="orbit" data-m="orbit" />
              <div className="orbit orbit-2" data-m="orbit" />
              <div className="core" data-m="core">
                ai
              </div>
            </div>
            {floats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div className={`float float-${index + 1}`} data-m="float" key={item.title}>
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
        <a className="scroll-cue" href="#story">
          <span className="scroll-mouse" aria-hidden="true" />
          Scroll to connect the dots
        </a>
      </section>

      <section className="tools" id="tools" aria-label="Compatible tools">
        <p>Works with the tools you use.</p>
        <ul data-m="tools">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="story" id="story" data-m="story" aria-labelledby="story-title">
        <div className="story-pin" data-m="pin">
          <div className="story-top">
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              From first hello to next step.
            </p>
            <p className="story-label">Illustrative workflow</p>
          </div>
          <div className="story-grid">
            <div>
              <p className="chapter-count" data-m="chapter-count">
                {chapters[0].count}
              </p>
              <h2 id="story-title">
                One enquiry.
                <br />
                A whole lot of
                <br />
                <em>forward motion.</em>
              </h2>
              <div className="stage-copy" aria-live="polite">
                {chapters.map((chapter, index) => (
                  <p className={index === 0 ? "is-current" : undefined} data-m="stage" key={chapter.count}>
                    {chapter.copy}
                  </p>
                ))}
              </div>
            </div>
            <div className="network">
              <div className="rail" aria-hidden="true">
                <span data-m="rail" />
              </div>
              <ol>
                {chapters.map((chapter, index) => (
                  <li className={index === 0 ? "node is-lit" : "node"} data-m="node" key={chapter.count}>
                    <div className="node-head">
                      <span>{chapter.title}</span>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <small>{chapter.meta}</small>
                    <Check className="node-check" aria-hidden="true" />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="chapters" role="group" aria-label="Workflow progress">
            {chapters.map((chapter, index) => (
              <p
                className={index === 0 ? "is-current" : undefined}
                data-m="chapter"
                aria-current={index === 0 ? "step" : undefined}
                key={chapter.bar}
              >
                {chapter.bar}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto" data-m="manifesto" aria-labelledby="statement-title">
        <p className="kicker">The point isn&apos;t more technology.</p>
        <h2 id="statement-title">
          <span className="sr-only">It&apos;s less friction. Fewer missed moments. More room to grow.</span>
          <span aria-hidden="true">
            {statementLines.map((line, lineIndex) => (
              <span className="statement-line" key={lineIndex}>
                {line.map((word) => (
                  <span className={"accent" in word && word.accent ? "word is-accent" : "word"} data-m="word" key={word.text}>
                    {word.text}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h2>
      </section>

      <section className="services" id="solutions" aria-labelledby="solutions-title">
        <div className="section-head">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              01 / Make room for better work
            </p>
            <h2 id="solutions-title">
              Start with the friction.
              <br />
              Build the right fix.
            </h2>
          </div>
          <p>A connected system for the moments where time, customers, and opportunities slip away.</p>
        </div>
        <div className="service-grid">
          {solutionGroups.map((group) => {
            const open = openGroup === group.id;
            return (
              <article className={open ? "service-card is-open" : "service-card"} data-m="card" key={group.id}>
                <p className="service-index">{group.index}</p>
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => {
                    setOpenGroup(open ? null : group.id);
                    track("solution_card_clicked", { solution_id: group.id, solution_name: group.title });
                  }}
                >
                  {group.explore} <span aria-hidden="true">{open ? "–" : "↗"}</span>
                </button>
                <div className="service-detail" hidden={!open}>
                  <p>{group.detail}</p>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="method" id="approach" aria-labelledby="approach-title">
        <div className="method-inner">
          <div>
            <p className="kicker">
              <i className="dot" aria-hidden="true" />
              02 / Thought through. Then built.
            </p>
            <h2 id="approach-title">
              Your workflow.
              <br />
              Our obsession.
            </h2>
            <p className="lede">
              We design around the real work: the edge cases, the exceptions, and the people who need to stay in control.
            </p>
          </div>
          <div className="method-steps">
            {approachSteps.map((step) => (
              <article data-m="step" key={step.index}>
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

      <div className="close-wrap">
        <section className="close" data-m="close" aria-labelledby="close-title">
          <p className="kicker kicker-dark">
            <i className="dot dot-dark" aria-hidden="true" />
            A better working day starts somewhere.
          </p>
          <h2 id="close-title">
            What&apos;s the one task
            <br />
            you&apos;d love to <em>let go?</em>
          </h2>
          <Link className="btn-ink" href="/contact" onClick={() => track("cta_consultation_opened", { location: "closing" })}>
            Let&apos;s find out together <span aria-hidden="true">↗</span>
          </Link>
          <p className="close-note">Bring one repetitive workflow and the tools your team uses.</p>
        </section>
      </div>
    </main>
  );
}
