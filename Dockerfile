FROM node:18-alpine

WORKDIR /app

COPY . .
RUN pnpm i && pnpm run build
CMD pnpm start