import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">404</p>
      <h1 className="font-display mt-2 text-3xl font-semibold">Essa página não existe</h1>
      <p className="mt-3 text-muted">Volta pra loja — os 4 que resolvem o apê estão lá.</p>
      <Link
        to="/collections/$slug"
        params={{ slug: "pets" }}
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg"
      >
        Ver os 4 mais vendidos
      </Link>
    </section>
  );
}
