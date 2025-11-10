# Tarefas de Exemplo - Dados Mock

## 📋 Ações com Tarefas Configuradas

### Plano: Saúde (ONA)

#### ✅ Ação #1: "Definir e aprovar a Política de Segurança do Paciente"
**Status da Ação:** Concluído  
**Responsável:** Ana Lima  
**Setor:** Qualidade  
**Período:** 10/05/2024 - 15/06/2024

**Tarefas (4/4 concluídas - 100%):**

1. ✅ **Revisar políticas existentes e benchmarks**
   - Responsável: Ana Lima
   - Setor: Qualidade
   - Período: 10/05 - 20/05/2024
   - Status: Concluído

2. ✅ **Elaborar minuta da política**
   - Responsável: Ana Lima
   - Setor: Qualidade
   - Período: 21/05 - 30/05/2024
   - Status: Concluído

3. ✅ **Submeter para aprovação da diretoria**
   - Responsável: Ana Lima
   - Setor: Qualidade
   - Período: 01/06 - 10/06/2024
   - Status: Concluído

4. ✅ **Comunicar política aprovada aos colaboradores**
   - Responsável: Ana Lima
   - Setor: Qualidade
   - Período: 11/06 - 15/06/2024
   - Status: Concluído

---

#### 🔄 Ação #2: "Treinar equipes no novo protocolo de higiene das mãos"
**Status da Ação:** Em Andamento  
**Responsável:** Carlos Souza  
**Setor:** Enfermagem  
**Período:** 01/06/2024 - 25/07/2024

**Tarefas (3/5 concluídas - 60%):**

1. ✅ **Desenvolver material didático do treinamento**
   - Responsável: Carlos Souza
   - Setor: Enfermagem
   - Período: 01/06 - 15/06/2024
   - Status: Concluído

2. ✅ **Agendar sessões de treinamento**
   - Responsável: Carlos Souza
   - Setor: Enfermagem
   - Período: 16/06 - 20/06/2024
   - Status: Concluído

3. ✅ **Realizar treinamento turno manhã**
   - Responsável: Carlos Souza
   - Setor: Enfermagem
   - Período: 21/06 - 05/07/2024
   - Status: Concluído

4. 🔄 **Realizar treinamento turno tarde**
   - Responsável: Carlos Souza
   - Setor: Enfermagem
   - Período: 06/07 - 15/07/2024
   - Status: Em Andamento ← ATUAL

5. ⏳ **Realizar treinamento turno noite**
   - Responsável: Carlos Souza
   - Setor: Enfermagem
   - Período: 16/07 - 25/07/2024
   - Status: Não Iniciado

---

#### 🔄 Ação #3: "Implementar checklist de cirurgia segura"
**Status da Ação:** Em Andamento  
**Responsável:** Mariana Costa  
**Setor:** Centro Cirúrgico  
**Período:** 05/06/2024 - 20/07/2024

**Tarefas (1/4 concluídas - 25%):**

1. ✅ **Adaptar checklist OMS para realidade local**
   - Responsável: Mariana Costa
   - Setor: Centro Cirúrgico
   - Período: 05/06 - 20/06/2024
   - Status: Concluído

2. 🔄 **Treinar equipe cirúrgica no uso do checklist**
   - Responsável: Mariana Costa
   - Setor: Centro Cirúrgico
   - Período: 21/06 - 05/07/2024
   - Status: Em Andamento ← ATUAL

3. ⏳ **Implementar fase piloto em 5 cirurgias**
   - Responsável: Mariana Costa
   - Setor: Centro Cirúrgico
   - Período: 06/07 - 15/07/2024
   - Status: Não Iniciado

4. ⏳ **Coletar feedback e ajustar checklist**
   - Responsável: Mariana Costa
   - Setor: Centro Cirúrgico
   - Período: 16/07 - 20/07/2024
   - Status: Não Iniciado

---

## 🎯 Como Testar no Navegador

### Passo 1: Iniciar o Projeto
```bash
npm run dev
```

### Passo 2: Acessar o Dashboard
- Abra o navegador em `http://localhost:5173`
- O plano "Saúde (ONA)" deve estar selecionado por padrão

### Passo 3: Visualizar Tarefas

#### Para a Ação #1 (100% concluída):
1. Localize o card "Definir e aprovar a Política de Segurança do Paciente"
2. Você verá um box azul com:
   ```
   📋 4/4 tarefas    [Ver Tarefas]
   Progresso: [████████████] 100%
   ```
3. Clique em "Ver Tarefas"
4. Verá as 4 tarefas, todas com status "Concluído ✓" e borda verde

#### Para a Ação #2 (60% concluída):
1. Localize o card "Treinar equipes no novo protocolo de higiene das mãos"
2. Você verá:
   ```
   📋 3/5 tarefas    [Ver Tarefas]
   Progresso: [████████░░░░] 60%
   ```
3. Clique em "Ver Tarefas"
4. Verá:
   - 3 tarefas concluídas (verde)
   - 1 tarefa em andamento (azul) com botão "Concluir"
   - 1 tarefa não iniciada (cinza) com botão "Iniciar"

#### Para a Ação #3 (25% concluída):
1. Localize o card "Implementar checklist de cirurgia segura"
2. Você verá:
   ```
   📋 1/4 tarefas    [Ver Tarefas]
   Progresso: [███░░░░░░░░░] 25%
   ```
3. Clique em "Ver Tarefas"
4. Verá:
   - 1 tarefa concluída (verde)
   - 1 tarefa em andamento (azul)
   - 2 tarefas não iniciadas (cinza)

---

## 🧪 Funcionalidades para Testar

### 1. Visualização
- ✅ Indicador de progresso no card
- ✅ Barra de progresso colorida
- ✅ Contador de tarefas (X/Y)
- ✅ Botão "Ver Tarefas" / "Ocultar Tarefas"

### 2. Expansão/Recolhimento
- ✅ Clicar em "Ver Tarefas" expande a lista
- ✅ Clicar em "Ocultar Tarefas" recolhe a lista
- ✅ Animação suave de expansão

### 3. Detalhes das Tarefas
- ✅ Número de ordem (#1, #2, etc.)
- ✅ Título da tarefa
- ✅ Responsável com ícone 👤
- ✅ Setor com ícone 🏢
- ✅ Período com ícone 📅
- ✅ Badge de status colorido
- ✅ Borda lateral colorida por status

### 4. Ações Rápidas
- ✅ Botão "Editar" (abre modal)
- ✅ Botão "Excluir" (pede confirmação)
- ✅ Botão "Iniciar" (para tarefas não iniciadas)
- ✅ Botão "Concluir" (para tarefas em andamento)

### 5. Adicionar Nova Tarefa
- ✅ Botão "+ Adicionar Tarefa"
- ✅ Modal com formulário completo
- ✅ Validações de campos obrigatórios
- ✅ Validação de datas dentro do período da ação
- ✅ Criação de nova tarefa

### 6. Editar Tarefa
- ✅ Clicar em "Editar" abre modal preenchido
- ✅ Alterar qualquer campo
- ✅ Salvar alterações

### 7. Excluir Tarefa
- ✅ Clicar em "Excluir" pede confirmação
- ✅ Confirmar remove a tarefa
- ✅ Progresso atualiza automaticamente

### 8. Mudar Status
- ✅ Clicar em "Iniciar" muda para "Em Andamento"
- ✅ Clicar em "Concluir" muda para "Concluído"
- ✅ Progresso atualiza automaticamente
- ✅ Cores e bordas atualizam

---

## 🎨 Cores e Estados Visuais

### Barra de Progresso
- **0-39%**: Laranja (alerta)
- **40-69%**: Amarelo (atenção)
- **70-99%**: Azul (bom progresso)
- **100%**: Verde (concluído) + mensagem "✓ Todas as tarefas concluídas!"

### Status das Tarefas
- **Não Iniciado**: Cinza + borda cinza
- **Em Andamento**: Azul + borda azul
- **Concluído**: Verde + borda verde + ícone ✓

---

## 📝 Notas Importantes

### Dados Mock
- Os dados são armazenados apenas no contexto React (memória)
- Ao recarregar a página, os dados voltam ao estado inicial
- Alterações (adicionar, editar, excluir) funcionam mas não persistem

### Próximos Passos
Para tornar as tarefas persistentes, será necessário:
1. Implementar backend (API REST)
2. Criar tabela no banco de dados
3. Conectar o TaskContext às APIs reais
4. Implementar autenticação e autorização

### Outras Ações
As demais ações (SST ISO 45001 e Ambiental ISO 14001) não têm tarefas configuradas ainda, mas você pode:
- Adicionar tarefas manualmente através do botão "+ Adicionar Tarefa"
- As tarefas criadas funcionarão normalmente (mas não persistirão ao recarregar)

---

## 🚀 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Executar testes
npm test
```

---

## 📞 Suporte

Se encontrar algum problema:
1. Verifique o console do navegador (F12)
2. Verifique se todas as dependências estão instaladas (`npm install`)
3. Limpe o cache e recarregue (`Ctrl+Shift+R`)
