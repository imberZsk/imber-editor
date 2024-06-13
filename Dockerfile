FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm i -g pnpm && pnpm i && pnpm run build
CMD pnpm start