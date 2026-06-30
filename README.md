# Site de Cantor — Template white-label

Site público + painel administrativo para um artista musical.
Tudo é **editável pelo painel** (nome, bio, fotos, cores, músicas, vídeos, Spotify,
produtos, links, contato), sem mexer no código.

> Este projeto foi feito para ser **clonado por instância**: cada pessoa cria o
> próprio site para o seu cantor (próprio banco de dados, próprio deploy e próprio
> login). Não é um sistema multiusuário — é um modelo reaproveitável.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- [Prisma 7](https://www.prisma.io) + PostgreSQL ([Supabase](https://supabase.com))
- Upload de imagens via [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- Autenticação por sessão (JWT em cookie HttpOnly)

---

## Criar uma nova instância (passo a passo)

Para colocar o site de um novo cantor no ar:

### 1. Clonar o código

```bash
git clone <url-do-repositorio> meu-cantor
cd meu-cantor
npm install
```

### 2. Criar um banco PostgreSQL (Supabase)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Project Settings → Database**, copie as duas connection strings:
   - **Transaction pooler** → será o `DATABASE_URL`
   - **Direct connection** → será o `DIRECT_URL`

### 3. Criar o storage de imagens (Vercel Blob)

1. No painel da Vercel, crie um **Blob Store** (Storage → Create → Blob).
2. Copie o token `BLOB_READ_WRITE_TOKEN`.

### 4. Configurar as variáveis de ambiente

Copie o exemplo e preencha:

```bash
cp .env.example .env
```

```env
# Banco (Supabase)
DATABASE_URL="postgresql://...pooler...:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://...direct...:5432/postgres"

# Segredo de sessão — gere um valor forte:  openssl rand -base64 32
AUTH_SECRET="cole-aqui-um-segredo-forte"

# Login inicial do painel (pode ser trocado depois no dashboard)
ADMIN_EMAIL="voce@exemplo.com"
ADMIN_PASSWORD="uma-senha-forte"

# Upload de imagens (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

### 5. Criar as tabelas e o usuário admin

```bash
npx prisma migrate deploy   # cria as tabelas
npm run db:seed             # cria o admin e os dados iniciais
```

### 6. Rodar localmente

```bash
npm run dev      # http://localhost:3000
```

- Site público: `http://localhost:3000`
- Painel: `http://localhost:3000/admin/login` (use o `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

---

## Deploy na Vercel

```bash
npm i -g vercel
vercel link          # vincula a um projeto Vercel
vercel env add ...   # adicione DATABASE_URL, DIRECT_URL, AUTH_SECRET,
                     # ADMIN_EMAIL, ADMIN_PASSWORD, BLOB_READ_WRITE_TOKEN
vercel --prod
```

> O `build` já roda `prisma generate` automaticamente. As migrações
> (`prisma migrate deploy`) devem ser aplicadas ao banco antes do primeiro acesso.

---

## Personalizar o cantor (sem código)

Depois de logar no painel `/admin`, tudo é configurável:

| Seção            | O que controla                                        |
| ---------------- | ----------------------------------------------------- |
| **Site**         | Nome do artista, slogan, descrição, anúncio do topo   |
| **Home**         | Imagem de destaque (hero), textos da página inicial   |
| **Sobre**        | Biografia, foto, gênero musical, ano de estreia       |
| **Aparência**    | Cores e tema do site                                  |
| **Redes sociais**| Links de Instagram, YouTube, Spotify, etc.            |
| **Músicas**      | Lançamentos e capas                                   |
| **Vídeos**       | Vídeos do YouTube                                      |
| **Spotify**      | Embeds e player                                       |
| **Produtos**     | Itens da loja                                          |
| **Links**        | Página link-in-bio                                     |
| **Contato**      | E-mail e informações de contato                       |
| **Configurações**| **E-mail e senha de acesso ao painel**                |

O nome do artista definido em **Site** aparece automaticamente no site público,
no título da página de login e no menu do painel — então cada instância já fica
com a identidade do próprio cantor.

---

## Scripts

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção (roda prisma generate)
npm start        # servir o build
npm run db:seed  # popular o banco / criar o admin
```
