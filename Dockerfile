# # 使用官方Node.js基础镜像
# FROM node:18-alpine

# # 设置工作目录
# WORKDIR /app

# # 安装pnpm
# RUN npm install -g pnpm

# # 复制package.json和pnpm-lock.yaml到工作目录
# COPY package.json pnpm-lock.yaml ./

# # 使用pnpm安装依赖
# RUN pnpm install

# # 复制所有文件到工作目录
# COPY . .

# # 构建应用程序
# RUN pnpm run build

# # 运行应用程序
# CMD ["pnpm", "start"]


FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm i -g pnpm && pnpm i && pnpm run build
CMD pnpm start