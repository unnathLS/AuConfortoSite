import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-fg text-primary-fg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">AuConforto</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-fg/70">
            Conforto pra pets em apartamento. Pix + cartão 3x, rastreio incluso.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary-fg/50">
            Loja
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/collections/$slug" params={{ slug: "pets" }} className="hover:underline">
                Todos os produtos
              </Link>
            </li>
            <li>
              <Link to="/collections/$slug" params={{ slug: "gatos" }} className="hover:underline">
                Gatos
              </Link>
            </li>
            <li>
              <Link to="/pages/$slug" params={{ slug: "rastrear-pedido" }} className="hover:underline">
                Rastrear pedido
              </Link>
            </li>
            <li>
              <Link to="/pages/$slug" params={{ slug: "contato" }} className="hover:underline">
                Fale conosco
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary-fg/50">
            Ajuda
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/pages/$slug" params={{ slug: "prazo-de-entrega" }} className="hover:underline">
                Prazo de entrega
              </Link>
            </li>
            <li>
              <Link to="/pages/$slug" params={{ slug: "trocas-e-garantia" }} className="hover:underline">
                Trocas e garantia
              </Link>
            </li>
            <li>
              <Link to="/pages/$slug" params={{ slug: "privacidade" }} className="hover:underline">
                Privacidade
              </Link>
            </li>
            <li>
              <Link to="/pages/$slug" params={{ slug: "termos" }} className="hover:underline">
                Termos
              </Link>
            </li>
            <li>
              <Link to="/pages/$slug" params={{ slug: "reembolso" }} className="hover:underline">
                Reembolso
              </Link>
            </li>
            <li>
              <Link to="/codigo-shopify" className="text-primary-fg/70 hover:underline">
                Código do tema Dawn
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-primary-fg/55">
            {["Pix", "Visa", "Mastercard", "Mercado Pago"].map((p) => (
              <span
                key={p}
                className="rounded-sm border border-white/15 px-2 py-1"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-xs text-primary-fg/55">
            © AuConforto — CNPJ em regularização MEI. Suporte em até 24h úteis.
          </p>
        </div>
      </div>
    </footer>
  );
}
