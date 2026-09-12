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

  async function updateDrawer(cart) {
    cart = cart || await fetch('/cart.js').then(r => r.json());
    const countEls = $$('.ac-cart-count');
    countEls.forEach(el => el.textContent = cart.item_count);
    const body = $('#AcCartItems');
    if (!body) return;
    if (!cart.items.length) {
      body.innerHTML = `<p>${window.AcStrings?.empty || 'Carrinho vazio.'}</p><p><a class="ac-btn ac-btn--primary" href="/collections/pets">Ver os 4 mais vendidos</a></p>`;
    } else {
      body.innerHTML = cart.items.map(i => `
        <div style="display:flex;gap:.8rem;margin-bottom:1rem">
          <img src="${i.image}" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:10px">
          <div style="flex:1"><strong style="font-size:.92rem">${i.product_title}</strong><br><small>${i.variant_title || ''}</small><select data-variants-for="${i.handle}" data-line="${cart.items.indexOf(i)+1}" data-current="${i.variant_id}" data-qty="${i.quantity}" aria-label="Trocar cor ou modelo" style="max-width:100%;min-height:38px;border-radius:8px;border:1px solid var(--ac-border);background:#fff;padding:0 .5rem;margin:.25rem 0;font-size:.85rem"><option>Cor/modelo…</option></select><br><span style="display:inline-flex;align-items:center;gap:.55rem;margin:.25rem 0"><button type="button" data-dec="${cart.items.indexOf(i)+1}" data-qty="${i.quantity}" aria-label="Diminuir" style="width:30px;height:30px;border-radius:8px;border:1px solid var(--ac-border);background:#fff;font-size:1rem;cursor:pointer">−</button><strong>${i.quantity}</strong><button type="button" data-inc="${cart.items.indexOf(i)+1}" data-qty="${i.quantity}" aria-label="Aumentar" style="width:30px;height:30px;border-radius:8px;border:1px solid var(--ac-border);background:#fff;font-size:1rem;cursor:pointer">+</button></span><br><strong>${(i.final_line_price/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</strong></div>
          <a href="/cart/change?line=${cart.items.indexOf(i)+1}&quantity=0" style="font-size:.8rem">remover</a>
        </div>`).join('');
    }
    // Seletor de cor/modelo por linha
    try {
      const cache = updateDrawer._pcache || (updateDrawer._pcache = {});
      const sels = [...body.querySelectorAll('select[data-variants-for]')];
      const handles = [...new Set(sels.map(s => s.dataset.variantsFor).filter(Boolean))];
      await Promise.all(handles.map(async (h) => {
        if (!cache[h]) cache[h] = fetch(`/products/${h}.js`).then(r => (r.ok ? r.json() : null)).catch(() => null);
        const prod = await cache[h];
        sels.filter(s => s.dataset.variantsFor === h).forEach(s => {
          if (!prod || !prod.variants || prod.variants.length < 2) { s.remove(); return; }
          s.innerHTML = prod.variants.map(v => `<option value="${v.id}"${String(v.id) === String(s.dataset.current) ? ' selected' : ''}>${v.title} — ${(v.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>`).join('');
          s.onchange = async () => {
            const qty = +s.dataset.qty || 1;
            try {
              await fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line: +s.dataset.line, quantity: 0 }) });
              await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: +s.value, quantity: qty }] }) });
              updateDrawer(await fetch('/cart.js').then(r => r.json()));
            } catch (err) { updateDrawer(); }
          };
        });
      }));
    } catch (err) {}
    // Combinar: levar outra cor sem sair da gaveta
    try {
      const have = new Set(cart.items.map(x => String(x.variant_id)));
      const cache2 = updateDrawer._pcache || {};
      const rows = [];
      for (const h of Object.keys(cache2)) {
        const prod = cache2[h];
        if (!prod || !prod.variants || prod.variants.length < 2) continue;
        const missing = prod.variants.filter(v => !have.has(String(v.id)) && v.available !== false);
        missing.forEach(v => rows.push({ id: v.id, title: v.title, handle: h }));
      }
      let more = body.querySelector('#AcMoreColors');
      if (rows.length) {
        if (!more) { more = document.createElement('div'); more.id = 'AcMoreColors'; body.appendChild(more); }
        more.innerHTML = `<p style="font-weight:700;font-size:.88rem;margin:.6rem 0 .4rem">Combinar com outra cor</p>` + rows.map(r =>
          `<button type="button" data-addcolor="${r.id}" style="display:flex;width:100%;align-items:center;justify-content:space-between;gap:.6rem;background:#fff;border:1px solid var(--ac-border);border-radius:10px;padding:.5rem .7rem;margin-bottom:.4rem;cursor:pointer;font-size:.85rem"><span>+ ${r.title}</span><span>Adicionar</span></button>`
        ).join('');
        more.querySelectorAll('[data-addcolor]').forEach(b => b.onclick = async () => {
          try {
            await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: +b.dataset.addcolor, quantity: 1 }] }) });
            updateDrawer(await fetch('/cart.js').then(r => r.json()));
          } catch (err) {}
        });
      } else if (more) more.remove();
    } catch (err) {}
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
  // Stepper drawer: +1 / -1 sem sair do carrinho
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-inc],[data-dec]');
    if (!btn || !btn.closest('#AcCartItems')) return;
    const line = +(btn.dataset.inc || btn.dataset.dec);
    const qty = +btn.dataset.qty;
    const quantity = btn.hasAttribute('data-inc') ? qty + 1 : Math.max(0, qty - 1);
    const box = $('#AcCartItems');
    try {
      const cart = await fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line, quantity }) }).then(r => r.json());
      updateDrawer(cart);
    } catch (err) { if (box) box.style.opacity = 1; }
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
