# Plano de Implementação - Sistema de Tarefas para Ações

- [x] 1. Atualizar modelos de dados e tipos TypeScript



  - Adicionar interface `Task` em `types.ts` com campos: id, actionId, action, responsible, sector, status, startDate, endDate, order
  - Adicionar tipo `TaskStatus` com valores "Não Iniciado", "Em Andamento" e "Concluído"
  - Estender interface `Action` para incluir array opcional `tasks?: Task[]`
  - Adicionar interface `ActionProgress` para cálculo de progresso
  - Nota: Task terá os mesmos campos que Action, exceto followUp (acompanhamento)



  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2. Criar Context API para gerenciamento de tarefas
  - Criar arquivo `context/TaskContext.tsx` com provider e hooks
  - Implementar estado para armazenar tarefas mapeadas por actionId
  - Implementar funções `fetchTasksForAction`, `addTask`, `updateTask`, `deleteTask`



  - Implementar função `reorderTask` para reordenação
  - Adicionar funções computed `getTasksForAction` e `getActionProgress`
  - Implementar tratamento de erros e estados de loading
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 3. Criar componente TaskItem
  - Criar arquivo `components/TaskItem.tsx`
  - Implementar layout com action (título), responsável, setor, status e datas (início e fim)



  - Adicionar badges de status com cores apropriadas (cinza, azul, verde)
  - Exibir ícones para responsável (👤), setor (🏢) e datas (⏰)
  - Implementar botões de editar e excluir
  - Adicionar suporte para drag handle (preparação para reordenação)
  - Implementar transições suaves e hover effects
  - Adicionar suporte para tema claro/escuro
  - _Requirements: 2.3, 2.4, 10.1, 10.3_




- [ ] 4. Criar componente TaskForm
  - Criar arquivo `components/TaskForm.tsx` como modal
  - Implementar campos: action (título), responsável, setor, status, data início, data término
  - Adicionar validações: action, responsável e setor obrigatórios, datas dentro do range da ação
  - Implementar validação de data término >= data início



  - Adicionar mensagens de erro inline para cada campo
  - Implementar submit com loading state
  - Adicionar suporte para modo criação e edição
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 5. Criar componente ProgressBar
  - Criar arquivo `components/ProgressBar.tsx`
  - Implementar cálculo de porcentagem baseado em tarefas concluídas
  - Adicionar barra visual com gradiente de cores
  - Exibir label com "X/Y tarefas concluídas (Z%)"
  - Implementar variantes de tamanho (sm, md, lg)
  - Adicionar animação de preenchimento
  - _Requirements: 5.1, 5.2, 5.4, 5.5_

- [ ] 6. Criar componente TaskList
  - Criar arquivo `components/TaskList.tsx`



  - Implementar renderização de lista de TaskItem ordenados
  - Adicionar botão "Adicionar Tarefa" que abre TaskForm
  - Implementar estado de expansão/recolhimento
  - Adicionar animações de entrada/saída para tarefas
  - Implementar mensagem quando não há tarefas
  - Integrar com TaskContext para operações CRUD
  - _Requirements: 2.1, 2.2, 2.5, 3.1, 4.1, 4.2, 4.3, 4.4_

- [ ] 7. Implementar drag and drop para reordenação
  - Instalar biblioteca `@dnd-kit/core` e `@dnd-kit/sortable`
  - Adicionar DndContext no TaskList
  - Implementar SortableItem wrapper para TaskItem
  - Adicionar visual feedback durante drag (opacity, shadow)
  - Implementar callback onDragEnd para salvar nova ordem
  - Adicionar indicadores visuais de ordem (números de sequência)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 8. Atualizar componente ActionCard
  - Adicionar seção de tarefas expansível no ActionCard
  - Implementar indicador visual "📋 X/Y tarefas"
  - Integrar componente ProgressBar quando houver tarefas
  - Adicionar botão "Ver Tarefas" / "Ocultar Tarefas"
  - Implementar lazy loading de tarefas ao expandir
  - Adicionar transições suaves para expansão/recolhimento
  - Manter compatibilidade com ações sem tarefas
  - _Requirements: 2.1, 2.2, 2.5, 5.1, 5.2, 5.4_

- [ ] 9. Implementar API endpoints no backend
  - Criar rota GET `/api/actions/:actionId/tasks`
  - Criar rota POST `/api/actions/:actionId/tasks`
  - Criar rota PATCH `/api/tasks/:taskId`
  - Criar rota DELETE `/api/tasks/:taskId`
  - Criar rota PATCH `/api/tasks/:taskId/reorder`
  - Implementar validações de dados no backend
  - Adicionar tratamento de erros apropriado
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 10. Criar tabela de tarefas no banco de dados
  - Criar migration para tabela `tasks`
  - Adicionar campos: id (UUID), action_id, action, responsible, sector, status
  - Adicionar campos: start_date, end_date, order, created_at, updated_at
  - Criar foreign key para tabela actions
  - Adicionar índices para action_id e order
  - _Requirements: 7.1, 7.2_

- [ ] 11. Implementar serviço de tarefas
  - Criar arquivo `services/taskService.ts`
  - Implementar função `fetchTasksForAction` com cache
  - Implementar função `createTask` com validação
  - Implementar função `updateTask` com debounce
  - Implementar função `deleteTask` com confirmação
  - Implementar função `reorderTasks` com otimistic update
  - Adicionar tratamento de erros e retry logic
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 12. Adicionar filtros e busca para tarefas
  - Atualizar lógica de busca em ActionPlanDashboard para incluir campos das tarefas (action, responsible, sector)
  - Implementar highlight de tarefas que correspondem à busca
  - Adicionar filtro "Ações com tarefas em atraso"
  - Adicionar filtro por porcentagem de conclusão
  - Manter tarefas visíveis quando ação está expandida e filtrada
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 13. Implementar notificações e alertas
  - Adicionar indicador visual para tarefas próximas do prazo (≤3 dias)
  - Adicionar destaque vermelho para tarefas atrasadas
  - Criar componente de contador de tarefas atrasadas no dashboard
  - Implementar notificação ao acessar sistema com tarefas vencendo hoje
  - Adicionar preferências de notificação no perfil do usuário
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 14. Implementar responsividade mobile
  - Adaptar TaskList para layout vertical em telas pequenas
  - Otimizar TaskForm para tela cheia em mobile
  - Implementar swipe gestures para revelar ações (editar/excluir)
  - Adicionar long press para iniciar drag and drop em touch
  - Testar em diferentes tamanhos de tela (mobile, tablet, desktop)
  - _Requirements: 8.1, 8.4_

- [ ] 15. Adicionar acessibilidade
  - Adicionar ARIA labels em todos os componentes de tarefa
  - Implementar navegação completa por teclado (Tab, Enter, Escape, Space)
  - Adicionar aria-required e aria-invalid nos campos do formulário
  - Garantir contraste adequado em ambos os temas
  - Testar com leitor de tela (NVDA ou JAWS)
  - _Requirements: 8.2, 8.3, 8.5_

- [ ] 16. Implementar otimizações de performance
  - Adicionar lazy loading de tarefas ao expandir ActionCard
  - Implementar debounce de 500ms para salvamento automático
  - Adicionar memoização com useMemo para cálculo de progresso
  - Usar React.memo em TaskItem para evitar re-renders
  - Implementar optimistic updates para melhor UX
  - Adicionar virtualização se lista tiver >50 tarefas
  - _Requirements: 7.4, 7.5_

- [ ] 17. Adicionar sugestão de conclusão de ação
  - Implementar lógica para detectar quando todas as tarefas estão concluídas
  - Exibir modal/toast sugerindo marcar ação como concluída
  - Adicionar botão de ação rápida para marcar ação como concluída
  - Implementar opção "Não perguntar novamente para esta ação"
  - _Requirements: 5.3_

- [ ] 18. Criar componente de confirmação de exclusão
  - Criar componente `DeleteConfirmation.tsx` reutilizável
  - Implementar modal com mensagem clara sobre a exclusão
  - Adicionar botões "Cancelar" e "Excluir"
  - Implementar loading state durante exclusão
  - Adicionar feedback visual após exclusão bem-sucedida
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 19. Implementar tratamento de erros robusto
  - Criar componente ErrorBoundary para tarefas
  - Implementar toast notifications para erros de API
  - Adicionar retry automático para falhas de rede
  - Implementar salvamento local em caso de falha
  - Adicionar mensagens de erro específicas e acionáveis
  - _Requirements: 7.3_

- [ ]* 20. Criar testes para componentes de tarefas
- [ ]* 20.1 Escrever testes unitários para TaskItem
  - Testar renderização de dados
  - Testar ações de editar e excluir
  - Testar mudança de status
  - _Requirements: Todos_

- [ ]* 20.2 Escrever testes unitários para TaskForm
  - Testar validações de campos
  - Testar submissão de formulário
  - Testar modo criação vs edição
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 20.3 Escrever testes unitários para TaskList
  - Testar renderização de lista
  - Testar adição de tarefa
  - Testar reordenação
  - _Requirements: 2.1, 2.2, 10.1, 10.2_

- [ ]* 20.4 Escrever testes unitários para ProgressBar
  - Testar cálculo de porcentagem
  - Testar diferentes estados (0%, 50%, 100%)
  - _Requirements: 5.1, 5.2_

- [ ]* 20.5 Escrever testes de integração para TaskContext
  - Testar fetch de tarefas
  - Testar CRUD operations
  - Testar sincronização com backend
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 21. Integrar sistema de tarefas no ActionPlanDashboard
  - Adicionar TaskContext.Provider no nível do App
  - Atualizar ActionPlanDashboard para passar tarefas aos ActionCards
  - Verificar que filtros e busca funcionam com tarefas
  - Testar fluxo completo de criação, edição e exclusão
  - Verificar que progresso é atualizado corretamente
  - _Requirements: Todos_

- [ ] 22. Documentar sistema de tarefas
  - Criar guia de uso para usuários finais
  - Documentar API endpoints com exemplos
  - Adicionar comentários no código dos componentes principais
  - Criar README com instruções de desenvolvimento
  - Documentar decisões de design e arquitetura
  - _Requirements: Todos_
