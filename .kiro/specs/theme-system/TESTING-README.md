# Sistema de Temas - Testes

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest ts-jest identity-obj-proxy
```

### 2. Executar Testes

```bash
# Todos os testes
npm test

# Com cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

## 📁 Arquivos Criados

### Testes Automatizados
- `context/__tests__/ThemeContext.test.tsx` - 8 testes
- `components/__tests__/ThemeToggle.test.tsx` - 7 testes

### Configuração
- `jest.config.js` - Configuração do Jest
- `jest.setup.js` - Setup inicial
- `package.json` - Scripts de teste adicionados

### Documentação
- `test-plan.md` - Plano completo de testes manuais (11 cenários)
- `testing-guide.md` - Guia detalhado de configuração e execução
- `test-execution-summary.md` - Resumo de cobertura e status
- `TESTING-README.md` - Este arquivo (referência rápida)

## ✅ Cobertura de Requisitos

**15 testes automatizados** cobrindo:
- ✅ Inicialização com tema claro (Req 1.1-1.3)
- ✅ Alternância entre temas (Req 2.1-2.2)
- ✅ Persistência no localStorage (Req 3.1-3.4)
- ✅ Transições sem recarregamento (Req 4.1-4.4)
- ✅ Indicadores visuais (Req 6.1-6.5)
- ✅ Acessibilidade (aria-labels, keyboard)
- ✅ Tratamento de erros

**11 cenários de teste manual** cobrindo:
- Inicialização e defaults
- Alternância e transições
- Persistência cross-session
- Adaptação de componentes (Req 5.1-5.7)
- Testes cross-browser
- Validação de contraste WCAG AA
- Casos extremos e erros

## 📊 Resultados Esperados

```
Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
Coverage:    > 85%
Time:        < 5 seconds
```

## 🔍 Testes Manuais Essenciais

### Teste Rápido (5 minutos)
1. Limpar localStorage → Recarregar → Verificar tema claro
2. Clicar botão → Verificar tema escuro + ícone sol
3. Recarregar → Verificar tema escuro mantido
4. Clicar botão → Verificar tema claro + ícone lua

### Teste Completo (30-45 minutos)
Seguir checklist detalhado em `test-plan.md`

## 🛠️ Troubleshooting

**Erro: Cannot find module '@testing-library/react'**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**Erro: document is not defined**
- Verificar `testEnvironment: 'jsdom'` no `jest.config.js`

**Testes não executam**
```bash
# Verificar instalação
npm list jest

# Reinstalar se necessário
npm install --save-dev jest
```

## 📚 Documentação Completa

- **Plano de Testes**: `test-plan.md`
- **Guia de Execução**: `testing-guide.md`
- **Resumo de Status**: `test-execution-summary.md`

## ✨ Próximos Passos

1. [ ] Instalar dependências de teste
2. [ ] Executar `npm test`
3. [ ] Verificar cobertura > 70%
4. [ ] Executar testes manuais do `test-plan.md`
5. [ ] Testar em 3+ navegadores
6. [ ] Validar acessibilidade com Lighthouse
7. [ ] Documentar resultados

## 📞 Suporte

Para questões sobre os testes:
1. Consultar `testing-guide.md` para instruções detalhadas
2. Verificar `test-plan.md` para cenários específicos
3. Revisar `requirements.md` e `design.md` para contexto
