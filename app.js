const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const money = (value) => new Intl.NumberFormat('pt-BR', {style:'currency', currency: STORE.currency}).format(value);
const wa = (text) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
const conditionLabel = {novo:'Novo', seminovo:'Seminovo', usado:'Usado'};
const icons = {Eletrônicos:'⚡', Ferramentas:'🧰', Informática:'💻', Games:'🎮', Seminovos:'♻️', Serviços:'🔧'};
let interest = JSON.parse(localStorage.getItem('garagem_interest') || '[]');

function saveInterest(){ localStorage.setItem('garagem_interest', JSON.stringify(interest)); updateDrawer(); }
function productById(id){ return PRODUCTS.find(p => p.id === id); }

function imageFor(p){
  if(p.image) return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  return `<div class="placeholder"><span>${icons[p.category] || '📦'}</span><small>Foto do produto</small></div>`;
}

function productCard(p){
  const available = p.stock > 0;
  return `<article class="product-card">
    <div class="product-image">${imageFor(p)}<span class="badge">${p.badge || conditionLabel[p.condition]}</span></div>
    <div class="product-body">
      <div class="product-cat">${icons[p.category] || '•'} ${p.category}</div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="condition">${available ? '● Disponível' : '● Vendido'} · ${conditionLabel[p.condition]}</div>
      <div class="product-bottom"><strong>${money(p.price)}</strong><button class="interest-btn" data-id="${p.id}" ${!available?'disabled':''}>${available?'Tenho interesse':'Vendido'}</button></div>
      <button class="details-link" data-details="${p.id}">Ver detalhes →</button>
    </div>
  </article>`;
}

function renderCategories(){
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  $('#categoryFilter').innerHTML = '<option value="todos">Todas as categorias</option>' + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
  $('#categoryRow').innerHTML = cats.map(c=>`<button class="category-pill" data-cat="${c}"><span>${icons[c]||'📦'}</span>${c}</button>`).join('');
}

function renderProducts(){
  const q = $('#search')?.value.toLowerCase().trim() || '';
  const cat = $('#categoryFilter').value;
  const cond = $('#conditionFilter').value;
  const list = PRODUCTS.filter(p => (!q || `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)) && (cat==='todos'||p.category===cat) && (cond==='todos'||p.condition===cond));
  $('#productGrid').innerHTML = list.map(productCard).join('');
  $('#emptyState').hidden = list.length > 0;
  $('#stockNote').textContent = `${PRODUCTS.filter(p=>p.stock>0).length} produtos cadastrados`;
  bindProductEvents();
}

function renderOffers(){
  const offers = PRODUCTS.filter(p=>p.featured && p.stock>0).slice(0,3);
  $('#offerGrid').innerHTML = offers.map(p=>`<article class="offer-card"><div class="offer-img">${imageFor(p)}</div><div><span>${p.badge || 'ACHADO'}</span><h3>${p.name}</h3><strong>${money(p.price)}</strong><button class="offer-interest" data-id="${p.id}">Quero esse</button></div></article>`).join('');
  $$('.offer-interest').forEach(b=>b.addEventListener('click',()=>addInterest(b.dataset.id)));
}

function addInterest(id){
  if(!interest.includes(id)) interest.push(id);
  saveInterest();
  openDrawer();
}
function removeInterest(id){ interest = interest.filter(x=>x!==id); saveInterest(); }

function updateDrawer(){
  $('#cartCount').textContent = interest.length;
  $('#drawerItems').innerHTML = interest.length ? interest.map(id=>{const p=productById(id);return p?`<div class="drawer-item"><div><b>${p.name}</b><small>${money(p.price)}</small></div><button data-remove="${p.id}">×</button></div>`:''}).join('') : '<div class="drawer-empty">Sua lista está vazia.<br>Adicione produtos que você quer consultar.</div>';
  $$('[data-remove]').forEach(b=>b.addEventListener('click',()=>removeInterest(b.dataset.remove)));
  const items = interest.map(id=>productById(id)).filter(Boolean);
  const message = items.length ? `Olá! Tenho interesse nestes produtos da Garagem do Eletrônico:\n\n${items.map(p=>`• ${p.name} — ${money(p.price)} [${p.id}]`).join('\n')}\n\nGostaria de confirmar disponibilidade.` : `Olá! Gostaria de conhecer os produtos da Garagem do Eletrônico.`;
  $('#sendInterest').href = wa(message);
}
function openDrawer(){ $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden','false'); $('#drawerOverlay').classList.add('show'); }
function closeDrawer(){ $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true'); $('#drawerOverlay').classList.remove('show'); }

function showDetails(id){
  const p=productById(id); if(!p) return;
  $('#modalContent').innerHTML = `<div class="modal-image">${imageFor(p)}</div><div class="modal-info"><span class="eyebrow">${p.id} • ${p.category}</span><h2 id="modalTitle">${p.name}</h2><p>${p.description}</p><div class="modal-meta"><span>Condição: <b>${conditionLabel[p.condition]}</b></span><span>Estoque: <b>${p.stock>0?p.stock+' unidade(s)':'Vendido'}</b></span></div><strong class="modal-price">${money(p.price)}</strong>${p.stock>0?`<div class="modal-actions"><button class="btn primary" id="modalInterest">Adicionar à lista</button><a class="btn secondary" href="${wa(`Olá! Tenho interesse no produto ${p.name} [${p.id}] — ${money(p.price)}. Ainda está disponível?`)}" target="_blank">WhatsApp</a></div>`:''}</div>`;
  $('#modalBackdrop').hidden=false;
  $('#modalInterest')?.addEventListener('click',()=>{addInterest(id); closeModal();});
}
function closeModal(){ $('#modalBackdrop').hidden=true; }
function bindProductEvents(){
  $$('.interest-btn').forEach(b=>b.addEventListener('click',()=>addInterest(b.dataset.id)));
  $$('[data-details]').forEach(b=>b.addEventListener('click',()=>showDetails(b.dataset.details)));
}

$('#search')?.addEventListener('input',renderProducts);
$('#categoryFilter').addEventListener('change',renderProducts);
$('#conditionFilter').addEventListener('change',renderProducts);
$('#categoryRow').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;$('#categoryFilter').value=b.dataset.cat;renderProducts();document.querySelector('#produtos').scrollIntoView({behavior:'smooth'});});
$('#cartBtn').addEventListener('click',openDrawer);
$('#drawerClose').addEventListener('click',closeDrawer);
$('#drawerOverlay').addEventListener('click',closeDrawer);
$('#clearInterest').addEventListener('click',()=>{interest=[];saveInterest();});
$('#modalClose').addEventListener('click',closeModal);
$('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal();});
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.toggle('open'));
$$('.nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));

const genericWhatsApp = wa(`Olá! Vim pelo site da Garagem do Eletrônico e gostaria de atendimento.`);
$('#heroWhatsapp').href = genericWhatsApp;
$('#contactWhatsapp').href = genericWhatsApp;
$('#footerLocation').textContent = STORE.location;
$('#footerHours').textContent = STORE.hours;
$('#year').textContent = new Date().getFullYear();
renderCategories(); renderProducts(); renderOffers(); updateDrawer();
