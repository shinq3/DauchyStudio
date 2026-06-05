FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

RUN mkdir -p server/public && cp -r dist/public/. server/public/

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "--import", "tsx/esm", "server/index.ts"]
