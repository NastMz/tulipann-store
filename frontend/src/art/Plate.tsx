/**
 * Renders a product's plate from its recipe. Four families share one engraved
 * look (ink outlines, cross-hatching, flat watercolour washes):
 *   specimen — a bulb with its flower, drawn as a botanical plate
 *   bouquet  — a fan of cut tulips in a paper cone
 *   vase     — a tiered tulip vase painted in glaze, with flowers in its spouts
 *   print    — a framed engraving of a specimen
 */
import { useId, type ReactNode } from "react";
import { darken, isHex, lighten, mix } from "./color";
import {
  bouquetLayout,
  bulbShape,
  flameStrokes,
  headPetals,
  leafPath,
  PETAL_SHAPES,
  seededRng,
  stemPath,
  vaseLayout,
  veinStrokes,
  type PetalShape,
} from "./geometry";

export type PlateKind = "specimen" | "bouquet" | "vase" | "print";

export type ArtRecipe = {
  petal: string;
  flame?: string | null;
  leaf?: string;
  shape?: PetalShape;
  seed?: number;
  glaze?: string;
  tiers?: number;
  stems?: number;
  frame?: string;
  paper?: string;
};

export const INK = "#2b1d13";

/** Fills in defaults and drops anything malformed, so a bad recipe still draws. */
export function normaliseArt(raw: Partial<ArtRecipe> | null | undefined): Required<Omit<ArtRecipe, "flame">> & { flame: string | null } {
  const art = raw ?? {};
  const pick = (value: unknown, fallback: string) => (isHex(value) ? value : fallback);
  const int = (value: unknown, low: number, high: number, fallback: number) =>
    typeof value === "number" && Number.isInteger(value) && value >= low && value <= high ? value : fallback;
  return {
    petal: pick(art.petal, "#c8283c"),
    flame: isHex(art.flame) ? art.flame : null,
    leaf: pick(art.leaf, "#5b7348"),
    shape: PETAL_SHAPES.includes(art.shape as PetalShape) ? (art.shape as PetalShape) : "cup",
    seed: int(art.seed, 0, 2 ** 31 - 1, 1),
    glaze: pick(art.glaze, "#1f3f7a"),
    tiers: int(art.tiers, 1, 4, 3),
    stems: int(art.stems, 3, 9, 5),
    frame: pick(art.frame, "#7a5a34"),
    paper: pick(art.paper, "#cfae7f"),
  };
}

type Art = ReturnType<typeof normaliseArt>;
type Ctx = { id: string; art: Art };

function Defs({ id, art }: Ctx) {
  return (
    <defs>
      <linearGradient id={`${id}-front`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={darken(art.petal, 0.32)} />
        <stop offset="0.55" stopColor={art.petal} />
        <stop offset="1" stopColor={lighten(art.petal, 0.22)} />
      </linearGradient>
      <linearGradient id={`${id}-back`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={darken(art.petal, 0.48)} />
        <stop offset="1" stopColor={darken(art.petal, 0.12)} />
      </linearGradient>
      <linearGradient id={`${id}-leaf`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor={darken(art.leaf, 0.25)} />
        <stop offset="1" stopColor={lighten(art.leaf, 0.18)} />
      </linearGradient>
      <pattern id={`${id}-hatch`} width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
        <line x1="0" y1="0" x2="0" y2="3.2" stroke={INK} strokeWidth="0.55" />
      </pattern>
      <pattern id={`${id}-cross`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
        <path d="M0,0V4M0,0H4" stroke={INK} strokeWidth="0.5" fill="none" />
      </pattern>
    </defs>
  );
}

type FlowerProps = Ctx & { x: number; y: number; size: number; rotate?: number; salt: number };

function Flower({ id, art, x, y, size, rotate = 0, salt }: FlowerProps) {
  const rng = seededRng(art.seed, salt);
  const petals = headPetals(art.shape, rng, size);
  const flameRng = seededRng(art.seed, salt + 97);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {petals.map((petal) => {
        const clip = `${id}-clip-${salt}-${petal.key}`;
        const showFlame = art.flame && (petal.layer === "front" || art.shape === "parrot");
        return (
          <g key={petal.key} transform={`translate(${petal.x} 0) rotate(${petal.rotate}) scale(${petal.scale})`}>
            <clipPath id={clip}>
              <path d={petal.d} />
            </clipPath>
            <path d={petal.d} fill={`url(#${id}-${petal.layer})`} />
            {showFlame && (
              <g clipPath={`url(#${clip})`} stroke={art.flame!} strokeLinecap="round" fill="none" opacity="0.92">
                {flameStrokes(petal.w, petal.h, flameRng).map((stroke, index) => (
                  <path key={index} d={stroke.d} strokeWidth={stroke.width * size * 1.6} />
                ))}
              </g>
            )}
            <g clipPath={`url(#${clip})`}>
              <rect x={-petal.w * 2} y={-petal.h * 0.55} width={petal.w * 4} height={petal.h * 0.6} fill={`url(#${id}-hatch)`} opacity={petal.layer === "back" ? 0.5 : 0.28} />
            </g>
            {petal.layer === "front" &&
              veinStrokes(petal.w, petal.h).map((d) => (
                <path key={d} d={d} stroke={darken(art.petal, 0.4)} strokeWidth={0.6} fill="none" opacity="0.5" />
              ))}
            <path d={petal.d} fill="none" stroke={INK} strokeWidth={1.1 / petal.scale} strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
}

function Leaf({ id, art, x, y, side, length, width, salt }: Ctx & { x: number; y: number; side: -1 | 1; length: number; width: number; salt: number }) {
  const { blade, vein } = leafPath(side, length, width, seededRng(art.seed, salt));
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={blade} fill={`url(#${id}-leaf)`} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d={vein} fill="none" stroke={darken(art.leaf, 0.45)} strokeWidth="0.8" />
    </g>
  );
}

function Stem({ d, art, width = 4.5 }: { d: string; art: Art; width?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={INK} strokeWidth={width + 2} />
      <path d={d} stroke={art.leaf} strokeWidth={width} />
    </g>
  );
}

function SpecimenScene(ctx: Ctx) {
  const { id, art } = ctx;
  const rng = seededRng(art.seed, 5);
  const headX = 150 + rng.range(-14, 14);
  const bulb = bulbShape(seededRng(art.seed, 9));
  const tunic = mix(art.leaf, "#b48a5c", 0.75);
  return (
    <g>
      <rect x="18" y="322" width="264" height="86" fill={`url(#${id}-cross)`} opacity="0.16" />
      <path d="M18,322 C70,316 110,326 150,320 C196,314 236,326 282,320" fill="none" stroke={INK} strokeWidth="1.2" />
      <g transform="translate(150 380)">
        {bulb.roots.map((d) => (
          <path key={d} d={d} fill="none" stroke={INK} strokeWidth="0.9" />
        ))}
        <path d={bulb.body} fill={tunic} stroke={INK} strokeWidth="1.2" />
        {bulb.tunic.map((d) => (
          <path key={d} d={d} fill="none" stroke={darken(tunic, 0.4)} strokeWidth="0.8" />
        ))}
      </g>
      <Stem d={stemPath([150, 316], [headX, 176], rng.range(-18, 18))} art={art} />
      <Leaf {...ctx} x={147} y={322} side={-1} length={168} width={22} salt={11} />
      <Leaf {...ctx} x={153} y={322} side={1} length={132} width={19} salt={12} />
      <Flower {...ctx} x={headX} y={182} size={1} salt={1} />
    </g>
  );
}


function BouquetPlate(ctx: Ctx) {
  const { art } = ctx;
  const stems = bouquetLayout(art.stems, seededRng(art.seed, 3));
  const paper = art.paper;
  return (
    <g>
      <ellipse cx="150" cy="404" rx="70" ry="7" fill={INK} opacity="0.12" />
      {stems.map((stem, index) => (
        <Stem key={`s${index}`} d={stem.stem} art={art} width={3.2} />
      ))}
      <Leaf {...ctx} x={142} y={292} side={-1} length={120} width={14} salt={21} />
      <Leaf {...ctx} x={158} y={292} side={1} length={110} width={13} salt={22} />
      {stems.map((stem, index) => (
        <Flower key={`f${index}`} {...ctx} x={stem.head[0]} y={stem.head[1] + 8} size={stem.size} rotate={stem.angle} salt={30 + index} />
      ))}
      <path d="M88,242 L212,242 L166,400 L134,400 Z" fill={paper} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M88,242 L150,262 L212,242 L196,236 L150,250 L104,236 Z" fill={lighten(paper, 0.25)} stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <path d="M118,262 L144,396 M182,262 L157,396 M150,262 L150,398" stroke={darken(paper, 0.3)} strokeWidth="0.7" fill="none" />
      <rect x="88" y="242" width="124" height="160" fill={`url(#${ctx.id}-hatch)`} opacity="0.12" />
      <g stroke={INK} strokeWidth="1.4" fill="none">
        <path d="M128,312 Q150,320 172,312" />
        <path d="M150,316 q-16,-14 -22,4 q10,4 22,-4 q16,-14 22,4 q-10,4 -22,-4" fill={darken(paper, 0.35)} />
        <path d="M150,318 l-8,24 M150,318 l9,22" />
      </g>
    </g>
  );
}

function VasePlate(ctx: Ctx) {
  const { id, art } = ctx;
  const tiers = vaseLayout(art.tiers);
  const body = "#f3ede0";
  const glaze = art.glaze;
  const motifRng = seededRng(art.seed, 41);
  const spouts = tiers.flatMap((tier) => tier.spouts);
  return (
    <g>
      <ellipse cx="150" cy="396" rx="96" ry="9" fill={INK} opacity="0.14" />
      {spouts.map((spout, index) => {
        const rad = (spout.angle * Math.PI) / 180;
        const fx = spout.x + Math.sin(rad) * 44;
        const fy = spout.y - Math.cos(rad) * 44;
        return (
          <g key={`f${index}`}>
            <Stem d={stemPath([spout.x, spout.y], [fx, fy], 4)} art={art} width={2.6} />
            <Flower {...ctx} x={fx} y={fy + 4} size={0.34} rotate={spout.angle * 0.8} salt={60 + index} />
          </g>
        );
      })}
      <path d="M104,352 L196,352 L208,384 C180,392 120,392 92,384 Z" fill={body} stroke={INK} strokeWidth="1.2" />
      <path d="M100,376 C130,382 170,382 200,376" fill="none" stroke={glaze} strokeWidth="3" />
      {tiers.map((tier, index) => (
        <g key={`t${index}`}>
          <path d={tier.body} fill={body} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
          <path d={tier.body} fill={`url(#${id}-hatch)`} opacity="0.12" />
          <path d={`M${tier.cx - tier.width * 0.28},${tier.top + 5} H${tier.cx + tier.width * 0.28}`} stroke={glaze} strokeWidth="2.4" />
          <path d={`M${tier.cx - tier.width * 0.33},${tier.bottom - 6} H${tier.cx + tier.width * 0.33}`} stroke={glaze} strokeWidth="1.6" />
          <Motif cx={tier.cx} cy={(tier.top + tier.bottom) / 2 + 6} size={Math.min(1, (tier.bottom - tier.top) / 70)} glaze={glaze} twist={motifRng.range(-6, 6)} />
          {tier.spouts.map((spout, spoutIndex) => (
            <g key={`s${spoutIndex}`} transform={`translate(${spout.x} ${spout.y}) rotate(${spout.angle})`}>
              <path d="M-8,10 L-7,-12 C-7,-15 7,-15 7,-12 L8,10 Z" fill={body} stroke={INK} strokeWidth="1.1" />
              <ellipse cx="0" cy="-12" rx="7" ry="2.6" fill={darken(body, 0.25)} stroke={INK} strokeWidth="1" />
              <path d="M-7.5,-6 H7.5" stroke={glaze} strokeWidth="1.8" />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/** A small painted tulip and two scrolling leaves, as on glazed earthenware. */
function Motif({ cx, cy, size, glaze, twist }: { cx: number; cy: number; size: number; glaze: string; twist: number }) {
  const s = Math.max(0.45, size);
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s}) rotate(${twist})`} fill="none" stroke={glaze} strokeLinecap="round">
      <path d="M0,18 C-2,6 0,-2 0,-8" strokeWidth="2" />
      <path d="M0,-8 C-9,-10 -10,-24 -5,-30 C-2,-24 0,-22 0,-22 C0,-22 2,-24 5,-30 C10,-24 9,-10 0,-8 Z" fill={glaze} opacity="0.9" />
      <path d="M0,10 C-10,6 -20,10 -24,2 C-16,0 -8,2 0,10 M0,12 C10,8 20,12 24,4 C16,2 8,4 0,12" fill={mix(glaze, "#ffffff", 0.35)} strokeWidth="1.2" />
      <circle cx="-30" cy="-8" r="1.8" fill={glaze} stroke="none" />
      <circle cx="30" cy="-8" r="1.8" fill={glaze} stroke="none" />
    </g>
  );
}

function PrintPlate(ctx: Ctx) {
  const frame = ctx.art.frame;
  return (
    <g>
      <rect x="6" y="6" width="288" height="408" fill={frame} stroke={INK} strokeWidth="1.4" />
      <rect x="6" y="6" width="288" height="408" fill={`url(#${ctx.id}-hatch)`} opacity="0.25" />
      <path d="M6,6 L30,30 M294,6 L270,30 M6,414 L30,390 M294,414 L270,390" stroke={darken(frame, 0.4)} strokeWidth="1" />
      <rect x="30" y="30" width="240" height="360" fill="#f2e8d2" stroke={INK} strokeWidth="1" />
      <rect x="48" y="48" width="204" height="292" fill="none" stroke={INK} strokeWidth="0.6" />
      <g transform="translate(57 46) scale(0.62)">
        <SpecimenScene {...ctx} />
      </g>
      <path d="M100,360 H200 M118,370 H182" stroke={INK} strokeWidth="0.8" />
    </g>
  );
}

const SCENES: Record<PlateKind, (ctx: Ctx) => ReactNode> = {
  specimen: SpecimenScene,
  bouquet: BouquetPlate,
  vase: VasePlate,
  print: PrintPlate,
};

type PlateProps = { kind: PlateKind | string; art: Partial<ArtRecipe> | null | undefined; title?: string; className?: string };

export function PlateArt({ kind, art, title, className }: PlateProps) {
  const id = "p" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ctx = { id, art: normaliseArt(art) };
  const Scene = SCENES[(kind as PlateKind) in SCENES ? (kind as PlateKind) : "specimen"];
  return (
    <svg viewBox="0 0 300 420" className={className} role="img" aria-label={title ?? "Lámina"} data-kind={kind}>
      {title && <title>{title}</title>}
      <Defs {...ctx} />
      <Scene {...ctx} />
    </svg>
  );
}
