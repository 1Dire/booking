# Step 1: Build Vite App
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf
