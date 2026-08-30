---
name: ui-ux-pro-max
description: Motor de inteligência de design com taxonomia de 84 estilos visuais, tokens semânticos e boas práticas de layout.
---

# ⚡ UI-UX Pro Max (Design Intelligence)

Esta habilidade fornece o catálogo de taxonomia visual e tokens de design para arquitetura de interfaces.

## 📐 Estilos Visuais Relevantes para Logística B2B

### 1. Industrial Precision & Clean Heavy Duty (Estilo Principal)
- **Atributos**: Bordas limpas (`1px solid #E2E8F0`), paleta com fundo claro (#FAFAF9), acentos em Laranja Industrial (`#F26522`), tipografia de alto impacto e especificações técnicas visíveis em badges.
- **Uso**: Páginas comerciais, catálogo técnico de produtos e calculadoras de carga.

### 2. Clean SaaS / B2B Dashboard (Para Emissores & Ferramentas)
- **Atributos**: Cartões com elevação sutil (`box-shadow: 0 1px 3px rgba(0,0,0,0.06)`), cabeçalhos de seções organizados, formulários em grid balanceado, pré-visualização de documentos em folha A4 com escala responsiva.
- **Uso**: Emissor de Orçamentos B2B (`gerador-orcamento.html`).

---

## 🎨 Paleta Semântica de Tokens CSS

```css
:root {
  /* Marca & Destaque */
  --color-primary: #F26522;
  --color-primary-hover: #D84B06;
  --color-primary-dark: #A63B00;
  --color-primary-light: #FFF3ED;
  --color-primary-dim: #FFD5C2;

  /* Superfícies & Fundos */
  --color-bg: #FAFAF9;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F8FAFC;
  --color-surface-muted: #F1F5F9;

  /* Textos & Contraste */
  --color-dark: #111315;
  --color-text: #1F242D;
  --color-text-muted: #64748B;
  --color-text-secondary: #475569;

  /* Bordas */
  --color-border: #E2E8F0;
  --color-border-subtle: #F1F5F9;
  --color-border-focus: #F26522;

  /* Acentos de Ação */
  --color-whatsapp: #25D366;
  --color-whatsapp-hover: #1EB956;
  --color-danger: #DC2626;
  --color-success: #16A34A;

  /* Tipografia */
  --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Sombras Estruturadas */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03);
  --shadow-glow: 0 0 20px rgba(242, 101, 34, 0.2);

  /* Raios de Borda */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```
