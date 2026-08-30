---
description: Checklist canônico de qualidade pré-entrega e regras pro de UI/UX
globs: ["**/*.html", "**/*.css", "**/*.js"]
---

# 🛡️ Regras Pro & Checklist de Qualidade Pré-Entrega

Antes de finalizar qualquer modificação de interface, valide cada item deste checklist:

### 1. Qualidade Visual & Consistência
- [ ] Não usar emojis como ícones de interface; usar ícones SVG/Material Symbols vetoriais com `aria-hidden="true"`.
- [ ] Todos os ícones pertencem à mesma família visual com dimensões proporcionais.
- [ ] Logotipo oficial com proporções corretas e área de respiro.
- [ ] Tokens de tema semânticos utilizados de ponta a ponta (sem cores hexadecimais soltas no HTML inline).

### 2. Interação & Usabilidade
- [ ] Todo elemento clicável fornece feedback imediato (`hover`, `active`, `focus`).
- [ ] Alvos de toque possuem no mínimo 44×44px em telas sensíveis ao toque.
- [ ] Estados desabilitados são visualmente claros e não interativos.
- [ ] Formulários possuem labels visíveis, validação em tempo real e mensagens de erro descritivas.

### 3. Contraste & Cores
- [ ] Contraste de texto principal ≥ 4.5:1 contra o fundo em todos os componentes.
- [ ] Bordas, divisores e botões secundários claramente distinguíveis.
- [ ] A cor não é o único indicador de estado ou erro (usar ícones + texto).

### 4. Responsividade & Layout
- [ ] Layout fluido sem rolagem horizontal no mobile (375px+).
- [ ] Respeito a áreas seguras (safe-areas) e espaçamento adequado para barras de navegação fixas.
- [ ] Ritmo vertical consistente com escala de espaçamento base 8px (8, 16, 24, 32, 48, 64px).

### 5. Acessibilidade
- [ ] Navegação por teclado funcional e fluida (ordem visual corresponde à ordem do DOM).
- [ ] Modais fecham com a tecla `Escape` e possuem foco gerenciado.
- [ ] Modos com `prefers-reduced-motion` desativam ou suavizam animações complexas.
