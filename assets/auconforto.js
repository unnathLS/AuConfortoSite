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
          <div style="flex:1"><strong style="font-size:.92rem">${i.product_title}</strong><br><small>${i.variant_title || ''} · Qtd ${i.quantity}</small><br><strong>${(i.final_line_price/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</strong></div>
          <a href="/cart/change?line=${cart.items.indexOf(i)+1}&quantity=0" style="font-size:.8rem">remover</a>
        </div>`).join('');
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
