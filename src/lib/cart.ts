import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "./catalog";

export type CartLine = {
  handle: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  searchOpen: boolean;
  setOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  add: (handle: string, qty?: number) => void;
  setQty: (handle: string, qty: number) => void;
  remove: (handle: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      searchOpen: false,
      setOpen: (open) => set({ open }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      add: (handle, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.handle === handle);
        if (i >= 0) lines[i] = { handle, qty: lines[i].qty + qty };
        else lines.push({ handle, qty });
        set({ lines, open: true });
      },
      setQty: (handle, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.handle !== handle) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.handle === handle ? { ...l, qty } : l)),
        });
      },
      remove: (handle) =>
        set({ lines: get().lines.filter((l) => l.handle !== handle) }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "auconforto-cart",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((n, l) => {
    const p = getProduct(l.handle);
    return n + (p ? p.price * l.qty : 0);
  }, 0);
}

export const FREE_SHIP_FROM = 149;
export const SHIPPING_FLAT = 9.9;
export const PIX_OFF = 0.05;
