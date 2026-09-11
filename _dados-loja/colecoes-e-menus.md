# AuConforto Dawn Apê v1 — coleções + menus (criar no admin)

## Coleções (Produtos > Coleções > Criar — tipo Manual)
1. **Pets** — handle `pets`
   - Manual, adiciona NESTA ORDEM: escova-a-vapor → pente-magico → moinho-giratorio → tapete-gel-xs
   - Descrição SEO: Soluções pra cães e gatos em apartamento: sem pelo, sem calor, sem tédio. Pix com desconto, 8-15 dias com rastreio.
   - Template: collection padrão
2. **Gatos** — handle `gatos`
   - Manual, ordem: moinho-giratorio → tapete-gel-xs → pente-magico → escova-a-vapor
   - Template: collection.gatos
   - Serve de filtro (pílula 🐈 na página Produtos)
2b. **Cães** — handle `caes`
   - Manual, ordem: escova-a-vapor → pente-magico → tapete-gel-xs
   - Template: collection.caes
   - Serve de filtro (pílula 🐕 na página Produtos)
3. **Página inicial** — handle `pagina-inicial`
   - Manual, mesma ordem da Pets

## Tags (pra badge funcionar)
- escova-a-vapor + pente-magico → tag `mais-vendido`
- moinho-giratorio → tag `pra-gatos`
- (CSV já vem com tags)

## Menus (Conteúdo > Menus)
**main-menu:**
- Início → /
- Produtos → /collections/pets
- Rastrear Pedido → /pages/rastrear-pedido
- Ajuda → /pages/ajuda

**footer (rodapé):**
- Todos os produtos → /collections/pets
- Rastrear pedido → /pages/rastrear-pedido
- Fale conosco → /pages/contato
- Prazo → /pages/prazo-de-entrega
- Trocas → /pages/trocas-e-garantia
- Privacidade → /pages/privacidade
- Termos → /pages/termos
- Reembolso → /pages/reembolso

## Páginas (Conteúdo > Páginas)
Criar 8 com slug exato, colar HTML de `_dados-loja/paginas/`:
rastrear-pedido, ajuda, prazo-de-entrega, trocas-e-garantia, privacidade, termos, contato, reembolso
- rastrear-pedido → template `page.rastrear-pedido`
- ajuda → template `page.ajuda`
- contato → template `page.contato`
- demais → template `page`

## Desconto boas-vindas (sem cupom exposto)
- Newsletter captura e-mail e entrega o desconto POR E-MAIL (código não aparece no site)
- E-mail da compra = só rastreio/transacional
- Anúncio, FAQ e produto NÃO citam cupom (só Pix 5% OFF)

## Frete + checkout
- Frete: “Envio com rastreio” R$9,90 fixo + grátis acima R$149
- Checkout: Mercado Pago Pix + 3x, boleto OFF, Pix 5% OFF
- Rastreio: página rastrear-pedido abre 17track (Correios só acha após chegar no BR)
- Automação carrinho 1h/24h/72h
