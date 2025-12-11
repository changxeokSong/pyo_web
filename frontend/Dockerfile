FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 정적 빌드 산출물 서빙을 위한 간단한 서버
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "4173", "-n"]
