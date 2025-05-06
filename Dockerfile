# Step 1: Build Stage
FROM node:18-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 의존성 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 파일 복사
COPY . .

# Vite 빌드
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# 빌드된 파일을 nginx의 HTML 디렉토리에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# nginx 서버 포트 열기
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
