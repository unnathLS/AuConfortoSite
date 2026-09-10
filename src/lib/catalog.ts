export type ProductBadge = "mais-vendido" | "pra-gatos";

export type Product = {
  handle: string;
  title: string;
  short: string;
  pain: string;
  price: number;
  compareAt: number;
  badges: ProductBadge[];
  image: string;
  lifestyle: string;
  forCats: boolean;
  forDogs: boolean;
  weightNote: string;
  bullets: string[];
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    handle: "escova-a-vapor",
    title: "Escova a Vapor",
    short: "Tira o subpelo que o aspirador não pega",
    pain: "Pelo no sofá",
    price: 189.9,
    compareAt: 249.9,
    badges: ["mais-vendido"],
    image: "/images/escova-pack.jpg",
    lifestyle: "/images/escova-lifestyle.jpg",
    forCats: true,
    forDogs: true,
    weightNote: "Cães e gatos de pelo curto ou médio",
    bullets: [
      "Vapor suave solta o subpelo sem puxar",
      "5 minutos por dia, 80% menos pelo no sofá",
      "Gato ronrona, cachorro fica quieto",
      "Demo forte — o pelo sai na hora",
    ],
    description:
      "A Escova a Vapor é o hero de quem mora em apê. O vapor abre o pelo e solta o subpelo que aspirador, rolo adesivo e pente comum não pegam. Sem machucar, sem barulho de secador, sem levar o pet no pet shop. Cinco minutos no colo do sofá e a casa para de parecer um tapete.",
  },
  {
    handle: "pente-magico",
    title: "Pente Mágico",
    short: "Entrada barata pra parar o pelo agora",
    pain: "Pelo no sofá",
    price: 99.9,
    compareAt: 139.9,
    badges: ["mais-vendido"],
    image: "/images/pente-pack.jpg",
    lifestyle: "/images/pente-lifestyle.jpg",
    forCats: true,
    forDogs: true,
    weightNote: "Cães e gatos de pelo curto ou médio",
    bullets: [
      "Dentes arredondados, não puxa a pele",
      "Leva o pelo morto numa passada",
      "Cabe na gaveta, usa todo dia",
      "Combina com a Escova a Vapor no combo",
    ],
    description:
      "O Pente Mágico é a porta de entrada: R$99,90, resultado na primeira passada. Tira o pelo morto da superfície enquanto a Escova a Vapor trabalha o subpelo. Quem mora em apê pequeno sente a diferença no sofá no mesmo dia.",
  },
  {
    handle: "moinho-giratorio",
    title: "Moinho Giratório",
    short: "Cansa o gato em 15 min sem você",
    pain: "Tédio / sofá destruído",
    price: 129.9,
    compareAt: 179.9,
    badges: ["pra-gatos"],
    image: "/images/moinho-pack.jpg",
    lifestyle: "/images/moinho-lifestyle.jpg",
    forCats: true,
    forDogs: false,
    weightNote: "Gatos",
    bullets: [
      "Gira com petisco e cansa de verdade",
      "Gato sozinho para de atacar o sofá",
      "Sem pilha, sem app, sem barulho de motor",
      "Cabe no canto do apê",
    ],
    description:
      "Gato sozinho no apê não precisa destruir o sofá. O Moinho Giratório gira com petisco, obriga o gato a caçar e cansa em cerca de 15 minutos. Sem você no chão brincando de laserzinho depois do expediente.",
  },
  {
    handle: "tapete-gel-xs",
    title: "Tapete Gel XS",
    short: "Alivia o calor sem molhar e sem energia",
    pain: "Calor no apê",
    price: 79.9,
    compareAt: 119.9,
    badges: [],
    image: "/images/tapete-lifestyle.jpg",
    lifestyle: "/images/tapete-lifestyle.jpg",
    forCats: true,
    forDogs: true,
    weightNote: "Pets até 5 kg",
    bullets: [
      "Gel que esfria sozinho, sem geladeira",
      "Não molha o chão, não gasta energia",
      "Tamanho XS pra apê e pet pequeno",
      "Verão em concreto: o chão queima, o tapete não",
    ],
    description:
      "Apê no verão vira forno. O Tapete Gel XS esfria o pet sem molhar, sem geladeira e sem tomada. Tamanho extra-pequeno pra quem tem até 5 kg — gato, maltês, york, shih-tzu filhote.",
  },
];

export const PRODUCT_ORDER_HOME = [
  "escova-a-vapor",
  "pente-magico",
  "moinho-giratorio",
  "tapete-gel-xs",
] as const;

export const PRODUCT_ORDER_CATS = [
  "moinho-giratorio",
  "tapete-gel-xs",
  "pente-magico",
  "escova-a-vapor",
] as const;

export function getProduct(handle: string) {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function productsByHandles(handles: readonly string[]) {
  return handles
    .map((h) => getProduct(h))
    .filter((p): p is Product => Boolean(p));
}

export const COLLECTIONS = {
  pets: {
    slug: "pets",
    title: "Os 4 que resolvem",
    seo: "Soluções pra cães e gatos em apartamento: sem pelo, sem calor, sem tédio. Pix com desconto, 8-15 dias com rastreio.",
    handles: PRODUCT_ORDER_HOME,
  },
  gatos: {
    slug: "gatos",
    title: "Pra gatos em apê",
    seo: "Moinho, tapete gel, pente e escova a vapor — ordem pensada pra gato de apartamento.",
    handles: PRODUCT_ORDER_CATS,
  },
  "pagina-inicial": {
    slug: "pagina-inicial",
    title: "Mais vendidos",
    seo: "Os 4 mais vendidos da AuConforto pra quem mora em apartamento com pet.",
    handles: PRODUCT_ORDER_HOME,
  },
} as const;

export const ANNOUNCEMENTS = [
  "FRETE GRÁTIS ACIMA DE R$149  ·  PIX COM 5% OFF",
  "8–15 DIAS ÚTEIS COM RASTREIO  ·  IMPOSTO INCLUSO",
  "CUPOM VOLTA10 = 10% OFF NA PRIMEIRA COMPRA",
];

export const TRUST = [
  {
    title: "Rastreio incluso",
    text: "Código em até 48h no WhatsApp ou e-mail",
    icon: "truck" as const,
  },
  {
    title: "Pix + cartão 3x",
    text: "Via Mercado Pago. Boleto off.",
    icon: "card" as const,
  },
  {
    title: "7 dias de garantia",
    text: "Vídeo do defeito = troca. Sem drama.",
    icon: "shield" as const,
  },
  {
    title: "Feito pra apê",
    text: "Testado em gato e cão de apartamento",
    icon: "home" as const,
  },
];

export const FAQS = [
  {
    q: "Quando chega?",
    a: "8 a 15 dias úteis com rastreio. O código sai em até 48h após o pagamento, no WhatsApp ou no e-mail.",
  },
  {
    q: "Como é o frete?",
    a: "R$9,90 fixo com rastreio. Grátis acima de R$149. Imposto incluso — não tem surpresa na porta.",
  },
  {
    q: "E se quebrar?",
    a: "7 dias com vídeo do defeito = troca ou reembolso. Sem devolução física se o custo do envio for menor que R$70.",
  },
  {
    q: "Pix tem desconto?",
    a: "Sim. 5% OFF automático no Pix, mais o cupom VOLTA10 na primeira compra.",
  },
  {
    q: "Serve pro meu pet?",
    a: "Pente e Escova: cães e gatos de pelo curto ou médio. Moinho: gatos. Tapete Gel XS: até 5 kg.",
  },
];

export const HELP_PAGES = {
  "rastrear-pedido": {
    title: "Rastrear pedido",
    kicker: "Rastreio",
  },
  ajuda: {
    title: "Ajuda",
    kicker: "Suporte",
  },
  "prazo-de-entrega": {
    title: "Prazo de entrega",
    kicker: "Logística",
  },
  "trocas-e-garantia": {
    title: "Trocas e garantia",
    kicker: "Política",
  },
  privacidade: {
    title: "Privacidade",
    kicker: "Legal",
  },
  termos: {
    title: "Termos",
    kicker: "Legal",
  },
  contato: {
    title: "Fale conosco",
    kicker: "Contato",
  },
  reembolso: {
    title: "Reembolso",
    kicker: "Política",
  },
} as const;

export type HelpSlug = keyof typeof HELP_PAGES;
