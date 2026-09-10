import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { PRODUCTS } from "@/lib/catalog";
import { formatBRL } from "@/lib/utils";

export function SearchDialog() {
  const open = useCart((s) => s.searchOpen);
  const setOpen = useCart((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.short.toLowerCase().includes(s) ||
        p.pain.toLowerCase().includes(s),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-fg/40"
        aria-label="Fechar busca"
        onClick={() => setOpen(false)}
      />
      <div className="relative mx-auto mt-16 w-[min(640px,calc(100%-2rem))] rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6">
        <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3">
          <Search className="size-4 text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar produto, dor, pet…"
            className="h-12 w-full bg-transparent text-base outline-none"
          />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>
        <ul className="mt-3 max-h-[50vh] overflow-y-auto">
          {results.map((p) => (
            <li key={p.handle}>
              <Link
                to="/products/$handle"
                params={{ handle: p.handle }}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center gap-3 rounded-md px-2 py-2 hover:bg-bg"
              >
                <img src={p.image} alt="" className="size-12 rounded-sm object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{p.title}</p>
                  <p className="truncate text-sm text-muted">{p.short}</p>
                </div>
                <span className="text-sm tabular-nums">{formatBRL(p.price)}</span>
              </Link>
            </li>
          ))}
          {results.length === 0 ? (
            <li className="px-2 py-8 text-sm text-muted">Nada com esse termo.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
