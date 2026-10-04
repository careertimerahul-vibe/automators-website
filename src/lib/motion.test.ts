import assert from "node:assert/strict";
import { test } from "node:test";
import {
  chapterFill,
  chapterIndex,
  clamp,
  flowProgress,
  heroProgress,
  nodeLit,
  nodeReveal,
  pinProgress,
  wordStrength,
} from "./motion.ts";

test("clamp keeps scroll math inside 0 to 1", () => {
  assert.equal(clamp(-0.4), 0);
  assert.equal(clamp(0.4), 0.4);
  assert.equal(clamp(2), 1);
});

test("hero progress follows how far the hero has left", () => {
  assert.equal(heroProgress(0, 80, 600), 0);
  assert.equal(heroProgress(80, 80, 600), 0);
  assert.ok(Math.abs(heroProgress(380, 80, 600) - 0.5) < 0.001);
  assert.equal(heroProgress(2000, 80, 600), 1);
});

test("pinned story progress is zero at the sticky point and one at release", () => {
  const storyTop = 900;
  const nav = 74;
  const travel = 1400;
  assert.equal(pinProgress(storyTop - nav, storyTop, nav, travel), 0);
  assert.ok(Math.abs(pinProgress(storyTop - nav + 700, storyTop, nav, travel) - 0.5) < 0.001);
  assert.equal(pinProgress(storyTop - nav + travel, storyTop, nav, travel), 1);
  assert.equal(pinProgress(storyTop - nav - 200, storyTop, nav, travel), 0);
});

test("chapters divide the story into quarters and the last chapter holds through the end", () => {
  assert.equal(chapterIndex(0), 0);
  assert.equal(chapterIndex(0.249), 0);
  assert.equal(chapterIndex(0.25), 1);
  assert.equal(chapterIndex(0.5), 2);
  assert.equal(chapterIndex(0.75), 3);
  assert.equal(chapterIndex(1), 3);
});

test("chapter fill grows inside its quarter and stays full afterwards", () => {
  assert.equal(chapterFill(0, 0), 0);
  assert.ok(Math.abs(chapterFill(0.125, 0) - 0.5) < 0.001);
  assert.equal(chapterFill(0.25, 0), 1);
  assert.equal(chapterFill(1, 0), 1);
  assert.equal(chapterFill(0.25, 1), 0);
});

test("the first story node is present before later nodes reveal", () => {
  assert.equal(nodeReveal(0, 0), 1);
  assert.ok(nodeReveal(0, 1) < nodeReveal(0.4, 1));
  assert.equal(nodeLit(0, 0), true);
  assert.equal(nodeLit(0, 1), false);
  assert.equal(nodeLit(0.25, 1), true);
});

test("statement words strengthen in order and scrolling back lowers them", () => {
  assert.ok(wordStrength(0.2, 0) > wordStrength(0.2, 4));
  assert.ok(wordStrength(0.1, 2) < wordStrength(0.8, 2));
});

test("flow progress is reversible around the story", () => {
  assert.equal(flowProgress(0, 2000, 1800, 800), 0);
  const mid = flowProgress(2000, 2000, 1800, 800);
  assert.ok(mid > 0 && mid < 1);
  assert.equal(flowProgress(10000, 2000, 1800, 800), 1);
});
