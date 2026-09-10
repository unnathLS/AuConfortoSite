import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { cartCount, useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/hydrated";
import { cn } from "@/lib/utils";

const NAV: { label: string; href: string; to: string; params?: { slug: string } }[] = [
  { label: "Início", href: "/", to: "/" },
  { label: "Loja", href: "/collections/pets", to: "/collections/$slug", params: { slug: "pets" } },
  { label: "Gatos", href: "/collections/gatos", to: "/collections/$slug", params: { slug: "gatos" } },
  {
    label: "Rastrear Pedido",
    href: "/pages/rastrear-pedido",
    to: "/pages/$slug",
    params: { slug: "rastrear-pedido" },
  },
  { label: "Ajuda", href: "/pages/ajuda", to: "/pages/$slug", params: { slug: "ajuda" } },
];

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const setSearchOpen = useCart((s) => s.setSearchOpen);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(lines) : 0;
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-label={menu ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link
          to="/"
          className="font-display text-[1.35rem] font-semibold tracking-tight text-fg sm:text-[1.55rem]"
          onClick={() => setMenu(false)}
        >
          AuConforto
        </Link>

        <nav className="ml-8 hidden items-center gap-6 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            if (item.to === "/") {
              return (
                <Link
                  key={item.label}
                  to="/"
                  className={cn(
                    "text-sm font-medium tracking-wide text-muted transition-colors duration-150",
                    active ? "text-fg" : "hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            if (item.to === "/collections/$slug") {
              return (
                <Link
                  key={item.label}
                  to="/collections/$slug"
                  params={{ slug: item.params!.slug }}
                  className={cn(
                    "text-sm font-medium tracking-wide text-muted transition-colors duration-150",
                    active ? "text-fg" : "hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.label}
                to="/pages/$slug"
                params={{ slug: item.params!.slug }}
                className={cn(
                  "text-sm font-medium tracking-wide text-muted transition-colors duration-150",
                  active ? "text-fg" : "hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg"
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-md text-fg"
            aria-label="Abrir carrinho"
            onClick={() => setOpen(true)}
          >
            <ShoppingBag className="size-5" />
            {count > 0 ? (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-fg tabular-nums">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {menu ? (
        <nav className="border-t border-border bg-bg px-4 py-3 md:hidden">
          {NAV.map((item) =>
            item.to === "/" ? (
              <Link
                key={item.label}
                to="/"
                className="flex min-h-12 items-center border-b border-border text-base font-medium text-fg last:border-0"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </Link>
            ) : item.to === "/collections/$slug" ? (
              <Link
                key={item.label}
                to="/collections/$slug"
                params={{ slug: item.params!.slug }}
                className="flex min-h-12 items-center border-b border-border text-base font-medium text-fg last:border-0"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to="/pages/$slug"
                params={{ slug: item.params!.slug }}
                className="flex min-h-12 items-center border-b border-border text-base font-medium text-fg last:border-0"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/codigo-shopify"
            className="flex min-h-12 items-center text-sm font-medium text-muted"
            onClick={() => setMenu(false)}
          >
            Código Shopify (Dawn)
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
