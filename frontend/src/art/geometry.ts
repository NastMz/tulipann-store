/**
 * Pure geometry of the cabinet's plates. Everything is computed from a recipe
 * and a seed, so a plate is reproducible and testable without a DOM.
 *
 * Local petal coordinates: the base of the petal is (0, 0) and it grows
 * towards negative y; `w` is the half width and `h` the height.
 */
import { createRng, type Rng } from "./random";

export type PetalShape = "cup" | "lily" | "parrot" | "double" | "fringed";
export const PETAL_SHAPES: PetalShape[] = ["cup", "lily", "parrot", "double", "fringed"];

type Point = [number, number];

const round = (v: number) => Math.round(v * 10) / 10;

/** Closed Catmull-Rom spline through the points, as an SVG path. */
export function smoothClosedPath(points: Point[]): string {
  const n = points.length;
  const p = (i: number) => points[(i + n) % n];
  let d = `M${round(p(0)[0])},${round(p(0)[1])}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${round(c1[0])},${round(c1[1])} ${round(c2[0])},${round(c2[1])} ${round(p2[0])},${round(p2[1])}`;
  }
  return d + "Z";
}

export function polygonPath(points: Point[]): string {
  return "M" + points.map(([x, y]) => `${round(x)},${round(y)}`).join("L") + "Z";
}

function profile(shape: PetalShape, s: number): number {
  switch (shape) {
    case "lily":
      return Math.pow(Math.sin(Math.PI * s), 0.85) * (1 - 0.45 * s * s);
    case "double":
      return Math.pow(Math.sin(Math.PI * Math.min(s, 0.97)), 0.5);
    default:
      return Math.pow(Math.sin(Math.PI * Math.min(s, 0.96)), 0.6) * (1 - 0.12 * s);
  }
}

/** Outline of one petal. Parrot and fringed petals are torn by the seed. */
export function petalPath(shape: PetalShape, w: number, h: number, rng: Rng): string {
  const steps = shape === "parrot" || shape === "fringed" ? 30 : 14;
  const left: Point[] = [];
  const right: Point[] = [];
  for (let i = 1; i <= steps; i++) {
    const s = i / steps;
    const lift = shape === "lily" ? 1 + 0.16 * Math.pow(s, 4) : 1;
    let half = w * profile(shape, s);
    let y = -h * s * lift;
    if (shape === "parrot" && s > 0.35) {
      half += w * 0.28 * Math.pow(s, 1.4) * (rng.next() - 0.35);
      y += h * 0.05 * (rng.next() - 0.5);
    }
    if (shape === "fringed" && s > 0.72 && i % 2 === 0) half += w * 0.22 * rng.range(0.6, 1.2);
    left.push([-half, y]);
    right.push([half * (shape === "parrot" ? rng.range(0.85, 1.12) : 1), y]);
  }
  const top: Point = [0, -h * (shape === "lily" ? 1.2 : 1.03)];
  const points: Point[] = [[0, 0], ...right, top, ...left.reverse()];
  return shape === "parrot" || shape === "fringed" ? polygonPath(points) : smoothClosedPath(points);
}

export type Petal = {
  key: string;
  d: string;
  /** Translation and rotation of the petal around the base of the head. */
  x: number;
  rotate: number;
  scale: number;
  layer: "back" | "front";
  w: number;
  h: number;
};

type Placement = [x: number, rotate: number, scale: number, layer: "back" | "front"];

const LAYOUTS: Record<PetalShape, Placement[]> = {
  cup: [[0, 0, 1.04, "back"], [-6, -20, 0.95, "back"], [6, 20, 0.95, "back"], [-9, -13, 0.98, "front"], [9, 13, 0.98, "front"], [0, 0, 1, "front"]],
  lily: [[0, 0, 1.05, "back"], [-6, -34, 0.95, "back"], [6, 34, 0.95, "back"], [-8, -22, 0.98, "front"], [8, 22, 0.98, "front"], [0, 0, 1, "front"]],
  parrot: [[0, 0, 1, "back"], [-8, -30, 0.95, "back"], [8, 30, 0.95, "back"], [-10, -16, 1, "front"], [10, 18, 1, "front"], [0, 2, 1, "front"]],
  fringed: [[0, 0, 1.04, "back"], [-6, -24, 0.95, "back"], [6, 24, 0.95, "back"], [-9, -14, 0.98, "front"], [9, 14, 0.98, "front"], [0, 0, 1, "front"]],
  double: [
    [0, 0, 1.08, "back"], [-8, -40, 0.9, "back"], [8, 40, 0.9, "back"], [-6, -24, 0.95, "back"], [6, 24, 0.95, "back"],
    [-12, -32, 0.82, "front"], [12, 32, 0.82, "front"], [-7, -14, 0.88, "front"], [7, 14, 0.88, "front"], [0, 0, 0.9, "front"],
  ],
};

/** The petals of one flower head, back to front. */
export function headPetals(shape: PetalShape, rng: Rng, size = 1): Petal[] {
  const w = (shape === "double" ? 30 : shape === "lily" ? 24 : 27) * size;
  const h = (shape === "double" ? 78 : 104) * size;
  return LAYOUTS[shape].map(([x, rotate, scale, layer], index) => ({
    key: `${layer}${index}`,
    d: petalPath(shape, w, h, rng),
    x: x * size,
    rotate: rotate + rng.range(-2.5, 2.5),
    scale,
    layer,
    w,
    h,
  }));
}

export type Stroke = { d: string; width: number };

/** Feathered flames of a "broken" tulip, in the petal's local coordinates. */
export function flameStrokes(w: number, h: number, rng: Rng): Stroke[] {
  const strokes: Stroke[] = [];
  const count = Math.round(rng.range(5, 8));
  for (let i = 0; i < count; i++) {
    const x0 = rng.range(-0.3, 0.3) * w;
    const bend = rng.range(-0.25, 0.25) * w;
    const top = -h * rng.range(0.72, 1.05);
    strokes.push({
      d: `M${round(x0)},${round(-h * 0.08)}Q${round(x0 * 1.7 + bend)},${round(-h * 0.5)} ${round(x0 * 2.4 + bend)},${round(top)}`,
      width: rng.range(1.6, 4.6),
    });
  }
  for (let i = 0; i < 6; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const y = -h * rng.range(0.45, 0.95);
    const edge = side * w * 0.92;
    strokes.push({
      d: `M${round(edge)},${round(y)}Q${round(edge * 0.6)},${round(y + h * 0.06)} ${round(edge * rng.range(0.15, 0.4))},${round(y + h * rng.range(0.1, 0.2))}`,
      width: rng.range(1.2, 3),
    });
  }
  return strokes;
}

/** Fine veins from the base towards the tip. */
export function veinStrokes(w: number, h: number): string[] {
  return [-0.35, 0, 0.35].map((f) => `M${round(f * w * 0.3)},${round(-h * 0.1)}Q${round(f * w * 0.9)},${round(-h * 0.5)} ${round(f * w * 0.7)},${round(-h * 0.88)}`);
}

/** A long lanceolate leaf rooted at (0,0), leaning to `side` (-1 left, 1 right). */
export function leafPath(side: -1 | 1, length: number, width: number, rng: Rng): { blade: string; vein: string } {
  const lean = side * rng.range(0.35, 0.6) * length;
  const tip: Point = [lean, -length];
  const blade =
    `M0,0C${round(side * width * 1.6)},${round(-length * 0.25)} ${round(lean + side * width)},${round(-length * 0.65)} ${round(tip[0])},${round(tip[1])}` +
    `C${round(lean * 0.55)},${round(-length * 0.6)} ${round(-side * width * 0.4)},${round(-length * 0.3)} 0,0Z`;
  const vein = `M0,0Q${round(lean * 0.35 + side * width * 0.4)},${round(-length * 0.55)} ${round(tip[0])},${round(tip[1])}`;
  return { blade, vein };
}

export function stemPath(from: Point, to: Point, sway: number): string {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return `M${round(x1)},${round(y1)}C${round(x1 + sway)},${round(y1 + (y2 - y1) * 0.35)} ${round(x2 - sway * 0.6)},${round(y1 + (y2 - y1) * 0.75)} ${round(x2)},${round(y2)}`;
}

/** A tunicate bulb sitting at (0,0) with its roots hanging below. */
export function bulbShape(rng: Rng): { body: string; tunic: string[]; roots: string[] } {
  const body = "M-30,0C-38,-28 -12,-52 0,-66C12,-52 38,-28 30,0C20,13 -20,13 -30,0Z";
  const tunic = [-18, -6, 6, 18].map((x) => `M${x},6Q${x * 1.25},-30 ${round(x * 0.2)},-62`);
  const roots: string[] = [];
  for (let i = 0; i < 9; i++) {
    const x = -20 + i * 5 + rng.range(-2, 2);
    const len = rng.range(22, 44);
    roots.push(`M${round(x)},8q${round(rng.range(-8, 8))},${round(len / 2)} ${round(rng.range(-10, 10))},${round(len)}`);
  }
  return { body, tunic, roots };
}

export type BouquetStem = { head: Point; angle: number; size: number; stem: string };

/** Fans `count` stems out of the tie point. */
export function bouquetLayout(count: number, rng: Rng, tie: Point = [150, 300]): BouquetStem[] {
  const stems: BouquetStem[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = -38 + 76 * t + rng.range(-4, 4);
    const length = 175 - Math.abs(angle) * 0.9 + rng.range(-14, 14) - (i % 2) * 22;
    const rad = (angle * Math.PI) / 180;
    const head: Point = [tie[0] + Math.sin(rad) * length, tie[1] - Math.cos(rad) * length];
    stems.push({ head, angle: angle * 0.6, size: rng.range(0.42, 0.5), stem: stemPath(tie, head, rng.range(-10, 10)) });
  }
  // Draw the tallest (furthest back) first.
  return stems.sort((a, b) => a.head[1] - b.head[1]);
}

export type Spout = { x: number; y: number; angle: number };
export type Tier = { cx: number; top: number; bottom: number; width: number; body: string; spouts: Spout[] };

/** A tiered tulip vase ("tulipanera"); one tier draws a fan-shaped vase. */
export function vaseLayout(tiers: number): Tier[] {
  if (tiers <= 1) {
    const spouts: Spout[] = [];
    for (let i = 0; i < 7; i++) {
      const a = (-63 + i * 21) * (Math.PI / 180);
      spouts.push({ x: 150 + Math.sin(a) * 82, y: 302 - Math.cos(a) * 92, angle: (a * 180) / Math.PI });
    }
    const body = "M150,352C96,352 66,338 64,306C60,252 98,208 150,206C202,208 240,252 236,306C234,338 204,352 150,352Z";
    return [{ cx: 150, top: 206, bottom: 352, width: 172, body, spouts }];
  }
  const result: Tier[] = [];
  let bottom = 352;
  let width = 150;
  const height = Math.min(70, 210 / tiers);
  for (let i = 0; i < tiers; i++) {
    const top = bottom - height;
    const half = width / 2;
    const body =
      `M${150 - half * 0.62},${bottom}C${150 - half * 1.08},${bottom - height * 0.25} ${150 - half * 1.02},${top + height * 0.2} ${150 - half * 0.5},${top}` +
      `L${150 + half * 0.5},${top}C${150 + half * 1.02},${top + height * 0.2} ${150 + half * 1.08},${bottom - height * 0.25} ${150 + half * 0.62},${bottom}Z`;
    const spouts: Spout[] = [
      { x: 150 - half * 0.86, y: top + height * 0.28, angle: -38 },
      { x: 150 + half * 0.86, y: top + height * 0.28, angle: 38 },
    ];
    if (i === tiers - 1) spouts.push({ x: 150, y: top + 2, angle: 0 });
    result.push({ cx: 150, top, bottom, width, body, spouts });
    bottom = top + 4;
    width *= 0.78;
  }
  return result;
}

export function seededRng(seed: number | undefined, salt = 0): Rng {
  return createRng((seed ?? 1) * 7919 + salt);
}
