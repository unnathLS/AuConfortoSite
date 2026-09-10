import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";
import { cn, formatBRL } from "@/lib/utils";

const BADGE_LABEL: Record<Product["badges"][number], string> = {
  "mais-vendido": "Mais vendido",
  "pra-gatos": "Pra gatos",
};

export function ProductCard({ product, featured }: { product: Product; featured?: boolean }) {
  const add = useCart((s) => s.add);
  return (
    <article className="group flex flex-col">
      <Link
        to="/products/$handle"
        params={{ handle: product.handle }}
        className="relative block overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
      >
        <img
          src={featured ? product.lifestyle : product.image}
          alt={product.title}
          className="aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        {product.badges[0] ? (
          <span className="absolute top-3 left-3 rounded-full bg-fg px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-primary-fg uppercase">
            {BADGE_LABEL[product.badges[0]]}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">{product.pain}</p>
        <Link
          to="/products/$handle"
          params={{ handle: product.handle }}
          className="font-display mt-1 text-xl font-semibold tracking-tight text-fg"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-sm leading-relaxed text-muted">{product.short}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-semibold tabular-nums">{formatBRL(product.price)}</span>
          <span className="text-sm text-muted line-through tabular-nums">
            {formatBRL(product.compareAt)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            add(product.handle);
            toast.success(`${product.title} no carrinho`);
          }}
          className={cn(
            "mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-fg px-4 text-sm font-semibold text-primary-fg",
            "transition-transform duration-150 ease-out active:scale-[0.96]",
          )}
        >
          Adicionar
        </button>
      </div>
    </article>
  );
}
