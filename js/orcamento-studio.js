/**
 * JJ Comércio de Paletes - Studio de Orçamentos & PDF Generator
 * Front-end Logic (100% Client-Side + Python Backend Ready)
 */

// Model presets with standard specifications and default prices
const PALLET_PRESETS = {
  'pbr': {
    name: 'Palete PBR (1000x1200mm)',
    desc: 'Madeira de reflorestamento tratada, padrão ABNT NBR, 4 entradas.',
    defaultPrice: 38.50
  },
  'descartavel': {
    name: 'Palete Descartável (One-Way)',
    desc: 'Estrutura leve para exportação e transporte sem retorno.',
    defaultPrice: 28.00
  },
  'europalete': {
    name: 'Europalete (800x1200mm)',
    desc: 'Padrão europeu EPAL, alta rigidez para contêiner e exportação.',
    defaultPrice: 48.00
  },
  'sob_medida': {
    name: 'Palete Sob Medida',
    desc: 'Dimensões customizadas sob desenho técnico e especificação do cliente.',
    defaultPrice: 45.00
  },
  'compra_lote': {
    name: 'Compra de Paletes Usados (Lote)',
    desc: 'Avaliação e coleta de paletes de madeira usados no galpão do cliente.',
    defaultPrice: 15.00
  },
  'reforma_retirada': {
    name: 'Retirada e Reforma de Quebrados',
    desc: 'Logística reversa, descarte ecológico e reforma estrutural de madeira.',
    defaultPrice: 12.00
  },
  'outro': {
    name: 'Outro Produto / Serviço Especial',
    desc: 'Serviço personalizado ou fornecimento sob consulta técnica.',
    defaultPrice: 0.00
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initDefaults();
  initDynamicTable();
  initCalculations();
  initMasks();
  initToolbarActions();
  initHistoryDrawer();
  loadAutoDraft();
});

// Set default dates and code
function initDefaults() {
  const codeElem = document.getElementById('orcNumber');
  const dateElem = document.getElementById('orcDate');
  
  if (codeElem && !codeElem.value) {
    const nextSeq = getNextSequenceNumber();
    codeElem.value = `ORC-${new Date().getFullYear()}-${String(nextSeq).padStart(4, '0')}`;
  }

  if (dateElem && !dateElem.value) {
    const today = new Date().toISOString().split('T')[0];
    dateElem.value = today;
  }
}

function getNextSequenceNumber() {
  let seq = parseInt(localStorage.getItem('jj_orc_seq') || '1', 10);
  return seq;
}

function incrementSequenceNumber() {
  let seq = getNextSequenceNumber();
  localStorage.setItem('jj_orc_seq', String(seq + 1));
}

// Table Management
function initDynamicTable() {
  const tbody = document.getElementById('itemsTableBody');
  const addBtn = document.getElementById('addItemBtn');

  if (addBtn && tbody) {
    addBtn.addEventListener('click', () => {
      addNewRow(tbody);
    });
  }

  // If table is empty, add initial default row
  if (tbody && tbody.children.length === 0) {
    addNewRow(tbody, 'pbr', 100);
  }
}

function addNewRow(tbody, presetKey = 'pbr', defaultQty = 1) {
  const rowCount = tbody.children.length + 1;
  const tr = document.createElement('tr');
  tr.className = 'item-row';

  const preset = PALLET_PRESETS[presetKey] || PALLET_PRESETS['pbr'];

  tr.innerHTML = `
    <td class="item-num">${rowCount}</td>
    <td style="width: 220px;">
      <select class="table-input select-pallet-type">
        <option value="pbr" ${presetKey === 'pbr' ? 'selected' : ''}>Palete PBR (1000x1200mm)</option>
        <option value="descartavel" ${presetKey === 'descartavel' ? 'selected' : ''}>Palete Descartável (One-Way)</option>
        <option value="europalete" ${presetKey === 'europalete' ? 'selected' : ''}>Europalete (800x1200mm)</option>
        <option value="sob_medida" ${presetKey === 'sob_medida' ? 'selected' : ''}>Palete Sob Medida</option>
        <option value="compra_lote" ${presetKey === 'compra_lote' ? 'selected' : ''}>Compra de Paletes Usados</option>
        <option value="reforma_retirada" ${presetKey === 'reforma_retirada' ? 'selected' : ''}>Retirada / Reforma</option>
        <option value="outro" ${presetKey === 'outro' ? 'selected' : ''}>Outro</option>
      </select>
    </td>
    <td>
      <input type="text" class="table-input item-desc" value="${preset.desc}" placeholder="Descrição detalhada do item">
    </td>
    <td style="width: 90px;">
      <input type="number" min="1" class="table-input table-input-num item-qty" value="${defaultQty}">
    </td>
    <td style="width: 120px;">
      <input type="number" step="0.01" min="0" class="table-input table-input-num item-price" value="${preset.defaultPrice.toFixed(2)}">
    </td>
    <td class="subtotal-cell item-subtotal">
      R$ ${(defaultQty * preset.defaultPrice).toFixed(2).replace('.', ',')}
    </td>
    <td style="width: 40px; text-align: center;">
      <button type="button" class="btn-remove-row" title="Remover Linha">
        <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
      </button>
    </td>
  `;

  tbody.appendChild(tr);

  // Hook row change events
  hookRowEvents(tr);
  updateCalculations();
}

function hookRowEvents(tr) {
  const select = tr.querySelector('.select-pallet-type');
  const desc = tr.querySelector('.item-desc');
  const qty = tr.querySelector('.item-qty');
  const price = tr.querySelector('.item-price');
  const removeBtn = tr.querySelector('.btn-remove-row');

  if (select) {
    select.addEventListener('change', () => {
      const p = PALLET_PRESETS[select.value];
      if (p) {
        desc.value = p.desc;
        price.value = p.defaultPrice.toFixed(2);
        updateCalculations();
      }
    });
  }

  [qty, price, desc].forEach(input => {
    if (input) {
      input.addEventListener('input', () => updateCalculations());
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      const tbody = tr.parentElement;
      if (tbody.children.length > 1) {
        tr.remove();
        reindexRows(tbody);
        updateCalculations();
      } else {
        alert('O orçamento deve ter pelo menos um item.');
      }
    });
  }
}

function reindexRows(tbody) {
  Array.from(tbody.children).forEach((row, idx) => {
    const numCell = row.querySelector('.item-num');
    if (numCell) numCell.textContent = idx + 1;
  });
}

// Math Engine
function initCalculations() {
  const discountInput = document.getElementById('orcDiscount');
  const discountType = document.getElementById('orcDiscountType');
  const shippingInput = document.getElementById('orcShipping');

  [discountInput, discountType, shippingInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', () => updateCalculations());
      elem.addEventListener('change', () => updateCalculations());
    }
  });
}

function updateCalculations() {
  const rows = document.querySelectorAll('#itemsTableBody .item-row');
  let subtotalGeral = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty')?.value || '0');
    const price = parseFloat(row.querySelector('.item-price')?.value || '0');
    const subtotal = qty * price;
    subtotalGeral += subtotal;

    const subtotalCell = row.querySelector('.item-subtotal');
    if (subtotalCell) {
      subtotalCell.textContent = formatCurrency(subtotal);
    }
  });

  const discountVal = parseFloat(document.getElementById('orcDiscount')?.value || '0');
  const discountType = document.getElementById('orcDiscountType')?.value || 'fixed';
  const shippingVal = parseFloat(document.getElementById('orcShipping')?.value || '0');

  let totalDesconto = 0;
  if (discountType === 'percent') {
    totalDesconto = (subtotalGeral * discountVal) / 100;
  } else {
    totalDesconto = discountVal;
  }

  let totalFinal = subtotalGeral - totalDesconto + shippingVal;
  if (totalFinal < 0) totalFinal = 0;

  // Update UI totals
  const subtotalElem = document.getElementById('valSubtotalGeral');
  const discountElem = document.getElementById('valDescontoCalc');
  const grandTotalElem = document.getElementById('valTotalFinal');

  if (subtotalElem) subtotalElem.textContent = formatCurrency(subtotalGeral);
  if (discountElem) discountElem.textContent = `- ${formatCurrency(totalDesconto)}`;
  if (grandTotalElem) grandTotalElem.textContent = formatCurrency(totalFinal);

  // Trigger autosave to draft
  saveAutoDraft();
}

function formatCurrency(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Input Masks
function initMasks() {
  const phone = document.getElementById('clientPhone');
  const doc = document.getElementById('clientDoc');

  if (phone) {
    phone.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  }

  if (doc) {
    doc.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length <= 11) {
        // CPF: 000.000.000-00
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        // CNPJ: 00.000.000/0000-00
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
      }
      e.target.value = v.substring(0, 18);
    });
  }
}

// Toolbar Action Buttons
function initToolbarActions() {
  const printBtn = document.getElementById('btnImprimir');
  const pdfBtn = document.getElementById('btnBaixarPdf');
  const whatsBtn = document.getElementById('btnWhatsApp');
  const saveBtn = document.getElementById('btnSalvar');
  const newBtn = document.getElementById('btnNovo');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      generateAndDownloadPdf();
    });
  }

  if (whatsBtn) {
    whatsBtn.addEventListener('click', () => {
      sendViaWhatsApp();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveCurrentQuotationToHistory();
    });
  }

  if (newBtn) {
    newBtn.addEventListener('click', () => {
      if (confirm('Deseja iniciar um novo orçamento? Os dados não salvos no histórico serão limpos.')) {
        clearFormAndStartNew();
      }
    });
  }
}

// PDF Generation using html2pdf or window.print fallback
function generateAndDownloadPdf() {
  const element = document.getElementById('orcamentoPaper');
  const orcNum = document.getElementById('orcNumber')?.value || 'ORC';
  const clientName = (document.getElementById('clientName')?.value || 'Cliente').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Orcamento_JJPaletes_${orcNum}_${clientName}.pdf`;

  if (window.html2pdf) {
    const opt = {
      margin: [8, 10, 8, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    showToast('Gerando arquivo PDF...');
    window.html2pdf().set(opt).from(element).save().then(() => {
      showToast('PDF baixado com sucesso!');
    });
  } else {
    // Fallback directly to native browser print dialog (Save as PDF)
    window.print();
  }
}

// WhatsApp Formatted Dispatcher
function sendViaWhatsApp() {
  const payload = collectFormData();
  
  let msg = `*PROPOSTA COMERCIAL - JJ PALETES*%0A`;
  msg += `*Orçamento:* ${payload.numero}%0A`;
  msg += `*Data:* ${payload.data_emissao} | *Validade:* ${payload.validade}%0A%0A`;
  
  msg += `*CLIENTE:*%0A`;
  msg += `👤 ${payload.cliente.nome || 'Não informado'}%0A`;
  if (payload.cliente.documento) msg += `📄 CNPJ/CPF: ${payload.cliente.documento}%0A`;
  if (payload.cliente.cidade) msg += `📍 Local de Entrega: ${payload.cliente.cidade}%0A%0A`;

  msg += `*ITENS DA PROPOSTA:*%0A`;
  payload.itens.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.tipo}*%0A`;
    msg += `   Qtd: ${item.quantidade} un | Unit: R$ ${item.valor_unitario.toFixed(2)} | Subtotal: R$ ${item.subtotal.toFixed(2)}%0A`;
  });

  msg += `%0A*VALOR TOTAL:* ${document.getElementById('valTotalFinal')?.textContent || 'Consulte'}%0A`;
  msg += `💳 *Condição de Pagamento:* ${payload.condicao_pagamento}%0A`;
  msg += `🚚 *Prazo de Entrega:* ${payload.prazo_entrega}%0A%0A`;
  msg += `_JJ Comércio de Paletes - Cabreúva/SP_%0A`;
  msg += `_Consultor: Roberto Gomes (11) 99597-9833_`;

  const phone = payload.cliente.telefone ? payload.cliente.telefone.replace(/\D/g, '') : '5511995979833';
  const targetPhone = phone.length >= 10 ? (phone.startsWith('55') ? phone : '55' + phone) : '5511995979833';

  window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
}

// Data Serialization (Contract for Python Backend API)
function collectFormData() {
  const rows = document.querySelectorAll('#itemsTableBody .item-row');
  const itens = [];

  rows.forEach(row => {
    const select = row.querySelector('.select-pallet-type');
    const desc = row.querySelector('.item-desc')?.value || '';
    const qty = parseFloat(row.querySelector('.item-qty')?.value || '0');
    const price = parseFloat(row.querySelector('.item-price')?.value || '0');
    
    itens.push({
      tipo: select?.options[select.selectedIndex]?.text || 'Palete',
      tipo_chave: select?.value || 'pbr',
      descricao: desc,
      quantidade: qty,
      valor_unitario: price,
      subtotal: qty * price
    });
  });

  return {
    id: Date.now(),
    numero: document.getElementById('orcNumber')?.value || '',
    data_emissao: document.getElementById('orcDate')?.value || '',
    validade: document.getElementById('orcValidade')?.value || '15 dias',
    cliente: {
      nome: document.getElementById('clientName')?.value || '',
      documento: document.getElementById('clientDoc')?.value || '',
      telefone: document.getElementById('clientPhone')?.value || '',
      email: document.getElementById('clientEmail')?.value || '',
      cidade: document.getElementById('clientCity')?.value || '',
      endereco: document.getElementById('clientAddress')?.value || ''
    },
    itens: itens,
    desconto: {
      valor: parseFloat(document.getElementById('orcDiscount')?.value || '0'),
      tipo: document.getElementById('orcDiscountType')?.value || 'fixed'
    },
    frete: {
      valor: parseFloat(document.getElementById('orcShipping')?.value || '0'),
      modalidade: document.getElementById('orcShippingType')?.value || 'FOB'
    },
    totais: {
      subtotal: document.getElementById('valSubtotalGeral')?.textContent || 'R$ 0,00',
      desconto: document.getElementById('valDescontoCalc')?.textContent || 'R$ 0,00',
      total_final: document.getElementById('valTotalFinal')?.textContent || 'R$ 0,00'
    },
    condicao_pagamento: document.getElementById('orcPayment')?.value || 'À vista no PIX',
    prazo_entrega: document.getElementById('orcDelivery')?.value || 'Imediato (1 a 3 dias úteis)',
    observacoes: document.getElementById('orcNotes')?.value || ''
  };
}

// Local History Management
function saveCurrentQuotationToHistory() {
  const data = collectFormData();
  if (!data.cliente.nome) {
    alert('Por favor, informe pelo menos o nome do cliente antes de salvar no histórico.');
    return;
  }

  let history = JSON.parse(localStorage.getItem('jj_orc_history') || '[]');
  const existingIdx = history.findIndex(h => h.numero === data.numero);

  if (existingIdx >= 0) {
    history[existingIdx] = data;
  } else {
    history.unshift(data);
    incrementSequenceNumber();
  }

  localStorage.setItem('jj_orc_history', JSON.stringify(history));
  showToast(`Orçamento ${data.numero} salvo no histórico!`);
  renderHistoryList();

  // Also call the Python backend stub if available
  sendToPythonBackend(data);
}

function initHistoryDrawer() {
  const drawer = document.getElementById('historyDrawer');
  const openBtn = document.getElementById('btnAbrirHistorico');
  const closeBtn = document.getElementById('btnFecharHistorico');

  if (openBtn && drawer) {
    openBtn.addEventListener('click', () => {
      renderHistoryList();
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }
}

function renderHistoryList() {
  const container = document.getElementById('historyListContainer');
  if (!container) return;

  const history = JSON.parse(localStorage.getItem('jj_orc_history') || '[]');
  if (history.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: #888888; padding: 2rem 0;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: #cccccc;">folder_off</span>
        <p style="margin-top: 0.5rem;">Nenhum orçamento salvo no histórico ainda.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = history.map(item => `
    <div class="history-item-card">
      <div class="history-item-head">
        <span class="history-code">${item.numero}</span>
        <span class="history-date">${item.data_emissao}</span>
      </div>
      <div class="history-client">${item.cliente.nome || 'Cliente não informado'}</div>
      <div class="history-total">${item.totais.total_final}</div>
      <div class="history-actions">
        <button type="button" class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="loadQuotationFromHistory('${item.numero}')">
          Carregar
        </button>
        <button type="button" class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; color: #ba1a1a;" onclick="deleteFromHistory('${item.numero}')">
          Excluir
        </button>
      </div>
    </div>
  `).join('');
}

window.loadQuotationFromHistory = function(num) {
  const history = JSON.parse(localStorage.getItem('jj_orc_history') || '[]');
  const item = history.find(h => h.numero === num);
  if (!item) return;

  populateForm(item);
  document.getElementById('historyDrawer')?.classList.remove('open');
  showToast(`Orçamento ${num} carregado!`);
};

window.deleteFromHistory = function(num) {
  if (!confirm(`Tem certeza que deseja excluir o orçamento ${num} do histórico?`)) return;
  let history = JSON.parse(localStorage.getItem('jj_orc_history') || '[]');
  history = history.filter(h => h.numero !== num);
  localStorage.setItem('jj_orc_history', JSON.stringify(history));
  renderHistoryList();
  showToast('Orçamento excluído do histórico.');
};

function populateForm(data) {
  if (data.numero) document.getElementById('orcNumber').value = data.numero;
  if (data.data_emissao) document.getElementById('orcDate').value = data.data_emissao;
  if (data.validade) document.getElementById('orcValidade').value = data.validade;

  if (data.cliente) {
    document.getElementById('clientName').value = data.cliente.nome || '';
    document.getElementById('clientDoc').value = data.cliente.documento || '';
    document.getElementById('clientPhone').value = data.cliente.telefone || '';
    document.getElementById('clientEmail').value = data.cliente.email || '';
    document.getElementById('clientCity').value = data.cliente.cidade || '';
    document.getElementById('clientAddress').value = data.cliente.endereco || '';
  }

  if (data.desconto) {
    document.getElementById('orcDiscount').value = data.desconto.valor || 0;
    document.getElementById('orcDiscountType').value = data.desconto.tipo || 'fixed';
  }

  if (data.frete) {
    document.getElementById('orcShipping').value = data.frete.valor || 0;
    document.getElementById('orcShippingType').value = data.frete.modalidade || 'FOB';
  }

  if (data.condicao_pagamento) document.getElementById('orcPayment').value = data.condicao_pagamento;
  if (data.prazo_entrega) document.getElementById('orcDelivery').value = data.prazo_entrega;
  if (data.observacoes) document.getElementById('orcNotes').value = data.observacoes;

  // Populate Table
  const tbody = document.getElementById('itemsTableBody');
  tbody.innerHTML = '';

  if (data.itens && data.itens.length > 0) {
    data.itens.forEach(it => {
      const tr = document.createElement('tr');
      tr.className = 'item-row';
      tr.innerHTML = `
        <td class="item-num">1</td>
        <td style="width: 220px;">
          <select class="table-input select-pallet-type">
            <option value="pbr" ${it.tipo_chave === 'pbr' ? 'selected' : ''}>Palete PBR (1000x1200mm)</option>
            <option value="descartavel" ${it.tipo_chave === 'descartavel' ? 'selected' : ''}>Palete Descartável (One-Way)</option>
            <option value="europalete" ${it.tipo_chave === 'europalete' ? 'selected' : ''}>Europalete (800x1200mm)</option>
            <option value="sob_medida" ${it.tipo_chave === 'sob_medida' ? 'selected' : ''}>Palete Sob Medida</option>
            <option value="compra_lote" ${it.tipo_chave === 'compra_lote' ? 'selected' : ''}>Compra de Paletes Usados</option>
            <option value="reforma_retirada" ${it.tipo_chave === 'reforma_retirada' ? 'selected' : ''}>Retirada / Reforma</option>
            <option value="outro" ${it.tipo_chave === 'outro' ? 'selected' : ''}>Outro</option>
          </select>
        </td>
        <td>
          <input type="text" class="table-input item-desc" value="${it.descricao || ''}">
        </td>
        <td style="width: 90px;">
          <input type="number" min="1" class="table-input table-input-num item-qty" value="${it.quantidade}">
        </td>
        <td style="width: 120px;">
          <input type="number" step="0.01" min="0" class="table-input table-input-num item-price" value="${it.valor_unitario.toFixed(2)}">
        </td>
        <td class="subtotal-cell item-subtotal">
          R$ ${it.subtotal.toFixed(2).replace('.', ',')}
        </td>
        <td style="width: 40px; text-align: center;">
          <button type="button" class="btn-remove-row" title="Remover Linha">
            <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
      hookRowEvents(tr);
    });
    reindexRows(tbody);
  }

  updateCalculations();
}

function clearFormAndStartNew() {
  localStorage.removeItem('jj_orc_draft');
  
  const nextSeq = getNextSequenceNumber();
  document.getElementById('orcNumber').value = `ORC-${new Date().getFullYear()}-${String(nextSeq).padStart(4, '0')}`;
  document.getElementById('orcDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('orcValidade').value = '15 dias';

  document.getElementById('clientName').value = '';
  document.getElementById('clientDoc').value = '';
  document.getElementById('clientPhone').value = '';
  document.getElementById('clientEmail').value = '';
  document.getElementById('clientCity').value = '';
  document.getElementById('clientAddress').value = '';

  document.getElementById('orcDiscount').value = '0';
  document.getElementById('orcShipping').value = '0';
  document.getElementById('orcNotes').value = '';

  const tbody = document.getElementById('itemsTableBody');
  tbody.innerHTML = '';
  addNewRow(tbody, 'pbr', 100);

  updateCalculations();
  showToast('Formulário limpo para novo orçamento.');
}

// Auto-Draft Recovery
function saveAutoDraft() {
  const data = collectFormData();
  localStorage.setItem('jj_orc_draft', JSON.stringify(data));
}

function loadAutoDraft() {
  const draftStr = localStorage.getItem('jj_orc_draft');
  if (draftStr) {
    try {
      const draft = JSON.parse(draftStr);
      if (draft && draft.cliente && (draft.cliente.nome || draft.itens.length > 1)) {
        populateForm(draft);
      }
    } catch (e) {
      console.warn('Erro ao carregar rascunho:', e);
    }
  }
}

// =========================================================================
// PYTHON BACKEND INTEGRATION STUB
// (Pronto para conectar com a API em Python quando estiver disponível)
// =========================================================================
async function sendToPythonBackend(orcamentoData) {
  const PYTHON_API_URL = 'http://localhost:8000/api/orcamentos'; // Altere para a rota do backend

  try {
    const response = await fetch(PYTHON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orcamentoData)
    });

    if (response.ok) {
      console.log('✅ Orçamento sincronizado com o backend Python!');
    }
  } catch (err) {
    // Modo offline / backend ainda não iniciado (silencioso para o usuário)
    console.info('ℹ️ Backend em Python não detectado no momento. Orçamento salvo localmente.');
  }
}
