# Branches — AuConfortoSite

| Branch | O quê | Status |
|---|---|---|
| `main` | App/site Vite (código da aplicação) | desenvolvimento |
| `shopify` | **Tema Shopify AuConforto** (esta branch — arquivos do tema na raiz: `assets/ config/ layout/ locales/ sections/ snippets/ templates/`) | v1.1.0 — publicada na loja |

## Convenção da branch `shopify`
- Cada alteração no tema = 1 commit aqui + bump em `VERSION` + tag `vX.Y.Z`
- Detalhes em `CHANGELOG.md`
- Zip instalável: compactar `assets config layout locales sections snippets templates` (sem pasta raiz) — ver `INSTALAR.md`
- Dados da loja (CSV, páginas, menus) em `_dados-loja/` — aplicar no admin, não vai no zip
