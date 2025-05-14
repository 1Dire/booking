# 1. Node.js v23.11.0 이미지 사용
FROM node:23.11.0 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 설치
COPY package*.json ./
RUN npm install

# 4. React 앱 빌드
COPY . ./
RUN npm run build


# 8. Nginx 포트 노출
EXPOSE 80
