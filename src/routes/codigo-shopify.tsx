import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { CUSTOMIZER, KIT_FILES, type KitFile } from "@/lib/shopify-kit";

export const Route = createFileRoute("/codigo-shopify")({
  component: ShopifyKitPage,
});

function ShopifyKitPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        Tema Dawn
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        Código Shopify da homepage
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Copia a ordem, a copy e as seções Liquid pra colar no Dawn. O preview desta
        página é o visual alvo — o código abaixo é o que vai pro Customizer.
      </p>

      <a
        href="/shopify-auconforto-dawn.zip"
        download
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-fg"
      >
        Baixar zip das seções Dawn
      </a>

      <ol className="mt-8 space-y-3 rounded-xl bg-surface p-5 text-sm leading-relaxed shadow-[var(--shadow-border)]">
        <li>1. Duplica o tema Dawn.</li>
        <li>
          2. Em Editar código, cola <code className="text-fg">assets/auconforto.css</code> e as 7 seções.
        </li>
        <li>
          3. Substitui <code className="text-fg">templates/index.json</code> pelo arquivo desta pasta.
        </li>
        <li>4. Cria coleções manuais Pets / Gatos / pagina-inicial e as páginas de ajuda.</li>
        <li>5. Menu principal e rodapé nos handles da copy. Conta OFF, busca ON, drawer ON.</li>
      </ol>

      <h2 className="font-display mt-14 text-2xl font-semibold">Copy do Customizer</h2>
      <div className="mt-5 space-y-4">
        {CUSTOMIZER.map((block) => (
          <CopyCard key={block.title} title={block.title} body={block.body} />
        ))}
      </div>

      <h2 className="font-display mt-14 text-2xl font-semibold">Arquivos Liquid</h2>
      <p className="mt-2 mb-5 text-sm text-muted">
        Abre, copia, cola no tema. Nome do arquivo = tipo da seção no Customizer.
      </p>
      <div className="space-y-4">
        {KIT_FILES.map((file) => (
          <FileCard key={file.path} file={file} />
        ))}
      </div>
    </section>
  );
}

function CopyCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">{title}</h3>
        <CopyButton text={body} />
      </div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">
        {body}
      </pre>
    </article>
  );
}

function FileCard({ file }: { file: KitFile }) {
  const [text, setText] = useState("Carregando…");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(file.path)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => {
        if (alive) setText(t);
      })
      .catch(() => {
        if (alive) setText("Não deu pra carregar este arquivo.");
      });
    return () => {
      alive = false;
    };
  }, [file.path]);

  return (
    <article className="rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{file.title}</p>
          <p className="text-xs text-muted">{file.hint}</p>
        </div>
        <CopyButton text={text.startsWith("Carreg") || text.startsWith("Não") ? "" : text} />
        <button
          type="button"
          className="min-h-10 rounded-md border border-border px-3 text-sm"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fechar" : "Ver código"}
        </button>
      </div>
      {open ? (
        <pre className="max-h-96 overflow-auto border-t border-border bg-fg p-4 text-[11px] leading-relaxed text-primary-fg">
          {text}
        </pre>
      ) : null}
    </article>
  );
}

function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      disabled={!text}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium disabled:opacity-40"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1600);
      }}
    >
      {ok ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {ok ? "Copiado" : "Copiar"}
    </button>
  );
}
