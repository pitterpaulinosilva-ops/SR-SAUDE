# Favicon Instructions

## Arquivos Criados

1. **favicon.svg** - Ícone vetorial moderno (já criado)
   - Representa um documento de relatório com gráfico de barras
   - Checkmark verde indicando status/conclusão
   - Cores azuis do tema do projeto

## Para criar o favicon.ico

Use um dos seguintes métodos:

### Método 1: Online (Recomendado)
1. Acesse: https://realfavicongenerator.net/
2. Faça upload do `favicon.svg`
3. Baixe o pacote completo de favicons
4. Substitua os arquivos na pasta `public/`

### Método 2: Usando ImageMagick
```bash
# Instale ImageMagick se necessário
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Converta SVG para ICO
magick convert favicon.svg -define icon:auto-resize=16,32,48,64,256 favicon.ico
```

### Método 3: Usando Node.js
```bash
npm install -g svg2ico
svg2ico favicon.svg favicon.ico
```

## Arquivos Recomendados

Para melhor compatibilidade, crie também:

- `favicon-16x16.png` - Para navegadores antigos
- `favicon-32x32.png` - Para navegadores modernos
- `apple-touch-icon.png` (180x180) - Para iOS
- `android-chrome-192x192.png` - Para Android
- `android-chrome-512x512.png` - Para Android (alta resolução)

## Verificação

Após adicionar os favicons, teste em:
- Chrome/Edge (Windows)
- Safari (Mac/iOS)
- Firefox
- Modo claro e escuro

## Cores Usadas

- Azul Principal: #2563eb (blue-600)
- Azul Escuro: #1e40af (blue-800)
- Verde Check: #10b981 (green-500)
- Branco: #ffffff
