# BIP CMS

Payload 3 CMS for the BIP Summit website (`bip-web`).

## Admin IA

| Sidebar | What |
|---------|------|
| **Speakers** / **News** / **Media Library** | Growing content |
| **Website** | Brand, contact, nav, languages (tabs) |
| **Pages** | Per-route SEO + page copy (tabs) |
| **Sections** | Mission, stats, sectors, videos, gallery, highlights, partnership, intros, AI chat (tabs) |
| **UI Labels** | Button / form / nav strings (en · ku · ar) |
| **Users** | CMS admins |

## Local setup

```bash
cp .env.example .env

# Postgres on host port 5433 (avoids clash with system Postgres on 5432)
docker compose up -d postgres

pnpm install
pnpm approve-builds sharp esbuild unrs-resolver   # first install only

pnpm dev               # http://localhost:3001/admin
pnpm seed              # migrate EN content from sibling bip-web
```

| Var | Local default |
|-----|----------------|
| `DATABASE_URL` | `postgresql://bip:bip@127.0.0.1:5433/bip_cms` |
| Admin | http://localhost:3001/admin |
| Locales | `en` (default), `ku`, `ar` (fallback EN) |
