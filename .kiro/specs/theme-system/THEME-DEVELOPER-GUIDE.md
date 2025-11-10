# Guia do Desenvolvedor - Sistema de Temas

## Visão Geral

Este guia fornece instruções detalhadas sobre como adicionar suporte a temas em novos componentes da aplicação. O sistema de temas utiliza React Context API e Tailwind CSS com o modo `dark:` para alternar entre temas claro e escuro.

## Índice

1. [Conceitos Básicos](#conceitos-básicos)
2. [Como Adicionar Suporte a Tema em Componentes](#como-adicionar-suporte-a-tema-em-componentes)
3. [Padrões de Estilização](#padrões-de-estilização)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Boas Práticas](#boas-práticas)
6. [Troubleshooting](#troubleshooting)

---

## Conceitos Básicos

### Arquitetura do Sistema

O sistema de temas é composto por três partes principais:

1. **ThemeContext** (`context/ThemeContext.tsx`)
   - Gerencia o estado global do tema
   - Fornece o hook `useTheme()` para acesso ao tema
   - Persiste preferências no localStorage
   - Aplica classes CSS no elemento root

2. **ThemeProvider** (wrapper da aplicação)
   - Envolve toda a aplicação
   - Fornece contexto para todos os componentes filhos

3. **Tailwind CSS Dark Mode**
   - Configurado com `darkMode: 'class'`
   - Usa classes `dark:` para estilização condicional

### Como Funciona

1. O `ThemeProvider` adiciona a classe `light` ou `dark` ao elemento `<html>`
2. Tailwind CSS detecta essa classe e aplica estilos condicionais
3. Componentes usam classes `dark:` para definir estilos alternativos
4. Transições CSS suavizam as mudanças visuais

---

## Como Adicionar Suporte a Tema em Componentes

### Passo 1: Usar Classes Tailwind com Prefixo `dark:`

A forma mais simples de adicionar suporte a tema é usar classes Tailwind com o prefixo `dark:`:

```tsx
// ❌ Sem suporte a tema
<div className="bg-white text-gray-900">
  Conteúdo
</div>

// ✅ Com suporte a tema
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">
  Conteúdo
</div>
```

### Passo 2: Adicionar Transições Suaves

Para uma experiência visual agradável, adicione transições:

```tsx
<div className="bg-white dark:bg-slate-800 transition-colors duration-300">
  Conteúdo
</div>
```

### Passo 3: Acessar o Tema Programaticamente (Opcional)

Se precisar do valor do tema no JavaScript:

```tsx
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  // Usar o tema para lógica condicional
  const iconColor = theme === 'light' ? '#000000' : '#FFFFFF';
  
  return (
    <div className="bg-white dark:bg-slate-800">
      <p>Tema atual: {theme}</p>
    </div>
  );
}
```

---

## Padrões de Estilização

### Backgrounds (Fundos)

```tsx
// Fundos principais
className="bg-white dark:bg-slate-800"
className="bg-slate-50 dark:bg-slate-900"
className="bg-gray-100 dark:bg-gray-800"

// Fundos com transparência
className="bg-white/80 dark:bg-slate-800/80"

// Gradientes
className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
```

### Texto

```tsx
// Texto principal
className="text-gray-900 dark:text-gray-100"
className="text-gray-800 dark:text-gray-200"

// Texto secundário
className="text-gray-600 dark:text-gray-400"
className="text-gray-500 dark:text-gray-500"

// Texto de destaque
className="text-blue-600 dark:text-blue-400"
```

### Bordas

```tsx
// Bordas padrão
className="border border-gray-200 dark:border-gray-700"
className="border-t border-gray-300 dark:border-slate-700"

// Bordas com transparência
className="border border-white/20 dark:border-slate-700/20"
```

### Botões

```tsx
// Botão primário
className="bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600"

// Botão secundário
className="bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 hover:bg-slate-300 dark:hover:bg-slate-600"

// Sempre adicionar transição
className="... transition-colors duration-300"
```

### Cards

```tsx
<div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg transition-colors duration-300">
  <h3 className="text-gray-900 dark:text-gray-100">Título</h3>
  <p className="text-gray-600 dark:text-gray-400">Descrição</p>
</div>
```

### Inputs

```tsx
<input 
  className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
  placeholder="Digite aqui..."
/>
```

---

## Exemplos Práticos

### Exemplo 1: Card Simples

```tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default Card;
```

### Exemplo 2: Botão com Variantes

```tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-colors duration-300";
  
  const variantClasses = {
    primary: "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600",
    secondary: "bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 hover:bg-slate-300 dark:hover:bg-slate-600"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Exemplo 3: Modal/Dialog

```tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 transition-colors duration-300">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-slate-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>
        
        {/* Body */}
        <div className="px-6 py-4 text-gray-700 dark:text-gray-300">
          {children}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-slate-700 px-6 py-4 flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

### Exemplo 4: Componente com Lógica Condicional

```tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeAwareComponent: React.FC = () => {
  const { theme } = useTheme();
  
  // Usar o tema para lógica condicional
  const message = theme === 'light' 
    ? 'Você está usando o tema claro' 
    : 'Você está usando o tema escuro';
  
  const Icon = theme === 'light' ? Sun : Moon;
  
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg transition-colors duration-300">
      <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <Icon className="w-5 h-5" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ThemeAwareComponent;
```

---

## Boas Práticas

### ✅ Fazer

1. **Sempre adicionar transições**
   ```tsx
   className="... transition-colors duration-300"
   ```

2. **Usar pares de cores consistentes**
   ```tsx
   // Bom: cores complementares
   className="bg-white dark:bg-slate-800"
   
   // Evitar: cores sem relação
   className="bg-white dark:bg-red-900"
   ```

3. **Manter contraste adequado**
   - Seguir WCAG AA (mínimo 4.5:1 para texto normal)
   - Testar ambos os temas com ferramentas de contraste

4. **Adicionar suporte a tema desde o início**
   - Mais fácil do que refatorar depois
   - Mantém consistência visual

5. **Usar classes semânticas**
   ```tsx
   // Bom: semântico
   className="text-gray-600 dark:text-gray-400"
   
   // Evitar: valores arbitrários
   className="text-[#666] dark:text-[#999]"
   ```

### ❌ Evitar

1. **Não usar estilos inline para cores**
   ```tsx
   // ❌ Evitar
   <div style={{ backgroundColor: '#fff' }}>
   
   // ✅ Preferir
   <div className="bg-white dark:bg-slate-800">
   ```

2. **Não esquecer estados hover/focus**
   ```tsx
   // ❌ Incompleto
   className="bg-blue-600 dark:bg-blue-700"
   
   // ✅ Completo
   className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600"
   ```

3. **Não usar cores muito vibrantes no tema escuro**
   - Pode causar fadiga visual
   - Preferir tons mais suaves

4. **Não assumir que o tema é sempre 'light'**
   - Sempre testar ambos os temas
   - Considerar o tema escuro como igual em importância

---

## Troubleshooting

### Problema: Estilos não mudam ao alternar tema

**Causa**: Classe `dark` não está sendo aplicada ao elemento root

**Solução**: Verificar se o `ThemeProvider` está envolvendo a aplicação:
```tsx
// App.tsx ou index.tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Problema: Transições não funcionam

**Causa**: Falta a classe `transition-colors`

**Solução**: Adicionar transição aos elementos:
```tsx
className="... transition-colors duration-300"
```

### Problema: Cores não contrastam o suficiente

**Causa**: Escolha inadequada de cores

**Solução**: Usar ferramentas de contraste e seguir o guia de cores:
- Texto principal: `text-gray-900 dark:text-gray-100`
- Texto secundário: `text-gray-600 dark:text-gray-400`

### Problema: localStorage não funciona

**Causa**: Navegador bloqueia localStorage (modo privado, etc.)

**Solução**: O sistema já trata isso graciosamente, mas você pode adicionar fallback:
```tsx
try {
  localStorage.setItem('theme', theme);
} catch (error) {
  console.warn('localStorage not available');
  // Usar estado em memória apenas
}
```

### Problema: Componente não tem acesso ao tema

**Causa**: Componente está fora do `ThemeProvider`

**Solução**: Garantir que o componente está dentro da árvore do provider:
```tsx
<ThemeProvider>
  <YourComponent /> {/* ✅ Tem acesso */}
</ThemeProvider>
<AnotherComponent /> {/* ❌ Não tem acesso */}
```

---

## Recursos Adicionais

### Documentação Relacionada

- [Guia de Estilo de Cores](./THEME-COLOR-GUIDE.md)
- [Requisitos do Sistema](./requirements.md)
- [Design do Sistema](./design.md)

### Ferramentas Úteis

- [Tailwind CSS Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors - Paleta de Cores](https://coolors.co/)

### Exemplos no Código

Veja implementações reais no projeto:
- `components/ThemeToggle.tsx` - Botão de alternância
- `components/ActionPlanDashboard.tsx` - Dashboard com tema
- `App.tsx` - Layout principal com tema

---

## Conclusão

Seguindo este guia, você poderá adicionar suporte a temas em qualquer componente novo da aplicação de forma consistente e eficiente. Lembre-se sempre de:

1. Usar classes `dark:` do Tailwind
2. Adicionar transições suaves
3. Manter contraste adequado
4. Testar ambos os temas
5. Seguir os padrões estabelecidos

Para dúvidas ou sugestões, consulte a documentação completa ou entre em contato com a equipe de desenvolvimento.
