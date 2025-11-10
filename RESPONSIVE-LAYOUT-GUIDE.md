# 📱 Guia de Layout Responsivo - SR-SAUDE

## 📋 Visão Geral

Sistema de layout responsivo otimizado que maximiza o aproveitamento dos espaços úteis em todos os dispositivos, garantindo uma experiência consistente e agradável.

## 🎯 Objetivos

- ✅ Maximizar aproveitamento do espaço disponível
- ✅ Manter legibilidade e usabilidade em todas as resoluções
- ✅ Adaptar layout conforme tamanho da tela
- ✅ Otimizar performance e carregamento
- ✅ Seguir melhores práticas de design responsivo

## 📐 Breakpoints Padrão

### Sistema Tailwind CSS

| Breakpoint | Tamanho | Dispositivo | Uso |
|------------|---------|-------------|-----|
| `xs` | < 640px | Mobile Portrait | Layout vertical, 1 coluna |
| `sm` | ≥ 640px | Mobile Landscape | 2 colunas, espaçamento reduzido |
| `md` | ≥ 768px | Tablet Portrait | Sidebar visível, 2-3 colunas |
| `lg` | ≥ 1024px | Tablet Landscape | 3 colunas, espaçamento normal |
| `xl` | ≥ 1280px | Desktop | 3-4 colunas, layout completo |
| `2xl` | ≥ 1536px | Large Desktop | 4+ colunas, máximo aproveitamento |

## 🏗️ Estrutura do Layout

### 1. Container Principal

```tsx
<div className="min-h-screen flex flex-col">
  <Header />      {/* Fixo no topo */}
  <Main />        {/* Flex-grow, conteúdo principal */}
  <Footer />      {/* Fixo no rodapé */}
</div>
```

#### Características:
- **Mobile (< 768px)**: Padding 0.5rem (8px)
- **Tablet (768px - 1024px)**: Padding 1rem (16px)
- **Desktop (≥ 1024px)**: Padding 1.5-2rem (24-32px)
- **Max-width**: 2000px (evita linhas muito longas)

### 2. Header (Topbar)

```tsx
<header className="fixed top-0 left-0 right-0 z-50 h-16">
  <div className="container mx-auto px-4 py-3">
    {/* Logo, Botões, Theme Toggle */}
  </div>
</header>
```

#### Responsividade:
- **Mobile**: Logo menor, botão central oculto
- **Tablet**: Logo normal, botão visível
- **Desktop**: Layout completo com espaçamento

### 3. Sidebar

```tsx
<aside className="
  fixed md:sticky 
  w-64 sm:w-72 lg:w-80 xl:w-72
  h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]
">
  {/* Navegação */}
</aside>
```

#### Comportamento por Dispositivo:

**Mobile (< 768px)**
- Oculta por padrão
- Overlay quando aberta
- Largura: 256px (w-64)
- Botão toggle visível

**Tablet (768px - 1024px)**
- Sempre visível
- Largura: 288px (w-72)
- Sticky positioning

**Desktop (≥ 1024px)**
- Sempre visível
- Largura: 320px (lg) → 288px (xl)
- Otimizada para espaço

### 4. Conteúdo Principal

```tsx
<main className="flex-1 min-w-0 w-full">
  {/* Conteúdo dinâmico */}
</main>
```

#### Grid de Cards:

| Dispositivo | Colunas | Gap | Exemplo |
|-------------|---------|-----|---------|
| Mobile (< 640px) | 1 | 12px | `grid-cols-1 gap-3` |
| Mobile L (640px) | 2 | 16px | `sm:grid-cols-2 sm:gap-4` |
| Tablet (1024px) | 2 | 20px | `lg:grid-cols-2 lg:gap-5` |
| Desktop (1280px) | 3 | 24px | `xl:grid-cols-3 xl:gap-6` |
| Large (1536px) | 4 | 24px | `2xl:grid-cols-4` |

## 📊 Otimizações por Dispositivo

### Mobile (< 768px)

#### Layout
```css
- Sidebar: Collapse (overlay)
- Grid: 1 coluna
- Padding: 8-16px
- Font-size: 14-16px
- Espaçamento: Reduzido
```

#### Otimizações
- ✅ Touch targets ≥ 44px
- ✅ Botões full-width quando apropriado
- ✅ Scroll vertical otimizado
- ✅ Imagens responsivas
- ✅ Lazy loading de componentes

#### Exemplo
```tsx
<div className="px-2 sm:px-4">
  <h1 className="text-xl sm:text-2xl">Título</h1>
  <div className="grid grid-cols-1 gap-3">
    {/* Cards */}
  </div>
</div>
```

### Tablet (768px - 1024px)

#### Layout
```css
- Sidebar: Visível (288px)
- Grid: 2-3 colunas
- Padding: 16-24px
- Font-size: 16px
- Espaçamento: Normal
```

#### Otimizações
- ✅ Sidebar sempre visível
- ✅ 2 colunas para cards
- ✅ Gráficos otimizados
- ✅ Hover states ativos
- ✅ Navegação por teclado

#### Exemplo
```tsx
<div className="flex gap-4">
  <Sidebar className="w-72" />
  <main className="flex-1">
    <div className="grid grid-cols-2 gap-4">
      {/* Cards */}
    </div>
  </main>
</div>
```

### Desktop (≥ 1024px)

#### Layout
```css
- Sidebar: Visível (288-320px)
- Grid: 3-4 colunas
- Padding: 24-32px
- Font-size: 16px
- Espaçamento: Amplo
```

#### Otimizações
- ✅ Máximo aproveitamento horizontal
- ✅ 3-4 colunas para cards
- ✅ Gráficos em tamanho completo
- ✅ Animações suaves
- ✅ Atalhos de teclado

#### Exemplo
```tsx
<div className="flex gap-6 max-w-[2000px] mx-auto px-8">
  <Sidebar className="w-72" />
  <main className="flex-1">
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Cards */}
    </div>
  </main>
</div>
```

## 🎨 Tipografia Responsiva

### Tamanhos de Fonte

| Elemento | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| H1 | 24px (1.5rem) | 32px (2rem) | 36px (2.25rem) |
| H2 | 20px (1.25rem) | 24px (1.5rem) | 30px (1.875rem) |
| H3 | 18px (1.125rem) | 20px (1.25rem) | 24px (1.5rem) |
| Body | 14px (0.875rem) | 16px (1rem) | 16px (1rem) |
| Small | 12px (0.75rem) | 14px (0.875rem) | 14px (0.875rem) |

### Implementação

```tsx
// Título principal
<h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
  Título Responsivo
</h1>

// Parágrafo
<p className="text-sm sm:text-base">
  Texto responsivo
</p>

// Botão
<button className="text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-3">
  Botão Responsivo
</button>
```

## 📏 Espaçamento Responsivo

### Sistema de Padding/Margin

| Classe | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| `p-2 sm:p-4 lg:p-6` | 8px | 16px | 24px |
| `gap-3 sm:gap-4 lg:gap-6` | 12px | 16px | 24px |
| `space-y-4 sm:space-y-6` | 16px | 24px | - |

### Exemplo Prático

```tsx
<div className="
  p-2 sm:p-4 md:p-6 lg:p-8
  space-y-4 sm:space-y-6 lg:space-y-8
">
  <section className="
    rounded-lg sm:rounded-xl
    shadow-md sm:shadow-lg
  ">
    {/* Conteúdo */}
  </section>
</div>
```

## 🖼️ Imagens e Mídia

### Imagens Responsivas

```tsx
<img 
  src="/image.jpg"
  alt="Descrição"
  className="
    w-full h-auto
    max-w-full
    object-cover
    rounded-lg
  "
  loading="lazy"
/>
```

### Gráficos

```tsx
<div className="
  w-full
  h-64 sm:h-80 md:h-96 lg:h-[400px]
  overflow-hidden
">
  <ResponsiveChart />
</div>
```

## 🎯 Melhores Práticas

### 1. Mobile First

Sempre comece com o design mobile e adicione complexidade:

```tsx
// ✅ Correto
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// ❌ Evitar
<div className="grid grid-cols-3 sm:grid-cols-2 grid-cols-1">
```

### 2. Tamanhos Relativos

Use unidades relativas (rem, em, %) ao invés de pixels fixos:

```tsx
// ✅ Correto
<div className="text-base leading-relaxed">

// ❌ Evitar
<div style={{ fontSize: '16px', lineHeight: '24px' }}>
```

### 3. Flexbox e Grid

Prefira Flexbox e Grid para layouts flexíveis:

```tsx
// ✅ Correto
<div className="flex flex-col md:flex-row gap-4">

// ❌ Evitar
<div style={{ display: 'block', float: 'left' }}>
```

### 4. Touch Targets

Garanta que elementos interativos tenham pelo menos 44x44px:

```tsx
<button className="
  min-h-[44px] min-w-[44px]
  p-2 sm:p-3
  touch-manipulation
">
  Botão
</button>
```

### 5. Performance

Otimize carregamento e renderização:

```tsx
// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Imagens otimizadas
<img loading="lazy" decoding="async" />

// Conditional rendering
{isDesktop && <DesktopOnlyFeature />}
```

## 🧪 Testes de Responsividade

### Checklist de Testes

#### Mobile (375px - 414px)
- [ ] Layout em 1 coluna funciona
- [ ] Sidebar collapse funciona
- [ ] Touch targets ≥ 44px
- [ ] Texto legível (≥ 14px)
- [ ] Scroll suave
- [ ] Botões acessíveis

#### Tablet (768px - 1024px)
- [ ] Sidebar visível
- [ ] Grid de 2-3 colunas
- [ ] Espaçamento adequado
- [ ] Gráficos legíveis
- [ ] Navegação intuitiva

#### Desktop (≥ 1280px)
- [ ] Layout completo
- [ ] Grid de 3-4 colunas
- [ ] Máximo aproveitamento
- [ ] Animações suaves
- [ ] Atalhos funcionam

### Ferramentas de Teste

1. **Chrome DevTools**
   - Device Toolbar (Ctrl + Shift + M)
   - Responsive Mode
   - Network Throttling

2. **Firefox Responsive Design Mode**
   - Ctrl + Shift + M
   - Múltiplos dispositivos
   - Touch simulation

3. **Dispositivos Reais**
   - iPhone (Safari)
   - Android (Chrome)
   - iPad (Safari)

### Comandos de Teste

```bash
# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📱 Exemplos de Implementação

### Layout Completo

```tsx
<div className="min-h-screen flex flex-col">
  {/* Header */}
  <header className="fixed top-0 left-0 right-0 z-50 h-16">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <Logo className="h-8 sm:h-10" />
        <ThemeToggle />
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="flex-grow mt-16">
    <div className="max-w-[2000px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 lg:gap-6">
        {/* Sidebar */}
        <Sidebar className="w-64 sm:w-72 lg:w-80 xl:w-72" />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
            {/* Cards */}
          </div>
        </div>
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="p-4 sm:p-6">
    <p className="text-xs sm:text-sm text-center">
      © 2025 DIGEST Processos
    </p>
  </footer>
</div>
```

## 📊 Métricas de Performance

### Objetivos

| Métrica | Mobile | Desktop |
|---------|--------|---------|
| First Contentful Paint | < 1.8s | < 1.2s |
| Largest Contentful Paint | < 2.5s | < 2.0s |
| Time to Interactive | < 3.8s | < 3.0s |
| Cumulative Layout Shift | < 0.1 | < 0.1 |

### Otimizações Implementadas

- ✅ Code splitting
- ✅ Lazy loading de componentes
- ✅ Imagens otimizadas
- ✅ CSS minificado
- ✅ Tree shaking
- ✅ Compressão Gzip/Brotli

## 🔄 Manutenção

### Adicionar Novo Breakpoint

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px', // Novo breakpoint
    }
  }
}
```

### Atualizar Grid

```tsx
// Adicionar nova coluna para 3xl
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
```

## 📚 Recursos Adicionais

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive](https://web.dev/responsive-web-design-basics/)

---

**Última atualização**: 10/11/2025

**Versão**: 1.0.0

**Status**: ✅ Implementado e Testado
