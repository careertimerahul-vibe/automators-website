/** Scroll-progress math for the homepage. Scroll position is the only input. */

export function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function easeOutCubic(value: number) {
  const t = clamp(value);
  return 1 - (1 - t) ** 3;
}

/** 0 when the hero's top meets the viewport top, 1 after it has traveled its own height. */
export function heroProgress(scrollY: number, heroTop: number, heroHeight: number) {
  return clamp((scrollY - heroTop) / Math.max(1, heroHeight));
}

/**
 * 0 when the pinned panel sticks under the nav, 1 when the extra travel is spent.
 * `travel` is the story section height minus the pinned panel height.
 */
export function pinProgress(
  scrollY: number,
  storyTop: number,
  navHeight: number,
  travel: number,
) {
  return clamp((scrollY - storyTop + navHeight) / Math.max(1, travel));
}

/** Progress while the story is in normal flow (no pin), still reversible. */
export function flowProgress(
  scrollY: number,
  storyTop: number,
  storyHeight: number,
  viewHeight: number,
) {
  const start = storyTop - viewHeight * 0.72;
  const end = storyTop + storyHeight - viewHeight * 0.38;
  return clamp((scrollY - start) / Math.max(1, end - start));
}

export function chapterIndex(progress: number) {
  return Math.min(3, Math.floor(clamp(progress) * 4));
}

export function chapterFill(progress: number, index: number) {
  return clamp(clamp(progress) * 4 - index);
}

/** First node is present immediately. Later nodes ease in across the story. */
export function nodeReveal(progress: number, index: number) {
  if (index <= 0) return 1;
  return easeOutCubic((clamp(progress) - (0.25 * index - 0.12)) / 0.18);
}

export function nodeLit(progress: number, index: number) {
  return clamp(progress) + 1e-6 >= 0.25 * index;
}

export function wordStrength(progress: number, index: number) {
  return easeOutCubic((clamp(progress) - 0.055 * index) * 3.2);
}

/** Ease an element in once scroll approaches its document top. */
export function reveal(scrollY: number, viewHeight: number, targetTop: number, distance: number) {
  return easeOutCubic((scrollY + 0.92 * viewHeight - targetTop) / Math.max(1, distance));
}
