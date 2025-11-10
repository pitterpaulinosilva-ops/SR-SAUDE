# 🚀 Guia de Deploy - SR-SAUDE

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Conta no [GitHub](https://github.com)
- Node.js 18+ instalado localmente (para desenvolvimento)

## 🔧 Configuração Inicial

### 1. Clonar o Repositório

```bash
git clone https://github.com/pitterpaulinosilva-ops/SR-SAUDE.git
cd SR-SAUDE
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione suas credenciais:

```env
GEMINI_API_KEY=sua_chave_api_aqui
```

### 4. Testar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🌐 Deploy na Vercel

### Opção 1: Deploy via Dashboard da Vercel (Recomendado)

1. **Acesse o Dashboard da Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Importe o Projeto**
   - Clique em "Add New Project"
   - Selecione "Import Git Repository"
   - Escolha o repositório `pitterpaulinosilva-ops/SR-SAUDE`

3. **Configure o Projeto**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Adicione Variáveis de Ambiente**
   - Vá para "Environment Variables"
   - Adicione:
     ```
     GEMINI_API_KEY = sua_chave_api_aqui
     ```

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build completar (2-3 minutos)
   - Seu site estará disponível em: `https://seu-projeto.vercel.app`

### Opção 2: Deploy via CLI da Vercel

1. **Instalar Vercel CLI**

```bash
npm install -g vercel
```

2. **Login na Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
# Deploy de preview
vercel

# Deploy de produção
vercel --prod
```

4. **Configurar Variáveis de Ambiente**

```bash
vercel env add GEMINI_API_KEY
```

## 🔄 Deploy Automático

Após o primeiro deploy, a Vercel configurará automaticamente:

- ✅ **Deploy automático** em cada push para `main`
- ✅ **Preview deploys** para cada Pull Request
- ✅ **HTTPS** automático
- ✅ **CDN global**
- ✅ **Rollback** instantâneo

## 📊 Monitoramento

### Logs e Analytics

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá para:
   - **Deployments**: Ver histórico de deploys
   - **Analytics**: Métricas de uso
   - **Logs**: Logs em tempo real

## 🔐 Variáveis de Ambiente na Vercel

### Como Adicionar

1. Vá para o projeto na Vercel
2. Clique em "Settings"
3. Vá para "Environment Variables"
4. Adicione cada variável:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `GEMINI_API_KEY` | Sua chave API | Production, Preview, Development |

### Ambientes Disponíveis

- **Production**: Deploy de produção (branch main)
- **Preview**: Deploys de preview (PRs e branches)
- **Development**: Desenvolvimento local

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Testes
npm test

# Deploy para Vercel
vercel

# Deploy de produção
vercel --prod

# Ver logs
vercel logs

# Listar deploys
vercel ls
```

## 🌍 Domínio Customizado

### Adicionar Domínio Próprio

1. Vá para "Settings" > "Domains"
2. Clique em "Add Domain"
3. Digite seu domínio (ex: `srsaude.com.br`)
4. Siga as instruções para configurar DNS

### Configuração DNS

Adicione os seguintes registros no seu provedor de DNS:

```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com

Tipo: A
Nome: @
Valor: 76.76.21.21
```

## 🔍 Troubleshooting

### Build Falha

**Problema**: Build falha com erro de dependências

**Solução**:
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Variáveis de Ambiente Não Funcionam

**Problema**: Variáveis de ambiente não são reconhecidas

**Solução**:
1. Verifique se as variáveis estão configuradas na Vercel
2. Faça um novo deploy após adicionar variáveis
3. Certifique-se de que o nome está correto (case-sensitive)

### Erro 404 em Rotas

**Problema**: Páginas retornam 404 ao recarregar

**Solução**: O arquivo `vercel.json` já está configurado com rewrites. Se o problema persistir:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Performance Lenta

**Problema**: Site carrega lentamente

**Solução**:
1. Verifique o tamanho do bundle: `npm run build`
2. Otimize imagens
3. Use lazy loading para componentes pesados
4. Ative compressão no Vercel (já ativado por padrão)

## 📈 Otimizações

### Build Otimizado

O projeto já está configurado com:
- ✅ Code splitting automático
- ✅ Tree shaking
- ✅ Minificação
- ✅ Compressão Gzip/Brotli

### Performance

- ✅ CDN global da Vercel
- ✅ Cache automático
- ✅ HTTP/2 e HTTP/3
- ✅ Edge Network

## 🔒 Segurança

### Boas Práticas

1. **Nunca commite** arquivos `.env` ou `.env.local`
2. **Use variáveis de ambiente** para dados sensíveis
3. **Ative HTTPS** (automático na Vercel)
4. **Configure CORS** se necessário
5. **Mantenha dependências atualizadas**

### Atualizar Dependências

```bash
# Verificar atualizações
npm outdated

# Atualizar todas
npm update

# Atualizar específica
npm install package@latest
```

## 📞 Suporte

### Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Vite](https://vitejs.dev)
- [Documentação React](https://react.dev)

### Contato

Para problemas específicos do projeto:
- Abra uma [Issue no GitHub](https://github.com/pitterpaulinosilva-ops/SR-SAUDE/issues)
- Entre em contato com a equipe de desenvolvimento

## ✅ Checklist de Deploy

Antes de fazer deploy para produção:

- [ ] Testes passando (`npm test`)
- [ ] Build local funciona (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] `.env.local` não está no Git
- [ ] README atualizado
- [ ] Documentação completa
- [ ] Performance testada
- [ ] Responsividade verificada
- [ ] Ambos os temas (claro/escuro) testados
- [ ] Acessibilidade verificada

## 🎉 Pronto!

Seu projeto está pronto para deploy na Vercel!

Para fazer o primeiro deploy:

```bash
# 1. Commit suas mudanças
git add .
git commit -m "Preparado para deploy na Vercel"

# 2. Push para o GitHub
git push origin main

# 3. Importe o projeto na Vercel
# Acesse: https://vercel.com/new
```

---

**Última atualização**: 10/11/2025

**Versão**: 1.0.0

**Status**: ✅ Pronto para Deploy
