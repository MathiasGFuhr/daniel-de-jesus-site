# Daniel de Jesus — Site oficial

Site público do cantor virtual **Daniel de Jesus** (artista criado com inteligência artificial).
Identidade visual premium, editorial e musical — nada futurista, cyberpunk ou neon.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Componentização limpa, layout responsivo (desktop + mobile)

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (http://localhost:3000)
npm run build    # build de produção
npm start        # servir o build
```

## Estrutura

```
src/
  app/
    page.tsx          # Home
    sobre/            # /sobre
    musicas/          # /musicas
    videos/           # /videos
    spotify/          # /spotify
    loja/             # /loja
    links/            # /links (link-in-bio)
    contato/          # /contato (formulário)
    api/contato/      # API route (envio simulado)
  components/         # Header, Sidebar, AnnouncementBar, Hero, etc.
  data/site.ts        # Configuração central (siteConfig)
public/images/        # Imagens e placeholders (SVG)
```

## Configuração central

Todo o conteúdo (nome do artista, bio, links sociais, produtos, vídeos, Spotify,
anúncio, contato) vem de um único arquivo:

```ts
// src/data/site.ts
export const siteConfig = { /* ... */ };
```

Isso mantém o projeto pronto para um **futuro dashboard de configuração**: basta
ler/gravar esses dados a partir de um banco em vez do arquivo estático.

## Substituir imagens

Os arquivos em `public/images/` são **placeholders SVG**. Substitua por imagens
reais mantendo os mesmos caminhos (ou atualize-os em `src/data/site.ts`):

- `daniel-hero.svg` → foto editorial do artista
- `covers/*` → capas dos lançamentos
- `videos/*` → thumbnails dos vídeos
- `products/*` → fotos dos produtos

## Embeds

- **Spotify** e **YouTube** são incorporados via `iframe`/embed configurável em `siteConfig`.
- O formulário de contato envia para `/api/contato` (atualmente apenas simula o envio;
  integre e-mail/banco no futuro).

---

> Daniel de Jesus é um artista virtual criado com inteligência artificial.
