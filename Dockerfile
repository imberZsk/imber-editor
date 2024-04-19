FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install --registry=https://registry.npmmirror.com && npm run build
CMD npm start