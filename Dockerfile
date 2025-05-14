# 1. 베이스 이미지로 Node 사용
FROM node:18-alpine AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사
COPY package.json package-lock.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. Vite 앱 빌드
RUN npm run build

# 7. Nginx를 이용해 빌드된 앱을 서빙
FROM nginx:alpine

# 8. 빌드된 결과물을 Nginx 서버에 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 9. 5173 포트 열기
EXPOSE 5173

# 10. Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
