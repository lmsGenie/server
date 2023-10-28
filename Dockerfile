FROM node:20-alpine

LABEL maintainer=vijaywargishivam@gmail.com

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm i

COPY . .

EXPOSE 5000

CMD [ "pnpm", "build:start" ]
