# Design Document

## Overview

O sistema de temas será implementado utilizando React Context API para gerenciar o estado global do tema, com suporte a persistência via localStorage. A implementação já existe parcialmente no projeto, mas precisa ser ajustada para garantir que o tema claro seja o padrão inicial e que todas as funcionalidades estejam completas.

## Architecture

### Component Hierarchy

```
Root (ThemeProvider)
  └── AppContent
      ├── Header (Topbar)
      │   ├── Logo
      │   ├── Button (Saúde ONA)
      │   └── ThemeToggle
      ├── Main Content
      │   └── ActionPlanDashboard
      └── Footer
```

### State Management

- **Theme Context**: Gerencia o estado global do tema ('light' | 'dark')
- **Local Storage**: Persiste a preferência do usuário
- **CSS Classes**: Utiliza Tailwind CSS com classes dark: para estilização condicional

## Components and Interfaces

### ThemeContext

**Location**: `context/ThemeContext.tsx`

**Interface**:
```typescript
type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
```

**Responsibilities**:
- Gerenciar o estado atual do tema
- Fornecer função para alternar entre temas
- Aplicar classes CSS no elemento root do documento
- Persistir preferência no localStorage

**Implementation Details**:
- Inicializar com tema 'light' como padrão
- Verificar localStorage na inicialização
- Aplicar classe 'light' ou 'dark' no `document.documentElement`
- Salvar preferência no localStorage a cada mudança

### ThemeProvider

**Location**: `context/ThemeContext.tsx`

**Props**:
```typescript
interface ThemeProviderProps {
    children: ReactNode;
}
```

**Responsibilities**:
- Envolver a aplicação com o contexto de tema
- Inicializar o estado do tema
- Fornecer o contexto para componentes filhos

### ThemeToggle

**Location**: `components/ThemeToggle.tsx`

**Responsibilities**:
- Renderizar botão de alternância
- Exibir ícone apropriado (Moon para light, Sun para dark)
- Chamar toggleTheme ao ser clicado
- Fornecer feedback visual (hover, transitions)

**Styling**:
- Background: `bg-slate-200 dark:bg-slate-700`
- Hover: `hover:bg-slate-300 dark:hover:bg-slate-600`
- Transition: `transition-colors duration-300`
- Border radius: `rounded-full`
- Padding: `p-2`

## Data Models

### Theme State

```typescript
type Theme = 'light' | 'dark';
```

### LocalStorage Schema

```typescript
{
  "theme": "light" | "dark"
}
```

**Key**: `'theme'`
**Default Value**: `'light'`

## Error Handling

### LocalStorage Errors

- **Scenario**: localStorage não disponível ou bloqueado
- **Handling**: Usar estado em memória apenas, sem persistência
- **User Impact**: Tema não será persistido entre sessões

### Invalid Theme Value

- **Scenario**: Valor inválido no localStorage
- **Handling**: Resetar para tema padrão 'light'
- **User Impact**: Tema será resetado para claro

## Testing Strategy

### Unit Tests

1. **ThemeContext Tests**
   - Verificar inicialização com tema 'light'
   - Verificar leitura do localStorage
   - Verificar salvamento no localStorage
   - Verificar alternância entre temas

2. **ThemeToggle Tests**
   - Verificar renderização do ícone correto
   - Verificar chamada de toggleTheme ao clicar
   - Verificar acessibilidade (aria-label)

### Integration Tests

1. **Theme Persistence**
   - Verificar que tema é salvo ao alternar
   - Verificar que tema é carregado ao recarregar página

2. **Component Adaptation**
   - Verificar que todos os componentes aplicam classes corretas
   - Verificar contraste de cores em ambos os temas

### Visual Tests

1. **Theme Consistency**
   - Verificar que todos os componentes se adaptam
   - Verificar transições suaves
   - Verificar contraste adequado

## Implementation Notes

### Tailwind CSS Configuration

O projeto já utiliza Tailwind CSS com suporte a dark mode através da classe 'dark' no elemento root. A configuração deve estar em `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  // ... outras configurações
}
```

### CSS Transitions

Todos os componentes que mudam de cor devem incluir:
```css
transition-colors duration-300
```

### Accessibility

- Botão de alternância deve ter `aria-label="Toggle theme"`
- Ícones devem ter tamanho adequado (w-5 h-5)
- Contraste deve seguir WCAG AA (4.5:1 para texto normal)

## Performance Considerations

- Usar `useEffect` para aplicar mudanças no DOM
- Evitar re-renders desnecessários com `useContext`
- localStorage é síncrono, mas operações são rápidas
- Transições CSS são otimizadas pelo navegador

## Security Considerations

- localStorage é específico por domínio
- Não armazenar dados sensíveis
- Validar valores lidos do localStorage
