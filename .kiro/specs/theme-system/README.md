# Sistema de Temas - Documentação Completa

## 📋 Visão Geral

Este diretório contém toda a documentação do sistema de temas da aplicação Status Report. O sistema permite aos usuários alternar entre temas claro e escuro, com persistência de preferências e transições suaves.

## 🎯 Objetivo

Fornecer uma experiência visual consistente e acessível, permitindo que os usuários escolham o tema que melhor se adapta ao seu ambiente e preferências.

## 📚 Documentação Disponível

### Documentos de Especificação

1. **[requirements.md](./requirements.md)**
   - Requisitos funcionais do sistema de temas
   - User stories e critérios de aceitação
   - Glossário de termos técnicos

2. **[design.md](./design.md)**
   - Arquitetura do sistema
   - Componentes e interfaces
   - Estratégia de testes
   - Considerações de performance e segurança

3. **[tasks.md](./tasks.md)**
   - Plano de implementação
   - Lista de tarefas executadas
   - Referências aos requisitos

### Guias para Desenvolvedores

4. **[THEME-DEVELOPER-GUIDE.md](./THEME-DEVELOPER-GUIDE.md)** ⭐
   - **Guia principal para desenvolvedores**
   - Como adicionar suporte a tema em novos componentes
   - Padrões de estilização
   - Exemplos práticos de código
   - Boas práticas e troubleshooting

5. **[THEME-COLOR-GUIDE.md](./THEME-COLOR-GUIDE.md)** 🎨
   - **Guia de referência de cores**
   - Paleta completa para ambos os temas
   - Tabelas de referência rápida
   - Diretrizes de contraste e acessibilidade
   - Exemplos de uso por categoria

### Troubleshooting e Correções

6. **[TROUBLESHOOTING-LIGHT-THEME.md](./TROUBLESHOOTING-LIGHT-THEME.md)** 🔧
   - **Solução do problema do tema claro**
   - Diagnóstico detalhado do problema
   - Configuração correta do Tailwind CDN
   - Como testar e verificar o funcionamento
   - Antes vs Depois da correção

7. **[TOPBAR-FIX.md](./TOPBAR-FIX.md)** 🎨
   - **Correção da topbar para tema claro**
   - Ajuste de cores fixas para cores adaptáveis
   - Padrão de cores da topbar
   - Comparação visual antes/depois

## 🚀 Início Rápido

### Para Desenvolvedores

Se você precisa adicionar suporte a tema em um novo componente:

1. Leia o **[THEME-DEVELOPER-GUIDE.md](./THEME-DEVELOPER-GUIDE.md)**
2. Consulte o **[THEME-COLOR-GUIDE.md](./THEME-COLOR-GUIDE.md)** para cores
3. Siga os exemplos práticos fornecidos

### Exemplo Básico

```tsx
import React from 'react';

const MyComponent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4">Meu Componente</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Este componente suporta ambos os temas!
      </p>
    </div>
  );
};

export default MyComponent;
```

## 🏗️ Arquitetura

### Componentes Principais

```
Sistema de Temas
├── ThemeContext (context/ThemeContext.tsx)
│   ├── Gerencia estado global do tema
│   ├── Fornece hook useTheme()
│   └── Persiste no localStorage
│
├── ThemeProvider
│   ├── Envolve a aplicação
│   └── Fornece contexto para componentes
│
└── ThemeToggle (components/ThemeToggle.tsx)
    ├── Botão de alternância
    └── Indicadores visuais (Sun/Moon)
```

### Fluxo de Dados

```
Usuário clica no ThemeToggle
    ↓
toggleTheme() é chamado
    ↓
Estado do tema é atualizado
    ↓
useEffect detecta mudança
    ↓
Classe 'dark' é aplicada/removida do <html>
    ↓
Tailwind CSS aplica estilos dark:
    ↓
localStorage é atualizado
```

## 🎨 Temas Disponíveis

### Tema Claro (Light)
- Fundo: Branco e tons claros de slate
- Texto: Tons escuros de gray
- Ideal para ambientes bem iluminados

### Tema Escuro (Dark)
- Fundo: Tons escuros de slate
- Texto: Tons claros de gray
- Ideal para ambientes com pouca luz

## ✅ Funcionalidades

- ✅ Alternância entre temas claro e escuro
- ✅ Tema claro como padrão inicial
- ✅ Persistência de preferência no localStorage
- ✅ Transições suaves (300ms)
- ✅ Indicadores visuais claros (ícones Sun/Moon)
- ✅ Acessibilidade (WCAG AA)
- ✅ Tratamento de erros (localStorage indisponível)
- ✅ Sem recarregamento de página

## 🧪 Testes

O sistema de temas possui testes automatizados para:
- Inicialização com tema correto
- Alternância entre temas
- Persistência no localStorage
- Renderização de componentes
- Acessibilidade

Execute os testes com:
```bash
npm test
```

## 📖 Como Usar

### Para Usuários

1. Localize o botão de tema no canto superior direito
2. Clique no botão para alternar entre temas
3. Sua preferência será salva automaticamente

### Para Desenvolvedores

#### 1. Usar o hook useTheme

```tsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Alternar</button>
    </div>
  );
}
```

#### 2. Usar classes Tailwind dark:

```tsx
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">
  Conteúdo adaptável ao tema
</div>
```

#### 3. Adicionar transições

```tsx
<div className="... transition-colors duration-300">
  Transição suave entre temas
</div>
```

## 🎯 Boas Práticas

### ✅ Fazer

- Sempre adicionar `transition-colors duration-300`
- Usar pares de cores consistentes (consulte o guia de cores)
- Testar ambos os temas durante o desenvolvimento
- Verificar contraste de cores (WCAG AA)
- Seguir os padrões estabelecidos no guia

### ❌ Evitar

- Estilos inline para cores
- Cores sem par dark: correspondente
- Esquecer estados hover/focus
- Cores muito vibrantes no tema escuro
- Assumir que o tema é sempre 'light'

## 🔧 Configuração Técnica

### Tailwind CSS

O projeto usa Tailwind CSS com dark mode configurado como 'class':

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

### TypeScript

Tipos disponíveis:

```typescript
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

## 📊 Métricas de Acessibilidade

- ✅ Contraste WCAG AA em todos os textos
- ✅ Aria-labels em elementos interativos
- ✅ Navegação por teclado
- ✅ Indicadores visuais claros
- ✅ Sem dependência apenas de cor

## 🐛 Troubleshooting

### Problema: Tema claro não funciona

**Causa**: Falta de configuração do dark mode no Tailwind CDN

**Solução**: Verificar se existe a configuração inline no `index.html`:
```html
<script>
    tailwind.config = {
        darkMode: 'class',
    }
</script>
```

📖 **Documentação completa**: [TROUBLESHOOTING-LIGHT-THEME.md](./TROUBLESHOOTING-LIGHT-THEME.md)

### Problema: Tema não muda

**Solução**: Verifique se o ThemeProvider está envolvendo a aplicação

### Problema: Cores não contrastam

**Solução**: Consulte o [THEME-COLOR-GUIDE.md](./THEME-COLOR-GUIDE.md) para cores aprovadas

### Problema: localStorage não funciona

**Solução**: O sistema já trata isso graciosamente, usando estado em memória

Para mais problemas, consulte a seção Troubleshooting no [THEME-DEVELOPER-GUIDE.md](./THEME-DEVELOPER-GUIDE.md)

## 📝 Manutenção

### Adicionando Novas Cores

1. Teste o contraste em ambos os temas
2. Adicione ao [THEME-COLOR-GUIDE.md](./THEME-COLOR-GUIDE.md)
3. Atualize exemplos se necessário
4. Documente o uso

### Atualizando Componentes

1. Siga o [THEME-DEVELOPER-GUIDE.md](./THEME-DEVELOPER-GUIDE.md)
2. Use cores do [THEME-COLOR-GUIDE.md](./THEME-COLOR-GUIDE.md)
3. Teste ambos os temas
4. Verifique acessibilidade

## 🔗 Links Úteis

### Documentação Externa

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [React Context API](https://react.dev/reference/react/useContext)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Arquivos do Projeto

- `context/ThemeContext.tsx` - Implementação do contexto
- `components/ThemeToggle.tsx` - Botão de alternância
- `App.tsx` - Integração na aplicação

## 👥 Contribuindo

Para contribuir com melhorias no sistema de temas:

1. Leia toda a documentação
2. Siga os padrões estabelecidos
3. Teste em ambos os temas
4. Atualize a documentação se necessário
5. Verifique acessibilidade

## 📄 Licença

Este sistema de temas faz parte da aplicação Status Report.
Todos os direitos reservados para DIGEST Processos.

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o sistema de temas:

1. Consulte esta documentação
2. Verifique os guias específicos
3. Entre em contato com a equipe de desenvolvimento

---

**Última atualização**: Novembro 2025

**Versão**: 1.0.0

**Status**: ✅ Implementado e Documentado
