/**
 * JJ Comércio de Paletes - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initQuoteForm();
  initProductModals();
  initSmoothScroll();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Quote Form Handler with WhatsApp dispatch
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value || '';
    const company = document.getElementById('company')?.value || 'Não informada';
    const phone = document.getElementById('phone')?.value || '';
    const palletType = document.getElementById('palletType')?.value || 'PBR';
    const quantity = document.getElementById('quantity')?.value || 'A definir';
    const notes = document.getElementById('notes')?.value || 'Nenhuma observação';

    // Construct WhatsApp message
    const message = `*Solicitação de Orçamento - JJ Paletes*%0A%0A` +
      `👤 *Nome:* ${encodeURIComponent(name)}%0A` +
      `🏢 *Empresa:* ${encodeURIComponent(company)}%0A` +
      `📱 *Telefone:* ${encodeURIComponent(phone)}%0A` +
      `📦 *Tipo de Palete:* ${encodeURIComponent(palletType)}%0A` +
      `🔢 *Quantidade:* ${encodeURIComponent(quantity)}%0A` +
      `📝 *Observações:* ${encodeURIComponent(notes)}%0A%0A` +
      `_Enviado pelo site JJ Paletes_`;

    // WhatsApp number for primary sales consultant (Roberto Gomes)
    const whatsappUrl = `https://wa.me/5511995979833?text=${message}`;

    showToast('Redirecionando para o WhatsApp comercial...');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
    }, 1200);
  });
}

// Product Details & Quick Quote Modal
const productData = {
  'pbr': {
    title: 'Palete PBR (Padrão Brasileiro)',
    tag: 'PADRÃO PBR 1000x1200mm',
    image: 'assets/pallet1.jpg',
    specs: ['Dimensões: 1000 x 1200 mm', 'Capacidade Estática: até 2.500 kg', 'Capacidade Dinâmica: até 1.500 kg', 'Madeira de Reflorestamento Tratada', 'Compatível com porta-paletes e empilhadeiras'],
    desc: 'O Palete PBR é o padrão regulamentado no Brasil para operações logísticas eficientes. Indicado para indústrias, centros de distribuição e varejistas que exigem padronização rigorosa e alta durabilidade.'
  },
  'descartavel': {
    title: 'Palete Descartável (One-Way)',
    tag: 'EXPORTAÇÃO & USO ÚNICO',
    image: 'assets/pallet2.jpg',
    specs: ['Leve e Econômico', 'Dimensões Customizáveis', 'Tratamento Fitossanitário HT (opcional)', 'Excelente relação custo-benefício'],
    desc: 'Desenvolvido para operações de envio único (one-way) ou exportação onde o palete não retornará à origem. Garante a proteção da carga com custo otimizado.'
  },
  'compra': {
    title: 'Compra de Paletes Usados',
    tag: 'VALORIZAÇÃO DE ATIVOS',
    image: 'assets/Compra.png',
    specs: ['Avaliação Rápida no Local', 'Pagamento à Vista', 'Coleta Própria Agendada', 'Compra de Lotes Diversos'],
    desc: 'Compramos paletes usados e ociosos da sua operação. Transforme madeira parada em capital de giro imediato e libere espaço no seu galpão.'
  },
  'retirada': {
    title: 'Retirada de Paletes Quebrados',
    tag: 'LOGÍSTICA REVERSA ECOLÓGICA',
    image: 'assets/pallet1.jpg',
    specs: ['Descarte Ecológico Correto', 'Retirada com Caminhão Próprio', 'Limpeza e Desobstrução do Pátio', 'Certificado de Destinação Responsável'],
    desc: 'Serviço completo de remoção de paletes avariados ou sem condição de uso. Mantemos seu pátio organizado e em conformidade ambiental.'
  }
};

function initProductModals() {
  const backdrop = document.getElementById('productModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalDetails');
  
  if (!backdrop) return;

  document.querySelectorAll('[data-product-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-product-key');
      const item = productData[key];

      if (item && modalContent) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 1.5rem;">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
            <span class="spec-pill" style="margin-bottom: 0.5rem; display: inline-block;">${item.tag}</span>
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--color-dark); margin-bottom: 0.5rem;">${item.title}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">${item.desc}</p>
            <div style="background: var(--color-surface-container); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
              <h4 style="font-family: var(--font-heading); font-size: 0.9rem; font-weight: 700; color: var(--color-dark); margin-bottom: 0.5rem;">Especificações Técnicas:</h4>
              <ul style="list-style-type: none; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.88rem; color: var(--color-text);">
                ${item.specs.map(s => `<li>✓ ${s}</li>`).join('')}
              </ul>
            </div>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="orcamento.html?tipo=${key}" class="btn btn-primary" style="flex: 1;">
                Solicitar Cotação
                <span class="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="https://wa.me/5511995979833?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20${encodeURIComponent(item.title)}" target="_blank" class="btn btn-whatsapp">
                WhatsApp
              </a>
            </div>
          </div>
        `;
        backdrop.classList.add('open');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => backdrop.classList.remove('open'));
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.classList.remove('open');
  });
}

// Smooth scrolling for anchor links
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

// Toast notification helper
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="material-symbols-outlined" style="color: var(--color-primary);">check_circle</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
