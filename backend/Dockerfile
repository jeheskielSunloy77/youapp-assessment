FROM node:20

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY .env ./

RUN pnpm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]