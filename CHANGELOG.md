# CHANGELOG — tema Shopify AuConforto (branch `shopify`)

## v1.1.1 — 2026-09-11
- Correções pós-upload: galeria do produto (`invalid url input`), relacionados com fallback, featured com fallback `collections.all`, badges/descrições por nome do produto
- Docs: `BRANCHES.md` + README da `main`; branch `shopify-theme` removida

## v1.1.0 — 2026-09-11
- Anúncio topo com 2 mensagens (sem cupom exposto); anúncio embutido no header (corrige `Liquid error announcement-rotator`)
- Menu `Início | Produtos | Rastrear Pedido | Ajuda` (sem Loja/Gatos soltos)
- Hero com `hero.jpg` do Grok de fallback (aparece sem configurar)
- Imagens do Grok dentro de `assets/` (hero, lifestyle, pack)
- Fontes do primeiro commit: Fraunces (títulos/logo) + Figtree (texto)
- FAQ sem VOLTA10; `Serve pro meu pet?` por produto na página de produto
- Newsletter captura e-mail e entrega desconto por e-mail (código não exposto)
- Footer sem `Gatos`; links para Produtos + 5 páginas de ajuda
- Coleção com filtro Ver tudo / 🐈 Gatos / 🐕 Cachorros (+ template `collection.caes`)
- Rastreio via 17track (Correios só acha após chegar no BR)
- Textos PT-BR fixos (sem `| t` que quebrava: 404, carrinho, busca)
- Galeria do produto corrigida (`invalid url input`)
- Relacionados + featured com fallback (`collections.all`)
- Badges/descrições reconhecem produtos pelos nomes atuais

## v1.0.0 — 2026-09-10
- Tema completo inicial baseado no Dawn (OS 2.0): layout, 15 sections, 11 templates, drawer, busca, locales pt-BR/en
