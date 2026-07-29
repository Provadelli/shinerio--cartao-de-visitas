/* =========================================================================
   DADOS POR SETOR
   -------------------------------------------------------------------------
   ATENCAO: os valores abaixo (whatsapp, email, instagram) sao PLACEHOLDERS.
   Troque cada campo pelos dados reais do respectivo setor antes de publicar.

   whatsapp        -> apenas numeros, formato internacional sem "+" nem espacos
                       (55 + DDD + numero). Usado no link https://wa.me/...
   whatsappDisplay -> como o numero aparece formatado no botao
   email           -> e-mail do setor (usado no mailto:)
   instagram       -> @usuario do Instagram, sem o "@" (usado no link e no texto)
   ========================================================================= */
const sectorsData = {
  'supervisao': {
    label: 'Setor Operacional',
    whatsapp: '5521964907556',
    whatsappDisplay: '(21) 96490-7556',
    email: 'supervisao@shinerio.com',
    instagram: 'shinerioservicos'
  },
  'comercial-privado': {
    label: 'Comercial Privado',
    whatsapp: '5521975195373',
    whatsappDisplay: '(21) 97519-5373',
    email: 'comercial@shinerio.com',
    instagram: 'shinerioservicos'
  },
  'comercial-publico': {
    label: 'Comercial Público',
    whatsapp: '552135400693',
    whatsappDisplay: '(21) 3540-0693',
    email: 'contatos@shinerio.com',
    instagram: 'shinerioservicos'
  },
  'dp': {
    label: 'Departamento Pessoal',
    whatsapp: '5521964893039',
    whatsappDisplay: '(21) 96489-3039',
    email: 'shinerio@shinerio.com',
    instagram: 'shinerioservicos'
  },
  'rh': {
    label: 'Recursos Humanos',
    whatsapp: '5521964159514',
    whatsappDisplay: '(21) 96415-9514',
    email: 'rh@shinerio.com',
    instagram: 'shinerioservicos'
  }
};

const DEFAULT_SECTOR = 'supervisao';

/* ---------- Toast de feedback ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(()=> toastEl.classList.remove('show'), 2200);
}

/* ---------- Referencias dos elementos ---------- */
const sectorTrigger  = document.getElementById('sectorTrigger');
const sectorDropdown = document.getElementById('sectorDropdown');
const sectorChevron  = document.getElementById('sectorChevron');
const sectorLabel    = document.getElementById('sectorLabel');

const whatsappBtn   = document.getElementById('whatsappBtn');
const whatsappLabel = document.getElementById('whatsappLabel');
const emailBtn       = document.getElementById('emailBtn');
const emailLabel     = document.getElementById('emailLabel');
const instaBtn       = document.getElementById('instaBtn');
const instaLabel     = document.getElementById('instaLabel');

let currentSector = DEFAULT_SECTOR;

/* ---------- Atualiza os 3 campos com base no setor escolhido ---------- */
function renderSector(key){
  const data = sectorsData[key];
  if(!data) return;
  currentSector = key;

  sectorLabel.textContent = data.label.toUpperCase();

  whatsappBtn.href = `https://wa.me/${data.whatsapp}`;
  whatsappLabel.textContent = data.whatsappDisplay;

  emailBtn.href = `mailto:${data.email}`;
  emailLabel.textContent = data.email.toUpperCase();

  instaBtn.href = `https://instagram.com/${data.instagram}`;
  instaLabel.textContent = `@${data.instagram.toUpperCase()}`;

  sectorDropdown.querySelectorAll('li').forEach(li=>{
    const isActive = li.dataset.sector === key;
    li.classList.toggle('active', isActive);
    li.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

/* ---------- Abrir / fechar dropdown ---------- */
function openDropdown(){
  sectorDropdown.classList.add('open');
  sectorChevron.classList.add('open');
  sectorTrigger.setAttribute('aria-expanded', 'true');
}
function closeDropdown(){
  sectorDropdown.classList.remove('open');
  sectorChevron.classList.remove('open');
  sectorTrigger.setAttribute('aria-expanded', 'false');
}
function toggleDropdown(){
  sectorDropdown.classList.contains('open') ? closeDropdown() : openDropdown();
}

sectorTrigger.addEventListener('click', (e)=>{
  e.stopPropagation();
  toggleDropdown();
});

sectorDropdown.querySelectorAll('li').forEach(li=>{
  li.addEventListener('click', ()=>{
    renderSector(li.dataset.sector);
    closeDropdown();
    showToast(`Setor selecionado: ${sectorsData[li.dataset.sector].label}`);
  });
});

// Fecha o dropdown ao clicar fora dele
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.sector-select-wrap')) closeDropdown();
});

// Fecha com ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeDropdown();
});

/* ---------- Feedback visual ao clicar em cada canal ---------- */
whatsappBtn.addEventListener('click', ()=>{
  showToast(`Abrindo WhatsApp de ${sectorsData[currentSector].label}...`);
});
emailBtn.addEventListener('click', ()=>{
  showToast(`Abrindo e-mail de ${sectorsData[currentSector].label}...`);
});
instaBtn.addEventListener('click', ()=>{
  showToast(`Abrindo Instagram de ${sectorsData[currentSector].label}...`);
});

/* ---------- Selo circular: leva para o "site" institucional ---------- */
const badgeBtn = document.getElementById('badgeBtn');
function activateBadge(){
  showToast('Shine Rio Group');
}
badgeBtn.addEventListener('click', activateBadge);
badgeBtn.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    activateBadge();
  }
});

/* ---------- Estado inicial ---------- */
renderSector(DEFAULT_SECTOR);
