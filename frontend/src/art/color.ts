/** Small colour helpers for the plate generator (hex #rrggbb only). */

type Rgb = [number, number, number];

const HEX = /^#([0-9a-f]{6})$/i;

export function isHex(value: unknown): value is string {
  return typeof value === "string" && HEX.test(value);
}

function toRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: Rgb): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return "#" + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("");
}

/** Linear mix: t = 0 gives `a`, t = 1 gives `b`. */
export function mix(a: string, b: string, t: number): string {
  const x = toRgb(a);
  const y = toRgb(b);
  return toHex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t) as Rgb);
}

export const darken = (hex: string, amount: number) => mix(hex, "#1a0f08", amount);
export const lighten = (hex: string, amount: number) => mix(hex, "#fffaf0", amount);

/** Perceived luminance in 0..1, used to pick an ink that reads on the colour. */
export function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
