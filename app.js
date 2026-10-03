const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const money = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: STORE.currency
}).format(value);

const wa = (text) =>
  `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;

const conditionLabel = {
  novo: 'Novo',
  seminovo: 'Seminovo',
  usado: 'Usado'
};

const icons = {
  Eletrônicos: '⚡',
  Ferramentas: '🧰',
  Informática: '💻',
  Games: '🎮',
  Seminovos: '♻️',
  Serviços: '🔧'
};

let interest = JSON.parse(
  localStorage.getItem('garagem_interest') || '[]'
);

function saveInterest() {
  localStorage.setItem(
    'garagem_interest',
    JSON.stringify(interest)
  );

  updateDrawer();
}

function productById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* ======================================
   MÍDIA
====================================== */

function getMedia(p) {

  // Se existir media, usa o novo sistema
  if (Array.isArray(p.media) && p.media.length > 0) {
    return p.media;
  }

  // Compatibilidade com produtos antigos
  if (p.image) {
    return [p.image];
  }

  return [];
}

function isVideo(src) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function mediaItem(src, productName) {

  if (isVideo(src)) {
    return `
      <video
        src="${src}"
        controls
        playsinline
        preload="metadata"
        aria-label="Vídeo de ${productName}">
      </video>
    `;
  }

  return `
    <img
      src="${src}"
      alt="${productName}"
      loading="lazy">
  `;
}

/* ======================================
   CARROSSEL
====================================== */

function carouselFor(p, extraClass = '') {

  const media = getMedia(p);

  if (!media.length) {
    return `
      <div class="placeholder">
        <span>${icons[p.category] || '📦'}</span>
        <small>Foto do produto</small>
      </div>
    `;
  }

  if (media.length === 1) {
    return `
      <div class="media-carousel single ${extraClass}">
        <div class="media-slide active">
          ${mediaItem(media[0], p.name)}
        </div>
      </div>
    `;
  }

  return `
    <div
      class="media-carousel ${extraClass}"
      data-carousel>

      <div class="media-track">

        ${media.map((src, index) => `
          <div
            class="media-slide ${index === 0 ? 'active' : ''}"
            data-slide="${index}">

            ${mediaItem(src, p.name)}

          </div>
        `).join('')}

      </div>

      <button
        class="media-prev"
        type="button"
        aria-label="Mídia anterior">
        ‹
      </button>

      <button
        class="media-next"
        type="button"
        aria-label="Próxima mídia">
        ›
      </button>

      <div class="media-dots">
        ${media.map((src, index) => `
          <button
            type="button"
            class="media-dot ${index === 0 ? 'active' : ''}"
            data-dot="${index}"
            aria-label="Ver mídia ${index + 1}">
          </button>
        `).join('')}
      </div>

    </div>
  `;
}

function setupCarousel(carousel) {

  const slides = [...carousel.querySelectorAll('.media-slide')];
  const dots = [...carousel.querySelectorAll('.media-dot')];
  const prev = carousel.querySelector('.media-prev');
  const next = carousel.querySelector('.media-next');

  if (slides.length <= 1) return;

  let current = 0;

  function show(index) {

    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    // Pausa vídeos que saíram da tela
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');

      if (video && i !== current) {
        video.pause();
      }
    });
  }

  prev?.addEventListener('click', (e) => {
    e.stopPropagation();
    show(current - 1);
  });

  next?.addEventListener('click', (e) => {
    e.stopPropagation();
    show(current + 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      show(i);
    });
  });

  // Arrastar no celular
  let startX = 0;
  let endX = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {

    endX = e.changedTouches[0].clientX;

    const distance = endX - startX;

    if (Math.abs(distance) < 40) return;

    if (distance < 0) {
      show(current + 1);
    } else {
      show(current - 1);
    }

  }, { passive: true });
}

function setupAllCarousels() {
  $$('[data-carousel]').forEach(setupCarousel);
}

/* ======================================
   IMAGEM / MÍDIA DO PRODUTO
====================================== */

function imageFor(p) {
  return carouselFor(p);
}

/* ======================================
   CARD DO PRODUTO
====================================== */

function productCard(p) {

  const available = p.stock > 0;

  return `
    <article class="product-card">

      <div class="product-image">

        ${imageFor(p)}

        <span class="badge">
          ${p.badge || conditionLabel[p.condition]}
        </span>

      </div>

      <div class="product-body">

        <div class="product-cat">
          ${icons[p.category] || '•'} ${p.category}
        </div>

        <h3>${p.name}</h3>

        <p>${p.description}</p>

        <div class="condition">
          ${available ? '● Disponível' : '● Vendido'}
          · ${conditionLabel[p.condition]}
        </div>

        <div class="product-bottom">

          <strong>${money(p.price)}</strong>

          <button
            class="interest-btn"
            data-id="${p.id}"
            ${!available ? 'disabled' : ''}>

            ${available ? 'Tenho interesse' : 'Vendido'}

          </button>

        </div>

        <button
          class="details-link"
          data-details="${p.id}">

          Ver detalhes →

        </button>

      </div>

    </article>
  `;
}

/* ======================================
   CATEGORIAS
====================================== */

function renderCategories() {

  const cats = [
    ...new Set(PRODUCTS.map(p => p.category))
  ];

  $('#categoryFilter').innerHTML =
    '<option value="todos">Todas as categorias</option>' +
    cats
      .map(c => `<option value="${c}">${c}</option>`)
      .join('');

  $('#categoryRow').innerHTML =
    cats
      .map(c => `
        <button
          class="category-pill"
          data-cat="${c}">

          <span>${icons[c] || '📦'}</span>
          ${c}

        </button>
      `)
      .join('');
}

/* ======================================
   PRODUTOS
====================================== */

function renderProducts() {

  const q =
    $('#search')?.value.toLowerCase().trim() || '';

  const cat = $('#categoryFilter').value;
  const cond = $('#conditionFilter').value;

  const list = PRODUCTS.filter(p =>

    (!q ||
      `${p.name} ${p.description} ${p.category}`
        .toLowerCase()
        .includes(q)
    ) &&

    (cat === 'todos' || p.category === cat) &&

    (cond === 'todos' || p.condition === cond)

  );

  $('#productGrid').innerHTML =
    list.map(productCard).join('');

  $('#emptyState').hidden = list.length > 0;

  $('#stockNote').textContent =
    `${PRODUCTS.filter(p => p.stock > 0).length} produtos cadastrados`;

  bindProductEvents();
  setupAllCarousels();
}

/* ======================================
   OFERTAS
====================================== */

function renderOffers() {

  const offers =
    PRODUCTS
      .filter(p => p.featured && p.stock > 0)
      .slice(0, 3);

  $('#offerGrid').innerHTML =
    offers.map(p => `

      <article class="offer-card">

        <div class="offer-img">
          ${imageFor(p)}
        </div>

        <div>

          <span>${p.badge || 'ACHADO'}</span>

          <h3>${p.name}</h3>

          <strong>${money(p.price)}</strong>

          <button
            class="offer-interest"
            data-id="${p.id}">

            Quero esse

          </button>

        </div>

      </article>

    `).join('');

  $$('.offer-interest').forEach(b =>
    b.addEventListener(
      'click',
      () => addInterest(b.dataset.id)
    )
  );

  setupAllCarousels();
}

/* ======================================
   INTERESSE
====================================== */

function addInterest(id) {

  if (!interest.includes(id)) {
    interest.push(id);
  }

  saveInterest();
  openDrawer();
}

function removeInterest(id) {

  interest =
    interest.filter(x => x !== id);

  saveInterest();
}

/* ======================================
   DRAWER
====================================== */

function updateDrawer() {

  $('#cartCount').textContent =
    interest.length;

  $('#drawerItems').innerHTML =
    interest.length

      ? interest.map(id => {

          const p = productById(id);

          return p
            ? `
              <div class="drawer-item">

                <div>
                  <b>${p.name}</b>
                  <small>${money(p.price)}</small>
                </div>

                <button
                  data-remove="${p.id}">
                  ×
                </button>

              </div>
            `
            : '';

        }).join('')

      : `
        <div class="drawer-empty">
          Sua lista está vazia.<br>
          Adicione produtos que você quer consultar.
        </div>
      `;

  $$('[data-remove]').forEach(b =>
    b.addEventListener(
      'click',
      () => removeInterest(b.dataset.remove)
    )
  );

  const items =
    interest
      .map(id => productById(id))
      .filter(Boolean);

  const message =
    items.length

      ? `Olá! Tenho interesse nestes produtos da Garagem do Eletrônico:\n\n${
          items
            .map(p =>
              `• ${p.name} — ${money(p.price)} [${p.id}]`
            )
            .join('\n')
        }\n\nGostaria de confirmar disponibilidade.`

      : `Olá! Gostaria de conhecer os produtos da Garagem do Eletrônico.`;

  $('#sendInterest').href =
    wa(message);
}

function openDrawer() {

  $('#drawer').classList.add('open');
  $('#drawer').setAttribute(
    'aria-hidden',
    'false'
  );

  $('#drawerOverlay').classList.add('show');
}

function closeDrawer() {

  $('#drawer').classList.remove('open');

  $('#drawer').setAttribute(
    'aria-hidden',
    'true'
  );

  $('#drawerOverlay').classList.remove('show');
}

/* ======================================
   DETALHES DO PRODUTO
====================================== */

function showDetails(id) {

  const p = productById(id);

  if (!p) return;

  $('#modalContent').innerHTML = `

    <div class="modal-image">

      ${carouselFor(p, 'modal-carousel')}

    </div>

    <div class="modal-info">

      <span class="eyebrow">
        ${p.id} • ${p.category}
      </span>

      <h2 id="modalTitle">
        ${p.name}
      </h2>

      <p>${p.description}</p>

      <div class="modal-meta">

        <span>
          Condição:
          <b>${conditionLabel[p.condition]}</b>
        </span>

        <span>
          Estoque:
          <b>
            ${
              p.stock > 0
                ? p.stock + ' unidade(s)'
                : 'Vendido'
            }
          </b>
        </span>

      </div>

      <strong class="modal-price">
        ${money(p.price)}
      </strong>

      ${
        p.stock > 0

          ? `
            <div class="modal-actions">

              <button
                class="btn primary"
                id="modalInterest">

                Adicionar à lista

              </button>

              <a
                class="btn secondary"
                href="${wa(
                  `Olá! Tenho interesse no produto ${p.name} [${p.id}] — ${money(p.price)}. Ainda está disponível?`
                )}"
                target="_blank">

                WhatsApp

              </a>

            </div>
          `

          : ''
      }

    </div>

  `;

  $('#modalBackdrop').hidden = false;

  $('#modalInterest')?.addEventListener(
    'click',
    () => {
      addInterest(id);
      closeModal();
    }
  );

  setupAllCarousels();
}

function closeModal() {
  $('#modalBackdrop').hidden = true;
}

/* ======================================
   EVENTOS
====================================== */

function bindProductEvents() {

  $$('.interest-btn').forEach(b =>
    b.addEventListener(
      'click',
      () => addInterest(b.dataset.id)
    )
  );

  $$('[data-details]').forEach(b =>
    b.addEventListener(
      'click',
      () => showDetails(b.dataset.details)
    )
  );
}

$('#search')?.addEventListener(
  'input',
  renderProducts
);

$('#categoryFilter').addEventListener(
  'change',
  renderProducts
);

$('#conditionFilter').addEventListener(
  'change',
  renderProducts
);

$('#categoryRow').addEventListener(
  'click',
  e => {

    const b =
      e.target.closest('[data-cat]');

    if (!b) return;

    $('#categoryFilter').value =
      b.dataset.cat;

    renderProducts();

    document
      .querySelector('#produtos')
      .scrollIntoView({
        behavior: 'smooth'
      });

  }
);

$('#cartBtn').addEventListener(
  'click',
  openDrawer
);

$('#drawerClose').addEventListener(
  'click',
  closeDrawer
);

$('#drawerOverlay').addEventListener(
  'click',
  closeDrawer
);

$('#clearInterest').addEventListener(
  'click',
  () => {
    interest = [];
    saveInterest();
  }
);

$('#modalClose').addEventListener(
  'click',
  closeModal
);

$('#modalBackdrop').addEventListener(
  'click',
  e => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    }
  }
);

$('#menuBtn').addEventListener(
  'click',
  () => $('#nav').classList.toggle('open')
);

$$('.nav a').forEach(a =>
  a.addEventListener(
    'click',
    () => $('#nav').classList.remove('open')
  )
);

/* ======================================
   WHATSAPP / RODAPÉ  
 /\_/\
( -.- )
  >_<

====================================== */

const genericWhatsApp =
  wa(
    `Olá! Vim pelo site da Garagem do Eletrônico e gostaria de atendimento.`
  );

$('#heroWhatsapp').href =
  genericWhatsApp;

$('#contactWhatsapp').href =
  genericWhatsApp;

$('#footerLocation').textContent =
  STORE.location;

$('#footerHours').textContent =
  STORE.hours;

$('#year').textContent =
  new Date().getFullYear();

/* ======================================
   INICIALIZAÇÃO
====================================== */

renderCategories();
renderProducts();
renderOffers();
updateDrawer();