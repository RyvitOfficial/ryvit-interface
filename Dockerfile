FROM node:20.12.2-slim

COPY package.json package-lock.json /app/
WORKDIR /app

RUN npm ci

COPY . /app

RUN npm run build

CMD ["npm", "run", "start"]