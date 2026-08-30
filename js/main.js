/**
 * JJ Comércio de Paletes - Main JavaScript
 * Diretrizes: 2.agents Frontend & UI/UX Intelligence
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initCategoryFilters();
  initProductModals();
  initPalletCalculator();
  initQuoteForm();
  initUrlParamsPreFill();
  initSmoothScroll();
});

/* ==========================================================================
   HEADER & MOBILE MENU
   ========================================================================== */

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   FILTROS DE CATEGORIA (PRODUTOS.HTML)
   ========================================================================== */

function initCategoryFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  if (!filterPills.length || !productCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter') || 'all';

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   CALCULADORA RÁPIDA / ESTIMADOR DE PALETES (INDEX.HTML)
   ========================================================================== */

function initPalletCalculator() {
  const calcPalletType = document.getElementById('calcPalletType');
  const calcQuantity = document.getElementById('calcQuantity');
  const calcGoal = document.getElementById('calcGoal');
  const resPalletType = document.getElementById('resPalletType');
  const resLoadCapacity = document.getElementById('resLoadCapacity');
  const resLeadTime = document.getElementById('resLeadTime');
  const btnCalcWhatsApp = document.getElementById('btnCalcWhatsApp');

  if (!calcPalletType || !calcQuantity || !btnCalcWhatsApp) return;

  const updateCalculation = () => {
    const type = calcPalletType.value;
    const qty = parseInt(calcQuantity.value, 10) || 50;
    const goal = calcGoal ? calcGoal.value : 'compra';

    let typeLabel = 'Palete PBR (1000x1200mm)';
    let loadCap = 'Até 2.500 kg estático / 1.500 kg dinâmico';
    let leadTime = 'Entrega em 24h a 48h (Cabreúva e Região)';

    if (type === 'descartavel') {
      typeLabel = 'Palete Descartável (One-Way)';
      loadCap = 'Até 1.000 kg (Cargas Leves/Médias)';
      leadTime = 'Pronta entrega ou 48h';
    } else if (type === 'europalete') {
      typeLabel = 'Europalete EPAL (800x1200mm)';
      loadCap = 'Até 1.500 kg padronizado';
      leadTime = 'Sob consulta / Estoque regular';
    } else if (type === 'compra_usados') {
      typeLabel = 'Avaliação & Compra de Usados';
      loadCap = 'Retirada de lote ocioso';
      leadTime = 'Coleta no local em até 24h';
    }

    if (resPalletType) resPalletType.textContent = typeLabel;
    if (resLoadCapacity) resLoadCapacity.textContent = loadCap;
    if (resLeadTime) resLeadTime.textContent = leadTime;

    // Atualiza o link do WhatsApp
    const msg = `*Simulação de Necessidade - JJ Paletes*%0A%0A` +
      `📦 *Tipo:* ${encodeURIComponent(typeLabel)}%0A` +
      `🔢 *Quantidade Estimada:* ${qty} unidades%0A` +
      `🎯 *Finalidade:* ${encodeURIComponent(goal === 'compra' ? 'Comprar Paletes' : 'Vender Paletes Usados')}%0A` +
      `📍 *Região:* Cabreúva / Jundiaí e Região%0A%0A` +
      `_Gostaria de formalizar esta cotação._`;

    btnCalcWhatsApp.href = `https://wa.me/5511995979833?text=${msg}`;
  };

  calcPalletType.addEventListener('change', updateCalculation);
  calcQuantity.addEventListener('input', updateCalculation);
  if (calcGoal) calcGoal.addEventListener('change', updateCalculation);

  updateCalculation();
}

/* ==========================================================================
   MODAL DE DETALHES DO PRODUTO (ACESSIBILIDADE COMPLETA)
   ========================================================================== */

const productData = {
  'pbr': {
    title: 'Palete PBR (Padrão Brasileiro 1000x1200mm)',
    tag: 'PADRÃO PBR OFICIAL',
    image: 'assets/pallet1.jpg',
    specs: [
      'Dimensões Regulamentadas: 1000 x 1200 x 145 mm',
      'Capacidade Estática: até 2.500 kg',
      'Capacidade Dinâmica: até 1.500 kg',
      'Compatível com porta-paletes verticais, empilhadeiras e transpaleteiras',
      'Madeira de Eucalipto ou Pinus tratada e selecionada'
    ],
    desc: 'O Palete PBR é a estrutura padrão mais utilizada na cadeia logística brasileira. Oferece encaixe universal em sistemas de armazenagem vertical, garantindo máxima segurança estrutural para cargas pesadas.'
  },
  'descartavel': {
    title: 'Palete Descartável (One-Way)',
    tag: 'EXPORTAÇÃO & USO ÚNICO',
    image: 'assets/pallet2.jpg',
    specs: [
      'Dimensões: 1000x1200mm ou sob medida',
      'Capacidade: 600kg a 1.200kg',
      '2 ou 4 entradas para garfos de empilhadeira',
      'Tratamento Fitossanitário HT (opcional para exportação)',
      'Excelente relação custo por unidade'
    ],
    desc: 'Ideal para operações onde o palete não retornará à empresa expedidora. Oferece alta proteção para suas mercadorias com custo reduzido e peso otimizado.'
  },
  'compra': {
    title: 'Compra e Coleta de Paletes Usados',
    tag: 'VALORIZAÇÃO DE ATIVOS',
    image: 'assets/Compra.png',
    specs: [
      'Avaliação rápida e justa no local',
      'Pagamento imediato / à vista',
      'Frota própria para coleta agendada',
      'Compramos lotes de PBR, Descartáveis e Sob Medida'
    ],
    desc: 'Transforme paletes ociosos e parados no seu galpão em capital de giro imediato. Nossa equipe realiza a contagem, avaliação e retirada rápida sem custos para a sua empresa.'
  },
  'retirada': {
    title: 'Logística Reversa & Retirada Ecológica',
    tag: 'SUSTENTABILIDADE & PÁTIO LIMPO',
    image: 'assets/pallet1.jpg',
    specs: [
      'Remoção de paletes quebrados e madeira avariada',
      'Desobstrução imediata de docas e pátios industriais',
      'Encaminhamento para reciclagem e biomassa',
      'Emissão de comprovante de destinação responsável'
    ],
    desc: 'Serviço especializado para manter seu espaço fabril seguro, limpo e em conformidade ambiental, reaproveitando a madeira e evitando desperdício.'
  }
};

let lastActiveTrigger = null;

function initProductModals() {
  const backdrop = document.getElementById('productModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalDetails = document.getElementById('modalDetails');

  if (!backdrop) return;

  const openModal = (key, triggerElement) => {
    const item = productData[key];
    if (!item || !modalDetails) return;

    lastActiveTrigger = triggerElement;

    modalDetails.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="modal-header-image">
      <div class="modal-body">
        <span class="section-tag" style="margin-bottom: 0.5rem;">${item.tag}</span>
        <h3 class="modal-title">${item.title}</h3>
        <p class="modal-desc">${item.desc}</p>
        
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--color-dark); margin-bottom: 0.6rem;">Ficha Técnica & Capacidades:</h4>
        <ul class="modal-specs-list">
          ${item.specs.map(spec => `
            <li>
              <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
              <span>${spec}</span>
            </li>
          `).join('')}
        </ul>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.5rem;">
          <a href="orcamento.html?tipo=${key}" class="btn btn-primary btn-lg" style="flex: 1;">
            Solicitar Cotação Formal
            <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </a>
          <a href="https://wa.me/5511995979833?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20${encodeURIComponent(item.title)}" target="_blank" class="btn btn-whatsapp btn-lg">
            <span class="material-symbols-outlined" aria-hidden="true">chat</span>
            WhatsApp
          </a>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  };

  document.querySelectorAll('[data-product-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-product-key');
      openModal(key, btn);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   FORMULÁRIO DE COTAÇÃO RÁPIDA (ORCAMENTO.HTML)
   ========================================================================== */

function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const companyInput = document.getElementById('company');
    const palletTypeSelect = document.getElementById('palletType');
    const quantityInput = document.getElementById('quantity');
    const notesInput = document.getElementById('notes');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const company = companyInput && companyInput.value.trim() ? companyInput.value.trim() : 'Não informada';
    const palletType = palletTypeSelect ? palletTypeSelect.value : 'PBR (1000x1200mm)';
    const quantity = quantityInput && quantityInput.value ? quantityInput.value : 'A definir';
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'Nenhuma observação informada';

    if (!name || !phone) {
      showToast('Por favor, preencha seu nome e telefone para contato.');
      if (!name && nameInput) nameInput.focus();
      else if (!phone && phoneInput) phoneInput.focus();
      return;
    }

    // Monta a mensagem para o WhatsApp com formatação legível
    const message = `*SOLICITAÇÃO DE ORÇAMENTO - JJ PALETES*%0A%0A` +
      `👤 *Nome:* ${encodeURIComponent(name)}%0A` +
      `🏢 *Empresa:* ${encodeURIComponent(company)}%0A` +
      `📱 *Telefone:* ${encodeURIComponent(phone)}%0A` +
      `📦 *Palete/Serviço:* ${encodeURIComponent(palletType)}%0A` +
      `🔢 *Quantidade:* ${encodeURIComponent(quantity)} unidades%0A` +
      `📝 *Observações:* ${encodeURIComponent(notes)}%0A%0A` +
      `_Enviado pelo formulário do site JJ Paletes_`;

    const whatsappUrl = `https://wa.me/5511995979833?text=${message}`;

    showToast('Redirecionando para o WhatsApp Comercial (Roberto Gomes)...');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
    }, 1000);
  });
}

/* ==========================================================================
   PRÉ-PREENCHIMENTO POR PARÂMETROS DE URL
   ========================================================================== */

function initUrlParamsPreFill() {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get('tipo') || params.get('servico');

  if (!tipo) return;

  const palletSelect = document.getElementById('palletType');
  if (palletSelect) {
    if (tipo === 'pbr') palletSelect.value = 'Palete PBR 1000x1200mm';
    else if (tipo === 'descartavel') palletSelect.value = 'Palete Descartável (One-Way)';
    else if (tipo === 'compra') palletSelect.value = 'Compra de Paletes Usados';
    else if (tipo === 'retirada') palletSelect.value = 'Retirada e Logística Reversa';
  }
}

/* ==========================================================================
   SMOOTH SCROLL & TOAST NOTIFICATION
   ========================================================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-container');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-container';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true" style="color: var(--color-primary);">info</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
