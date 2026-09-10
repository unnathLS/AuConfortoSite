import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/store/product-card";
import { COLLECTIONS, productsByHandles } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const col = COLLECTIONS[slug as keyof typeof COLLECTIONS];
  if (!col) throw notFound();
  const products = productsByHandles(col.handles);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Coleção</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{col.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{col.seo}</p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.handle} product={p} featured />
        ))}
      </div>
      {slug !== "pets" ? (
        <p className="mt-12 text-sm">
          <Link to="/collections/$slug" params={{ slug: "pets" }} className="font-medium underline">
            Ver todos os produtos
          </Link>
        </p>
      ) : null}
    </section>
  );
}
