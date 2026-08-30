# 🧠 AGENTS.md — Memória & Governança de Frontend & UI/UX

> **Escopo**: Este arquivo governa todas as decisões de interface (UI), experiência do usuário (UX), design visual, tipografia, paletas de cores, animações e acessibilidade para o projeto **JJ Comércio de Paletes**.

---

## 🎯 Identidade & Direção Criativa

O projeto segue a direção estética **Industrial Precision & Clean Heavy Duty**:
- **Personalidade**: Robusto, confiável, técnico, ágil e comercialmente direto.
- **Anti-"AI Slop"**: Proibido usar paletas genéricas sem identidade (ex: creme sem contraste ou degradês sem propósito). Cada elemento deve refletir o universo logístico da madeira, transporte, armazenagem e atendimento B2B ágil.
- **Herói como Tese**: A seção principal (Hero) comunica imediatamente o valor: paletes resistentes, entrega rápida na região de Cabreúva/Jundiaí e facilidade de cotação direta.

---

## 🧭 Hierarquia de Prioridades UX (1 → 10)

1. **Acessibilidade (CRÍTICO)**:
   - Contraste de texto mínimo de **4.5:1** (WCAG AA).
   - Foco visível por teclado com `:focus-visible` em todos os botões, links e inputs.
   - Textos alternativos (`alt`) descritivos e `aria-label` em botões de ícone.
2. **Alvos de Toque & Interação (CRÍTICO)**:
   - Tamanho mínimo de toque: **44×44px** com espaçamento ≥ 8px.
   - Feedback visual imediato para estados `hover`, `active`, `focus` e `loading`.
3. **Performance & Estabilidade Visual (ALTO)**:
   - Imagens otimizadas com dimensões explícitas para evitar Cumulative Layout Shift (CLS < 0.1).
4. **Consistência de Estilo (ALTO)**:
   - Ícones SVG consistentes via Material Symbols ou Lucide — nunca emojis como ícones de interface.
   - Tokens de design semânticos e consistentes (`--color-primary`, `--color-dark`, `--color-surface`, `--color-border`).
5. **Layout & Responsividade (ALTO)**:
   - Mobile-first, sem rolagem horizontal indesejada, grids adaptáveis para 375px até 1440px+.
6. **Tipografia & Cor (MÉDIO)**:
   - Títulos em **Inter** (pesos 600, 700, 800) e corpo em **Work Sans** (tamanho base 16px, line-height 1.5 a 1.6).
7. **Motion & Animação (MÉDIO)**:
   - Transições rápidas e intencionais (150ms a 250ms), respeitando `prefers-reduced-motion`.
8. **Formulários & Feedback (MÉDIO)**:
   - Labels sempre visíveis, validação inline amigável e mensagens de status claras.
9. **Navegação (ALTO)**:
   - Header com indicador de página ativa (`aria-current="page"`), menu mobile acessível e atalhos rápidos.
10. **Redação de Interface (Copywriting)**:
    - Voz ativa e direta ("Solicitar Orçamento", "Baixar PDF", "Falar no WhatsApp").

---

## 🛠️ Habilidades Disponíveis no Workspace
- `.agents/skills/ui-ux-pro-max/SKILL.md`: Taxonomia de estilos, design systems e tokens.
- `.agents/skills/frontend-design/SKILL.md`: Princípios de autenticidade estética e tipografia.
- `.agents/skills/ux-guidelines/SKILL.md`: 119 diretrizes de usabilidade e checklist de qualidade.
