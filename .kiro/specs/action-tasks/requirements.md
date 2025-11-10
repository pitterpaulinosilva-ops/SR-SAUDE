# Documento de Requisitos - Sistema de Tarefas para Ações

## Introdução

Este documento especifica os requisitos para adicionar um novo nível hierárquico ao sistema de plano de ação, permitindo que cada Ação contenha múltiplas Tarefas. Esta funcionalidade permitirá um gerenciamento mais granular e detalhado das atividades, facilitando o acompanhamento e execução de ações complexas que requerem múltiplas etapas.

## Glossário

- **Sistema**: O aplicativo de gerenciamento de planos de ação (SR-SAUDE)
- **Ação**: Uma atividade principal do plano de ação com responsável, setor, prazos e status
- **Tarefa**: Uma sub-atividade ou etapa específica que compõe uma Ação
- **Usuário**: Pessoa que utiliza o sistema para gerenciar e visualizar planos de ação
- **ActionCard**: Componente visual que exibe os detalhes de uma Ação
- **Dashboard**: Interface principal que lista e organiza as Ações e suas Tarefas

## Requisitos

### Requisito 1: Estrutura de Dados para Tarefas

**User Story:** Como desenvolvedor, eu quero definir a estrutura de dados para Tarefas, para que o sistema possa armazenar e gerenciar múltiplas tarefas associadas a cada Ação.

#### Critérios de Aceitação

1. THE Sistema SHALL definir uma interface TypeScript Task contendo id, título, descrição, status, data de início, data de término e referência à Ação pai
2. THE Sistema SHALL estender a interface Action para incluir um array opcional de Tasks
3. THE Sistema SHALL definir um tipo TaskStatus com valores "Não Iniciado", "Em Andamento" e "Concluído"
4. THE Sistema SHALL garantir que cada Task possua um identificador único dentro do contexto de sua Ação pai
5. THE Sistema SHALL permitir que uma Ação exista sem Tarefas associadas para manter compatibilidade com dados existentes

### Requisito 2: Visualização de Tarefas no ActionCard

**User Story:** Como usuário, eu quero visualizar as tarefas de uma ação diretamente no card da ação, para que eu possa ter uma visão completa do progresso sem navegar para outra tela.

#### Critérios de Aceitação

1. WHEN uma Ação possui Tarefas, THE Sistema SHALL exibir um indicador visual no ActionCard mostrando o número total de tarefas e quantas estão concluídas
2. WHEN o usuário clica no indicador de tarefas, THE Sistema SHALL expandir o ActionCard para mostrar a lista de todas as tarefas
3. WHILE o ActionCard está expandido, THE Sistema SHALL exibir cada tarefa com seu título, status e datas
4. THE Sistema SHALL utilizar cores distintas para indicar o status de cada tarefa (cinza para Não Iniciado, azul para Em Andamento, verde para Concluído)
5. WHEN o usuário clica novamente no indicador, THE Sistema SHALL recolher a lista de tarefas

### Requisito 3: Criação e Edição de Tarefas

**User Story:** Como usuário, eu quero criar e editar tarefas dentro de uma ação, para que eu possa decompor ações complexas em etapas menores e gerenciáveis.

#### Critérios de Aceitação

1. WHEN o usuário visualiza uma Ação expandida, THE Sistema SHALL exibir um botão "Adicionar Tarefa"
2. WHEN o usuário clica em "Adicionar Tarefa", THE Sistema SHALL abrir um formulário modal com campos para título, descrição, status, data de início e data de término
3. WHEN o usuário preenche o formulário e confirma, THE Sistema SHALL criar a nova tarefa e associá-la à Ação
4. WHEN o usuário clica em uma tarefa existente, THE Sistema SHALL permitir a edição de todos os campos da tarefa
5. THE Sistema SHALL validar que as datas da tarefa estejam dentro do intervalo de datas da Ação pai

### Requisito 4: Exclusão de Tarefas

**User Story:** Como usuário, eu quero excluir tarefas que não são mais necessárias, para que eu possa manter o plano de ação organizado e atualizado.

#### Critérios de Aceitação

1. WHEN o usuário visualiza uma tarefa, THE Sistema SHALL exibir um ícone de exclusão
2. WHEN o usuário clica no ícone de exclusão, THE Sistema SHALL solicitar confirmação antes de excluir
3. WHEN o usuário confirma a exclusão, THE Sistema SHALL remover a tarefa da Ação
4. THE Sistema SHALL atualizar automaticamente o indicador de progresso da Ação após a exclusão

### Requisito 5: Cálculo de Progresso da Ação

**User Story:** Como usuário, eu quero ver o progresso de uma ação baseado em suas tarefas, para que eu possa avaliar rapidamente o andamento de ações complexas.

#### Critérios de Aceitação

1. WHEN uma Ação possui Tarefas, THE Sistema SHALL calcular a porcentagem de conclusão baseada no número de tarefas concluídas
2. THE Sistema SHALL exibir uma barra de progresso visual no ActionCard mostrando a porcentagem calculada
3. WHEN todas as tarefas de uma Ação estão concluídas, THE Sistema SHALL sugerir automaticamente marcar a Ação como concluída
4. WHEN uma Ação não possui tarefas, THE Sistema SHALL basear o progresso apenas no status da própria Ação
5. THE Sistema SHALL atualizar o progresso em tempo real quando o status de uma tarefa é alterado

### Requisito 6: Filtros e Busca Incluindo Tarefas

**User Story:** Como usuário, eu quero que a busca e filtros considerem também as tarefas, para que eu possa encontrar ações baseado no conteúdo de suas tarefas.

#### Critérios de Aceitação

1. WHEN o usuário realiza uma busca, THE Sistema SHALL incluir títulos e descrições de tarefas nos resultados
2. WHEN uma tarefa corresponde ao termo de busca, THE Sistema SHALL exibir a Ação pai nos resultados com a tarefa correspondente destacada
3. THE Sistema SHALL permitir filtrar ações que possuem tarefas em atraso
4. THE Sistema SHALL permitir filtrar ações por porcentagem de conclusão de tarefas
5. WHEN filtros são aplicados, THE Sistema SHALL manter as tarefas visíveis se a Ação estiver expandida

### Requisito 7: Persistência de Dados

**User Story:** Como usuário, eu quero que minhas tarefas sejam salvas automaticamente, para que eu não perca informações ao fechar ou recarregar a aplicação.

#### Critérios de Aceitação

1. WHEN uma tarefa é criada, editada ou excluída, THE Sistema SHALL persistir as alterações no backend
2. WHEN o usuário recarrega a página, THE Sistema SHALL carregar todas as tarefas associadas às ações
3. IF ocorrer um erro ao salvar, THEN THE Sistema SHALL exibir uma mensagem de erro clara e manter os dados localmente até que possam ser sincronizados
4. THE Sistema SHALL implementar salvamento automático com debounce de 500ms para edições de tarefas
5. THE Sistema SHALL indicar visualmente quando uma tarefa está sendo salva ou sincronizada

### Requisito 8: Responsividade e Acessibilidade

**User Story:** Como usuário, eu quero acessar e gerenciar tarefas em qualquer dispositivo, para que eu possa trabalhar de forma flexível em desktop, tablet ou mobile.

#### Critérios de Aceitação

1. THE Sistema SHALL adaptar a visualização de tarefas para telas pequenas com layout vertical otimizado
2. THE Sistema SHALL garantir que todos os controles de tarefas sejam acessíveis via teclado
3. THE Sistema SHALL fornecer labels ARIA apropriados para leitores de tela
4. WHEN em dispositivos touch, THE Sistema SHALL permitir gestos de swipe para expandir/recolher tarefas
5. THE Sistema SHALL manter contraste adequado entre texto e fundo em todos os temas (claro e escuro)

### Requisito 9: Notificações e Alertas de Tarefas

**User Story:** Como usuário, eu quero receber alertas sobre tarefas próximas do prazo ou atrasadas, para que eu possa priorizar meu trabalho adequadamente.

#### Critérios de Aceitação

1. WHEN uma tarefa está próxima do prazo (3 dias ou menos), THE Sistema SHALL exibir um indicador visual de alerta
2. WHEN uma tarefa está atrasada, THE Sistema SHALL destacá-la com cor vermelha e ícone de alerta
3. THE Sistema SHALL exibir um contador de tarefas atrasadas no topo do dashboard
4. WHEN o usuário acessa o sistema, THE Sistema SHALL mostrar uma notificação com o número de tarefas que vencem hoje
5. THE Sistema SHALL permitir que o usuário configure preferências de notificação para tarefas

### Requisito 10: Ordenação e Priorização de Tarefas

**User Story:** Como usuário, eu quero reordenar tarefas dentro de uma ação, para que eu possa organizar as etapas na sequência mais lógica de execução.

#### Critérios de Aceitação

1. WHEN o usuário visualiza tarefas expandidas, THE Sistema SHALL permitir arrastar e soltar tarefas para reordená-las
2. THE Sistema SHALL salvar automaticamente a nova ordem das tarefas
3. THE Sistema SHALL exibir números de sequência para cada tarefa baseado na ordem
4. WHEN uma nova tarefa é criada, THE Sistema SHALL adicioná-la ao final da lista por padrão
5. THE Sistema SHALL manter a ordem das tarefas consistente entre sessões e dispositivos
