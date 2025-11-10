# 🤖 Assistente de Insight - Guia Completo

## 📋 Visão Geral

O Assistente de Insight é uma funcionalidade de IA integrada ao Status Report que permite aos usuários fazer perguntas e obter análises sobre as ações do plano, utilizando modelos de linguagem avançados (Gemini ou GPT).

## ✨ Características

### Interface Estilo ChatGPT
- ✅ Chat interativo e intuitivo
- ✅ Histórico de conversas
- ✅ Respostas em tempo real
- ✅ Suporte a temas claro/escuro

### Suporte a Múltiplas APIs
- ✅ **Google Gemini** (Gemini Pro)
- ✅ **OpenAI GPT** (GPT-3.5-turbo)
- ✅ Alternância fácil entre provedores

### Configuração Flexível
- ✅ API Key via interface
- ✅ API Key via variáveis de ambiente
- ✅ Persistência no localStorage
- ✅ Configuração por provedor

## 🎯 Funcionalidades

### 1. Análise Contextual

O assistente tem acesso a todas as ações do Status Report:
- ID da ação
- Descrição da ação
- Responsável
- Setor
- Status (Em Atraso, No Prazo, Concluído)
- Prazo

### 2. Tipos de Perguntas

**Análises Gerais**:
- "Quantas ações estão em atraso?"
- "Qual setor tem mais ações pendentes?"
- "Quem são os responsáveis com mais ações?"

**Identificação de Problemas**:
- "Quais são os principais gargalos?"
- "Que ações estão mais atrasadas?"
- "Há algum padrão nos atrasos?"

**Sugestões e Prioridades**:
- "Que ações devo priorizar?"
- "Como posso melhorar o desempenho?"
- "Quais ações precisam de atenção imediata?"

**Análises Específicas**:
- "Como está o desempenho do setor X?"
- "Quantas ações o responsável Y tem?"
- "Quais ações vencem esta semana?"

## 🔧 Configuração

### Opção 1: Via Interface (Recomendado)

1. **Acesse o Assistente**:
   - Clique em "Assistente de Insight" na sidebar

2. **Abra as Configurações**:
   - Clique no ícone de engrenagem (⚙️) no header

3. **Escolha o Provedor**:
   - Selecione "Gemini" ou "GPT"

4. **Insira a API Key**:
   - Cole sua chave API no campo
   - Clique em "Salvar"

5. **Comece a Usar**:
   - Digite sua pergunta
   - Pressione Enter ou clique em Enviar

### Opção 2: Via Variáveis de Ambiente

1. **Crie/Edite o arquivo `.env.local`**:
```env
# Para Gemini
GEMINI_API_KEY=sua_chave_gemini_aqui

# Para GPT
OPENAI_API_KEY=sua_chave_openai_aqui
```

2. **Reinicie a aplicação**:
```bash
npm run dev
```

## 🔑 Obtendo API Keys

### Google Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

**Características**:
- ✅ Gratuito (com limites)
- ✅ Boa performance
- ✅ Suporte a português
- ✅ Modelo: Gemini Pro

### OpenAI GPT

1. Acesse: https://platform.openai.com/api-keys
2. Faça login ou crie uma conta
3. Clique em "Create new secret key"
4. Copie a chave gerada

**Características**:
- 💰 Pago (créditos necessários)
- ✅ Excelente performance
- ✅ Suporte a português
- ✅ Modelo: GPT-3.5-turbo

## 💬 Como Usar

### Interface do Chat

```
┌─────────────────────────────────────────┐
│ 🌟 Assistente de Insight        ⚙️ 🗑️  │
│ Powered by Gemini                       │
├─────────────────────────────────────────┤
│                                         │
│  Bem-vindo ao Assistente de Insight!   │
│  Faça perguntas sobre as ações...      │
│                                         │
├─────────────────────────────────────────┤
│ [Digite sua pergunta...]          [📤] │
└─────────────────────────────────────────┘
```

### Exemplo de Conversa

**Usuário**: "Quantas ações estão em atraso?"

**Assistente**: "Com base nos dados atuais, há 15 ações em atraso. Dessas:
- 8 são do setor de TI
- 5 são do setor de RH
- 2 são do setor Financeiro

As ações mais atrasadas são:
1. Ação #123 - 30 dias de atraso
2. Ação #456 - 25 dias de atraso
3. Ação #789 - 20 dias de atraso"

**Usuário**: "Quais ações devo priorizar?"

**Assistente**: "Recomendo priorizar as seguintes ações:

1. **Ação #123** (TI) - 30 dias de atraso
   - Responsável: João Silva
   - Impacto: Alto

2. **Ação #456** (RH) - 25 dias de atraso
   - Responsável: Maria Santos
   - Impacto: Médio

Sugiro também revisar as ações do setor de TI, pois concentram 53% dos atrasos."

## 🎨 Interface

### Elementos Visuais

**Header**:
- Ícone Sparkles (✨)
- Título "Assistente de Insight"
- Provedor ativo (Gemini/GPT)
- Botões: Limpar histórico (🗑️) e Configurações (⚙️)

**Área de Mensagens**:
- Mensagens do usuário: Azul, alinhadas à direita
- Mensagens do assistente: Cinza, alinhadas à esquerda
- Timestamp em cada mensagem
- Scroll automático para última mensagem

**Painel de Configurações**:
- Seleção de provedor (Gemini/GPT)
- Campo de API Key (tipo password)
- Botão Salvar
- Links para obter API Keys

**Área de Input**:
- Textarea expansível
- Botão Enviar com ícone
- Indicador de loading
- Dica: "Enter para enviar • Shift+Enter para nova linha"

## 🔒 Segurança

### Armazenamento de API Keys

**localStorage**:
- API Key é salva localmente no navegador
- Não é enviada para servidores (exceto APIs de IA)
- Pode ser limpa a qualquer momento

**Boas Práticas**:
- ✅ Nunca compartilhe sua API Key
- ✅ Use keys com limites de uso
- ✅ Revogue keys não utilizadas
- ✅ Monitore uso nas dashboards das APIs

### Privacidade dos Dados

**O que é enviado para a IA**:
- Contexto das ações (ID, descrição, responsável, setor, status, prazo)
- Pergunta do usuário
- Histórico da conversa (para contexto)

**O que NÃO é enviado**:
- Dados pessoais sensíveis
- Informações de autenticação
- Dados de outros usuários

## 📊 Limitações

### Limites de API

**Gemini (Gratuito)**:
- 60 requisições por minuto
- Contexto limitado
- Pode ter delays em horários de pico

**GPT (Pago)**:
- Depende do plano contratado
- Custo por token
- Limites de rate conforme tier

### Limitações Técnicas

- ✅ Análise baseada apenas nos dados disponíveis
- ✅ Não tem acesso a dados históricos
- ✅ Não pode executar ações (apenas análise)
- ✅ Respostas dependem da qualidade da API Key

## 🐛 Troubleshooting

### Problema: "Configure sua API Key"

**Causa**: API Key não configurada

**Solução**:
1. Clique em Configurações (⚙️)
2. Insira sua API Key
3. Clique em Salvar

### Problema: "Erro ao processar solicitação"

**Causas Possíveis**:
- API Key inválida
- Limite de requisições excedido
- Problema de conexão

**Soluções**:
1. Verifique se a API Key está correta
2. Aguarde alguns minutos (limite de rate)
3. Verifique sua conexão com internet
4. Tente trocar de provedor

### Problema: Respostas lentas

**Causas**:
- Muitas ações no contexto
- API sobrecarregada
- Conexão lenta

**Soluções**:
- Seja mais específico nas perguntas
- Tente em outro horário
- Verifique sua conexão

### Problema: Respostas imprecisas

**Causas**:
- Pergunta ambígua
- Dados insuficientes
- Limitação do modelo

**Soluções**:
- Reformule a pergunta de forma mais clara
- Forneça mais contexto
- Faça perguntas mais específicas

## 💡 Dicas de Uso

### Perguntas Efetivas

**✅ Boas Perguntas**:
- "Quantas ações do setor TI estão em atraso?"
- "Quem é o responsável com mais ações pendentes?"
- "Quais ações vencem nos próximos 7 dias?"

**❌ Perguntas Ruins**:
- "Como está tudo?" (muito vaga)
- "O que fazer?" (sem contexto)
- "Resolva os problemas" (não é executável)

### Maximizando Resultados

1. **Seja Específico**: Perguntas claras geram respostas melhores
2. **Use Contexto**: Mencione setores, responsáveis ou períodos
3. **Peça Detalhes**: Solicite análises aprofundadas quando necessário
4. **Itere**: Faça perguntas de acompanhamento
5. **Valide**: Sempre verifique os dados fornecidos

## 🚀 Casos de Uso

### 1. Reunião de Status

**Antes da reunião**:
- "Resuma o status geral das ações"
- "Quais são os principais bloqueios?"
- "Que conquistas tivemos esta semana?"

### 2. Planejamento

**Para priorização**:
- "Quais ações são mais urgentes?"
- "Onde devemos focar recursos?"
- "Que riscos você identifica?"

### 3. Análise de Performance

**Para avaliação**:
- "Como está o desempenho por setor?"
- "Quem está com melhor taxa de conclusão?"
- "Há padrões nos atrasos?"

### 4. Tomada de Decisão

**Para decisões**:
- "Devo realocar recursos? Para onde?"
- "Que ações podem ser adiadas?"
- "Onde investir mais tempo?"

## 📈 Roadmap Futuro

### Planejado
- [ ] Suporte a mais modelos de IA
- [ ] Análise de tendências históricas
- [ ] Geração de relatórios automáticos
- [ ] Sugestões proativas
- [ ] Integração com notificações

### Em Consideração
- [ ] Comandos de voz
- [ ] Exportação de conversas
- [ ] Compartilhamento de insights
- [ ] Análise preditiva
- [ ] Recomendações personalizadas

## 📚 Recursos Adicionais

### Documentação das APIs

- [Google Gemini API](https://ai.google.dev/docs)
- [OpenAI API](https://platform.openai.com/docs)

### Tutoriais

- [Como obter Gemini API Key](https://ai.google.dev/tutorials/setup)
- [Como obter OpenAI API Key](https://platform.openai.com/docs/quickstart)

## 📞 Suporte

Para problemas ou sugestões:
1. Verifique este guia
2. Consulte a documentação das APIs
3. Entre em contato com a equipe de desenvolvimento

---

**Última atualização**: 10/11/2025

**Versão**: 1.0.0

**Status**: ✅ Implementado e Funcional
