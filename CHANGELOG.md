# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.2.0] - 2025-11-12

### ✨ Adicionado
- Campo de "Acompanhamento" nas tarefas com seção expansível/recolhível
- Ícone de documento (FileText) para identificar acompanhamentos
- Animação suave de expansão/recolhimento (300ms)
- Fallback "Sem Acompanhamentos" quando não há informações
- Comentários com prazos das ações no TaskContext

### 🔄 Modificado
- **BREAKING**: Datas de finalização atualizadas para 19-21/11/2025
- Distribuição uniforme de ações: 5 em 19/11, 5 em 20/11, 4 em 21/11
- Interface de tarefas simplificada: apenas "Prazo Final" (removida data de início)
- Acompanhamentos atualizados em 7 itens (2 ações + 5 tarefas)
- Hierarquia de datas garantida (tarefas ≤ ações)

### 🐛 Corrigido
- Correção ortográfica: "elaboradoras" → "elaboradas"
- Alinhamento de datas entre ações e tarefas
- Consistência de acompanhamentos

### 📝 Detalhes das Mudanças

#### Ações Atualizadas
- **26204-26208**: Prazo 19/11/2025
- **26209-26213**: Prazo 20/11/2025
- **26240, 26243, 26275, 26334**: Prazo 21/11/2025

#### Tarefas com Novos Acompanhamentos
- `task-26273`: "ATAS retroativas elaboradas"
- `task-26281/26282`: Revisão de formulários e treinamento
- `task-26283/26284`: Status de rastreamento de materiais

#### Arquivos Modificados
- `components/TaskItem.tsx`: Interface de acompanhamento
- `constants.tsx`: Datas das ações
- `context/TaskContext.tsx`: Datas e acompanhamentos das tarefas

---

## [1.1.0] - 2025-11-10

### ✨ Adicionado
- Sistema de tarefas (sub-ações) completo
- Barra de progresso para ações com tarefas
- Componente TaskList com animações
- Componente TaskItem com drag handle
- Componente ProgressBar reutilizável
- TaskContext para gerenciamento de estado
- Mock data para ~30 tarefas

### 🔄 Modificado
- ActionCard agora exibe tarefas relacionadas
- Interface expandível para visualizar tarefas
- Indicador visual de progresso (X/Y tarefas)

---

## [1.0.0] - 2025-11-08

### ✨ Adicionado
- Dashboard interativo completo
- Sistema de temas (claro/escuro) com persistência
- Sidebar responsiva com navegação
- 15 ações do plano ONA implementadas
- Gráficos dinâmicos (status, responsáveis, setores)
- Sistema de busca e filtros
- Assistente de IA (Gemini/GPT)
- Responsividade completa (mobile, tablet, desktop)
- Acessibilidade WCAG AA
- Documentação completa

### 📚 Documentação
- README.md completo
- Guias de tema (4 documentos)
- Guia de layout responsivo
- Guia do assistente de IA
- Guia de implementação da sidebar
- Deploy guide

### 🎨 Design
- Paleta de cores consistente
- Tipografia responsiva
- Espaçamento uniforme
- Animações suaves (300ms)
- Gradientes e glassmorphism

### 🧪 Testes
- Jest configurado
- React Testing Library
- Testes para ThemeContext
- Testes para ThemeToggle
- Testes para Sidebar
- Cobertura: 70%+

### 🚀 Deploy
- Configuração Vercel
- Build otimizado com Vite
- Code splitting
- Lazy loading
- Performance otimizada

---

## [0.1.0] - 2025-11-01

### ✨ Inicial
- Estrutura básica do projeto
- Configuração Vite + React + TypeScript
- Configuração Tailwind CSS
- Estrutura de pastas
- Componentes básicos

---

## Tipos de Mudanças

- `✨ Adicionado` para novas funcionalidades
- `🔄 Modificado` para mudanças em funcionalidades existentes
- `🗑️ Removido` para funcionalidades removidas
- `🐛 Corrigido` para correções de bugs
- `🔒 Segurança` para vulnerabilidades corrigidas
- `📚 Documentação` para mudanças na documentação
- `🎨 Design` para mudanças visuais
- `⚡ Performance` para melhorias de performance
- `🧪 Testes` para adição ou modificação de testes
- `🚀 Deploy` para mudanças relacionadas a deploy

---

**Repositório**: https://github.com/pitterpaulinosilva-ops/SR-SAUDE
**Deploy**: https://sr-saude.vercel.app
