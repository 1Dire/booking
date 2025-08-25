# 1단계: Vite 빌드용 Node 이미지
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: serve로 정적 파일 서빙 (포트 80으로 수정)
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]