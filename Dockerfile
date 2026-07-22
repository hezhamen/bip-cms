# Payload CMS — lean standalone image (R2 media later; no persistent /media volume needed)
FROM node:22.17.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
RUN corepack enable && \
    corepack prepare pnpm@10.22.0 --activate && \
    (pnpm i --frozen-lockfile || pnpm i) && \
    pnpm store prune && \
    rm -rf /root/.local/share/pnpm/store /tmp/*

FROM base AS builder
WORKDIR /app
RUN corepack enable
ENV NEXT_TELEMETRY_DISABLED=1
# Keep build heap modest — Dokploy builders are small
ENV NODE_OPTIONS="--no-deprecation --max-old-space-size=3072"

ARG DATABASE_URL=postgresql://bip:bip@127.0.0.1:5432/bip_cms
ARG PAYLOAD_SECRET=build-time-secret-not-used-in-prod
ARG PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ENV DATABASE_URL=$DATABASE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack prepare pnpm@10.22.0 --activate && \
    pnpm run build && \
    rm -rf node_modules/.cache .next/cache .next/trace /tmp/* 2>/dev/null || true

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Cap Node heap so container stays under ~512MB RAM
ENV NODE_OPTIONS="--no-warnings --max-old-space-size=384"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/media .next && \
    chown -R nextjs:nodejs /app/media .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
