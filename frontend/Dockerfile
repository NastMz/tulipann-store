# Build the SPA, then serve it with nginx, which also proxies /api to Django
# so the browser sees a single origin (session cookie + CSRF).
FROM node:24.22.3-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN node node_modules/typescript/bin/tsc -p tsconfig.json && node node_modules/vite/bin/vite.js build

FROM nginx:1.30.7-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
