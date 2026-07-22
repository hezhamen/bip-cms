# BIP CMS

Payload 3 CMS for the BIP Summit website (`bip-web`).

## Setup

```bash
# Start Postgres
docker compose up -d postgres

# Install & run
pnpm install
pnpm dev          # http://localhost:3001/admin

# Seed English content from bip-web
pnpm seed
```

Admin defaults (from `.env`): `admin@bipprograms.com` / see `SEED_ADMIN_PASSWORD`.

DB: Postgres (`DATABASE_URL`). Locales: `en` (default), `ku`, `ar` with fallback to English.
