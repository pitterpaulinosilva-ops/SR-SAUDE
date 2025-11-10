# Guia de Testes - Sistema de Temas

## Visão Geral

Este guia fornece instruções completas para configurar e executar testes do sistema de temas.

## Configuração do Ambiente de Testes

### 1. Instalar Dependências de Teste

Execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest ts-jest identity-obj-proxy
```

### 2. Atualizar package.json

Adicione os seguintes scripts ao `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### 3. Arquivos de Configuração

Os seguintes arquivos de configuração foram criados:

- `jest.config.js` - Configuração principal do Jest
- `jest.setup.js` - Setup inicial para os testes

## Estrutura de Testes

```
project/
├── context/
│   ├── ThemeContext.tsx
│   └── __tests__/
│       └── ThemeContext.test.tsx
├── components/
│   ├── ThemeToggle.tsx
│   └── __tests__/
│       └── ThemeToggle.test.tsx
└── .kiro/specs/theme-system/
    ├── test-plan.md
    └── testing-guide.md
```

## Executar Testes

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes em Modo Watch

```bash
npm run test:watch
```

### Executar Testes com Cobertura

```bash
npm run test:coverage
```

### Executar Testes Específicos

```bash
# Testar apenas ThemeContext
npm test ThemeContext

# Testar apenas ThemeToggle
npm test ThemeToggle
```

## Testes Automatizados

### ThemeContext Tests

**Arquivo**: `context/__tests__/ThemeContext.test.tsx`

**Cobertura**:
- ✅ Inicialização com tema claro (Req 1.1, 1.2, 1.3)
- ✅ Alternância entre temas (Req 2.1, 2.2)
- ✅ Persistência no localStorage (Req 3.2, 3.3)
- ✅ Manutenção de estado (Req 4.1)
- ✅ Tratamento de erros
- ✅ Validação do hook useTheme

### ThemeToggle Tests

**Arquivo**: `components/__tests__/ThemeToggle.test.tsx`

**Cobertura**:
- ✅ Exibição de ícones corretos (Req 6.1, 6.2)
- ✅ Alternância via clique (Req 2.4, 2.5)
- ✅ Acessibilidade (Req 6.3, 6.4, 6.5)
- ✅ Estilos e transições
- ✅ Tamanho de ícones

## Testes Manuais

Para testes manuais detalhados, consulte o arquivo `test-plan.md`.

### Checklist Rápido de Testes Manuais

1. **Inicialização**
   - [ ] Limpar localStorage
   - [ ] Recarregar página
   - [ ] Verificar tema claro ativo

2. **Alternância**
   - [ ] Clicar no botão de tema
   - [ ] Verificar mudança para escuro
   - [ ] Clicar novamente
   - [ ] Verificar mudança para claro

3. **Persistência**
   - [ ] Alternar para escuro
   - [ ] Recarregar página
   - [ ] Verificar tema escuro mantido

4. **Visual**
   - [ ] Verificar transições suaves
   - [ ] Verificar todos os componentes adaptados
   - [ ] Verificar contraste adequado

## Interpretando Resultados

### Testes Passando

```
PASS  context/__tests__/ThemeContext.test.tsx
PASS  components/__tests__/ThemeToggle.test.tsx

Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```

### Cobertura de Código

Objetivo: > 70% de cobertura em todas as métricas

```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
ThemeContext.tsx      |   95.00 |    85.00 |  100.00 |   95.00 |
ThemeToggle.tsx       |  100.00 |   100.00 |  100.00 |  100.00 |
```

## Troubleshooting

### Erro: "Cannot find module '@testing-library/react'"

**Solução**: Instalar dependências de teste
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Erro: "ReferenceError: document is not defined"

**Solução**: Verificar que `testEnvironment: 'jsdom'` está configurado no `jest.config.js`

### Erro: "localStorage is not defined"

**Solução**: Os testes já incluem mock do localStorage. Verificar que o mock está sendo aplicado corretamente.

### Testes Lentos

**Solução**: Usar modo watch para desenvolvimento
```bash
npm run test:watch
```

## Melhores Práticas

### 1. Escrever Testes Antes de Modificar Código

Sempre execute os testes antes de fazer mudanças para garantir que eles passam.

### 2. Testar Comportamento, Não Implementação

Foque em testar o que o usuário vê e interage, não detalhes internos.

### 3. Manter Testes Simples e Legíveis

Cada teste deve ter um propósito claro e ser fácil de entender.

### 4. Usar Descrições Claras

```typescript
// ✅ Bom
it('should display moon icon when light theme is active', () => {
  // ...
});

// ❌ Ruim
it('test icon', () => {
  // ...
});
```

### 5. Limpar Estado Entre Testes

Use `beforeEach` para garantir que cada teste começa com estado limpo.

## Integração Contínua

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Próximos Passos

1. ✅ Configurar ambiente de testes
2. ✅ Executar testes automatizados
3. ✅ Executar testes manuais (ver test-plan.md)
4. ✅ Verificar cobertura de código
5. ✅ Testar em diferentes navegadores
6. ✅ Validar acessibilidade
7. ✅ Documentar resultados

## Recursos Adicionais

- [Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contato e Suporte

Para questões sobre os testes, consulte:
- Documentação de requisitos: `requirements.md`
- Documentação de design: `design.md`
- Plano de testes detalhado: `test-plan.md`
