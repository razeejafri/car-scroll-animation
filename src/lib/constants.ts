// ─── Design Tokens & Color Palette ─────────────────────────────────────────────
export const COLORS = {
  stage: "#dedfe3", // Crisp, warm neutral studio background
  road: "#1c1c1f",  // Deep charcoal asphalt track
  green: "#45db7d", // Vibrant electric lime reveal trail
  ink: "#09090b",   // Razor-sharp dark ink
} as const;

// ─── Scroll & Animation Parameters ───────────────────────────────────────────
/** Total scroll distance while the hero is pinned (300% of viewport height). */
export const SCROLL_LENGTH = "+=300%";

/**
 * The green reveal edge sits this fraction of car width inside the car's left edge,
 * keeping the reveal line locked directly behind the rear wheels.
 */
export const CAR_EDGE_RATIO = 0.16;

/**
 * Scroll-progress range [0 – 1] over which each individual stat card floats in.
 * Spaced to ensure distinct, sequential one-by-one reveals.
 */
export const CARD_REVEAL_SPAN = 0.10;

// ─── Stat Cards ───────────────────────────────────────────────────────────────
export type Stat = {
  /** Unique key used as React list key and DOM id. */
  id: string;
  /** Primary numeric display value. */
  value: string;
  /** Descriptive metric label. */
  label: string;
  /** Background color. */
  bg: string;
  /** Foreground/text color. */
  fg: string;
  /**
   * Horizontal position (% of screen width).
   * Spaced across the screen in chronological drive order:
   * 1 (Top: 34%) → 2 (Bottom: 51%) → 3 (Top: 68%) → 4 (Bottom: 85%)
   */
  xRatio: number;
  /** Road placement (above or below the asphalt strip). */
  side: "top" | "bottom";
};

export const STATS: Stat[] = [
  {
    id: "s1",
    value: "58%",
    label: "Increase in pick up point use",
    bg: "#def54f", // Electric Lime Chartreuse
    fg: "#111111",
    xRatio: 0.34,
    side: "top",
  },
  {
    id: "s2",
    value: "23%",
    label: "Decreased in customer phone calls",
    bg: "#6ac9ff", // Crisp Sky Blue
    fg: "#111111",
    xRatio: 0.51,
    side: "bottom",
  },
  {
    id: "s3",
    value: "27%",
    label: "Increase in pick up point use",
    bg: "#2b2b2e", // Deep Obsidian Charcoal
    fg: "#ffffff",
    xRatio: 0.68,
    side: "top",
  },
  {
    id: "s4",
    value: "40%",
    label: "Decreased in customer phone calls",
    bg: "#fa7328", // Vibrant Tangerine
    fg: "#111111",
    xRatio: 0.85,
    side: "bottom",
  },
];

// ─── Headline Text ────────────────────────────────────────────────────────────
export const HEADLINE = "WELCOME ITZFIZZ";
