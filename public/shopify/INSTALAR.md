# AuConforto — instalar no Dawn

Dois caminhos. O A não mexe em arquivo. O B cola as seções no tema.

## A. Só Customizer (mais rápido)

1. Online Store → Themes → Personalizar → Página inicial
2. Desliga a faixa de anúncio nativa em Configurações do tema (Dawn só aceita 1 frase)
3. Monta nesta ordem, colando o texto da página Código Shopify:

- Image banner (hero)
- Multicolumn 4 colunas (confiança)
- Featured collection = Pets
- Image with text (pelo) + Image with text (tédio)
- Collapsible content (FAQ)
- Email signup (cupom)

4. Header: logo texto **AuConforto**. Menu: Início | Loja | Gatos | Rastrear Pedido | Ajuda
5. Conta: OFF. Busca: ON. Carrinho: drawer ON
6. Footer: 3 colunas da copy. Pagamento: Pix, Visa, Master, Mercado Pago

## B. Seções Liquid (layout fiel)

1. Duplica o Dawn
2. Copia `assets/auconforto.css` e as 7 seções desta pasta para o tema
3. Substitui `templates/index.json`
4. Em `layout/theme.liquid`, depois do CSS do tema:

```liquid
{{ 'auconforto.css' | asset_url | stylesheet_tag }}
```

5. Header/footer continuam os do Dawn — só muda copy e menu
6. Cria as coleções manuais Pets / Gatos / pagina-inicial
7. Tags nos produtos:
   - Escova a Vapor + Pente Mágico → `mais-vendido`
   - Moinho Giratório → `pra-gatos`
8. Páginas: rastrear-pedido, ajuda, prazo-de-entrega, trocas-e-garantia, privacidade, termos, contato, reembolso
9. Marketing → Automations: carrinho abandonado 1h / 24h / 72h
10. Desconto Pix 5% no checkout (Shopify Payments / Mercado Pago) + cupom VOLTA10

## Menus

Principal: `/` · `/collections/pets` · `/collections/gatos` · `/pages/rastrear-pedido` · `/pages/ajuda`

Rodapé: rastrear, prazo, trocas, contato, privacidade, termos

## Handles sugeridos dos produtos

- `escova-a-vapor`
- `pente-magico`
- `moinho-giratorio`
- `tapete-gel-xs`
