window.PIDE_IMAGE_SETTINGS={};document.querySelectorAll('.product').forEach(c=>{const cfg=window.PIDE_IMAGE_SETTINGS[c.id];const img=c.querySelector('.product-image');if(cfg){img.style.transform=`scale(${cfg.scale||1})`;img.style.objectPosition=`${cfg.x||'center'} ${cfg.y||'center'}`}});

/* ==========================================================================
   CATEGORIAS DOS MODELOS — edite aqui para reclassificar qualquer produto.
   Valores aceitos: 'masculino' | 'feminino' | 'unissex'
   ========================================================================== */
window.PIDE_PRODUCT_CATEGORIES = {
  'PDE-001': 'feminino',  // Ossos
  'PDE-002': 'feminino',  // Geribá
  'PDE-003': 'feminino',  // Azeda
  'PDE-004': 'feminino',  // Ferradura
  'PDE-005': 'feminino',  // Timão
  'PDE-006': 'unissex',   // Manguinhos
  'PDE-007': 'feminino',  // Rasa
  'PDE-008': 'unissex',   // Tartaruga
  'PDE-009': 'masculino', // Cristalina
  'PDE-010': 'feminino',  // Sereia
  'PDE-011': 'masculino', // Bússola
  'PDE-012': 'feminino',  // Enseada
  'PDE-013': 'feminino',  // Brava
  'PDE-014': 'feminino',  // Zangada
  'PDE-015': 'feminino',  // Baía
  'PDE-016': 'masculino', // Orla
  'PDE-017': 'feminino',  // Maré
  'PDE-018': 'feminino',  // Arpoador
  'PDE-019': 'unissex',   // Vortex
  'PDE-020': 'unissex',   // Bravio
  'PDE-021': 'unissex',   // Maré
  'PDE-022': 'unissex',   // Arpão
  'PDE-023': 'unissex',   // Siroco
};
document.querySelectorAll('.product').forEach(function(p){
  const cat = window.PIDE_PRODUCT_CATEGORIES[p.id];
  if(cat) p.dataset.category = cat;
});

/* ==========================================================================
   DISPONIBILIDADE DOS MODELOS — edite aqui o status de cada produto.
   Valores aceitos: 'disponivel' | 'ultimas' | 'esgotado'
   Produtos não cadastrados aqui são tratados como 'disponivel' por padrão.
   Ao marcar um modelo como 'esgotado', ele continua visível no site, porém
   o botão "QUERO ESTE MODELO" é desativado automaticamente e um aviso
   discreto é exibido — não é necessário alterar nenhum outro código.
   ========================================================================== */
window.PIDE_PRODUCT_AVAILABILITY = {
  'PDE-001': 'disponivel',  // Ossos
  'PDE-002': 'disponivel',  // Geribá
  'PDE-003': 'ultimas',     // Azeda
  'PDE-004': 'disponivel',  // Ferradura
  'PDE-005': 'disponivel',  // Timão
  'PDE-006': 'disponivel',  // Manguinhos
  'PDE-007': 'esgotado',    // Rasa
  'PDE-008': 'disponivel',  // Tartaruga
  'PDE-009': 'disponivel',  // Cristalina
  'PDE-010': 'ultimas',     // Sereia
  'PDE-011': 'disponivel',  // Bússola
  'PDE-012': 'disponivel',  // Enseada
  'PDE-013': 'disponivel',  // Brava
  'PDE-014': 'disponivel',  // Zangada
  'PDE-015': 'disponivel',  // Baía
  'PDE-016': 'disponivel',  // Orla
  'PDE-017': 'disponivel',  // Maré
  'PDE-018': 'disponivel',  // Arpoador
  'PDE-019': 'disponivel',  // Vortex
  'PDE-020': 'disponivel',  // Bravio
  'PDE-021': 'disponivel',  // Maré
  'PDE-022': 'disponivel',  // Arpão
  'PDE-023': 'disponivel',  // Siroco
};

(function(){
  const STATUS_LABELS = {
    disponivel: 'Disponível',
    ultimas: 'Últimas Unidades',
    esgotado: 'Esgotado'
  };

  document.querySelectorAll('.product').forEach(function(p){
    const status = window.PIDE_PRODUCT_AVAILABILITY[p.id] || 'disponivel';
    p.dataset.availability = status;

    const numberEl = p.querySelector('.product-number');
    if(numberEl && !numberEl.querySelector('.availability-pill')){
      const pill = document.createElement('span');
      pill.className = 'availability-pill status-' + status;
      pill.innerHTML = `<span class="availability-dot"></span>${STATUS_LABELS[status] || STATUS_LABELS.disponivel}`;
      numberEl.appendChild(pill);
    }

    const wantBtn = p.querySelector('.want-btn');
    if(status === 'esgotado' && wantBtn){
      wantBtn.disabled = true;
      wantBtn.classList.add('is-disabled');
      wantBtn.dataset.originalLabel = wantBtn.textContent.trim();
      wantBtn.textContent = 'MODELO ESGOTADO';
    }
  });
})();

/* ==========================================================================
   TAGS DOS MODELOS — QUIZ "QUAL É O SEU PIDE?"
   Edite/adicione aqui as características de cada modelo (atual ou futuro).
   Cada modelo pode ter uma ou mais tags por categoria — quanto mais tags
   compatíveis com as respostas do quiz, maior a compatibilidade calculada.

   Categorias e valores sugeridos (não é obrigatório usar somente estes):
   estilo:        classico | moderno | ousado | minimalista
   formato:       redondo | quadrado | aviador | gatinho | retangular
   ocasiao:       praia | dia-a-dia | noite | esportivo
   personalidade: aventureira | sofisticada | descontraida | misteriosa

   Para cadastrar um novo modelo no quiz, basta adicionar uma nova entrada
   abaixo com o ID do produto (mesmo ID usado no HTML) e suas tags — nenhuma
   outra alteração de código é necessária.
   ========================================================================== */
window.PIDE_PRODUCT_TAGS = {
  'PDE-001': { estilo:['ousado','moderno'],        formato:['gatinho'],      ocasiao:['noite','dia-a-dia'],  personalidade:['misteriosa','sofisticada'] }, // Ossos
  'PDE-002': { estilo:['classico','minimalista'],  formato:['redondo'],      ocasiao:['praia','dia-a-dia'],  personalidade:['descontraida'] },            // Geribá
  'PDE-003': { estilo:['ousado'],                  formato:['gatinho'],      ocasiao:['noite'],               personalidade:['misteriosa'] },              // Azeda
  'PDE-004': { estilo:['classico'],                formato:['aviador'],      ocasiao:['dia-a-dia','esportivo'],personalidade:['aventureira'] },            // Ferradura
  'PDE-005': { estilo:['classico','moderno'],      formato:['aviador'],      ocasiao:['esportivo','praia'],   personalidade:['aventureira'] },             // Timão
  'PDE-006': { estilo:['minimalista'],             formato:['retangular'],   ocasiao:['dia-a-dia'],           personalidade:['descontraida'] },            // Manguinhos
  'PDE-007': { estilo:['minimalista','classico'],  formato:['redondo'],      ocasiao:['praia','dia-a-dia'],   personalidade:['descontraida'] },            // Rasa
  'PDE-008': { estilo:['moderno'],                 formato:['redondo'],      ocasiao:['praia','esportivo'],   personalidade:['aventureira'] },             // Tartaruga
  'PDE-009': { estilo:['moderno','minimalista'],   formato:['quadrado'],     ocasiao:['dia-a-dia'],           personalidade:['sofisticada'] },             // Cristalina
  'PDE-010': { estilo:['ousado','moderno'],        formato:['gatinho'],      ocasiao:['noite'],               personalidade:['misteriosa','sofisticada'] },// Sereia
  'PDE-011': { estilo:['classico'],                formato:['aviador'],      ocasiao:['esportivo','dia-a-dia'],personalidade:['aventureira'] },            // Bússola
  'PDE-012': { estilo:['classico','minimalista'],  formato:['redondo'],      ocasiao:['praia'],                personalidade:['descontraida'] },            // Enseada
  'PDE-013': { estilo:['ousado'],                  formato:['quadrado'],     ocasiao:['noite','esportivo'],   personalidade:['aventureira','misteriosa'] },// Brava
  'PDE-014': { estilo:['ousado','moderno'],        formato:['gatinho'],      ocasiao:['noite'],               personalidade:['misteriosa'] },              // Zangada
  'PDE-015': { estilo:['classico','minimalista'],  formato:['redondo'],      ocasiao:['praia','dia-a-dia'],   personalidade:['descontraida','sofisticada'] },// Baía
  'PDE-016': { estilo:['classico'],                formato:['quadrado'],     ocasiao:['dia-a-dia'],           personalidade:['sofisticada'] },             // Orla
  'PDE-017': { estilo:['moderno'],                 formato:['retangular'],   ocasiao:['dia-a-dia','esportivo'],personalidade:['aventureira'] },            // Maré
  'PDE-018': { estilo:['moderno','minimalista'],   formato:['quadrado'],     ocasiao:['esportivo','praia'],   personalidade:['aventureira'] },             // Arpoador
  'PDE-019': { estilo:['moderno','ousado'],        formato:['retangular'],   ocasiao:['esportivo'],           personalidade:['aventureira'] },             // Vortex
  'PDE-020': { estilo:['moderno','ousado'],        formato:['retangular'],   ocasiao:['esportivo'],           personalidade:['aventureira'] },             // Bravio
  'PDE-021': { estilo:['moderno','ousado'],        formato:['retangular'],   ocasiao:['esportivo'],           personalidade:['aventureira'] },             // Maré
  'PDE-022': { estilo:['moderno','ousado'],        formato:['retangular'],   ocasiao:['esportivo'],           personalidade:['aventureira'] },             // Arpão
  'PDE-023': { estilo:['moderno','ousado'],        formato:['retangular'],   ocasiao:['esportivo'],           personalidade:['aventureira'] },             // Siroco
};

/* Integração "QUERO ESTE MODELO" -> adiciona ao carrinho */
(function(){
  document.querySelectorAll('.want-btn').forEach(function(btn){
    if(btn.id === 'cartWhatsBtn') return;
    btn.addEventListener('click', function(){
      const product = btn.closest('.product');
      if(!product || product.dataset.availability === 'esgotado') return;
      const cartBtn = product.querySelector('.cart-btn');
      if(cartBtn && !cartBtn.classList.contains('is-active')) cartBtn.click();
      const toggle = document.getElementById('cartToggle');
      if(toggle) toggle.click();
    });
  });
})();
/* ==========================================================================
   FILTRO "DROP ATUAL" — Todos | Óculos Esportivos
   Para marcar um modelo do Drop Atual como esportivo, adicione o código
   dele na lista abaixo.
   ========================================================================== */
window.PIDE_ATUAL_ESPORTIVOS = ['PDE-019','PDE-020','PDE-021','PDE-022','PDE-023'];

(function(){
  const grid = document.getElementById('atualProductsGrid');
  const filterBar = document.querySelector('.drop-atual-filter');
  if(!grid || !filterBar) return;

  grid.querySelectorAll('.product').forEach(function(p){
    p.dataset.esportivo = window.PIDE_ATUAL_ESPORTIVOS.indexOf(p.id) > -1 ? 'true' : 'false';
  });

  filterBar.querySelectorAll('.atual-filter-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBar.querySelectorAll('.atual-filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const wantEsportivos = btn.dataset.atualfilter === 'esportivos';
      grid.querySelectorAll('.product').forEach(function(p){
        p.style.display = (!wantEsportivos || p.dataset.esportivo === 'true') ? '' : 'none';
      });
    });
  });
})();

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

/* Polimento visual: revelação suave ao rolar + navbar com sombra */
(function(){
  const revealTargets = document.querySelectorAll('.intro, .product, footer, .empty-drop');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in-view'));
  }

  const nav = document.querySelector('nav');
  if(nav){
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

/* Filtro de categoria (Todos | Masculino | Feminino | Unissex) + Busca por nome/código */
(function(){
  const FADE_MS = 380;
  const filterBar = document.querySelector('.category-filter');
  const searchInput = document.getElementById('productSearch');
  const searchClear = document.getElementById('productSearchClear');
  const noResults = document.getElementById('noResultsMsg');
  if(!filterBar) return;

  const products = Array.from(document.querySelectorAll('#tab-futuro .product'));
  const productData = products.map(function(p){
    const nameEl = p.querySelector('.product-copy h2');
    return {
      el: p,
      name: nameEl ? nameEl.textContent.trim().toLowerCase() : '',
      code: p.id.toLowerCase()
    };
  });

  let currentFilter = 'todos';
  let currentSearch = '';

  function matchesSearch(data, term){
    if(!term) return true;
    return data.name.indexOf(term) > -1 || data.code.indexOf(term) > -1;
  }

  function applyFilters(){
    const term = currentSearch.trim().toLowerCase();
    let visibleCount = 0;

    productData.forEach(function(data){
      const p = data.el;
      const matchesCategory = currentFilter === 'todos' || p.dataset.category === currentFilter;
      const matches = matchesCategory && matchesSearch(data, term);

      if(matches){
        visibleCount++;
        if(p.style.display === 'none'){
          p.style.display = '';
          void p.offsetWidth; // força reflow para reiniciar a transição
        }
        p.classList.remove('filter-out');
      } else {
        if(p.classList.contains('filter-out')) return;
        p.classList.add('filter-out');
        window.setTimeout(function(){
          if(p.classList.contains('filter-out')) p.style.display = 'none';
        }, FADE_MS);
      }
    });

    if(noResults) noResults.classList.toggle('is-visible', visibleCount === 0);
  }

  filterBar.querySelectorAll('.filter-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  if(searchInput){
    searchInput.addEventListener('input', function(){
      currentSearch = searchInput.value;
      if(searchClear) searchClear.classList.toggle('is-visible', currentSearch.length > 0);
      applyFilters();
    });
  }

  if(searchClear){
    searchClear.addEventListener('click', function(){
      currentSearch = '';
      if(searchInput){
        searchInput.value = '';
        searchInput.focus();
      }
      searchClear.classList.remove('is-visible');
      applyFilters();
    });
  }
})();

/* ==========================================================================
   FASE 2 — FAVORITOS
   ========================================================================== */
(function(){
  const STORAGE_KEY = 'pide_favoritos';
  const WHATSAPP_NUMBER = '5522992657080';

  const favToggle = document.getElementById('favToggle');
  const favOverlay = document.getElementById('favOverlay');
  const favClose = document.getElementById('favClose');
  const favList = document.getElementById('favList');
  const favCountEl = document.getElementById('favCount');
  const favWhatsBtn = document.getElementById('favWhatsBtn');

  if(!favToggle || !favOverlay) return;

  function loadFavorites(){
    try{
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){
      return [];
    }
  }

  function saveFavorites(favs){
    try{
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    }catch(e){ /* localStorage indisponível: favoritos seguem apenas na sessão atual */ }
  }

  let favorites = loadFavorites();

  function isFavorite(id){
    return favorites.some(f => f.id === id);
  }

  function getProductData(id){
    const article = document.getElementById(id);
    if(!article) return { id: id, name: '', img: '' };
    const nameEl = article.querySelector('.product-copy h2');
    const imgEl = article.querySelector('.product-image');
    return {
      id: id,
      name: nameEl ? nameEl.textContent.trim() : id,
      img: imgEl ? imgEl.getAttribute('src') : ''
    };
  }

  function syncFavButtons(){
    document.querySelectorAll('.fav-btn').forEach(function(btn){
      const active = isFavorite(btn.dataset.id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateCount(){
    const count = favorites.length;
    favCountEl.textContent = count;
    favCountEl.classList.toggle('is-zero', count === 0);
    favToggle.classList.toggle('has-favs', count > 0);
    favToggle.setAttribute('aria-label', count > 0 ? `Ver meus favoritos (${count})` : 'Ver meus favoritos');
  }

  function renderFavList(){
    favList.innerHTML = '';
    favorites.forEach(function(fav){
      const article = document.getElementById(fav.id);
      const status = article ? (article.dataset.availability || 'disponivel') : 'disponivel';
      const statusBadge = status === 'esgotado'
        ? '<span class="fav-status-badge">Esgotado</span>'
        : (status === 'ultimas' ? '<span class="fav-status-badge is-ultimas">Últimas unidades</span>' : '');
      const item = document.createElement('div');
      item.className = 'fav-item';
      item.innerHTML = `
        <img src="${fav.img || ''}" alt="Óculos PIDE ${fav.name}">
        <div class="fav-item-info">
          <h4>${fav.name}</h4>
          <span>${fav.id}</span>
          ${statusBadge}
        </div>
        <button class="fav-remove" type="button" data-id="${fav.id}" aria-label="Remover ${fav.name} dos favoritos">&times;</button>
      `;
      favList.appendChild(item);
    });
    favOverlay.classList.toggle('has-items', favorites.length > 0);
    if(favWhatsBtn) favWhatsBtn.disabled = favorites.length === 0;
  }

  function refreshUI(){
    syncFavButtons();
    updateCount();
    renderFavList();
  }

  function toggleFavorite(id, btn){
    const idx = favorites.findIndex(f => f.id === id);
    if(idx > -1){
      favorites.splice(idx, 1);
    } else {
      favorites.push(getProductData(id));
      if(btn){
        btn.classList.add('fav-bump');
        window.setTimeout(() => btn.classList.remove('fav-bump'), 400);
      }
      favCountEl.classList.add('fav-bump');
      window.setTimeout(() => favCountEl.classList.remove('fav-bump'), 400);
    }
    saveFavorites(favorites);
    refreshUI();
  }

  document.querySelectorAll('.fav-btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(btn.dataset.id, btn);
    });
  });

  favList.addEventListener('click', function(e){
    const removeBtn = e.target.closest('.fav-remove');
    if(!removeBtn) return;
    toggleFavorite(removeBtn.dataset.id, null);
  });

  function openPanel(){
    favOverlay.classList.add('is-open');
    favOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePanel(){
    favOverlay.classList.remove('is-open');
    favOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  favToggle.addEventListener('click', openPanel);
  if(favClose) favClose.addEventListener('click', closePanel);
  favOverlay.addEventListener('click', function(e){
    if(e.target === favOverlay) closePanel();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && favOverlay.classList.contains('is-open')) closePanel();
  });

  if(favWhatsBtn){
    favWhatsBtn.addEventListener('click', function(){
      if(favorites.length === 0) return;
      const lines = favorites.map(f => `- ${f.name} — ${f.id}`).join('\n');
      const message = `Olá! Tenho interesse nestes modelos da PIDE:\n${lines}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  refreshUI();
})();

/* ==========================================================================
   FASE 7 — CARRINHO DE INTERESSE
   Compatível com futuros modelos: qualquer produto com um .cart-btn no
   markup (data-id + data-name) já funciona automaticamente, sem exigir
   alterações nesta lógica.
   ========================================================================== */
(function(){
  const STORAGE_KEY = 'pide_carrinho';
  const WHATSAPP_NUMBER = '5522992657080';

  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartList = document.getElementById('cartList');
  const cartCountEl = document.getElementById('cartCount');
  const cartWhatsBtn = document.getElementById('cartWhatsBtn');

  if(!cartToggle || !cartOverlay) return;

  function loadCart(){
    try{
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){
      return [];
    }
  }

  function saveCart(items){
    try{
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }catch(e){ /* localStorage indisponível: carrinho segue apenas na sessão atual */ }
  }

  let cart = loadCart();

  function isInCart(id){
    return cart.some(c => c.id === id);
  }

  function getProductData(id){
    const article = document.getElementById(id);
    if(!article) return { id: id, name: '', img: '' };
    const nameEl = article.querySelector('.product-copy h2');
    const imgEl = article.querySelector('.product-image');
    return {
      id: id,
      name: nameEl ? nameEl.textContent.trim() : id,
      img: imgEl ? imgEl.getAttribute('src') : ''
    };
  }

  function syncCartButtons(){
    document.querySelectorAll('.cart-btn').forEach(function(btn){
      const article = btn.closest('.product');
      const unavailable = article && article.dataset.availability === 'esgotado';
      btn.classList.toggle('is-unavailable', !!unavailable);
      btn.disabled = !!unavailable;
      btn.setAttribute('aria-label', unavailable ? 'Modelo esgotado — indisponível para o carrinho' : 'Adicionar ao carrinho');
      if(unavailable) return;
      const active = isInCart(btn.dataset.id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function updateCount(){
    const count = cart.length;
    cartCountEl.textContent = count;
    cartCountEl.classList.toggle('is-zero', count === 0);
    cartToggle.classList.toggle('has-favs', count > 0);
    cartToggle.setAttribute('aria-label', count > 0 ? `Ver carrinho (${count})` : 'Ver carrinho');
  }

  function renderCartList(){
    cartList.innerHTML = '';
    cart.forEach(function(item){
      const el = document.createElement('div');
      el.className = 'fav-item';
      el.innerHTML = `
        <img src="${item.img || ''}" alt="Óculos PIDE ${item.name}">
        <div class="fav-item-info">
          <h4>${item.name}</h4>
          <span>${item.id}</span>
        </div>
        <button class="fav-remove" type="button" data-id="${item.id}" aria-label="Remover ${item.name} do carrinho">&times;</button>
      `;
      cartList.appendChild(el);
    });
    cartOverlay.classList.toggle('has-items', cart.length > 0);
    if(cartWhatsBtn) cartWhatsBtn.disabled = cart.length === 0;
  }

  function refreshUI(){
    syncCartButtons();
    updateCount();
    renderCartList();
  }

  function toggleCartItem(id, btn){
    const article = document.getElementById(id);
    if(article && article.dataset.availability === 'esgotado') return;

    const idx = cart.findIndex(c => c.id === id);
    if(idx > -1){
      cart.splice(idx, 1);
    } else {
      cart.push(getProductData(id));
      if(btn){
        btn.classList.add('cart-bump');
        window.setTimeout(() => btn.classList.remove('cart-bump'), 400);
      }
      cartCountEl.classList.add('fav-bump');
      window.setTimeout(() => cartCountEl.classList.remove('fav-bump'), 400);
    }
    saveCart(cart);
    refreshUI();
  }

  document.querySelectorAll('.cart-btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      if(btn.disabled) return;
      toggleCartItem(btn.dataset.id, btn);
    });
  });

  cartList.addEventListener('click', function(e){
    const removeBtn = e.target.closest('.fav-remove');
    if(!removeBtn) return;
    toggleCartItem(removeBtn.dataset.id, null);
  });

  function openPanel(){
    cartOverlay.classList.add('is-open');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePanel(){
    cartOverlay.classList.remove('is-open');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartToggle.addEventListener('click', openPanel);
  if(cartClose) cartClose.addEventListener('click', closePanel);
  cartOverlay.addEventListener('click', function(e){
    if(e.target === cartOverlay) closePanel();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && cartOverlay.classList.contains('is-open')) closePanel();
  });

  if(cartWhatsBtn){
    cartWhatsBtn.addEventListener('click', async function(){
      if(cart.length === 0) return;
      const originalLabel = cartWhatsBtn.textContent;
      cartWhatsBtn.disabled = true;
      cartWhatsBtn.textContent = 'PREPARANDO PAGAMENTO...';
      try{
        const response = await fetch(window.PIDE_CHECKOUT_API || '/api/create-preference', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ items: cart.map(c => ({ id: c.id, quantity: 1 })) })
        });
        const data = await response.json();
        if(!response.ok || !data.init_point) throw new Error(data.error || 'Não foi possível iniciar o pagamento.');
        window.location.href = data.init_point;
      }catch(error){
        console.error(error);
        alert(error.message || 'Não foi possível iniciar o pagamento. Tente novamente.');
        cartWhatsBtn.disabled = false;
        cartWhatsBtn.textContent = originalLabel;
      }
    });
  }

  refreshUI();
})();

/* ==========================================================================
   FASE 8 — FAQ
   Edite/adicione perguntas e respostas aqui — a lista é renderizada
   automaticamente, sem exigir alterações no HTML ou na lógica abaixo.
   Textos marcados com [ ] indicam informações que ainda precisam ser
   confirmadas/preenchidas pela loja.
   ========================================================================== */
window.PIDE_FAQ_ITEMS = [
  {
    question: 'Os óculos possuem proteção UV?',
    answer: 'A proteção UV pode variar de acordo com a lente de cada modelo. Consulte a ficha do modelo desejado ou fale com a gente pelo WhatsApp para confirmar essa informação antes da compra.'
  },
  {
    question: 'Os óculos são polarizados?',
    answer: 'Alguns modelos podem ter lentes polarizadas e outros não. Para saber se um modelo específico é polarizado, entre em contato pelo WhatsApp e confirmaremos com prazer.'
  },
  {
    question: 'Como posso comprar?',
    answer: 'Navegue pela coleção, escolha o(s) modelo(s) que mais combinam com você e clique em "QUERO ESTE MODELO" ou adicione ao seu Carrinho de Interesse. Você será direcionado(a) ao nosso WhatsApp para finalizar os detalhes da compra com a equipe PIDE.'
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: '[Formas de pagamento a confirmar] — fale com a gente pelo WhatsApp para saber as opções disponíveis no momento da sua compra.'
  },
  {
    question: 'Vocês fazem entrega?',
    answer: '[Informações de entrega a confirmar] — entre em contato pelo WhatsApp para verificarmos a disponibilidade de envio para a sua região.'
  },
  {
    question: 'Como entro em contato?',
    answer: 'Você pode falar com a gente pelo WhatsApp (22) 99265-7080, por e-mail em pidebuzios@gmail.com, ou pelo Instagram @pide.buzios.'
  },
];

(function(){
  const faqList = document.getElementById('faqList');
  if(!faqList || !Array.isArray(window.PIDE_FAQ_ITEMS)) return;

  window.PIDE_FAQ_ITEMS.forEach(function(item, index){
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';

    const questionId = `faqQuestion-${index}`;
    const answerId = `faqAnswer-${index}`;

    faqItem.innerHTML = `
      <button class="faq-question" id="${questionId}" type="button" aria-expanded="false" aria-controls="${answerId}">
        <span>${item.question}</span>
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-answer" id="${answerId}" role="region" aria-labelledby="${questionId}">
        <div class="faq-answer-inner">${item.answer}</div>
      </div>
    `;
    faqList.appendChild(faqItem);
  });

  faqList.addEventListener('click', function(e){
    const btn = e.target.closest('.faq-question');
    if(!btn) return;
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('is-open');

    if(isOpen){
      answer.style.maxHeight = answer.scrollHeight + 'px';
      requestAnimationFrame(function(){
        answer.style.maxHeight = '0px';
      });
      item.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });

  // Ajusta a altura da resposta aberta ao redimensionar a janela
  window.addEventListener('resize', function(){
    faqList.querySelectorAll('.faq-item.is-open .faq-answer').forEach(function(answer){
      answer.style.maxHeight = answer.scrollHeight + 'px';
    });
  });
})();

/* ==========================================================================
   FASE 4 — QUIZ "QUAL É O SEU PIDE?"
   Sistema expansível: as perguntas comparam respostas com as tags de
   window.PIDE_PRODUCT_TAGS. Para incluir um novo modelo nas recomendações,
   basta cadastrar suas tags lá em cima — nenhum código aqui precisa mudar.
   ========================================================================== */
(function(){
  const openBtn = document.getElementById('quizOpenBtn');
  const overlay = document.getElementById('quizOverlay');
  const closeBtn = document.getElementById('quizClose');
  const questionsWrap = document.getElementById('quizQuestions');
  const progressBar = document.getElementById('quizProgressBar');
  const resultPanel = document.getElementById('quizResult');
  const resultList = document.getElementById('quizResultList');
  const restartBtn = document.getElementById('quizRestartBtn');

  if(!openBtn || !overlay) return;

  /* Perguntas: cada opção soma tags de uma categoria (estilo, formato,
     ocasiao, personalidade). Adicionar/editar perguntas aqui não afeta o
     restante do site. */
  const QUESTIONS = [
    {
      eyebrow: 'PERGUNTA 1 · ESTILO',
      question: 'Como você descreveria seu estilo no dia a dia?',
      options: [
        { label: 'Clássico e atemporal', axis: 'estilo', tag: 'classico' },
        { label: 'Moderno e descolado', axis: 'estilo', tag: 'moderno' },
        { label: 'Ousado, gosto de chamar atenção', axis: 'estilo', tag: 'ousado' },
        { label: 'Minimalista, menos é mais', axis: 'estilo', tag: 'minimalista' },
      ]
    },
    {
      eyebrow: 'PERGUNTA 2 · FORMATO',
      question: 'Qual formato de armação mais combina com você?',
      options: [
        { label: 'Redondo', axis: 'formato', tag: 'redondo' },
        { label: 'Quadrado', axis: 'formato', tag: 'quadrado' },
        { label: 'Aviador', axis: 'formato', tag: 'aviador' },
        { label: 'Gatinho', axis: 'formato', tag: 'gatinho' },
      ]
    },
    {
      eyebrow: 'PERGUNTA 3 · OCASIÃO',
      question: 'Para qual ocasião você mais quer usar o óculos?',
      options: [
        { label: 'Um dia de praia', axis: 'ocasiao', tag: 'praia' },
        { label: 'O dia a dia, para qualquer lugar', axis: 'ocasiao', tag: 'dia-a-dia' },
        { label: 'Uma noite especial', axis: 'ocasiao', tag: 'noite' },
        { label: 'Atividades ao ar livre / esporte', axis: 'ocasiao', tag: 'esportivo' },
      ]
    },
    {
      eyebrow: 'PERGUNTA 4 · PERSONALIDADE',
      question: 'Qual palavra mais combina com sua personalidade?',
      options: [
        { label: 'Aventureira', axis: 'personalidade', tag: 'aventureira' },
        { label: 'Sofisticada', axis: 'personalidade', tag: 'sofisticada' },
        { label: 'Descontraída', axis: 'personalidade', tag: 'descontraida' },
        { label: 'Misteriosa', axis: 'personalidade', tag: 'misteriosa' },
      ]
    },
  ];

  let currentIndex = 0;
  const answers = {}; // { axis: tag }

  function buildQuestions(){
    questionsWrap.innerHTML = '';
    QUESTIONS.forEach(function(q, i){
      const qEl = document.createElement('div');
      qEl.className = 'quiz-question';
      qEl.dataset.index = i;

      const optsHtml = q.options.map(function(opt){
        return `<button class="quiz-option" type="button" data-axis="${opt.axis}" data-tag="${opt.tag}">${opt.label}</button>`;
      }).join('');

      qEl.innerHTML = `
        <div class="quiz-question-eyebrow">${q.eyebrow}</div>
        <h4>${q.question}</h4>
        <div class="quiz-options">${optsHtml}</div>
        <div class="quiz-nav">
          <button class="quiz-back-btn" type="button" data-action="back" ${i === 0 ? 'disabled' : ''}>Voltar</button>
        </div>
      `;
      questionsWrap.appendChild(qEl);
    });
  }

  function showQuestion(index){
    currentIndex = index;
    questionsWrap.querySelectorAll('.quiz-question').forEach(function(el){
      el.classList.toggle('is-active', Number(el.dataset.index) === index);
    });
    resultPanel.classList.remove('is-active');
    updateProgress();
  }

  function updateProgress(){
    const pct = (currentIndex / QUESTIONS.length) * 100;
    progressBar.style.width = pct + '%';
  }

  function handleOptionClick(e){
    const btn = e.target.closest('.quiz-option');
    if(!btn) return;
    const question = btn.closest('.quiz-question');
    question.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('is-selected'));
    btn.classList.add('is-selected');

    answers[btn.dataset.axis] = btn.dataset.tag;

    window.setTimeout(function(){
      if(currentIndex < QUESTIONS.length - 1){
        showQuestion(currentIndex + 1);
      } else {
        showResults();
      }
    }, 260);
  }

  function handleBackClick(e){
    const btn = e.target.closest('[data-action="back"]');
    if(!btn) return;
    if(currentIndex > 0) showQuestion(currentIndex - 1);
  }

  /* Calcula compatibilidade de cada produto cadastrado em
     window.PIDE_PRODUCT_TAGS com as respostas do usuário. */
  function computeRecommendations(){
    const tagsMap = window.PIDE_PRODUCT_TAGS || {};
    const scored = Object.keys(tagsMap).map(function(id){
      const tags = tagsMap[id] || {};
      let score = 0;
      Object.keys(answers).forEach(function(axis){
        const chosenTag = answers[axis];
        const productTagsForAxis = tags[axis] || [];
        if(productTagsForAxis.indexOf(chosenTag) > -1) score++;
      });
      return { id: id, score: score };
    });

    scored.sort(function(a, b){ return b.score - a.score; });

    const withMatches = scored.filter(s => s.score > 0);
    const pool = withMatches.length > 0 ? withMatches : scored;

    return pool.slice(0, 3);
  }

  function showResults(){
    const recs = computeRecommendations();
    resultList.innerHTML = '';

    recs.forEach(function(rec){
      const article = document.getElementById(rec.id);
      if(!article) return;
      const name = article.querySelector('.product-copy h2');
      const img = article.querySelector('.product-image');

      const card = document.createElement('div');
      card.className = 'quiz-result-card';
      card.innerHTML = `
        <img src="${img ? img.getAttribute('src') : ''}" alt="Óculos PIDE ${name ? name.textContent.trim() : ''}">
        <div class="quiz-result-card-body">
          <span>${rec.id}</span>
          <h4>${name ? name.textContent.trim() : ''}</h4>
          <button class="quiz-view-btn" type="button" data-target="${rec.id}">VER MODELO</button>
        </div>
      `;
      resultList.appendChild(card);
    });

    questionsWrap.querySelectorAll('.quiz-question').forEach(el => el.classList.remove('is-active'));
    resultPanel.classList.add('is-active');
    progressBar.style.width = '100%';
  }

  resultList.addEventListener('click', function(e){
    const btn = e.target.closest('.quiz-view-btn');
    if(!btn) return;
    goToProduct(btn.dataset.target);
  });

  function goToProduct(id){
    const article = document.getElementById(id);
    if(!article) return;

    closeQuiz();

    // Garante que a aba correta (Drop Atual ou Drop Futuro) esteja ativa
    const isAtual = !!article.closest('#tab-atual');
    const targetTabBtn = document.querySelector(
      isAtual ? '.tab-btn[data-tab="tab-atual"]' : '.tab-btn[data-tab="tab-futuro"]'
    );
    if(targetTabBtn && !targetTabBtn.classList.contains('active')) targetTabBtn.click();

    if(isAtual){
      const atualTodosBtn = document.querySelector('.atual-filter-btn[data-atualfilter="todos"]');
      if(atualTodosBtn && !atualTodosBtn.classList.contains('active')) atualTodosBtn.click();
    } else {
      const filterTodosBtn = document.querySelector('.filter-btn[data-filter="todos"]');
      if(filterTodosBtn && !filterTodosBtn.classList.contains('active')) filterTodosBtn.click();
    }

    // Limpa a busca, caso um termo esteja escondendo o modelo recomendado
    const searchInput = document.getElementById('productSearch');
    const searchClear = document.getElementById('productSearchClear');
    if(searchInput && searchInput.value){
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    }
    if(searchClear) searchClear.classList.remove('is-visible');

    window.setTimeout(function(){
      article.scrollIntoView({ behavior: 'smooth', block: 'center' });
      article.classList.add('quiz-highlight');
      window.setTimeout(() => article.classList.remove('quiz-highlight'), 2200);
    }, 120);
  }

  function resetQuiz(){
    Object.keys(answers).forEach(k => delete answers[k]);
    questionsWrap.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('is-selected'));
    showQuestion(0);
  }

  function openQuiz(){
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    resetQuiz();
  }

  function closeQuiz(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  buildQuestions();
  questionsWrap.addEventListener('click', function(e){
    handleOptionClick(e);
    handleBackClick(e);
  });

  openBtn.addEventListener('click', openQuiz);
  if(closeBtn) closeBtn.addEventListener('click', closeQuiz);
  if(restartBtn) restartBtn.addEventListener('click', resetQuiz);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) closeQuiz();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('is-open')) closeQuiz();
  });
})();
/* ---------- GALERIA DE FOTOS POR PRODUTO ---------- */
(function(){
  document.querySelectorAll('.thumb-row').forEach(function(row){
    var photoFrame = row.previousElementSibling;
    if(!photoFrame || !photoFrame.classList.contains('photo-frame')) return;
    var mainImg = photoFrame.querySelector('[data-gallery-main]');
    if(!mainImg) return;
    row.addEventListener('click', function(e){
      var thumb = e.target.closest('.thumb');
      if(!thumb) return;
      mainImg.src = thumb.src;
      row.querySelectorAll('.thumb').forEach(function(t){ t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });
})();
