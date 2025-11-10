# Guia Visual - Sistema de Tarefas

## 📍 Onde as Tarefas Aparecem no Projeto

### 1. Localização Principal: ActionCard

As **Tarefas** aparecem **dentro de cada card de Ação** no dashboard principal.

```
Dashboard Principal
└── ActionCard (Card de uma Ação)
    ├── Informações da Ação (ID, Título, Responsável, Setor, Prazo)
    ├── Status da Ação
    ├── 📋 SEÇÃO DE TAREFAS ← AQUI! (Nova funcionalidade)
    │   ├── Indicador: "3/5 tarefas"
    │   ├── Barra de Progresso: [████░░] 60%
    │   └── Botão: "Ver Tarefas"
    │
    └── Quando expandido:
        └── Lista de Tarefas
            ├── Tarefa #1
            ├── Tarefa #2
            ├── Tarefa #3
            └── Botão "Adicionar Tarefa"
```

---

## 🎨 Exemplo Visual - Antes e Depois

### ANTES (Sem Tarefas)
```
┌─────────────────────────────────────────────┐
│ ID: 123              [Em Atraso 🔴]         │
│                                              │
│ Implementar novo sistema de login           │
│                                              │
│ 👤 Responsável: João Silva                  │
│ 🏢 Setor: TI                                │
│ ⏰ Prazo Final: 15/12/2025                  │
│                                              │
│ Status: Em Andamento                         │
│                                              │
│ [Ver Detalhes ▼]                            │
└─────────────────────────────────────────────┘
```

### DEPOIS (Com Tarefas)
```
┌─────────────────────────────────────────────┐
│ ID: 123              [Em Atraso 🔴]         │
│                                              │
│ Implementar novo sistema de login           │
│                                              │
│ 👤 Responsável: João Silva                  │
│ 🏢 Setor: TI                                │
│ ⏰ Prazo Final: 15/12/2025                  │
│                                              │
│ Status: Em Andamento                         │
│                                              │
│ ┌──────────────────────────────────────┐   │ ← NOVO!
│ │ 📋 3/5 tarefas    [Ver Tarefas]     │   │
│ │ Progresso: [████████░░░░] 60%       │   │
│ └──────────────────────────────────────┘   │
│                                              │
│ [Ver Detalhes ▼]                            │
└─────────────────────────────────────────────┘
```

---

## 📋 Exemplo Visual - Tarefas Expandidas

Quando o usuário clica em **"Ver Tarefas"**:

```
┌─────────────────────────────────────────────────────────────┐
│ ID: 123                            [Em Atraso 🔴]           │
│                                                              │
│ Implementar novo sistema de login                           │
│                                                              │
│ 👤 Responsável: João Silva                                  │
│ 🏢 Setor: TI                                                │
│ ⏰ Prazo Final: 15/12/2025                                  │
│                                                              │
│ Status: Em Andamento                                         │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ 📋 3/5 tarefas              [Ocultar Tarefas]         │ │
│ │ Progresso: [████████░░░░] 60%                         │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                              │
│ 📋 Tarefas (5)                    [+ Adicionar Tarefa]     │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ ⋮⋮ #1 Configurar banco de dados                       │ │
│ │                                                         │ │
│ │ 👤 Responsável: Maria Santos                           │ │
│ │ 🏢 Setor: TI                                           │ │
│ │ ⏰ Período: 01/12/2025 - 05/12/2025                    │ │
│ │ Status: [Concluído ✓]                                  │ │
│ │                                                         │ │
│ │ [Editar] [Excluir]                                     │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ ⋮⋮ #2 Desenvolver tela de login                       │ │
│ │                                                         │ │
│ │ 👤 Responsável: Pedro Costa                            │ │
│ │ 🏢 Setor: Desenvolvimento                              │ │
│ │ ⏰ Período: 06/12/2025 - 10/12/2025                    │ │
│ │ Status: [Em Andamento]                                 │ │
│ │                                                         │ │
│ │ [Editar] [Excluir]                    [Concluir]       │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ ⋮⋮ #3 Implementar autenticação JWT                    │ │
│ │                                                         │ │
│ │ 👤 Responsável: Ana Lima                               │ │
│ │ 🏢 Setor: Backend                                      │ │
│ │ ⏰ Período: 11/12/2025 - 13/12/2025                    │ │
│ │ Status: [Não Iniciado]                                 │ │
│ │                                                         │ │
│ │ [Editar] [Excluir]                    [Iniciar]        │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                              │
│ ... (mais 2 tarefas)                                        │
│                                                              │
│ [Ver Detalhes ▼]                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## ➕ Exemplo Visual - Adicionar Nova Tarefa

Quando o usuário clica em **"Adicionar Tarefa"**, abre um modal:

```
                    ┌─────────────────────────────────────┐
                    │  Nova Tarefa                    [X] │
                    ├─────────────────────────────────────┤
                    │                                     │
                    │  Descrição da Tarefa *              │
                    │  ┌───────────────────────────────┐  │
                    │  │ Ex: Realizar testes...        │  │
                    │  └───────────────────────────────┘  │
                    │                                     │
                    │  Responsável *                      │
                    │  ┌───────────────────────────────┐  │
                    │  │ Ex: João Silva                │  │
                    │  └───────────────────────────────┘  │
                    │                                     │
                    │  Setor *                            │
                    │  ┌───────────────────────────────┐  │
                    │  │ Ex: TI                        │  │
                    │  └───────────────────────────────┘  │
                    │                                     │
                    │  Status                             │
                    │  ┌───────────────────────────────┐  │
                    │  │ Não Iniciado          ▼       │  │
                    │  └───────────────────────────────┘  │
                    │                                     │
                    │  Data de Início    Data de Término │
                    │  ┌──────────────┐  ┌─────────────┐ │
                    │  │ 01/12/2025   │  │ 15/12/2025  │ │
                    │  └──────────────┘  └─────────────┘ │
                    │                                     │
                    │  ℹ️ Período da Ação:                │
                    │  01/12/2025 até 15/12/2025          │
                    │                                     │
                    │  [Cancelar]      [Criar Tarefa]    │
                    │                                     │
                    └─────────────────────────────────────┘
```

---

## 🔄 Fluxo de Uso Completo

### Passo 1: Visualizar Ação
```
Usuário vê o card da ação no dashboard
↓
Nota o indicador: "📋 3/5 tarefas (60%)"
```

### Passo 2: Expandir Tarefas
```
Usuário clica em "Ver Tarefas"
↓
Lista de tarefas aparece dentro do card
↓
Vê todas as 5 tarefas com seus detalhes
```

### Passo 3: Adicionar Nova Tarefa
```
Usuário clica em "+ Adicionar Tarefa"
↓
Modal abre com formulário
↓
Preenche: Descrição, Responsável, Setor, Datas
↓
Clica em "Criar Tarefa"
↓
Nova tarefa aparece na lista
↓
Progresso atualiza: "4/6 tarefas (66%)"
```

### Passo 4: Editar Tarefa
```
Usuário clica em "Editar" em uma tarefa
↓
Modal abre com dados preenchidos
↓
Altera informações necessárias
↓
Clica em "Salvar Alterações"
↓
Tarefa atualizada na lista
```

### Passo 5: Marcar como Concluída
```
Usuário clica em "Concluir" em uma tarefa
↓
Status muda para "Concluído ✓"
↓
Barra de progresso atualiza
↓
Quando todas concluídas: "✓ Todas as tarefas concluídas!"
```

---

## 🎯 Hierarquia Visual

```
Dashboard
│
├── Filtros e Busca (topo)
│
├── Grid de ActionCards
│   │
│   ├── ActionCard #1
│   │   ├── Dados da Ação
│   │   ├── 📋 Indicador de Tarefas ← NOVO!
│   │   └── Lista de Tarefas (expansível) ← NOVO!
│   │
│   ├── ActionCard #2
│   │   ├── Dados da Ação
│   │   ├── 📋 Indicador de Tarefas ← NOVO!
│   │   └── Lista de Tarefas (expansível) ← NOVO!
│   │
│   └── ActionCard #3
│       ├── Dados da Ação
│       └── (sem tarefas - funciona normalmente)
│
└── Footer
```

---

## 🎨 Cores e Estados Visuais

### Status das Tarefas

**Não Iniciado**
```
┌────────────────────────────────┐
│ ⋮⋮ #1 Tarefa exemplo           │
│ Status: [Não Iniciado]         │ ← Cinza
│ Borda lateral: Cinza           │
└────────────────────────────────┘
```

**Em Andamento**
```
┌────────────────────────────────┐
│ ⋮⋮ #2 Tarefa exemplo           │
│ Status: [Em Andamento]         │ ← Azul
│ Borda lateral: Azul            │
└────────────────────────────────┘
```

**Concluído**
```
┌────────────────────────────────┐
│ ⋮⋮ #3 Tarefa exemplo           │
│ Status: [Concluído ✓]          │ ← Verde
│ Borda lateral: Verde           │
└────────────────────────────────┘
```

### Barra de Progresso

**0-39%** - Laranja
```
Progresso: [███░░░░░░░░░] 25%
```

**40-69%** - Amarelo
```
Progresso: [██████░░░░░░] 50%
```

**70-99%** - Azul
```
Progresso: [█████████░░░] 75%
```

**100%** - Verde
```
Progresso: [████████████] 100% ✓ Todas as tarefas concluídas!
```

---

## 📱 Responsividade

### Desktop (> 1024px)
- Cards em grid de 3-4 colunas
- Tarefas mostram todos os detalhes
- Modal centralizado

### Tablet (640px - 1024px)
- Cards em grid de 2 colunas
- Tarefas com layout adaptado
- Modal responsivo

### Mobile (< 640px)
- Cards em coluna única
- Tarefas em lista vertical
- Modal em tela cheia
- Botões maiores para touch

---

## 🔍 Busca e Filtros

As tarefas também serão incluídas na busca:

```
Busca: "banco de dados"

Resultados:
┌─────────────────────────────────────┐
│ Ação: Implementar novo sistema     │
│ ↳ Tarefa encontrada:                │ ← NOVO!
│   "Configurar banco de dados"       │
└─────────────────────────────────────┘
```

---

## ✅ Resumo

**Onde ficam as Tarefas:**
- Dentro de cada ActionCard
- Visíveis através do indicador "📋 X/Y tarefas"
- Expandem ao clicar em "Ver Tarefas"
- Cada tarefa é um card menor dentro do card da ação

**Como funcionam:**
1. Usuário vê indicador de progresso no card
2. Clica para expandir e ver lista completa
3. Pode adicionar, editar, excluir e mudar status
4. Progresso atualiza automaticamente
5. Tudo acontece dentro do mesmo card da ação

**Benefícios:**
- Organização hierárquica clara (Ação > Tarefas)
- Não polui o dashboard principal
- Fácil de gerenciar etapas de ações complexas
- Visual limpo e intuitivo
