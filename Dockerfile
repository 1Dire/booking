# 1. Node.js 이미지 사용
FROM node:16 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 설치
COPY package*.json ./
RUN npm install

# 4. React 앱 빌드
COPY . ./
RUN npm run build

# 5. Nginx를 위한 설정
FROM nginx:alpine

# 6. 빌드된 파일을 Nginx 서버로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 7. Nginx 설정 파일을 덮어쓰기
COPY nginx.conf /etc/nginx/nginx.conf

# 8. Nginx 포트 노출
EXPOSE 80
