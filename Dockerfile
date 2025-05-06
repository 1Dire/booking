# 1. Nginx 공식 이미지 사용
FROM nginx:alpine

# 2. 빌드된 프로젝트 파일을 컨테이너의 /usr/share/nginx/html에 복사
COPY ./dist /usr/share/nginx/html

# 3. Nginx가 사용하는 80 포트를 5173 포트로 노출
EXPOSE 5173

# 4. Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
