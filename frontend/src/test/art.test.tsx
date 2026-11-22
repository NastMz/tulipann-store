import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { headPetals, PETAL_SHAPES, petalPath, vaseLayout } from "../art/geometry";
import { normaliseArt, PlateArt } from "../art/Plate";
import { createRng } from "../art/random";
import { cop, roman } from "../lib/format";

describe("plate geometry", () => {
  it("draws the same plate for the same seed", () => {
    const a = headPetals("parrot", createRng(42)).map((p) => p.d);
    const b = headPetals("parrot", createRng(42)).map((p) => p.d);
    const c = headPetals("parrot", createRng(43)).map((p) => p.d);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  it("gives double tulips more petals than cups", () => {
    expect(headPetals("double", createRng(1))).toHaveLength(10);
    expect(headPetals("cup", createRng(1))).toHaveLength(6);
  });

  it.each(PETAL_SHAPES)("produces a closed, finite outline for %s petals", (shape) => {
    const d = petalPath(shape, 27, 104, createRng(7));
    expect(d.startsWith("M")).toBe(true);
    expect(d.endsWith("Z")).toBe(true);
    expect(d).not.toMatch(/NaN|Infinity/);
  });

  it("stacks tiers upwards and gives the top tier a crown spout", () => {
    const tiers = vaseLayout(3);
    expect(tiers).toHaveLength(3);
    expect(tiers[1].bottom).toBeLessThan(tiers[0].bottom);
    expect(tiers[2].spouts).toHaveLength(3);
    expect(vaseLayout(1)[0].spouts).toHaveLength(7);
  });
});

describe("recipes", () => {
  it("falls back to safe defaults for malformed recipes", () => {
    const art = normaliseArt({ petal: "red", shape: "star" as never, tiers: 99, flame: "url(evil)" });
    expect(art.petal).toBe("#c8283c");
    expect(art.shape).toBe("cup");
    expect(art.tiers).toBe(3);
    expect(art.flame).toBeNull();
  });

  it.each(["specimen", "bouquet", "vase", "print", "unknown"])("renders a %s plate as an accessible image", (kind) => {
    const { getByRole } = render(<PlateArt kind={kind} art={{ petal: "#f29a6b", flame: "#a3162c" }} title="Aurora" />);
    const svg = getByRole("img", { name: "Aurora" });
    expect(svg.querySelectorAll("path").length).toBeGreaterThan(10);
  });

  it("gives each plate its own definition ids", () => {
    const { container } = render(
      <>
        <PlateArt kind="specimen" art={{ petal: "#ffffff" }} />
        <PlateArt kind="specimen" art={{ petal: "#000000" }} />
      </>,
    );
    const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("formatting", () => {
  it("numbers plates in roman numerals", () => {
    expect([1, 4, 9, 14, 2026].map(roman)).toEqual(["I", "IV", "IX", "XIV", "MMXXVI"]);
  });

  it("formats Colombian pesos", () => {
    expect(cop(484000)).toBe("$ 484.000");
    expect(cop(null)).toBe("—");
  });
});
