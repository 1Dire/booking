# Step 1: 빌드 단계
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# Vite 프로젝트 빌드
COPY . ./
RUN npm run build

# Step 2: 프로덕션 단계
FROM nginx:alpine

# 빌드된 파일을 Nginx의 기본 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 80 포트로 앱을 서빙
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
