FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:tsc

EXPOSE 3001

CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]