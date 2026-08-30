---
description: Diretrizes fundamentais de UI/UX, Acessibilidade WCAG AA e Anti-AI-Slop do ecossistema 2.agents
globs: ["**/*.html", "**/*.css", "**/*.js"]
---

# 🧠 Diretrizes de Frontend & UI/UX Design (JJ Paletes)

## 1. Princípios de Identidade e Autenticidade
- Evite designs genéricos e templates repetitivos.
- Alinhe todas as escolhas visuais à temática industrial, movimentação de cargas, agilidade e confiança logística.
- Toda página deve possuir uma hierarquia clara com um elemento de assinatura memorável.

## 2. Padrões de Acessibilidade (WCAG 2.1 Nível AA)
- **Contraste Mínimo**:
  - Texto normal: razão de contraste ≥ 4.5:1 contra o fundo.
  - Texto grande (≥ 18pt ou ≥ 14pt bold) e componentes de interface: razão de contraste ≥ 3.0:1.
- **Foco por Teclado**:
  - Todos os elementos interativos (`button`, `a`, `input`, `select`) devem exibir um indicador de foco claro e destacado via `:focus-visible` (ex: `outline: 2px solid var(--color-primary); outline-offset: 2px;`).
- **Alvos de Toque (Touch Targets)**:
  - Tamanho mínimo de **44×44px** em botões e links no mobile para evitar erros de clique.
- **Leitores de Tela e Semântica**:
  - Ícones decorativos devem possuir `aria-hidden="true"`.
  - Botões com apenas ícones devem ter `aria-label` descritivo.
  - Campos de formulário devem ter `<label>` explicitamente associado com `for="id"`.

## 3. Sistema de Cores e Tokens
- `--color-primary`: `#F26522` (Laranja Industrial)
- `--color-primary-dark`: `#D84B06`
- `--color-primary-light`: `#FFF3ED`
- `--color-dark`: `#111315`
- `--color-text`: `#1F242D`
- `--color-text-muted`: `#64748B`
- `--color-surface`: `#FFFFFF`
- `--color-bg`: `#FAFAF9`
- `--color-border`: `#E2E8F0`
- `--color-whatsapp`: `#25D366`

## 4. Tipografia
- Títulos (`h1`, `h2`, `h3`): **Inter** com pesos 600 a 800 e espaçamento proporcional.
- Corpo de texto: **Work Sans** com tamanho base de 16px e line-height entre 1.5 e 1.6.

## 5. Motion & Feedback
- Transições de 150ms a 250ms com curvas de aceleração naturais (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Todo botão deve fornecer feedback visual instantâneo ao clicar e passar o mouse.
- Respeitar preferências do sistema com `@media (prefers-reduced-motion: reduce)`.
