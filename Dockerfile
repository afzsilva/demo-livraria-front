# Etapa 1: Build da aplicação Angular
FROM node:22-alpine AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copia o build Angular para o diretório público do Nginx
COPY --from=build /app/dist/demo-livraria-front/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT nginx -g 'daemon off;'
