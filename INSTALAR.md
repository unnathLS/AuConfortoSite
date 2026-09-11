# AuConforto Dawn Apê v1 — Tema Shopify completo (base Dawn OS 2.0)

Projeto diferenciado de `02_loja/site/grok_shopify` (que era só 7 seções soltas).
Este aqui é **tema instalável**: `layout + templates + sections + snippets + assets + config + locales`.

Base: arquitetura Dawn v15.x (JSON templates, sections everywhere, cart drawer, search). PT-BR nativo, mobile-first.

## O que já vem pronto
- Announcement rotativo 3 msgs (global, em `layout/theme.liquid` via seção `announcement-rotator`)
- Header `AuConforto`: Início | Loja | Gatos | Rastrear | Ajuda — busca ON, conta OFF, drawer ON
- Home `templates/index.json` NA ORDEM pedida:
  1. Hero “Apartamento com pet…” + 2 botões + linha Pix/rastreio/garantia (mobile centralizado)
  2. Trust 4 colunas
  3. Featured `pets` “Os 4 que mais saem…” ordem Escova→Pente→Moinho→Tapete + Ver tudo
  4. Por que funciona 2 blocos + CTAs
  5. FAQ 5 perguntas
  6. Cupom VOLTA10
- Footer 3 colunas + Pix/Visa/Master/MP + © MEI
- Produto: galeria + badge + preço + Pix 5% + trustline + qty + FAQ + “Completa teu apê”
- Coleção, página (com rastreio embutido), carrinho, busca, 404
- Drawer com barra frete grátis R$149 + busca modal + copiar VOLTA10

## Como importar (3 min)
### 1. Zipar só o tema
No admin: Loja virtual → Temas → Adicionar tema → Fazer upload de arquivo zip.
NÃO zipa a pasta `_dados-loja` junto. Gera assim:
```bash
cd auconforto-dawn-ape-v1
zip -r ../auconforto-dawn-ape-v1.zip assets config layout locales sections snippets templates
# confere: deve ter layout/theme.liquid na raiz do zip
```
Ou usa o zip já gerado `auconforto-dawn-ape-v1.zip` ao lado desta pasta.

### 2. Publicar e checar
Personalizar → confirma home na ordem acima. Header/footer já vêm com copy certa.
Em `Featured pets`: seleciona coleção `pets` OU trava os 4 em Produto 1-4 (Escova, Pente, Moinho, Tapete) pra garantir ordem.

### 3. Dados (fora do tema)
- Produtos: importa `_dados-loja/produtos-4-auconforto.csv` (handles exatos + preços: 189,90/99,90/129,90/79,90 + compares + tags badge).
- Coleções/menus/páginas: segue `_dados-loja/colecoes-e-menus.md` + HTML em `_dados-loja/paginas/`.
- Frete VOLTA10: ver checklist no README.

## Handles e preços (travados)
- escova-a-vapor 189,90 (249,90) tag mais-vendido
- pente-magico 99,90 (139,90) tag mais-vendido
- moinho-giratorio 129,90 (179,90) tag pra-gatos
- tapete-gel-xs 79,90 (119,90)

## Diferença vs grok_shopify antigo
- Antigo: só `assets/auconforto.css + 7 sections + index.json + liquid solto`. Sem layout, sem config, sem locales, sem product/collection/page/cart/search, sem snippets drawer — NÃO instalava como tema.
- Este: tema completo validável + templates p/ todas páginas + CSV + 8 páginas + menus + zip pronto.
