export type KitFile = {
  path: string;
  title: string;
  hint: string;
};

export const KIT_FILES: KitFile[] = [
  { path: "/shopify/customizer/liquid-announcement.html", title: "customizer/liquid-announcement.html", hint: "Cola no Liquid personalizado" },
  { path: "/shopify/templates/index.json", title: "templates/index.json", hint: "Ordem da homepage" },
  { path: "/shopify/assets/auconforto.css", title: "assets/auconforto.css", hint: "CSS da marca" },
  { path: "/shopify/sections/announcement-rotator.liquid", title: "announcement-rotator.liquid", hint: "Faixa 3 mensagens" },
  { path: "/shopify/sections/hero-auconforto.liquid", title: "hero-auconforto.liquid", hint: "1ª dobra" },
  { path: "/shopify/sections/trust-bar.liquid", title: "trust-bar.liquid", hint: "4 colunas" },
  { path: "/shopify/sections/featured-pets.liquid", title: "featured-pets.liquid", hint: "Os 4 + badges" },
  { path: "/shopify/sections/why-it-works.liquid", title: "why-it-works.liquid", hint: "Antes / depois" },
  { path: "/shopify/sections/faq-homepage.liquid", title: "faq-homepage.liquid", hint: "5 perguntas" },
  { path: "/shopify/sections/coupon-signup.liquid", title: "coupon-signup.liquid", hint: "VOLTA10" },
];

export const CUSTOMIZER = [
  {
    title: "1. Announcement bar",
    body: `Dawn nativo só aceita 1 frase. Desliga a faixa nativa e usa a seção AC Announcement.

Textos rotativos (link: /collections/pets):
1. FRETE GRÁTIS ACIMA DE R$149 | PIX COM 5% OFF
2. 8-15 DIAS ÚTEIS COM RASTREIO | IMPOSTO INCLUSO
3. CUPOM VOLTA10 = 10% OFF NA PRIMEIRA COMPRA`,
  },
  {
    title: "2. Header",
    body: `Logo: AuConforto (texto, sem imagem)
Menu: Início (/) · Loja (/collections/pets) · Gatos (/collections/gatos) · Rastrear Pedido (/pages/rastrear-pedido) · Ajuda (/pages/ajuda)
Busca ON · Conta OFF · Carrinho drawer ON`,
  },
  {
    title: "3. Hero — Image banner",
    body: `Título: Apartamento com pet não precisa viver com pelo, calor e tédio
Sub: 4 soluções testadas pra cães e gatos em apê. Pix com desconto, rastreio incluso, 7 dias de garantia.
Botão 1: Ver os 4 mais vendidos → /collections/pets
Botão 2: Rastrear meu pedido → /pages/rastrear-pedido
Mobile: texto centralizado
Linha sob os botões: Pix com desconto · 8–15 dias úteis com rastreio · 7 dias contra defeito`,
  },
  {
    title: "4. Trust — Multicolumn 4",
    body: `1. Rastreio incluso — Código em até 48h no WhatsApp/e-mail
2. Pix + cartão 3x — Via Mercado Pago, boleto OFF
3. 7 dias de garantia — Vídeo do defeito = troca
4. Feito pra apê — Testado em gato/cão de apartamento`,
  },
  {
    title: "5. Featured collection Pets",
    body: `Título: Os 4 que mais saem pra quem mora em apê
Sub: Escolhe pela tua dor. Frete grátis acima de R$149.
Ordem: Escova a Vapor · Pente Mágico · Moinho Giratório · Tapete Gel XS
Tags: mais-vendido (1 e 2), pra-gatos (3)
Botão: Ver tudo → /collections/pets`,
  },
  {
    title: "6. Por que funciona",
    body: `Bloco A — Pelo
Título: 5 min por dia, 80% menos pelo no sofá
Texto: Pente + Escova Vapor tiram o subpelo que aspirador não pega. Sem puxar, sem machucar. Gato ronrona, cachorro fica quieto.
CTA: Quero casa sem pelo → Escova a Vapor

Bloco B — Tédio + calor
Título: Gato sozinho não precisa destruir o sofá
Texto: Moinho cansa em 15 min sem você. Tapete Gel alivia o calor sem molhar, sem geladeira, sem energia.
CTA: Quero gato tranquilo → Moinho`,
  },
  {
    title: "8. FAQ",
    body: `1. Quando chega? → 8-15 dias úteis com rastreio. Código em até 48h após pagamento.
2. Frete? → R$9,90 fixo com rastreio, grátis acima de R$149. Imposto incluso.
3. E se quebrar? → 7 dias com vídeo = troca ou reembolso. Sem devolução se custo <70.
4. Pix tem desconto? → Sim, 5% OFF automático + cupom VOLTA10 na primeira compra.
5. Serve pro meu pet? → Pente/Escova: cães/gatos pelo curto/médio. Moinho: gatos. Tapete XS: até 5kg.`,
  },
  {
    title: "9. Newsletter",
    body: `Título: Ganha 10% OFF na primeira compra
Texto: Deixa teu e-mail e recebe VOLTA10 + rastreio sem enrolação.
Botão: Quero meu cupom
Shopify Email + automação carrinho 1h / 24h / 72h`,
  },
  {
    title: "10. Footer",
    body: `Coluna 1: AuConforto — Conforto pra pets em apartamento. Pix + cartão 3x, rastreio incluso.
Coluna 2 Loja: Todos os produtos · Gatos · Rastrear pedido · Fale conosco
Coluna 3 Ajuda: Prazo · Trocas · Privacidade · Termos · Reembolso
Pagamento: Pix, Visa, Master, Mercado Pago
© AuConforto — CNPJ em regularização MEI. Suporte em até 24h úteis.`,
  },
];
