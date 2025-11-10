# Guia de Estilo de Cores - Sistema de Temas

## Visão Geral

Este documento define as cores padrão para os temas claro e escuro da aplicação, garantindo consistência visual e acessibilidade em toda a interface.

## Índice

1. [Paleta de Cores](#paleta-de-cores)
2. [Aplicações por Categoria](#aplicações-por-categoria)
3. [Tabela de Referência Rápida](#tabela-de-referência-rápida)
4. [Diretrizes de Contraste](#diretrizes-de-contraste)
5. [Exemplos de Uso](#exemplos-de-uso)

---

## Paleta de Cores

### Tema Claro (Light Theme)

#### Backgrounds (Fundos)

| Uso | Cor | Tailwind Class | Hex |
|-----|-----|----------------|-----|
| Fundo principal | Branco | `bg-white` | `#FFFFFF` |
| Fundo secundário | Slate 50 | `bg-slate-50` | `#F8FAFC` |
| Fundo terciário | Gray 100 | `bg-gray-100` | `#F3F4F6` |
| Fundo de card | Branco | `bg-white` | `#FFFFFF` |
| Fundo de input | Branco | `bg-white` | `#FFFFFF` |
| Fundo de botão primário | Blue 600 | `bg-blue-600` | `#2563EB` |
| Fundo de botão secundário | Slate 200 | `bg-slate-200` | `#E2E8F0` |
| Fundo hover (botão secundário) | Slate 300 | `bg-slate-300` | `#CBD5E1` |

#### Texto

| Uso | Cor | Tailwind Class | Hex |
|-----|-----|----------------|-----|
| Texto principal | Gray 900 | `text-gray-900` | `#111827` |
| Texto secundário | Gray 600 | `text-gray-600` | `#4B5563` |
| Texto terciário | Gray 500 | `text-gray-500` | `#6B7280` |
| Texto de link | Blue 600 | `text-blue-600` | `#2563EB` |
| Texto de erro | Red 600 | `text-red-600` | `#DC2626` |
| Texto de sucesso | Green 600 | `text-green-600` | `#16A34A` |
| Texto de aviso | Yellow 600 | `text-yellow-600` | `#CA8A04` |
| Placeholder | Gray 500 | `placeholder-gray-500` | `#6B7280` |

#### Bordas

| Uso | Cor | Tailwind Class | Hex |
|-----|-----|----------------|-----|
| Borda padrão | Gray 200 | `border-gray-200` | `#E5E7EB` |
| Borda de input | Gray 300 | `border-gray-300` | `#D1D5DB` |
| Borda de card | Gray 200 | `border-gray-200` | `#E5E7EB` |
| Borda focus | Blue 500 | `focus:border-blue-500` | `#3B82F6` |

---

### Tema Escuro (Dark Theme)

#### Backgrounds (Fundos)

| Uso | Cor | Tailwind Class | Hex |
|-----|-----|----------------|-----|
| Fundo principal | Slate 900 | `dark:bg-slate-900` | `#0F172A` |
| Fundo secundário | Slate 800 | `dark:bg-slate-800` | `#1E293B` |
| Fundo terciário | Gray 800 | `dark:bg-gray-800` | `#1F2937` |
| Fundo de card | Slate 800 | `dark:bg-slate-800` | `#1E293B` |
| Fundo de input | Slate 700 | `dark:bg-slate-700` | `#334155` |
| Fundo de botão primário | Blue 700 | `dark:bg-blue-700` | `#1D4ED8` |
| Fundo de botão secundário | Slate 700 | `dark:bg-slate-700` | `#334155` |
| Fundo hover (botão secundário) | Slate 600 | `dark:bg-slate-600` | `#475569` |

#### Texto

| Uso | Cor | Tailwind Class | Hex |
|-----|-----|----------------|-----|
| Texto principal | Gray 100 | `dark:text-gray-100` | `#F3F4F6` |
| Texto secundário | Gray 400 | `dark:text-gray-400` | `#9CA3AF` |
| Texto terciário | Gray 500 | `dark:text-gray-500` | `#6B7280` |
| Texto de link | Blue 400 | `dark:text-blue-400` | `#60A5FA` |
| Texto de erro | Red 400 | `dark:text-red-400` | `#F87171` |
| Texto de sucesso | Green 400 | `dark:text-green-400` | `#4ADE80` |
| Texto de aviso | Yellow 400 | `dark:text-yellow-400` | `#FACC15` |
| Placeholder | Gray 400 | `dark:placeholder-gray-400` | `#9CA3AF` |

#### Bordas

| Uso | Cor | Tailwind Class | Hex |
|-----|-----|----------------|-----|
| Borda padrão | Slate 700 | `dark:border-slate-700` | `#334155` |
| Borda de input | Slate 600 | `dark:border-slate-600` | `#475569` |
| Borda de card | Slate 700 | `dark:border-slate-700` | `#334155` |
| Borda focus | Blue 400 | `dark:focus:border-blue-400` | `#60A5FA` |

---

## Aplicações por Categoria

### 1. Layout Principal

```tsx
// Container principal
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
  {/* Conteúdo */}
</div>

// Header/Topbar
<header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-lg transition-colors duration-300">
  {/* Conteúdo do header */}
</header>

// Footer
<footer className="bg-white/80 dark:bg-slate-800/80 border-t border-white/20 dark:border-slate-700/20">
  {/* Conteúdo do footer */}
</footer>
```

**Nota sobre a Topbar:**
- **Tema Claro**: Fundo branco (`bg-white`) com borda cinza clara (`border-gray-200`)
- **Tema Escuro**: Fundo slate escuro (`dark:bg-slate-900`) com borda slate (`dark:border-slate-700`)
- Sempre incluir `shadow-lg` para elevação visual
- Sempre incluir `transition-colors duration-300` para transição suave

### 2. Cards e Containers

```tsx
// Card padrão
<div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg">
  {/* Conteúdo do card */}
</div>

// Card com hover
<div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
  {/* Conteúdo do card */}
</div>

// Card com transparência
<div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg">
  {/* Conteúdo do card */}
</div>
```

### 3. Botões

```tsx
// Botão primário
<button className="bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
  Ação Principal
</button>

// Botão secundário
<button className="bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300">
  Ação Secundária
</button>

// Botão de perigo
<button className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300">
  Excluir
</button>

// Botão de sucesso
<button className="bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300">
  Confirmar
</button>
```

### 4. Formulários

```tsx
// Input de texto
<input 
  type="text"
  className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors duration-300"
  placeholder="Digite aqui..."
/>

// Textarea
<textarea 
  className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
  placeholder="Digite sua mensagem..."
/>

// Select
<select className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300">
  <option>Opção 1</option>
  <option>Opção 2</option>
</select>

// Checkbox/Radio label
<label className="text-gray-700 dark:text-gray-300">
  <input type="checkbox" className="mr-2" />
  Aceito os termos
</label>
```

### 5. Tipografia

```tsx
// Título principal (h1)
<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
  Título Principal
</h1>

// Título secundário (h2)
<h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
  Título Secundário
</h2>

// Título terciário (h3)
<h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
  Título Terciário
</h3>

// Parágrafo principal
<p className="text-base text-gray-700 dark:text-gray-300">
  Texto do parágrafo principal.
</p>

// Texto secundário/descrição
<p className="text-sm text-gray-600 dark:text-gray-400">
  Texto secundário ou descrição.
</p>

// Texto pequeno/caption
<p className="text-xs text-gray-500 dark:text-gray-500">
  Texto pequeno ou legenda.
</p>

// Link
<a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
  Link de exemplo
</a>
```

### 6. Estados e Feedback

```tsx
// Mensagem de sucesso
<div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-200 rounded-lg p-4">
  Operação realizada com sucesso!
</div>

// Mensagem de erro
<div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg p-4">
  Ocorreu um erro. Tente novamente.
</div>

// Mensagem de aviso
<div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-lg p-4">
  Atenção: Esta ação não pode ser desfeita.
</div>

// Mensagem de informação
<div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-700 text-blue-800 dark:text-blue-200 rounded-lg p-4">
  Informação importante para o usuário.
</div>
```

### 7. Badges e Tags

```tsx
// Badge padrão
<span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium">
  Padrão
</span>

// Badge de sucesso
<span className="bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
  Ativo
</span>

// Badge de erro
<span className="bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-xs font-medium">
  Inativo
</span>

// Badge de aviso
<span className="bg-yellow-200 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
  Pendente
</span>
```

---

## Tabela de Referência Rápida

### Backgrounds

| Elemento | Light | Dark |
|----------|-------|------|
| Principal | `bg-white` | `dark:bg-slate-900` |
| Secundário | `bg-slate-50` | `dark:bg-slate-800` |
| Topbar/Header | `bg-white` | `dark:bg-slate-900` |
| Card | `bg-white` | `dark:bg-slate-800` |
| Input | `bg-white` | `dark:bg-slate-700` |
| Botão Primário | `bg-blue-600` | `dark:bg-blue-700` |
| Botão Secundário | `bg-slate-200` | `dark:bg-slate-700` |

### Texto

| Elemento | Light | Dark |
|----------|-------|------|
| Principal | `text-gray-900` | `dark:text-gray-100` |
| Secundário | `text-gray-600` | `dark:text-gray-400` |
| Terciário | `text-gray-500` | `dark:text-gray-500` |
| Link | `text-blue-600` | `dark:text-blue-400` |

### Bordas

| Elemento | Light | Dark |
|----------|-------|------|
| Padrão | `border-gray-200` | `dark:border-slate-700` |
| Topbar/Header | `border-gray-200` | `dark:border-slate-700` |
| Input | `border-gray-300` | `dark:border-slate-600` |
| Focus | `focus:border-blue-500` | `dark:focus:border-blue-400` |

---

## Diretrizes de Contraste

### Requisitos WCAG AA

Para garantir acessibilidade, todas as combinações de cores devem atender aos seguintes requisitos:

- **Texto normal (< 18pt)**: Contraste mínimo de 4.5:1
- **Texto grande (≥ 18pt ou 14pt bold)**: Contraste mínimo de 3:1
- **Elementos de UI**: Contraste mínimo de 3:1

### Combinações Aprovadas

#### Tema Claro

✅ **Aprovado**
- Gray 900 em White (contraste: 18.4:1)
- Gray 800 em White (contraste: 12.6:1)
- Gray 600 em White (contraste: 7.0:1)
- Blue 600 em White (contraste: 8.6:1)

❌ **Evitar**
- Gray 400 em White (contraste: 2.8:1) - Insuficiente
- Gray 300 em White (contraste: 1.9:1) - Insuficiente

#### Tema Escuro

✅ **Aprovado**
- Gray 100 em Slate 900 (contraste: 16.1:1)
- Gray 200 em Slate 900 (contraste: 14.5:1)
- Gray 400 em Slate 900 (contraste: 8.3:1)
- Blue 400 em Slate 900 (contraste: 9.2:1)

❌ **Evitar**
- Gray 600 em Slate 900 (contraste: 3.8:1) - Insuficiente para texto normal
- Gray 700 em Slate 900 (contraste: 2.5:1) - Insuficiente

### Ferramentas de Teste

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- Chrome DevTools - Lighthouse Accessibility Audit

---

## Exemplos de Uso

### Dashboard Completo

```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
  {/* Header */}
  <header className="bg-[#2c3e50] dark:bg-slate-900 border-b border-[#34495e] dark:border-slate-700 p-4">
    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
  </header>
  
  {/* Main Content */}
  <main className="container mx-auto p-8">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-lg transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Total de Usuários
        </h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          1,234
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          +12% este mês
        </p>
      </div>
      
      {/* Mais cards... */}
    </div>
    
    {/* Data Table */}
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg transition-colors duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Dados Recentes
        </h2>
      </div>
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="text-left py-3 text-gray-700 dark:text-gray-300">Nome</th>
              <th className="text-left py-3 text-gray-700 dark:text-gray-300">Status</th>
              <th className="text-left py-3 text-gray-700 dark:text-gray-300">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 dark:border-slate-700/50">
              <td className="py-3 text-gray-900 dark:text-gray-100">João Silva</td>
              <td className="py-3">
                <span className="bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                  Ativo
                </span>
              </td>
              <td className="py-3 text-gray-600 dark:text-gray-400">10/11/2025</td>
            </tr>
            {/* Mais linhas... */}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>
```

---

## Manutenção e Atualizações

### Quando Adicionar Novas Cores

1. Verifique se a cor já existe na paleta
2. Teste o contraste em ambos os temas
3. Documente a nova cor neste guia
4. Atualize os exemplos se necessário

### Processo de Revisão

1. Revisar cores trimestralmente
2. Verificar feedback de acessibilidade
3. Atualizar baseado em tendências de design
4. Manter consistência com a identidade visual

---

## Conclusão

Este guia de cores garante:
- ✅ Consistência visual em toda a aplicação
- ✅ Acessibilidade WCAG AA
- ✅ Experiência agradável em ambos os temas
- ✅ Facilidade de manutenção e expansão

Para dúvidas ou sugestões de novas cores, consulte a equipe de design ou abra uma issue no repositório.
