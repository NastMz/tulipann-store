/** 48000 -> "$ 48.000" */
export function cop(value: number | null | undefined): string {
  if (value == null) return "—";
  return "$ " + Math.round(value).toLocaleString("es-CO").replace(/,/g, ".");
}

const NUMERALS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

/** 14 -> "XIV". Plates and the season are numbered the old way. */
export function roman(value: number): string {
  if (!Number.isInteger(value) || value <= 0) return String(value);
  let rest = value;
  let out = "";
  for (const [n, s] of NUMERALS) {
    while (rest >= n) {
      out += s;
      rest -= n;
    }
  }
  return out;
}

export function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
}

export function stockNote(stock: number): string | null {
  if (stock <= 0) return "Agotada";
  if (stock <= 5) return `Últimas ${stock}`;
  return null;
}
