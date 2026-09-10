import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import {
  cartSubtotal,
  FREE_SHIP_FROM,
  PIX_OFF,
  SHIPPING_FLAT,
  useCart,
} from "@/lib/cart";
import { getProduct } from "@/lib/catalog";
import { useHydrated } from "@/lib/hydrated";
import { formatBRL } from "@/lib/utils";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const rawLines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const hydrated = useHydrated();
  const lines = hydrated ? rawLines : [];
  const subtotal = cartSubtotal(lines);
  const ship = subtotal === 0 ? 0 : subtotal >= FREE_SHIP_FROM ? 0 : SHIPPING_FLAT;
  const pix = subtotal * (1 - PIX_OFF);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-fg/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-label="Fechar carrinho"
      />
      <aside
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-surface shadow-[var(--shadow-border)] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Carrinho"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl font-semibold">Carrinho</h2>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-10 text-sm text-muted">
              Carrinho vazio. Os 4 que resolvem o apê estão na loja.
            </p>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => {
                const p = getProduct(line.handle);
                if (!p) return null;
                return (
                  <li key={line.handle} className="flex gap-3">
                    <img src={p.image} alt="" className="size-20 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm tabular-nums">{formatBRL(p.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center rounded-sm border border-border"
                          onClick={() => setQty(line.handle, line.qty - 1)}
                          aria-label="Diminuir"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center rounded-sm border border-border"
                          onClick={() => setQty(line.handle, line.qty + 1)}
                          aria-label="Aumentar"
                        >
                          <Plus className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="ml-auto text-xs text-muted underline"
                          onClick={() => remove(line.handle)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border px-5 py-5">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="tabular-nums">{formatBRL(subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-muted">Frete</span>
            <span className="tabular-nums">
              {subtotal === 0 ? "—" : ship === 0 ? "Grátis" : formatBRL(ship)}
            </span>
          </div>
          {subtotal > 0 && subtotal < FREE_SHIP_FROM ? (
            <p className="mt-2 text-xs text-muted">
              Falta {formatBRL(FREE_SHIP_FROM - subtotal)} pro frete grátis.
            </p>
          ) : null}
          <p className="mt-3 text-sm font-medium">
            Pix com 5% off: <span className="tabular-nums">{formatBRL(pix)}</span>
          </p>
          <Link
            to="/collections/$slug"
            params={{ slug: "pets" }}
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-12 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.96]"
          >
            {lines.length ? "Fechar no Pix (5% off)" : "Ver os 4 mais vendidos"}
          </Link>
          <p className="mt-3 text-center text-[11px] text-muted">
            Cupom VOLTA10 na primeira compra. Garantia de 7 dias.
          </p>
        </div>
      </aside>
    </div>
  );
}
