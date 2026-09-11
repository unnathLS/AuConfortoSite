# CHANGELOG — tema Shopify AuConforto (branch `shopify`)

## v1.1.7 — 2026-09-11
- `index.json` reescrito do zero (6 seções, sem URLs no JSON — sobrescreve qualquer corrupção no tema publicado)

## v1.1.6 — 2026-09-11
- Páginas com conteúdo padrão de fallback por `page.handle` (página vazia no admin já mostra texto; conteúdo do admin prevalece quando preenchido)

## v1.1.5 — 2026-09-11
- Rotas via objeto `routes` (zero `HardcodedRoutes` no theme-check)
- Bug real: `payment_button` pra dentro do `form` (antes não renderizava)
- Carrinho com `routes.cart_url`/`cart_change_url`; busca com `routes.search_url`

## v1.1.4 — 2026-09-11
- `settings_schema.json` no formato correto (array no topo — a Shopify zerava o arquivo)
- Merge mantém v1.1.3 (sync tinha trazido de volta arquivos antigos)

## v1.1.3 — 2026-09-11
- Corrige importação na Shopify: remove URLs relativas de schemas/presets/templates `url` (a validação de import derrubava `index.json`, `hero`, `featured`, `why` e `announcement`)
- Links seguem via fallback no Liquid (mesmos destinos: `/collections/pets`, produtos, rastreio)

## v1.1.2 — 2026-09-11
- Pacote `auconforto-dawn-ape-v1.zip` versionado no repo (baixa e sobe direto, sem montar zip local)
- Restaura `templates/index.json` (homepage 404 no tema publicado)
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
