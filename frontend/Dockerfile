FROM node:latest

WORKDIR /frontend

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]