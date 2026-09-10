import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FaqList } from "@/components/store/faq-list";
import { HELP_PAGES, type HelpSlug } from "@/lib/catalog";

export const Route = createFileRoute("/pages/$slug")({
  component: HelpPage,
});

function HelpPage() {
  const { slug } = Route.useParams();
  const page = HELP_PAGES[slug as HelpSlug];
  if (!page) throw notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{page.kicker}</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{page.title}</h1>
      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
        <PageBody slug={slug as HelpSlug} />
      </div>
    </section>
  );
}

function PageBody({ slug }: { slug: HelpSlug }) {
  if (slug === "rastrear-pedido") return <TrackForm />;
  if (slug === "ajuda") {
    return (
      <>
        <p>As 5 perguntas que o suporte responde todo dia. Se não estiver aqui, manda WhatsApp.</p>
        <FaqList />
        <p className="pt-4">
          Ainda travado?{" "}
          <Link to="/pages/$slug" params={{ slug: "contato" }} className="font-medium text-fg underline">
            Fale conosco
          </Link>
          .
        </p>
      </>
    );
  }
  if (slug === "prazo-de-entrega") {
    return (
      <>
        <p>8 a 15 dias úteis com rastreio. Imposto incluso — não tem taxa na porta.</p>
        <p>O código de rastreio sai em até 48h após o pagamento, no WhatsApp ou no e-mail da compra.</p>
        <p>Frete R$9,90 fixo. Grátis acima de R$149.</p>
      </>
    );
  }
  if (slug === "trocas-e-garantia" || slug === "reembolso") {
    return (
      <>
        <p>7 dias contra defeito. Manda um vídeo curto mostrando o problema: troca ou reembolso.</p>
        <p>
          Se o custo de devolver o produto for menor que R$70, não pedimos a devolução física — resolvemos
          no Pix ou na troca.
        </p>
        <p>Arrependimento: mesma janela de 7 dias, produto sem uso, na caixa.</p>
      </>
    );
  }
  if (slug === "privacidade") {
    return (
      <>
        <p>
          Usamos teu e-mail e WhatsApp só pra pedido, rastreio e o cupom VOLTA10. Sem lista vendida, sem
          spam de terceiros.
        </p>
        <p>Pagamento passa pelo Mercado Pago. Não guardamos número de cartão neste site.</p>
      </>
    );
  }
  if (slug === "termos") {
    return (
      <>
        <p>
          AuConforto vende soluções pra pets em apartamento. Pedidos sujeitos a estoque. Preços em reais,
          imposto incluso no frete declarado.
        </p>
        <p>CNPJ em regularização MEI. Suporte em até 24h úteis.</p>
      </>
    );
  }
  return (
    <>
      <p>Suporte em até 24h úteis. WhatsApp e e-mail do pedido.</p>
      <p>Assunto que resolve mais rápido: número do pedido + foto ou vídeo.</p>
    </>
  );
}

function TrackForm() {
  const [code, setCode] = useState("");
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.message("Rastreio", {
          description: `Código ${code.toUpperCase()} — assim que o fulfillment disparar, o link dos Correios / 17track aparece no teu e-mail em até 48h.`,
        });
      }}
    >
      <p>
        Cola o código que chegou no WhatsApp ou e-mail. Se ainda não chegou, espera 48h após o Pix
        confirmar.
      </p>
      <label className="block text-sm font-medium text-fg" htmlFor="track">
        Código de rastreio
      </label>
      <input
        id="track"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        placeholder="AA123456789BR"
        className="h-12 w-full rounded-md border border-border bg-surface px-3 text-fg outline-none"
      />
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg"
      >
        Rastrear
      </button>
      <p className="text-sm">
        Sem código?{" "}
        <Link to="/pages/$slug" params={{ slug: "contato" }} className="text-fg underline">
          Fale conosco
        </Link>
      </p>
    </form>
  );
}
