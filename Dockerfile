FROM node:18-alpine
# 这个指令的意思就是简单粗暴的将当前目录的所有文件拷贝到 /app下
WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/
ENV PNPM_REGISTRY=https://registry.npmmirror.com/

RUN npm i -g pnpm

COPY . .

RUN pnpm install
CMD pnpm run build

EXPOSE 3000