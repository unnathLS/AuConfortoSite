import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Home, Shield, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FaqList } from "@/components/store/faq-list";
import { ProductCard } from "@/components/store/product-card";
import { TRUST, productsByHandles, PRODUCT_ORDER_HOME } from "@/lib/catalog";

export const Route = createFileRoute("/")({ component: HomePage });

const ICONS = {
  truck: Truck,
  card: CreditCard,
  shield: Shield,
  home: Home,
};

function HomePage() {
  const products = productsByHandles(PRODUCT_ORDER_HOME);
  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden bg-fg text-primary-fg">
        <img
          src="/images/hero.jpg"
          alt="Gato e cão no sofá de um apartamento"
          className="absolute inset-0 h-full w-full object-cover outline-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fg/78 via-fg/45 to-fg/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 py-14 sm:px-6 md:justify-center md:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary-fg/75 uppercase">
            AuConforto · pets em apartamento
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.1rem] leading-[1.12] font-semibold tracking-tight sm:text-5xl md:text-[3.4rem]">
            Apartamento com pet não precisa viver com pelo, calor e tédio
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-fg/82 sm:text-lg">
            4 soluções testadas pra cães e gatos em apê. Pix com desconto, rastreio incluso, 7 dias de garantia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/collections/$slug"
              params={{ slug: "pets" }}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.96]"
            >
              Ver os 4 mais vendidos
            </Link>
            <Link
              to="/pages/$slug"
              params={{ slug: "rastrear-pedido" }}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 bg-fg/20 px-6 text-sm font-semibold text-primary-fg backdrop-blur-sm transition-transform duration-150 active:scale-[0.96]"
            >
              Rastrear meu pedido
            </Link>
          </div>
          <p className="mt-6 text-sm text-primary-fg/75">
            Pix com desconto · 8–15 dias úteis com rastreio · 7 dias contra defeito
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
          {TRUST.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div key={item.title} className="flex gap-3 md:block">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.6} />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          Coleção em destaque
        </p>
        <h2 className="font-display mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Os 4 que mais saem pra quem mora em apê
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Escolhe pela tua dor. Frete grátis acima de R$149.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} featured />
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/collections/$slug"
            params={{ slug: "pets" }}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-semibold transition-transform duration-150 active:scale-[0.96]"
          >
            Ver tudo
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Por que funciona
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Antes / depois no sofá do apê
          </h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <article className="grid gap-5">
              <div className="grid grid-cols-2 gap-2">
                <figure>
                  <img
                    src="/images/antes-pelo.jpg"
                    alt="Sofá coberto de pelo"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                  <figcaption className="mt-2 text-xs tracking-wide text-muted uppercase">
                    Antes
                  </figcaption>
                </figure>
                <figure>
                  <img
                    src="/images/depois-pelo.jpg"
                    alt="Sofá limpo com gato calmo"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                  <figcaption className="mt-2 text-xs tracking-wide text-muted uppercase">
                    Depois
                  </figcaption>
                </figure>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  5 min por dia, 80% menos pelo no sofá
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Pente + Escova Vapor tiram o subpelo que aspirador não pega. Sem puxar, sem machucar. Gato ronrona, cachorro fica quieto.
                </p>
                <Link
                  to="/products/$handle"
                  params={{ handle: "escova-a-vapor" }}
                  className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Quero casa sem pelo
                </Link>
              </div>
            </article>

            <article className="grid gap-5">
              <img
                src="/images/moinho-lifestyle.jpg"
                alt="Gato brincando com o moinho giratório"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Gato sozinho não precisa destruir o sofá
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Moinho cansa em 15 min sem você. Tapete Gel alivia o calor sem molhar, sem geladeira, sem energia.
                </p>
                <Link
                  to="/products/$handle"
                  params={{ handle: "moinho-giratorio" }}
                  className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Quero gato tranquilo
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Perguntas de quem mora em apê</h2>
        <p className="mt-2 mb-8 text-muted">As mesmas 5 do suporte. Sem enrolação.</p>
        <FaqList />
      </section>

      <Newsletter />
    </>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="border-t border-border bg-fg text-primary-fg">
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Ganha 10% off na primeira compra
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-primary-fg/70">
          Deixa teu e-mail e recebe VOLTA10 + rastreio sem enrolação.
        </p>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Cupom VOLTA10 enviado. Olha o e-mail.");
            setEmail("");
          }}
        >
          <label className="sr-only" htmlFor="home-email">
            E-mail
          </label>
          <input
            id="home-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teu@email.com"
            className="h-12 flex-1 rounded-md border border-white/15 bg-white/5 px-4 text-primary-fg outline-none placeholder:text-primary-fg/40"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg transition-transform duration-150 active:scale-[0.96]"
          >
            Quero meu cupom
          </button>
        </form>
      </div>
    </section>
  );
}
