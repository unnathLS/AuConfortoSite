/* AuConforto Dawn Apê v1 — drawer, busca, FAQ, galeria, frete */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Drawer
  const drawer = $('#AcCartDrawer'), overlay = $('#AcOverlay');
  const openCart = () => { drawer?.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeCart = () => { drawer?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; $('#AcSearchModal')?.classList.remove('open'); };
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-open-cart]')) { e.preventDefault(); openCart(); }
    if (e.target.closest('[data-close-cart]') || e.target === overlay) closeCart();
    if (e.target.closest('[data-open-search]')) { e.preventDefault(); $('#AcSearchModal')?.classList.add('open'); overlay?.classList.add('open'); }
    if (e.target.closest('[data-close-search]')) closeCart();
    if (e.key === 'Escape') closeCart();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

  // Add to cart AJAX (funciona com Dawn product form)
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[action*="/cart/add"]');
    if (!form) return;
    if (form.dataset.noAjax === 'true') return;
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const old = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Adicionando…'; }
    try {
      const fd = new FormData(form);
      const res = await fetch('/cart/add.js', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('cart');
      await fetch('/cart.js').then(r => r.json()).then(updateDrawer);
      openCart();
    } catch { form.submit(); }
    finally { if (btn) { btn.disabled = false; btn.textContent = old; } }
  });

  const fmtBRL = (c) => (c / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  async function updateDrawer(cart) {
    cart = cart || await fetch('/cart.js').then(r => r.json());
    const countEls = $$('.ac-cart-count');
    countEls.forEach(el => el.textContent = cart.item_count);
    const body = $('#AcCartItems');
    if (!body) return;
    if (!cart.items.length) {
      body.innerHTML = `<p>${window.AcStrings?.empty || 'Carrinho vazio.'}</p><p><a class="ac-btn ac-btn--primary" href="/collections/pets">Ver os 4 mais vendidos</a></p>`;
    } else {
      const cache = updateDrawer._pcache || (updateDrawer._pcache = {});
      const handles = [...new Set(cart.items.map(i => i.handle).filter(Boolean))];
      await Promise.all(handles.map(async (h) => {
        if (!cache[h]) cache[h] = fetch(`/products/${h}.js`).then(r => (r.ok ? r.json() : null)).catch(() => null);
        await cache[h];
      }));
      const byLine = {};
      cart.items.forEach((i, idx) => { byLine[String(i.variant_id)] = { line: idx + 1, qty: i.quantity }; });
      body.innerHTML = handles.map(h => {
        const lines = cart.items.filter(i => i.handle === h);
        const first = lines[0];
        const prod = cache[h];
        const variants = (prod && prod.variants && prod.variants.length) ? prod.variants : lines.map(i => ({ id: i.variant_id, title: i.variant_title || i.title, price: i.price, available: true }));
        const rows = variants.map(v => {
          const hit = byLine[String(v.id)];
          const q = hit ? hit.qty : 0;
          const line = hit ? hit.line : 0;
          return `<div style="display:flex;align-items:center;gap:.6rem;margin-top:.45rem">`
            + `<span style="flex:1;min-width:0;font-size:.88rem">${v.title} — <strong>${fmtBRL(v.price)}</strong></span>`
            + `<span style="display:inline-flex;align-items:center;gap:.5rem"><button type="button" data-cdec="${line}" data-vid="${v.id}" data-qty="${q}" aria-label="Diminuir" style="width:30px;height:30px;border-radius:8px;border:1px solid var(--ac-border);background:#fff;font-size:1rem;cursor:pointer">−</button><strong style="min-width:1.2em;text-align:center">${q}</strong><button type="button" data-cinc="${line}" data-vid="${v.id}" data-qty="${q}" aria-label="Aumentar" style="width:30px;height:30px;border-radius:8px;border:1px solid var(--ac-border);background:#fff;font-size:1rem;cursor:pointer">+</button></span>`
            + (hit ? `<a href="/cart/change?line=${line}&quantity=0" style="font-size:.78rem">remover</a>` : ``)
            + `</div>`;
        }).join('');
        return `<div style="margin-bottom:1.1rem"><div style="display:flex;gap:.8rem;align-items:center">`
          + `<img src="${first.image}" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:10px">`
          + `<strong style="font-size:.92rem;flex:1">${first.product_title}</strong></div>${rows}</div>`;
      }).join('');
    }
    // Barra frete grátis R$149
    const bar = $('#AcFreeBar'), msg = $('#AcFreeMsg');
    if (bar && msg) {
      const total = cart.total_price / 100, goal = 149;
      const pct = Math.min(100, Math.round(total / goal * 100));
      bar.style.width = pct + '%';
      msg.textContent = total >= goal ? (window.AcStrings?.free_done || 'Frete GRÁTIS 🎉') : `Faltam ${(goal - total).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} pro frete grátis`;
    }
    const totalEl = $('#AcCartTotal');
    if (totalEl) totalEl.textContent = (cart.total_price/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  }
  fetch('/cart.js').then(r=>r.json()).then(updateDrawer).catch(()=>{});
  // Stepper por cor: + soma (cria a linha se era 0), - diminui (zera e some)
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-cinc],[data-cdec]');
    if (!btn || !btn.closest('#AcCartItems')) return;
    const line = +btn.dataset.cinc || +btn.dataset.cdec || 0;
    const vid = +btn.dataset.vid;
    const qty = +btn.dataset.qty || 0;
    try {
      if (btn.hasAttribute('data-cinc')) {
        if (line > 0) {
          updateDrawer(await fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line, quantity: qty + 1 }) }).then(r => r.json()));
        } else {
          await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: vid, quantity: 1 }] }) });
          updateDrawer(await fetch('/cart.js').then(r => r.json()));
        }
      } else {
        if (line > 0) {
          updateDrawer(await fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line, quantity: Math.max(0, qty - 1) }) }).then(r => r.json()));
        }
      }
    } catch (err) {}
  });

  // Galeria produto
  $$('.ac-thumbs img').forEach(t => t.addEventListener('click', () => {
    $$('.ac-thumbs img').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const main = $('#AcMainImg'); if (main) { main.removeAttribute('srcset'); main.src = t.dataset.full || t.src; }
  }));

  // Qty
  $$('[data-qty-minus]').forEach(b => b.addEventListener('click', () => {
    const inp = b.parentElement.querySelector('input'); if (inp && +inp.value > 1) inp.value = +inp.value - 1;
  }));
  $$('[data-qty-plus]').forEach(b => b.addEventListener('click', () => {
    const inp = b.parentElement.querySelector('input'); if (inp) inp.value = +inp.value + 1;
  }));

})();
