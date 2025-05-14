# 1. Node 이미지를 기반으로 설정 (빌드용)
FROM node:18 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json을 복사
COPY package*.json ./

# 4. 종속성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .

# 6. Vite 빌드 실행 (배포용 빌드)
RUN npm run build

# 7. serve로 정적 파일을 서빙하기 위한 새로운 이미지 (배포용)
FROM node:18

# 8. 작업 디렉토리 설정
WORKDIR /app

# 9. serve 설치 (정적 파일 서빙)
RUN npm install -g serve

# 10. 빌드된 파일을 복사
COPY --from=build /app/dist /app/dist

# 11. 5173 포트 노출
EXPOSE 5173

# 12. serve로 빌드된 파일 서빙
CMD ["serve", "-s", "dist", "-l", "5173"]
