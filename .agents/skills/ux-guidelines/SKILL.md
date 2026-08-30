---
name: ux-guidelines
description: Síntese das 119 diretrizes de usabilidade, formulários acessíveis, feedback de estados e padrões de interação.
---

# 📖 Guia de Usabilidade & 119 Diretrizes UX

Esta habilidade compila os padrões de usabilidade e boas práticas de interação para interfaces web e mobile.

## 🎯 1. Interação & Alvos de Toque
- Mantenha áreas clicáveis com no mínimo **44×44px** em todos os dispositivos móveis.
- Forneça feedback visual (`transform`, `box-shadow`, alteração de opacidade) em no máximo 100ms após a interação.
- Adicione espaçamento mínimo de 8px entre botões adjacentes para evitar cliques acidentais.

## 📝 2. Formulários de Alta Conversão
- Sempre posicione o `<label>` acima ou visível ao lado do campo — nunca use apenas `placeholder` como rótulo.
- Destaque o campo ativo com borda colorida e sombra suave (`outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(242,101,34,0.15)`).
- Ofereça mensagens de validação descritivas imediatamente ao lado do campo que precisa de correção.
- Facilite o preenchimento no celular utilizando tipos corretos de input (`type="tel"`, `type="email"`, `type="number"`).

## 🧭 3. Navegação & Modais
- Ao abrir um modal, impeça a rolagem do fundo (`overflow: hidden` no `body`).
- Permita fechar modais clicando fora da caixa, no botão de fechar (X) ou pressionando a tecla `Escape`.
- Ao fechar o modal, retorne o foco para o botão que o acionou.
- Destaque o link correspondente à página atual na barra de navegação principal (`aria-current="page"` e classe `active`).

## ⚡ 4. Notificações & Feedback
- Utilize toasts flutuantes não intrusivos com tempo de exibição adequado (3 a 4 segundos) para confirmar ações.
- Em envios para WhatsApp, exiba aviso claro de carregamento/redirecionamento antes de abrir a nova janela.
