# Payload CMS Dockerfile — standalone Next.js output
FROM node:22.17.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && \
    corepack prepare pnpm@10.22.0 --activate && \
    pnpm i --frozen-lockfile || pnpm i && \
    pnpm store prune && \
    rm -rf /root/.local/share/pnpm/store

FROM base AS builder
WORKDIR /app
RUN corepack enable
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-deprecation --max-old-space-size=8000"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack prepare pnpm@10.22.0 --activate && \
    pnpm run build && \
    rm -rf node_modules/.cache .next/cache .next/trace 2>/dev/null || true

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS=--no-warnings

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
