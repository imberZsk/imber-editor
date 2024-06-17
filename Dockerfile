FROM node:18-alpine AS base
 
# 仅在需要时安装依赖
FROM base AS deps
# 查看 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 了解为什么可能需要 libc6-compat。
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
# 安装依赖
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile
 
# 仅在需要时重新构建源代码
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
 
# Next.js 收集关于一般使用情况的完全匿名的遥测数据。
# 了解更多信息：https://nextjs.org/telemetry
# 如果您想在构建期间禁用遥测，请取消注释以下行。
# ENV NEXT_TELEMETRY_DISABLED 1
 
RUN corepack enable pnpm && pnpm build
 
# 生产镜像，复制所有文件并运行 next
FROM base AS runner
WORKDIR /app
 
ENV NODE_ENV production
# 如果您想在运行时禁用遥测，请取消注释以下行。
# ENV NEXT_TELEMETRY_DISABLED 1
 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
 
COPY --from=builder /app/public ./public
 
# 设置 prerender 缓存的正确权限
RUN mkdir .next
RUN chown nextjs:nodejs .next
 
# 自动利用输出跟踪来减少镜像大小
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
 
USER nextjs
 
EXPOSE 3000
 
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
 
# server.js 由 standalone 输出的 next build 创建
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
