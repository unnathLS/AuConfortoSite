import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getProduct, PRODUCTS } from "@/lib/catalog";
import { formatBRL } from "@/lib/utils";

export const Route = createFileRoute("/products/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const product = getProduct(handle);
  if (!product) throw notFound();
  const add = useCart((s) => s.add);
  const others = PRODUCTS.filter((p) => p.handle !== product.handle);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs text-muted">
        <Link to="/collections/$slug" params={{ slug: "pets" }} className="hover:underline">
          Loja
        </Link>{" "}
        / {product.title}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="grid gap-3">
          <img
            src={product.lifestyle}
            alt={product.title}
            className="aspect-square w-full rounded-xl object-cover"
          />
          {product.image !== product.lifestyle ? (
            <img
              src={product.image}
              alt=""
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            {product.pain}
          </p>
          <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{product.title}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold tabular-nums">{formatBRL(product.price)}</span>
            <span className="text-muted line-through tabular-nums">{formatBRL(product.compareAt)}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{product.weightNote}</p>
          <p className="mt-6 max-w-prose leading-relaxed text-muted">{product.description}</p>
          <ul className="mt-6 space-y-2">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              add(product.handle);
              toast.success(`${product.title} no carrinho`);
            }}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.96] sm:w-auto"
          >
            Adicionar — {formatBRL(product.price)}
          </button>
          <p className="mt-4 text-sm text-muted">
            Pix 5% off · Frete grátis acima de R$149 · 7 dias de garantia
          </p>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-display text-2xl font-semibold">Quem levou esse, levou também</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.handle}
              to="/products/$handle"
              params={{ handle: p.handle }}
              className="group"
            >
              <img
                src={p.image}
                alt=""
                className="aspect-square w-full rounded-lg object-cover"
              />
              <p className="mt-3 font-medium group-hover:underline">{p.title}</p>
              <p className="text-sm tabular-nums">{formatBRL(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
