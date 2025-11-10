# 🏥 SR-SAUDE - Sistema de Gestão de Planos de Ação

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Dashboard interativo para gestão e monitoramento de planos de ação em saúde (ONA).

[Demo](https://sr-saude.vercel.app) · [Documentação](./.kiro/specs/theme-system/README.md) · [Reportar Bug](https://github.com/pitterpaulinosilva-ops/SR-SAUDE/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Começando](#-começando)
- [Deploy](#-deploy)
- [Sistema de Temas](#-sistema-de-temas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O SR-SAUDE é um sistema de gestão de planos de ação desenvolvido para facilitar o monitoramento e acompanhamento de ações relacionadas à acreditação ONA (Organização Nacional de Acreditação) em instituições de saúde.

### Principais Características

- 📊 **Dashboard Interativo**: Visualização clara de métricas e status
- 🎨 **Sistema de Temas**: Suporte a temas claro e escuro
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔍 **Busca e Filtros**: Encontre ações rapidamente
- 📈 **Gráficos Dinâmicos**: Visualização de dados com Recharts
- 🔥 **Firebase Integration**: Backend em tempo real
- ⚡ **Performance**: Build otimizado com Vite

---

## ✨ Funcionalidades

### Dashboard Principal

- ✅ Visualização de múltiplos planos de ação
- ✅ Cards de ações com status (Em Atraso, No Prazo, Concluído)
- ✅ Gráficos de status, responsáveis e setores
- ✅ Sistema de busca e filtros avançados
- ✅ Exportação de dados

### Sistema de Temas

- 🌞 **Tema Claro**: Interface limpa e profissional
- 🌙 **Tema Escuro**: Reduz fadiga visual em ambientes com pouca luz
- 💾 **Persistência**: Preferência salva no localStorage
- 🎭 **Transições Suaves**: Mudança de tema com animações de 300ms

### Responsividade

- 📱 Mobile First
- 💻 Desktop Optimized
- 📊 Gráficos Adaptáveis
- 🎯 Touch Friendly

---

## 🛠️ Tecnologias

### Core

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### UI/UX

- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos
- **Recharts** - Biblioteca de gráficos

### Backend

- **Firebase** - Backend as a Service
  - Firestore Database
  - Authentication
  - Hosting

### Testes

- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes

### Deploy

- **Vercel** - Plataforma de deploy
- **GitHub Actions** - CI/CD (opcional)

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Firebase (para backend)
- Conta Vercel (para deploy)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/pitterpaulinosilva-ops/SR-SAUDE.git
cd SR-SAUDE
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione suas credenciais:

```env
GEMINI_API_KEY=sua_chave_api_aqui
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run preview      # Preview do build de produção

# Testes
npm test             # Executa testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Cobertura de testes
```

---

## 🌐 Deploy

### Deploy Rápido na Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pitterpaulinosilva-ops/SR-SAUDE)

### Deploy Manual

1. **Instale a CLI da Vercel**

```bash
npm install -g vercel
```

2. **Faça login**

```bash
vercel login
```

3. **Deploy**

```bash
vercel --prod
```

📖 **Guia Completo**: Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.

---

## 🎨 Sistema de Temas

O projeto possui um sistema de temas completo e bem documentado.

### Uso Básico

```tsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-slate-800">
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Alternar Tema</button>
    </div>
  );
}
```

### Documentação Completa

- 📚 [README do Sistema de Temas](./.kiro/specs/theme-system/README.md)
- 🎨 [Guia de Cores](./.kiro/specs/theme-system/THEME-COLOR-GUIDE.md)
- 👨‍💻 [Guia do Desenvolvedor](./.kiro/specs/theme-system/THEME-DEVELOPER-GUIDE.md)
- 🔧 [Troubleshooting](./.kiro/specs/theme-system/TROUBLESHOOTING-LIGHT-THEME.md)

---

## 📁 Estrutura do Projeto

```
SR-SAUDE/
├── .kiro/
│   └── specs/
│       └── theme-system/          # Documentação do sistema de temas
├── components/                     # Componentes React
│   ├── __tests__/                 # Testes de componentes
│   ├── charts/                    # Componentes de gráficos
│   ├── ActionCard.tsx
│   ├── ActionPlanDashboard.tsx
│   ├── ThemeToggle.tsx
│   └── ...
├── context/                        # Contextos React
│   ├── __tests__/                 # Testes de contextos
│   └── ThemeContext.tsx           # Contexto de tema
├── hooks/                          # Custom hooks
│   ├── usePlans.ts
│   └── useProcessedActionData.ts
├── services/                       # Serviços (Firebase, API)
├── public/                         # Arquivos estáticos
├── App.tsx                         # Componente principal
├── index.tsx                       # Entry point
├── types.ts                        # Definições de tipos
├── constants.tsx                   # Constantes
├── vite.config.ts                 # Configuração Vite
├── vercel.json                    # Configuração Vercel
├── package.json                   # Dependências
└── README.md                      # Este arquivo
```

---

## 🧪 Testes

O projeto possui testes automatizados para componentes críticos.

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage
```

### Cobertura Atual

- ✅ ThemeContext
- ✅ ThemeToggle
- ✅ Componentes principais

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes

- Siga os padrões de código estabelecidos
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits semânticos

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

**DIGEST Processos**

- 📧 Email: contato@digestprocessos.com.br
- 🌐 Website: [digestprocessos.com.br](https://digestprocessos.com.br)

---

## 🙏 Agradecimentos

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)
- [Firebase](https://firebase.google.com)
- [Lucide Icons](https://lucide.dev)
- [Recharts](https://recharts.org)

---

## 📊 Status do Projeto

- ✅ Sistema de Temas Implementado
- ✅ Dashboard Funcional
- ✅ Integração Firebase
- ✅ Testes Automatizados
- ✅ Documentação Completa
- ✅ Pronto para Deploy

---

<div align="center">

**[⬆ Voltar ao topo](#-sr-saude---sistema-de-gestão-de-planos-de-ação)**

Feito com ❤️ pela equipe DIGEST Processos

</div>
