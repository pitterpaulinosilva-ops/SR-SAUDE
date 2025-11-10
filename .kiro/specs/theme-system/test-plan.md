# Plano de Testes - Sistema de Temas

## Visão Geral

Este documento descreve o plano de testes completo para o sistema de temas da aplicação Status Report. Os testes cobrem todos os requisitos especificados no documento de requisitos.

## Testes Automatizados

### Configuração Necessária

Para executar os testes automatizados, instale as seguintes dependências:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest
```

### Arquivos de Teste

- `context/__tests__/ThemeContext.test.tsx` - Testes do contexto de tema
- `components/__tests__/ThemeToggle.test.tsx` - Testes do componente de alternância

### Executar Testes

```bash
npm test
```

## Testes Manuais

### 1. Teste de Inicialização com Tema Claro (Requisitos 1.1, 1.2, 1.3)

**Objetivo**: Verificar que a aplicação sempre inicia com o tema claro quando não há preferência salva.

**Passos**:
1. Abrir o DevTools do navegador (F12)
2. Ir para a aba "Application" > "Local Storage"
3. Deletar a chave `theme` se existir
4. Recarregar a página (F5)

**Resultado Esperado**:
- ✅ A aplicação deve exibir o tema claro
- ✅ O fundo deve ser claro (branco/cinza claro)
- ✅ O texto deve ser escuro
- ✅ O botão de alternância deve mostrar o ícone de lua (Moon)
- ✅ O localStorage deve conter `theme: "light"`

**Status**: [ ] Passou [ ] Falhou

---

### 2. Teste de Alternância de Temas (Requisitos 2.1, 2.2, 2.3)

**Objetivo**: Verificar que o usuário pode alternar entre temas claro e escuro.

**Passos**:
1. Com a aplicação no tema claro, clicar no botão de alternância (ícone de lua)
2. Observar a mudança visual
3. Clicar novamente no botão (agora ícone de sol)
4. Observar a mudança visual

**Resultado Esperado**:
- ✅ Ao clicar no ícone de lua, o tema deve mudar para escuro
- ✅ O ícone deve mudar de lua para sol
- ✅ Ao clicar no ícone de sol, o tema deve voltar para claro
- ✅ O ícone deve mudar de sol para lua
- ✅ A transição deve ser suave (300ms)
- ✅ Não deve haver recarregamento da página

**Status**: [ ] Passou [ ] Falhou

---

### 3. Teste de Persistência (Requisitos 3.1, 3.2, 3.3, 3.4)

**Objetivo**: Verificar que a preferência de tema é salva e carregada corretamente.

**Passos**:
1. Alternar para o tema escuro
2. Abrir o DevTools > Application > Local Storage
3. Verificar o valor da chave `theme`
4. Recarregar a página (F5)
5. Verificar se o tema escuro permanece
6. Alternar para o tema claro
7. Recarregar a página novamente

**Resultado Esperado**:
- ✅ Após alternar para escuro, localStorage deve conter `theme: "dark"`
- ✅ Após recarregar, o tema escuro deve permanecer ativo
- ✅ Após alternar para claro, localStorage deve conter `theme: "light"`
- ✅ Após recarregar, o tema claro deve permanecer ativo

**Status**: [ ] Passou [ ] Falhou

---

### 4. Teste de Transições Suaves (Requisitos 4.1, 4.2, 4.3, 4.4)

**Objetivo**: Verificar que as transições entre temas são suaves e não interrompem a experiência do usuário.

**Passos**:
1. Rolar a página até o meio do conteúdo
2. Preencher algum campo de entrada (se houver)
3. Alternar o tema
4. Verificar a posição de rolagem
5. Verificar o conteúdo dos campos

**Resultado Esperado**:
- ✅ A transição de cores deve levar aproximadamente 300ms
- ✅ A página não deve recarregar
- ✅ A posição de rolagem deve ser mantida
- ✅ O conteúdo dos campos deve ser preservado
- ✅ Não deve haver "flash" ou mudança brusca de cores

**Status**: [ ] Passou [ ] Falhou

---

### 5. Teste de Adaptação de Componentes (Requisitos 5.1-5.7)

**Objetivo**: Verificar que todos os componentes se adaptam corretamente aos temas.

**Componentes a Verificar**:

#### 5.1 Topbar (Header)
**Passos**:
1. Observar o cabeçalho no tema claro
2. Alternar para tema escuro
3. Observar as mudanças

**Resultado Esperado**:
- ✅ Tema claro: fundo `#2c3e50`
- ✅ Tema escuro: fundo mais escuro com transição suave
- ✅ Bordas devem se adaptar ao tema

#### 5.2 Footer
**Passos**:
1. Rolar até o rodapé
2. Alternar entre temas

**Resultado Esperado**:
- ✅ Tema claro: fundo branco/transparente
- ✅ Tema escuro: fundo escuro/transparente
- ✅ Texto deve ter contraste adequado

#### 5.3 Cards e Componentes
**Passos**:
1. Observar todos os cards no dashboard
2. Alternar entre temas

**Resultado Esperado**:
- ✅ Cards devem ter fundos apropriados para cada tema
- ✅ Bordas devem ser visíveis em ambos os temas
- ✅ Texto deve ter contraste adequado (WCAG AA)

#### 5.4 Botões
**Passos**:
1. Observar o botão "Saúde (ONA)"
2. Passar o mouse sobre o botão
3. Alternar entre temas

**Resultado Esperado**:
- ✅ Botões devem ter cores apropriadas em ambos os temas
- ✅ Estados hover devem ser visíveis
- ✅ Transições devem ser suaves

**Status**: [ ] Passou [ ] Falhou

---

### 6. Teste de Indicadores Visuais (Requisitos 6.1-6.5)

**Objetivo**: Verificar que o botão de alternância fornece feedback visual claro.

**Passos**:
1. Observar o botão no tema claro
2. Passar o mouse sobre o botão
3. Clicar no botão
4. Observar o botão no tema escuro
5. Passar o mouse sobre o botão novamente

**Resultado Esperado**:
- ✅ Tema claro: ícone de lua (Moon) é exibido
- ✅ Tema escuro: ícone de sol (Sun) é exibido
- ✅ Hover: cor de fundo muda suavemente
- ✅ Click: transição suave para o novo tema
- ✅ Botão tem formato circular (rounded-full)
- ✅ Ícones têm tamanho adequado (w-5 h-5)

**Status**: [ ] Passou [ ] Falhou

---

### 7. Teste de Acessibilidade (Requisitos 6.4)

**Objetivo**: Verificar que o sistema de temas é acessível.

**Passos**:
1. Usar um leitor de tela (NVDA, JAWS, ou VoiceOver)
2. Navegar até o botão de alternância usando Tab
3. Ativar o botão usando Enter ou Espaço
4. Verificar o anúncio do leitor de tela

**Resultado Esperado**:
- ✅ O botão deve ter aria-label "Toggle theme"
- ✅ O leitor de tela deve anunciar o propósito do botão
- ✅ O botão deve ser acessível via teclado
- ✅ O foco deve ser visível

**Status**: [ ] Passou [ ] Falhou

---

### 8. Teste de Contraste (Requisito 5.7)

**Objetivo**: Verificar que o contraste de cores atende aos padrões WCAG AA.

**Ferramentas**: 
- Chrome DevTools > Lighthouse
- WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)

**Passos**:
1. Executar Lighthouse Accessibility Audit no tema claro
2. Executar Lighthouse Accessibility Audit no tema escuro
3. Verificar manualmente cores críticas

**Resultado Esperado**:
- ✅ Texto normal: contraste mínimo de 4.5:1
- ✅ Texto grande: contraste mínimo de 3:1
- ✅ Elementos interativos: contraste adequado
- ✅ Score de acessibilidade > 90 no Lighthouse

**Status**: [ ] Passou [ ] Falhou

---

## Testes em Diferentes Navegadores

### 9. Teste Cross-Browser

**Objetivo**: Verificar compatibilidade em diferentes navegadores.

**Navegadores a Testar**:
- [ ] Google Chrome (versão mais recente)
- [ ] Mozilla Firefox (versão mais recente)
- [ ] Microsoft Edge (versão mais recente)
- [ ] Safari (se disponível)

**Para cada navegador, verificar**:
1. Inicialização com tema claro
2. Alternância de temas
3. Persistência após recarregar
4. Transições suaves
5. Aparência visual correta

**Resultado Esperado**:
- ✅ Funcionalidade idêntica em todos os navegadores
- ✅ Aparência visual consistente
- ✅ Sem erros no console

**Status por Navegador**:
- Chrome: [ ] Passou [ ] Falhou
- Firefox: [ ] Passou [ ] Falhou
- Edge: [ ] Passou [ ] Falhou
- Safari: [ ] Passou [ ] Falhou

---

## Testes de Casos Extremos

### 10. Teste de Erro no localStorage

**Objetivo**: Verificar comportamento quando localStorage não está disponível.

**Passos**:
1. Abrir DevTools > Console
2. Executar: `Object.defineProperty(window, 'localStorage', { value: null })`
3. Recarregar a página
4. Tentar alternar temas

**Resultado Esperado**:
- ✅ Aplicação deve funcionar normalmente
- ✅ Tema padrão (claro) deve ser usado
- ✅ Alternância deve funcionar (sem persistência)
- ✅ Não deve haver erros críticos no console
- ✅ Warning apropriado deve aparecer no console

**Status**: [ ] Passou [ ] Falhou

---

### 11. Teste de Valor Inválido no localStorage

**Objetivo**: Verificar tratamento de valores inválidos.

**Passos**:
1. Abrir DevTools > Application > Local Storage
2. Definir `theme` como valor inválido (ex: "invalid", "123", etc.)
3. Recarregar a página

**Resultado Esperado**:
- ✅ Aplicação deve usar tema claro como padrão
- ✅ Valor inválido deve ser substituído por "light"
- ✅ Não deve haver erros no console

**Status**: [ ] Passou [ ] Falhou

---

## Resumo de Cobertura de Requisitos

| Requisito | Teste(s) | Status |
|-----------|----------|--------|
| 1.1, 1.2, 1.3 | Teste 1 | [ ] |
| 2.1, 2.2 | Teste 2 | [ ] |
| 2.3 | Teste 4 | [ ] |
| 2.4, 2.5 | Teste 6 | [ ] |
| 3.1, 3.2, 3.3, 3.4 | Teste 3 | [ ] |
| 4.1, 4.2, 4.3, 4.4 | Teste 4 | [ ] |
| 5.1-5.7 | Teste 5, 8 | [ ] |
| 6.1-6.5 | Teste 6, 7 | [ ] |

---

## Checklist Final

Antes de considerar o sistema de temas completo, verificar:

- [ ] Todos os testes automatizados passam
- [ ] Todos os testes manuais foram executados e passaram
- [ ] Testado em pelo menos 3 navegadores diferentes
- [ ] Contraste de cores verificado e aprovado
- [ ] Acessibilidade verificada com leitor de tela
- [ ] Casos extremos testados e tratados
- [ ] Documentação atualizada
- [ ] Código revisado e sem warnings críticos

---

## Notas de Execução

**Data**: _______________
**Testador**: _______________
**Ambiente**: _______________

**Observações**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Problemas Encontrados**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Ações Necessárias**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
