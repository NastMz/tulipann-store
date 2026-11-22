/**
 * The "encargo" (cart) lives in the browser: it is not secret, and the server
 * re-prices every line (`/api/cart/quote`) before anything is ordered.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ArtRecipe, PlateKind } from "../art/Plate";

export type CartLine = {
  id: number;
  slug: string;
  name: string;
  plate: number;
  price: number;
  kind: PlateKind;
  art: ArtRecipe;
  quantity: number;
};

export const MAX_PER_LINE = 20;
const STORAGE_KEY = "tulipann.encargo";

function load(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((line) => Number.isInteger(line?.id) && line.quantity > 0) : [];
  } catch {
    return [];
  }
}

type CartState = {
  lines: CartLine[];
  count: number;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable (private mode): the cart still works for this visit */
    }
  }, [lines]);

  const add = useCallback<CartState["add"]>((line, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((item) => item.id === line.id);
      if (existing) {
        return current.map((item) =>
          item.id === line.id ? { ...item, ...line, quantity: Math.min(MAX_PER_LINE, item.quantity + quantity) } : item,
        );
      }
      return [...current, { ...line, quantity: Math.min(MAX_PER_LINE, quantity) }];
    });
  }, []);

  const setQuantity = useCallback((id: number, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity: Math.min(MAX_PER_LINE, quantity) } : item)),
    );
  }, []);

  const remove = useCallback((id: number) => setLines((current) => current.filter((item) => item.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, count: lines.reduce((sum, line) => sum + line.quantity, 0), add, setQuantity, remove, clear }),
    [lines, add, setQuantity, remove, clear],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside <CartProvider>");
  return value;
}
